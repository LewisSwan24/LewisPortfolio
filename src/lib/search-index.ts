import { getAllBlogPosts } from "@/lib/blog";
import { getCaseSearchIndex, type CaseLocale } from "@/lib/cases/registry";
import type { PaletteItem } from "@/components/command/CommandPalette";

export async function buildSearchIndexItems(locale: CaseLocale): Promise<PaletteItem[]> {
  const blogPosts = await getAllBlogPosts(locale);
  return [
    ...getCaseSearchIndex(locale),
    ...blogPosts.map((post) => ({
      type: "blog" as const,
      slug: post.slug,
      title: post.title,
      description: post.excerpt,
      tags: post.tags,
    })),
  ];
}
