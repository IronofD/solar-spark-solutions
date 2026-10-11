import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().max(30).optional().default(""),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  location: z.string().trim().max(150).optional().default(""),
  service_type: z.string().trim().max(50).optional().default(""),
  monthly_bill: z.string().trim().max(50).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
});

type Inquiry = z.infer<typeof inquirySchema>;
type StoredInquiry = Inquiry & {
  id: string;
  external_sync_status: string;
  external_sync_attempts: number;
};

type ExternalDelivery = { ok: boolean; error: string | null };

const EXTERNAL_REST_URL = "https://aihkehhgnssnvaogdonu.supabase.co/rest/v1";
const EXTERNAL_KEY = "sb_publishable_juZytPp6ybGh58SrYme1sw_3VMbXc3G";

async function forwardToExternal(row: Record<string, unknown>): Promise<ExternalDelivery> {
  try {
    const response = await fetch(`${EXTERNAL_REST_URL}/inquiries`, {
      method: "POST",
      headers: {
        apikey: EXTERNAL_KEY,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });

    if (response.ok) return { ok: true, error: null };
    const details = (await response.text()).slice(0, 500);
    const message = `External database returned ${response.status}${details ? `: ${details}` : ""}`;
    console.error("[inquiries] external insert failed", response.status, details);
    return { ok: false, error: message };
  } catch (error) {
    console.error("[inquiries] external insert error", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message.slice(0, 500) : "Network request failed",
    };
  }
}

function makeExternalPayloads(data: Inquiry) {
  const fullRow = {
    name: data.name,
    phone: data.phone || null,
    email: data.email || null,
    location: data.location || null,
    service_type: data.service_type || null,
    monthly_bill: data.monthly_bill || null,
    message: data.message || null,
  };
  const details = [
    data.location ? `Location: ${data.location}` : "",
    data.service_type ? `Service: ${data.service_type}` : "",
    data.monthly_bill ? `Monthly bill: ${data.monthly_bill}` : "",
    data.message ? `Message: ${data.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return [
    fullRow,
    {
      name: data.name,
      phone: data.phone || null,
      email: data.email || null,
      message: details || null,
    },
  ];
}

export async function deliverInquiry(data: Inquiry): Promise<ExternalDelivery> {
  const [fullRow, legacyRow] = makeExternalPayloads(data);
  const primary = await forwardToExternal(fullRow);
  if (primary.ok) return primary;
  return forwardToExternal(legacyRow);
}

async function recordExternalDelivery(
  inquiryId: string,
  attempts: number,
  delivery: ExternalDelivery,
) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin
    .from("inquiries")
    .update({
      external_sync_status: delivery.ok ? "synced" : "failed",
      external_sync_attempts: attempts,
      external_synced_at: delivery.ok ? new Date().toISOString() : null,
      external_sync_error: delivery.error,
    })
    .eq("id", inquiryId);

  if (error) throw new Error("The delivery result could not be saved.");
}

export async function saveInquiry(data: Inquiry) {
  const row = {
    name: data.name,
    phone: data.phone || null,
    email: data.email || null,
    location: data.location || null,
    service_type: data.service_type || null,
    monthly_bill: data.monthly_bill || null,
    message: data.message || null,
    external_sync_status: "pending",
  };

  let internalStored = false;
  let inquiryId: string | null = null;
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inserted, error } = await supabaseAdmin
      .from("inquiries")
      .insert(row as never)
      .select("id")
      .single();
    if (error) {
      console.error("[inquiries] primary insert failed", error.message);
    } else {
      internalStored = true;
      inquiryId = inserted?.id ?? null;
    }
  } catch (error) {
    console.error("[inquiries] primary insert error", error);
  }

  const delivery = await deliverInquiry(data);
  if (inquiryId) {
    try {
      await recordExternalDelivery(inquiryId, 1, delivery);
    } catch (error) {
      console.error("[inquiries] couldn't record external sync result", error);
    }
  }

  return {
    ok: internalStored || delivery.ok,
    internalStored,
    externalStored: delivery.ok,
  };
}

export async function retryInquiryDelivery(id: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("inquiries")
    .select("id, name, phone, email, location, service_type, monthly_bill, message, external_sync_status, external_sync_attempts")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) throw new Error("Inquiry not found.");
  const inquiry = data as unknown as StoredInquiry;
  if (inquiry.external_sync_status === "synced") {
    return { ok: true, status: "synced", attempts: inquiry.external_sync_attempts, alreadySynced: true };
  }

  const parsed = inquirySchema.safeParse(inquiry);
  if (!parsed.success) throw new Error("This inquiry cannot be retried because its saved details are invalid.");

  const attempts = inquiry.external_sync_attempts + 1;
  const delivery = await deliverInquiry(parsed.data);
  await recordExternalDelivery(id, attempts, delivery);

  return {
    ok: delivery.ok,
    status: delivery.ok ? "synced" : "failed",
    attempts,
    error: delivery.error,
    alreadySynced: false,
  };
}