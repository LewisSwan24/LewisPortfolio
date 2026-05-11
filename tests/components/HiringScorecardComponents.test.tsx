import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HiringScorecardView } from "@/components/hiring/HiringScorecardComponents";
import { getHiringScorecardBoard } from "@/lib/proof";

describe("hiring scorecard components", () => {
  it("renders scorecard criteria, role lanes, routes, and proof anchors", () => {
    const board = getHiringScorecardBoard("en");

    render(<HiringScorecardView board={board} />);

    expect(screen.getByRole("heading", { level: 1, name: /Hiring scorecard/i })).toBeVisible();
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
    expect(screen.getByRole("heading", { level: 2, name: /Score criteria/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /Role scorecards/i })).toBeVisible();
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
