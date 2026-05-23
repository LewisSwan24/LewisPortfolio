import { describe, expect, it } from "vitest";
import { getHiringBriefingRoom, hiringRoleIds } from "@/lib/proof";

const briefingSharedRoutes = [
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

describe("hiring briefing room", () => {
  it("summarizes stakeholder-ready hiring briefings", () => {
    const pack = getHiringBriefingRoom("en");

    expect(pack.hero.headline).toContain("Briefing");
    expect(pack.briefingRoute).toBe("/hire/briefing");
    expect(pack.commandRoute).toBe("/hire/command");
    expect(pack.partnershipRoute).toBe("/hire/partnership");
    expect(pack.retentionRoute).toBe("/hire/retention");
    expect(pack.growthRoute).toBe("/hire/growth");
    expect(pack.impactRoute).toBe("/hire/impact");
    expect(pack.roles.map((role) => role.id)).toEqual(hiringRoleIds);
    expect(pack.summary).toHaveLength(4);
    expect(pack.stakeholders).toHaveLength(5);
    expect(pack.artifacts).toHaveLength(4);
  });

  it("keeps every stakeholder brief actionable", () => {
    const pack = getHiringBriefingRoom("en");

    for (const stakeholder of pack.stakeholders) {
      expect(stakeholder.goal).toBeTruthy();
      expect(stakeholder.readingFocus).toBeTruthy();
      expect(stakeholder.questionToAsk).toBeTruthy();
      expect(stakeholder.decisionToMake).toBeTruthy();
      expect(briefingSharedRoutes).toContain(stakeholder.route);
    }
  });

  it("includes complete role briefing routes and proof anchors", () => {
    const pack = getHiringBriefingRoom("en");

    for (const role of pack.roles) {
      expect(role.roleRoute).toBe(`/hire/${role.id}`);
      expect(role.packetRoute).toBe(`/hire/${role.id}/packet`);
      expect(role.followThroughRoute).toBe(`/hire/${role.id}/next`);
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
      expect(role.contactRoute).toBe(`/contact?role=${role.id}&intent=briefing`);
      expect(role.proof.href).toContain("#");
      expect(role.proof.boundary).toBeTruthy();
      expect(role.briefingSignal).toBeTruthy();
      expect(role.stakeholderContext).toBeTruthy();
      expect(role.openingContext).toBeTruthy();
      expect(role.evidenceToInspect).toBeTruthy();
      expect(role.decisionQuestion).toBeTruthy();
      expect(role.riskToResolve).toBeTruthy();
      expect(role.handoffNote).toBeTruthy();
      expect(role.followUpOwner).toBeTruthy();
      expect(role.nextBriefingAction).toBeTruthy();
    }
  });

  it("keeps Chinese briefing content structurally aligned", () => {
    const pack = getHiringBriefingRoom("zh");

    expect(pack.hero.headline).toContain("Briefing");
    expect(pack.roles).toHaveLength(4);
    expect(pack.summary).toHaveLength(4);
    expect(pack.stakeholders).toHaveLength(5);
    expect(pack.artifacts).toHaveLength(4);
    expect(pack.close.primaryAction.href).toBe("/contact");
  });
});
