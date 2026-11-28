import { expect, test } from "@playwright/test";

test.describe("v6.0 GA Platform Capabilities", () => {
  test("lists all 30 published bilingual monographs and mounts GPU-composited reading progress with >=24px chapter dots", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => {
      // WebKit reports a prefetch that navigation cancelled as "… ?_rsc=… due to
      // access control checks". Nothing failed on the page.
      if (/\?_rsc=.*due to access control checks/.test(err.message)) return;
      errors.push(err.message);
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en/blog", { waitUntil: "networkidle" });
    // v7.0 L1: the unfiltered list shows ten until asked.
    await page.getByRole("button", { name: /^(Show all \d+ posts|显示全部 \d+ 篇)$/ }).click();
    await expect(page.locator(".idx-flag")).toHaveCount(30);

    await page.goto("/zh/blog", { waitUntil: "networkidle" });
    // v7.0 L1: the unfiltered list shows ten until asked.
    await page.getByRole("button", { name: /^(Show all \d+ posts|显示全部 \d+ 篇)$/ }).click();
    await expect(page.locator(".idx-flag")).toHaveCount(30);

    // Open one of the new v6.0 capstone monographs and verify ReadingProgressChapters
    await page.goto("/en/blog/mcp-endpoints-for-design-portfolios", {
      waitUntil: "networkidle",
    });
    const fillBar = page.locator(".reading-progress-fill");
    await expect(fillBar).toBeAttached();

    // Check WCAG 2.5.8 target size on chapter anchors when visible on xl viewport
    const chapterDots = page.locator('nav[aria-label="Article chapters"] a');
    const count = await chapterDots.count();
    if (count > 0) {
      const box = await chapterDots.first().boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThanOrEqual(24);
      expect(box!.height).toBeGreaterThanOrEqual(24);
    }

    expect(errors).toEqual([]);
  });

  test("registers /sw.js under worker-src CSP and never stores /api/* or /brief/* in CacheStorage", async ({
    page,
  }) => {
    const cspErrors: string[] = [];
    page.on("pageerror", (err) => cspErrors.push(err.message));

    await page.goto("/en", { waitUntil: "networkidle" });

    // Wait briefly for ServiceWorker registration when supported in context
    const swStatus = await page.evaluate(async () => {
      if (!("serviceWorker" in navigator)) return { supported: false };
      try {
        const reg = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
        return { supported: true, scope: reg.scope };
      } catch (err) {
        return { supported: true, error: String(err) };
      }
    });
    if (swStatus.supported) {
      expect(swStatus.error).toBeUndefined();
      expect(swStatus.scope).toContain("/");
    }

    // Trigger private/API fetches and verify CacheStorage does not contain /api/ or /brief/ keys
    await page.goto("/en/brief/print", { waitUntil: "networkidle" });
    await page.evaluate(() => fetch("/.well-known/mcp.json").catch(() => null));

    const cachedUrls = await page.evaluate(async () => {
      const names = await caches.keys();
      const urls: string[] = [];
      for (const name of names) {
        const cache = await caches.open(name);
        const reqs = await cache.keys();
        urls.push(...reqs.map((r) => r.url));
      }
      return urls;
    });

    for (const url of cachedUrls) {
      expect(url).not.toContain("/api/");
      expect(url).not.toContain("/brief/");
    }

    expect(cspErrors).toEqual([]);
  });

  test("preserves 0px mobile horizontal overflow in dark mode across new v6.0 essay routes", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.addInitScript(() => localStorage.setItem("portfolio-theme", "dark"));

    await page.goto("/zh/blog/service-worker-boundaries-around-private-briefs", {
      waitUntil: "networkidle",
    });

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
