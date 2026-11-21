import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const AUDIT_ROUTES = [
  "/en",
  "/zh",
  "/en/projects",
  "/en/projects/walkie",
  "/en/projects/fencepost",
  "/en/lab",
  "/en/hire",
  "/en/resume",
  "/en/contact",
];

test.describe("WCAG 2.1 AA Automated Accessibility Audit", () => {
  for (const route of AUDIT_ROUTES) {
    test(`zero critical or serious axe violations on ${route}`, async ({ page }) => {
      await page.goto(route, { waitUntil: "networkidle" });
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      const blocking = results.violations.filter(
        (v) => v.impact === "critical" || v.impact === "serious"
      );

      expect(
        blocking,
        blocking.map((v) => `[${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nodes)`).join("\n")
      ).toEqual([]);
    });
  }
});
