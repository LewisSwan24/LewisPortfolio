import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import enMessages from "@/messages/en.json";
import zhMessages from "@/messages/zh.json";
import { getAllBlogPosts } from "@/lib/blog";
import { BLOG_CLUSTERS } from "@/lib/blog-clusters";
import { VAULT_AUTOPSIES } from "@/data/vault/autopsies";
import { REPLAY_TRACES } from "@/data/replay/traces";
import { INTERACTION_PATTERNS } from "@/data/patterns/patterns-data";
import { getListedCases } from "@/lib/cases/registry";
import { LISTED_PROJECT_SLUGS, UNLISTED_PROJECT_SLUGS } from "@/lib/project-routes";
import { auditTranslationese } from "@/lib/i18n/editorial-voice";
import { buildLlmsTxt } from "@/lib/llms";
import {
  RESUME_COMPOSER_CASES,
  RESUME_COMPOSER_MARKETS,
  RESUME_COMPOSER_PRESETS,
} from "@/lib/resume/composer-data";
import {
  getHiringRoleFits,
  getInterviewDecisionRoom,
} from "@/lib/portfolio-proof";
import { getMarketLensProfiles } from "@/lib/proof/market-lens";

function collectLeafStrings(value: unknown, prefix = ""): Array<{ path: string; text: string }> {
  if (typeof value === "string") {
    return [{ path: prefix, text: value }];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectLeafStrings(item, `${prefix}[${index}]`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, val]) =>
      collectLeafStrings(val, prefix ? `${prefix}.${key}` : key)
    );
  }
  return [];
}

function assertCleanTranslationese(
  entries: Array<{ path: string; text: string }>,
  locale: "en" | "zh"
) {
  const failures: string[] = [];
  for (const { path: keyPath, text } of entries) {
    const violations = auditTranslationese(text, locale);
    for (const v of violations) {
      failures.push(`${keyPath} [${v.ruleId}]: "${v.match}"`);
    }
  }
  expect(failures).toEqual([]);
}

describe("v5.5 Master Release Invariants", () => {
  it("enforces 24 bilingual monographs across 4 clusters with zero translationese", async () => {
    const enPosts = await getAllBlogPosts("en");
    const zhPosts = await getAllBlogPosts("zh");

    expect(enPosts.length).toBeGreaterThanOrEqual(24);
    expect(zhPosts.length).toBe(enPosts.length);
    expect(enPosts.map((p) => p.slug).sort()).toEqual(zhPosts.map((p) => p.slug).sort());

    const clusterSet = new Set<string>(BLOG_CLUSTERS);
    for (const post of enPosts) {
      expect(clusterSet.has(post.cluster)).toBe(true);
      expect(auditTranslationese(`${post.title} ${post.excerpt}`, "en")).toEqual([]);
    }
    for (const post of zhPosts) {
      expect(clusterSet.has(post.cluster)).toBe(true);
      expect(auditTranslationese(`${post.title} ${post.excerpt}`, "zh")).toEqual([]);
    }
  });

  it("enforces 7 Archive Vault autopsies, 3 Replay traces, and zero unlisted leakage", async () => {
    expect(VAULT_AUTOPSIES).toHaveLength(7);
    expect(new Set(VAULT_AUTOPSIES.map((a) => a.slug))).toEqual(
      new Set(UNLISTED_PROJECT_SLUGS)
    );

    const listedSet = new Set<string>(LISTED_PROJECT_SLUGS);
    for (const autopsy of VAULT_AUTOPSIES) {
      for (const successor of autopsy.lineageSuccessors) {
        expect(listedSet.has(successor.slug)).toBe(true);
      }
      expect(
        auditTranslationese(
          `${autopsy.whatItBuilt.en} ${autopsy.autopsyReason.en} ${autopsy.structuralFlawExposed.en} ${autopsy.lineageLesson.en}`,
          "en"
        )
      ).toEqual([]);
      expect(
        auditTranslationese(
          `${autopsy.whatItBuilt.zh} ${autopsy.autopsyReason.zh} ${autopsy.structuralFlawExposed.zh} ${autopsy.lineageLesson.zh}`,
          "zh"
        )
      ).toEqual([]);
    }

    expect(REPLAY_TRACES).toHaveLength(3);
    for (const trace of REPLAY_TRACES) {
      expect(trace.nominalFrames.length).toBeGreaterThanOrEqual(5);
      expect(trace.faultFrames.length).toBeGreaterThanOrEqual(5);
      for (const seq of [trace.nominalFrames, trace.faultFrames]) {
        for (let i = 1; i < seq.length; i++) {
          expect(seq[i].timestampMs).toBeGreaterThan(seq[i - 1].timestampMs);
        }
      }
    }

    expect(getListedCases()).toHaveLength(6);
    const llms = await buildLlmsTxt();
    expect(llms).toMatch(/v5\.[5-9]|v6\.0/);
    expect(llms).toContain("/en/vault");
    expect(llms).toContain("/en/studio/replay");
    for (const hiddenSlug of UNLISTED_PROJECT_SLUGS) {
      expect(llms).not.toContain(`/projects/${hiddenSlug}`);
    }
  });

  it("passes portfolio-wide EN/ZH naturalization and eliminates stale version & cliché strings", () => {
    const enLeaves = collectLeafStrings(enMessages, "en");
    const zhLeaves = collectLeafStrings(zhMessages, "zh");

    expect(enMessages.foot.meta.version).toContain("v5.5");
    expect(zhMessages.foot.meta.version).toContain("v5.5");

    assertCleanTranslationese(enLeaves, "en");
    assertCleanTranslationese(zhLeaves, "zh");

    const serializedEn = JSON.stringify(enMessages);
    const serializedZh = JSON.stringify(zhMessages);
    expect(serializedEn).not.toMatch(/v4\.5/);
    expect(serializedZh).not.toMatch(/v4\.5/);
    expect(serializedEn).not.toMatch(/functional and delightful|creative problem-solving/i);
    expect(serializedZh).not.toMatch(/以人为本的数字体验|致力于打造|指导我每一个设计决策/);

    // 6 listed cases, 6 patterns, and hiring dossiers remain clean
    for (const c of getListedCases()) {
      const enText = [
        c.card.en.kicker,
        c.card.en.sub,
        c.workSummary.problem.en,
        c.workSummary.changed.en,
        ...(c.designDecisions ?? []).flatMap((d) => [
          d.humanTension.en,
          d.chosenTradeoff.en,
          d.residualCostOrRisk.en,
        ]),
      ].join(" ");
      const zhText = [
        c.card.zh.kicker,
        c.card.zh.sub,
        c.workSummary.problem.zh,
        c.workSummary.changed.zh,
        ...(c.designDecisions ?? []).flatMap((d) => [
          d.humanTension.zh,
          d.chosenTradeoff.zh,
          d.residualCostOrRisk.zh,
        ]),
      ].join(" ");
      expect(auditTranslationese(enText, "en")).toEqual([]);
      expect(auditTranslationese(zhText, "zh")).toEqual([]);
    }

    for (const p of INTERACTION_PATTERNS) {
      expect(auditTranslationese(`${p.title.en} ${p.tagline.en} ${p.humanTension.en}`, "en")).toEqual([]);
      expect(auditTranslationese(`${p.title.zh} ${p.tagline.zh} ${p.humanTension.zh}`, "zh")).toEqual([]);
    }

    assertCleanTranslationese(collectLeafStrings(getHiringRoleFits("en"), "hire.en"), "en");
    assertCleanTranslationese(collectLeafStrings(getHiringRoleFits("zh"), "hire.zh"), "zh");
    assertCleanTranslationese(collectLeafStrings(getInterviewDecisionRoom("en"), "room.en"), "en");
    assertCleanTranslationese(collectLeafStrings(getInterviewDecisionRoom("zh"), "room.zh"), "zh");
  });

  it("enforces dual-market modes (APAC closed-loop vs ANZ/Global engineering critique) across /hire and /resume/compose", () => {
    expect(RESUME_COMPOSER_MARKETS.map((m) => m.id)).toEqual([
      "apac-closed-loop",
      "anz-critique",
    ]);

    for (const market of RESUME_COMPOSER_MARKETS) {
      expect(auditTranslationese(`${market.label.en} ${market.summary.en}`, "en")).toEqual([]);
      expect(auditTranslationese(`${market.label.zh} ${market.summary.zh}`, "zh")).toEqual([]);
    }

    for (const preset of RESUME_COMPOSER_PRESETS) {
      expect(preset.marketEmphasis["apac-closed-loop"]).toBeDefined();
      expect(preset.marketEmphasis["anz-critique"]).toBeDefined();
      assertCleanTranslationese(
        collectLeafStrings(preset, `preset.${preset.id}`),
        "en"
      );
      assertCleanTranslationese(
        collectLeafStrings(preset, `preset.${preset.id}`),
        "zh"
      );
    }

    expect(RESUME_COMPOSER_CASES).toHaveLength(6);

    const hireMarkets = getMarketLensProfiles();
    expect(hireMarkets).toHaveLength(2);
    for (const profile of hireMarkets) {
      expect(auditTranslationese(`${profile.label.en} ${profile.thesis.en}`, "en")).toEqual([]);
      expect(auditTranslationese(`${profile.label.zh} ${profile.thesis.zh}`, "zh")).toEqual([]);
      expect(profile.deepLinks.some((d) => d.href === "/vault")).toBe(true);
      expect(profile.deepLinks.some((d) => d.href === "/studio/replay")).toBe(true);
    }
  });

  it("keeps README aligned with v5.5+ milestone", () => {
    const readme = fs.readFileSync(path.join(process.cwd(), "README.md"), "utf-8");
    expect(readme).toMatch(/v5\.[5-9]|v6\.0/);
    expect(readme).toContain("/vault");
    expect(readme).toContain("/studio/replay");
    expect(readme).toContain("WCAG 2.2 AA");
  });
});
