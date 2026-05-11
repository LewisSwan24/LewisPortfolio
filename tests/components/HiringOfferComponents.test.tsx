import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HiringOfferView } from "@/components/hiring/HiringOfferComponents";
import { getHiringOfferReadiness } from "@/lib/proof";

describe("hiring offer components", () => {
  it("renders offer readiness lanes, routes, and proof anchors", () => {
    const pack = getHiringOfferReadiness("en");

    render(<HiringOfferView pack={pack} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Offer readiness pack/i })
    ).toBeVisible();
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
    expect(screen.getByRole("heading", { level: 2, name: /Offer summary/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /Role offer lanes/i })).toBeVisible();
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
