import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HiringActionView } from "@/components/hiring/HiringActionComponents";
import { getHiringActionBoard } from "@/lib/proof";

function expectLinkHref(links: HTMLElement[], name: RegExp, href: string) {
  const link = links.find((candidate) =>
    name.test(`${candidate.getAttribute("aria-label") ?? ""} ${candidate.textContent ?? ""}`)
  );

  expect(link).toBeDefined();
  expect(link).toHaveAttribute("href", href);
}

describe("hiring action components", () => {
  it("renders action summary, sequence, role lanes, artifacts, routes, and proof anchors", () => {
    const pack = getHiringActionBoard("en");

    render(<HiringActionView pack={pack} />);
    const links = screen.getAllByRole("link");

    expect(
      screen.getByRole("heading", { level: 1, name: /Hiring Action Board/i })
    ).toBeVisible();
    expectLinkHref(links, /Hiring tracker/i, "/hire/tracker");
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
    expect(screen.getByRole("heading", { level: 2, name: /Action summary/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /Action sequence/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /Role action lanes/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /Action artifacts/i })).toBeVisible();
    expectLinkHref(links, /Open ux-product packet/i, "/hire/ux-product/packet");
    expectLinkHref(links, /Open ux-product follow-through/i, "/hire/ux-product/next");
    expectLinkHref(links, /Contact ux-product action/i, "/contact?role=ux-product&intent=action");
    expect(links.some((link) => link.getAttribute("href")?.includes("#"))).toBe(true);
  }, 30000);
});
