import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HiringGrowthView } from "@/components/hiring/HiringGrowthComponents";
import { getHiringGrowthRoadmap } from "@/lib/proof";

describe("hiring growth components", () => {
  it("renders growth roadmap lanes, routes, and proof anchors", () => {
    const pack = getHiringGrowthRoadmap("en");

    render(<HiringGrowthView pack={pack} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Growth roadmap pack/i })
    ).toBeVisible();
    expect(screen.getAllByRole("link", { name: /Impact review/i })[0]).toHaveAttribute(
      "href",
      "/hire/impact"
    );
    expect(screen.getAllByRole("link", { name: /Kickoff plan/i })[0]).toHaveAttribute(
      "href",
      "/hire/kickoff"
    );
    expect(screen.getAllByRole("link", { name: /Onboarding plan/i })[0]).toHaveAttribute(
      "href",
      "/hire/onboarding"
    );
    expect(screen.getAllByRole("link", { name: /Offer readiness/i })[0]).toHaveAttribute(
      "href",
      "/hire/offer"
    );
    expect(screen.getAllByRole("link", { name: /Decision pack/i })[0]).toHaveAttribute(
      "href",
      "/hire/decision"
    );
    expect(screen.getAllByRole("link", { name: /Manager debrief/i })[0]).toHaveAttribute(
      "href",
      "/hire/debrief"
    );
    expect(screen.getAllByRole("link", { name: /Shortlist memo/i })[0]).toHaveAttribute(
      "href",
      "/hire/shortlist"
    );
    expect(screen.getAllByRole("link", { name: /Hiring scorecard/i })[0]).toHaveAttribute(
      "href",
      "/hire/scorecard"
    );
    expect(screen.getAllByRole("link", { name: /Interview agenda/i })[0]).toHaveAttribute(
      "href",
      "/hire/interview"
    );
    expect(screen.getByRole("link", { name: /Compare role paths/i })).toHaveAttribute(
      "href",
      "/hire/compare"
    );
    expect(screen.getAllByRole("link", { name: /Open proof review/i })[0]).toHaveAttribute(
      "href",
      "/hire/review"
    );
    expect(screen.getByRole("heading", { level: 2, name: /Growth summary/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /Role growth lanes/i })).toBeVisible();
    expect(screen.getByRole("link", { name: /Open ux-product packet/i })).toHaveAttribute(
      "href",
      "/hire/ux-product/packet"
    );
    expect(screen.getByRole("link", { name: /Open ux-product follow-through/i })).toHaveAttribute(
      "href",
      "/hire/ux-product/next"
    );
    expect(screen.getAllByRole("link").some((link) => link.getAttribute("href")?.includes("#"))).toBe(
      true
    );
  });
});
