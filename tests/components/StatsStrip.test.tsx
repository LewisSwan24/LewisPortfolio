import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsStrip } from "@/components/sections/StatsStrip";

const stats = [
  { value: "50+", label: "interviews" },
  { value: "300+", label: "tree-test participants" },
  { value: "4", label: "shipped projects" },
];

describe("StatsStrip", () => {
  it("renders every stat's value", () => {
    render(<StatsStrip stats={stats} />);
    expect(screen.getByText("50+")).toBeInTheDocument();
    expect(screen.getByText("300+")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });
  it("renders every stat's label", () => {
    render(<StatsStrip stats={stats} />);
    expect(screen.getByText("interviews")).toBeInTheDocument();
    expect(screen.getByText("tree-test participants")).toBeInTheDocument();
  });
});
