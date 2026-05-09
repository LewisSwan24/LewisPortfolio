import { describe, expect, it } from "vitest";
import {
  conversionEventAttrs,
  getApplicationPacket,
  getApplicationPackets,
  getCaseReaderGuide,
  getProofUiLabels,
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
        expect(packet.route).toBe(`/hire/${packet.id}`);
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
        expect(packet.route).toBe(`/hire/${packet.id}/packet`);
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

  it("emits stable proof event attributes", () => {
    expect(
      proofAnchorEventAttrs({
        source: "hire-role",
        role: "ai-ux",
        caseSlug: "ai",
        anchorId: "decision-timeline",
      })
    ).toEqual({
      "data-proof-event": "proof_anchor_click",
      "data-proof-source": "hire-role",
      "data-proof-role": "ai-ux",
      "data-proof-case": "ai",
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
