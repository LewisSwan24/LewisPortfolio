import { describe, expect, it } from "vitest";
import { getHiringFollowUpTracker, hiringRoleIds } from "@/lib/proof";

const trackerSharedRoutes = [
  "/hire/tracker",
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
  /(Action state|Action owner|First action|Proof to open|Recruiter action|Manager action|Panel action|Onboarding action|Fallback action|Success signal|Blocking risk|Next action|Readiness signal|Briefing signal|Validation gap):/i;

describe("hiring follow-up tracker", () => {
  it("summarizes follow-up tracking after action lanes", () => {
    const pack = getHiringFollowUpTracker("en");

    expect(pack.hero.headline).toContain("Follow-up");
    expect(pack.trackerRoute).toBe("/hire/tracker");
    expect(pack.actionRoute).toBe("/hire/action");
    expect(pack.readinessRoute).toBe("/hire/readiness");
    expect(pack.briefingRoute).toBe("/hire/briefing");
    expect(pack.commandRoute).toBe("/hire/command");
    expect(pack.partnershipRoute).toBe("/hire/partnership");
    expect(pack.roles.map((role) => role.id)).toEqual(hiringRoleIds);
    expect(pack.summary).toHaveLength(4);
    expect(pack.stages).toHaveLength(5);
    expect(pack.artifacts).toHaveLength(4);
  });

  it("keeps every tracker stage actionable", () => {
    const pack = getHiringFollowUpTracker("en");

    for (const stage of pack.stages) {
      expect(stage.owner).toBeTruthy();
      expect(stage.followUpAction).toBeTruthy();
      expect(stage.trackingSignal).toBeTruthy();
      expect(stage.closeoutRule).toBeTruthy();
      expect(trackerSharedRoutes).toContain(stage.route);
    }
  });

  it("includes complete role tracker routes, owners, and proof anchors", () => {
    const pack = getHiringFollowUpTracker("en");

    for (const role of pack.roles) {
      expect(role.roleRoute).toBe(`/hire/${role.id}`);
      expect(role.packetRoute).toBe(`/hire/${role.id}/packet`);
      expect(role.followThroughRoute).toBe(`/hire/${role.id}/next`);
      expect(role.trackerRoute).toBe("/hire/tracker");
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
      expect(role.contactRoute).toBe(`/contact?role=${role.id}&intent=tracker`);
      expect(role.proof.href).toContain("#");
      expect(role.proof.boundary).toBeTruthy();
      expect(role.trackerStatus).toMatch(/Ready|Waiting|Blocked/i);
      expect(role.followUpOwner).toBeTruthy();
      expect(role.dueWindow).toBeTruthy();
      expect(role.evidenceDependency).toBeTruthy();
      expect(role.nextFollowUp).toBeTruthy();
      expect(role.escalationPath).toBeTruthy();
      expect(role.closeoutSignal).toBeTruthy();
      expect(role.followUpRisk).toBeTruthy();
      expect(trackerSharedRoutes).toContain(role.routeToReview);
    }
  });

  it("keeps tracker lane copy free from inherited stage labels", () => {
    const pack = getHiringFollowUpTracker("en");

    for (const role of pack.roles) {
      expect(role.trackerStatusDetail).not.toMatch(inheritedLabelPattern);
      expect(role.followUpOwner).not.toMatch(inheritedLabelPattern);
      expect(role.dueWindow).not.toMatch(inheritedLabelPattern);
      expect(role.evidenceDependency).not.toMatch(inheritedLabelPattern);
      expect(role.nextFollowUp).not.toMatch(inheritedLabelPattern);
      expect(role.escalationPath).not.toMatch(inheritedLabelPattern);
      expect(role.closeoutSignal).not.toMatch(inheritedLabelPattern);
      expect(role.followUpRisk).not.toMatch(inheritedLabelPattern);
    }
  });

  it("keeps Chinese tracker content structurally aligned", () => {
    const pack = getHiringFollowUpTracker("zh");

    expect(pack.hero.headline).toContain("跟进");
    expect(pack.roles).toHaveLength(4);
    expect(pack.summary).toHaveLength(4);
    expect(pack.stages).toHaveLength(5);
    expect(pack.artifacts).toHaveLength(4);
    expect(pack.close.primaryAction.href).toBe("/contact");
  });
});
