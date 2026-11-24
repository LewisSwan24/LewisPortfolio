import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("v5.4+ Monograph Library & Cluster Filtering", () => {
  test("displays all 30 published essays and filters by Monograph Cluster in EN and ZH", async ({
    page,
  }) => {
    await page.goto("/en/blog", { waitUntil: "networkidle" });
    await expect(page.locator(".idx-flag")).toHaveCount(30);
    await expect(page.getByTestId("blog-cluster-all")).toContainText("All 30");

    await page.getByTestId("blog-cluster-ai-safety").click();
    const aiCount = await page.locator(".idx-flag").count();
    expect(aiCount).toBeGreaterThanOrEqual(6);
    expect(aiCount).toBeLessThan(30);

    await page.getByTestId("blog-cluster-physical-computing").click();
    const physCount = await page.locator(".idx-flag").count();
    expect(physCount).toBeGreaterThanOrEqual(5);

    await page.getByTestId("blog-cluster-all").click();
    await expect(page.locator(".idx-flag")).toHaveCount(30);

    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(axe.violations.filter((v) => v.impact === "critical" || v.impact === "serious")).toEqual(
      []
    );
  });

  test("renders new Chinese monographs, Dark #141413, and Mobile 375px zero overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/zh/blog", { waitUntil: "networkidle" });
    await expect(page.locator(".idx-flag")).toHaveCount(30);
    await page.getByTestId("blog-cluster-bilingual-systems").click();
    await expect(page.locator(".idx-flag").first()).toContainText("双语");

    // Open one new monograph
    await page.goto("/zh/blog/swansea-cs-to-uq-physical-computing", { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toContainText("斯旺西");

    const darkBtn = page.getByRole("button", { name: /Switch theme to dark mode|切换.*暗/i });
    if (await darkBtn.isVisible()) await darkBtn.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await page.setViewportSize({ width: 375, height: 812 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
