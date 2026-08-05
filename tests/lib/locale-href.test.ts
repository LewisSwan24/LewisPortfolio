import { describe, expect, it } from "vitest";
import { localizeInternalHref } from "@/lib/locale-href";

describe("localizeInternalHref", () => {
  it("prefixes Chinese routes while preserving query strings and hashes", () => {
    expect(
      localizeInternalHref("/projects/connect?role=ux#evidence-board", "zh")
    ).toBe("/zh/projects/connect?role=ux#evidence-board");
  });

  it("keeps English routes unprefixed", () => {
    expect(localizeInternalHref("/zh/contact", "en")).toBe("/contact");
  });

  it("does not rewrite external, mail, or hash-only links", () => {
    expect(localizeInternalHref("https://example.com", "zh")).toBe(
      "https://example.com"
    );
    expect(localizeInternalHref("mailto:test@example.com", "zh")).toBe(
      "mailto:test@example.com"
    );
    expect(localizeInternalHref("#decision-timeline", "zh")).toBe(
      "#decision-timeline"
    );
  });
});
