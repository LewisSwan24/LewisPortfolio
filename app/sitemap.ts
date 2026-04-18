import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getProjectSlugs } from "@/lib/projects";
import { getAllBlogPosts } from "@/lib/blog";

const locales = ["en", "zh"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Helper: generate alternates for a given path
  function withAlternates(path: string) {
    return {
      languages: {
        en: `${baseUrl}${path}`,
        zh: `${baseUrl}/zh${path}`,
        "x-default": `${baseUrl}${path}`,
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
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.flatMap(
    ({ path, changeFrequency, priority }) =>
      locales.map((locale) => ({
        url:
          locale === "en"
            ? `${baseUrl}${path || "/"}`
            : `${baseUrl}/zh${path || ""}`,
        lastModified: new Date(),
        changeFrequency,
        priority: locale === "en" ? priority : priority * 0.9,
        alternates: withAlternates(path || "/"),
      }))
  );

  const projectSlugs = getProjectSlugs();
  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url:
        locale === "en"
          ? `${baseUrl}/projects/${slug}`
          : `${baseUrl}/zh/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: locale === "en" ? 0.8 : 0.72,
      alternates: withAlternates(`/projects/${slug}`),
    }))
  );

  const blogPosts = await getAllBlogPosts();
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.flatMap((post) =>
    locales.map((locale) => ({
      url:
        locale === "en"
          ? `${baseUrl}/blog/${post.slug}`
          : `${baseUrl}/zh/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: locale === "en" ? 0.7 : 0.63,
      alternates: withAlternates(`/blog/${post.slug}`),
    }))
  );

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
