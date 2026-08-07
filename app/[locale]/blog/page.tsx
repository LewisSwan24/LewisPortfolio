import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { getAllBlogPosts, getAllBlogTags } from "@/lib/blog";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { BlogIndex } from "./BlogIndex";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const locale = (await getLocale()) as "en" | "zh";
  const title = t("blog.title");
  const description = t("blog.description");
  return {
    title,
    description,
    alternates: buildAlternates("/blog", locale),
    openGraph: buildOpenGraph({ title, description, path: "/blog", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function BlogPage() {
  const locale = (await getLocale()) as "en" | "zh";
  // Tags stay locale-free on purpose: they are filter keys shared across both
  // locales, so localising them would break the filter identity.
  const posts = await getAllBlogPosts(locale);
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
