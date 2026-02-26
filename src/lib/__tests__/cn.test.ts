import { describe, it, expect } from "vitest";
import { cn } from "../cn";

// Test the cn utility function which is the foundation of all component styling
describe("cn (className merge utility)", () => {
  it("should merge class names", () => {
    const result = cn("foo", "bar");
    expect(result).toContain("foo");
    expect(result).toContain("bar");
  });

  it("should handle conditional classes", () => {
    const result = cn("base", false && "excluded", "included");
    expect(result).toContain("base");
    expect(result).not.toContain("excluded");
    expect(result).toContain("included");
  });

  it("should handle undefined and null", () => {
    const result = cn("base", undefined, null);
    expect(result).toBe("base");
  });

  it("should merge conflicting tailwind classes correctly", () => {
    // tailwind-merge should prefer the last class in conflicts
    const result = cn("px-4", "px-8");
    expect(result).toBe("px-8");
  });

  it("should merge complex class combinations", () => {
    const result = cn(
      "bg-red-500 text-white",
      "bg-blue-500" // bg-blue should override bg-red
    );
    expect(result).toContain("bg-blue-500");
    expect(result).toContain("text-white");
    expect(result).not.toContain("bg-red-500");
  });
});
