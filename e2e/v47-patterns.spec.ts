import { expect, test } from "@playwright/test";

test.describe("v4.7 Interaction Pattern Atlas & 6 New Bilingual Essays", () => {
  test("Top bar stays locked at 7 items while /projects and /lab surface /patterns", async ({
    page,
  }) => {
    await page.goto("/en/projects", { waitUntil: "networkidle" });
    await expect(page.locator("header nav a")).toHaveCount(7);
    await expect(page.locator("main a[href='/patterns']").filter({ visible: true })).toBeVisible();

    await page.goto("/en/lab", { waitUntil: "networkidle" });
    await expect(page.locator("main a[href='/patterns']")).toBeVisible();
  });

  test("/en/patterns supports category filtering, ?pattern URL sync, anti-pattern toggle & copy feedback", async ({
    page,
  }) => {
    await page.goto("/en/patterns", { waitUntil: "networkidle" });

    await expect(page.getByTestId("pattern-active-title")).toContainText(
      "Physical Key Commitment Gate"
    );
    await expect(page.getByTestId("pattern-live-sandbox")).toBeVisible();

    await page.getByRole("button", { name: "AI Boundaries", exact: true }).click();
    await page
      .getByRole("button", { name: /Three-Tier Confidence Split/i })
      .click();

    await expect(page).toHaveURL(/\/(?:en\/)?patterns\?pattern=three-tier-confidence-split/);
    await expect(page.getByTestId("pattern-active-title")).toContainText(
      "Three-Tier Confidence Split"
    );

    const antiBtn = page.getByRole("button", { name: "Common Anti-Pattern" });
    await antiBtn.click();
    await expect(antiBtn).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByTestId("pattern-compare-box")).toHaveAttribute(
      "data-mode",
      "anti-pattern"
    );

    await page.getByRole("button", { name: "Copy snippet" }).click();
    await expect(page.getByTestId("pattern-copy-status")).not.toBeEmpty();
  });

  test("/zh/patterns and 6 new EN/ZH essays render cleanly with 0px mobile overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/zh/patterns", { waitUntil: "networkidle" });
    await expect(page.getByTestId("pattern-active-title")).toContainText("实体按键确权门控");

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);

    await page.goto("/en/blog/five-state-interface-audits", { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toContainText("Five-State Interface Audits");

    await page.goto("/zh/blog/bilingual-design-systems-without-drift", {
      waitUntil: "networkidle",
    });
    await expect(page.locator("h1")).toContainText("不漂移的双语技术作品集");
  });
});
