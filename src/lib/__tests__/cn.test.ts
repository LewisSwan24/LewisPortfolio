import { describe, it, expect } from "vitest";
import { cn } from "../cn";

describe("cn utility", () => {
  it("should merge class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("should handle conditional classes", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });

  it("should handle undefined and null", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
  });

  it("should merge tailwind classes correctly", () => {
    expect(cn("px-4 py-2", "px-6")).toBe("py-2 px-6");
  });

  it("should handle empty inputs", () => {
    expect(cn()).toBe("");
  });

  it("should handle arrays", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });

  it("should handle objects", () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
  });
});
