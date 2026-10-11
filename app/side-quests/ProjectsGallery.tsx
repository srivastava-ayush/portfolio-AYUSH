"use client";

import { useMemo, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Brain, Box, Code, Layout } from "lucide-react";
import { PROJECTS } from "../constants";

type Project = {
  projectId: number;
  projectName: string;
  projectDescriptionShort: string;
  projectDescriptionLong: string;
  projectImg: StaticImageData;
  projectCode: string;
  projectLive?: string;
  techStack?: string[];
};

const filters = [
  { label: "Full-Stack", value: "full-stack", icon: Code },
  { label: "Landing Pages", value: "landing-page", icon: Layout },
  { label: "AI/ML", value: "ai", icon: Brain },
  { label: "Other", value: "other", icon: Box },
];

function ProjectRecord({ project }: { project: Project }) {
  return (
    <article className="border-x border-b border-[var(--sq-line)] bg-[var(--sq-surface)] first:border-t">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--sq-line-soft)] bg-[var(--sq-header-tint)] px-3 py-2 text-[10px] uppercase tracking-[0.1em]">
        <span className="text-[var(--tui-accent-muted)]">[{String(project.projectId).padStart(2, "0")}] ./projects/{project.projectName.toLowerCase().replaceAll(" ", "-")}</span>
        <span className="text-[var(--tui-green)]">● available</span>
      </div>
      <div className="grid gap-4 p-3 sm:grid-cols-[minmax(0,240px)_minmax(0,1fr)]">
        <div className="relative aspect-video overflow-hidden border border-[var(--sq-line)] bg-[var(--sq-img-bg)]">
          <Image src={project.projectImg} alt={`${project.projectName} preview`} fill sizes="(min-width: 640px) 240px, 100vw" className="object-cover" />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-[var(--sq-text-strong)]">{project.projectName}</h2>
          <p className="mt-2 text-xs leading-relaxed text-[var(--sq-text-mid)]">{project.projectDescriptionShort}</p>
          <details className="group mt-3 text-xs leading-relaxed text-[var(--sq-text-mid)]">
            <summary className="w-fit cursor-pointer list-none text-[var(--tui-accent-muted)] hover:text-[var(--tui-accent)]"><span className="group-open:hidden">[+] read more</span><span className="hidden group-open:inline">[-] show less</span></summary>
            <p className="mt-2 border-l border-[var(--sq-line)] pl-3">{project.projectDescriptionLong}</p>
          </details>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--sq-line-soft)] px-3 py-2 text-[10px]">
        <span className="text-[var(--sq-text-faint)]">{project.techStack?.slice(0, 3).join(" / ")}</span>
        <div className="flex gap-3 sm:ml-auto">
          <a href={project.projectCode} target="_blank" rel="noopener noreferrer" className="text-[var(--tui-green)] hover:underline">[source ↗]</a>
          {project.projectLive && <a href={project.projectLive} target="_blank" rel="noopener noreferrer" className="text-[var(--tui-green)] hover:underline">[live ↗]</a>}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsGallery() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const filteredProjects = useMemo(() => {
    if (!activeFilters.length) return PROJECTS;
    return PROJECTS.filter((project) =>
      (project.category ?? []).some((category) => activeFilters.includes(category)),
    );
  }, [activeFilters]);

  return (
    <div className="mt-6">
      <p className="mb-5 text-xs leading-relaxed text-[var(--sq-text-mid)]"><span className="mr-2 text-[var(--tui-green)]">#</span>A showcase of projects built across diverse tech stacks.</p>
      <div className="mb-3 text-[10px] text-[var(--sq-text-faint)]"><span className="text-[var(--tui-green)]">$</span> ls ./projects --filter</div>
      <div className="flex overflow-x-auto border border-[var(--sq-line-strong)] bg-[var(--sq-inset)] text-[10px] uppercase tracking-wide">
        <button
          type="button"
          onClick={() => setActiveFilters([])}
          aria-pressed={activeFilters.length === 0}
          className={`shrink-0 border-r border-[var(--sq-line)] px-3 py-2.5 transition-colors ${activeFilters.length === 0 ? "bg-[var(--tui-accent-muted)]/15 text-[var(--tui-accent-muted)]" : "text-[var(--sq-text-dim)] hover:text-[var(--sq-fg)]"}`}
        >
          All
        </button>
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilters.includes(filter.value);
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilters((current) =>
                isActive ? current.filter((value) => value !== filter.value) : [...current, filter.value]
              )}
              aria-pressed={isActive}
              className={`flex shrink-0 items-center gap-1.5 border-r border-[var(--sq-line)] px-3 py-2.5 transition-colors ${isActive ? "bg-[var(--tui-accent-muted)]/15 text-[var(--tui-accent-muted)]" : "text-[var(--sq-text-dim)] hover:text-[var(--sq-fg)]"}`}
            >
              <Icon size={13} /> {filter.label}
            </button>
          );
        })}
      </div>
      <div className="mt-3 mb-2 flex justify-between text-[10px] text-[var(--sq-text-faint)]"><span>NAME / DESCRIPTION</span><span>{filteredProjects.length} result(s)</span></div>
      <div>
        {filteredProjects.map((project) => (
          <ProjectRecord key={project.projectId} project={project} />
        ))}
      </div>
      {!filteredProjects.length && (
        <p className="border border-[var(--sq-line)] py-12 text-center text-xs text-[var(--sq-text-dim)]">No projects match these filters.</p>
      )}
    </div>
  );
}
