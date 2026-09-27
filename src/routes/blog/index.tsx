import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";
import { SectionCTA } from "@/components/site-chrome";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () => ({
    meta: [
      { title: "Solar Blog — Kerala Solar Guides & Tips | Java Solar Solutions" },
      {
        name: "description",
        content:
          "Solar guides for Kerala homes and businesses: installation costs, KSEB net metering, subsidies, monsoon performance, and real savings.",
      },
      { property: "og:title", content: "Solar Blog — Kerala Solar Guides & Tips | Java Solar Solutions" },
      {
        property: "og:description",
        content:
          "Practical solar articles for Kerala: costs, subsidies, net metering, and savings explained.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
});

function BlogIndex() {
  return (
    <>
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
              Solar Insights for Kerala
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Practical guides on solar costs, KSEB net metering, subsidies, and
              savings — written for Kerala homes and businesses.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group flex flex-col rounded-2xl border border-border bg-card p-8 transition-all hover:border-sun-dark/50 hover:shadow-lg hover:shadow-sun-dark/10"
              >
                <span className="inline-flex w-fit items-center rounded-full bg-sun-dark/15 px-3 py-1 text-xs font-semibold text-sun-dark">
                  {post.category}
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-foreground transition-colors group-hover:text-sun-dark">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-muted-foreground">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-4" />
                      {new Date(post.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <ArrowRight className="size-5 text-sun-dark transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SectionCTA
        title="Want a Solar Plan for Your Property?"
        subtitle="Get a free consultation and a custom savings report for your home or business."
      />
    </>
  );
}
