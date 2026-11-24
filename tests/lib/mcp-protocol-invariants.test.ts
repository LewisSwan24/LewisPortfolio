import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  buildMcpManifest,
  handleMcpRpcRequest,
  MCP_TOOL_NAMES,
} from "@/lib/mcp/server";
import { buildLlmsFullTxt, buildLlmsTxt } from "@/lib/llms";
import { redactPii } from "@/lib/ai/redact-jd";
import { auditTranslationese } from "@/lib/i18n/editorial-voice";
import { LISTED_PROJECT_SLUGS, UNLISTED_PROJECT_SLUGS } from "@/lib/project-routes";

describe("v5.6 MCP Agent Protocol, llms-full.txt & Security Invariants", () => {
  it("exposes 5 read-only typed MCP tools and clean discovery manifest", () => {
    const manifest = buildMcpManifest();
    expect(manifest.protocolVersion).toBe("2025-03-26");
    expect(manifest.serverInfo.name).toBe("lewis-dong-portfolio-mcp");
    expect(manifest.endpoint).toBe("/api/mcp");
    expect(manifest.tools.map((t) => t.name)).toEqual([...MCP_TOOL_NAMES]);
    expect(manifest.tools).toHaveLength(5);

    const serialized = JSON.stringify(manifest);
    for (const unlisted of UNLISTED_PROJECT_SLUGS) {
      expect(serialized).not.toContain(`/projects/${unlisted}`);
    }

    for (const tool of manifest.tools) {
      expect(auditTranslationese(tool.description, "en")).toEqual([]);
    }
  });

  it("handles JSON-RPC initialize, tools/list, and strict input rejection", async () => {
    const initRes = await handleMcpRpcRequest({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: { clientInfo: { name: "vitest", version: "1.0" } },
    });
    expect(initRes.error).toBeUndefined();
    expect((initRes.result as { capabilities: { tools: object } }).capabilities.tools).toBeDefined();

    const listRes = await handleMcpRpcRequest({
      jsonrpc: "2.0",
      id: 2,
      method: "tools/list",
    });
    expect((listRes.result as { tools: unknown[] }).tools).toHaveLength(5);

    // Reject unknown field via Zod .strict()
    const badRes = await handleMcpRpcRequest({
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: {
        name: "search_portfolio_evidence",
        arguments: { query: "walkie", locale: "en", injectedEvilKey: true },
      },
    });
    expect(badRes.error?.code).toBe(-32602);
  });

  it("enforces unlisted isolation on search_portfolio_evidence & inspect_case_tradeoff while supporting audit_vault_lineage", async () => {
    for (const probe of ["Spectra colorblind", "Vigil telemetry", "Fencepost dashboard"]) {
      const searchRes = await handleMcpRpcRequest({
        jsonrpc: "2.0",
        id: probe,
        method: "tools/call",
        params: {
          name: "search_portfolio_evidence",
          arguments: { query: probe, locale: "en", limit: 6 },
        },
      });
      const payload = JSON.stringify(searchRes.result);
      for (const unlisted of UNLISTED_PROJECT_SLUGS) {
        expect(payload).not.toContain(`"/projects/${unlisted}"`);
        expect(payload).not.toContain(`"caseSlug":"${unlisted}"`);
      }
    }

    // inspect_case_tradeoff works on listed flagships and refuses unlisted slugs cleanly
    const listedRes = await handleMcpRpcRequest({
      jsonrpc: "2.0",
      id: "walkie",
      method: "tools/call",
      params: {
        name: "inspect_case_tradeoff",
        arguments: { slug: "walkie", locale: "zh" },
      },
    });
    const text = ((listedRes.result as { content: Array<{ text: string }> }).content[0]?.text) ?? "";
    expect(text).toContain("Walkie");
    expect(auditTranslationese(text, "zh")).toEqual([]);

    const unlistedBlocked = await handleMcpRpcRequest({
      jsonrpc: "2.0",
      id: "blocked",
      method: "tools/call",
      params: {
        name: "inspect_case_tradeoff",
        arguments: { slug: "spectra", locale: "en" },
      },
    });
    expect((unlistedBlocked.result as { isError?: boolean }).isError).toBe(true);

    // audit_vault_lineage explicitly flags archived-unlisted status and successor mapping
    const vaultRes = await handleMcpRpcRequest({
      jsonrpc: "2.0",
      id: "vault",
      method: "tools/call",
      params: {
        name: "audit_vault_lineage",
        arguments: { slug: "vigil", locale: "en" },
      },
    });
    const vaultText = ((vaultRes.result as { content: Array<{ text: string }> }).content[0]?.text) ?? "";
    expect(vaultText).toContain("archived-unlisted");
    expect(vaultText).toContain("autofill");
  });

  it("supports get_protocol_replay_frame & compose_tailored_brief + PII secret fuzz scrubbing", async () => {
    const fuzzInput =
      "Hire for Walkie https://internal.corp/secret contact jane.doe@acme.io +61 412 345 678 token sk-proj-abc1234567890xyz and Bearer eyJhbGciOiJIUzI1NiJ9.foo.bar ghp_9876543210abcdef123456";
    const scrubbed = redactPii(fuzzInput);
    expect(scrubbed.sanitized).not.toContain("jane.doe@acme.io");
    expect(scrubbed.sanitized).not.toContain("412 345 678");
    expect(scrubbed.sanitized).not.toContain("sk-proj-");
    expect(scrubbed.sanitized).not.toContain("ghp_987654");
    expect(scrubbed.sanitized).not.toContain("eyJhbGciOiJIUzI1NiJ9");
    expect(scrubbed.redactedCount).toBeGreaterThanOrEqual(5);

    const replayRes = await handleMcpRpcRequest({
      jsonrpc: "2.0",
      id: "replay",
      method: "tools/call",
      params: {
        name: "get_protocol_replay_frame",
        arguments: { slug: "walkie", mode: "fault", locale: "en" },
      },
    });
    const replayText = ((replayRes.result as { content: Array<{ text: string }> }).content[0]?.text) ?? "";
    expect(replayText).toContain("AES-256-GCM");

    const briefRes = await handleMcpRpcRequest({
      jsonrpc: "2.0",
      id: "brief",
      method: "tools/call",
      params: {
        name: "compose_tailored_brief",
        arguments: { role: "design-tech", market: "apac-closed-loop", locale: "zh" },
      },
    });
    const briefText = ((briefRes.result as { content: Array<{ text: string }> }).content[0]?.text) ?? "";
    expect(briefText).toContain("APAC");
    expect(auditTranslationese(briefText, "zh")).toEqual([]);
  });

  it("generates /llms-full.txt cleanly without unlisted routes and keeps middleware/rewrites immune for static discovery files", async () => {
    const [summary, full] = await Promise.all([buildLlmsTxt(), buildLlmsFullTxt()]);
    expect(summary).toMatch(/v5\.[6-9]|v6\.0/);
    expect(summary).toContain("/.well-known/mcp.json");
    expect(summary).toContain("/llms-full.txt");

    expect(full.length).toBeGreaterThan(summary.length);
    for (const listed of LISTED_PROJECT_SLUGS) {
      expect(full).toContain(`/projects/${listed}`);
    }
    for (const unlisted of UNLISTED_PROJECT_SLUGS) {
      expect(full).not.toContain(`/projects/${unlisted}`);
    }

    // Verify next.config.js & middleware.ts keep dot-paths unrewritten
    const nextConfig = fs.readFileSync(path.join(process.cwd(), "next.config.js"), "utf-8");
    const middleware = fs.readFileSync(path.join(process.cwd(), "middleware.ts"), "utf-8");
    expect(nextConfig).toContain(".*\\\\..*");
    expect(middleware).toContain(".*\\\\..*");
  });
});
