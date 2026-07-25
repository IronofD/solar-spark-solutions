import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, ArrowRight, Star } from "lucide-react";
import logoAsset from "@/assets/java-solar-logo.png.asset.json";
import { navLinks } from "@/lib/site-data";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className ?? ""}`}>
      <img
        src={logoAsset.url}
        alt="Java Solar Solutions"
        className="h-12 w-auto"
        width="240"
        height="96"
      />
    </Link>
  );
}

export function StarRating() {
  return (
    <div className="flex gap-0.5 text-sun">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="size-4 fill-current" />
      ))}
    </div>
  );
}

export function SiteHeader() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Logo />
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-navy"
              activeProps={{ className: "text-navy font-semibold" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sun px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-sun-dark"
          >
            Get Free Quote
            <ArrowRight className="size-4" />
          </Link>
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
  );
}

export function SiteFooter() {
  return (
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
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-navy">
                    {link.label}
                  </Link>
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
                <a href="tel:+919876543210" className="transition-colors hover:text-navy">
                  +91 98765 43210
                </a>
              </p>
              <p>
                <a href="mailto:hello@javasolar.com" className="transition-colors hover:text-navy">
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
  );
}

export function MobileCTA() {
  return (
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
  );
}

export function SectionCTA({
  title = "Ready to Switch to Solar?",
  subtitle = "Get a free consultation and custom savings report for your property.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-navy px-6 py-16 text-cream lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-3xl font-bold md:text-4xl">{title}</h2>
        <p className="mt-4 text-cream/80">{subtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-sun px-6 py-3 font-semibold text-foreground transition-colors hover:bg-sun-light"
          >
            Get Free Quote
            <ArrowRight className="size-4" />
          </Link>
          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-2 rounded-xl border border-cream/30 bg-transparent px-6 py-3 font-semibold text-cream transition-colors hover:bg-cream/10"
          >
            <Phone className="size-4" />
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
}
