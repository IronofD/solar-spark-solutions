import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sun, Shield, BadgeCheck } from "lucide-react";
import heroImage from "@/assets/hero-solar-home.png";
import { stats, benefits, services } from "@/lib/site-data";
import { StarRating } from "@/components/site-chrome";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Java Solar Solutions — Affordable Solar in Thodupuzha, Kerala" },
      { name: "description", content: "Affordable rooftop solar for homes and businesses in Thodupuzha, Kerala. Free consultation, KSEB paperwork included, 25-year panel warranty." },
      { property: "og:title", content: "Java Solar Solutions — Affordable Solar in Thodupuzha, Kerala" },
      { property: "og:description", content: "Rooftop solar installations for homes and businesses in Kerala. Start saving from day one." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sun/30 bg-sun/10 px-4 py-1.5 text-sm font-medium text-sun-dark">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sun opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-sun" />
              </span>
              Solar Experts in Thodupuzha, Kerala
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight text-navy md:text-5xl lg:text-6xl">
              Power Your Home with the Sun. Save More Every Day.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Java Solar Solutions makes solar power simple and affordable for
              homeowners and businesses across Kerala. From custom design to
              installation and support, we help you gain energy independence and
              slash your electricity bills.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-sun px-8 py-4 text-base font-semibold text-foreground shadow-lg shadow-sun/20 transition-all hover:bg-sun-dark">
                Get Free Quote
                <ArrowRight className="size-5" />
              </Link>
              <Link to="/services" className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-8 py-4 text-base font-semibold text-foreground transition-colors hover:bg-muted">
                Explore Services
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["bg-navy", "bg-sun", "bg-navy-light"].map((color, i) => (
                  <div key={i} className={`size-9 rounded-full border-2 border-background ${color}`} />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span>5.02 Google Rating</span>
                  <StarRating />
                </div>
                <p className="text-xs text-muted-foreground">Trusted by families across Idukki</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-sun/5" />
            <img src={heroImage} alt="A Kerala home with solar panels installed on the roof" className="relative z-10 w-full rounded-3xl object-cover shadow-2xl" width={1440} height={900} loading="eager" />
            <div className="absolute -bottom-6 -left-6 z-20 rounded-2xl border border-border bg-background p-5 shadow-xl">
              <div className="text-3xl font-bold text-navy">₹0</div>
              <p className="text-sm text-muted-foreground">Average electricity bill<br />for many of our customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-border bg-muted/50 px-6 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-bold text-navy md:text-4xl">{stat.value}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services teaser */}
      <section className="px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-sun">What We Offer</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy md:text-4xl">Complete Solar Solutions</h2>
            <p className="mt-4 text-muted-foreground">End-to-end solar services designed for Kerala homes and businesses.</p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="group rounded-3xl border border-border bg-card p-8 transition-all hover:border-sun/40 hover:shadow-lg">
                <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-sun/10 text-sun transition-transform group-hover:scale-110">
                  <service.icon className="size-7" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{service.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 font-semibold text-foreground transition-colors hover:bg-muted">
              See All Services
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="bg-navy px-6 py-20 text-cream lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-sun">Why Java Solar</span>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Local Expertise, Lasting Quality</h2>
              <p className="mt-6 text-cream/80 leading-relaxed">
                We understand the unique needs of Kerala homeowners and businesses. From heavy monsoon rains to high humidity, we design systems that last and perform at their best year after year.
              </p>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-sun px-6 py-3 font-semibold text-foreground transition-colors hover:bg-sun-light">
                Talk to Our Team
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="rounded-2xl border border-cream/10 bg-cream/5 p-6">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-sun/20 text-sun">
                    <benefit.icon className="size-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-cream/70 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
