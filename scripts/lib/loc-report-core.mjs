// Pure logic behind `pnpm loc:report`. No file system access here, so the
// tests can run it on small in-memory trees. The CLI is scripts/loc-report.mjs.
//
// "Effective code" (v7.1–7.5 plan): a tracked file counts when it is code
// (app, CSS, tests, scripts, CI), not generated or duplicated, not reported
// unused by knip, and either is a test or is reached by one. Reached means a
// unit test loaded it (v8 coverage), an e2e spec visits a route that imports
// it, or a test runs it as a script. Counted lines are non-blank, non-comment.

const JS_EXTS = new Set(["ts", "tsx", "js", "jsx", "mjs", "cjs"]);
const HASH_COMMENT_EXTS = new Set(["yml", "yaml", "sh"]);
const COUNTED_KINDS = new Set(["app", "css", "test", "script", "ci"]);
const RESOLVE_EXTS = ["", ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".css", ".json", ".mdx", ".md"];
const LOCKFILES = new Set(["pnpm-lock.yaml", "package-lock.json", "yarn.lock"]);
const METADATA_ROUTES = {
  sitemap: "sitemap.xml",
  robots: "robots.txt",
  manifest: "manifest.webmanifest",
  "opengraph-image": "opengraph-image",
  "twitter-image": "twitter-image",
  icon: "icon",
  "apple-icon": "apple-icon",
};

function extOf(path) {
  const base = path.slice(path.lastIndexOf("/") + 1);
  const dot = base.lastIndexOf(".");
  return dot > 0 ? base.slice(dot + 1).toLowerCase() : "";
}

function baseName(path) {
  return path.slice(path.lastIndexOf("/") + 1);
}

function dirName(path) {
  const i = path.lastIndexOf("/");
  return i === -1 ? "" : path.slice(0, i);
}

function normalizePath(path) {
  const out = [];
  for (const part of path.split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") out.pop();
    else out.push(part);
  }
  return out.join("/");
}

/**
 * Blank out comments, keeping strings and newlines, so line structure stays.
 * @param {string} text
 * @param {"js" | "css"} mode
 */
function stripComments(text, mode) {
  const out = text.split("");
  const blockRanges = [];
  let i = 0;
  let state = "code";
  let quote = "";
  const templateDepth = [];
  let braceDepth = 0;
  while (i < text.length) {
    const c = text[i];
    const next = text[i + 1];
    if (state === "code") {
      if (c === "/" && next === "*") {
        const end = text.indexOf("*/", i + 2);
        const stop = end === -1 ? text.length : end + 2;
        blockRanges.push([i, stop]);
        for (let j = i; j < stop; j++) if (out[j] !== "\n") out[j] = " ";
        i = stop;
        continue;
      }
      if (mode === "js" && c === "/" && next === "/") {
        while (i < text.length && text[i] !== "\n") out[i++] = " ";
        continue;
      }
      if (c === '"' || c === "'" || (mode === "js" && c === "`")) {
        state = "string";
        quote = c;
      } else if (mode === "js" && c === "{") {
        braceDepth++;
      } else if (mode === "js" && c === "}") {
        if (templateDepth.length && templateDepth[templateDepth.length - 1] === braceDepth) {
          templateDepth.pop();
          state = "string";
          quote = "`";
        } else {
          braceDepth--;
        }
      }
      i++;
      continue;
    }
    // inside a string
    if (c === "\\") {
      i += 2;
      continue;
    }
    if (quote === "`" && c === "$" && next === "{") {
      templateDepth.push(braceDepth);
      state = "code";
      i += 2;
      continue;
    }
    if (c === quote) state = "code";
    // Plain strings cannot span lines: recover from a misread regex literal.
    else if (c === "\n" && quote !== "`") state = "code";
    i++;
  }
  // `{/* note */}` in JSX: the braces only exist to hold the comment.
  for (const [start, stop] of blockRanges) {
    let a = start - 1;
    while (a >= 0 && (out[a] === " " || out[a] === "\t")) a--;
    let b = stop;
    while (b < out.length && (out[b] === " " || out[b] === "\t")) b++;
    if (out[a] === "{" && out[b] === "}") {
      out[a] = " ";
      out[b] = " ";
    }
  }
  return out.join("");
}

function commentFreeText(text, lang) {
  if (JS_EXTS.has(lang)) return stripComments(text, "js");
  if (lang === "css") return stripComments(text, "css");
  if (HASH_COMMENT_EXTS.has(lang)) {
    return text
      .split("\n")
      .map((line) => (line.trim().startsWith("#") ? "" : line))
      .join("\n");
  }
  return text;
}

/**
 * @param {string} text
 * @param {string} lang file extension without the dot
 * @returns {{ nonBlank: number, code: number }}
 */
export function countCodeLines(text, lang) {
  const nonEmpty = (s) => s.split("\n").filter((line) => line.trim() !== "").length;
  return { nonBlank: nonEmpty(text), code: nonEmpty(commentFreeText(text, lang)) };
}

/**
 * @param {string} path repository-relative, forward slashes
 * @returns {{ kind: string, counted: boolean, lang: string }}
 */
export function classifyPath(path) {
  const lang = extOf(path);
  const base = baseName(path);
  const kind = (() => {
    if (LOCKFILES.has(base) || /\.generated\./.test(base)) return "excluded";
    if (path.startsWith("public/")) return "asset";
    if (/^src\/messages\/[^/]+\.json$/.test(path)) return "i18n";
    if (lang === "md" || lang === "mdx") return "content";
    if (base === "package.json") return "config";
    if (lang === "json") return path.includes("/") ? "excluded" : "config";
    if (/^\.github\/workflows\/[^/]+\.ya?ml$/.test(path)) return "ci";
    if (
      path.startsWith("e2e/") ||
      path.startsWith("tests/") ||
      path.startsWith("src/test/") ||
      path.includes("/__tests__/") ||
      /\.(test|spec)\.[cm]?[jt]sx?$/.test(base)
    ) {
      return "test";
    }
    if (path.startsWith("scripts/") && (JS_EXTS.has(lang) || lang === "sh")) return "script";
    if (path.startsWith("src/data/")) return "data";
    if (lang === "css") return "css";
    if (JS_EXTS.has(lang) && (path.startsWith("app/") || path.startsWith("src/"))) return "app";
    if (base === "middleware.ts" || base === "instrumentation.ts") return path.includes("/") ? "other" : "app";
    if (path.startsWith("content/")) return "content";
    if (!path.includes("/") || path.startsWith(".github/")) return "config";
    return "other";
  })();
  return { kind, counted: COUNTED_KINDS.has(kind), lang };
}

/**
 * Module specifiers a file imports, in source order, comments ignored.
 * @param {string} text
 * @param {string} lang
 * @returns {string[]}
 */
export function extractImports(text, lang) {
  const code = commentFreeText(text, lang);
  const patterns =
    lang === "css"
      ? [/@import\s+(?:url\(\s*)?["']([^"']+)["']/g]
      : [
          /\bimport\s+(?:type\s+)?(?:[\w*${}\s,]+?\s+from\s+)?["']([^"']+)["']/g,
          /\bexport\s+(?:type\s+)?(?:\*(?:\s+as\s+[\w$]+)?|\{[^}]*\})\s+from\s+["']([^"']+)["']/g,
          /\bimport\(\s*["']([^"']+)["']\s*\)/g,
          /\brequire\(\s*["']([^"']+)["']\s*\)/g,
        ];
  const found = [];
  for (const re of patterns) {
    for (const m of code.matchAll(re)) found.push([m.index, m[1]]);
  }
  found.sort((a, b) => a[0] - b[0]);
  return [...new Set(found.map(([, spec]) => spec))];
}

/**
 * Resolve a specifier to a tracked file, following the tsconfig aliases.
 * @param {string} spec
 * @param {string} from importing file
 * @param {Set<string>} files tracked paths
 * @returns {string | null}
 */
export function resolveImport(spec, from, files) {
  let base;
  if (spec.startsWith("@/content/")) base = `content/${spec.slice("@/content/".length)}`;
  else if (spec.startsWith("@/")) base = `src/${spec.slice(2)}`;
  else if (spec.startsWith("./") || spec.startsWith("../")) base = `${dirName(from)}/${spec}`;
  else return null;
  base = normalizePath(base.split("?")[0]);
  const candidates = [];
  for (const ext of RESOLVE_EXTS) candidates.push(base + ext);
  if (/\.(m?js)$/.test(base)) {
    const stem = base.replace(/\.m?js$/, "");
    candidates.push(`${stem}.ts`, `${stem}.tsx`);
  }
  for (const ext of RESOLVE_EXTS.slice(1)) candidates.push(`${base}/index${ext}`);
  return candidates.find((c) => files.has(c)) ?? null;
}

/**
 * The URL pattern a file under app/ serves, or null if it serves none itself.
 * @param {string} path
 * @returns {{ segments: string[], type: "page" | "route" } | null}
 */
export function routeFromAppFile(path) {
  if (!path.startsWith("app/") || !JS_EXTS.has(extOf(path))) return null;
  const parts = path.split("/").slice(1);
  const file = parts.pop();
  const stem = file.slice(0, file.lastIndexOf("."));
  if (parts.some((p) => p.startsWith("_"))) return null;
  const segments = parts.filter((p) => !(p.startsWith("(") && p.endsWith(")")) && !p.startsWith("@"));
  if (stem === "page") return { segments, type: "page" };
  if (stem === "route") return { segments, type: "route" };
  if (Object.hasOwn(METADATA_ROUTES, stem)) return { segments: [...segments, METADATA_ROUTES[stem]], type: "route" };
  return null;
}

const DYNAMIC = Symbol("dynamic");

/** Rank per segment, lower is more specific; null when the pattern does not match. */
function rankMatch(pattern, segs, locales) {
  const ranks = [];
  let i = 0;
  for (let p = 0; p < pattern.length; p++) {
    const rs = pattern[p];
    if (rs.startsWith("[[...")) {
      ranks.push(3);
      return ranks;
    }
    if (rs.startsWith("[...")) {
      if (i >= segs.length) return null;
      ranks.push(2);
      return ranks;
    }
    if (i >= segs.length) return null;
    const seg = segs[i];
    if (rs === "[locale]") {
      if (seg !== DYNAMIC && !locales.includes(seg)) return null;
      ranks.push(1);
    } else if (rs.startsWith("[")) {
      ranks.push(1);
    } else {
      if (seg !== rs) return null;
      ranks.push(0);
    }
    i++;
  }
  return i === segs.length ? ranks : null;
}

function compareRanks(a, b) {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const d = (a[i] ?? -1) - (b[i] ?? -1);
    if (d !== 0) return d;
  }
  return 0;
}

const SHELL_FILES = new Set(["layout", "template", "loading"]);

// Files Next.js (and the next-intl plugin) load on every request by convention,
// not through an import a static walk can see.
const FRAMEWORK_ENTRIES = ["middleware.ts", "instrumentation.ts", "src/i18n/request.ts", "i18n/request.ts"];

/**
 * The app/ files a visit to `visited` renders: the matched page or route
 * handler, plus the layouts around a page.
 * @param {string} visited a path as written in a spec, e.g. "/projects/${slug}#x"
 * @param {string[]} appFiles tracked paths under app/
 * @param {string[]} locales first one is the default (served without prefix)
 * @returns {string[] | null}
 */
export function matchVisitedPath(visited, appFiles, locales) {
  const clean = visited.split(/[?#]/)[0];
  const segs = clean
    .split("/")
    .filter(Boolean)
    .map((s) => (s.includes("${") ? DYNAMIC : s));
  const routes = appFiles
    .map((file) => ({ file, route: routeFromAppFile(file) }))
    .filter((r) => r.route);

  const best = (candidate) => {
    let winner = null;
    for (const r of routes) {
      const ranks = rankMatch(r.route.segments, candidate, locales);
      if (ranks && (!winner || compareRanks(ranks, winner.ranks) < 0)) winner = { ...r, ranks };
    }
    return winner;
  };

  let match = best(segs);
  const last = segs[segs.length - 1];
  const looksLikeFile = typeof last === "string" && /\.[a-z0-9]+$/i.test(last);
  if (!match && !looksLikeFile && !(typeof segs[0] === "string" && locales.includes(segs[0]))) {
    match = best([locales[0], ...segs]);
  }
  if (!match) return null;
  if (match.route.type === "route") return [match.file];

  const result = [match.file];
  const catchAll = match.route.segments.some((s) => s.startsWith("[..."));
  const dirs = [];
  let dir = dirName(match.file);
  while (dir) {
    dirs.push(dir);
    dir = dirName(dir);
  }
  const dirSet = new Set(dirs);
  for (const file of appFiles) {
    if (!dirSet.has(dirName(file)) || !JS_EXTS.has(extOf(file))) continue;
    const stem = baseName(file).replace(/\.[^.]+$/, "");
    if (SHELL_FILES.has(stem) || (catchAll && stem === "not-found")) result.push(file);
  }
  return result;
}

/**
 * Site paths written as string literals in an e2e spec.
 * @param {string} text
 * @returns {string[]}
 */
export function extractVisitedPaths(text) {
  const found = new Set();
  for (const m of text.matchAll(/(["'`])((?:\\.|(?!\1)[^\\\n])*)\1/g)) {
    const value = m[2];
    if (/^\/(?!\/)[^\s"'`]*$/.test(value)) found.add(value);
  }
  return [...found];
}

// A test runs or loads a script when its file name sits on a line that
// joins a path to it, spawns or execs it, or imports it. A bare mention (a
// fixture string, a comment) does not count.
const RUNS_OR_LOADS = /\b(join|spawn|spawnSync|exec|execSync|execFile|execFileSync|fork|import|require)\b/;

function runsScript(text, name) {
  return text.split("\n").some((line) => line.includes(name) && RUNS_OR_LOADS.test(line));
}

/**
 * @param {{
 *   files: { path: string, text?: string }[],
 *   unusedFiles?: Set<string>,
 *   unitLoaded?: Set<string>,
 *   unitLines?: Map<string, { covered: number, total: number }>,
 *   locales?: string[],
 * }} input
 */
export function buildReport({
  files,
  unusedFiles = new Set(),
  unitLoaded = new Set(),
  unitLines = new Map(),
  locales = ["en", "zh"],
}) {
  const sorted = [...files].sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
  const info = new Map();
  for (const f of sorted) {
    const cls = classifyPath(f.path);
    const text = f.text ?? "";
    info.set(f.path, { ...cls, text, ...countCodeLines(text, cls.lang) });
  }
  const fileSet = new Set(info.keys());
  const appFiles = [...fileSet].filter((p) => p.startsWith("app/"));
  const testFiles = [...info].filter(([, v]) => v.kind === "test");

  // Entry points the test suites exercise.
  const entries = new Set();
  const visited = new Set();
  for (const [path, v] of testFiles) {
    if (path.startsWith("e2e/")) for (const p of extractVisitedPaths(v.text)) visited.add(p);
  }
  for (const p of visited) for (const file of matchVisitedPath(p, appFiles, locales) ?? []) entries.add(file);
  if (visited.size) for (const p of FRAMEWORK_ENTRIES) if (fileSet.has(p)) entries.add(p);
  for (const [path, v] of info) {
    if (v.kind !== "script") continue;
    const name = baseName(path);
    if (testFiles.some(([, t]) => runsScript(t.text, name))) entries.add(path);
  }

  // Follow static imports from those entries.
  const reached = new Set();
  const queue = [...entries];
  while (queue.length) {
    const path = queue.pop();
    if (reached.has(path) || !info.has(path)) continue;
    reached.add(path);
    // A hand-written declaration file types the JavaScript module beside it.
    const declaration = path.replace(/.(m?js)$/, ".d.ts");
    if (declaration !== path && fileSet.has(declaration)) queue.push(declaration);
    const v = info.get(path);
    if (!JS_EXTS.has(v.lang) && v.lang !== "css") continue;
    for (const spec of extractImports(v.text, v.lang)) {
      const target = resolveImport(spec, path, fileSet);
      if (target && !reached.has(target)) queue.push(target);
    }
  }

  const rows = [];
  const seenText = new Map();
  for (const [path, v] of info) {
    const row = { path, kind: v.kind, nonBlank: v.nonBlank, code: v.code, effective: 0 };
    const tested = v.kind === "test" || v.kind === "ci" || reached.has(path) || unitLoaded.has(path);
    if (!v.counted) row.reason = v.kind === "excluded" ? "excluded" : "not-code";
    else if (unusedFiles.has(path)) row.reason = "unused";
    else if (!tested) row.reason = "untested";
    else if (v.text.trim() && seenText.has(v.text)) row.reason = "duplicate";
    else {
      if (v.text.trim()) seenText.set(v.text, path);
      row.effective = v.code;
    }
    rows.push(row);
  }

  /** @type {Record<string, { files: number, nonBlank: number, effective: number, effectiveFiles: number }>} */
  const kinds = {};
  /** @type {Record<string, { files: number, nonBlank: number }>} */
  const notCode = {};
  const totals = { files: 0, nonBlank: 0, effective: 0, effectiveFiles: 0 };
  for (const row of rows) {
    const counted = COUNTED_KINDS.has(row.kind);
    const bucket = counted ? kinds : notCode;
    bucket[row.kind] ??= counted ? { files: 0, nonBlank: 0, effective: 0, effectiveFiles: 0 } : { files: 0, nonBlank: 0 };
    const b = bucket[row.kind];
    b.files++;
    b.nonBlank += row.nonBlank;
    if (counted) {
      b.effective += row.effective;
      if (row.effective > 0) b.effectiveFiles++;
      totals.files++;
      totals.nonBlank += row.nonBlank;
      totals.effective += row.effective;
      if (row.effective > 0) totals.effectiveFiles++;
    }
  }

  const unitLineCoverage = { covered: 0, total: 0 };
  for (const [path, lines] of unitLines) {
    const v = info.get(path);
    if (!v || !v.counted || v.kind === "test") continue;
    unitLineCoverage.covered += lines.covered;
    unitLineCoverage.total += lines.total;
  }

  return {
    kinds,
    notCode,
    totals,
    unitLineCoverage,
    visitedPaths: visited.size,
    files: rows,
  };
}
