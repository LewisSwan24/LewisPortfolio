import { describe, it, expect } from "vitest";
import { tokens } from "@/lib/design-tokens";

describe("design tokens", () => {
  it("exposes the Moss Green accent hex", () => {
    expect(tokens.accent.moss).toBe("#4a5d3a");
  });
  it("exposes the Parchment background hex", () => {
    expect(tokens.bg.parchment).toBe("#f5f4ed");
  });
  it("exposes the primary text hex", () => {
    expect(tokens.text.primary).toBe("#141413");
  });
});
