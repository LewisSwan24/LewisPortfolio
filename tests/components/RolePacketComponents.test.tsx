import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  RolePacketHero,
  RolePacketInterviewRoute,
  RolePacketLimits,
  RolePacketNav,
  RolePacketProofList,
} from "@/components/hiring/RolePacketComponents";
import { getRolePacket, getRolePackets } from "@/lib/proof";

describe("role packet components", () => {
  const packet = getRolePacket("ai-ux", "en");

  it("renders role packet navigation", () => {
    render(<RolePacketNav packets={getRolePackets("en")} />);

    expect(screen.getByRole("link", { name: /AI UX/i })).toHaveAttribute(
      "href",
      "/hire/ai-ux"
    );
  });

  it("renders a packet hero and proof list", () => {
    if (!packet) throw new Error("Missing ai-ux packet");

    render(<RolePacketHero packet={packet} />);
    expect(screen.getByRole("heading", { level: 1 })).toBeVisible();

    render(<RolePacketProofList packet={packet} />);
    expect(screen.getAllByRole("link").length).toBeGreaterThanOrEqual(2);
  });

  it("renders interview route and limits", () => {
    if (!packet) throw new Error("Missing ai-ux packet");

    render(<RolePacketInterviewRoute packet={packet} />);
    expect(
      screen.getByRole("heading", { level: 2, name: /Interview questions/i })
    ).toBeVisible();

    render(<RolePacketLimits packet={packet} />);
    expect(
      screen.getByRole("heading", { level: 2, name: /should not overclaim/i })
    ).toBeVisible();
  });
});
