import { describe, expect, it } from "vitest";
import {
  buildFollowThroughMailto,
  conversionEventAttrs,
  getApplicationPacket,
  getApplicationPackets,
  getCaseReaderGuide,
  getFollowThroughBrief,
  getFollowThroughBriefs,
  getProofUiLabels,
  getProofMaintenanceEntries,
  getProofMaintenanceReport,
  getRolePackets,
  hiringRoleIds,
  proofAnchorEventAttrs,
  type ProjectEvidenceSlug,
  type ProofLocale,
} from "@/lib/proof";

const locales: ProofLocale[] = ["en", "zh"];

describe("proof registry", () => {
  it("has stable role ids", () => {
    expect(hiringRoleIds).toEqual([
      "ux-product",
      "ux-research",
      "ai-ux",
      "accessibility",
    ]);
  });

  it("has one role packet for every role and locale", () => {
    for (const locale of locales) {
      const packets = getRolePackets(locale);

      expect(packets.map((packet) => packet.id)).toEqual(hiringRoleIds);
      for (const packet of packets) {
        expect(packet.route).toBe(`/hire?role=${packet.id}`);
        expect(packet.proofClaims.length).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("role packet anchors point to valid case reader sections", () => {
    for (const locale of locales) {
      for (const packet of getRolePackets(locale)) {
        for (const claim of packet.proofClaims) {
          const [, slug, anchor] =
            claim.strongestAnchor.match(/^\/projects\/([^#]+)#(.+)$/) ?? [];

          expect(slug).toBeTruthy();
          expect(anchor).toBeTruthy();

          const guide = getCaseReaderGuide(slug as ProjectEvidenceSlug, locale);
          expect(guide.sections.some((section) => section.id === anchor)).toBe(true);
          expect(claim.boundary.length).toBeGreaterThan(12);
          expect(claim.nextValidation.length).toBeGreaterThan(12);
        }
      }
    }
  });

  it("role packet ids are stable across locales", () => {
    expect(getRolePackets("zh").map((packet) => packet.id)).toEqual(
      getRolePackets("en").map((packet) => packet.id)
    );
  });

  it("role packet labels are locale-specific while ids stay stable", () => {
    const en = getRolePackets("en");
    const zh = getRolePackets("zh");

    expect(zh.map((packet) => packet.id)).toEqual(en.map((packet) => packet.id));
    expect(zh.some((packet) => /[\u4e00-\u9fff]/.test(packet.fitThesis))).toBe(true);
    expect(getProofUiLabels("zh").bestProof).toMatch(/[\u4e00-\u9fff]/);
  });

  it("role packet claim ids are unique per locale", () => {
    for (const locale of locales) {
      const ids = getRolePackets(locale).flatMap((packet) =>
        packet.proofClaims.map((claim) => claim.id)
      );

      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("has one application packet for every role and locale", () => {
    for (const locale of locales) {
      const packets = getApplicationPackets(locale);

      expect(packets.map((packet) => packet.id)).toEqual(hiringRoleIds);
      for (const packet of packets) {
        expect(packet.route).toBe(`/contact?role=${packet.id}`);
        expect(packet.proof.length).toBeGreaterThanOrEqual(2);
        expect(packet.interviewFocus.length).toBeGreaterThanOrEqual(2);
        expect(packet.boundaries.length).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("application packet anchors point to valid case reader sections", () => {
    for (const locale of locales) {
      for (const packet of getApplicationPackets(locale)) {
        for (const proof of packet.proof) {
          const [, slug, anchor] =
            proof.href.match(/^\/projects\/([^#]+)#(.+)$/) ?? [];

          expect(slug).toBeTruthy();
          expect(anchor).toBeTruthy();

          const guide = getCaseReaderGuide(slug as ProjectEvidenceSlug, locale);
          expect(guide.sections.some((section) => section.id === anchor)).toBe(true);
        }
      }
    }
  });

  it("application packet lookup returns undefined for invalid roles", () => {
    expect(getApplicationPacket("not-a-role", "en")).toBeUndefined();
  });

  it("has one follow-through brief for every role and locale", () => {
    for (const locale of locales) {
      const briefs = getFollowThroughBriefs(locale);

      expect(briefs.map((brief) => brief.id)).toEqual(hiringRoleIds);
      for (const brief of briefs) {
        expect(brief.route).toBe(`/contact?role=${brief.id}&intent=interview`);
        expect(brief.emailSubject.length).toBeGreaterThan(8);
        expect(brief.emailBody.length).toBeGreaterThan(40);
        expect(brief.preCallEvidence.length).toBeGreaterThanOrEqual(2);
        expect(brief.meetingAgenda.length).toBeGreaterThanOrEqual(3);
        expect(brief.decisionQuestions.length).toBeGreaterThanOrEqual(2);
        expect(brief.boundaries.length).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("follow-through evidence anchors point to valid case reader sections", () => {
    for (const locale of locales) {
      for (const brief of getFollowThroughBriefs(locale)) {
        for (const evidence of brief.preCallEvidence) {
          const [, slug, anchor] =
            evidence.href.match(/^\/projects\/([^#]+)#(.+)$/) ?? [];

          expect(slug).toBeTruthy();
          expect(anchor).toBeTruthy();

          const guide = getCaseReaderGuide(slug as ProjectEvidenceSlug, locale);
          expect(guide.sections.some((section) => section.id === anchor)).toBe(true);
        }
      }
    }
  });

  it("follow-through lookup returns undefined for invalid roles", () => {
    expect(getFollowThroughBrief("not-a-role", "en")).toBeUndefined();
  });

  it("builds mailto links with encoded subject and body", () => {
    const brief = getFollowThroughBrief("ai-ux", "en");

    if (!brief) throw new Error("Missing ai-ux follow-through brief");

    const href = buildFollowThroughMailto("test@example.com", brief);

    expect(href).toContain("mailto:test@example.com?");
    expect(href).toContain("subject=");
    expect(href).toContain("body=");
  });

  it("has maintenance entries for every role claim", () => {
    const entries = getProofMaintenanceEntries();
    const roleClaimKeys = getRolePackets("en").flatMap((packet) =>
      packet.proofClaims.map((claim) => `${packet.id}:${claim.id}`)
    );
    const maintainedClaimKeys = entries
      .filter((entry) => entry.surface === "role-room")
      .map((entry) => `${entry.roleId}:${entry.claimId}`);

    expect(maintainedClaimKeys).toHaveLength(roleClaimKeys.length);
    expect(new Set(maintainedClaimKeys)).toEqual(new Set(roleClaimKeys));
  });

  it("maintenance entries use ISO review dates", () => {
    for (const entry of getProofMaintenanceEntries()) {
      expect(entry.reviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(entry.nextReviewAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(["fresh", "watch", "stale"]).toContain(entry.status);
    }
  });

  it("maintenance entries cover application, follow-through, review, compare, agenda, scorecard, shortlist, debrief, decision, offer, onboarding, kickoff, impact, growth, retention, partnership, command, briefing, readiness, action, and tracker routes", () => {
    const hrefs = new Set(getProofMaintenanceEntries().map((entry) => entry.href));

    for (const packet of getApplicationPackets("en")) {
      expect(hrefs.has(packet.route)).toBe(true);
    }

    for (const brief of getFollowThroughBriefs("en")) {
      expect(hrefs.has(brief.route)).toBe(true);
    }

    for (const view of [
      "review",
      "compare",
      "interview",
      "scorecard",
      "shortlist",
      "debrief",
      "decision",
      "offer",
      "onboarding",
      "kickoff",
      "impact",
      "growth",
      "retention",
      "partnership",
      "command",
      "briefing",
      "readiness",
      "action",
      "tracker",
    ] as const) {
      expect(hrefs.has(`/hire?view=${view}`)).toBe(true);
    }
  });

  it("maintenance report exposes status buckets and stays fresh at baseline", () => {
    const entries = getProofMaintenanceEntries();
    const baselineReport = getProofMaintenanceReport("2026-11-21");

    expect(baselineReport.generatedAt).toBe("2026-11-21");
    expect(baselineReport.entries).toHaveLength(entries.length);
    expect(baselineReport.fresh).toHaveLength(entries.length);
    expect(baselineReport.stale).toEqual([]);
    expect(baselineReport.missingReview).toEqual([]);
  });

  it("maintenance report marks overdue entries stale", () => {
    const report = getProofMaintenanceReport("2027-03-01");

    expect(report.stale.length).toBeGreaterThan(0);
    expect(report.stale.every((entry) => entry.status === "stale")).toBe(true);
  });

  it("emits stable proof event attributes", () => {
    expect(
      proofAnchorEventAttrs({
        source: "hire-role",
        role: "ai-ux",
        caseSlug: "walkie",
        anchorId: "decision-timeline",
      })
    ).toEqual({
      "data-proof-event": "proof_anchor_click",
      "data-proof-source": "hire-role",
      "data-proof-role": "ai-ux",
      "data-proof-case": "walkie",
      "data-proof-anchor": "decision-timeline",
    });

    expect(
      conversionEventAttrs({
        source: "hire-role",
        role: "ux-research",
        action: "contact",
      })["data-proof-event"]
    ).toBe("conversion_action_click");
  });
});
