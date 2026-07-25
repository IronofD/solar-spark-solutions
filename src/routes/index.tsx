import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useCallback } from "react";
import {
  Home,
  Building2,
  Wrench,
  Sun,
  Shield,
  BadgeCheck,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Star,
  ArrowRight,
  Mail,
  Zap,
  TrendingDown,
  Images,
} from "lucide-react";

import logoAsset from "@/assets/java-solar-logo.png.asset.json";
import heroImage from "@/assets/hero-solar-home.jpg";
import homeBefore from "@/assets/project-home-before.jpg.asset.json";
import homeAfter from "@/assets/project-home-after.jpg.asset.json";
import businessBefore from "@/assets/project-business-before.jpg.asset.json";
import businessAfter from "@/assets/project-business-after.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Java Solar Solutions — Solar Power in Manakkad, Kerala" },
      {
        name: "description",
        content:
          "Java Solar Solutions powers homes and businesses in Manakkad, Thodupuzha with affordable, high-quality solar panel installations. Save on electricity bills and gain energy independence.",
      },
      {
        property: "og:title",
        content: "Java Solar Solutions — Solar Power in Manakkad, Kerala",
      },
      {
        property: "og:description",
        content:
          "Affordable solar panel installations for homes and businesses in Thodupuzha, Kerala. Start saving from day one.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    icon: Home,
    title: "Residential Solar",
    description:
      "Custom rooftop solar systems for villas and homes in Kerala. Designed to eliminate or drastically reduce your monthly KSEB electricity bill.",
  },
  {
    icon: Building2,
    title: "Commercial Solar",
    description:
      "High-capacity installations for shops, offices, hospitals, and industrial units in Thodupuzha and surrounding areas.",
  },
  {
    icon: Wrench,
    title: "Installation & Support",
    description:
      "End-to-end service from site inspection and KSEB paperwork to professional installation and long-term maintenance.",
  },
];

const benefits = [
  {
    icon: Sun,
    title: "Kerala Climate Optimized",
    description:
      "Systems engineered to perform through monsoon rains and intense tropical sunshine.",
  },
  {
    icon: Shield,
    title: "Premium Components",
    description:
      "We use Tier-1 solar panels and proven inverters backed by long-term warranties.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Local Team",
    description:
      "Based in Manakkad with a 5.02 Google review rating and a growing list of happy neighbors.",
  },
];

const testimonials = [
  {
    name: "Rajesh K.",
    role: "Manakkad Resident",
    text: "We haven't paid an electricity bill in six months. The installation was professional and they handled all the KSEB paperwork for us.",
    initials: "RK",
  },
  {
    name: "Aneesh M.",
    role: "Business Owner",
    text: "Best decision for my shop. The payback period was exactly what they estimated, and the work quality is excellent.",
    initials: "AM",
  },
  {
    name: "Sajitha T.",
    role: "Thodupuzha Resident",
    text: "Very transparent pricing and friendly team. They explained everything clearly and the system is running perfectly.",
    initials: "ST",
  },
];

const stats = [
  { value: "450+", label: "Homes Powered" },
  { value: "12MW+", label: "Capacity Installed" },
  { value: "5.02", label: "Google Rating" },
  { value: "25Y", label: "Panel Warranty" },
];

const projects = [
  {
    id: "home-manakkad",
    type: "home" as const,
    title: "Manakkad Family Home",
    location: "Manakkad, Kerala",
    beforeImage: homeBefore,
    afterImage: homeAfter,
    systemSize: "5 kW",
    savings: "92%",
    billBefore: "₹4,800/mo",
    billAfter: "₹380/mo",
    description:
      "A two-story family home switched to a 5 kW rooftop system. Monthly KSEB bills dropped from nearly ₹4,800 to under ₹400, with surplus power exported to the grid.",
    highlights: ["5 kW grid-tied system", "Net metering enabled", "25-year panel warranty"],
  },
  {
    id: "business-thodupuzha",
    type: "business" as const,
    title: "Thodupuzha Commercial Complex",
    location: "Thodupuzha, Kerala",
    beforeImage: businessBefore,
    afterImage: businessAfter,
    systemSize: "10 kW",
    savings: "78%",
    billBefore: "₹18,500/mo",
    billAfter: "₹4,100/mo",
    description:
      "A retail and office building reduced its operating costs with a 10 kW commercial installation. The system runs lighting, AC, and equipment during peak business hours.",
    highlights: ["10 kW commercial array", "Daytime load offset", "Depreciation benefits"],
  },
];

function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
}: {
  beforeImage: { url: string };
  afterImage: { url: string };
  beforeAlt: string;
  afterAlt: string;
}) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handlePointerDown = (clientX: number) => {
    setIsDragging(true);
    updatePosition(clientX);
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDragging) return;
    updatePosition(clientX);
  };

  const stopDragging = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] cursor-ew-resize overflow-hidden rounded-2xl bg-muted select-none"
      onMouseDown={(e) => handlePointerDown(e.clientX)}
      onMouseMove={(e) => handlePointerMove(e.clientX)}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
      onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
      onTouchEnd={stopDragging}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
        if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
      }}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      tabIndex={0}
    >
      <img
        src={beforeImage.url}
        alt={beforeAlt}
        className="absolute inset-0 h-full w-full object-cover"
        width={1024}
        height={768}
        loading="lazy"
        draggable={false}
      />
      <img
        src={afterImage.url}
        alt={afterAlt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        width={1024}
        height={768}
        loading="lazy"
        draggable={false}
      />
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)]"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      />
      <div
        className="pointer-events-none absolute top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-sun text-white shadow-lg"
        style={{ left: `${position}%` }}
      >
        <ArrowRight className="size-4" />
      </div>
      <span className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2 py-1 text-xs font-semibold text-white">
        Before
      </span>
      <span className="absolute bottom-3 right-3 rounded-md bg-sun/90 px-2 py-1 text-xs font-semibold text-foreground">
        After
      </span>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:shadow-lg">
      <BeforeAfterSlider
        beforeImage={project.beforeImage}
        afterImage={project.afterImage}
        beforeAlt={`Before solar installation — ${project.title}`}
        afterAlt={`After solar installation — ${project.title}`}
      />
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sun/10 px-3 py-1 text-xs font-semibold text-sun-dark">
            {project.type === "home" ? (
              <Home className="size-3.5" />
            ) : (
              <Building2 className="size-3.5" />
            )}
            {project.type === "home" ? "Homeowner" : "Business"}
          </span>
          <span className="text-xs text-muted-foreground">{project.location}</span>
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-5 grid grid-cols-3 gap-3 rounded-2xl bg-muted/50 p-4">
          <div>
            <div className="text-xs text-muted-foreground">System</div>
            <div className="font-semibold text-navy">{project.systemSize}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Bill Drop</div>
            <div className="font-semibold text-navy">{project.savings}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Now Paying</div>
            <div className="font-semibold text-navy">{project.billAfter}</div>
          </div>
        </div>
        <ul className="mt-5 space-y-2">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="size-4 text-sun" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function Logo({ className }: { className?: string }) {
  return (
    <a href="/" className={`flex items-center gap-2 ${className ?? ""}`}>
      <img
        src={logoAsset.url}
        alt="Java Solar Solutions"
        className="h-12 w-auto"
        width="240"
        height="96"
      />
    </a>
  );
}

function StarRating() {
  return (
    <div className="flex gap-0.5 text-sun">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="size-4 fill-current" />
      ))}
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen font-sans text-foreground antialiased">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Logo />

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-navy"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sun px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-sun-dark"
            >
              Get Free Quote
              <ArrowRight className="size-4" />
            </a>
          </div>

          <a
            href="tel:+919876543210"
            className="flex size-10 items-center justify-center rounded-full bg-sun text-foreground md:hidden"
            aria-label="Call Java Solar Solutions"
          >
            <Phone className="size-5" />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sun/30 bg-sun/10 px-4 py-1.5 text-sm font-medium text-sun-dark">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sun opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-sun" />
              </span>
              Solar Experts in Manakkad, Kerala
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight text-navy md:text-5xl lg:text-6xl">
              Power Your Home with the Sun. Save More Every Day.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Java Solar Solutions makes solar power simple and affordable for
              homeowners and businesses across Thodupuzha. From custom design to
              installation and support, we help you gain energy independence and
              slash your electricity bills.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sun px-8 py-4 text-base font-semibold text-foreground shadow-lg shadow-sun/20 transition-all hover:bg-sun-dark"
              >
                Get Free Quote
                <ArrowRight className="size-5" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-8 py-4 text-base font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Explore Services
              </a>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["bg-navy", "bg-sun", "bg-navy-light"].map((color, i) => (
                  <div
                    key={i}
                    className={`size-9 rounded-full border-2 border-background ${color}`}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span>5.02 Google Rating</span>
                  <StarRating />
                </div>
                <p className="text-xs text-muted-foreground">
                  Trusted by families across Idukki
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-sun/5" />
            <img
              src={heroImage}
              alt="A Kerala home with solar panels installed on the roof"
              className="relative z-10 w-full rounded-3xl object-cover shadow-2xl"
              width={1440}
              height={900}
              loading="eager"
            />
            <div className="absolute -bottom-6 -left-6 z-20 rounded-2xl border border-border bg-background p-5 shadow-xl">
              <div className="text-3xl font-bold text-navy">₹0</div>
              <p className="text-sm text-muted-foreground">
                Average electricity bill<br />for many of our customers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-border bg-muted/50 px-6 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-bold text-navy md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-sun">
              What We Offer
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy md:text-4xl">
              Complete Solar Solutions
            </h2>
            <p className="mt-4 text-muted-foreground">
              End-to-end solar services designed for Kerala homes and businesses.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-3xl border border-border bg-card p-8 transition-all hover:border-sun/40 hover:shadow-lg"
              >
                <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-sun/10 text-sun transition-transform group-hover:scale-110">
                  <service.icon className="size-7" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-navy px-6 py-20 text-cream lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-sun">
                Why Java Solar
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                Local Expertise, Lasting Quality
              </h2>
              <p className="mt-6 text-cream/80 leading-relaxed">
                We understand the unique needs of Kerala homeowners and
                businesses. From heavy monsoon rains to high humidity, we
                design systems that last and perform at their best year after
                year.
              </p>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-sun px-6 py-3 font-semibold text-foreground transition-colors hover:bg-sun-light"
              >
                Talk to Our Team
                <ArrowRight className="size-4" />
              </a>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-cream/10 bg-cream/5 p-6"
                >
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-sun/20 text-sun">
                    <benefit.icon className="size-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-lg font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm text-cream/70 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <span className="text-sm font-semibold uppercase tracking-wider text-sun">
                About Us
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-navy md:text-4xl">
                Rooted in Manakkad, Powering Kerala
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Founded with a vision to make renewable energy accessible to
                every household, Java Solar Solutions combines global solar
                technology with deep local expertise. We are your neighbors in
                Manakkad, committed to helping families and businesses across
                Thodupuzha and Idukki switch to clean, affordable power.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our team manages everything — from consultation, custom system
                design, and KSEB approvals to professional installation and
                long-term maintenance — so you can enjoy worry-free energy
                savings.
              </p>
              <div className="mt-8 rounded-2xl border border-border bg-muted/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-sun/10 text-sun">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      Visit Our Office
                    </div>
                    <address className="not-italic text-muted-foreground">
                      Manakkad, Thodupuzha
                      <br />
                      Kerala, 685608
                    </address>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-3xl bg-sun/10 p-6">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                  <img
                    src={heroImage}
                    alt="Close-up of solar panels on a Kerala rooftop"
                    className="h-full w-full object-cover"
                    width={800}
                    height={600}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="bg-muted/30 px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-sun">
              Reviews
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy md:text-4xl">
              Trusted by Your Neighbors
            </h2>
            <p className="mt-4 text-muted-foreground">
              See what people in Thodupuzha say about their solar experience with us.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((review) => (
              <div
                key={review.name}
                className="relative rounded-2xl border border-border bg-card p-6"
              >
                <div className="absolute right-6 top-6 text-4xl font-serif text-sun/20">
                  "
                </div>
                <div className="mb-4">
                  <StarRating />
                </div>
                <p className="mb-6 text-foreground leading-relaxed">
                  {review.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-navy/10 font-semibold text-navy">
                    {review.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {review.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {review.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://www.google.com/search?q=Java+Solar+Solutions+Manakkad+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy underline-offset-4 hover:underline"
            >
              Read our 5.02 Google reviews
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-sun">
            Contact
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy md:text-4xl">
            Ready to Switch to Solar?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Contact Java Solar Solutions for a free site inspection and savings
            report tailored to your home or business.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-sun/10 text-sun">
                  <Phone className="size-5" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Phone</div>
                  <a
                    href="tel:+919876543210"
                    className="text-muted-foreground transition-colors hover:text-navy"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-sun/10 text-sun">
                  <Mail className="size-5" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Email</div>
                  <a
                    href="mailto:hello@javasolar.com"
                    className="text-muted-foreground transition-colors hover:text-navy"
                  >
                    hello@javasolar.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-sun/10 text-sun">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Address</div>
                  <address className="not-italic text-muted-foreground">
                    Manakkad, Thodupuzha
                    <br />
                    Kerala, 685608
                  </address>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-sun/10 text-sun">
                  <Clock className="size-5" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Hours</div>
                  <p className="text-muted-foreground">
                    Mon — Sat: 9:00 AM — 6:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-sun focus:ring-2 focus:ring-sun/20"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-sun focus:ring-2 focus:ring-sun/20"
                  />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-sun focus:ring-2 focus:ring-sun/20"
                />
              </div>
              <div className="mt-4 space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Project Details
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your home, average electricity bill, or any questions..."
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-sun focus:ring-2 focus:ring-sun/20"
                />
              </div>
              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-sun px-6 py-4 text-base font-semibold text-foreground shadow-lg shadow-sun/20 transition-colors hover:bg-sun-dark"
              >
                Submit Inquiry
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                We will get back to you within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 px-6 pb-28 pt-16 md:pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <Logo />
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                Powering homes and businesses across Manakkad, Thodupuzha, and
                Idukki with affordable, high-quality solar energy solutions.
              </p>
            </div>
            <div>
              <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                Quick Links
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-navy"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                Contact
              </div>
              <address className="not-italic text-sm text-muted-foreground">
                <p>Manakkad, Thodupuzha</p>
                <p>Kerala, 685608</p>
                <p className="mt-2">
                  <a
                    href="tel:+919876543210"
                    className="transition-colors hover:text-navy"
                  >
                    +91 98765 43210
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:hello@javasolar.com"
                    className="transition-colors hover:text-navy"
                  >
                    hello@javasolar.com
                  </a>
                </p>
              </address>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Java Solar Solutions. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background p-4 md:hidden">
        <div className="flex gap-3">
          <a
            href="tel:+919876543210"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-cream shadow-lg"
          >
            <Phone className="size-4" />
            Call
          </a>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-lg"
          >
            <MessageCircle className="size-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
