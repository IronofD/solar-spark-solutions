import { createFileRoute } from "@tanstack/react-router";
import { services } from "@/lib/site-data";
import { SectionCTA } from "@/components/site-chrome";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Solar Services — Java Solar Solutions" },
      { name: "description", content: "Residential and commercial solar installations, KSEB paperwork, maintenance, and long-term support across Kerala." },
      { property: "og:title", content: "Solar Services — Java Solar Solutions" },
      { property: "og:description", content: "End-to-end solar services for Kerala homes and businesses." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
});

function ServicesPage() {
  return (
    <>
      <section className="px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-sun">Services</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-navy md:text-5xl">Complete Solar Solutions for Kerala</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              From consultation and system design to installation, KSEB approvals, and long-term maintenance — we handle the entire journey to solar.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="group rounded-3xl border border-border bg-card p-8 transition-all hover:border-sun/40 hover:shadow-lg">
                <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-sun/10 text-sun transition-transform group-hover:scale-110">
                  <service.icon className="size-7" strokeWidth={1.5} />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">{service.title}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Free Consultation", body: "We visit your site, understand your energy needs, and study your KSEB bill." },
              { step: "02", title: "Custom Design", body: "We design a solar system sized precisely for your rooftop and consumption." },
              { step: "03", title: "Installation", body: "Professional installation by certified technicians using Tier-1 components." },
              { step: "04", title: "KSEB & Support", body: "We handle net-metering paperwork and provide ongoing maintenance." },
            ].map((step) => (
              <div key={step.step} className="rounded-2xl border border-border bg-muted/30 p-6">
                <div className="font-display text-3xl font-bold text-sun">{step.step}</div>
                <h3 className="mt-2 font-semibold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SectionCTA />
    </>
  );
}
