import { test, expect } from "@playwright/test";

test.describe("Resume A4 Vector PDF Export", () => {
  for (const locale of ["en", "zh"] as const) {
    test(`exports valid non-empty A4 PDF for /${locale}/resume`, async ({ page }) => {
      await page.goto(`/${locale}/resume`, { waitUntil: "networkidle" });
      await expect(page.locator("main[data-screen-label='05 Resume']")).toBeVisible();
      await page.emulateMedia({ media: "print" });

      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: false,
        margin: { top: "14mm", right: "14mm", bottom: "14mm", left: "14mm" },
      });

      expect(pdfBuffer.subarray(0, 5).toString("ascii")).toBe("%PDF-");
      expect(pdfBuffer.length).toBeGreaterThan(8 * 1024);
    });
  }
});
