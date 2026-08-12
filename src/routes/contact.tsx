import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { submitInquiry } from "@/lib/inquiries.functions";


export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Java Solar Solutions — Free Solar Quote in Kerala" },
      { name: "description", content: "Get a free site visit and custom solar quote in Thodupuzha and across Kerala. Call, WhatsApp, or send us a message." },
      { property: "og:title", content: "Contact Java Solar Solutions — Free Solar Quote in Kerala" },
      { property: "og:description", content: "Contact Java Solar Solutions for a free consultation and solar quote." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  const send = useServerFn(submitInquiry);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setBusy(true);
    try {
      const res = await send({
        data: {
          name: String(fd.get("name") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          email: String(fd.get("email") ?? ""),
          location: String(fd.get("location") ?? ""),
          service_type: String(fd.get("service_type") ?? ""),
          monthly_bill: String(fd.get("monthly_bill") ?? ""),
          message: String(fd.get("message") ?? ""),
        },
      });
      if (res.ok) {
        toast.success("Thanks! We've received your inquiry and will get back to you within 24 hours.");
        form.reset();
      } else {
        toast.error("Something went wrong. Please call or WhatsApp us instead.");
      }
    } catch {
      toast.error("Something went wrong. Please call or WhatsApp us instead.");
    } finally {
      setBusy(false);
    }
  }

  return (

    <section className="px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-sun">Contact</span>
        <h1 className="mt-3 font-display text-4xl font-bold text-navy md:text-5xl">Ready to Switch to Solar?</h1>
        <p className="mt-4 text-muted-foreground">
          Contact Java Solar Solutions for a free site inspection and savings report tailored to your home or business.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {[
              { icon: Phone, title: "Phone", body: <p className="text-muted-foreground"><a href="tel:+919995527452" className="hover:text-navy">+91 99955 27452</a><br /><a href="tel:+919995547452" className="hover:text-navy">+91 99955 47452</a><br /><a href="tel:+919995567452" className="hover:text-navy">+91 99955 67452</a></p> },
              { icon: Mail, title: "Email", body: <a href="mailto:javasolarsolutaions@gmail.com" className="text-muted-foreground hover:text-navy">javasolarsolutaions@gmail.com</a> },
              { icon: MapPin, title: "Address", body: <address className="not-italic text-muted-foreground">Akkal Building, Manakkad<br />Thodupuzha, Kerala 685608</address> },
              { icon: Clock, title: "Hours", body: <p className="text-muted-foreground">Mon — Sat: 9:00 AM — 6:00 PM<br />Sunday: Closed</p> },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-sun/10 text-sun">
                  <item.icon className="size-5" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{item.title}</div>
                  {item.body}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                <input id="name" name="name" required maxLength={100} type="text" placeholder="Your name" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-sun focus:ring-2 focus:ring-sun/20" />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                <input id="phone" name="phone" maxLength={30} type="tel" placeholder="+91 99955 27452" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-sun focus:ring-2 focus:ring-sun/20" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input id="email" name="email" maxLength={200} type="email" placeholder="you@example.com" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-sun focus:ring-2 focus:ring-sun/20" />
            </div>
            <div className="mt-4 space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Project Details</label>
              <textarea id="message" name="message" maxLength={2000} rows={4} placeholder="Tell us about your home, average electricity bill, or any questions..." className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-sun focus:ring-2 focus:ring-sun/20" />
            </div>
            <button type="submit" disabled={busy} className="mt-6 w-full rounded-xl bg-sun px-6 py-4 text-base font-semibold text-foreground shadow-lg shadow-sun/20 hover:bg-sun-dark disabled:opacity-60">
              {busy ? "Sending…" : "Submit Inquiry"}
            </button>

            <p className="mt-3 text-center text-xs text-muted-foreground">We will get back to you within 24 hours.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
