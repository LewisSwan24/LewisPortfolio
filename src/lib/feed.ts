import { Feed } from "feed";
import { siteConfig } from "./site";
import { getAllBlogPosts } from "./blog";
import { getProjectEvidence } from "./portfolio-proof";
import { PROJECT_OG_COPY } from "./project-routes";

type FeedLocale = "en" | "zh";

export async function generateRSSFeed(locale: FeedLocale = "en") {
  const isZh = locale === "zh";
  const prefix = isZh ? "/zh" : "";
  const feedUrl = `${siteConfig.url}${prefix}`;
  // The zh feed used to fall through to the English title, description, and
  // copyright, so a Chinese reader subscribing got an English channel header.
  const author = isZh
    ? `${siteConfig.author.nameZh}（${siteConfig.name}）`
    : siteConfig.name;
  const year = new Date().getFullYear();

  const feed = new Feed({
    title: `${author} - ${isZh ? siteConfig.titleZh : siteConfig.title}`,
    description: isZh ? siteConfig.descriptionZh : siteConfig.description,
    id: feedUrl,
    link: feedUrl,
    language: isZh ? "zh-CN" : "en",
    image: `${siteConfig.url}/favicon.svg`,
    favicon: `${siteConfig.url}/favicon.svg`,
    copyright: isZh ? `版权所有 ${year}，${author}` : `All rights reserved ${year}, ${siteConfig.name}`,
    author: {
      name: siteConfig.author.name,
      email: siteConfig.author.email,
      link: feedUrl,
    },
  });

  // Sourced from the proof registry rather than the retired MDX files: those
  // carried pre-rename slugs, so every project link in the feed 308-redirected,
  // and they never included MazeRunners.
  const projects = getProjectEvidence(locale);
  const blogPosts = await getAllBlogPosts(locale);
  const generatedAt = new Date();

  projects.forEach((project) => {
    const url = `${siteConfig.url}${prefix}/projects/${project.slug}`;
    const copy = PROJECT_OG_COPY[project.slug];
    feed.addItem({
      title: copy.title,
      id: url,
      link: url,
      description: copy.oneLiner,
      date: generatedAt,
      category: [{ name: project.problemType }],
    });
  });

  blogPosts.forEach((post) => {
    const url = `${siteConfig.url}${prefix}/blog/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt,
      date: new Date(post.date),
      category: post.tags.map((tag) => ({ name: tag })),
    });
  });

  return feed;
}
