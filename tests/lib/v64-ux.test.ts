import { describe, expect, it } from "vitest";
import enMessages from "@/messages/en.json";
import zhMessages from "@/messages/zh.json";
import { siteConfig } from "@/lib/site";

// v6.4: on 2026-11-25 Lewis picked "designer first, with the technical side" for the
// site's own positioning, so it agrees with the resume he sends
// ("Interaction & Product Designer").
describe("v6.4 positioning", () => {
  const EN = "Interaction & Product Designer";
  const ZH = "交互与产品设计师";

  it("leads the site title, header tagline and home eyebrow with the designer role", () => {
    expect(siteConfig.title.startsWith(EN)).toBe(true);
    expect(siteConfig.titleZh.startsWith(ZH)).toBe(true);
    expect(enMessages.brand.tagline.toLowerCase()).toContain(EN.toLowerCase());
    expect(zhMessages.brand.tagline).toContain(ZH);
    expect(enMessages.hero.eyebrow.startsWith(EN)).toBe(true);
    expect(zhMessages.hero.eyebrow.startsWith(ZH)).toBe(true);
  });

  it("no longer calls Lewis a design engineer in those places", () => {
    const surfaces = [
      siteConfig.title,
      siteConfig.titleZh,
      enMessages.brand.tagline,
      zhMessages.brand.tagline,
      enMessages.hero.eyebrow,
      zhMessages.hero.eyebrow,
      enMessages.home.subHeadline,
      zhMessages.home.subHeadline,
    ].join("\n");
    expect(surfaces).not.toMatch(/design engineer|设计工程/i);
  });
});
