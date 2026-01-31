"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { ProjectFrontmatter } from "@/lib/projects";

interface ProjectTimelineProps {
  projects: ProjectFrontmatter[];
  className?: string;
}

export function ProjectTimeline({ projects, className }: ProjectTimelineProps) {
  // Group projects by year
  const projectsByYear = projects.reduce((acc, project) => {
    const year = new Date(project.date).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(project);
    return acc;
  }, {} as Record<string, ProjectFrontmatter[]>);

  const years = Object.keys(projectsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className={cn("relative", className)}>
      {/* Timeline line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

      {years.map((year, yearIndex) => (
        <div key={year} className="relative">
          {/* Year marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="sticky top-24 z-10 mb-8"
          >
            <div className="flex items-center gap-4 md:justify-center">
              <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold shadow-lg">
                {year.slice(-2)}
              </div>
              <span className="text-2xl font-bold text-foreground md:hidden">{year}</span>
            </div>
          </motion.div>

          {/* Projects for this year */}
          <div className="space-y-8 pb-12">
            {projectsByYear[year].map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative pl-12 md:pl-0 md:w-[calc(50%-2rem)]",
                  index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                )}
              >
                {/* Connector dot */}
                <div
                  className={cn(
                    "absolute top-6 w-3 h-3 rounded-full bg-muted border-2 border-accent",
                    "left-[13px] md:left-auto",
                    index % 2 === 0 ? "md:right-[-6px]" : "md:left-[-6px]"
                  )}
                />

                {/* Card */}
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:border-accent/50 hover:shadow-layered"
                >
                  {project.cover && (
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                      <Image
                        src={project.cover}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {project.status && (
                        <span
                          className={cn(
                            "text-xs px-2 py-0.5 rounded-full",
                            project.status === "Completed"
                              ? "bg-green-500/10 text-green-600 dark:text-green-400"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          )}
                        >
                          {project.status}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">{project.timeframe}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.oneLiner}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
