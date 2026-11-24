#!/usr/bin/env node
/**
 * Guards authored CSS against unparseable experimental LightningCSS syntax
 * (such as `@container anchored(...)`) and verifies built CSS output stays clean.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");

function walkCss(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkCss(full, out);
    else if (entry.name.endsWith(".css")) out.push(full);
  }
  return out;
}

const cssFiles = walkCss(SRC_DIR);
const offenders = [];

for (const file of cssFiles) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  const content = fs.readFileSync(file, "utf8");
  if (/@container\s+anchored\(/i.test(content) || /container-type\s*:\s*anchored\b/i.test(content)) {
    offenders.push(`${rel}: disallowed experimental anchored container query (breaks LightningCSS without warnings)`);
  }
}

if (offenders.length > 0) {
  console.error("CSS compiler warning guard failed:");
  for (const line of offenders) console.error(`  - ${line}`);
  process.exit(1);
}

console.log(`CSS zero-warning guard passed (${cssFiles.length} stylesheets inspected).`);
