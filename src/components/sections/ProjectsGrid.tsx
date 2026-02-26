"use client";

import { motion } from "framer-motion";
import { staggerGrid, gridItem, card3DHover } from "@/lib/animation-presets";
import { Card } from "@/components/ui/Card";
import type { ProjectFrontmatter } from "@/lib/projects";
import type { Dictionary } from "@/lib/i18n";

interface ProjectsGridProps {
    projects: ProjectFrontmatter[];
    dict: Dictionary;
}

/**
 * Animated projects grid with stagger reveal + 3D hover.
 */
export function ProjectsGrid({ projects, dict }: ProjectsGridProps) {
    if (projects.length === 0) {
        return (
            <div className="col-span-full">
                <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                        <svg
                            className="w-6 h-6 text-muted-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                        </svg>
                    </div>
                    <p className="text-muted-foreground">{dict.home?.featuredProjectsEmpty}</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
        >
            {projects.map((project) => (
                <motion.div
                    key={project.slug}
                    variants={gridItem}
                    whileHover={card3DHover.hover}
                    className="will-change-transform"
                >
                    <Card project={project} dict={dict} />
                </motion.div>
            ))}
        </motion.div>
    );
}
