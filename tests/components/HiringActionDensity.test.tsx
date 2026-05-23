import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HiringActionView } from "@/components/hiring/HiringActionComponents";
import { HiringBriefingView } from "@/components/hiring/HiringBriefingComponents";
import { HiringCommandView } from "@/components/hiring/HiringCommandComponents";
import { HiringDebriefView } from "@/components/hiring/HiringDebriefComponents";
import { HiringDecisionView } from "@/components/hiring/HiringDecisionComponents";
import { HiringGrowthView } from "@/components/hiring/HiringGrowthComponents";
import { HiringImpactView } from "@/components/hiring/HiringImpactComponents";
import { HiringKickoffView } from "@/components/hiring/HiringKickoffComponents";
import { HiringOfferView } from "@/components/hiring/HiringOfferComponents";
import { HiringOnboardingView } from "@/components/hiring/HiringOnboardingComponents";
import { HiringPartnershipView } from "@/components/hiring/HiringPartnershipComponents";
import { HiringReadinessView } from "@/components/hiring/HiringReadinessComponents";
import { HiringRetentionView } from "@/components/hiring/HiringRetentionComponents";
import { HiringScorecardView } from "@/components/hiring/HiringScorecardComponents";
import { HiringShortlistView } from "@/components/hiring/HiringShortlistComponents";
import { HiringTrackerView } from "@/components/hiring/HiringTrackerComponents";
import { InterviewAgendaView } from "@/components/hiring/InterviewAgendaComponents";
import { ProofReviewRoomView } from "@/components/hiring/ProofReviewRoomComponents";
import { RoleComparisonView } from "@/components/hiring/RoleComparisonComponents";
import {
  getHiringActionBoard,
  getHiringBriefingRoom,
  getHiringCommandCenter,
  getHiringDecisionPack,
  getHiringGrowthRoadmap,
  getHiringManagerDebrief,
  getHiringFollowUpTracker,
  getHiringImpactReview,
  getHiringKickoffAlignment,
  getHiringOfferReadiness,
  getHiringOnboardingReadiness,
  getHiringPartnershipOperatingPack,
  getHiringReadinessGate,
  getHiringRetentionReadiness,
  getHiringScorecardBoard,
  getHiringShortlistMemo,
  getInterviewAgendaBoard,
  getProofReviewRoom,
  getRoleComparisonBoard,
} from "@/lib/proof";

function visibleHeroLinks(container: HTMLElement, selector: string) {
  const hero = container.querySelector(selector);
  if (!hero) throw new Error(`Missing hero selector ${selector}`);
  return Array.from(hero.querySelectorAll("a"));
}

describe("hiring hero action density", () => {
  it("keeps proof review hero actions focused", () => {
    const { container } = render(<ProofReviewRoomView room={getProofReviewRoom("en")} />);

    expect(visibleHeroLinks(container, ".proof-review-hero")).toHaveLength(4);
  });

  it("keeps role comparison hero actions focused", () => {
    const { container } = render(<RoleComparisonView board={getRoleComparisonBoard("en")} />);

    expect(visibleHeroLinks(container, ".role-comparison-hero")).toHaveLength(4);
  });

  it("keeps early hiring stage hero actions focused", () => {
    const interview = render(<InterviewAgendaView board={getInterviewAgendaBoard("en")} />);
    const scorecard = render(<HiringScorecardView board={getHiringScorecardBoard("en")} />);
    const shortlist = render(<HiringShortlistView memo={getHiringShortlistMemo("en")} />);
    const debrief = render(<HiringDebriefView board={getHiringManagerDebrief("en")} />);
    const decision = render(<HiringDecisionView pack={getHiringDecisionPack("en")} />);

    expect(visibleHeroLinks(interview.container, ".interview-agenda-hero")).toHaveLength(4);
    expect(visibleHeroLinks(scorecard.container, ".hiring-scorecard-hero")).toHaveLength(4);
    expect(visibleHeroLinks(shortlist.container, ".hiring-shortlist-hero")).toHaveLength(4);
    expect(visibleHeroLinks(debrief.container, ".hiring-debrief-hero")).toHaveLength(4);
    expect(visibleHeroLinks(decision.container, ".hiring-decision-hero")).toHaveLength(4);
  });

  it("keeps command, briefing, and readiness hero actions focused", () => {
    const command = render(<HiringCommandView pack={getHiringCommandCenter("en")} />);
    const briefing = render(<HiringBriefingView pack={getHiringBriefingRoom("en")} />);
    const readiness = render(<HiringReadinessView pack={getHiringReadinessGate("en")} />);

    expect(visibleHeroLinks(command.container, ".hiring-command-hero")).toHaveLength(4);
    expect(visibleHeroLinks(briefing.container, ".hiring-briefing-hero")).toHaveLength(4);
    expect(visibleHeroLinks(readiness.container, ".hiring-readiness-hero")).toHaveLength(4);
  });

  it("keeps action and tracker hero actions focused", () => {
    const action = render(<HiringActionView pack={getHiringActionBoard("en")} />);
    const tracker = render(<HiringTrackerView pack={getHiringFollowUpTracker("en")} />);

    expect(visibleHeroLinks(action.container, ".hiring-action-hero")).toHaveLength(4);
    expect(visibleHeroLinks(tracker.container, ".hiring-tracker-hero")).toHaveLength(4);
  });

  it("keeps downstream hiring stage hero actions focused", () => {
    const offer = render(<HiringOfferView pack={getHiringOfferReadiness("en")} />);
    const onboarding = render(
      <HiringOnboardingView pack={getHiringOnboardingReadiness("en")} />
    );
    const kickoff = render(<HiringKickoffView pack={getHiringKickoffAlignment("en")} />);
    const impact = render(<HiringImpactView pack={getHiringImpactReview("en")} />);
    const growth = render(<HiringGrowthView pack={getHiringGrowthRoadmap("en")} />);
    const retention = render(<HiringRetentionView pack={getHiringRetentionReadiness("en")} />);
    const partnership = render(
      <HiringPartnershipView pack={getHiringPartnershipOperatingPack("en")} />
    );

    expect(visibleHeroLinks(offer.container, ".hiring-offer-hero")).toHaveLength(4);
    expect(visibleHeroLinks(onboarding.container, ".hiring-onboarding-hero")).toHaveLength(4);
    expect(visibleHeroLinks(kickoff.container, ".hiring-kickoff-hero")).toHaveLength(4);
    expect(visibleHeroLinks(impact.container, ".hiring-impact-hero")).toHaveLength(4);
    expect(visibleHeroLinks(growth.container, ".hiring-growth-hero")).toHaveLength(4);
    expect(visibleHeroLinks(retention.container, ".hiring-retention-hero")).toHaveLength(4);
    expect(visibleHeroLinks(partnership.container, ".hiring-partnership-hero")).toHaveLength(4);
  });
});
