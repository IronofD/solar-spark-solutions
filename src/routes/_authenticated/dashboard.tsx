import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Trash2, Upload, LogOut, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CASE_STUDY_COLUMNS, emptyCaseStudy, type CaseStudy } from "@/lib/case-studies";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: AdminProjectsPage,
  head: () => ({
    meta: [
      { title: "Manage Case Studies — Java Solar Solutions" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

type Draft = Omit<CaseStudy, "id"> & { id?: string };

function AdminProjectsPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const { data: isAdmin } = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return false;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id)
        .eq("role", "admin")
        .maybeSingle();
      return Boolean(data);
    },
  });

  const { data: caseStudies = [], isLoading } = useQuery({
    queryKey: ["admin-case-studies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select(CASE_STUDY_COLUMNS)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as CaseStudy[];
    },
  });

  async function uploadPhoto(file: File, field: "after_image_url") {
    if (!draft) return;
    setStatus("Uploading photo…");
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("project-photos").upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (error) {
      setStatus(`Upload failed: ${error.message}`);
      return;
    }
    setDraft({ ...draft, [field]: `/api/public/photo/${path}` });
    setStatus("Photo uploaded.");
  }

  async function save() {
    if (!draft) return;
    if (!draft.title.trim()) {
      setStatus("Title is required.");
      return;
    }
    setSaving(true);
    setStatus(null);
    const payload = {
      title: draft.title.trim().slice(0, 120),
      location: draft.location.trim().slice(0, 120),
      customer_type: draft.customer_type,
      system_size: draft.system_size.trim().slice(0, 40),
      savings: draft.savings.trim().slice(0, 40),
      bill_before: draft.bill_before.trim().slice(0, 40),
      bill_after: draft.bill_after.trim().slice(0, 40),
      description: draft.description.trim().slice(0, 1200),
      highlights: draft.highlights.filter(Boolean).slice(0, 8),
      before_image_url: draft.before_image_url.trim(),
      after_image_url: draft.after_image_url.trim(),
      sort_order: Number(draft.sort_order) || 0,
      published: draft.published,
    };

    const { error } = draft.id
      ? await supabase.from("case_studies").update(payload).eq("id", draft.id)
      : await supabase.from("case_studies").insert(payload);

    setSaving(false);
    if (error) {
      setStatus(`Save failed: ${error.message}`);
      return;
    }
    setDraft(null);
    setStatus("Case study saved.");
    queryClient.invalidateQueries({ queryKey: ["admin-case-studies"] });
    queryClient.invalidateQueries({ queryKey: ["case-studies"] });
  }

  async function remove(id: string) {
    if (!confirm("Delete this case study?")) return;
    const { error } = await supabase.from("case_studies").delete().eq("id", id);
    if (error) {
      setStatus(`Delete failed: ${error.message}`);
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["admin-case-studies"] });
    queryClient.invalidateQueries({ queryKey: ["case-studies"] });
  }

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", search: { next: undefined }, replace: true });
  }

  if (isAdmin === false) {
    return (
      <section className="px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-navy">No admin access</h1>
        <p className="mt-3 text-muted-foreground">This account isn't an administrator for the project gallery.</p>
        <button onClick={signOut} className="mt-6 rounded-xl bg-navy px-6 py-3 font-semibold text-cream">Sign out</button>
      </section>
    );
  }

  return (
    <section className="px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-navy">Project Case Studies</h1>
            <p className="mt-1 text-sm text-muted-foreground">Add real projects with installation photos and system stats.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setDraft({ ...emptyCaseStudy(), sort_order: caseStudies.length + 1 }); setStatus(null); }}
              className="inline-flex items-center gap-2 rounded-xl bg-sun px-5 py-2.5 font-semibold text-foreground hover:bg-sun-dark"
            >
              <Plus className="size-4" /> New case study
            </button>
            <button onClick={signOut} className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold hover:bg-muted">
              <LogOut className="size-4" /> Sign out
            </button>
          </div>
        </div>

        {status && <p className="mt-4 rounded-xl bg-muted px-4 py-3 text-sm text-foreground">{status}</p>}

        {draft && (
          <div className="mt-8 rounded-3xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-xl font-semibold text-navy">{draft.id ? "Edit case study" : "New case study"}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Field label="Title" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} />
              <Field label="Location" value={draft.location} onChange={(v) => setDraft({ ...draft, location: v })} />
              <div className="space-y-2">
                <label className="text-sm font-medium">Customer type</label>
                <select
                  value={draft.customer_type}
                  onChange={(e) => setDraft({ ...draft, customer_type: e.target.value as CaseStudy["customer_type"] })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
                >
                  <option value="home">Homeowner</option>
                  <option value="business">Business</option>
                </select>
              </div>
              <Field label="System size (e.g. 5 kW)" value={draft.system_size} onChange={(v) => setDraft({ ...draft, system_size: v })} />
              <Field label="Bill drop (e.g. 92%)" value={draft.savings} onChange={(v) => setDraft({ ...draft, savings: v })} />
              <Field label="Bill before" value={draft.bill_before} onChange={(v) => setDraft({ ...draft, bill_before: v })} />
              <Field label="Bill after" value={draft.bill_after} onChange={(v) => setDraft({ ...draft, bill_after: v })} />
              <Field label="Display order" value={String(draft.sort_order)} onChange={(v) => setDraft({ ...draft, sort_order: Number(v) || 0 })} />
            </div>

            <div className="mt-4 space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                rows={4} value={draft.description} maxLength={1200}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
              />
            </div>

            <div className="mt-4 space-y-2">
              <label className="text-sm font-medium">Highlights (one per line)</label>
              <textarea
                rows={3} value={draft.highlights.join("\n")}
                onChange={(e) => setDraft({ ...draft, highlights: e.target.value.split("\n") })}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
              />
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <PhotoField
                label="Project photo (after installation)" url={draft.after_image_url}
                onFile={(f) => uploadPhoto(f, "after_image_url")}
                onClear={() => setDraft({ ...draft, after_image_url: "" })}
              />
            </div>

            <label className="mt-6 flex items-center gap-2 text-sm">
              <input type="checkbox" checked={draft.published} onChange={(e) => setDraft({ ...draft, published: e.target.checked })} />
              Show on the public Projects page
            </label>

            <div className="mt-6 flex gap-3">
              <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3 font-semibold text-cream disabled:opacity-60">
                {saving && <Loader2 className="size-4 animate-spin" />} Save case study
              </button>
              <button onClick={() => setDraft(null)} className="rounded-xl border border-border px-6 py-3 font-semibold hover:bg-muted">Cancel</button>
            </div>
          </div>
        )}

        <div className="mt-10 space-y-4">
          {isLoading && <p className="text-sm text-muted-foreground">Loading case studies…</p>}
          {caseStudies.map((cs) => (
            <div key={cs.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4">
              {cs.after_image_url ? (
                <img src={cs.after_image_url} alt={`${cs.title} after solar installation`} className="size-16 rounded-xl object-cover" loading="lazy" />
              ) : (
                <div className="size-16 rounded-xl bg-muted" />
              )}
              <div className="min-w-40 flex-1">
                <div className="font-semibold text-foreground">{cs.title}</div>
                <div className="text-xs text-muted-foreground">
                  {cs.location} · {cs.system_size} · {cs.published ? "Published" : "Hidden"}
                </div>
              </div>
              <button onClick={() => { setDraft(cs); setStatus(null); }} className="rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted">Edit</button>
              <button onClick={() => remove(cs.id)} aria-label={`Delete ${cs.title}`} className="rounded-xl border border-border p-2 text-destructive hover:bg-muted">
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <input
        value={value} maxLength={200} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-sun focus:ring-2 focus:ring-sun/20"
      />
    </div>
  );
}

function PhotoField({ label, url, onFile, onClear }: { label: string; url: string; onFile: (f: File) => void; onClear: () => void }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {url ? (
        <div className="space-y-2">
          <img src={url} alt={label} className="aspect-[4/3] w-full rounded-xl object-cover" loading="lazy" />
          <button onClick={onClear} className="text-xs text-muted-foreground underline">Remove</button>
        </div>
      ) : (
        <label className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
          <Upload className="size-5" />
          Upload photo
          <input
            type="file" accept="image/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }}
          />
        </label>
      )}
    </div>
  );
}
