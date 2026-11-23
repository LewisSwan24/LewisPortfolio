import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { LISTED_PROJECT_SLUGS, UNLISTED_PROJECT_SLUGS } from "@/lib/project-routes";
import { CASE_FSM_SPECS } from "@/data/fsm/case-fsms";
import { CASE_HEURISTIC_AUDITS } from "@/data/heuristics/case-heuristics";
import { getAllInteractionPatterns } from "@/data/patterns/patterns-data";
import { EVIDENCE_CORPUS_ITEMS } from "@/lib/ai/evidence-corpus";
import { buildLlmsTxt } from "@/lib/llms";
import { getAllBlogPosts } from "@/lib/blog";
import { getApplicationPackets, getRolePackets } from "@/lib/proof";
import { RESUME_COMPOSER_CASES, RESUME_COMPOSER_PRESETS } from "@/lib/resume/composer-data";

const ALLOWED_ROUTE_PREFIXES = [
  "/projects/",
  "/patterns",
  "/lab",
  "/hire",
  "/resume",
  "/brief/print",
  "/contact",
  "/ai",
];

describe("v5.0 Cross-Portfolio Integrity & Symmetry Invariants", () => {
  it("keeps all 13 bilingual MDX essays in frontmatter parity across EN and ZH", async () => {
    const enPosts = await getAllBlogPosts("en");
    const zhPosts = await getAllBlogPosts("zh");

    expect(enPosts.length).toBeGreaterThanOrEqual(13);
    expect(zhPosts.length).toBe(enPosts.length);

    const zhSlugs = new Set(zhPosts.map((p) => p.slug));
    for (const post of enPosts) {
      expect(zhSlugs.has(post.slug), `missing ZH translation for ${post.slug}`).toBe(true);
      const enRaw = fs.readFileSync(path.join(process.cwd(), "content/blog", `${post.slug}.mdx`), "utf8");
      const zhRaw = fs.readFileSync(path.join(process.cwd(), "content/blog/zh", `${post.slug}.mdx`), "utf8");
      const enFm = matter(enRaw).data;
      const zhFm = matter(zhRaw).data;
      expect(Boolean(enFm.title) && Boolean(zhFm.title)).toBe(true);
      expect(Boolean(enFm.date) && Boolean(zhFm.date)).toBe(true);
      expect(Boolean(enFm.excerpt || enFm.summary) && Boolean(zhFm.excerpt || zhFm.summary)).toBe(true);
    }
  });

  it("zero unlisted case leakage across FSMs, heuristics, patterns, AI corpus, packets, llms.txt & composer", async () => {
    const llms = await buildLlmsTxt();
    const corpusSlugs = new Set(EVIDENCE_CORPUS_ITEMS.map((c) => c.slug));
    const composerSlugs = new Set(RESUME_COMPOSER_CASES.map((c) => c.slug));

    for (const unlisted of UNLISTED_PROJECT_SLUGS) {
      expect(CASE_FSM_SPECS.some((s) => s.slug === unlisted)).toBe(false);
      expect(CASE_HEURISTIC_AUDITS.some((a) => a.slug === unlisted)).toBe(false);
      expect(getAllInteractionPatterns().some((p) => p.sourceCaseSlug === unlisted)).toBe(false);
      expect(corpusSlugs.has(unlisted)).toBe(false);
      expect(composerSlugs.has(unlisted as never)).toBe(false);
      expect(llms.toLowerCase()).not.toContain(`/projects/${unlisted}`);
    }

    for (const listed of LISTED_PROJECT_SLUGS) {
      expect(composerSlugs.has(listed)).toBe(true);
    }
  });

  it("enforces complete resume composer tracks and valid internal links across packets & heuristics", () => {
    expect(RESUME_COMPOSER_PRESETS.map((p) => p.id)).toEqual(["ixd-ai", "design-tech", "product-ux"]);
    for (const preset of RESUME_COMPOSER_PRESETS) {
      expect(preset.label.en.length).toBeGreaterThan(3);
      expect(preset.label.zh.length).toBeGreaterThan(2);
      expect(preset.defaultCaseSlugs.length).toBeGreaterThanOrEqual(4);
      expect(preset.skills.en.length).toBeGreaterThanOrEqual(4);
      expect(preset.skills.zh.length).toBeGreaterThanOrEqual(4);
    }

    for (const locale of ["en", "zh"] as const) {
      for (const pkt of getRolePackets(locale)) {
        for (const claim of pkt.proofClaims) {
          expect(ALLOWED_ROUTE_PREFIXES.some((pfx) => claim.strongestAnchor.startsWith(pfx))).toBe(true);
        }
      }
      for (const appPkt of getApplicationPackets(locale)) {
        for (const action of appPkt.actions) {
          expect(ALLOWED_ROUTE_PREFIXES.some((pfx) => action.href.startsWith(pfx))).toBe(true);
        }
      }
    }

    for (const audit of CASE_HEURISTIC_AUDITS) {
      expect(ALLOWED_ROUTE_PREFIXES.some((pfx) => audit.proofHref.startsWith(pfx))).toBe(true);
    }
  });
});
