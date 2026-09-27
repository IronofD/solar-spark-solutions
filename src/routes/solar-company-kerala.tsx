import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  MapPin,
  Sun,
  FileCheck,
  IndianRupee,
  CloudRain,
  BadgeCheck,
  Phone,
} from "lucide-react";
import heroImage from "@/assets/hero-solar-home.png";
import { SectionCTA } from "@/components/site-chrome";

export const Route = createFileRoute("/solar-company-kerala")({
  component: SolarKerala,
  head: () => ({
    meta: [
      { title: "Java Solar Solutions" },
      {
        name: "description",
        content:
          "Solar company in Kerala for rooftop solar panel installation. On-grid systems, KSEB net metering, subsidy support, and free savings reports for homes and businesses.",
      },
      { property: "og:title", content: "Java Solar Solutions" },
      {
        property: "og:description",
        content:
          "Rooftop solar panel installation across Kerala — KSEB approvals, subsidies, and 25-year warranties handled for you.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/solar-company-kerala" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/solar-company-kerala" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Java Solar Solutions",
          description:
            "Solar panel installation company serving homes and businesses across Kerala.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Akkal Building, Manakkad",
            addressLocality: "Thodupuzha",
            addressRegion: "Kerala",
            postalCode: "685608",
            addressCountry: "IN",
          },
          telephone: "+91-99955-27452",
          areaServed: "Kerala",
        }),
      },
    ],
  }),
});

const highlights = [
  {
    icon: Sun,
    title: "Rooftop Solar for Kerala Homes",
    text: "On-grid rooftop solar systems sized to your actual KSEB consumption, so you never pay for capacity you don't need.",
  },
  {
    icon: FileCheck,
    title: "KSEB Approvals Handled",
    text: "We manage the full KSEB net-metering application, inspection, and commissioning — you never visit an office.",
  },
  {
    icon: IndianRupee,
    title: "Subsidy Support",
    text: "We apply for the PM Surya Ghar central subsidy on eligible home systems and credit the benefit to your project cost.",
  },
  {
    icon: CloudRain,
    title: "Built for the Monsoon",
    text: "Wind-rated mounting, sealed weatherproof wiring, and Tier-1 panels engineered for Kerala's heavy rainfall.",
  },
];

const districts = [
  "Idukki",
  "Ernakulam",
  "Kottayam",
  "Thrissur",
  "Pathanamthitta",
  "Alappuzha",
  "Kollam",
  "Thiruvananthapuram",
  "Palakkad",
  "Malappuram",
  "Kozhikode",
  "Wayanad",
  "Kannur",
  "Kasaragod",
];

function SolarKerala() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sun/30 bg-sun/10 px-4 py-1.5 text-sm font-medium text-sun-dark">
              <MapPin className="size-4" />
              Serving All of Kerala
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Solar Panel Installation in Kerala, Done Right
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Java Solar Solutions is a solar installation company based in
              Thodupuzha, Kerala, installing on-grid rooftop solar systems for
              homes and businesses across the state. From site survey and
              custom design to KSEB paperwork and long-term support, we handle
              everything — so you start saving from day one.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sun-dark px-8 py-4 text-base font-semibold text-foreground shadow-lg shadow-sun-dark/20 transition-all hover:scale-105"
              >
                Get Free Quote
                <ArrowRight className="size-5" />
              </Link>
              <a
                href="tel:+919995527452"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-8 py-4 text-base font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <Phone className="size-5 text-sun-dark" />
                +91 99955 27452
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-sun/5" />
            <img
              src={heroImage}
              alt="Technician installing a rooftop solar panel in Kerala"
              className="relative z-10 w-full rounded-3xl object-cover shadow-2xl"
              width={1440}
              height={900}
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="border-y border-border bg-muted/50 px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Why Kerala Chooses Java Solar
            </h2>
            <p className="mt-4 text-muted-foreground">
              A local team that understands Kerala's climate, KSEB's processes,
              and what a solar system needs to survive here for 25 years.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-sun/10 text-sun">
                  <h.icon className="size-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {h.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {h.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              How Rooftop Solar Works in Kerala
            </h2>
            <p className="mt-4 text-muted-foreground">
              Most Kerala installations are on-grid systems connected to KSEB
              through net metering. Here's the journey from first call to first
              savings.
            </p>
          </div>
          <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Free Site Survey",
                text: "We visit your property, check roof strength, shading, and orientation, and review your recent KSEB bills.",
              },
              {
                step: "2",
                title: "Custom Design & Quote",
                text: "You get a system sized to your consumption, with exact pricing, expected generation, subsidy, and payback period.",
              },
              {
                step: "3",
                title: "Installation & KSEB Approval",
                text: "Our team installs the system, and we complete the KSEB net-metering application, inspection, and meter commissioning.",
              },
              {
                step: "4",
                title: "Savings & Support",
                text: "Your bill drops from the first billing cycle. We stay available for maintenance, cleaning guidance, and warranty support.",
              },
            ].map((s) => (
              <li key={s.step} className="relative rounded-2xl border border-border bg-card p-6">
                <div className="flex size-10 items-center justify-center rounded-full bg-sun-dark font-display text-lg font-bold text-foreground">
                  {s.step}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Cost & subsidy */}
      <section className="bg-navy px-6 py-16 text-cream lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              What Does Solar Cost in Kerala?
            </h2>
            <p className="mt-6 leading-relaxed text-cream/80">
              A quality on-grid rooftop system typically costs ₹45,000 to
              ₹60,000 per kW installed, before subsidy. A 3 kW home system
              usually lands between ₹1.35 and ₹1.8 lakh, and eligible homes can
              reduce that further with the PM Surya Ghar central subsidy.
            </p>
            <p className="mt-4 leading-relaxed text-cream/80">
              With KSEB net metering, most home systems pay for themselves in 4
              to 6 years — and the panels keep generating for 25 years or more.
            </p>
            <Link
              to="/blog/$slug"
              params={{ slug: "solar-panel-cost-kerala-2026" }}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-sun-dark px-6 py-3 font-semibold text-foreground transition-all hover:scale-105"
            >
              Read the Full Cost Guide
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-cream/15 bg-cream/5 p-8">
            <div className="flex items-center gap-3">
              <BadgeCheck className="size-6 text-sun" />
              <h3 className="font-display text-xl font-semibold">
                Quick Answers
              </h3>
            </div>
            <dl className="mt-6 space-y-5">
              {[
                {
                  q: "Do solar panels work during the monsoon?",
                  a: "Yes. Panels generate from light, not heat — typically 10–30% output on cloudy days. Systems are sized around annual consumption, so sunny-season credits cover the monsoon dip.",
                },
                {
                  q: "Do I need batteries?",
                  a: "Usually no. On-grid systems use the KSEB grid as your storage through net metering, which keeps costs low. Battery backup is optional for outage-prone areas.",
                },
                {
                  q: "Who handles the KSEB paperwork?",
                  a: "We do — application, feasibility check, inspection, and bi-directional meter commissioning are all included.",
                },
                {
                  q: "How long does installation take?",
                  a: "The physical installation usually takes 2–4 days. KSEB approval and commissioning add a few weeks, which we manage for you.",
                },
              ].map((item) => (
                <div key={item.q}>
                  <dt className="font-semibold text-cream">{item.q}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-cream/70">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Solar Installers Serving Every Kerala District
            </h2>
            <p className="mt-4 text-muted-foreground">
              Based in Thodupuzha, our installation teams travel across the
              state. Whether you're in a city apartment complex or a hillside
              villa, we bring the same quality and support.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {districts.map((d) => (
              <span
                key={d}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
              >
                <MapPin className="size-3.5 text-sun-dark" />
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      <SectionCTA
        title="Get a Free Solar Quote for Your Kerala Property"
        subtitle="Share your location and average KSEB bill — we'll send a custom savings report within a day."
      />
    </>
  );
}
