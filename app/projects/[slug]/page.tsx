import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/Container";
import { Tag } from "@/components/Tag";
import { Button } from "@/components/Button";
import { TOC } from "@/components/TOC";
import { Prose } from "@/components/Prose";
import { ShareButtons } from "@/components/ShareButtons";
import { RelatedProjects } from "@/components/RelatedProjects";
import { getMdxComponents } from "@/components/mdx-components";
import { getProjectBySlug, getProjectSlugs, getAllProjects } from "@/lib/projects";
import { extractTOC } from "@/lib/toc";
import { siteConfig } from "@/lib/site";
import { getCurrentDictionary } from "@/lib/i18n-server";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.oneLiner,
    openGraph: {
      title: project.title,
      description: project.oneLiner,
      type: "article",
      url: `${siteConfig.url}/projects/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.oneLiner,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const { dict } = getCurrentDictionary();

  if (!project) {
    notFound();
  }

  const toc = extractTOC(project.content);
  const mdxComponents = getMdxComponents();

  return (
    <article className="py-16 sm:py-20">
      <Container>
        {/* Header */}
        <header className="mb-12">
          <Button href="/projects" variant="ghost" className="mb-6">
            {dict.project.backToProjects}
          </Button>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.featured && (
              <Tag variant="accent" size="sm">
                {dict.common.featured}
              </Tag>
            )}
            {project.status && <Tag size="sm">{project.status}</Tag>}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>

          <p className="mt-4 text-xl text-muted-foreground max-w-3xl">
            {project.oneLiner}
          </p>

          {project.highlights.length > 0 && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {project.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-start gap-3 rounded-xl border border-border/50 bg-card/50 px-4 py-3"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <p className="text-sm text-muted-foreground">{highlight}</p>
                </div>
              ))}
            </div>
          )}

          {/* Meta */}
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div>
              <span className="font-medium text-foreground">{dict.project.role}:</span>{" "}
              {project.role}
            </div>
            <div>
              <span className="font-medium text-foreground">{dict.project.timeline}:</span>{" "}
              {project.timeframe}
            </div>
          </div>

          {/* Tools */}
          {project.tools.length > 0 && (
            <div className="mt-4">
              <span className="text-sm font-medium text-foreground">
                {dict.project.tools}:{" "}
              </span>
              <span className="text-sm text-muted-foreground">
                {project.tools.join(", ")}
              </span>
            </div>
          )}

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag} size="sm">
                {tag}
              </Tag>
            ))}
          </div>
        </header>

        {/* Content with TOC */}
        <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
          <div>
            {/* Mobile TOC */}
            <TOC items={toc} />

            {/* MDX Content */}
            <Prose>
              <MDXRemote
                source={project.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </Prose>
          </div>

          {/* Desktop TOC */}
          <div className="hidden lg:block">
            <TOC items={toc} />
          </div>
        </div>
      </Container>
    </article>
  );
}
