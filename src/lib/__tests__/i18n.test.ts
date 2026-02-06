import { describe, it, expect } from "vitest";
import { getDictionary, normalizeLanguage, defaultLanguage } from "../i18n";

describe("normalizeLanguage", () => {
  it("should return 'zh' for 'zh'", () => {
    expect(normalizeLanguage("zh")).toBe("zh");
  });

  it("should return 'en' for 'en'", () => {
    expect(normalizeLanguage("en")).toBe("en");
  });

  it("should return 'en' for undefined", () => {
    expect(normalizeLanguage(undefined)).toBe("en");
  });

  it("should return 'en' for unknown language", () => {
    expect(normalizeLanguage("fr")).toBe("en");
  });

  it("should return 'en' for empty string", () => {
    expect(normalizeLanguage("")).toBe("en");
  });
});

describe("getDictionary", () => {
  it("should return English dictionary for 'en'", () => {
    const dict = getDictionary("en");
    expect(dict.nav.home).toBe("Home");
    expect(dict.nav.projects).toBe("Projects");
  });

  it("should return Chinese dictionary for 'zh'", () => {
    const dict = getDictionary("zh");
    expect(dict.nav.home).toBe("首页");
    expect(dict.nav.projects).toBe("项目");
  });

  it("should have consistent structure between en and zh", () => {
    const en = getDictionary("en");
    const zh = getDictionary("zh");

    expect(Object.keys(en.nav)).toEqual(Object.keys(zh.nav));
    expect(Object.keys(en.notFound)).toEqual(Object.keys(zh.notFound));
  });

  it("should have blog keys in both languages", () => {
    const en = getDictionary("en");
    const zh = getDictionary("zh");

    expect(en.blog.title).toBeDefined();
    expect(zh.blog.title).toBeDefined();
    expect(en.blog.emptyTitle).toBeDefined();
    expect(zh.blog.emptyTitle).toBeDefined();
  });

  it("should have lab keys in both languages", () => {
    const en = getDictionary("en");
    const zh = getDictionary("zh");

    expect(en.lab.title).toBeDefined();
    expect(zh.lab.title).toBeDefined();
  });
});

describe("defaultLanguage", () => {
  it("should be 'en'", () => {
    expect(defaultLanguage).toBe("en");
  });
});
