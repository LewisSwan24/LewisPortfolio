import { Feed } from "feed";
import { siteConfig } from "./site";
import { getAllProjects } from "./projects";
import { getAllBlogPosts } from "./blog";

type FeedLocale = "en" | "zh";

export async function generateRSSFeed(locale: FeedLocale = "en") {
  const prefix = locale === "zh" ? "/zh" : "";
  const feedUrl = `${siteConfig.url}${prefix}`;

  const feed = new Feed({
    title: `${siteConfig.name} - ${siteConfig.title}`,
    description: siteConfig.description,
    id: feedUrl,
    link: feedUrl,
    language: locale === "zh" ? "zh-CN" : "en",
    image: `${siteConfig.url}/favicon.svg`,
    favicon: `${siteConfig.url}/favicon.svg`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.name}`,
    author: {
      name: siteConfig.author.name,
      email: siteConfig.author.email,
      link: feedUrl,
    },
  });

  const projects = getAllProjects();
  const blogPosts = await getAllBlogPosts();

  projects.forEach((project) => {
    const url = `${siteConfig.url}${prefix}/projects/${project.slug}`;
    feed.addItem({
      title: project.title,
      id: url,
      link: url,
      description: project.oneLiner,
      date: new Date(project.date),
      category: project.tags.map((tag) => ({ name: tag })),
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
