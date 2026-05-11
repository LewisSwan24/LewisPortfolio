import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RoleComparisonView } from "@/components/hiring/RoleComparisonComponents";
import { getRoleComparisonBoard } from "@/lib/proof";

describe("role comparison components", () => {
  it("renders role comparison lanes with routes and proof anchors", () => {
    const board = getRoleComparisonBoard("en");

    render(<RoleComparisonView board={board} />);

    expect(screen.getByRole("heading", { level: 1, name: /Compare role paths/i })).toBeVisible();
    expect(screen.getByRole("link", { name: /Open proof review/i })).toHaveAttribute(
      "href",
      "/hire/review"
    );
    expect(screen.getByRole("heading", { level: 2, name: /Comparison criteria/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /Role lanes/i })).toBeVisible();
    expect(screen.getByRole("link", { name: /Open ux-product role room/i })).toHaveAttribute(
      "href",
      "/hire/ux-product"
    );
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
