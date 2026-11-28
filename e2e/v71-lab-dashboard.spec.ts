import AxeBuilder from "@axe-core/playwright";
import { expect, test, type APIRequestContext, type Page } from "@playwright/test";

// v7.1 block 3: the /lab field-data dashboard. The e2e server has no Upstash,
// so beacons land in the server's memory; Playwright's request context sends
// the "Desktop Chrome" user agent, so they are counted.

const SECTION = 'section[aria-labelledby="lab-rum-heading"]';

async function seed(request: APIRequestContext) {
  for (let i = 0; i < 12; i++) {
    await request.post("/api/vitals", { data: { metric: "LCP", value: 3456, routeGroup: "case" } });
  }
  await request.post("/api/vitals", { data: { metric: "INP", value: 140, routeGroup: "case" } });
}

async function openLab(page: Page, request: APIRequestContext, path: string) {
  await expect(async () => {
    await seed(request);
    await page.goto(path, { waitUntil: "networkidle" });
    await expect(page.locator(SECTION).getByRole("table")).toBeVisible({ timeout: 5000 });
  }).toPass({ timeout: 90000 });
}

async function expectNoSeriousAxe(page: Page) {
  const results = await new AxeBuilder({ page })
    .include(SECTION)
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  const blocking = results.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
  expect(blocking, blocking.map((v) => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
}

test("the /lab dashboard shows p75, sample count and a rating per route group", async ({ page, request }) => {
  await openLab(page, request, "/en/lab");
  const section = page.locator(SECTION);
  const caseRow = section.getByRole("row").filter({ hasText: "Case pages" });
  await expect(caseRow).toContainText("3.5 s");
  await expect(caseRow).toContainText("Needs improvement");
  await expect(caseRow).toContainText(/n = \d+/);
  await expect(section).toContainText(/Last 30 days · \d+ samples · this server only/);

  const inp = section.getByRole("button", { name: "INP" });
  await inp.click();
  await expect(inp).toHaveAttribute("aria-pressed", "true");
  await expect(section.getByRole("list", { name: /30-day trend: INP/ })).toBeVisible();
});

test("the /lab dashboard passes axe in light and dark", async ({ page, request }) => {
  await openLab(page, request, "/en/lab");
  await expectNoSeriousAxe(page);
  await page.getByRole("button", { name: "Switch theme to dark mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expectNoSeriousAxe(page);
});

test("the /zh/lab dashboard is in Chinese and does not overflow at 390px", async ({ page, request }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openLab(page, request, "/zh/lab");
  const section = page.locator(SECTION);
  await expect(section.getByRole("row").filter({ hasText: "案例页" })).toContainText("需改进");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
