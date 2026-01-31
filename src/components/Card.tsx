import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Tag } from "./Tag";
import type { ProjectFrontmatter } from "@/lib/projects";
import type { Dictionary } from "@/lib/i18n";

interface CardProps {
  project: ProjectFrontmatter;
  dict?: Dictionary;
  className?: string;
}

export function Card({ project, dict, className }: CardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-card/85 backdrop-blur-sm transition-all duration-300 motion-reduce:transition-none",
        "border border-border/50",
        "hover:border-transparent hover:shadow-2xl hover:shadow-accent/10",
        "motion-safe:hover:-translate-y-1",
        "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background",
        className
      )}
    >
      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 motion-reduce:transition-none -z-10">
        <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]" />
        <div className="absolute inset-0 rounded-2xl bg-card" />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 motion-reduce:transition-none">
        <div className="absolute inset-y-0 left-[-150%] w-[150%] skew-x-[-20deg] bg-[linear-gradient(110deg,transparent,hsl(0_0%_100%_/_0.18),transparent)] transition-all duration-700 motion-reduce:transition-none motion-safe:group-hover:left-[150%] motion-safe:group-focus:left-[150%]" />
      </div>

      {/* Cover image */}
      {project.cover && (
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover transition-all duration-500 motion-reduce:transition-none motion-safe:group-hover:scale-110 motion-safe:group-focus:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzEyMTIxNCIvPjwvc3ZnPg=="
            loading="lazy"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 motion-reduce:transition-none" />

          {/* Featured badge overlay */}
          {project.featured && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-accent-foreground shadow-lg">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {dict?.common.featured ?? "Featured"}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Status tag */}
        {project.status && (
          <div className="mb-3">
            <span className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
              project.status === "Completed"
                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                : project.status === "In Progress"
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  : "bg-muted text-muted-foreground"
            )}>
              <span className={cn(
                "w-1.5 h-1.5 rounded-full",
                project.status === "Completed"
                  ? "bg-green-500"
                  : project.status === "In Progress"
                    ? "bg-amber-500 motion-safe:animate-pulse"
                    : "bg-muted-foreground"
              )} />
              {project.status}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-accent group-focus:text-accent transition-colors duration-300 motion-reduce:transition-none">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {project.oneLiner}
        </p>

        {project.highlights.length > 0 && (
          <ul className="mb-4 space-y-1 text-sm text-muted-foreground">
            {project.highlights.slice(0, 2).map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="line-clamp-2">{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tags */}
        <div className="mt-auto flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          {project.tags.length > 3 && (
            <Tag>+{project.tags.length - 3}</Tag>
          )}
        </div>

        {/* Meta info */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{project.role}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{project.timeframe}</span>
          </div>
        </div>

        {/* View project link */}
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 motion-reduce:transition-none">
          <span>{dict?.common.viewCaseStudy ?? "View Case Study"}</span>
          <svg className="w-4 h-4 transition-transform motion-reduce:transition-none motion-safe:group-hover:translate-x-1 motion-safe:group-focus:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
