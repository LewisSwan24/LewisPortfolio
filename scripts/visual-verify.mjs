#!/usr/bin/env node
// Visual verification: walks every public route in a real browser (desktop + mobile),
// takes full-page screenshots, records status / overflow / broken images / console errors /
// banned-claim hits, records a short walkthrough video, and writes report.json + report.md.
//
// Usage: node scripts/visual-verify.mjs [--base http://localhost:3000] [--out output/visual-verify]
// Exit 1 when any page has status >= 400, horizontal overflow, broken images or banned hits,
// or when /projects/vigil still answers 2xx.
import { chromium } from '@playwright/test';
import { mkdir, readFile, writeFile, readdir, rename, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const arg = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
};
const BASE = arg('base', 'http://localhost:3000').replace(/\/$/, '');
const OUT = path.resolve(arg('out', 'output/visual-verify'));
const CONCURRENCY = Number(arg('concurrency', '4'));

const ROUTES = [
  '/', '/projects',
  ...['walkie', 'maze', 'lamplight', 'autofill', 'onthebeat', 'grassland'].map((s) => `/projects/${s}`),
  '/about', '/hire', '/interview', '/resume', '/contact', '/vault', '/studio/replay',
  '/patterns', '/ai', '/lab', '/blog',
  '/blog/shared-wristband-collaborative-friction',
];
const LOCALES = [['en', ''], ['zh', '/zh']];
const VIGIL = ['/projects/vigil', '/zh/projects/vigil'];
const VIEWPORTS = {
  desktop: { viewport: { width: 1440, height: 900 } },
  mobile: { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true },
};

const banned = JSON.parse(await readFile(path.join(__dirname, 'banned-claims.json'), 'utf8'))
  .patterns.map((p) => ({ re: p.re, why: p.why, rx: new RegExp(p.re) }));

const slug = (route) => (route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-'));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function settle(page) {
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await sleep(1500);
}

// Scroll to the bottom in steps so lazy images and in-view reveals fire, then return to top.
async function primeLazy(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
  await sleep(500);
}

async function checkPage(browser, locale, prefix, route, vpName) {
  const url = BASE + (prefix + (route === '/' ? '' : route) || '/');
  const context = await browser.newContext({ ...VIEWPORTS[vpName], reducedMotion: 'reduce' });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 300)); });
  page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${String(e.message).slice(0, 300)}`));
  const file = `${locale}-${slug(route)}-${vpName}.png`;
  const row = { locale, route, viewport: vpName, url, file, status: null, title: '', overflow: false,
    brokenImages: [], consoleErrors, bannedHits: [], error: null };
  try {
    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    row.status = res ? res.status() : null;
    await settle(page);
    await primeLazy(page);
    const m = await page.evaluate(() => ({
      title: document.title,
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      scrollWidth: document.documentElement.scrollWidth,
      broken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => i.currentSrc || i.src || '(no src)'),
      text: document.body ? document.body.innerText : '',
    }));
    row.title = m.title;
    row.overflow = m.overflow;
    row.scrollWidth = m.scrollWidth;
    row.brokenImages = m.broken;
    for (const b of banned) {
      const hit = m.text.match(b.rx);
      if (hit) {
        const i = hit.index ?? 0;
        row.bannedHits.push({ re: b.re, why: b.why, snippet: m.text.slice(Math.max(0, i - 40), i + 60).replace(/\s+/g, ' ') });
      }
    }
    await page.screenshot({ path: path.join(OUT, file), fullPage: true });
  } catch (e) {
    row.error = String(e.message || e).split('\n')[0];
  }
  await context.close();
  return row;
}

async function checkVigil(browser) {
  const context = await browser.newContext();
  const out = [];
  for (const route of VIGIL) {
    try {
      const res = await context.request.get(BASE + route, { maxRedirects: 0, timeout: 30000 });
      const status = res.status();
      out.push({ route, status, location: res.headers().location || null, ok: status === 404 || status === 410 || (status >= 300 && status < 400) });
    } catch (e) {
      out.push({ route, status: null, error: String(e.message || e).split('\n')[0], ok: false });
    }
  }
  await context.close();
  return out;
}

async function walkthrough(browser) {
  const videoDir = path.join(OUT, '.video-tmp');
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce',
    recordVideo: { dir: videoDir, size: { width: 1280, height: 800 } },
  });
  const page = await context.newPage();
  const go = async (p) => { await page.goto(BASE + p, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => {}); await settle(page); };
  const scroll = async (steps, dy = 400, pause = 600) => {
    for (let i = 0; i < steps; i++) { await page.mouse.wheel(0, dy); await sleep(pause); }
  };
  await page.mouse.move(640, 400);
  await go('/'); await sleep(1500);
  await scroll(10, 450, 700);              // featured cases
  await go('/projects/walkie'); await scroll(14, 500, 550);
  await go('/projects/maze'); await scroll(6, 500, 600);
  await go('/vault'); await scroll(4, 400, 600);
  await go('/zh'); await scroll(5, 450, 600);
  await go('/zh/projects/onthebeat'); await scroll(8, 500, 600);
  const video = page.video();
  await context.close();
  const target = path.join(OUT, 'walkthrough.webm');
  await rm(target, { force: true });
  if (video) await rename(await video.path(), target);
  await rm(videoDir, { recursive: true, force: true });
  return target;
}

const started = Date.now();
await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const jobs = [];
for (const [locale, prefix] of LOCALES)
  for (const route of ROUTES)
    for (const vp of Object.keys(VIEWPORTS)) jobs.push([locale, prefix, route, vp]);

const pages = [];
let next = 0;
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (next < jobs.length) {
    const job = jobs[next++];
    const row = await checkPage(browser, ...job);
    pages.push(row);
    console.log(`${row.status ?? 'ERR'} ${row.viewport.padEnd(7)} ${row.url}${row.bannedHits.length ? `  banned:${row.bannedHits.length}` : ''}${row.overflow ? '  OVERFLOW' : ''}${row.brokenImages.length ? `  broken:${row.brokenImages.length}` : ''}`);
  }
}));
pages.sort((a, b) => jobs.findIndex((j) => j[0] === a.locale && j[2] === a.route && j[3] === a.viewport)
  - jobs.findIndex((j) => j[0] === b.locale && j[2] === b.route && j[3] === b.viewport));

const vigil = await checkVigil(browser);
let video = null;
try { video = await walkthrough(browser); } catch (e) { console.error('walkthrough failed:', e.message); }
await browser.close();

const failed = (r) => r.error || r.status == null || r.status >= 400 || r.overflow || r.brokenImages.length || r.bannedHits.length;
const summary = {
  base: BASE, seconds: Math.round((Date.now() - started) / 1000), pages: pages.length,
  failedPages: pages.filter(failed).length,
  status4xx5xx: pages.filter((r) => r.status >= 400 || r.status == null || r.error).length,
  overflow: pages.filter((r) => r.overflow).length,
  brokenImages: pages.filter((r) => r.brokenImages.length).length,
  consoleErrors: pages.filter((r) => r.consoleErrors.length).length,
  bannedHits: pages.filter((r) => r.bannedHits.length).length,
  vigilOk: vigil.every((v) => v.ok), video: video ? path.basename(video) : null,
};
await writeFile(path.join(OUT, 'report.json'), JSON.stringify({ summary, vigil, pages }, null, 2));

const md = [
  `# Visual verify — ${BASE}`, '',
  `${summary.pages} page checks in ${summary.seconds}s. Failing: ${summary.failedPages}. ` +
  `Status ≥400: ${summary.status4xx5xx}, overflow: ${summary.overflow}, broken images: ${summary.brokenImages}, ` +
  `console errors: ${summary.consoleErrors}, banned hits: ${summary.bannedHits}. Video: ${summary.video ?? 'none'}.`, '',
  '| Vigil route | Status | Location | OK |', '|---|---|---|---|',
  ...vigil.map((v) => `| ${v.route} | ${v.status ?? v.error} | ${v.location ?? ''} | ${v.ok ? 'yes' : 'NO'} |`), '',
  '| Route | Viewport | Status | Overflow | Broken images | Console errors | Banned hits |',
  '|---|---|---|---|---|---|---|',
  ...pages.map((r) => `| ${r.locale === 'zh' ? '/zh' : ''}${r.route} | ${r.viewport} | ${r.status ?? `ERR ${r.error ?? ''}`} | ${r.overflow ? 'YES' : ''} | ${r.brokenImages.length || ''} | ${r.consoleErrors.length || ''} | ${r.bannedHits.map((h) => '`' + h.re.slice(0, 30).replace(/\|/g, '\\|') + '`').join(' ') } |`),
  '',
];
await writeFile(path.join(OUT, 'report.md'), md.join('\n'));

const pngs = (await readdir(OUT)).filter((f) => f.endsWith('.png')).length;
console.log(`\n${JSON.stringify(summary)}\n${pngs} PNGs in ${OUT}`);
process.exit(summary.failedPages || !summary.vigilOk ? 1 : 0);
