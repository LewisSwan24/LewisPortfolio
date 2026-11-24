import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { auditTranslationese } from "@/lib/i18n/editorial-voice";
import { UNLISTED_PROJECT_SLUGS } from "@/lib/project-routes";
import { DEFENSE_DRILLS } from "@/data/critique/defense-drills";
import telemetryManifest from "@/data/telemetry/bundle-manifest.generated.json";

const ROOT = process.cwd();

describe("v5.9 Defense Arena, Telemetry Observatory Invariants", () => {
  it("provides grounded APAC & ANZ challenge drills across all 4 roles without unlisted leaks or translationese", () => {
    expect(DEFENSE_DRILLS.length).toBeGreaterThanOrEqual(8);

    const roleMarketPairs = new Set<string>();
    for (const drill of DEFENSE_DRILLS) {
      roleMarketPairs.add(`${drill.roleId}:${drill.marketId}`);
      expect(drill.evidenceHref.startsWith("/")).toBe(true);
      for (const unlisted of UNLISTED_PROJECT_SLUGS) {
        expect(drill.evidenceHref).not.toContain(`/projects/${unlisted}`);
      }

      expect(auditTranslationese(drill.challengeQuestion.en, "en")).toEqual([]);
      expect(auditTranslationese(drill.challengeQuestion.zh, "zh")).toEqual([]);
      expect(auditTranslationese(drill.overclaimedWeakAnswer.en, "en")).toEqual([]);
      expect(auditTranslationese(drill.overclaimedWeakAnswer.zh, "zh")).toEqual([]);
      expect(auditTranslationese(drill.groundedDefense.en, "en")).toEqual([]);
      expect(auditTranslationese(drill.groundedDefense.zh, "zh")).toEqual([]);
      expect(auditTranslationese(drill.residualGap.en, "en")).toEqual([]);
      expect(auditTranslationese(drill.residualGap.zh, "zh")).toEqual([]);
    }

    for (const role of ["product", "interaction", "design-eng", "ai-ux"]) {
      expect(roleMarketPairs.has(`${role}:apac`)).toBe(true);
      expect(roleMarketPairs.has(`${role}:anz`)).toBe(true);
    }
  });

  it("removes LightningCSS experimental @container anchored warning trigger from primitives.css", () => {
    const css = fs.readFileSync(
      path.join(ROOT, "src", "styles", "primitives.css"),
      "utf8"
    );
    expect(css).not.toMatch(/@container\s+anchored\(/i);
  });

  it("tracks valid telemetry manifest within bundle budget and zero leaks", () => {
    expect(telemetryManifest.schemaVersion).toBe("v5.9");
    expect(telemetryManifest.budgets.largestAppRouteGzKb).toBeLessThanOrEqual(22);
    expect(telemetryManifest.budgets.largestLazy3dGzKb).toBeLessThanOrEqual(160);
    expect(telemetryManifest.budgets.appCssGzKb).toBeLessThanOrEqual(68);
    expect(telemetryManifest.integrity.unlistedLeaks).toBe(0);
    expect(telemetryManifest.integrity.cssCompilerWarnings).toBe(0);
    expect(telemetryManifest.maintenance.missingReviewMetadata).toBe(0);
  });
});
