#!/usr/bin/env node
/**
 * Idempotent media optimization & budget gate for public/projects/**.
 *
 * Modes:
 *   node scripts/optimize-media.mjs          -> optimize oversized images & mp4 in-place
 *   node scripts/optimize-media.mjs --check  -> enforce per-folder & total size budgets
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const ROOT = process.cwd();
const PROJECTS_DIR = path.join(ROOT, "public", "projects");
const CHECK_ONLY = process.argv.includes("--check");

const IMAGE_THRESHOLD_BYTES = 250 * 1024;
const VIDEO_THRESHOLD_BYTES = 1.5 * 1024 * 1024;
const MAX_WIDTH = 1600;
const FOLDER_BUDGET_BYTES = 3.0 * 1024 * 1024;
const TOTAL_BUDGET_BYTES = 12.0 * 1024 * 1024;

function walkFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, out);
    else out.push(full);
  }
  return out;
}

function fmtMB(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function fmtKB(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const before = fs.statSync(filePath).size;
  if (before < IMAGE_THRESHOLD_BYTES) return { saved: 0 };

  const input = fs.readFileSync(filePath);
  const meta = await sharp(input).metadata();
  const pipeline = sharp(input).rotate();
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  let output;
  if (ext === ".png") {
    output = await pipeline
      .png({ compressionLevel: 9, palette: true, quality: 85, effort: 10 })
      .toBuffer();
  } else if (ext === ".jpg" || ext === ".jpeg") {
    output = await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  } else {
    return { saved: 0 };
  }

  if (output.length < before * 0.95) {
    fs.writeFileSync(filePath, output);
    const rel = path.relative(ROOT, filePath).replace(/\\/g, "/");
    console.log(`  OPT IMAGE: ${rel}  ${fmtKB(before)} -> ${fmtKB(output.length)}`);
    return { saved: before - output.length };
  }
  return { saved: 0 };
}

function optimizeVideo(filePath) {
  const before = fs.statSync(filePath).size;
  if (before < VIDEO_THRESHOLD_BYTES) return { saved: 0 };

  const tmp = `${filePath}.opt.mp4`;
  try {
    execFileSync(
      "ffmpeg",
      [
        "-y",
        "-i",
        filePath,
        "-c:v",
        "libx264",
        "-crf",
        "32",
        "-maxrate",
        "420k",
        "-bufsize",
        "840k",
        "-preset",
        "slow",
        "-r",
        "24",
        "-pix_fmt",
        "yuv420p",
        "-vf",
        "scale='min(854,iw)':-2",
        "-movflags",
        "+faststart",
        "-c:a",
        "aac",
        "-b:a",
        "64k",
        tmp,
      ],
      { stdio: "ignore" }
    );
    const after = fs.statSync(tmp).size;
    if (after < before * 0.9) {
      fs.renameSync(tmp, filePath);
      const rel = path.relative(ROOT, filePath).replace(/\\/g, "/");
      console.log(`  OPT VIDEO: ${rel}  ${fmtKB(before)} -> ${fmtKB(after)}`);
      return { saved: before - after };
    }
    fs.unlinkSync(tmp);
  } catch (err) {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    console.warn(`  SKIP VIDEO (ffmpeg unavailable or failed): ${path.basename(filePath)} (${err.message})`);
  }
  return { saved: 0 };
}

function reportBudgets() {
  const folders = fs
    .readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  let total = 0;
  const violations = [];
  console.log("\n=== Project Media Asset Budgets ===");
  for (const folder of folders) {
    const files = walkFiles(path.join(PROJECTS_DIR, folder));
    const bytes = files.reduce((sum, f) => sum + fs.statSync(f).size, 0);
    total += bytes;
    const status = bytes > FOLDER_BUDGET_BYTES ? "OVER" : "OK";
    console.log(`  ${folder.padEnd(14)} | ${String(files.length).padStart(2)} files | ${fmtMB(bytes).padStart(8)} | ${status}`);
    if (bytes > FOLDER_BUDGET_BYTES) {
      violations.push(`${folder} (${fmtMB(bytes)} > ${fmtMB(FOLDER_BUDGET_BYTES)})`);
    }
  }
  console.log(`  TOTAL          | ${fmtMB(total)} (budget: ${fmtMB(TOTAL_BUDGET_BYTES)})`);
  if (total > TOTAL_BUDGET_BYTES) {
    violations.push(`TOTAL (${fmtMB(total)} > ${fmtMB(TOTAL_BUDGET_BYTES)})`);
  }
  return violations;
}

async function main() {
  if (!CHECK_ONLY) {
    console.log("Running media optimization pipeline...");
    const files = walkFiles(PROJECTS_DIR);
    let totalSaved = 0;
    for (const f of files) {
      const ext = path.extname(f).toLowerCase();
      if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
        totalSaved += (await optimizeImage(f)).saved;
      } else if (ext === ".mp4") {
        totalSaved += optimizeVideo(f).saved;
      }
    }
    console.log(`Total saved: ${fmtMB(totalSaved)}`);
  }

  const violations = reportBudgets();
  if (violations.length > 0) {
    console.error("\nMedia budget violations:\n - " + violations.join("\n - "));
    process.exit(1);
  }
  console.log("\nMedia budget check passed.");
}

main();
