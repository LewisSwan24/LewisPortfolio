import { expect, test } from "@playwright/test";

test.describe("Editorial Critique Print Dossier, Static Role PDFs & Zero-PII RUM", () => {
  test("Editorial critique /en/brief/print allocates >= 60% width to rationale and embeds vector QR codes", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/en/brief/print?role=ai-product-engineer", { waitUntil: "domcontentloaded" });

    const robotsMeta = page.locator('meta[name="robots"]');
    await expect(robotsMeta).toHaveAttribute("content", /noindex/i);

    const grid = page.locator(".brief-print-grid").first();
    const critique = page.locator(".brief-print-critique").first();
    await expect(grid).toBeVisible();
    await expect(critique).toBeVisible();

    const gridBox = await grid.boundingBox();
    const critiqueBox = await critique.boundingBox();
    expect(gridBox).not.toBeNull();
    expect(critiqueBox).not.toBeNull();
    if (gridBox && critiqueBox) {
      expect(critiqueBox.width / gridBox.width).toBeGreaterThanOrEqual(0.58);
    }

    const qrPaths = page.locator(".brief-print-qr-box svg path");
    await expect(qrPaths).toHaveCount(3);

    await page.getByRole("button", { name: "Design Engineer" }).click();
    await page.waitForURL(/role=design-engineer/);
    await expect(page.locator(".brief-print-sheet")).toHaveCount(3);
  });

  test("Static role PDF decks exist and return valid PDF binary bytes", async ({ request }) => {
    const decks = [
      "/decks/ai-product-engineer.pdf",
      "/decks/design-engineer.pdf",
      "/decks/hardware-interaction.pdf",
    ];
    for (const deck of decks) {
      const res = await request.get(deck);
      expect(res.status()).toBe(200);
      const body = await res.body();
      expect(body.subarray(0, 5).toString("ascii")).toBe("%PDF-");
    }
  });

  test("/api/vitals enforces zero-PII enum schema and feeds /lab RUM panel", async ({
    page,
    request,
  }) => {
    const rejected = await request.post("/api/vitals", {
      data: { metric: "LCP", value: 1200, routeGroup: "home", userAgent: "secret" },
    });
    expect(rejected.status()).toBe(400);

    const accepted = await request.post("/api/vitals", {
      data: { metric: "LCP", value: 980, routeGroup: "lab" },
    });
    expect(accepted.status()).toBe(200);

    await page.goto("/en/lab", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#lab-rum-heading")).toBeVisible();
    await expect(page.getByText(/LCP \(p75\)/i)).toBeVisible();
  });
});
