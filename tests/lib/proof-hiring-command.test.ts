import { describe, expect, it } from "vitest";
import { getHiringCommandCenter, hiringRoleIds } from "@/lib/proof";

const commandSequenceRoutes = [
  "/hire/review",
  "/hire/compare",
  "/hire/interview",
  "/hire/scorecard",
  "/hire/shortlist",
  "/hire/debrief",
  "/hire/decision",
  "/hire/offer",
  "/hire/onboarding",
  "/hire/kickoff",
  "/hire/impact",
  "/hire/growth",
  "/hire/retention",
  "/hire/partnership",
] as const;

describe("hiring command center", () => {
  it("summarizes the full hiring proof sequence", () => {
    const pack = getHiringCommandCenter("en");

    expect(pack.hero.headline).toContain("Command");
    expect(pack.commandRoute).toBe("/hire/command");
    expect(pack.partnershipRoute).toBe("/hire/partnership");
    expect(pack.retentionRoute).toBe("/hire/retention");
    expect(pack.growthRoute).toBe("/hire/growth");
    expect(pack.impactRoute).toBe("/hire/impact");
    expect(pack.roles.map((role) => role.id)).toEqual(hiringRoleIds);
    expect(pack.summary).toHaveLength(4);
    expect(pack.sequence.map((step) => step.route)).toEqual(commandSequenceRoutes);
    expect(pack.checkpoints).toHaveLength(4);
  });

  it("includes complete role command routes and proof anchors", () => {
    const pack = getHiringCommandCenter("en");

    for (const role of pack.roles) {
      expect(role.roleRoute).toBe(`/hire/${role.id}`);
      expect(role.packetRoute).toBe(`/hire/${role.id}/packet`);
      expect(role.followThroughRoute).toBe(`/hire/${role.id}/next`);
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
      expect(role.contactRoute).toBe(`/contact?role=${role.id}&intent=command`);
      expect(role.proof.href).toContain("#");
      expect(role.proof.boundary).toBeTruthy();
      expect(role.currentSignal).toBeTruthy();
      expect(role.decisionFocus).toBeTruthy();
      expect(role.openingMove).toBeTruthy();
      expect(role.proofGate).toBeTruthy();
      expect(role.managerRisk).toBeTruthy();
      expect(role.teamHandoff).toBeTruthy();
      expect(role.followUpRitual).toBeTruthy();
      expect(role.escalationTrigger).toBeTruthy();
      expect(role.nextCommandAction).toBeTruthy();
    }
  });

  it("keeps Chinese command-center content structurally aligned", () => {
    const pack = getHiringCommandCenter("zh");

    expect(pack.hero.headline).toContain("Command");
    expect(pack.roles).toHaveLength(4);
    expect(pack.summary).toHaveLength(4);
    expect(pack.sequence.map((step) => step.route)).toEqual(commandSequenceRoutes);
    expect(pack.checkpoints).toHaveLength(4);
    expect(pack.close.primaryAction.href).toBe("/contact");
  });
});
