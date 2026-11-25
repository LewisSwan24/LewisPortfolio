import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const AUDIT_ROUTES = [
  "/en",
  "/zh",
  "/en/projects",
  "/en/patterns",
  "/en/projects/walkie",
  "/en/projects/lamplight",
  "/en/lab",
  "/en/ai",
  "/zh/ai",
  "/en/about",
  "/en/hire",
  "/en/interview",
  "/en/vault",
  "/zh/vault",
  "/en/studio/replay",
  "/zh/studio/replay",
  "/en/blog",
  "/zh/blog",
  "/en/resume",
  "/en/resume/compose",
  "/en/contact",
];

const DARK_AND_MOBILE_ROUTES = [
  "/en",
  "/en/projects",
  "/en/patterns",
  "/en/projects/walkie",
  "/en/projects/lamplight",
  "/en/lab",
  "/en/ai",
  "/en/hire",
  "/en/interview",
  "/en/vault",
  "/en/studio/replay",
  "/en/blog",
  "/en/resume",
  "/en/resume/compose",
];

async function runAxeAudit(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  const blocking = results.violations.filter(
    (v) => v.impact === "critical" || v.impact === "serious"
  );

  expect(
    blocking,
    blocking
      .map((v) => `[${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nodes)`)
      .join("\n")
  ).toEqual([]);
}

test.describe("WCAG 2.1 AA Automated Accessibility Audit", () => {
  for (const route of AUDIT_ROUTES) {
    test(`desktop light mode: zero critical/serious violations on ${route}`, async ({ page }) => {
      await page.goto(route, { waitUntil: "networkidle" });
      await runAxeAudit(page);
    });
  }

  for (const route of DARK_AND_MOBILE_ROUTES) {
    test(`desktop dark mode (#141413): zero critical/serious violations on ${route}`, async ({
      page,
    }) => {
      await page.goto(route, { waitUntil: "networkidle" });
      const toggle = page.getByRole("button", { name: "Switch theme to dark mode" });
      await expect(toggle).toBeVisible();
      await toggle.click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      await runAxeAudit(page);
    });
  }

  for (const route of DARK_AND_MOBILE_ROUTES) {
    test(`mobile (375x812): zero critical/serious violations on ${route}`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(route, { waitUntil: "networkidle" });
      await runAxeAudit(page);
    });
  }
});
