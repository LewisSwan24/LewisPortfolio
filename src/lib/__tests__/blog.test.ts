import { describe, it, expect } from "vitest";
import { getAllBlogPosts, getBlogPost, getAllBlogTags } from "../blog";

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

  it("declares the original language for every post", async () => {
    const posts = await getAllBlogPosts();
    for (const post of posts) {
      expect(post.sourceLanguage).toBe("en");
    }
  });
});
