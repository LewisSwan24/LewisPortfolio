import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AvailabilityPill } from "@/components/ui/AvailabilityPill";

describe("AvailabilityPill", () => {
  it("renders the given label", () => {
    render(<AvailabilityPill label="Open for Summer 2026 internships" />);
    expect(screen.getByText("Open for Summer 2026 internships")).toBeInTheDocument();
  });
  it("renders with role='status'", () => {
    render(<AvailabilityPill label="Open" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
