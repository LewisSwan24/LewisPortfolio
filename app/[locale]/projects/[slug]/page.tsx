import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { TOC } from "@/components/content/TOC";
import { Prose } from "@/components/ui/Prose";
import { ShareButtons } from "@/components/content/ShareButtons";
import { RelatedProjects } from "@/components/content/RelatedProjects";
import { ReadingProgressChapters } from "@/components/content/ReadingProgressChapters";
import { ViewCounter } from "@/components/seo/ViewCounter";
import { getMdxComponents } from "@/components/content/mdx-components";
import { getProjectBySlug, getProjectSlugs, getAllProjects } from "@/lib/projects";
import { extractTOC } from "@/lib/toc";
import { siteConfig } from "@/lib/site";
import { getCurrentDictionary } from "@/lib/i18n-compat";
import { generateProjectSchema, generateBreadcrumbSchema, StructuredData } from "@/lib/seo";

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

  const projectUrl = `${siteConfig.url}/projects/${project.slug}`;

  return {
    title: project.title,
    description: project.oneLiner,
    authors: [{ name: siteConfig.author.name }],
    openGraph: {
      title: project.title,
      description: project.oneLiner,
      type: "article",
      url: projectUrl,
      publishedTime: project.date,
      authors: [siteConfig.author.name],
      tags: project.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.oneLiner,
    },
    alternates: {
      canonical: projectUrl,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const allProjects = getAllProjects();
  const { dict } = await getCurrentDictionary();

  if (!project) {
    notFound();
  }

  const toc = extractTOC(project.content);
  const mdxComponents = getMdxComponents();
  const projectUrl = `${siteConfig.url}/projects/${project.slug}`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url || "";

  return (
    <>
      <StructuredData data={generateProjectSchema({
        title: project.title,
        oneLiner: project.oneLiner,
        slug: project.slug,
        cover: project.cover || "",
        tags: project.tags,
        timeframe: project.timeframe,
      })} />
      <StructuredData data={generateBreadcrumbSchema([
        { name: dict.nav.home, url: siteUrl },
        { name: dict.nav.projects, url: `${siteUrl}/projects` },
        { name: project.title, url: `${siteUrl}/projects/${project.slug}` },
      ])} />

      {/* Reading Progress with Chapter Markers */}
      <ReadingProgressChapters 
        chapters={toc.map(item => ({ id: item.id, title: item.text, level: item.level }))} 
      />

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
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag} size="sm">
                    {tag}
                  </Tag>
                ))}
              </div>
              <ViewCounter slug={slug} />
            </div>

            {/* Share Buttons */}
            <div className="mt-6 pt-6 border-t border-border/50">
              <ShareButtons
                url={projectUrl}
                title={project.title}
                description={project.oneLiner}
              />
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

              {/* Bottom Share Buttons */}
              <div className="mt-12 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  {dict.project.shareHelpful}
                </p>
                <ShareButtons
                  url={projectUrl}
                  title={project.title}
                  description={project.oneLiner}
                />
              </div>
            </div>

            {/* Desktop TOC */}
            <div className="hidden lg:block">
              <TOC items={toc} />
            </div>
          </div>

          {/* Related Projects */}
          <RelatedProjects
            currentProject={project}
            allProjects={allProjects}
            dict={dict}
            maxItems={3}
          />
        </Container>
      </article>
    </>
  );
}
