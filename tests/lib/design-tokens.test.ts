import { describe, it, expect } from "vitest";
import { tokens } from "@/lib/design-tokens";

describe("V4 design tokens", () => {
  it("exposes the Swiss Editorial accent hex", () => {
    expect(tokens.accent.moss).toBe("#a63f2a");
  });
  it("exposes the Warm Bone White background hex", () => {
    expect(tokens.bg.parchment).toBe("#f6f4ef");
  });
  it("exposes the Deep Charcoal text and dark studio hexes", () => {
    expect(tokens.text.primary).toBe("#151412");
    expect(tokens.dark.bg).toBe("#111110");
  });
});
