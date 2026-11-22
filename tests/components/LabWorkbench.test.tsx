import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { LabWorkbench } from "@/components/lab/LabWorkbench";

const setThemeMock = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: undefined,
    setTheme: setThemeMock,
  }),
}));

vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: () => true,
}));

describe("LabWorkbench zero-hydration theme inspector", () => {
  it("renders both light and dark swatch hex tokens in SSR markup without resolvedTheme", () => {
    const { container } = render(<LabWorkbench locale="en" />);

    expect(container.querySelectorAll(".lab-only-light").length).toBeGreaterThanOrEqual(8);
    expect(container.querySelectorAll(".lab-only-dark").length).toBeGreaterThanOrEqual(8);

    expect(screen.getByText("#F6F4EF")).toBeInTheDocument();
    expect(screen.getByText("#111110")).toBeInTheDocument();

    const toggle = screen.getByRole("button", { name: /Toggle theme/i });
    fireEvent.click(toggle);
    expect(setThemeMock).toHaveBeenCalledTimes(1);
  });
});
