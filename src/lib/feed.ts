import { Feed } from "feed";
import { siteConfig } from "./site";
import { getAllProjects } from "./projects";
import { getAllBlogPosts } from "./blog";

export async function generateRSSFeed() {
  const feed = new Feed({
    title: `${siteConfig.name} - ${siteConfig.title}`,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: "en",
    image: `${siteConfig.url}/favicon.svg`,
    favicon: `${siteConfig.url}/favicon.svg`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.name}`,
    author: {
      name: siteConfig.author.name,
      email: siteConfig.author.email,
      link: siteConfig.url,
    },
  });

  const projects = getAllProjects();
  const blogPosts = await getAllBlogPosts();

  // Add projects
  projects.forEach((project) => {
    feed.addItem({
      title: project.title,
      id: `${siteConfig.url}/projects/${project.slug}`,
      link: `${siteConfig.url}/projects/${project.slug}`,
      description: project.oneLiner,
      date: new Date(project.date),
      category: project.tags.map((tag) => ({ name: tag })),
    });
  });

  // Add blog posts
  blogPosts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.url}/blog/${post.slug}`,
      link: `${siteConfig.url}/blog/${post.slug}`,
      description: post.excerpt,
      date: new Date(post.date),
      category: post.tags.map((tag) => ({ name: tag })),
    });
  });

  return feed;
}
