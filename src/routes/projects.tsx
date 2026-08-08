import { createFileRoute } from "@tanstack/react-router";
import { ProjectsGallery } from "@/components/before-after";
import { SectionCTA } from "@/components/site-chrome";
import { caseStudiesQueryOptions } from "@/lib/case-studies-query";

export const Route = createFileRoute("/projects")({
  loader: ({ context }) => context.queryClient.ensureQueryData(caseStudiesQueryOptions),
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "Projects & Case Studies — Java Solar Solutions" },
      { name: "description", content: "Before-and-after solar transformations from homes and businesses across Thodupuzha. See real savings and system details." },
      { property: "og:title", content: "Solar Projects & Case Studies — Java Solar Solutions" },
      { property: "og:description", content: "Real before/after solar installations across Kerala with system sizes and savings." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
});

function ProjectsPage() {
  return (
    <>
      <section className="px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-sun">Project Gallery</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-navy md:text-5xl">Before & After Solar Transformations</h1>
            <p className="mt-4 text-muted-foreground">
              See how homes and businesses across Thodupuzha are saving with solar. Drag the slider to compare before and after.
            </p>
          </div>
          <ProjectsGallery />
        </div>
      </section>
      <SectionCTA />
    </>
  );
}
