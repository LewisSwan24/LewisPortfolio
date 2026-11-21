import { StrictMode, type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { WorkIndex, type WorkIndexClientRow } from "../../app/[locale]/projects/WorkIndex";

vi.mock("@/components/LocalizedLink", () => ({
  LocalizedLink: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const sampleItems: WorkIndexClientRow[] = [
  {
    slug: "walkie",
    tags: ["flag", "ai", "hardware"],
    title: "Walkie",
    kicker: "Physical AI Agent",
    role: "Creator",
    year: "2026",
    dur: "Active",
    problem: "Run Claude Code safely from a wrist voice device.",
    changed: "Added paired token crypto and dual-boot invariants.",
  },
  {
    slug: "fencepost",
    tags: ["flag", "ai"],
    title: "Fencepost",
    kicker: "Governance",
    role: "Creator",
    year: "2026",
    dur: "Active",
    problem: "Prevent agent loops and unbounded tool execution.",
    changed: "Separated human-in-the-loop verification gates.",
  },
];

const sampleThumbs: Record<string, ReactNode> = {
  walkie: <span data-testid="thumb-walkie">Walkie preview</span>,
  fencepost: <span data-testid="thumb-fencepost">Fencepost preview</span>,
};

describe("WorkIndex", () => {
  it("renders list items cleanly in StrictMode with zero console.error warnings and filters by tag", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    try {
      render(
        <StrictMode>
          <WorkIndex items={sampleItems} thumbs={sampleThumbs} locale="en" />
        </StrictMode>
      );

      expect(screen.getByText("Walkie")).toBeInTheDocument();
      expect(screen.getByText("Fencepost")).toBeInTheDocument();
      expect(errorSpy).not.toHaveBeenCalled();

      fireEvent.click(screen.getByRole("tab", { name: "Hardware" }));
      expect(screen.getByText("Walkie")).toBeInTheDocument();
      expect(screen.queryByText("Fencepost")).not.toBeInTheDocument();
      expect(errorSpy).not.toHaveBeenCalled();
    } finally {
      errorSpy.mockRestore();
    }
  });
});
