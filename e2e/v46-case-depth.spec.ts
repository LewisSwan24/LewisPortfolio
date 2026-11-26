import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { LISTED_PROJECT_SLUGS } from "../src/lib/project-routes";

// v6.5 removed the Review Lens switcher (review row 05); its test went with it.
// v6.6: journey and rejection archive moved into the collapsed "For
// interviewers" appendix; the state matrix became a five-row table under
// "Built and tested" with capitalised state names.
test.describe("v4.6 Case Study Depth Modules", () => {
  for (const slug of LISTED_PROJECT_SLUGS) {
    test(`/en/projects/${slug} renders Journey, 5-State Matrix & Rejection Archive`, async ({
      page,
    }) => {
      await page.goto(`/en/projects/${slug}`, { waitUntil: "networkidle" });

      const journeyItems = page.locator("#journey-map ol > li");
      const stageCount = await journeyItems.count();
      expect(stageCount).toBeGreaterThanOrEqual(5);

      const matrixRows = page.locator("#state-matrix table tbody tr");
      await expect(matrixRows).toHaveCount(5);
      for (const stateName of ["normal", "empty", "offline", "error", "refused"]) {
        await expect(page.locator("#state-matrix table").getByText(new RegExp(`^${stateName}$`, "i"))).toBeVisible();
      }

      const rejectionItems = page.locator("#rejection-archive ol > li");
      const rejCount = await rejectionItems.count();
      expect(rejCount).toBeGreaterThanOrEqual(2);
    });
  }

  test("ZH locale renders symmetric deep modules on /zh/projects/onthebeat", async ({ page }) => {
    await page.goto("/zh/projects/onthebeat", { waitUntil: "networkidle" });
    await expect(page.locator("#journey-map h3").first()).toContainText("一步步怎么做出来");
    await expect(page.locator("#state-matrix table tbody tr")).toHaveCount(5);
    await expect(page.locator("#rejection-archive h3").first()).toContainText("被我丢掉的版本");
  });

  test("Desktop Light/Dark & 375px Mobile have zero axe-core critical/serious violations and 0px horizontal overflow", async ({
    page,
  }) => {
    test.setTimeout(60_000);
    await page.goto("/en/projects/autofill", { waitUntil: "networkidle" });

    const lightAxe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      lightAxe.violations.filter((v) => v.impact === "critical" || v.impact === "serious")
    ).toEqual([]);

    const toggle = page.getByRole("button", { name: "Switch theme to dark mode" });
    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    const darkAxe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      darkAxe.violations.filter((v) => v.impact === "critical" || v.impact === "serious")
    ).toEqual([]);

    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/en/projects/walkie", { waitUntil: "networkidle" });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);

    const mobileAxe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      mobileAxe.violations.filter((v) => v.impact === "critical" || v.impact === "serious")
    ).toEqual([]);
  });
});
