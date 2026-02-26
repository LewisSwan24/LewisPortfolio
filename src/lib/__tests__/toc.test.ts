import { describe, it, expect } from "vitest";
import { extractTOC, slugify } from "../toc";

describe("extractTOC", () => {
  it("should extract h2 headings", () => {
    const content = "## Overview\n\nSome text\n\n## Design\n\nMore text";
    const toc = extractTOC(content);
    expect(toc).toHaveLength(2);
    expect(toc[0].text).toBe("Overview");
    expect(toc[1].text).toBe("Design");
  });

  it("should extract h3 headings", () => {
    const content = "## Overview\n\n### Details\n\nSome text";
    const toc = extractTOC(content);
    expect(toc).toHaveLength(2);
    expect(toc[0].level).toBe(2);
    expect(toc[1].level).toBe(3);
  });

  it("should ignore h1 headings", () => {
    const content = "# Title\n\n## Overview\n\nSome text";
    const toc = extractTOC(content);
    expect(toc).toHaveLength(1);
    expect(toc[0].text).toBe("Overview");
  });

  it("should ignore h4+ headings", () => {
    const content = "## Overview\n\n#### Details\n\nSome text";
    const toc = extractTOC(content);
    expect(toc).toHaveLength(1);
  });

  it("should generate slugified IDs", () => {
    const content = "## My Section Title\n\nText";
    const toc = extractTOC(content);
    expect(toc[0].id).toBe("my-section-title");
  });

  it("should return empty array for no headings", () => {
    const content = "Just some paragraph text.";
    const toc = extractTOC(content);
    expect(toc).toHaveLength(0);
  });
});

describe("slugify", () => {
  it("should slugify text", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("should handle special characters", () => {
    const slug = slugify("What's New?");
    expect(slug).toBeTruthy();
    expect(slug).not.toContain(" ");
  });
});
