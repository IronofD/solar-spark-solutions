import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ensureAdminAccount } from "@/lib/admin-login.functions";

export const Route = createFileRoute("/adim")({
  component: HiddenAdminLogin,
  head: () => ({
    meta: [
      { title: "Staff Access — Java Solar Solutions" },
      { name: "description", content: "Private staff access for managing Java Solar Solutions project case studies." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Staff Access — Java Solar Solutions" },
      { property: "og:description", content: "Private staff access page." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function HiddenAdminLogin() {
  const navigate = useNavigate();
  const ensure = useServerFn(ensureAdminAccount);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await ensure({ data: { username, password } });
      if (!res.ok) {
        setError("Invalid username or password.");
        return;
      }
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: res.email,
        password,
      });
      if (signInError) {
        setError("Invalid username or password.");
        return;
      }
      navigate({ to: "/admin" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-sm rounded-3xl border border-border bg-card p-8">
        <h1 className="font-display text-2xl font-bold text-navy">Staff Access</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to edit project case studies and upload photos.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">Username</label>
            <input
              id="username" required value={username} maxLength={60} autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-sun focus:ring-2 focus:ring-sun/20"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input
              id="password" type="password" required minLength={6} maxLength={72} value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-sun focus:ring-2 focus:ring-sun/20"
            />
          </div>
          <button
            type="submit" disabled={busy}
            className="w-full rounded-xl bg-navy px-6 py-3 font-semibold text-cream disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign In"}
          </button>
        </form>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      </div>
    </section>
  );
}
