import { expect, test } from "@playwright/test";

// v7.1 block 2: field data counts people, not test runs or crawlers.

test("a browser driven by automation sends no vitals beacons", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "beacon requests are checked in Chromium only");
  const sent: string[] = [];
  await page.route("**/api/vitals", async (route) => {
    if (route.request().method() === "POST") sent.push(route.request().postData() ?? "");
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });
  await page.goto("/patterns", { waitUntil: "networkidle" });
  expect(await page.evaluate(() => navigator.webdriver)).toBe(true);
  await page.locator("main button").first().click();
  await page.evaluate(() => {
    Object.defineProperty(document, "visibilityState", { value: "hidden", configurable: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.waitForTimeout(1500);
  expect(sent).toEqual([]);
});

test("/api/vitals acknowledges automation but does not store it", async ({ request }) => {
  const automated = await request.post("/api/vitals", {
    headers: { "user-agent": "Mozilla/5.0 (X11; Linux x86_64) HeadlessChrome/131.0.0.0 Safari/537.36" },
    data: { metric: "TTFB", value: 321, routeGroup: "brief" },
  });
  expect(automated.status()).toBe(200);
  expect(await automated.json()).toEqual({ ok: true, stored: false });

  const person = await request.post("/api/vitals", {
    data: { metric: "TTFB", value: 321, routeGroup: "brief" },
  });
  expect(await person.json()).toEqual({ ok: true, stored: true });

  const summary = (await (await request.get("/api/vitals")).json()).summary;
  expect(summary.windowDays).toBe(30);
  expect(["kv", "memory"]).toContain(summary.source);
});
