import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Admin Sign In — Java Solar Solutions" },
      { name: "description", content: "Sign in to manage Java Solar Solutions project case studies." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Sign In — Java Solar Solutions" },
      { property: "og:description", content: "Team access for managing solar project case studies." },
      { property: "og:type", content: "website" },
    ],
  }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setMessage("Account created. If email confirmation is required, check your inbox — otherwise sign in now.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setMessage(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setMessage("Google sign-in failed. Please try again.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/admin" });
  }

  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8">
        <h1 className="font-display text-2xl font-bold text-navy">
          {mode === "signin" ? "Admin Sign In" : "Create Admin Account"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage the project gallery case studies for Java Solar Solutions.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email" type="email" required value={email} maxLength={255}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-sun focus:ring-2 focus:ring-sun/20"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input
              id="password" type="password" required minLength={6} maxLength={72} value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-sun focus:ring-2 focus:ring-sun/20"
            />
          </div>
          <button
            type="submit" disabled={busy}
            className="w-full rounded-xl bg-navy px-6 py-3 font-semibold text-cream disabled:opacity-60"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <button
          onClick={handleGoogle}
          className="mt-3 w-full rounded-xl border border-border bg-background px-6 py-3 font-semibold text-foreground hover:bg-muted"
        >
          Continue with Google
        </button>

        {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}

        <button
          onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setMessage(null); }}
          className="mt-6 text-sm text-sun-dark underline"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>

        <div className="mt-6 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-navy">← Back to website</Link>
        </div>
      </div>
    </section>
  );
}
