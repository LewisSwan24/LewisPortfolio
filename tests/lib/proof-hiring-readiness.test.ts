import { describe, expect, it } from "vitest";
import { getHiringReadinessGate, hiringRoleIds } from "@/lib/proof";

const readinessSharedRoutes = [
  "/hire/readiness",
  "/hire/briefing",
  "/hire/command",
  "/hire/partnership",
  "/hire/retention",
  "/hire/growth",
  "/hire/impact",
  "/hire/kickoff",
  "/hire/onboarding",
  "/hire/offer",
  "/hire/decision",
  "/hire/debrief",
  "/hire/shortlist",
  "/hire/scorecard",
  "/hire/interview",
  "/hire/compare",
  "/hire/review",
] as const;

const inheritedLabelPattern =
  /(Briefing signal|Partnership signal|Retention signal|Next briefing action|Next partnership action|Next retention question|Stakeholder context|Follow-up owner|Manager touchpoint|Handoff note|Operating agreement|Long-term fit|90-day outcome|First-month evidence|First-30-days outcome):/i;

describe("hiring readiness gate", () => {
  it("summarizes role readiness gates for hiring decisions", () => {
    const pack = getHiringReadinessGate("en");

    expect(pack.hero.headline).toContain("Readiness");
    expect(pack.readinessRoute).toBe("/hire/readiness");
    expect(pack.briefingRoute).toBe("/hire/briefing");
    expect(pack.commandRoute).toBe("/hire/command");
    expect(pack.partnershipRoute).toBe("/hire/partnership");
    expect(pack.retentionRoute).toBe("/hire/retention");
    expect(pack.growthRoute).toBe("/hire/growth");
    expect(pack.impactRoute).toBe("/hire/impact");
    expect(pack.roles.map((role) => role.id)).toEqual(hiringRoleIds);
    expect(pack.summary).toHaveLength(4);
    expect(pack.gates).toHaveLength(4);
    expect(pack.artifacts).toHaveLength(4);
  });

  it("keeps every readiness gate actionable", () => {
    const pack = getHiringReadinessGate("en");

    for (const gate of pack.gates) {
      expect(gate.signal).toBeTruthy();
      expect(gate.passCondition).toBeTruthy();
      expect(gate.failureMode).toBeTruthy();
      expect(gate.nextRoute).toBeTruthy();
      expect(readinessSharedRoutes).toContain(gate.route);
    }
  });

  it("includes complete role readiness routes and proof anchors", () => {
    const pack = getHiringReadinessGate("en");

    for (const role of pack.roles) {
      expect(role.roleRoute).toBe(`/hire/${role.id}`);
      expect(role.packetRoute).toBe(`/hire/${role.id}/packet`);
      expect(role.followThroughRoute).toBe(`/hire/${role.id}/next`);
      expect(role.readinessRoute).toBe("/hire/readiness");
      expect(role.briefingRoute).toBe("/hire/briefing");
      expect(role.commandRoute).toBe("/hire/command");
      expect(role.partnershipRoute).toBe("/hire/partnership");
      expect(role.retentionRoute).toBe("/hire/retention");
      expect(role.growthRoute).toBe("/hire/growth");
      expect(role.impactRoute).toBe("/hire/impact");
      expect(role.kickoffRoute).toBe("/hire/kickoff");
      expect(role.onboardingRoute).toBe("/hire/onboarding");
      expect(role.offerRoute).toBe("/hire/offer");
      expect(role.decisionRoute).toBe("/hire/decision");
      expect(role.debriefRoute).toBe("/hire/debrief");
      expect(role.shortlistRoute).toBe("/hire/shortlist");
      expect(role.scorecardRoute).toBe("/hire/scorecard");
      expect(role.interviewRoute).toBe("/hire/interview");
      expect(role.compareRoute).toBe("/hire/compare");
      expect(role.reviewRoute).toBe("/hire/review");
      expect(role.contactRoute).toBe(`/contact?role=${role.id}&intent=readiness`);
      expect(role.proof.href).toContain("#");
      expect(role.proof.boundary).toBeTruthy();
      expect(role.readinessSignal).toBeTruthy();
      expect(role.readinessScore).toMatch(/Ready|Validate|Monitor/i);
      expect(role.provenEvidence).toBeTruthy();
      expect(role.validationGap).toBeTruthy();
      expect(role.stakeholderOwner).toBeTruthy();
      expect(role.decisionGate).toBeTruthy();
      expect(role.recommendedRoute).toBeTruthy();
      expect(role.recruiterNote).toBeTruthy();
      expect(role.interviewNote).toBeTruthy();
      expect(role.onboardingNote).toBeTruthy();
      expect(role.nextReadinessAction).toBeTruthy();
    }
  });

  it("keeps readiness lane copy free from inherited stage labels", () => {
    const pack = getHiringReadinessGate("en");

    for (const role of pack.roles) {
      expect(role.readinessSignal).not.toMatch(inheritedLabelPattern);
      expect(role.provenEvidence).not.toMatch(inheritedLabelPattern);
      expect(role.validationGap).not.toMatch(inheritedLabelPattern);
      expect(role.stakeholderOwner).not.toMatch(inheritedLabelPattern);
      expect(role.decisionGate).not.toMatch(inheritedLabelPattern);
      expect(role.recruiterNote).not.toMatch(inheritedLabelPattern);
      expect(role.interviewNote).not.toMatch(inheritedLabelPattern);
      expect(role.onboardingNote).not.toMatch(inheritedLabelPattern);
      expect(role.nextReadinessAction).not.toMatch(inheritedLabelPattern);
    }
  });

  it("keeps Chinese readiness-gate content structurally aligned", () => {
    const pack = getHiringReadinessGate("zh");

    expect(pack.hero.headline).toContain("Readiness");
    expect(pack.roles).toHaveLength(4);
    expect(pack.summary).toHaveLength(4);
    expect(pack.gates).toHaveLength(4);
    expect(pack.artifacts).toHaveLength(4);
    expect(pack.close.primaryAction.href).toBe("/contact");
  });
});
