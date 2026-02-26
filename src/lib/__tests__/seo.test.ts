import { describe, it, expect } from "vitest";
import { generatePersonSchema, generateWebSiteSchema, generateProjectSchema, generateBreadcrumbSchema, generateArticleSchema } from "../seo";

describe("SEO schema generators", () => {
  describe("generatePersonSchema", () => {
    it("should return valid Person schema", () => {
      const schema = generatePersonSchema();
      expect(schema["@type"]).toBe("Person");
      expect(schema.name).toBeDefined();
    });
  });

  describe("generateWebSiteSchema", () => {
    it("should return valid WebSite schema", () => {
      const schema = generateWebSiteSchema();
      expect(schema["@type"]).toBe("WebSite");
      expect(schema.name).toBeDefined();
    });
  });

  describe("generateProjectSchema", () => {
    it("should return valid CreativeWork schema", () => {
      const schema = generateProjectSchema({
        title: "Test Project",
        oneLiner: "A test project",
        slug: "test",
        cover: "/images/test.png",
        tags: ["design", "ux"],
        timeframe: "2024",
      });
      expect(schema["@type"]).toBe("CreativeWork");
      expect(schema.name).toBe("Test Project");
      expect(schema.description).toBe("A test project");
    });
  });

  describe("generateBreadcrumbSchema", () => {
    it("should return valid BreadcrumbList schema", () => {
      const schema = generateBreadcrumbSchema([
        { name: "Home", url: "https://example.com" },
        { name: "Projects", url: "https://example.com/projects" },
      ]);
      expect(schema["@type"]).toBe("BreadcrumbList");
      expect(schema.itemListElement).toHaveLength(2);
      expect(schema.itemListElement[0].position).toBe(1);
      expect(schema.itemListElement[1].position).toBe(2);
    });
  });

  describe("generateArticleSchema", () => {
    it("should return valid Article schema", () => {
      const schema = generateArticleSchema({
        title: "Test Article",
        excerpt: "A test article",
        slug: "test",
        date: "2024-01-01",
        author: "Lewis Dong",
        tags: ["design"],
      });
      expect(schema["@type"]).toBe("Article");
      expect(schema.headline).toBe("Test Article");
    });
  });
});
