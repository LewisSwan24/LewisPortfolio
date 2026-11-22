import { describe, expect, it } from "vitest";
import { buildSearchIndexItems } from "@/lib/search-index";
import { buildLlmsTxt } from "@/lib/llms";
import { LISTED_PROJECT_SLUGS, UNLISTED_PROJECT_SLUGS } from "@/lib/project-routes";

describe("Search index & llms.txt builders", () => {
  it("builds EN and ZH search index with all listed cases and zero unlisted cases", async () => {
    for (const locale of ["en", "zh"] as const) {
      const items = await buildSearchIndexItems(locale);
      const projectSlugs = items.filter((i) => i.type === "project").map((i) => i.slug);

      expect(projectSlugs).toEqual(LISTED_PROJECT_SLUGS);
      for (const hidden of UNLISTED_PROJECT_SLUGS) {
        expect(projectSlugs).not.toContain(hidden);
      }
      expect(items.some((i) => i.type === "blog")).toBe(true);
    }
  });

  it("generates /llms.txt covering AI Lab and all 6 listed cases with 3 structured decisions", async () => {
    const body = await buildLlmsTxt();
    expect(body).toContain("# Lewis Dong");
    expect(body).toContain("/en/ai");
    expect(body).toContain("Structured Design Decisions (3):");

    for (const slug of LISTED_PROJECT_SLUGS) {
      expect(body).toContain(`/projects/${slug}`);
    }
    for (const hidden of UNLISTED_PROJECT_SLUGS) {
      expect(body.toLowerCase()).not.toContain(`/projects/${hidden}`);
    }
  });
});
