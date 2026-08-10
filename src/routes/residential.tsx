import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Home, Sun, Shield, TrendingDown } from "lucide-react";
import heroImage from "@/assets/hero-solar-home.png";
import { SectionCTA } from "@/components/site-chrome";

export const Route = createFileRoute("/residential")({
  component: ResidentialPage,
  head: () => ({
    meta: [
      { title: "Residential Solar in Kerala — Java Solar Solutions" },
      { name: "description", content: "Rooftop solar for Kerala homes. Cut your KSEB bill, gain energy independence, and enjoy 25-year panel warranties." },
      { property: "og:title", content: "Residential Solar in Kerala — Java Solar Solutions" },
      { property: "og:description", content: "Custom rooftop solar systems for homes across Kerala." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/residential" },
    ],
    links: [{ rel: "canonical", href: "/residential" }],
  }),
});

function ResidentialPage() {
  return (
    <>
      <section className="px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-sun/10 px-3 py-1 text-sm font-semibold text-sun-dark">
              <Home className="size-4" /> For Homeowners
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold text-navy md:text-5xl">Rooftop Solar Built for Kerala Homes</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              A 3–5 kW rooftop system can eliminate almost your entire KSEB bill. We design, install, and maintain solar systems tailored to your roof, load, and budget.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-sun px-8 py-4 font-semibold text-foreground shadow-lg shadow-sun/20 hover:bg-sun-dark">
                Get Free Home Assessment
                <ArrowRight className="size-5" />
              </Link>
              <Link to="/projects" className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-8 py-4 font-semibold text-foreground hover:bg-muted">
                See Home Projects
              </Link>
            </div>
          </div>
          <div className="relative">
            <img src={heroImage} alt="Technician installing a rooftop solar panel" className="w-full rounded-3xl object-cover shadow-2xl" width={1440} height={900} />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-display text-3xl font-bold text-navy md:text-4xl">Why Homeowners Choose Solar</h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { icon: TrendingDown, title: "Slash Your Bill by 80–95%", body: "Most homes see monthly KSEB bills drop from thousands to under ₹500." },
              { icon: Sun, title: "Payback in 4–5 Years", body: "After payback, enjoy 20+ years of nearly free electricity." },
              { icon: Shield, title: "25-Year Warranty", body: "Tier-1 panels with performance warranties that outlast most home appliances." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl bg-card p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-sun/10 text-sun">
                  <f.icon className="size-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-semibold text-navy">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionCTA title="Ready to Power Your Home with Sunshine?" subtitle="Book a free site visit — we'll assess your roof and share a custom savings estimate." />
    </>
  );
}
