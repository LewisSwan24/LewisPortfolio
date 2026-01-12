"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { Card } from "@/components/Card";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/i18n";
import type { Project } from "@/lib/projects";

interface ProjectsGridProps {
  projects: Project[];
  allTags: string[];
  dict: Dictionary;
}

export function ProjectsGrid({ projects, allTags, dict }: ProjectsGridProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(projects, {
      keys: [
        { name: "title", weight: 0.4 },
        { name: "oneLiner", weight: 0.3 },
        { name: "tags", weight: 0.2 },
        { name: "role", weight: 0.1 },
      ],
      threshold: 0.3, // 0 = perfect match, 1 = match anything
      minMatchCharLength: 2,
      includeScore: true,
    });
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let results = projects;

    // Apply fuzzy search if query exists
    if (searchQuery.trim()) {
      const fuseResults = fuse.search(searchQuery);
      results = fuseResults.map((result) => result.item);
    }

    // Apply tag filter
    if (selectedTag) {
      results = results.filter((project) =>
        project.tags.includes(selectedTag)
      );
    }

    return results;
  }, [projects, selectedTag, searchQuery, fuse]);

  return (
    <div>
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder={dict.projects.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border/60 bg-background/40 backdrop-blur-md py-2.5 pl-10 pr-4 text-sm text-foreground shadow-sm shadow-black/5 placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-200 motion-reduce:transition-none"
          />
        </div>
      </div>

      {/* Tag Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTag(null)}
          className={cn(
            "relative inline-flex items-center overflow-hidden rounded-full border px-3 py-1.5 text-sm font-medium shadow-sm shadow-black/5 transition-all duration-200 motion-reduce:transition-none",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background",
            "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity motion-reduce:before:transition-none hover:before:opacity-100",
            "after:content-[''] after:absolute after:inset-y-0 after:left-[-150%] after:w-[150%] after:skew-x-[-20deg] after:bg-[linear-gradient(110deg,transparent,hsl(0_0%_100%_/_0.25),transparent)] after:opacity-0 after:pointer-events-none after:transition-all after:duration-700 motion-reduce:after:transition-none motion-safe:hover:after:left-[150%] motion-safe:hover:after:opacity-100",
            "motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98]",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background",
            !selectedTag
              ? "border-transparent bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-accent-foreground shadow-lg shadow-accent/20"
              : "border-border/60 bg-background/30 text-muted-foreground hover:text-foreground hover:border-border"
          )}
        >
          <span className="relative z-10">{dict.projects.all}</span>
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            className={cn(
              "relative inline-flex items-center overflow-hidden rounded-full border px-3 py-1.5 text-sm font-medium shadow-sm shadow-black/5 transition-all duration-200 motion-reduce:transition-none",
              "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background",
              "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity motion-reduce:before:transition-none hover:before:opacity-100",
              "after:content-[''] after:absolute after:inset-y-0 after:left-[-150%] after:w-[150%] after:skew-x-[-20deg] after:bg-[linear-gradient(110deg,transparent,hsl(0_0%_100%_/_0.25),transparent)] after:opacity-0 after:pointer-events-none after:transition-all after:duration-700 motion-reduce:after:transition-none motion-safe:hover:after:left-[150%] motion-safe:hover:after:opacity-100",
              "motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98]",
              "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background",
              selectedTag === tag
                ? "border-transparent bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-accent-foreground shadow-lg shadow-accent/20"
                : "border-border/60 bg-background/30 text-muted-foreground hover:text-foreground hover:border-border"
            )}
          >
            <span className="relative z-10">{tag}</span>
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.slug} project={project} dict={dict} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">
            {dict.projects.empty}
          </p>
          <button
            onClick={() => {
              setSelectedTag(null);
              setSearchQuery("");
            }}
            className="mt-4 text-sm text-accent hover:underline"
          >
            {dict.projects.clearFilters}
          </button>
        </div>
      )}
    </div>
  );
}
