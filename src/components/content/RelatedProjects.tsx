import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Project } from "@/lib/projects";
import type { Dictionary } from "@/lib/i18n";

interface RelatedProjectsProps {
    currentProject: Project;
    allProjects: Project[];
    dict: Dictionary;
    maxItems?: number;
}

/**
 * Related projects component - shows similar projects based on tags
 */
export function RelatedProjects({
    currentProject,
    allProjects,
    dict,
    maxItems = 3,
}: RelatedProjectsProps) {
    // Find related projects based on shared tags
    const relatedProjects = allProjects
        .filter((project) => project.slug !== currentProject.slug)
        .map((project) => {
            // Calculate similarity score based on shared tags
            const sharedTags = project.tags.filter((tag) =>
                currentProject.tags.includes(tag)
            );
            return {
                project,
                score: sharedTags.length,
            };
        })
        .filter((item) => item.score > 0) // Only include projects with at least one shared tag
        .sort((a, b) => b.score - a.score) // Sort by similarity
        .slice(0, maxItems)
        .map((item) => item.project);

    if (relatedProjects.length === 0) {
        return null;
    }

    return (
        <section className="mt-16 pt-16 border-t border-border">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                    {dict.project?.relatedProjects ?? "Related Projects"}
                </h2>
                <p className="text-muted-foreground">
                    {dict.project?.relatedProjectsDescription ?? "Explore more projects with similar themes and approaches"}
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((project) => (
                    <Card key={project.slug} project={project} dict={dict} />
                ))}
            </div>

            {/* View all projects link */}
            <div className="mt-8 text-center">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                >
                    {dict.cta?.viewAll || "View All Projects"}
                </Link>
            </div>
        </section>
    );
}
