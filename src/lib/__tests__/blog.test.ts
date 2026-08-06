import { describe, it, expect } from "vitest";
import { getAllBlogPosts, getBlogPost, getAllBlogTags, getBlogSlugs } from "../blog";

describe("blog i18n", () => {
  const hasHan = (value: string) => /[一-鿿]/.test(value);

  it("serves a Chinese post for every slug", async () => {
    const slugs = getBlogSlugs().map((file) => file.replace(/\.mdx$/, ""));
    expect(slugs.length).toBeGreaterThan(0);

    for (const slug of slugs) {
      const zh = await getBlogPost(slug, "zh");
      expect(zh, `no zh post resolved for ${slug}`).not.toBeNull();
      // The loader is allowed to fall back to English so a link never dies,
      // but every slug is meant to be translated — so a fallback reaching
      // this assertion means a missing translation, not a working fallback.
      expect(hasHan(zh!.metadata.title), `${slug} zh title is not translated`).toBe(true);
      expect(hasHan(zh!.content), `${slug} zh body is not translated`).toBe(true);
    }
  });

  it("keeps the English posts English", async () => {
    const posts = await getAllBlogPosts("en");
    for (const post of posts) {
      expect(hasHan(post.title), `${post.slug} en title leaked Chinese`).toBe(false);
    }
  });

  it("keeps slugs and dates aligned across locales", async () => {
    const en = await getAllBlogPosts("en");
    const zh = await getAllBlogPosts("zh");

    // One slug per post across locales keeps a single URL per language and
    // keeps hreflang honest; equal dates keep both indexes in the same order.
    expect(zh.map((p) => p.slug)).toEqual(en.map((p) => p.slug));
    expect(zh.map((p) => p.date)).toEqual(en.map((p) => p.date));
  });
});

describe("blog", () => {
  it("should return all blog posts", async () => {
    const posts = await getAllBlogPosts();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });

  it("should have required fields on each post", async () => {
    const posts = await getAllBlogPosts();
    for (const post of posts) {
      expect(post.slug).toBeDefined();
      expect(post.title).toBeDefined();
      expect(post.date).toBeDefined();
      expect(post.tags).toBeDefined();
      expect(Array.isArray(post.tags)).toBe(true);
    }
  });

  it("should return posts sorted by date descending", async () => {
    const posts = await getAllBlogPosts();
    if (posts.length >= 2) {
      for (let i = 1; i < posts.length; i++) {
        expect(new Date(posts[i - 1].date).getTime()).toBeGreaterThanOrEqual(
          new Date(posts[i].date).getTime()
        );
      }
    }
  });

  it("should return a post by slug", async () => {
    const posts = await getAllBlogPosts();
    if (posts.length > 0) {
      const post = await getBlogPost(posts[0].slug);
      expect(post).toBeDefined();
      expect(post?.metadata.title).toBe(posts[0].title);
    }
  });

  it("should return null for non-existent slug", async () => {
    const post = await getBlogPost("non-existent-slug-12345");
    expect(post).toBeNull();
  });

  it("should return all unique tags", async () => {
    const tags = await getAllBlogTags();
    expect(Array.isArray(tags)).toBe(true);
    const unique = new Set(tags);
    expect(unique.size).toBe(tags.length);
  });

  it("should include reading time", async () => {
    const posts = await getAllBlogPosts();
    for (const post of posts) {
      expect(post.readingTime).toBeDefined();
      expect(post.readingTime).toMatch(/min read/);
    }
  });
});
