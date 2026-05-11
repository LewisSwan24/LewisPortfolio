import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ApplicationPacketView } from "@/components/hiring/ApplicationPacketComponents";
import { getApplicationPacket, getProofUiLabels } from "@/lib/proof";

describe("application packet components", () => {
  const packet = getApplicationPacket("ai-ux", "en");
  const labels = getProofUiLabels("en");

  it("renders a packet with proof, interview focus, boundaries, and actions", () => {
    if (!packet) throw new Error("Missing ai-ux application packet");

    render(<ApplicationPacketView packet={packet} labels={labels} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /application packet/i
    );
    expect(screen.getByRole("heading", { level: 2, name: /Proof snapshot/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /Interview focus/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /Boundaries/i })).toBeVisible();
    expect(screen.getByRole("button", { name: /Print packet/i })).toBeVisible();
    expect(screen.getByRole("link", { name: /Open full role room/i })).toHaveAttribute(
      "href",
      "/hire/ai-ux"
    );
  });
});
