import { describe, it, expect } from "vitest";
import { tokens } from "@/lib/design-tokens";

function relativeLuminance(hex: string): number {
  const [r, g, b] = hex
    .replace("#", "")
    .match(/../g)!
    .map((pair) => {
      const srgb = Number.parseInt(pair, 16) / 255;
      return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
    });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(fg: string, bg: string): number {
  const [l1, l2] = [relativeLuminance(fg), relativeLuminance(bg)].sort((a, b) => b - a);
  return (l1 + 0.05) / (l2 + 0.05);
}

describe("Design tokens & WCAG AAA body calibration", () => {
  it("exposes the Swiss Editorial accent hex", () => {
    expect(tokens.accent.moss).toBe("#a63f2a");
  });

  it("exposes the Warm Bone White background hex and Deep Charcoal dark studio", () => {
    expect(tokens.bg.parchment).toBe("#f6f4ef");
    expect(tokens.text.primary).toBe("#151412");
    expect(tokens.dark.bg).toBe("#111110");
  });

  it("enforces WCAG AAA (>= 7.0:1) contrast for light & dark body/secondary/tertiary tokens", () => {
    for (const bg of [tokens.bg.ivory, tokens.bg.parchment, tokens.bg.sand]) {
      expect(contrastRatio(tokens.text.primary, bg)).toBeGreaterThanOrEqual(7.0);
      expect(contrastRatio(tokens.text.secondary, bg)).toBeGreaterThanOrEqual(7.0);
      expect(contrastRatio(tokens.text.tertiary, bg)).toBeGreaterThanOrEqual(7.0);
    }

    for (const bg of [tokens.dark.bg, tokens.dark.surface, tokens.dark.surfaceElevated]) {
      expect(contrastRatio(tokens.dark.secondary, bg)).toBeGreaterThanOrEqual(7.0);
      expect(contrastRatio(tokens.dark.tertiary, bg)).toBeGreaterThanOrEqual(7.0);
    }
  });
});
