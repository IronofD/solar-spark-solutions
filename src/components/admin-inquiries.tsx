import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Inquiry = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  location: string | null;
  service_type: string | null;
  monthly_bill: string | null;
  message: string | null;
  created_at: string;
};

const DATE_RANGES = [
  { value: "all", label: "All time" },
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
];

export function AdminInquiries() {
  const [service, setService] = useState("all");
  const [location, setLocation] = useState("");
  const [range, setRange] = useState("all");

  const { data: inquiries = [], isLoading, error } = useQuery({
    queryKey: ["admin-inquiries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inquiries")
        .select("id, name, phone, email, location, service_type, monthly_bill, message, created_at")
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) throw error;
      return (data ?? []) as Inquiry[];
    },
  });

  const filtered = useMemo(() => {
    const q = location.trim().toLowerCase();
    const cutoff = range === "all" ? null : Date.now() - Number(range) * 86400000;
    return inquiries.filter((i) => {
      if (service !== "all" && (i.service_type ?? "") !== service) return false;
      if (q && !(i.location ?? "").toLowerCase().includes(q)) return false;
      if (cutoff && new Date(i.created_at).getTime() < cutoff) return false;
      return true;
    });
  }, [inquiries, service, location, range]);

  return (
    <div className="mt-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy">Customer Inquiries</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {isLoading ? "Loading…" : `${filtered.length} of ${inquiries.length} inquiries`}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 rounded-2xl border border-border bg-card p-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="f-service" className="text-sm font-medium">Service type</label>
          <select
            id="f-service" value={service} onChange={(e) => setService(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
          >
            <option value="all">All services</option>
            <option value="Residential Solar">Residential Solar</option>
            <option value="Commercial Solar">Commercial Solar</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="f-location" className="text-sm font-medium">Location</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="f-location" value={location} maxLength={100}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search location"
              className="w-full rounded-xl border border-input bg-background py-2.5 pl-9 pr-4 text-sm"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="f-range" className="text-sm font-medium">Date</label>
          <select
            id="f-range" value={range} onChange={(e) => setRange(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
          >
            {DATE_RANGES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-muted px-4 py-3 text-sm text-destructive">
          Couldn't load inquiries: {(error as Error).message}
        </p>
      )}

      <div className="mt-6 space-y-4">
        {!isLoading && filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No inquiries match these filters.
          </p>
        )}

        {filtered.map((i) => (
          <article key={i.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-foreground">{i.name}</h3>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  {i.phone && (
                    <a href={`tel:${i.phone}`} className="inline-flex items-center gap-1 hover:text-navy">
                      <Phone className="size-3" /> {i.phone}
                    </a>
                  )}
                  {i.email && (
                    <a href={`mailto:${i.email}`} className="inline-flex items-center gap-1 hover:text-navy">
                      <Mail className="size-3" /> {i.email}
                    </a>
                  )}
                  {i.location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3" /> {i.location}
                    </span>
                  )}
                </div>
              </div>
              <time dateTime={i.created_at} className="text-xs text-muted-foreground">
                {new Date(i.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
              </time>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {i.service_type && (
                <span className="rounded-full bg-navy/10 px-3 py-1 text-xs font-semibold text-navy">{i.service_type}</span>
              )}
              {i.monthly_bill && (
                <span className="rounded-full bg-sun/15 px-3 py-1 text-xs font-semibold text-foreground">
                  Bill: {i.monthly_bill}
                </span>
              )}
            </div>

            {i.message && <p className="mt-3 whitespace-pre-line text-sm text-muted-foreground">{i.message}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}
