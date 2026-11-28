// pnpm loc:report — effective lines of code, as defined in the v7.1–7.5 plan.
//
//   --root <dir>        repository to measure (default: cwd)
//   --knip <file>       knip `--reporter json` output; unused files are excluded
//   --coverage <file>   vitest v8 `coverage-final.json`; loaded files count as tested
//   --out <dir>         write loc-report.json and loc-report.md there
//   --json              print the full JSON report instead of the table
//
// Without --coverage, only e2e reach and script references mark a file tested,
// so the effective count is lower; the table says when coverage was missing.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildReport } from "./lib/loc-report-core.mjs";

const BINARY_EXTS = new Set([
  "png", "jpg", "jpeg", "gif", "webp", "avif", "ico", "svg", "pdf", "woff", "woff2", "ttf", "otf",
  "mp4", "webm", "mov", "mp3", "wav", "glb", "gltf", "zip", "pptx", "docx",
]);

function parseArgs(argv) {
  const args = { root: process.cwd(), json: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--json") args.json = true;
    else if (["--root", "--knip", "--coverage", "--out"].includes(a)) args[a.slice(2)] = argv[++i];
    else throw new Error(`Unknown argument: ${a}`);
  }
  return args;
}

function toRepoPath(root, file) {
  return path.relative(root, file).split(path.sep).join("/");
}

export function readKnipUnused(file) {
  const data = JSON.parse(readFileSync(file, "utf8"));
  const unused = new Set();
  for (const issue of data.issues ?? []) {
    if ((issue.files ?? []).length > 0) unused.add(issue.file);
  }
  return unused;
}

export function readCoverage(file, root) {
  const data = JSON.parse(readFileSync(file, "utf8"));
  const loaded = new Set();
  const lines = new Map();
  for (const entry of Object.values(data)) {
    const rel = toRepoPath(root, entry.path);
    const all = new Set();
    const hit = new Set();
    for (const [id, loc] of Object.entries(entry.statementMap ?? {})) {
      all.add(loc.start.line);
      if ((entry.s?.[id] ?? 0) > 0) hit.add(loc.start.line);
    }
    if (hit.size > 0) loaded.add(rel);
    lines.set(rel, { covered: hit.size, total: all.size });
  }
  return { loaded, lines };
}

function readTrackedFiles(root) {
  const out = execFileSync("git", ["ls-files", "-z"], { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  return out
    .split("\0")
    .filter(Boolean)
    .map((p) => {
      const ext = p.slice(p.lastIndexOf(".") + 1).toLowerCase();
      const abs = path.join(root, p);
      if (BINARY_EXTS.has(ext) || !existsSync(abs)) return { path: p };
      return { path: p, text: readFileSync(abs, "utf8").replace(/\r\n/g, "\n") };
    });
}

function pct(n, d) {
  return d ? `${((n / d) * 100).toFixed(1)}%` : "n/a";
}

export function toMarkdown(report, meta) {
  const rows = Object.entries(report.kinds)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([kind, k]) => `| ${kind} | ${k.files} | ${k.nonBlank} | ${k.effectiveFiles} | ${k.effective} |`);
  const notCode = Object.entries(report.notCode)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([kind, k]) => `| ${kind} | ${k.files} | ${k.nonBlank} |`);
  const reasons = {};
  for (const f of report.files) if (f.reason) reasons[f.reason] = (reasons[f.reason] ?? 0) + f.code;
  const c = report.unitLineCoverage;
  return [
    `# Effective lines of code${meta.ref ? ` at ${meta.ref}` : ""}`,
    "",
    "| Kind | Files | Non-blank lines | Effective files | Effective lines |",
    "|---|---|---|---|---|",
    ...rows,
    `| **Total** | ${report.totals.files} | ${report.totals.nonBlank} | ${report.totals.effectiveFiles} | **${report.totals.effective}** |`,
    "",
    "Not counted as code:",
    "",
    "| Kind | Files | Non-blank lines |",
    "|---|---|---|",
    ...notCode,
    "",
    `Code lines left out, by reason: ${Object.entries(reasons)
      .map(([r, n]) => `${r} ${n}`)
      .join(", ") || "none"}.`,
    "",
    meta.coverage
      ? `Unit-test line coverage of counted non-test files: ${c.covered} / ${c.total} (${pct(c.covered, c.total)}).`
      : "Unit-test coverage was not supplied, so files only unit tests load are counted as untested.",
    meta.knip ? "Unused files come from knip." : "knip output was not supplied, so no file was excluded as unused.",
    `E2E specs name ${report.visitedPaths} distinct site paths.`,
    "",
  ].join("\n");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = path.resolve(args.root);
  const coverage = args.coverage ? readCoverage(args.coverage, root) : null;
  const report = buildReport({
    files: readTrackedFiles(root),
    unusedFiles: args.knip ? readKnipUnused(args.knip) : new Set(),
    unitLoaded: coverage?.loaded,
    unitLines: coverage?.lines,
  });
  let ref = "";
  try {
    ref = execFileSync("git", ["describe", "--tags", "--always"], { cwd: root, encoding: "utf8" }).trim();
  } catch {
    // not a git checkout with history; leave the ref out
  }
  const meta = { ref, coverage: Boolean(coverage), knip: Boolean(args.knip) };
  const md = toMarkdown(report, meta);
  if (args.out) {
    mkdirSync(args.out, { recursive: true });
    writeFileSync(path.join(args.out, "loc-report.json"), `${JSON.stringify({ ...meta, ...report }, null, 2)}\n`);
    writeFileSync(path.join(args.out, "loc-report.md"), md);
  }
  process.stdout.write(args.json ? `${JSON.stringify({ ...meta, ...report }, null, 2)}\n` : md);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
