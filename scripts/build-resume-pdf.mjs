#!/usr/bin/env node
/**
 * Build-time bilingual A4 vector PDF resume generator.
 * Renders the live `/en/resume` and `/zh/resume` routes using Playwright's
 * Chromium print engine so exported PDFs stay 100% synced with the web resume.
 *
 * Usage:
 *   pnpm resume:pdf
 * Outputs:
 *   output/resume/lewis-dong-resume-en.pdf
 *   output/resume/lewis-dong-resume-zh.pdf
 */
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { chromium } from "@playwright/test";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "output", "resume");
const PORT = 3211;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function waitForServer(url, timeoutMs = 45000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // Server still booting
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function main() {
  if (!fs.existsSync(path.join(ROOT, ".next"))) {
    console.error("Missing .next build output. Run `pnpm build` before `pnpm resume:pdf`.");
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const nextBin = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");
  const server = spawn(process.execPath, [nextBin, "start", "-p", String(PORT)], {
    cwd: ROOT,
    stdio: "ignore",
  });

  try {
    await waitForServer(`${BASE_URL}/en/resume`);
    const browser = await chromium.launch();
    try {
      const page = await browser.newPage();
      for (const locale of ["en", "zh"]) {
        const url = `${BASE_URL}/${locale}/resume`;
        await page.goto(url, { waitUntil: "networkidle" });
        await page.emulateMedia({ media: "print" });
        const outFile = path.join(OUT_DIR, `lewis-dong-resume-${locale}.pdf`);
        await page.pdf({
          path: outFile,
          format: "A4",
          printBackground: false,
          margin: { top: "14mm", right: "14mm", bottom: "14mm", left: "14mm" },
        });
        const kb = (fs.statSync(outFile).size / 1024).toFixed(1);
        console.log(`Generated ${path.relative(ROOT, outFile)} (${kb} KB)`);
      }
    } finally {
      await browser.close();
    }
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
