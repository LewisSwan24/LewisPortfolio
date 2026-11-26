import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("v5.1 Raw Research Vault, UQ/Swansea Education & Archive Vault", () => {
  test("verifies UQ & Swansea education in Resume Composer without stale Melbourne text", async ({
    page,
  }) => {
    await page.goto("/en/resume/compose", { waitUntil: "networkidle" });
    const sheet = page.getByTestId("resume-a4-sheet");
    await expect(sheet).toBeVisible();
    await expect(sheet).toContainText("The University of Queensland");
    await expect(sheet).toContainText("2025.02 – 2026.11");
    await expect(sheet).toContainText("Swansea University");
    await expect(sheet).toContainText("2020.09 – 2024.07");
    await expect(sheet).not.toContainText("University of Melbourne");
    await expect(sheet).not.toContainText("Melbourne");
  });

  test("interacts with tabbed Raw Research Vault on flagship cases and passes Axe AA", async ({
    page,
  }) => {
    // v6.6: the vault sits in the collapsed appendix; the hash opens it.
    await page.goto("/en/projects/walkie#research-vault", { waitUntil: "networkidle" });
    const vault = page.getByTestId("raw-research-vault");
    await expect(vault).toBeVisible();
    await expect(page.getByTestId("vault-panel-protocol")).toBeVisible();

    // Keyboard arrow navigation between tabs
    const tabProtocol = page.getByTestId("vault-tab-protocol");
    await tabProtocol.focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByTestId("vault-tab-logs")).toHaveAttribute("aria-selected", "true");
    await expect(page.getByTestId("vault-panel-logs")).toBeVisible();

    await page.getByTestId("vault-tab-tension").click();
    await expect(page.getByTestId("vault-panel-tension")).toBeVisible();

    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const blocking = axe.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
    expect(blocking).toEqual([]);
  });

  test("renders bilingual Archive Vault (/vault) with 7 autopsies, lineage filtering, Dark #141413 & Mobile 375px", async ({
    page,
  }) => {
    for (const route of ["/en/vault", "/zh/vault"]) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(route, { waitUntil: "networkidle" });
      await expect(page.getByTestId("vault-lineage-map")).toBeVisible();
      await expect(page.getByTestId("vault-autopsy-grid").locator("article")).toHaveCount(7);

      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const blocking = axe.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
      expect(blocking, `Axe violations on ${route}`).toEqual([]);
    }

    // Filter by category and lineage successor
    await page.goto("/en/vault", { waitUntil: "networkidle" });
    // Vigil (the only "abandoned" record) was removed on 2026-11-25; scoped-out now holds Fencepost alone.
    await page.getByTestId("vault-cat-scoped-out").click();
    await expect(page.getByTestId("vault-card-fencepost")).toBeVisible();
    await expect(page.getByTestId("vault-autopsy-grid").locator("article")).toHaveCount(1);

    await page.getByTestId("vault-cat-all").click();
    await page.getByTestId("lineage-filter-autofill").click();
    await expect(page.getByTestId("vault-card-fencepost")).toBeVisible();
    await expect(page.getByTestId("vault-card-pricewise")).toBeVisible();
    await expect(page.getByTestId("vault-card-spectra")).toBeVisible();
    await expect(page.getByTestId("vault-autopsy-grid").locator("article")).toHaveCount(4);

    // Dark mode check
    const toggle = page.getByRole("button", { name: /Switch theme to dark mode/i });
    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    // Mobile 375x812 0px overflow check
    await page.setViewportSize({ width: 375, height: 812 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
