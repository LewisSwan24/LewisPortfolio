import { describe, expect, it } from "vitest";
import {
  getHiringBriefingRoom,
  getHiringCommandCenter,
  getHiringGrowthRoadmap,
  getHiringImpactReview,
  getHiringKickoffAlignment,
  getHiringOnboardingReadiness,
  getHiringOfferReadiness,
  getHiringPartnershipOperatingPack,
  getHiringReadinessGate,
  getHiringRetentionReadiness,
} from "@/lib/proof";

const inheritedLabels = [
  "Briefing signal",
  "Current signal",
  "Decision gate",
  "Decision focus",
  "Delivery artifact",
  "Durability risk",
  "First-30-days outcome",
  "First-month evidence",
  "Kickoff signal",
  "Long-term fit",
  "Manager support",
  "Manager touchpoint",
  "Next briefing action",
  "Next command action",
  "Next partnership action",
  "Next retention question",
  "Next review",
  "Offer signal",
  "Onboarding signal",
  "Operating rhythm",
  "Partnership signal",
  "Readiness signal",
  "Retention signal",
  "Review cadence",
  "Risk guardrail",
  "Risk to monitor",
  "Validation note",
].map((label) => `${label}:`);

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings);
  }
  return [];
}

function labelCount(value: string) {
  return inheritedLabels.filter((label) => value.includes(label)).length;
}

describe("proof copy quality", () => {
  it("does not render inherited label chains in hiring role-lane copy", () => {
    const packs = [
      getHiringOfferReadiness("en"),
      getHiringOnboardingReadiness("en"),
      getHiringKickoffAlignment("en"),
      getHiringImpactReview("en"),
      getHiringGrowthRoadmap("en"),
      getHiringRetentionReadiness("en"),
      getHiringPartnershipOperatingPack("en"),
      getHiringCommandCenter("en"),
      getHiringBriefingRoom("en"),
      getHiringReadinessGate("en"),
      getHiringCommandCenter("zh"),
      getHiringBriefingRoom("zh"),
      getHiringReadinessGate("zh"),
    ];

    const chained = packs
      .flatMap((pack) => collectStrings(pack))
      .filter((value) => labelCount(value) > 1);

    expect(chained).toEqual([]);
  }, 30000);
});
