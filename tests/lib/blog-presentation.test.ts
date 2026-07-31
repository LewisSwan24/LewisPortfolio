import { describe, expect, it } from "vitest";
import {
  formatBlogOriginalLanguage,
  formatBlogReadingTime,
} from "@/lib/blog-presentation";

describe("formatBlogReadingTime", () => {
  it("uses a Chinese reading-time label in the Chinese interface", () => {
    expect(formatBlogReadingTime("5 min read", "zh")).toBe("5 分钟阅读");
  });

  it("discloses an English original to readers in the Chinese interface", () => {
    expect(formatBlogOriginalLanguage("en", "zh")).toBe("英文原文");
  });

  it("does not repeat a source language the reader is already using", () => {
    expect(formatBlogOriginalLanguage("en", "en")).toBeNull();
  });
});
