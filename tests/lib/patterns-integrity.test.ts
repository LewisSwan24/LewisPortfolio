import { describe, expect, it } from "vitest";
import { InteractionPatternSchema } from "@/lib/patterns/schema";
import { getAllInteractionPatterns } from "@/data/patterns/patterns-data";
import { EVIDENCE_CORPUS_ITEMS } from "@/lib/ai/evidence-corpus";
import {
  LISTED_PROJECT_SLUGS,
  PROJECT_OG_COPY,
  UNLISTED_PROJECT_SLUGS,
} from "@/lib/project-routes";

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === "object") {
    Object.values(value).forEach((v) => collectStrings(v, out));
  }
  return out;
}

describe("Interaction Pattern Atlas & AI Corpus Integration (v4.7)", () => {
  it("provides 6 schema-valid patterns covering all 6 listed cases with zero unlisted leaks", () => {
    const patterns = getAllInteractionPatterns();
    expect(patterns).toHaveLength(6);

    const sourceCases = new Set(patterns.map((p) => p.sourceCaseSlug));
    for (const listed of LISTED_PROJECT_SLUGS) {
      expect(sourceCases.has(listed)).toBe(true);
    }

    const orders = patterns.map((p) => p.order);
    expect(orders).toEqual([1, 2, 3, 4, 5, 6]);

    const distinctUnlisted = UNLISTED_PROJECT_SLUGS.filter(
      (slug) => slug !== "connect" && slug !== "rules"
    );
    const unlistedTitles = UNLISTED_PROJECT_SLUGS.map(
      (slug) => PROJECT_OG_COPY[slug].title.toLowerCase()
    );

    for (const pattern of patterns) {
      const parsed = InteractionPatternSchema.safeParse(pattern);
      expect(parsed.success, parsed.success ? "" : JSON.stringify(parsed.error.issues)).toBe(true);
      expect(pattern.a11yGuarantees.length).toBeGreaterThanOrEqual(2);
      expect(pattern.codeSnippet.code.length).toBeGreaterThan(60);

      for (const text of collectStrings(pattern)) {
        const lower = text.toLowerCase();
        for (const hidden of UNLISTED_PROJECT_SLUGS) {
          expect(lower.includes(`/projects/${hidden}`)).toBe(false);
        }
        for (const token of distinctUnlisted) {
          expect(new RegExp(`\\b${token}\\b`, "i").test(text)).toBe(false);
        }
        for (const title of unlistedTitles) {
          expect(lower.includes(title)).toBe(false);
        }
      }
    }
  });

  it("indexes all 6 patterns into EVIDENCE_CORPUS_ITEMS under the pattern pillar (weight 2.2)", () => {
    const patternChunks = EVIDENCE_CORPUS_ITEMS.filter((c) => c.pillar === "pattern");
    expect(patternChunks).toHaveLength(6);
    for (const chunk of patternChunks) {
      expect(chunk.weight).toBe(2.2);
      expect(chunk.href.en).toContain("/patterns");
      expect(chunk.href.zh).toContain("/zh/patterns");
    }
  });
});
