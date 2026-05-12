import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HiringPartnershipView } from "@/components/hiring/HiringPartnershipComponents";
import { getHiringPartnershipOperatingPack } from "@/lib/proof";

function expectLinkHref(links: HTMLElement[], name: RegExp, href: string) {
  const link = links.find((candidate) =>
    name.test(`${candidate.getAttribute("aria-label") ?? ""} ${candidate.textContent ?? ""}`)
  );

  expect(link).toBeDefined();
  expect(link).toHaveAttribute("href", href);
}

describe("hiring partnership components", () => {
  it("renders partnership operating lanes, routes, and proof anchors", () => {
    const pack = getHiringPartnershipOperatingPack("en");

    render(<HiringPartnershipView pack={pack} />);
    const links = screen.getAllByRole("link");

    expect(
      screen.getByRole("heading", { level: 1, name: /Partnership operating pack/i })
    ).toBeVisible();
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
    expect(screen.getByRole("link", { name: /Compare role paths/i })).toHaveAttribute(
      "href",
      "/hire/compare"
    );
    expectLinkHref(links, /Open proof review/i, "/hire/review");
    expect(screen.getByRole("heading", { level: 2, name: /Partnership summary/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /Role partnership lanes/i })).toBeVisible();
    expectLinkHref(links, /Open ux-product packet/i, "/hire/ux-product/packet");
    expectLinkHref(links, /Open ux-product follow-through/i, "/hire/ux-product/next");
    expect(links.some((link) => link.getAttribute("href")?.includes("#"))).toBe(true);
  });
});
