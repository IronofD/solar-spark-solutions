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

const EXTERNAL_REST_URL = "https://aihkehhgnssnvaogdonu.supabase.co/rest/v1";
const EXTERNAL_KEY = "sb_publishable_juZytPp6ybGh58SrYme1sw_3VMbXc3G";

async function forwardToExternal(row: Record<string, unknown>) {
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

    if (!response.ok) {
      console.error("[inquiries] external insert failed", response.status, await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("[inquiries] external insert error", error);
    return false;
  }
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
  };

  let internalStored = false;
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("inquiries").insert(row as never);
    if (error) {
      console.error("[inquiries] primary insert failed", error.message);
    } else {
      internalStored = true;
    }
  } catch (error) {
    console.error("[inquiries] primary insert error", error);
  }

  let externalStored = await forwardToExternal(row);
  if (!externalStored) {
    // The external table may have only the original four columns.
    const details = [
      data.location ? `Location: ${data.location}` : "",
      data.service_type ? `Service: ${data.service_type}` : "",
      data.monthly_bill ? `Monthly bill: ${data.monthly_bill}` : "",
      data.message ? `Message: ${data.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    externalStored = await forwardToExternal({
      name: data.name,
      phone: data.phone || null,
      email: data.email || null,
      message: details || null,
    });
  }

  return {
    ok: internalStored || externalStored,
    internalStored,
    externalStored,
  };
}