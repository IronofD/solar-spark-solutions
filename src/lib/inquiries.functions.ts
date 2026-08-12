import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().max(30).optional().default(""),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  location: z.string().trim().max(150).optional().default(""),
  service_type: z.string().trim().max(50).optional().default(""),
  monthly_bill: z.string().trim().max(50).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
});

// External Supabase project (publishable key — safe to keep in code)
const EXTERNAL_REST_URL = "https://aihkehhgnssnvaogdonu.supabase.co/rest/v1";
const EXTERNAL_KEY = "sb_publishable_juZytPp6ybGh58SrYme1sw_3VMbXc3G";

async function forwardToExternal(row: Record<string, unknown>) {
  try {
    const res = await fetch(`${EXTERNAL_REST_URL}/inquiries`, {
      method: "POST",
      headers: {
        apikey: EXTERNAL_KEY,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
    if (!res.ok) {
      console.error("[inquiries] external insert failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("[inquiries] external insert error", e);
    return false;
  }
}

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const row = {
      name: data.name,
      phone: data.phone || null,
      email: data.email || null,
      location: data.location || null,
      service_type: data.service_type || null,
      monthly_bill: data.monthly_bill || null,
      message: data.message || null,
    };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("inquiries").insert(row as never);
    if (error) console.error("[inquiries] insert failed", error.message);

    // External project may not have the newer columns — fold them into the message.
    const details = [
      data.location ? `Location: ${data.location}` : "",
      data.service_type ? `Service: ${data.service_type}` : "",
      data.monthly_bill ? `Monthly bill: ${data.monthly_bill}` : "",
      data.message ? `Message: ${data.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    let external = await forwardToExternal(row);
    if (!external) {
      external = await forwardToExternal({
        name: data.name,
        phone: data.phone || null,
        email: data.email || null,
        message: details || null,
      });
    }

    if (error && !external) return { ok: false as const };
    return { ok: true as const };
  });
