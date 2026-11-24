import { afterEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { BeforeAfterScrubber } from "@/components/case/BeforeAfterScrubber";
import { ResearchQuoteDeck } from "@/components/case/ResearchQuoteDeck";
import { CaseMicroLoop } from "@/components/case/CaseMicroLoop";
import { connectCase } from "@/data/cases/connect";
import { onthebeatCase } from "@/data/cases/onthebeat";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} />
  ),
}));

describe("Design Process Artifacts", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("BeforeAfterScrubber supports keyboard slider steps (5% arrows, Home/End) and presets", () => {
    const scrubber = connectCase.processArtifacts!.scrubber!;
    render(<BeforeAfterScrubber data={scrubber} locale="en" />);

    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuenow", "50");

    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(slider).toHaveAttribute("aria-valuenow", "55");

    fireEvent.keyDown(slider, { key: "ArrowLeft" });
    expect(slider).toHaveAttribute("aria-valuenow", "50");

    fireEvent.keyDown(slider, { key: "End" });
    expect(slider).toHaveAttribute("aria-valuenow", "100");

    fireEvent.keyDown(slider, { key: "Home" });
    expect(slider).toHaveAttribute("aria-valuenow", "0");

    fireEvent.click(screen.getByRole("button", { name: /Inspect Before \(80%\)/i }));
    expect(slider).toHaveAttribute("aria-valuenow", "80");
  });

  it("ResearchQuoteDeck filters by category and updates decision callout on card selection", () => {
    const quotes = connectCase.processArtifacts!.quotes!;
    render(<ResearchQuoteDeck data={quotes} locale="zh" />);

    expect(screen.getByRole("status")).toHaveTextContent(/10 月 3 日/);

    fireEvent.click(screen.getByRole("button", { name: "信任边界" }));
    expect(screen.queryByText(/我能回上一页吗/)).not.toBeInTheDocument();
    expect(screen.getByText(/只给一个匹配百分比/)).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(/直接在匹配卡列出课程/);
  });

  it("CaseMicroLoop supports explicit Pause/Play and defaults paused under reduced motion", () => {
    const originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: vi.fn((query: string) => ({
        matches: query.includes("prefers-reduced-motion: reduce"),
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      })),
    });
    vi.useFakeTimers();

    try {
      const loop = onthebeatCase.processArtifacts!.microLoop!;
      render(<CaseMicroLoop data={loop} locale="en" />);

      const toggleBtn = screen.getByRole("button", { name: /Play loop/i });
      expect(toggleBtn).toHaveAttribute("aria-pressed", "true");
      expect(screen.getByRole("status")).toHaveTextContent(/02 · Blind Relay/i);

      fireEvent.click(toggleBtn);
      expect(screen.getByRole("button", { name: /Pause loop/i })).toHaveAttribute(
        "aria-pressed",
        "false"
      );

      act(() => {
        vi.advanceTimersByTime(1750);
      });
      expect(screen.getByRole("status")).toHaveTextContent(/03 · Mutual Nod/i);
    } finally {
      vi.useRealTimers();
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        writable: true,
        value: originalMatchMedia,
      });
    }
  });
});
