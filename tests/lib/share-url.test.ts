import { describe, expect, it } from "vitest";
import { buildArticleShareUrl } from "@/lib/share-url";

describe("buildArticleShareUrl", () => {
  it("uses the unprefixed route for the default English locale", () => {
    expect(
      buildArticleShareUrl(
        "https://lewisdong.vercel.app/",
        "en",
        "designing-for-ai"
      )
    ).toBe("https://lewisdong.vercel.app/blog/designing-for-ai");
  });

  it("uses the /zh prefix for Chinese routes", () => {
    expect(
      buildArticleShareUrl(
        "https://lewisdong.vercel.app",
        "zh",
        "ux-research-methods-guide"
      )
    ).toBe(
      "https://lewisdong.vercel.app/zh/blog/ux-research-methods-guide"
    );
  });
});
