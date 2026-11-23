import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";

const revertMock = vi.fn();
const setMock = vi.fn();
const fromToMock = vi.fn();
const matchMediaHandlers: Array<{ query: string; fn: (ctx: { conditions?: Record<string, boolean> }) => void }> = [];

vi.mock("@/lib/motion/gsap", () => ({
  MOTION_PRESETS: {
    durationFast: 0.16,
    durationBase: 0.28,
    ease: "power2.out",
    staggerCards: 0.06,
  },
  getGsap: () => ({
    gsap: {
      set: setMock,
      fromTo: fromToMock,
    },
  }),
  getGsapWithScrollTrigger: vi.fn(async () => ({
    gsap: {
      set: setMock,
      fromTo: fromToMock,
      matchMedia: () => ({
        add: (query: string | Record<string, string>, fn: (ctx: { conditions?: Record<string, boolean> }) => void) => {
          if (typeof query === "string") {
            matchMediaHandlers.push({ query, fn });
          } else {
            for (const [key, q] of Object.entries(query)) {
              matchMediaHandlers.push({ query: `${key}:${q}`, fn });
            }
          }
        },
        revert: revertMock,
      }),
    },
    ScrollTrigger: {},
  })),
}));

import { ManuscriptReveal } from "@/components/motion/ManuscriptReveal";

const VECTOR_DIAGRAM_FILES = [
  "public/projects/walkie/01-architecture.svg",
  "public/projects/walkie/02-key-state-machine.svg",
  "public/projects/walkie/03-sealed-relay-frame.svg",
  "public/projects/walkie/after-architecture.svg",
  "public/projects/autofill/after-architecture.svg",
  "public/projects/grassland/after-architecture.svg",
  "public/projects/maze/after-architecture.svg",
  "public/projects/onthebeat/after-architecture.svg",
] as const;

describe("v4.8 motion choreography & SVG theme calibration", () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    revertMock.mockClear();
    setMock.mockClear();
    fromToMock.mockClear();
    matchMediaHandlers.length = 0;
  });

  afterEach(() => {
    cleanup();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: originalMatchMedia,
    });
  });

  it("settles items at 0ms under prefers-reduced-motion: reduce without delayed reveal tweens", async () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("prefers-reduced-motion: reduce"),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    const { container, unmount } = render(
      <ManuscriptReveal withHairline>
        <div data-manuscript-item="">Stage 01</div>
        <div data-manuscript-item="">Stage 02</div>
      </ManuscriptReveal>
    );

    const rail = container.querySelector("[data-motion-mode]");
    await waitFor(() => {
      expect(rail?.getAttribute("data-motion-mode")).toBe("reduced");
    });

    expect(screen.getByText("Stage 01")).toBeInTheDocument();
    expect(setMock).toHaveBeenCalled();
    expect(fromToMock).not.toHaveBeenCalled();

    unmount();
  });

  it("registers transform-only ScrollTrigger reveals when motion is allowed and calls revert() on unmount", async () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("no-preference") || query.includes("min-width: 768px"),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    const { unmount } = render(
      <ManuscriptReveal withHairline>
        <div data-manuscript-item="">Stage A</div>
        <div data-manuscript-item="">Stage B</div>
      </ManuscriptReveal>
    );

    await waitFor(() => {
      expect(matchMediaHandlers.length).toBeGreaterThan(0);
    });

    act(() => {
      for (const handler of matchMediaHandlers) {
        handler.fn({ conditions: { desktop: true, mobile: false, reduce: false } });
      }
    });

    expect(fromToMock).toHaveBeenCalled();
    for (const call of fromToMock.mock.calls) {
      const toVars = call[2] as Record<string, unknown>;
      expect(toVars).not.toHaveProperty("height");
      expect(toVars).not.toHaveProperty("marginTop");
      const isCardReveal = "y" in toVars;
      if (isCardReveal) {
        expect(toVars).toHaveProperty("y", 0);
        expect(toVars).toHaveProperty("autoAlpha", 1);
      } else {
        expect(toVars).toHaveProperty("scaleY", 1);
      }
    }

    unmount();
    expect(revertMock).toHaveBeenCalledTimes(1);
  });

  it("equips all 8 project vector architecture SVGs with #141413 / #181816 dark-mode CSS variables", () => {
    for (const relPath of VECTOR_DIAGRAM_FILES) {
      const fullPath = path.join(process.cwd(), relPath);
      const svg = fs.readFileSync(fullPath, "utf8");
      expect(svg).toContain("--svg-");
      expect(svg.toLowerCase()).toContain("#141413");
      expect(svg.toLowerCase()).toContain("#181816");
    }
  });
});
