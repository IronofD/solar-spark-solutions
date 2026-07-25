import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Factory, TrendingDown, BadgeCheck } from "lucide-react";
import { SectionCTA } from "@/components/site-chrome";

export const Route = createFileRoute("/commercial")({
  component: CommercialPage,
  head: () => ({
    meta: [
      { title: "Commercial Solar in Kerala — Java Solar Solutions" },
      { name: "description", content: "Commercial and industrial solar installations for shops, offices, hospitals, and factories across Kerala. Cut operating costs and claim depreciation." },
      { property: "og:title", content: "Commercial Solar in Kerala — Java Solar Solutions" },
      { property: "og:description", content: "High-capacity solar for Kerala businesses — reduce operating costs and gain tax benefits." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/commercial" },
    ],
    links: [{ rel: "canonical", href: "/commercial" }],
  }),
});

function CommercialPage() {
  return (
    <>
      <section className="px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-sun/10 px-3 py-1 text-sm font-semibold text-sun-dark">
            <Building2 className="size-4" /> For Businesses
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold text-navy md:text-5xl">Commercial Solar That Pays for Itself</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            High-capacity solar installations for shops, offices, hospitals, resorts, and industrial units across Thodupuzha and Kerala. Offset daytime loads, gain depreciation benefits, and lock in stable energy costs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-sun px-8 py-4 font-semibold text-foreground shadow-lg shadow-sun/20 hover:bg-sun-dark">
              Request Commercial Quote
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: TrendingDown, title: "70–90% Bill Reduction", body: "Daytime loads run directly on solar, cutting your operating expenses." },
            { icon: BadgeCheck, title: "Accelerated Depreciation", body: "Claim up to 40% depreciation in year one under Section 32." },
            { icon: Factory, title: "5–500 kW Systems", body: "From small shops to industrial rooftops, we scale to your load." },
            { icon: Building2, title: "Turnkey Delivery", body: "Design, DISCOM liaison, installation, and O&M under one roof." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-navy/10 text-navy">
                <f.icon className="size-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg font-semibold text-navy">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl font-bold text-navy md:text-4xl">Industries We Serve</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {["Retail & Showrooms", "Hospitals & Clinics", "Hotels & Resorts", "Educational Institutions", "Manufacturing Units", "Offices & Co-working"].map((ind) => (
              <div key={ind} className="rounded-xl border border-border bg-card p-4 text-center font-medium text-foreground">
                {ind}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionCTA title="Cut Your Business's Energy Costs" subtitle="Our team will visit your site and prepare a detailed ROI report at no cost." />
    </>
  );
}
