import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import heroImage from "@/assets/hero-solar-home.png";
import { testimonials, stats } from "@/lib/site-data";
import { StarRating, SectionCTA } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Java Solar Solutions — Solar Experts in Thodupuzha" },
      { name: "description", content: "Founded in Thodupuzha, Java Solar Solutions brings global solar technology and local expertise to homes and businesses across Kerala." },
      { property: "og:title", content: "About Java Solar Solutions — Solar Experts in Thodupuzha" },
      { property: "og:description", content: "Local Kerala solar installers with a 5.0 Google rating and hundreds of installed systems." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function AboutPage() {
  return (
    <>
      <section className="px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-sun">About Us</span>
              <h1 className="mt-3 font-display text-4xl font-bold text-navy md:text-5xl">Rooted in Thodupuzha, Powering Kerala</h1>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Founded with a vision to make renewable energy accessible to every household, Java Solar Solutions combines global solar technology with deep local expertise. We are your neighbors in Thodupuzha, committed to helping families and businesses across Kerala switch to clean, affordable power.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our team manages everything — from consultation, custom system design, and KSEB approvals to professional installation and long-term maintenance — so you can enjoy worry-free energy savings.
              </p>
              <div className="mt-8 rounded-2xl border border-border bg-muted/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-sun/10 text-sun">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Visit Our Office</div>
                    <address className="not-italic text-muted-foreground">
                      Akkal Building, Manakkad<br />Thodupuzha, Kerala 685608
                    </address>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-3xl bg-sun/10 p-6">
              <img src={heroImage} alt="Technician installing a rooftop solar panel" className="aspect-[4/3] w-full rounded-2xl object-cover" width={800} height={600} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/50 px-6 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-bold text-navy md:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Trusted by Your Neighbors</h2>
            <p className="mt-4 text-muted-foreground">See what people in Thodupuzha say about their solar experience with us.</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((review) => (
              <div key={review.name} className="relative rounded-2xl border border-border bg-card p-6">
                <div className="mb-4"><StarRating /></div>
                <p className="mb-6 text-foreground leading-relaxed">{review.text}</p>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-navy/10 font-semibold text-navy">{review.initials}</div>
                  <div>
                    <div className="font-semibold text-foreground">{review.name}</div>
                    <div className="text-xs text-muted-foreground">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SectionCTA />
    </>
  );
}
