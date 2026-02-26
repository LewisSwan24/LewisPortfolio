import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { getAllProjects, getAllTags } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import { getCurrentDictionary } from "@/lib/i18n-compat";

// Dynamically import ProjectsGrid for better initial load
const ProjectsGrid = dynamic(() => import("./ProjectsGrid").then(mod => ({ default: mod.ProjectsGrid })), {
  loading: () => (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-96 rounded-2xl border border-border bg-muted/20 animate-pulse" />
      ))}
    </div>
  ),
  ssr: true,
});

export const metadata: Metadata = {
  title: "Projects",
  description: `Design projects and case studies by ${siteConfig.name}.`,
};

export default async function ProjectsPage() {
  const projects = getAllProjects();
  const allTags = getAllTags();
  const { dict } = await getCurrentDictionary();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          as="h1"
          title={dict.projects.title}
          description={dict.projects.description}
        />
        <ProjectsGrid projects={projects} allTags={allTags} dict={dict} />
      </Container>
    </section>
  );
}
