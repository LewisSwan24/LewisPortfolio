#!/usr/bin/env node
/**
 * Self-audit gate verifying agentic readiness & public/unlisted surface invariants:
 * - Machine-readable endpoints exist (/llms.txt, /llms-full.txt, /.well-known/mcp.json, /api/mcp)
 * - Next.js rewrites and middleware exclude dotted discovery endpoints (.*\\..*)
 * - Unlisted case slugs never leak into semantic index ids or public route hints
 * - Run MCP & search/llms Vitest suites cleanly
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = process.cwd();

const REQUIRED_ROUTES = [
  "app/llms.txt/route.ts",
  "app/llms-full.txt/route.ts",
  "app/.well-known/mcp.json/route.ts",
  "app/api/mcp/route.ts",
  "app/robots.ts",
  "app/sitemap.ts",
];

for (const rel of REQUIRED_ROUTES) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) {
    console.error(`Missing agentic readiness route: ${rel}`);
    process.exit(1);
  }
}

const nextConfig = fs.readFileSync(path.join(ROOT, "next.config.js"), "utf-8");
const middleware = fs.readFileSync(path.join(ROOT, "middleware.ts"), "utf-8");
if (!nextConfig.includes(".*\\\\..*") || !middleware.includes(".*\\\\..*")) {
  console.error("next.config.js or middleware.ts must bypass locale rewrites for dotted machine-readable endpoints.");
  process.exit(1);
}

const semPath = path.join(ROOT, "src/data/ai/semantic-index.generated.json");
if (!fs.existsSync(semPath)) {
  console.error("Missing src/data/ai/semantic-index.generated.json — run `pnpm semantic:build`.");
  process.exit(1);
}

const sem = JSON.parse(fs.readFileSync(semPath, "utf-8"));
const UNLISTED = ["fencepost", "connect", "spectra", "rules", "gapmapper", "hoop", "pricewise"];
for (const key of Object.keys(sem.entries || {})) {
  const prefix = key.split(":")[0] || "";
  if (UNLISTED.includes(prefix)) {
    console.error(`Unlisted case slug leaked into semantic-index.generated.json: ${key}`);
    process.exit(1);
  }
}

const vitestBin = path.join(ROOT, "node_modules", "vitest", "vitest.mjs");
const testRun = spawnSync(
  process.execPath,
  [vitestBin, "run", "tests/lib/search-and-llms.test.ts", "tests/lib/mcp-protocol-invariants.test.ts"],
  { cwd: ROOT, stdio: "inherit" }
);

if (testRun.status !== 0) {
  process.exit(testRun.status ?? 1);
}

console.log(`Agent readiness check passed (${Object.keys(sem.entries || {}).length} semantic chunks, 0 leaks, MCP/LLMs contracts verified).`);
