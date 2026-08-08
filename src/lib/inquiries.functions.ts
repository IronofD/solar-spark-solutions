import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().max(30).optional().default(""),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().default(""),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("inquiries").insert({
      name: data.name,
      phone: data.phone || null,
      email: data.email || null,
      message: data.message || null,
    });

    if (error) {
      console.error("[inquiries] insert failed", error.message);
      return { ok: false as const };
    }

    return { ok: true as const };
  });
