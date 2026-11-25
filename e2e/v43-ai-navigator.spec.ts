import { expect, test } from "@playwright/test";

test.describe("Grounded Design-Defense AI Navigator & Essay #2", () => {
  test("/hire JdMatcherPanel scrubs PII locally, cites static proof, and exports a matched tailored brief", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en/hire", { waitUntil: "networkidle" });

    await page.fill(
      "#jd-matcher-input",
      "Email recruiter@acme.org or call +61 412 345 678. Looking for AI UX designer building refusal boundaries and default Not now safety gates."
    );
    await page.fill("#jd-company-input", "Acme Design Lab");
    await page.getByRole("button", { name: /Match grounded evidence/i }).click();

    const status = page.locator("#jd-matcher [role='status']");
    await expect(status).toContainText(/Redacted 2 PII field/i, { timeout: 10000 });

    const exportBtn = page.getByRole("button", { name: /Export matched cases to tailored brief/i });
    await expect(exportBtn).toBeVisible();
    await exportBtn.click();

    const openLink = page.getByRole("link", { name: /Open matched brief/i });
    await expect(openLink).toBeVisible({ timeout: 10000 });
    await openLink.click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Acme Design Lab");
  });

  test("Cmd+K dual-mode CommandPalette queries grounded rationale in ZH", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/zh", { waitUntil: "networkidle" });
    await page.locator("header.pd-nav").waitFor({ state: "visible" });
    await page.locator("#main-content").click({ position: { x: 10, y: 10 } });

    await page.keyboard.press("Control+k");
    const dialog = page.getByRole("dialog", { name: "命令面板" });
    await expect(dialog).toBeVisible({ timeout: 10000 });

    await dialog.getByRole("button", { name: "问设计理由" }).click();
    await dialog.getByRole("button", { name: /Lamplight 与 Autofill/i }).click();

    await expect(
      dialog.getByRole("link", { name: /直达案例论证|阅读专栏原文|查看论证原文/i }).first()
    ).toBeVisible({
      timeout: 10000,
    });
  });

  test("Essay #2 cognitive-sovereignty-and-default-refusal renders in EN & ZH", async ({ page }) => {
    for (const url of [
      "/en/blog/cognitive-sovereignty-and-default-refusal",
      "/zh/blog/cognitive-sovereignty-and-default-refusal",
    ]) {
      await page.goto(url, { waitUntil: "networkidle" });
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator(".v4-reading-grid")).toBeVisible();
    }
  });
});
