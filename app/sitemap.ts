import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { LISTED_PROJECT_SLUGS } from "@/lib/project-routes";
import { getAllBlogPosts } from "@/lib/blog";

const locales = ["en", "zh"] as const;

function safeStatMtime(filePath: string): Date | null {
  try {
    return fs.statSync(filePath).mtime;
  } catch {
    return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const buildTime = new Date();

  function withAlternates(relPath: string) {
    return {
      languages: {
        en: `${baseUrl}${relPath}`,
        zh: `${baseUrl}/zh${relPath}`,
        "x-default": `${baseUrl}${relPath}`,
      },
    };
  }

  const staticPaths = [
    { path: "", changeFrequency: "monthly" as const, priority: 1 },
    { path: "/projects", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/resume", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/blog", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/lab", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/hire", changeFrequency: "monthly" as const, priority: 0.8 },
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.flatMap(
    ({ path: relPath, changeFrequency, priority }) =>
      locales.map((locale) => ({
        url:
          locale === "en"
            ? `${baseUrl}${relPath || "/"}`
            : `${baseUrl}/zh${relPath || ""}`,
        lastModified: buildTime,
        changeFrequency,
        priority: locale === "en" ? priority : priority * 0.9,
        alternates: withAlternates(relPath || "/"),
      }))
  );

  const projectPageMtime =
    safeStatMtime(path.join(process.cwd(), "app/[locale]/projects/[slug]/page.tsx")) || buildTime;
  // Listed cases only: an unlisted case keeps its page, but the sitemap is one
  // of the lists it comes off.
  const projectRoutes: MetadataRoute.Sitemap = LISTED_PROJECT_SLUGS.flatMap((slug) =>
    locales.map((locale) => ({
      url:
        locale === "en"
          ? `${baseUrl}/projects/${slug}`
          : `${baseUrl}/zh/projects/${slug}`,
      lastModified: projectPageMtime,
      changeFrequency: "monthly" as const,
      priority: locale === "en" ? 0.8 : 0.72,
      alternates: withAlternates(`/projects/${slug}`),
    }))
  );

  const blogPosts = await getAllBlogPosts();
  const blogDir = path.join(process.cwd(), "content/blog");
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.flatMap((post) => {
    const mtime = safeStatMtime(path.join(blogDir, `${post.slug}.mdx`));
    const frontmatterDate = post.date ? new Date(post.date) : null;
    const lastModified =
      mtime && frontmatterDate
        ? mtime > frontmatterDate
          ? mtime
          : frontmatterDate
        : mtime || frontmatterDate || buildTime;
    return locales.map((locale) => ({
      url:
        locale === "en"
          ? `${baseUrl}/blog/${post.slug}`
          : `${baseUrl}/zh/blog/${post.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: locale === "en" ? 0.7 : 0.63,
      alternates: withAlternates(`/blog/${post.slug}`),
    }));
  });

  const feedRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/feed.xml`,
      lastModified: buildTime,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/zh/feed.xml`,
      lastModified: buildTime,
      changeFrequency: "weekly" as const,
      priority: 0.45,
    },
  ];

  return [...staticRoutes, ...projectRoutes, ...blogRoutes, ...feedRoutes];
}
