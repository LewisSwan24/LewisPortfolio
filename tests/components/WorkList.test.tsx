import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WorkList } from "@/components/sections/WorkList";

const items = [
  {
    slug: "uq-connect",
    title: "UQ Connect",
    outcome: "Findability 58 → 84 · tree test n=50",
    year: "2024",
    coverGradient: "linear-gradient(135deg,#fbbf24,#f97316)",
  },
  {
    slug: "ai-interview-assistant",
    title: "AI Interview Assistant",
    outcome: "+68% reduced anxiety · React + GPT-4",
    year: "2024",
    coverGradient: "linear-gradient(135deg,#06b6d4,#3b82f6)",
  },
];

describe("WorkList", () => {
  it("renders each item's title", () => {
    render(<WorkList items={items} />);
    expect(screen.getByText("UQ Connect")).toBeInTheDocument();
    expect(screen.getByText("AI Interview Assistant")).toBeInTheDocument();
  });
  it("links to /projects/[slug]", () => {
    render(<WorkList items={items} />);
    expect(screen.getByRole("link", { name: /UQ Connect/ })).toHaveAttribute(
      "href",
      "/projects/uq-connect"
    );
  });
});
