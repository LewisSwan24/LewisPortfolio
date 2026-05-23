import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HiringDebriefView } from "@/components/hiring/HiringDebriefComponents";
import { getHiringManagerDebrief } from "@/lib/proof";

describe("hiring debrief components", () => {
  it("renders debrief lanes, routes, and proof anchors", () => {
    const board = getHiringManagerDebrief("en");

    render(<HiringDebriefView board={board} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Hiring manager debrief/i })
    ).toBeVisible();
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
    expect(screen.getByRole("heading", { level: 2, name: /Debrief summary/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /Role debrief lanes/i })).toBeVisible();
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
