import { describe, it, expect } from "vitest";
import { getAllProjects, getProjectBySlug, getFeaturedProjects, getAllTags } from "../projects";

describe("projects", () => {
  it("should return all projects", async () => {
    const projects = await getAllProjects();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it("should have required fields on each project", async () => {
    const projects = await getAllProjects();
    for (const project of projects) {
      expect(project.slug).toBeDefined();
      expect(project.title).toBeDefined();
      expect(project.oneLiner).toBeDefined();
      expect(project.tags).toBeDefined();
      expect(Array.isArray(project.tags)).toBe(true);
    }
  });

  it("should return a project by slug", async () => {
    const projects = await getAllProjects();
    if (projects.length > 0) {
      const project = await getProjectBySlug(projects[0].slug);
      expect(project).toBeDefined();
      expect(project?.title).toBe(projects[0].title);
    }
  });

  it("should return null for non-existent slug", async () => {
    const project = await getProjectBySlug("non-existent-slug-12345");
    expect(project).toBeNull();
  });

  it("should return featured projects", async () => {
    const featured = await getFeaturedProjects();
    expect(Array.isArray(featured)).toBe(true);
    for (const project of featured) {
      expect(project.featured).toBe(true);
    }
  });

  it("should return all unique tags", async () => {
    const tags = await getAllTags();
    expect(Array.isArray(tags)).toBe(true);
    const unique = new Set(tags);
    expect(unique.size).toBe(tags.length);
  });
});
