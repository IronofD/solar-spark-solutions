import { useState, useRef, useCallback } from "react";
import { Home, Building2, Zap, ArrowRight, Images } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { projects } from "@/lib/site-data";

export function BeforeAfterSlider({
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

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] cursor-ew-resize overflow-hidden rounded-2xl bg-muted select-none"
      onMouseDown={(e) => { setIsDragging(true); updatePosition(e.clientX); }}
      onMouseMove={(e) => { if (isDragging) updatePosition(e.clientX); }}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={(e) => { setIsDragging(true); updatePosition(e.touches[0].clientX); }}
      onTouchMove={(e) => { if (isDragging) updatePosition(e.touches[0].clientX); }}
      onTouchEnd={() => setIsDragging(false)}
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
      <img src={beforeImage.url} alt={beforeAlt} className="absolute inset-0 h-full w-full object-cover" width={1024} height={768} loading="lazy" draggable={false} />
      <img src={afterImage.url} alt={afterAlt} className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }} width={1024} height={768} loading="lazy" draggable={false} />
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)]" style={{ left: `${position}%`, transform: "translateX(-50%)" }} />
      <div className="pointer-events-none absolute top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-sun text-white shadow-lg" style={{ left: `${position}%` }}>
        <ArrowRight className="size-4" />
      </div>
      <span className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2 py-1 text-xs font-semibold text-white">Before</span>
      <span className="absolute bottom-3 right-3 rounded-md bg-sun/90 px-2 py-1 text-xs font-semibold text-foreground">After</span>
    </div>
  );
}

export function ProjectCard({ project }: { project: (typeof projects)[0] }) {
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
            {project.type === "home" ? <Home className="size-3.5" /> : <Building2 className="size-3.5" />}
            {project.type === "home" ? "Homeowner" : "Business"}
          </span>
          <span className="text-xs text-muted-foreground">{project.location}</span>
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold text-foreground">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
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

export function ProjectsGallery() {
  const [filter, setFilter] = useState<"all" | "home" | "business">("all");
  const filtered = filter === "all" ? projects : projects.filter((p) => p.type === filter);
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
