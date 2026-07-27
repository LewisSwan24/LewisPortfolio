import { describe, expect, it } from "vitest";
import { getHiringActionBoard, hiringRoleIds } from "@/lib/proof";

const actionSharedRoutes = [
  "/hire/action",
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
  /(Readiness signal|Briefing signal|Partnership signal|Retention signal|Next briefing action|Next partnership action|Next retention question|Stakeholder context|Follow-up owner|Manager touchpoint|Handoff note|Operating agreement|Long-term fit|90-day outcome|First-month evidence|First-30-days outcome):/i;

describe("hiring action board", () => {
  it("summarizes role actions after readiness decisions", () => {
    const pack = getHiringActionBoard("en");

    expect(pack.hero.headline).toContain("Action");
    expect(pack.actionRoute).toBe("/hire/action");
    expect(pack.readinessRoute).toBe("/hire/readiness");
    expect(pack.briefingRoute).toBe("/hire/briefing");
    expect(pack.commandRoute).toBe("/hire/command");
    expect(pack.partnershipRoute).toBe("/hire/partnership");
    expect(pack.retentionRoute).toBe("/hire/retention");
    expect(pack.growthRoute).toBe("/hire/growth");
    expect(pack.impactRoute).toBe("/hire/impact");
    expect(pack.roles.map((role) => role.id)).toEqual(hiringRoleIds);
    expect(pack.summary).toHaveLength(4);
    expect(pack.sequence).toHaveLength(5);
    expect(pack.artifacts).toHaveLength(4);
  });

  it("keeps every action step actionable", () => {
    const pack = getHiringActionBoard("en");

    for (const step of pack.sequence) {
      expect(step.owner).toBeTruthy();
      expect(step.action).toBeTruthy();
      expect(step.proofFocus).toBeTruthy();
      expect(step.successSignal).toBeTruthy();
      expect(actionSharedRoutes).toContain(step.route);
    }
  });

  it("includes complete role action routes and proof anchors", () => {
    const pack = getHiringActionBoard("en");

    for (const role of pack.roles) {
      expect(role.roleRoute).toBe(`/hire/${role.id}`);
      expect(role.packetRoute).toBe(`/hire/${role.id}/packet`);
      expect(role.followThroughRoute).toBe(`/hire/${role.id}/next`);
      expect(role.actionRoute).toBe("/hire/action");
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
      expect(role.contactRoute).toBe(`/contact?role=${role.id}&intent=action`);
      expect(role.proof.href).toContain("#");
      expect(role.proof.boundary).toBeTruthy();
      expect(role.readinessScore).toMatch(/Ready|Validate|Monitor/i);
      expect(role.actionState).toBeTruthy();
      expect(role.actionOwner).toBeTruthy();
      expect(role.firstAction).toBeTruthy();
      expect(role.proofToOpen).toBeTruthy();
      expect(actionSharedRoutes).toContain(role.routeToOpen);
      expect(role.recruiterAction).toBeTruthy();
      expect(role.managerAction).toBeTruthy();
      expect(role.panelAction).toBeTruthy();
      expect(role.onboardingAction).toBeTruthy();
      expect(role.fallbackAction).toBeTruthy();
      expect(role.successSignal).toBeTruthy();
      expect(role.blockingRisk).toBeTruthy();
      expect(role.nextAction).toBeTruthy();
    }
  });

  it("keeps action lane copy free from inherited stage labels", () => {
    const pack = getHiringActionBoard("en");

    for (const role of pack.roles) {
      expect(role.actionState).not.toMatch(inheritedLabelPattern);
      expect(role.actionOwner).not.toMatch(inheritedLabelPattern);
      expect(role.firstAction).not.toMatch(inheritedLabelPattern);
      expect(role.proofToOpen).not.toMatch(inheritedLabelPattern);
      expect(role.recruiterAction).not.toMatch(inheritedLabelPattern);
      expect(role.managerAction).not.toMatch(inheritedLabelPattern);
      expect(role.panelAction).not.toMatch(inheritedLabelPattern);
      expect(role.onboardingAction).not.toMatch(inheritedLabelPattern);
      expect(role.fallbackAction).not.toMatch(inheritedLabelPattern);
      expect(role.successSignal).not.toMatch(inheritedLabelPattern);
      expect(role.blockingRisk).not.toMatch(inheritedLabelPattern);
      expect(role.nextAction).not.toMatch(inheritedLabelPattern);
    }
  });

  it("keeps Chinese action-board content structurally aligned", () => {
    const pack = getHiringActionBoard("zh");

    expect(pack.hero.headline).toContain("行动");
    expect(pack.roles).toHaveLength(4);
    expect(pack.summary).toHaveLength(4);
    expect(pack.sequence).toHaveLength(5);
    expect(pack.artifacts).toHaveLength(4);
    expect(pack.close.primaryAction.href).toBe("/contact");
  });
});
