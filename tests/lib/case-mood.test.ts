import { describe, expect, it } from "vitest";
import { getCaseMood, getCaseMoodStyle } from "@/lib/cases/mood";
import { CURRENT_PROJECT_SLUGS } from "@/lib/project-routes";

describe("Case Mood Tokens", () => {
  it("provides light/dark mood palettes and CSS variables for all 14 project slugs", () => {
    for (const slug of CURRENT_PROJECT_SLUGS) {
      const mood = getCaseMood(slug);
      expect(mood.light).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(mood.dark).toMatch(/^#[0-9A-Fa-f]{6}$/);
      const style = getCaseMoodStyle(slug) as Record<string, string>;
      expect(style["--case-mood-light"]).toBe(mood.light);
      expect(style["--case-mood-dark"]).toBe(mood.dark);
    }
  });
});
