import { expect, test } from "@playwright/test";

test.describe("v5.6 MCP Agent Protocol, /llms-full.txt & Sandbox Workbench", () => {
  test("serves /.well-known/mcp.json, /llms-full.txt, OPTIONS & POST /api/mcp with strict unlisted isolation", async ({
    request,
  }) => {
    const manifestRes = await request.get("/.well-known/mcp.json");
    expect(manifestRes.status()).toBe(200);
    const manifest = await manifestRes.json();
    expect(manifest.readOnly).toBe(true);
    expect(manifest.tools).toHaveLength(5);

    const llmsFullRes = await request.get("/llms-full.txt");
    expect(llmsFullRes.status()).toBe(200);
    const fullText = await llmsFullRes.text();
    expect(fullText).toContain("/en/projects/walkie");
    expect(fullText).toContain("Hardware Replay Trace:");
    expect(fullText).not.toContain("/projects/spectra");
    expect(fullText).not.toContain("/projects/vigil");

    const preflight = await request.fetch("/api/mcp", { method: "OPTIONS" });
    expect(preflight.status()).toBe(204);
    expect(preflight.headers()["access-control-allow-methods"]).toContain("POST");

    const listRes = await request.post("/api/mcp", {
      data: { jsonrpc: "2.0", id: "e2e-list", method: "tools/list" },
    });
    expect(listRes.status()).toBe(200);
    const listData = await listRes.json();
    expect(listData.result.tools).toHaveLength(5);

    const searchRes = await request.post("/api/mcp", {
      data: {
        jsonrpc: "2.0",
        id: "e2e-search",
        method: "tools/call",
        params: {
          name: "search_portfolio_evidence",
          arguments: {
            query: "Spectra walkie token sk-proj-secret1234567890abcd",
            locale: "en",
            limit: 4,
          },
        },
      },
    });
    expect(searchRes.status()).toBe(200);
    const searchJson = await searchRes.json();
    const contentText = searchJson.result.content[0].text as string;
    expect(contentText).toContain("[redacted-secret]");
    expect(contentText).not.toContain("/projects/spectra");

    const blockedRes = await request.post("/api/mcp", {
      data: {
        jsonrpc: "2.0",
        id: "e2e-blocked",
        method: "tools/call",
        params: {
          name: "inspect_case_tradeoff",
          arguments: { slug: "vigil", locale: "en" },
        },
      },
    });
    const blockedData = await blockedRes.json();
    expect(blockedData.result.isError).toBe(true);
  });

  test("interacts with MCP Protocol Sandbox on /en/ai and /zh/ai across Light, Dark #141413, and Mobile 375px", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en/ai", { waitUntil: "networkidle" });

    await page.getByTestId("mcp-tool-inspect_case_tradeoff").click();
    await page.getByTestId("mcp-run-btn").click();
    await expect(page.getByTestId("mcp-response-pre")).toContainText("Walkie");

    // Dark #141413 parity on /zh/ai
    await page.goto("/zh/ai", { waitUntil: "networkidle" });
    // Before hydration the toggle is a disabled "Loading color mode" placeholder,
    // so a one-shot isVisible() check raced it and skipped the click (CI run
    // 45813420189). Wait for the real button, then switch only if still light.
    const toggle = page.getByRole("button", { name: /Switch theme to (dark|light) mode/i }).first();
    await expect(toggle).toBeVisible();
    if ((await toggle.getAttribute("aria-label"))?.includes("dark")) await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await page.getByTestId("mcp-tool-audit_vault_lineage").click();
    await page.getByTestId("mcp-run-btn").click();
    await expect(page.getByTestId("mcp-response-pre")).toContainText("archived-unlisted");

    // Mobile 375px zero overflow
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(250);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
