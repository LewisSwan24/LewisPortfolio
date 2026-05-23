import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProofReviewRoomView } from "@/components/hiring/ProofReviewRoomComponents";
import { getProofReviewRoom } from "@/lib/proof";

describe("proof review room components", () => {
  it("renders the recruiter review room with routes, commands, and anchors", () => {
    const room = getProofReviewRoom("en", "2026-05-10");

    render(<ProofReviewRoomView room={room} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Proof review room/i })
    ).toBeVisible();
    expect(
      screen.getAllByRole("link", { name: /Contact Lewis/i }).some(
        (link) => link.getAttribute("href") === "/contact"
      )
    ).toBe(true);
    expect(screen.getByRole("heading", { level: 2, name: /Command checklist/i })).toBeVisible();
    expect(screen.getByText("pnpm proof:bundle")).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /Role coverage/i })).toBeVisible();
    expect(screen.getByRole("link", { name: /Open ux-product role room/i })).toHaveAttribute(
      "href",
      "/hire/ux-product"
    );
    expect(screen.getByRole("link", { name: /Open ux-product application packet/i })).toHaveAttribute(
      "href",
      "/hire/ux-product/packet"
    );
    expect(screen.getByRole("link", { name: /Open ux-product follow-through/i })).toHaveAttribute(
      "href",
      "/hire/ux-product/next"
    );
    expect(screen.getByRole("heading", { level: 2, name: /Proof anchor ledger/i })).toBeVisible();
    expect(screen.getAllByRole("link").some((link) => link.getAttribute("href")?.includes("#"))).toBe(
      true
    );
    expect(screen.getAllByText("docs/proof-release/2026-05-10").length).toBeGreaterThan(0);
  });
});
