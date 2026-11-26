import { expect, test } from "@playwright/test";

test.describe("Modern Web Primitives & /lab Exhibition", () => {
  test("TransitionLink routes from /projects to case page and focuses h1", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en/projects");

    const walkieRow = page.locator('a.work-index-row[href="/projects/walkie"]');
    await walkieRow.click();

    await expect(page).toHaveURL(/\/projects\/walkie$/);
    await expect(page.locator("main h1")).toHaveAttribute("tabindex", "-1");
  });

  test("AnchorNote opens native popover and dismisses cleanly on Escape", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    // v6.6: term notes sit in the collapsed appendix; the hash opens it.
    await page.goto("/en/projects/walkie#for-interviewers");

    const trigger = page.locator(".anchor-note-trigger").first();
    await expect(trigger).toBeVisible();
    await trigger.click();

    const popoverId = await trigger.getAttribute("popovertarget");
    const popover = page.locator(`#${popoverId}`);
    await expect(popover).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(popover).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });

  test("/lab displays all 6 interaction primitives and holds 0px mobile overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en/lab");

    const tabs = page.locator('[role="tablist"][aria-label*="primitive" i] [role="tab"]');
    await expect(tabs).toHaveCount(6);

    await tabs.nth(4).click();
    await expect(page.locator(".lab-drag-card")).toBeVisible();

    await tabs.nth(5).click();
    await expect(page.locator(".lab-anchor-sandbox")).toBeVisible();

    await page.setViewportSize({ width: 375, height: 812 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
