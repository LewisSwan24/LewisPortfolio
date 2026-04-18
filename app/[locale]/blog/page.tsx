import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAllBlogPosts, getAllBlogTags } from "@/lib/blog";
import { BlogIndex } from "./BlogIndex";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("blog.title"),
    description: t("blog.description"),
  };
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const tags = await getAllBlogTags();

  const postsData = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    excerpt: p.excerpt,
    tags: p.tags,
    readingTime: p.readingTime,
  }));

  return <BlogIndex posts={postsData} tags={tags} />;
}
