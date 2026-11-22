#!/usr/bin/env node
/**
 * Build-time generator for 3 curated static role PDF decks under `public/decks/*.pdf`.
 * Renders `/en/brief/print?role=<id>` using Chromium A4 print so every static PDF
 * uses identical Editorial Critique layout and crisp embedded SVG QR codes.
 *
 * Usage:
 *   pnpm decks:build
 */
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { chromium } from "@playwright/test";

const ROOT = process.cwd();
const DECKS_DIR = path.join(ROOT, "public", "decks");
const PORT = 3212;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const ROLES = ["ai-product-engineer", "design-engineer", "hardware-interaction"];
const MAX_DECK_BYTES = 600 * 1024;

async function waitForServer(url, timeoutMs = 45000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // booting
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function main() {
  if (!fs.existsSync(path.join(ROOT, ".next"))) {
    console.error("Missing .next build output. Run `pnpm build` before `pnpm decks:build`.");
    process.exit(1);
  }

  fs.mkdirSync(DECKS_DIR, { recursive: true });
  const nextBin = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");
  const server = spawn(process.execPath, [nextBin, "start", "-p", String(PORT)], {
    cwd: ROOT,
    stdio: "ignore",
  });

  try {
    await waitForServer(`${BASE_URL}/en/brief/print`);
    const browser = await chromium.launch();
    try {
      const page = await browser.newPage();
      for (const role of ROLES) {
        const url = `${BASE_URL}/en/brief/print?role=${role}`;
        await page.goto(url, { waitUntil: "networkidle" });
        await page.emulateMedia({ media: "print" });
        const outFile = path.join(DECKS_DIR, `${role}.pdf`);
        await page.pdf({
          path: outFile,
          format: "A4",
          printBackground: false,
          margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" },
        });
        const buf = fs.readFileSync(outFile);
        if (buf.subarray(0, 5).toString("ascii") !== "%PDF-") {
          throw new Error(`Invalid PDF generated for ${role}`);
        }
        if (buf.length > MAX_DECK_BYTES) {
          throw new Error(`Deck ${role}.pdf exceeds 600 KB budget (${buf.length} bytes)`);
        }
        console.log(`Generated public/decks/${role}.pdf (${(buf.length / 1024).toFixed(1)} KB)`);
      }
    } finally {
      await browser.close();
    }
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
