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
const OUT_DIRS = [
  path.join(ROOT, "public", "resume"),
  path.join(ROOT, "output", "resume"),
];
const PORT = 3211;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const MIN_PDF_BYTES = 8 * 1024;

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

function assertValidPdf(filePath) {
  const buf = fs.readFileSync(filePath);
  if (buf.subarray(0, 5).toString("ascii") !== "%PDF-") {
    throw new Error(`Generated file is not a valid PDF document: ${filePath}`);
  }
  if (buf.length < MIN_PDF_BYTES) {
    throw new Error(`Generated PDF suspiciously small (${buf.length} bytes): ${filePath}`);
  }
  return buf.length;
}

async function main() {
  if (!fs.existsSync(path.join(ROOT, ".next"))) {
    console.error("Missing .next build output. Run `pnpm build` before `pnpm resume:pdf`.");
    process.exit(1);
  }

  for (const dir of OUT_DIRS) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const nextBin = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");
  const server = spawn(process.execPath, [nextBin, "start", "-p", String(PORT)], {
    cwd: ROOT,
    stdio: "ignore",
  });

  try {
    await waitForServer(`${BASE_URL}/en/resume`);
    let browser;
    try {
      browser = await chromium.launch();
    } catch (err) {
      throw new Error(
        `Failed to launch Playwright Chromium (${err instanceof Error ? err.message : String(err)}). Run \`pnpm exec playwright install chromium\` first.`
      );
    }

    try {
      const page = await browser.newPage();
      for (const locale of ["en", "zh"]) {
        const url = `${BASE_URL}/${locale}/resume`;
        await page.goto(url, { waitUntil: "networkidle" });
        await page.emulateMedia({ media: "print" });
        // A CV that leaves the site must carry its owner's name and a way to reply, and must not
        // print web-only controls. CJK text uses system fonts so the PDF text layer stays
        // extractable for ATS parsers (the web font subset produced unmappable glyphs).
        await page.evaluate((loc) => {
          const main = document.querySelector("main") ?? document.body;
          const head = document.createElement("header");
          head.setAttribute("data-pdf-contact", "");
          head.style.cssText = "margin:0 0 10px;padding-bottom:6px;border-bottom:1px solid #999;";
          const name = loc === "zh" ? "董子铭 Ziming (Lewis) Dong" : "Ziming (Lewis) Dong";
          head.innerHTML =
            `<div style="font-size:20px;font-weight:600;line-height:1.2">${name}</div>` +
            `<div style="font-size:11px;margin-top:3px">24kplo@gmail.com · lewisdong.vercel.app · github.com/LewisSwan24 · Brisbane</div>`;
          main.prepend(head);
          const webOnly = /^(Print|打印|Customize Dossier|Tailor CV|定制|Contact for PDF|Download PDF CV|下载 PDF|Open hiring dossier|Interrogate Rationale AI Lab|Check the fit|在 AI 实验室)/i;
          for (const el of document.querySelectorAll("main a, main button")) {
            if (webOnly.test((el.textContent || "").trim())) el.style.display = "none";
          }
          const style = document.createElement("style");
          style.textContent = `*{font-family:"Microsoft YaHei","PingFang SC","Noto Sans SC",Arial,sans-serif !important}`;
          document.head.appendChild(style);
        }, locale);
        const publicFile = path.join(OUT_DIRS[0], `lewis-dong-resume-${locale}.pdf`);
        await page.pdf({
          path: publicFile,
          format: "A4",
          printBackground: false,
          margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" },
        });
        const outputFile = path.join(OUT_DIRS[1], `lewis-dong-resume-${locale}.pdf`);
        fs.copyFileSync(publicFile, outputFile);
        const bytes = assertValidPdf(publicFile);
        console.log(`Generated ${path.relative(ROOT, publicFile)} & ${path.relative(ROOT, outputFile)} (${(bytes / 1024).toFixed(1)} KB, %PDF verified)`);
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
