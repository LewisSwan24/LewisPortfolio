import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HiringTrackerView } from "@/components/hiring/HiringTrackerComponents";
import { getHiringFollowUpTracker } from "@/lib/proof";

function expectLinkHref(links: HTMLElement[], name: RegExp, href: string) {
  const link = links.find((candidate) =>
    name.test(`${candidate.getAttribute("aria-label") ?? ""} ${candidate.textContent ?? ""}`)
  );

  expect(link).toBeDefined();
  expect(link).toHaveAttribute("href", href);
}

describe("hiring tracker components", () => {
  it("renders tracker summary, stages, role lanes, artifacts, routes, and proof anchors", () => {
    const pack = getHiringFollowUpTracker("en");

    render(<HiringTrackerView pack={pack} />);
    const links = screen.getAllByRole("link");

    expect(
      screen.getByRole("heading", { level: 1, name: /Hiring Follow-up Tracker/i })
    ).toBeVisible();
    expectLinkHref(links, /Hiring action/i, "/hire/action");
    expectLinkHref(links, /Hiring readiness/i, "/hire/readiness");
    expectLinkHref(links, /Hiring briefing/i, "/hire/briefing");
    expectLinkHref(links, /Hiring command/i, "/hire/command");
    expectLinkHref(links, /Partnership operating/i, "/hire/partnership");
    expectLinkHref(links, /Retention readiness/i, "/hire/retention");
    expectLinkHref(links, /Growth roadmap/i, "/hire/growth");
    expectLinkHref(links, /Impact review/i, "/hire/impact");
    expectLinkHref(links, /Kickoff plan/i, "/hire/kickoff");
    expectLinkHref(links, /Onboarding plan/i, "/hire/onboarding");
    expectLinkHref(links, /Offer readiness/i, "/hire/offer");
    expectLinkHref(links, /Decision pack/i, "/hire/decision");
    expectLinkHref(links, /Manager debrief/i, "/hire/debrief");
    expectLinkHref(links, /Shortlist memo/i, "/hire/shortlist");
    expectLinkHref(links, /Hiring scorecard/i, "/hire/scorecard");
    expectLinkHref(links, /Interview agenda/i, "/hire/interview");
    expectLinkHref(links, /Compare role paths/i, "/hire/compare");
    expectLinkHref(links, /Open proof review/i, "/hire/review");
    expect(screen.getByRole("heading", { level: 2, name: /Tracker summary/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /Follow-up stages/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /Role tracker lanes/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /Tracker artifacts/i })).toBeVisible();
    expectLinkHref(links, /Open ux-product packet/i, "/hire/ux-product/packet");
    expectLinkHref(links, /Open ux-product follow-through/i, "/hire/ux-product/next");
    expectLinkHref(links, /Contact ux-product tracker/i, "/contact?role=ux-product&intent=tracker");
    expect(links.some((link) => link.getAttribute("href")?.includes("#"))).toBe(true);
  }, 30000);
});
