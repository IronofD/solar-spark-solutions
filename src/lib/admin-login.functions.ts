import { createServerFn } from "@tanstack/react-start";

export const ADMIN_USERNAME = "deon";
export const ADMIN_EMAIL = "deon@javasolar.local";

/**
 * Ensures the single shared admin account exists (username: deon).
 * Called from the hidden /adim login page before signing in.
 */
export const ensureAdminAccount = createServerFn({ method: "POST" })
  .inputValidator((data: { username: string; password: string }) => data)
  .handler(async ({ data }) => {
    if (data.username.trim().toLowerCase() !== ADMIN_USERNAME || data.password.length < 6) {
      return { ok: false as const };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: list } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    let userId = list?.users.find((u) => u.email === ADMIN_EMAIL)?.id;

    if (!userId) {
      const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: data.password,
        email_confirm: true,
      });
      if (error || !created.user) {
        console.error("[adim] create admin failed", error?.message);
        return { ok: false as const };
      }
      userId = created.user.id;
    }

    await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });

    return { ok: true as const, email: ADMIN_EMAIL };
  });
