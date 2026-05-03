import { describe, expect, it } from "vitest";
import {
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
  type ProjectEvidenceSlug,
  projectEvidenceSlugs,
} from "@/lib/portfolio-proof";

describe("portfolio proof content", () => {
  it("covers every portfolio project with evidence metadata", () => {
    const projects = getProjectEvidence("en");

    expect(projects).toHaveLength(4);
    expect(projects.map((project) => project.slug)).toEqual(projectEvidenceSlugs);

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
      expect(route.href).toMatch(/^\/projects\/(connect|spectra|ai|circles)(#.+)?$/);
      expect(route.audience.length).toBeGreaterThan(8);
      expect(route.claim.length).toBeGreaterThan(12);
      expect(route.evidence.length).toBeGreaterThan(12);
    }
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
      expect(route.href).toMatch(/^\/projects\/(connect|spectra|ai|circles)#/);

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

    expect(ids).toEqual(["ux-product", "ux-research", "ai-ux", "accessibility"]);

    for (const role of roleFits) {
      expect(role.label.length).toBeGreaterThan(4);
      expect(role.fit.length).toBeGreaterThan(20);
      expect(role.proofLinks.length).toBeGreaterThanOrEqual(2);
      expect(role.bestCases.length).toBeGreaterThanOrEqual(1);
      expect(role.risk.length).toBeGreaterThan(12);
      expect(role.interviewAngle.length).toBeGreaterThan(12);

      for (const href of role.proofLinks.map((link) => link.href)) {
        expect(href).toMatch(/^\/projects\/(connect|spectra|ai|circles)(#.+)?$/);
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

        expect(proof.href).toMatch(/^\/projects\/(connect|spectra|ai|circles)#/);
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

        const anchor = answer.evidenceHref.split("#")[1];
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

    expect(room.evidenceBrief.length).toBeGreaterThanOrEqual(5);
    expect(room.questionBank.length).toBeGreaterThanOrEqual(5);
    expect(room.boundaries.length).toBeGreaterThanOrEqual(4);
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

  it("interview decision ids stay stable across locales", () => {
    const en = getInterviewDecisionRoom("en");
    const zh = getInterviewDecisionRoom("zh");

    expect(zh.brief.signals.map((signal) => signal.label)).toEqual(
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
