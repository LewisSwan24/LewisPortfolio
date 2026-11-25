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
    // v6.5: the slider only runs for a photo-on-photo pair (review row 07).
    const base = connectCase.processArtifacts!.scrubber!;
    const scrubber = {
      ...base,
      beforeImage: { ...base.afterImage, src: "/projects/connect/01-before.png" },
      afterImage: { ...base.afterImage, src: "/projects/connect/02-app-studybuddy.png" },
    };
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

  it("ResearchQuoteDeck shows every card and updates the decision callout on card selection", () => {
    // v6.5 removed the category filter (review row 15); all cards stay visible.
    const quotes = connectCase.processArtifacts!.quotes!;
    render(<ResearchQuoteDeck data={quotes} locale="zh" />);

    expect(screen.getByRole("status")).toHaveTextContent(/10 月 3 日/);
    expect(screen.getByText(/我能回上一页吗/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/只给一个匹配百分比/));
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
