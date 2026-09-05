import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getPost } from "@/lib/blog-data";
import { SectionCTA } from "@/components/site-chrome";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  component: BlogPost,
  head: ({ params, loaderData }) => {
    const post = loaderData?.post;
    return {
      meta: [
        { title: "Java Solar Solutions" },
        {
          name: "description",
          content: post?.description ?? "Solar guide from Java Solar Solutions.",
        },
        { property: "og:title", content: post?.title ?? "Java Solar Solutions" },
        {
          property: "og:description",
          content: post?.description ?? "Solar guide from Java Solar Solutions.",
        },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: post
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: post.title,
                description: post.description,
                datePublished: post.date,
                author: {
                  "@type": "Organization",
                  name: "Java Solar Solutions",
                },
                publisher: {
                  "@type": "Organization",
                  name: "Java Solar Solutions",
                },
              }),
            },
          ]
        : [],
    };
  },
});

function BlogPost() {
  const { post } = Route.useLoaderData();

  return (
    <>
      <article className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-4" />
            All articles
          </Link>
          <div className="mt-8">
            <span className="inline-flex items-center rounded-full bg-sun-dark/15 px-3 py-1 text-xs font-semibold text-sun-dark">
              {post.category}
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                {new Date(post.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" />
                {post.readTime}
              </span>
            </div>
          </div>
          <div className="mt-10 space-y-8">
            {post.content.map((section, i) => (
              <section key={i}>
                {section.heading && (
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="mt-4 leading-relaxed text-muted-foreground"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </article>
      <SectionCTA
        title="Ready to See Your Own Savings?"
        subtitle="Get a free consultation and a custom solar savings report for your property."
      />
    </>
  );
}
