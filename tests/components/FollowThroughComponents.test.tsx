import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  FollowThroughContactContext,
  FollowThroughView,
} from "@/components/hiring/FollowThroughComponents";
import {
  buildFollowThroughMailto,
  getFollowThroughBrief,
  getProofUiLabels,
} from "@/lib/proof";

describe("follow-through components", () => {
  const brief = getFollowThroughBrief("ai-ux", "en");
  const labels = getProofUiLabels("en");

  it("renders a follow-through page with email and interview prep", () => {
    if (!brief) throw new Error("Missing ai-ux follow-through brief");

    render(<FollowThroughView brief={brief} email="test@example.com" labels={labels} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/follow-through/i);
    expect(screen.getByRole("heading", { level: 2, name: /Sendable email/i })).toBeVisible();
    expect(screen.getByRole("button", { name: /Copy email/i })).toBeVisible();
    expect(screen.getByRole("link", { name: /Open mail client/i })).toHaveAttribute(
      "href",
      buildFollowThroughMailto("test@example.com", brief)
    );
    expect(screen.getByRole("heading", { level: 2, name: /Pre-call evidence/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /Interview agenda/i })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: /Decision questions/i })).toBeVisible();
  });

  it("renders contact context only for interview intent", () => {
    render(
      <FollowThroughContactContext
        role="ai-ux"
        intent="interview"
        locale="en"
        labels={labels}
      />
    );
    expect(screen.getByText(/AI UX/i)).toBeVisible();

    const { container } = render(
      <FollowThroughContactContext role="ai-ux" intent="other" locale="en" labels={labels} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
