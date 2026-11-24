#!/usr/bin/env node
// Fails when the site says something Lewis's records rule out.
// Source mode (default): scans src/, app/, content/, public/ text files, and checks that
// no blog post's date is earlier than the day its file first entered git.
// URL mode: `--url https://host` fetches every sitemap route (plus unlisted /projects/*
// archive pages) and scans the rendered text, so it also sees what the build produced.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const { patterns } = JSON.parse(readFileSync(join(root, "scripts/banned-claims.json"), "utf8"));
const rules = patterns.map((p) => ({ ...p, rx: new RegExp(p.re) }));
const args = process.argv.slice(2);
const urlIdx = args.indexOf("--url");
const base = urlIdx >= 0 ? args[urlIdx + 1].replace(/\/$/, "") : null;
const SELF = new Set(["scripts/banned-claims.json", "scripts/check-banned-claims.mjs"]);
const TEXT = new Set([".svg", ".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".mdx", ".txt", ".xml", ".css"]);
const hits = [];

function scanText(label, text) {
  const lines = text.split(/\r?\n/);
  for (const r of rules) {
    lines.forEach((line, i) => {
      const m = line.match(r.rx);
      if (m) hits.push(`${label}:${i + 1}  "${m[0]}"  (${r.why})`);
    });
  }
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (TEXT.has(extname(name))) out.push(p);
  }
  return out;
}

function checkBlogDates() {
  for (const dir of ["content/blog", "content/blog/zh"]) {
    let files = [];
    try { files = readdirSync(join(root, dir)).filter((f) => f.endsWith(".mdx")); } catch { continue; }
    for (const f of files) {
      const rel = `${dir}/${f}`;
      const m = readFileSync(join(root, rel), "utf8").match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})/m);
      if (!m) continue;
      let added = "";
      try {
        added = execFileSync("git", ["log", "--diff-filter=A", "--follow", "--format=%ad", "--date=short", "--", rel], { encoding: "utf8" })
          .trim().split("\n").pop();
      } catch { /* untracked */ }
      if (added && m[1] < added) hits.push(`${rel}  date ${m[1]} is earlier than first commit ${added} (back-dated)`);
    }
  }
}

async function scanUrl() {
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  for (const s of ["connect", "fencepost", "gapmapper", "hoop", "pricewise", "rules", "spectra", "vigil"])
    paths.push(`/projects/${s}`, `/zh/projects/${s}`);
  for (const extra of ["/llms.txt", "/llms-full.txt"]) paths.push(extra);
  for (const p of [...new Set(paths)]) {
    const res = await fetch(base + p);
    if (res.status === 404 && p.includes("/projects/")) continue; // archived page removed: fine
    if (!res.ok) { hits.push(`${p}  HTTP ${res.status}`); continue; }
    const html = await res.text();
    const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, "\n").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
    scanText(p, text);
  }
}

if (base) await scanUrl();
else {
  for (const d of ["src", "app", "content", "public"]) {
    for (const f of walk(join(root, d))) {
      const rel = relative(root, f).replace(/\\/g, "/");
      if (!SELF.has(rel)) scanText(rel, readFileSync(f, "utf8"));
    }
  }
  checkBlogDates();
}

if (hits.length) {
  console.error(`check-banned-claims: ${hits.length} hit(s)\n` + hits.join("\n"));
  process.exit(1);
}
console.log(`check-banned-claims: clean (${base ?? "source"})`);
