import { useState } from "react";
import { Home, Building2, Zap, ArrowRight, Images } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { caseStudiesQueryOptions } from "@/lib/case-studies-query";
import type { CaseStudy } from "@/lib/case-studies";

export function ProjectImage({ image, alt }: { image: string; alt: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
      {image ? (
        <img src={image} alt={alt} className="h-full w-full object-cover" width={1024} height={768} loading="lazy" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">Photo coming soon</div>
      )}
    </div>
  );
}

export function ProjectCard({ project }: { project: CaseStudy }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:shadow-lg">
      <ProjectImage
        image={project.after_image_url}
        alt={`Completed solar installation — ${project.title}`}
      />
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sun/10 px-3 py-1 text-xs font-semibold text-sun-dark">
            {project.customer_type === "home" ? <Home className="size-3.5" /> : <Building2 className="size-3.5" />}
            {project.customer_type === "home" ? "Homeowner" : "Business"}
          </span>
          <span className="text-xs text-muted-foreground">{project.location}</span>
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold text-foreground">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-5 grid grid-cols-3 gap-3 rounded-2xl bg-muted/50 p-4">
          <div>
            <div className="text-xs text-muted-foreground">System</div>
            <div className="font-semibold text-navy">{project.system_size}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Bill Drop</div>
            <div className="font-semibold text-navy">{project.savings}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Now Paying</div>
            <div className="font-semibold text-navy">{project.bill_after}</div>
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

export function ProjectsGallery() {
  const [filter, setFilter] = useState<"all" | "home" | "business">("all");
  const { data: caseStudies } = useSuspenseQuery(caseStudiesQueryOptions);
  const filtered =
    filter === "all" ? caseStudies : caseStudies.filter((p) => p.customer_type === filter);
  const tabs = [
    { key: "all" as const, label: "All Projects", icon: Images },
    { key: "home" as const, label: "Homes", icon: Home },
    { key: "business" as const, label: "Businesses", icon: Building2 },
  ];

  return (
    <>
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              filter === tab.key
                ? "bg-navy text-cream"
                : "border border-border bg-background text-muted-foreground hover:text-foreground"
            }`}
            aria-pressed={filter === tab.key}
          >
            <tab.icon className="size-4" />
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-14 text-center text-muted-foreground">No projects to show yet — check back soon.</p>
      )}
      <div className="mt-12 text-center">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-xl bg-sun px-6 py-3 font-semibold text-foreground shadow-sm transition-colors hover:bg-sun-dark"
        >
          Start Your Project
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </>
  );
}
