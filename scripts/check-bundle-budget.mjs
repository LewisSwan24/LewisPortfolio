#!/usr/bin/env node
/**
 * Build-output JS & CSS bundle budget gate.
 * Reads `.next/static` after `next build` and fails if shared/vendor chunks,
 * per-route app chunks (`chunks/app/`), authored App/UI CSS, or total CSS
 * regress past V3.1 performance budgets.
 */
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const ROOT = process.cwd();
const STATIC_DIR = path.join(ROOT, ".next", "static");

const MAX_SINGLE_CHUNK_GZ_KB = 75;
const MAX_APP_ROUTE_CHUNK_GZ_KB = 20;
const MAX_APP_CSS_GZ_KB = 30;
const MAX_TOTAL_CSS_GZ_KB = 65;

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function isFontManifestCss(content) {
  const trimmed = content.trim();
  return trimmed.startsWith("@font-face{") && !trimmed.includes("tailwindcss");
}

if (!fs.existsSync(STATIC_DIR)) {
  console.error("Missing .next/static — run `pnpm build` before `pnpm budget:check`.");
  process.exit(1);
}

const files = walk(STATIC_DIR);
const jsChunks = files.filter((f) => f.endsWith(".js") && !f.includes("polyfills"));
const cssFiles = files.filter((f) => f.endsWith(".css"));

let largestJs = { file: "", gzKb: 0 };
let largestAppRouteJs = { file: "", gzKb: 0 };

for (const file of jsChunks) {
  const gz = zlib.gzipSync(fs.readFileSync(file)).length / 1024;
  const rel = path.relative(STATIC_DIR, file).replace(/\\/g, "/");
  if (gz > largestJs.gzKb) {
    largestJs = { file: rel, gzKb: gz };
  }
  if (rel.startsWith("chunks/app/") && gz > largestAppRouteJs.gzKb) {
    largestAppRouteJs = { file: rel, gzKb: gz };
  }
}

let appCssGzKb = 0;
let fontCssGzKb = 0;
for (const file of cssFiles) {
  const buf = fs.readFileSync(file);
  const gz = zlib.gzipSync(buf).length / 1024;
  if (isFontManifestCss(buf.toString("utf8"))) {
    fontCssGzKb += gz;
  } else {
    appCssGzKb += gz;
  }
}
const totalCssGzKb = appCssGzKb + fontCssGzKb;

console.log("=== V3.1 Bundle Budget Report ===");
console.log(`  JS chunks analyzed     : ${jsChunks.length}`);
console.log(`  Largest JS chunk       : ${largestJs.file} (${largestJs.gzKb.toFixed(1)} kB gz, budget <= ${MAX_SINGLE_CHUNK_GZ_KB} kB)`);
console.log(`  Largest App route chunk: ${largestAppRouteJs.file} (${largestAppRouteJs.gzKb.toFixed(1)} kB gz, budget <= ${MAX_APP_ROUTE_CHUNK_GZ_KB} kB)`);
console.log(`  App/UI CSS gzipped     : ${appCssGzKb.toFixed(1)} kB gz (budget <= ${MAX_APP_CSS_GZ_KB} kB)`);
console.log(`  Font manifest CSS      : ${fontCssGzKb.toFixed(1)} kB gz`);
console.log(`  Total CSS gzipped      : ${totalCssGzKb.toFixed(1)} kB gz (budget <= ${MAX_TOTAL_CSS_GZ_KB} kB)`);

const failures = [];
if (largestJs.gzKb > MAX_SINGLE_CHUNK_GZ_KB) {
  failures.push(`Largest JS chunk ${largestJs.gzKb.toFixed(1)} kB gz exceeds ${MAX_SINGLE_CHUNK_GZ_KB} kB`);
}
if (largestAppRouteJs.gzKb > MAX_APP_ROUTE_CHUNK_GZ_KB) {
  failures.push(`Largest App route chunk ${largestAppRouteJs.gzKb.toFixed(1)} kB gz exceeds ${MAX_APP_ROUTE_CHUNK_GZ_KB} kB`);
}
if (appCssGzKb > MAX_APP_CSS_GZ_KB) {
  failures.push(`App/UI CSS ${appCssGzKb.toFixed(1)} kB gz exceeds ${MAX_APP_CSS_GZ_KB} kB`);
}
if (totalCssGzKb > MAX_TOTAL_CSS_GZ_KB) {
  failures.push(`Total CSS ${totalCssGzKb.toFixed(1)} kB gz exceeds ${MAX_TOTAL_CSS_GZ_KB} kB`);
}

if (failures.length > 0) {
  console.error("\nBundle budget violations:\n - " + failures.join("\n - "));
  process.exit(1);
}

console.log("\nBundle budget check passed.");
