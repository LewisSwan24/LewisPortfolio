import { describe, expect, it } from "vitest";
import {
  CaseModulesRecordSchema,
  REQUIRED_CASE_STATES,
  type CaseModulesRecord,
} from "@/lib/cases/modules-schema";
import { getAllListedCaseModules, getCaseDepthModules } from "@/data/cases/modules";
import {
  LISTED_PROJECT_SLUGS,
  PROJECT_OG_COPY,
  UNLISTED_PROJECT_SLUGS,
} from "@/lib/project-routes";

function collectAllStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") {
    out.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collectAllStrings(item, out);
  } else if (value && typeof value === "object") {
    for (const v of Object.values(value)) collectAllStrings(v, out);
  }
  return out;
}

describe("CaseModules Integrity & Honest Evidence Boundaries (v4.6)", () => {
  it("provides schema-valid depth modules for every one of the 6 listed cases", () => {
    expect(LISTED_PROJECT_SLUGS).toHaveLength(6);
    const allModules = getAllListedCaseModules();
    expect(allModules).toHaveLength(6);

    for (const slug of LISTED_PROJECT_SLUGS) {
      const mod = getCaseDepthModules(slug);
      expect(mod, `Expected modules for listed slug "${slug}"`).not.toBeNull();
      const parsed = CaseModulesRecordSchema.safeParse(mod);
      expect(parsed.success, parsed.success ? "" : JSON.stringify(parsed.error.issues)).toBe(true);
    }
  });

  it("returns null for all 8 unlisted slugs and leaks zero unlisted slug citations", () => {
    for (const slug of UNLISTED_PROJECT_SLUGS) {
      expect(getCaseDepthModules(slug)).toBeNull();
    }

    const distinctUnlistedTokens = UNLISTED_PROJECT_SLUGS.filter(
      (slug) => slug !== "connect" && slug !== "rules"
    );
    const unlistedTitleFragments = UNLISTED_PROJECT_SLUGS.map(
      (slug) => PROJECT_OG_COPY[slug].title
    );

    for (const mod of getAllListedCaseModules()) {
      const strings = collectAllStrings(mod);
      for (const text of strings) {
        const lower = text.toLowerCase();
        for (const hidden of UNLISTED_PROJECT_SLUGS) {
          expect(
            lower.includes(`/projects/${hidden}`),
            `Found unlisted route leak in ${mod.slug}: "${text}"`
          ).toBe(false);
        }
        for (const token of distinctUnlistedTokens) {
          expect(
            new RegExp(`\\b${token}\\b`, "i").test(text),
            `Found unlisted slug token "${token}" in ${mod.slug}: "${text}"`
          ).toBe(false);
        }
        for (const title of unlistedTitleFragments) {
          expect(
            lower.includes(title.toLowerCase()),
            `Found unlisted project title "${title}" in ${mod.slug}: "${text}"`
          ).toBe(false);
        }
      }
    }
  });

  it("enforces >= 5 sequential journey stages, exact 5-state matrix, and >= 2 real rejections per case", () => {
    for (const mod of getAllListedCaseModules()) {
      expect(mod.journey.length).toBeGreaterThanOrEqual(5);
      expect(mod.journey.length).toBeLessThanOrEqual(6);
      expect(mod.stateMatrix.map((s) => s.state)).toEqual([...REQUIRED_CASE_STATES]);
      expect(mod.rejectionArchive.length).toBeGreaterThanOrEqual(2);

      // Verify all three focus tags appear across modules for each case so no lens is empty
      const tags = new Set<string>([
        ...mod.journey.flatMap((j) => j.focusTags),
        ...mod.stateMatrix.flatMap((s) => s.focusTags),
        ...mod.rejectionArchive.flatMap((r) => r.focusTags),
      ]);
      expect(tags.has("ux-research")).toBe(true);
      expect(tags.has("systems-hardware")).toBe(true);
      expect(tags.has("ai-trust")).toBe(true);
    }
  });

  it("maintains bilingual EN/ZH parity without placeholder or empty copy", () => {
    const checkRecord = (mod: CaseModulesRecord) => {
      for (const stage of mod.journey) {
        expect(stage.title.en.length).toBeGreaterThan(5);
        expect(stage.title.zh.length).toBeGreaterThan(3);
        expect(stage.cognitiveFriction.en.length).toBeGreaterThan(15);
        expect(stage.cognitiveFriction.zh.length).toBeGreaterThan(8);
        expect(stage.edgeRecovery.en.length).toBeGreaterThan(15);
        expect(stage.edgeRecovery.zh.length).toBeGreaterThan(8);
      }
      for (const row of mod.stateMatrix) {
        expect(row.uiFeedback.en.length).toBeGreaterThan(15);
        expect(row.uiFeedback.zh.length).toBeGreaterThan(8);
        expect(row.keyboardFocus.en.length).toBeGreaterThan(10);
        expect(row.keyboardFocus.zh.length).toBeGreaterThan(6);
        expect(row.fallbackGuarantee.en.length).toBeGreaterThan(15);
        expect(row.fallbackGuarantee.zh.length).toBeGreaterThan(8);
      }
      for (const entry of mod.rejectionArchive) {
        expect(entry.failureExposed.en.length).toBeGreaterThan(15);
        expect(entry.failureExposed.zh.length).toBeGreaterThan(8);
        expect(entry.fixApplied.en.length).toBeGreaterThan(15);
        expect(entry.fixApplied.zh.length).toBeGreaterThan(8);
      }
    };

    for (const mod of getAllListedCaseModules()) {
      checkRecord(mod);
    }
  });
});
