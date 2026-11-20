import { existsSync } from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { LISTED_PROJECT_SLUGS, UNLISTED_PROJECT_SLUGS } from "@/lib/project-routes";
import { PROJECT_COVERS, getProjectCover } from "@/lib/project-covers";

describe("project covers", () => {
  it("gives every listed case a real image", () => {
    const without = LISTED_PROJECT_SLUGS.filter((slug) => !getProjectCover(slug));
    expect(without).toEqual([]);
  });

  it("points every cover at a file that ships in public/", () => {
    for (const cover of Object.values(PROJECT_COVERS)) {
      const file = path.join(process.cwd(), "public", cover.src);
      expect(existsSync(file), cover.src).toBe(true);
    }
  });

  it("describes every cover in both locales", () => {
    for (const [slug, cover] of Object.entries(PROJECT_COVERS)) {
      expect(cover.alt.en.trim().length, slug).toBeGreaterThan(10);
      expect(cover.alt.zh.trim().length, slug).toBeGreaterThan(4);
      expect(cover.width).toBeGreaterThan(0);
      expect(cover.height).toBeGreaterThan(0);
    }
  });

  it("never covers an unlisted case", () => {
    for (const slug of UNLISTED_PROJECT_SLUGS) {
      expect(getProjectCover(slug), slug).toBeUndefined();
    }
  });
});
