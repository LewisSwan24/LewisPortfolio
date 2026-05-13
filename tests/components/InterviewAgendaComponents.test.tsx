import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InterviewAgendaView } from "@/components/hiring/InterviewAgendaComponents";
import { getInterviewAgendaBoard } from "@/lib/proof";

describe("interview agenda components", () => {
  it("renders interview agenda phases, role prep, routes, and proof anchors", () => {
    const board = getInterviewAgendaBoard("en");

    render(<InterviewAgendaView board={board} />);

    expect(screen.getByRole("heading", { level: 1, name: /Interview agenda/i })).toBeVisible();
    expect(screen.getByRole("link", { name: /Compare role paths/i })).toHaveAttribute(
      "href",
      "/hire/compare"
    );
    expect(screen.getAllByRole("link", { name: /Proof review room/i })[0]).toHaveAttribute(
      "href",
      "/hire/review"
    );
    expect(screen.getByRole("heading", { level: 2, name: /Agenda phases/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /Role prep/i })).toBeVisible();
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
