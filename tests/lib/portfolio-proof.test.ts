import { describe, expect, it } from "vitest";
import {
  AI_TRUST_THREAD_HREF,
  getAiTrustThread,
  getCapabilityPillars,
  getCareerSnapshot,
  getCaseDepth,
  getCaseInterviewPack,
  getCaseInterviewScan,
  getCaseReaderGuide,
  getCaseSummary,
  getEvidenceMatrix,
  getHiringConversion,
  getHiringPaths,
  getHiringRoleFits,
  getInterviewDecisionRoom,
  getProjectEvidence,
  getRoleFit,
  getRolePacket,
  type ProjectEvidenceSlug,
  projectEvidenceSlugs,
} from "@/lib/portfolio-proof";
import type { CaseReaderAnchorId } from "@/lib/proof";
import {
  LISTED_PROJECT_SLUGS,
  PROJECT_OG_COPY,
  UNLISTED_PROJECT_SLUGS,
  isUnlistedProject,
  linksToUnlistedProject,
} from "@/lib/project-routes";
import { getCaseCard, getCaseNarrative } from "@/lib/cases/registry";
import enMessages from "@/messages/en.json";
import zhMessages from "@/messages/zh.json";

// Derived from the slug registry so adding a case does not silently invalidate
// these patterns the way hard-coded slug alternations did.
const SLUG_ALT = projectEvidenceSlugs.join("|");
const CASE_HREF = new RegExp(`^/projects/(${SLUG_ALT})(#.+)?$`);
const CASE_ANCHOR_HREF = new RegExp(`^/projects/(${SLUG_ALT})#`);

describe("portfolio proof content", () => {
  it("covers every listed project with evidence metadata", () => {
    const projects = getProjectEvidence("en");
    const listed = projectEvidenceSlugs.filter((slug) => !isUnlistedProject(slug));

    // Bound to the slug registry rather than a literal, so adding a case does
    // not require editing a count here. An unlisted case keeps its entry in the
    // registry but drops out of this list, the way it drops out of the work index.
    expect(projects).toHaveLength(listed.length);
    expect(projects.map((project) => project.slug)).toEqual(listed);

    for (const project of projects) {
      expect(project.challenge.length).toBeGreaterThan(20);
      expect(project.methods.length).toBeGreaterThanOrEqual(2);
      expect(project.sample.length).toBeGreaterThan(3);
      expect(project.outcome.length).toBeGreaterThan(5);
      expect(project.proves.length).toBeGreaterThan(10);
      expect(project.href).toBe(`/projects/${project.slug}`);
    }
  });

  it("links every capability pillar to a proof route", () => {
    const pillars = getCapabilityPillars("en");

    expect(pillars.length).toBeGreaterThanOrEqual(5);
    for (const pillar of pillars) {
      expect(pillar.title.length).toBeGreaterThan(3);
      expect(pillar.proof.length).toBeGreaterThan(10);
      expect(pillar.href).toMatch(/^\/projects\//);
    }
  });

  it("has case summaries for every project", () => {
    for (const slug of projectEvidenceSlugs) {
      const summary = getCaseSummary(slug, "en");

      expect(summary.challenge.length).toBeGreaterThan(20);
      expect(summary.methods.length).toBeGreaterThanOrEqual(2);
      expect(summary.evidence.length).toBeGreaterThanOrEqual(2);
      expect(summary.next.length).toBeGreaterThan(20);
    }
  });

  it("summarizes the career snapshot and role fit", () => {
    const snapshot = getCareerSnapshot("en");
    const roleFit = getRoleFit("en");

    expect(snapshot.stats.length).toBeGreaterThanOrEqual(4);
    expect(roleFit.roles.length).toBeGreaterThanOrEqual(3);
    expect(roleFit.bestFit.length).toBeGreaterThanOrEqual(3);
    expect(roleFit.availability).toContain("2026");
  });

  it("offers recruiter-friendly reading paths", () => {
    const paths = getHiringPaths("en");

    expect(paths).toHaveLength(3);
    expect(paths.map((path) => path.time)).toEqual([
      "15-second scan",
      "2-minute case check",
      "10-minute deep read",
    ]);

    for (const path of paths) {
      expect(path.title.length).toBeGreaterThan(5);
      expect(path.action.length).toBeGreaterThan(15);
      expect(path.href).toMatch(/^\/(projects|resume|contact)/);
    }
  });

  it("provides interview-ready case depth for every project", () => {
    for (const slug of projectEvidenceSlugs) {
      const depth = getCaseDepth(slug, "en");

      expect(depth.decisions.length).toBeGreaterThanOrEqual(3);
      expect(depth.evidence.length).toBeGreaterThanOrEqual(3);
      expect(depth.iterations.length).toBeGreaterThanOrEqual(2);
      expect(depth.limits.length).toBeGreaterThanOrEqual(2);
      expect(depth.takeaway.length).toBeGreaterThan(30);

      for (const decision of depth.decisions) {
        expect(decision.choice.length).toBeGreaterThan(10);
        expect(decision.evidence.length).toBeGreaterThan(10);
        expect(decision.tradeoff.length).toBeGreaterThan(10);
        expect(decision.impact.length).toBeGreaterThan(10);
      }

      for (const item of depth.evidence) {
        expect(item.method.length).toBeGreaterThan(3);
        expect(item.sample.length).toBeGreaterThan(3);
        expect(item.finding.length).toBeGreaterThan(10);
        expect(item.implication.length).toBeGreaterThan(10);
      }

      for (const limit of depth.limits) {
        expect(limit.constraint.length).toBeGreaterThan(10);
        expect(limit.whyItMatters.length).toBeGreaterThan(10);
        expect(limit.nextValidation.length).toBeGreaterThan(10);
      }
    }
  });

  it("provides hiring conversion data for recruiter-facing pages", () => {
    const conversion = getHiringConversion("en");

    expect(conversion.hero.headline).toMatch(/UX|Product/i);
    expect(conversion.hero.status).toMatch(/2026|internship|graduate/i);
    expect(conversion.signals.length).toBeGreaterThanOrEqual(4);
    expect(conversion.proofRoutes.length).toBeGreaterThanOrEqual(3);
    expect(conversion.closingPrompt.primaryAction.href).toBe("/contact");

    for (const route of conversion.proofRoutes) {
      expect(route.href).toMatch(CASE_HREF);
      expect(route.audience.length).toBeGreaterThan(8);
      expect(route.claim.length).toBeGreaterThan(12);
      expect(route.evidence.length).toBeGreaterThan(12);
    }
  });

  it("keeps the Chinese hiring conversion free of sentence-level English copy", () => {
    const conversion = getHiringConversion("zh");
    const visibleCopy = JSON.stringify(conversion);

    expect(visibleCopy).not.toMatch(
      /\b(?:Research-led|I turn|Open to|Best proof|Use this portfolio|Contact Lewis|Read the resume)\b/
    );
    expect(conversion.hero.headline).toMatch(/设计|研究|证据/);
    expect(conversion.closingPrompt.primaryAction.label).toMatch(/联系/);
  });

  it("provides interviewer scans for every case", () => {
    for (const slug of projectEvidenceSlugs) {
      const scan = getCaseInterviewScan(slug, "en");

      expect(scan.proves.length).toBeGreaterThan(12);
      expect(scan.inspect.length).toBeGreaterThanOrEqual(3);
      expect(scan.questions.length).toBeGreaterThanOrEqual(2);
      expect(scan.bestFit.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("provides reader guides for every case", () => {
    for (const slug of projectEvidenceSlugs) {
      const guide = getCaseReaderGuide(slug, "en");

      expect(guide.sections.length).toBeGreaterThanOrEqual(8);
      expect(guide.modes.length).toBeGreaterThanOrEqual(4);
      expect(guide.prompts.length).toBeGreaterThanOrEqual(3);

      const sectionIds = new Set(guide.sections.map((section) => section.id));

      expect(sectionIds.has("snapshot")).toBe(true);
      expect(sectionIds.has("decision-timeline")).toBe(true);
      expect(sectionIds.has("evidence-board")).toBe(true);
      expect(sectionIds.has("interview-takeaway")).toBe(true);

      for (const mode of guide.modes) {
        expect(mode.label.length).toBeGreaterThan(4);
        expect(mode.anchorIds.length).toBeGreaterThanOrEqual(3);
        for (const anchorId of mode.anchorIds) {
          expect(sectionIds.has(anchorId)).toBe(true);
        }
      }

      for (const prompt of guide.prompts) {
        expect(prompt.question.length).toBeGreaterThan(12);
        expect(prompt.reason.length).toBeGreaterThan(12);
        expect(sectionIds.has(prompt.anchorId)).toBe(true);
      }
    }
  });

  it("reader guides keep stable section ids across locales", () => {
    for (const slug of projectEvidenceSlugs) {
      const enIds = getCaseReaderGuide(slug, "en").sections.map((section) => section.id);
      const zhIds = getCaseReaderGuide(slug, "zh").sections.map((section) => section.id);

      expect(zhIds).toEqual(enIds);
    }
  });

  it("proof routes deep-link to valid reader anchors", () => {
    const conversion = getHiringConversion("en");

    for (const route of conversion.proofRoutes) {
      expect(route.href).toMatch(CASE_ANCHOR_HREF);

      const [, slug, anchor] = route.href.match(/^\/projects\/([^#]+)#(.+)$/) ?? [];
      expect(slug).toBeTruthy();
      expect(anchor).toBeTruthy();

      const guide = getCaseReaderGuide(slug as ProjectEvidenceSlug, "en");
      expect(guide.sections.some((section) => section.id === anchor)).toBe(true);
    }
  });

  it("provides hiring role fits for priority openings", () => {
    const roleFits = getHiringRoleFits("en");
    const ids = roleFits.map((role) => role.id);

    expect(ids).toEqual(["ux-product", "ux-research", "ai-ux"]);

    for (const role of roleFits) {
      expect(role.label.length).toBeGreaterThan(4);
      expect(role.fit.length).toBeGreaterThan(20);
      expect(role.proofLinks.length).toBeGreaterThanOrEqual(2);
      expect(role.bestCases.length).toBeGreaterThanOrEqual(1);
      expect(role.risk.length).toBeGreaterThan(12);
      expect(role.interviewAngle.length).toBeGreaterThan(12);

      for (const href of role.proofLinks.map((link) => link.href)) {
        expect(href).toMatch(CASE_HREF);
      }
    }
  });

  it("evidence matrix routes point to valid reader anchors", () => {
    const matrix = getEvidenceMatrix("en");

    expect(matrix.length).toBeGreaterThanOrEqual(6);

    for (const capability of matrix) {
      expect(capability.label.length).toBeGreaterThan(4);
      expect(capability.summary.length).toBeGreaterThan(12);

      for (const [slug, proof] of Object.entries(capability.cases)) {
        if (!proof || proof.strength === "none") continue;

        expect(proof.href).toMatch(CASE_ANCHOR_HREF);
        const [, hrefSlug, anchor] = proof.href.match(/^\/projects\/([^#]+)#(.+)$/) ?? [];
        expect(hrefSlug).toBe(slug);

        const guide = getCaseReaderGuide(slug as ProjectEvidenceSlug, "en");
        expect(guide.sections.some((section) => section.id === anchor)).toBe(true);
      }
    }
  });

  it("case interview packs route to valid reader anchors", () => {
    for (const slug of projectEvidenceSlugs) {
      const pack = getCaseInterviewPack(slug, "en");
      const guide = getCaseReaderGuide(slug, "en");
      const anchors = new Set(guide.sections.map((section) => section.id));

      expect(pack.answers.length).toBeGreaterThanOrEqual(3);
      expect(pack.managerFollowUp.question.length).toBeGreaterThan(12);

      for (const answer of [...pack.answers, pack.managerFollowUp]) {
        expect(answer.question.length).toBeGreaterThan(12);
        expect(answer.answer.length).toBeGreaterThan(20);
        expect(answer.boundary.length).toBeGreaterThan(12);
        expect(answer.evidenceHref).toMatch(new RegExp(`^/projects/${slug}#`));

        const anchor = answer.evidenceHref.split("#")[1] as CaseReaderAnchorId;
        expect(anchors.has(anchor)).toBe(true);
      }
    }
  });

  it("hiring decision ids stay stable across locales", () => {
    expect(getHiringRoleFits("zh").map((role) => role.id)).toEqual(
      getHiringRoleFits("en").map((role) => role.id)
    );

    expect(getEvidenceMatrix("zh").map((capability) => capability.id)).toEqual(
      getEvidenceMatrix("en").map((capability) => capability.id)
    );

    for (const slug of projectEvidenceSlugs) {
      expect(getCaseInterviewPack(slug, "zh").answers.map((answer) => answer.id)).toEqual(
        getCaseInterviewPack(slug, "en").answers.map((answer) => answer.id)
      );
    }
  });

  it("provides interview decision room data", () => {
    const room = getInterviewDecisionRoom("en");

    expect(room.brief.headline.length).toBeGreaterThan(20);
    expect(room.brief.status.length).toBeGreaterThan(12);
    expect(room.brief.signals.length).toBeGreaterThanOrEqual(3);
    expect(room.brief.primaryAction.href).toBe("/contact");
    expect(room.brief.secondaryAction.href).toBe("/resume");

    // Four, not five, while Vigil is unlisted: its human-oversight entry is
    // kept in the data but not shown.
    expect(room.evidenceBrief.length).toBeGreaterThanOrEqual(4);
    expect(room.evidenceBrief.map((item) => item.caseSlug)).toEqual(
      expect.arrayContaining(["grassland", "onthebeat"])
    );
    expect(room.questionBank.length).toBeGreaterThanOrEqual(5);
    // Per-case limits live on each case page's outcome-limits block; /hire
    // carries only the general boundaries, so this floor is deliberately low.
    expect(room.boundaries.length).toBeGreaterThanOrEqual(3);
  });

  it("interview decision evidence links point to valid anchors", () => {
    const room = getInterviewDecisionRoom("en");

    for (const item of room.evidenceBrief) {
      expect(item.href).toMatch(new RegExp(`^/projects/${item.caseSlug}#`));

      const anchor = item.href.split("#")[1];
      const guide = getCaseReaderGuide(item.caseSlug, "en");
      expect(guide.sections.some((section) => section.id === anchor)).toBe(true);
    }

    for (const item of room.questionBank) {
      expect(item.href).toMatch(new RegExp(`^/projects/${item.caseSlug}#`));

      const anchor = item.href.split("#")[1];
      const guide = getCaseReaderGuide(item.caseSlug, "en");
      expect(guide.sections.some((section) => section.id === anchor)).toBe(true);
    }
  });

  it("interview decision structure stays stable while labels localize", () => {
    const en = getInterviewDecisionRoom("en");
    const zh = getInterviewDecisionRoom("zh");

    expect(zh.brief.signals).toHaveLength(en.brief.signals.length);
    expect(zh.brief.signals.map((signal) => signal.label)).not.toEqual(
      en.brief.signals.map((signal) => signal.label)
    );
    expect(zh.evidenceBrief.map((item) => item.id)).toEqual(
      en.evidenceBrief.map((item) => item.id)
    );
    expect(zh.questionBank.map((item) => item.id)).toEqual(
      en.questionBank.map((item) => item.id)
    );
    expect(zh.boundaries.map((item) => item.id)).toEqual(
      en.boundaries.map((item) => item.id)
    );
  });
});

// AI UX as a thread across the curated 6-case portfolio. Every entry
// names authorship and verification scope, and every cell stays supporting.
describe("AI and trust thread", () => {
  const THREAD_SLUGS: ProjectEvidenceSlug[] = ["walkie", "lamplight", "autofill", "onthebeat"];
  const ROLE_SLUGS: ProjectEvidenceSlug[] = ["walkie", "lamplight", "autofill", "onthebeat"];
  const slugOf = (href: string) => href.match(/^\/projects\/([^#/?]+)/)?.[1];

  it("backs the AI UX role with Walkie, Lamplight, Autofill and On The Beat, not unlisted cases", () => {
    for (const locale of ["en", "zh"] as const) {
      const role = getHiringRoleFits(locale).find((fit) => fit.id === "ai-ux");
      expect(role).toBeDefined();
      expect(role!.proofLinks.map((link) => slugOf(link.href))).toEqual(ROLE_SLUGS);
      expect(role!.bestCases).toEqual(ROLE_SLUGS);
      expect(JSON.stringify(role)).not.toMatch(/vigil|pricewise|fencepost|connect/i);
    }
  });

  it("exposes the AI UX and trust row with supporting evidence only", () => {
    for (const locale of ["en", "zh"] as const) {
      const row = getEvidenceMatrix(locale).find((capability) => capability.id === "ai-trust");
      expect(row).toBeDefined();
      expect(Object.keys(row!.cases).sort()).toEqual([...THREAD_SLUGS].sort());
      for (const cell of Object.values(row!.cases)) {
        expect(cell?.strength).toBe("supporting");
      }
    }
  });

  it("points the AI UX proof route at Walkie and the resume link at the thread", () => {
    for (const locale of ["en", "zh"] as const) {
      const route = getHiringConversion(locale).proofRoutes.find((item) => item.audience.startsWith("AI trust") || item.audience.startsWith("AI 信任"));
      expect(route?.href).toBe("/projects/autofill#decision-timeline");
      expect(getRoleFit(locale).proofLinks.map((link) => link.href)).toContain(AI_TRUST_THREAD_HREF);
      expect(getRolePacket("ai-ux", locale)?.thread?.href).toBe(AI_TRUST_THREAD_HREF);
    }
  });

  it("frames the AI and trust thread around legible uncertainty and human authority", () => {
    const en = getAiTrustThread("en");
    const zh = getAiTrustThread("zh");
    expect(en.intro).toMatch(/uncertainty|human authority/i);
    expect(en.intro).not.toMatch(/^I have not finished/i);
    expect(zh.intro).toMatch(/交互原则/);
    expect(zh.intro).not.toMatch(/^我还没有做完/);
  });

  it("states explicit scope boundaries in both locales without apologizing", () => {
    const en = getAiTrustThread("en");
    const zh = getAiTrustThread("zh");
    expect(en.limit).toMatch(/solo desk|synthetic|production traffic/i);
    expect(en.limit).not.toMatch(/^None of these is a finished/i);
    expect(zh.limit).toMatch(/日常运行|合成表单|生产流量/);
    expect(zh.limit).not.toMatch(/^这三条里没有一个是做完的/);
  });

  it("says who did the work in every entry and links each to a valid case anchor", () => {
    for (const locale of ["en", "zh"] as const) {
      const thread = getAiTrustThread(locale);
      expect(thread.entries.map((entry) => entry.slug)).toEqual(THREAD_SLUGS);

      for (const entry of thread.entries) {
        expect(entry.who.length).toBeGreaterThan(3);
        expect(entry.body.length).toBeGreaterThan(60);
        expect(entry.href).toMatch(CASE_ANCHOR_HREF);
        const [, slug, anchor] = entry.href.match(/^\/projects\/([^#]+)#(.+)$/) ?? [];
        expect(slug).toBe(entry.slug);
        const guide = getCaseReaderGuide(slug as ProjectEvidenceSlug, locale);
        expect(guide.sections.some((section) => section.id === anchor)).toBe(true);
      }
    }
  });

  it("keeps unlisted legacy cases out of the AI trust thread", () => {
    for (const locale of ["en", "zh"] as const) {
      const copy = JSON.stringify(getAiTrustThread(locale));
      expect(copy).not.toMatch(/\b(?:vigil|pricewise|hoop|fencepost|connect)\b/i);
    }
  });
});

// Three claims the live site made that their sources do not back (2026-09-28).
// UQ Connect's 71 files are research and testing records, not transcripts
// (canonical facts, UQ Connect research row). PriceWise's history was counted
// again on its working branch, so the count carries its date. Hoop Dream's
// production log prints its own style verdict: the generator script writes
// that line, and the only automated check reads the manifest and PNG
// headers. So no Hoop copy may present a style gate, and the review is manual.
describe("claims checked against their sources", () => {
  it("calls UQ Connect's 71 items records, not transcripts", () => {
    expect(getCaseNarrative("connect", "en").re.title).toBe("Three rounds, three fidelities, 71 research and testing records.");
    expect(getCaseNarrative("connect", "zh").re.title).toBe("三轮，三种保真度，71 份研究与测试记录。");
    for (const locale of ["en", "zh"] as const) {
      const connectNarrative = getCaseNarrative("connect", locale);
      const rounds = [connectNarrative.re.m1.b, connectNarrative.re.m2.b, connectNarrative.re.m3.b];
      const samples = getCaseDepth("connect", locale).evidence.map((item) => item.sample);
      expect([...rounds, ...samples].join(" ")).not.toMatch(/transcript|逐字稿/i);
    }
  });

  it("states PriceWise's commit count with the date it was counted", () => {
    const en = JSON.stringify([getCaseSummary("pricewise", "en"), getProjectEvidence("en")]);
    const zh = JSON.stringify([getCaseSummary("pricewise", "zh"), getProjectEvidence("zh")]);
    expect(en).toContain("96-commit history (to 13 August 2026)");
    expect(zh).toContain("96 个提交的完整记录（截至 2026 年 8 月 13 日）");
    expect(en + zh).not.toMatch(/93-commit|九十三/);
  });

  it("never presents a Hoop Dream style gate or an automated style verdict", () => {
    for (const locale of ["en", "zh"] as const) {
      const copy = JSON.stringify([
        getCaseCard("hoop", locale),
        getCaseNarrative("hoop", locale),
        getCaseSummary("hoop", locale),
        getCaseDepth("hoop", locale),
        getCaseInterviewScan("hoop", locale),
        getCaseInterviewPack("hoop", locale),
        getInterviewDecisionRoom(locale).evidenceBrief.filter((item) => item.caseSlug === "hoop"),
      ]);
      expect(copy).not.toMatch(/style gate|\bgating\b|runtime anchors|闸门|锚点/i);
      expect(copy).not.toMatch(/PASS/);
    }
  });

  it("states clearly that Hoop Dream style review stays manual", () => {
    const en = JSON.stringify([getCaseSummary("hoop", "en"), getCaseDepth("hoop", "en")]);
    const zh = JSON.stringify([getCaseSummary("hoop", "zh"), getCaseDepth("hoop", "zh")]);
    expect(en).toMatch(/by eye|manual/i);
    expect(zh).toMatch(/人眼|人工/);
  });
});

// Every piece of PriceWise copy a visitor or an interview can reach, as one
// string per locale.
const pricewiseCopy = (locale: "en" | "zh") => {
  return JSON.stringify([
    getCaseCard("pricewise", locale),
    getCaseNarrative("pricewise", locale),
    getCaseSummary("pricewise", locale),
    getCaseDepth("pricewise", locale),
    getCaseInterviewScan("pricewise", locale),
    getCaseInterviewPack("pricewise", locale),
    getProjectEvidence(locale).find((project) => project.slug === "pricewise"),
    getEvidenceMatrix(locale).map((capability) => capability.cases.pricewise),
    getHiringRoleFits(locale).flatMap((role) =>
      role.proofLinks.filter((link) => link.href.startsWith("/projects/pricewise"))
    ),
  ]);
};

// PriceWise's scope story, checked against its git history on 2026-09-28. The
// 5,884-line commit (78b36d1, 1 March 2026) was about a quarter social code,
// and nothing was cut afterwards: on 8 August the v1 routes moved to
// unversioned paths (d214c6e), and the social routes and models are still in
// use. "Looking back" is a judgement Lewis reached later, not his reason for
// stopping in March, and the repository records no reason.
describe("PriceWise scope story", () => {
  it("never says the scope was cut, or that the 5,884 lines were all social", () => {
    expect(pricewiseCopy("en")).not.toMatch(
      /\bcut\b|cutting|retract|orphan|shrank|scope reduction|24 routes|24 v1|lines of social/i
    );
    expect(pricewiseCopy("zh")).not.toMatch(/砍|收缩|孤儿|24 条|行社交功能/);
    // Model names, as the old copy used them for evidence of a cut. "household
    // groups" in lower case is a feature in the list and stays.
    for (const locale of ["en", "zh"] as const) {
      expect(pricewiseCopy(locale)).not.toMatch(/Friendship|Household/);
    }
  });

  it("states the stop-growing judgement only as hindsight, never as the reason", () => {
    const en = pricewiseCopy("en");
    const zh = pricewiseCopy("zh");
    expect(en).not.toMatch(/judgement was (right|correct)|was correct|lines (too )?late|deserve to keep|not worth expanding/i);
    expect(zh).not.toMatch(/判断是对的|晚了 5884|不值得继续扩张|不该继续扩张/);

    const enJudgements = en.match(/[^.]*kept growing/gi) ?? [];
    const zhJudgements = zh.match(/[^。]*不该继续长下去/g) ?? [];
    expect(enJudgements.length).toBeGreaterThan(0);
    expect(zhJudgements.length).toBeGreaterThan(0);
    for (const sentence of enJudgements) expect(sentence).toMatch(/looking back/i);
    for (const sentence of zhJudgements) expect(sentence).toMatch(/回头看/);

    for (const locale of ["en", "zh"] as const) {
      const reasons = getCaseDepth("pricewise", locale).iterations.map((iteration) => iteration.reason);
      expect(reasons.join(" ")).not.toMatch(/kept growing|expanding|不该继续|扩张/);
    }
  });
});

// PriceWise rows 14 to 16 of the canonical facts file (2026-09-28). Its current
// Vitest count is 311; 307 was the count before four receipt-format regression
// tests, so it may appear only as history ("passed build, type-check and 307
// tests"). The end-to-end count is not verified while its Playwright runner has
// a version conflict. It is a deployed prototype on demo data with zero
// registered users, never "publicly usable". Its defects are four classes.
describe("PriceWise canonical facts (rows 14, 15 and 16)", () => {
  it("never calls PriceWise publicly usable or gives an end-to-end count", () => {
    expect(pricewiseCopy("en")).not.toMatch(/publicly usable|14 end-to-end/i);
    expect(pricewiseCopy("zh")).not.toMatch(/公开可用|线上可用|14 个端到端/);
  });

  // The hero and the RSS/search summary once called it "a live grocery
  // comparison app" two lines above "deployed prototype, demo data". Prices are
  // simulated, so "live" read as live prices.
  it("calls it a prototype on demo data in the hero and the feed summary, never a live app", () => {
    const heroAndFeed = {
      en: [getCaseNarrative("pricewise", "en").hero.sub, PROJECT_OG_COPY.pricewise.oneLiner],
      zh: [getCaseNarrative("pricewise", "zh").hero.sub],
    };
    for (const line of heroAndFeed.en) {
      expect(line).toMatch(/prototype/);
      expect(line).toMatch(/demo data/);
      expect(line).not.toMatch(/\blive\b/i);
    }
    expect(heroAndFeed.zh[0]).toMatch(/原型/);
    expect(heroAndFeed.zh[0]).toMatch(/演示数据/);
    expect(pricewiseCopy("zh")).not.toMatch(/线上比价/);
  });

  it("gives 311 as the current test count, and keeps 307 for history only", () => {
    for (const locale of ["en", "zh"] as const) {
      // The case summary's evidence describes the app as it stands, so it
      // carries the current count (PriceWise is now unlisted from getProjectEvidence).
      const inventory = JSON.stringify([
        getCaseSummary("pricewise", locale).evidence,
      ]);
      expect(inventory).toContain("311");
      expect(inventory).not.toContain("307");
    }
  });

  it("counts four classes of defect, not five defects", () => {
    const enOu = getCaseNarrative("pricewise", "en").ou;
    const zhOu = getCaseNarrative("pricewise", "zh").ou;
    expect(enOu.m1.v).toBe("4");
    expect(zhOu.m1.v).toBe("4");
    expect(enOu.m1.label).toMatch(/^classes of defect /);
    expect(zhOu.m1.label).toMatch(/^类缺陷/);
    expect(pricewiseCopy("en")).not.toMatch(/\b(5|five) defects\b/i);
    expect(pricewiseCopy("zh")).not.toMatch(/[5五]\s*处缺陷/);
  });
});

describe("unlisted cases", () => {
  it("recognises a link into an unlisted case in either locale", () => {
    expect(UNLISTED_PROJECT_SLUGS).toContain("vigil");
    expect(LISTED_PROJECT_SLUGS).not.toContain("vigil");
    // 2026-11-20: Lewis took down the three cases with no recent work and put
    // up his newest builds in their place.
    for (const slug of ["spectra", "rules", "gapmapper", "fencepost", "connect", "hoop", "pricewise"]) {
      expect(UNLISTED_PROJECT_SLUGS).toContain(slug);
      expect(LISTED_PROJECT_SLUGS).not.toContain(slug);
    }
    for (const slug of ["grassland", "onthebeat", "lamplight", "autofill", "walkie", "maze"]) {
      expect(LISTED_PROJECT_SLUGS).toContain(slug);
    }

    expect(linksToUnlistedProject("/projects/vigil")).toBe(true);
    expect(linksToUnlistedProject("/zh/projects/vigil#outcome-limits")).toBe(true);
    expect(linksToUnlistedProject("/projects/vigil/prototype.html")).toBe(true);
    expect(linksToUnlistedProject("/projects/connect#decision-timeline")).toBe(true);
    expect(linksToUnlistedProject("/projects/walkie#decision-timeline")).toBe(false);
    expect(linksToUnlistedProject("/resume")).toBe(false);
  });

  it("keeps unlisted cases out of every proof list a visitor sees", () => {
    for (const locale of ["en", "zh"] as const) {
      const room = getInterviewDecisionRoom(locale);
      const hrefs = [
        ...getProjectEvidence(locale).map((project) => project.href),
        ...getHiringConversion(locale).proofRoutes.map((route) => route.href),
        ...getRoleFit(locale).proofLinks.map((link) => link.href),
        ...getHiringRoleFits(locale).flatMap((role) => role.proofLinks.map((link) => link.href)),
        ...room.evidenceBrief.map((item) => item.href),
        ...room.questionBank.map((item) => item.href),
        ...room.boundaries.flatMap((item) => (item.href ? [item.href] : [])),
        ...getAiTrustThread(locale).entries.map((entry) => entry.href),
        ...getEvidenceMatrix(locale).flatMap((capability) =>
          Object.values(capability.cases).flatMap((cell) => (cell ? [cell.href] : []))
        ),
      ];

      expect(hrefs.length).toBeGreaterThan(0);
      expect(hrefs.filter(linksToUnlistedProject)).toEqual([]);

      for (const role of getHiringRoleFits(locale)) {
        expect(role.bestCases.filter(isUnlistedProject)).toEqual([]);
      }
      for (const capability of getEvidenceMatrix(locale)) {
        expect(Object.keys(capability.cases).filter(isUnlistedProject)).toEqual([]);
      }
    }
  });

  it("leaves no role or capability standing with nothing behind it", () => {
    for (const locale of ["en", "zh"] as const) {
      for (const role of getHiringRoleFits(locale)) {
        expect(role.proofLinks.length).toBeGreaterThan(0);
      }
      for (const capability of getEvidenceMatrix(locale)) {
        const shown = Object.values(capability.cases).filter(
          (cell) => cell !== undefined && cell.strength !== "none"
        );
        expect(shown.length).toBeGreaterThan(0);
      }
    }
  });

  it("keeps the AI UX role packet off the unlisted case", () => {
    for (const locale of ["en", "zh"] as const) {
      const packet = getRolePacket("ai-ux", locale);
      expect(packet).toBeDefined();
      expect(packet!.strongestCases.filter(isUnlistedProject)).toEqual([]);
      expect(packet!.proofClaims.map((claim) => claim.strongestAnchor).filter(linksToUnlistedProject)).toEqual([]);
      expect(packet!.interviewQuestions.map((answer) => answer.evidenceHref).filter(linksToUnlistedProject)).toEqual([]);
    }
  });

  it("still has the full case data for an unlisted case", () => {
    // Unlisting hides a case; it does not delete it. The page is still built
    // from these, so they have to stay complete.
    for (const slug of UNLISTED_PROJECT_SLUGS) {
      expect(getCaseSummary(slug, "en").challenge.length).toBeGreaterThan(20);
      expect(getCaseDepth(slug, "zh").decisions.length).toBeGreaterThanOrEqual(3);
      expect(getCaseInterviewPack(slug, "en").answers.length).toBeGreaterThanOrEqual(3);
    }
  });
});
