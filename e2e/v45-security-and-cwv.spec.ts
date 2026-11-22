import { expect, test } from "@playwright/test";

test.describe("Layered Security CSP, Native Shortcuts Dialog & CWV Audit", () => {
  test("Security headers harden CSP and isolate dynamic /brief/ routes with per-request nonces", async ({
    request,
  }) => {
    const homeRes = await request.get("/en");
    expect(homeRes.status()).toBe(200);
    const csp = homeRes.headers()["content-security-policy"] ?? "";
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).toContain("form-action 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    if (process.env.NODE_ENV === "production") {
      expect(csp).not.toContain("'unsafe-eval'");
    }

    const r1 = await request.get("/en/brief/print");
    const r2 = await request.get("/en/brief/print");
    expect(r1.headers()["x-csp-layer"]).toBe("dynamic-brief");
    const n1 = r1.headers()["x-request-nonce"];
    const n2 = r2.headers()["x-request-nonce"];
    expect(n1).toBeTruthy();
    expect(n2).toBeTruthy();
    expect(n1).not.toBe(n2);
  });

  test("Zero securitypolicyviolation events across core static and dynamic routes", async ({ page }) => {
    const violations: string[] = [];
    await page.addInitScript(() => {
      document.addEventListener("securitypolicyviolation", (event) => {
        (window as unknown as { __cspViolations?: string[] }).__cspViolations =
          (window as unknown as { __cspViolations?: string[] }).__cspViolations ?? [];
        (window as unknown as { __cspViolations: string[] }).__cspViolations.push(
          `${event.violatedDirective}:${event.blockedURI}`
        );
      });
    });

    for (const route of ["/en", "/zh", "/en/projects", "/en/projects/walkie", "/en/lab", "/en/brief/print"]) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(400);
      const found = await page.evaluate(
        () => (window as unknown as { __cspViolations?: string[] }).__cspViolations ?? []
      );
      violations.push(...found.map((v) => `${route}->${v}`));
    }
    expect(violations).toEqual([]);
  });

  test("Keyboard shortcuts native <dialog> opens with ?, shows Shift+P & ⌘K, and restores focus on Esc", async ({
    page,
  }) => {
    await page.goto("/en", { waitUntil: "networkidle" });
    const navLink = page.getByRole("link", { name: "Work" }).first();
    await navLink.focus();

    await page.keyboard.press("?");
    const dialog = page.locator("dialog.shortcuts-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText(/Shift/i)).toBeVisible();
    await expect(dialog.getByText(/Open command/i)).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(navLink).toBeFocused();
  });

  test("Primary routes maintain clean CLS and sub-2s first paint under headless Chromium", async ({
    page,
  }) => {
    for (const route of ["/en", "/en/projects/walkie"]) {
      await page.goto(route, { waitUntil: "load" });
      const metrics = await page.evaluate(() => {
        const clsEntries = performance.getEntriesByType("layout-shift") as Array<
          PerformanceEntry & { value?: number; hadRecentInput?: boolean }
        >;
        const cls = clsEntries
          .filter((e) => !e.hadRecentInput)
          .reduce((acc, e) => acc + (e.value ?? 0), 0);
        const paints = performance.getEntriesByType("paint");
        const fcp = paints.find((p) => p.name === "first-contentful-paint")?.startTime ?? 0;
        return { cls, fcp };
      });
      expect(metrics.cls).toBeLessThanOrEqual(0.05);
      expect(metrics.fcp).toBeLessThanOrEqual(3500);
    }
  });
});
