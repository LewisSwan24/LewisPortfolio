import { describe, it, expect } from "vitest";
import { tokens } from "@/lib/design-tokens";

describe("design tokens", () => {
  it("exposes the Clay accent hex", () => {
    expect(tokens.accent.moss).toBe("#c9523a");
  });
  it("exposes the Parchment background hex", () => {
    expect(tokens.bg.parchment).toBe("#efe8da");
  });
  it("exposes the primary text hex", () => {
    expect(tokens.text.primary).toBe("#161412");
  });
});
