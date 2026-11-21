# Changelog

All notable changes to this project will be documented in this file.

## [3.5.0] - 2026-11-21

### Visual Polish, CWV & Print Fit
- **Hero `PracticeDeck` & Mobile Focus Strip Layout (`src/styles/sections/home.css`)** — Cleared bottom card stack intersection with the drag/counter captions and aligned mobile `Focus` + `Hiring dossier ↗` wrapping cleanly flush-left.
- **Home & `/projects` LCP Image Priority (`ProjectCoverImage.tsx`, `app/[locale]/page.tsx`, `app/[locale]/projects/page.tsx`)** — Added `fetchPriority="high"` and `priority` loading to lead `FeaturedDeck` cover and top `WorkIndex` thumbnails, while updating `FeaturedDeck` item CTAs to `"View case study →"` / `"查看案例 →"`.
- **Blog Mobile Breadcrumb & CJK Reading Time (`src/styles/sections/case.css`, `src/lib/blog.ts`)** — Prevented short ancestor breadcrumb labels from wrapping vertically next to long titles on narrow screens and localized reading time (`分钟阅读`) with combined CJK/Latin estimation.
- **`/lab` Workbench & Copy Refinement (`LabWorkbench.tsx`, `lab.css`)** — Switched token swatches to a symmetric `4×2` desktop grid (`2×4` on mobile), sharpened active/focus states, and reframed `/lab` copy into Interaction Design language.
- **1–2 Page A4 Resume Print Fit (`src/styles/base.css`, `app/[locale]/resume/page.tsx`)** — Hid `.pd-nav`, `.pd-mobile-menu`, and `.pd-footer` in `@media print`, tightened A4 pagination rules, and refined experience descriptions to emphasize interaction design ownership over dense test/asset counts.

## [3.4.0] - 2026-11-21

### Bilingual Editorial Naturalization & Link Integrity
- **Interaction-Design Copy Pass (`en` / `zh`)** — Rewrote defensive disclaimers and metric-heavy summaries across flagship cases, proof packets, and blog articles into direct Interaction Design narratives.
- **Link, Locale & Canonical Hygiene** — Fixed localized Chinese `/zh/projects/...` routing, aligned Chinese blog TOC anchors with DOM heading IDs, removed legacy alias leaks, and configured `NEXT_PUBLIC_SITE_URL=https://lewisdong.vercel.app`.

## [3.3.0] - 2026-11-21

### Editorial Consolidation & Component Deduplication
- **Hero, `/hire` & Case Navigation Streamlining** — Consolidated redundant sections on Home, `/hire`, and case detail views without losing role-tailored proof filtering or quick decision paths.
- **UI Primitives & Cleanup** — Simplified `PracticeDeck` card copy and aligned `/about` and `/contact` editorial rhythm.

## [3.2.0] - 2026-11-21

### Performance & Architecture
- **Lazy Search & Shortcuts Loading (`app/search-index/[locale]`)** — Extracted search indexing out of `app/[locale]/layout.tsx` into `force-static` `/search-index/en` and `/search-index/zh` JSON routes, lazy-loading `CommandPalette` (`cmdk`) and `KeyboardShortcutsModal` only on first invocation (`⌘K` / `⌘/`).
- **Native CSS Scroll-Driven `SectionReveal` & Zero-JS `PageTransition`** — Removed GSAP & ScrollTrigger from global layout/static pages (`/about` First Load JS dropped `147 kB -> 119 kB`), reserving GSAP strictly for interactive decks and `/lab`.
- **Tightened CI Bundle Gate (`scripts/check-bundle-budget.mjs`)** — Tightened budgets to `<= 70 kB gz` largest JS chunk, `<= 15 kB gz` per-route `chunks/app/` ceiling, `<= 26 kB gz` App CSS, and `<= 60 kB gz` total CSS.

### Craft, Live Integration & QA Moat
- **Native `<dialog>` Lightbox (`CaseLightbox.tsx`) & Dep Cleanup** — Replaced unused `yet-another-react-lightbox` (`pnpm remove`) with a zero-dependency native top-layer `<dialog>` inspector (`showModal()`, `closedby="any"`, `@starting-style`, `allow-discrete`, `←`/`→` keyboard nav) across case galleries and MDX galleries (`App/UI CSS 24.7 -> 23.7 kB gz`).
- **Live Sites & Bidirectional `/lab` Invariant Cards** — Added verified live app link (`https://on-the-beat.fly.dev`, respecting `X-Frame-Options: DENY`) to `On The Beat`, companion site link + click-to-load `DemoEmbed` (`https://lewisswan24.github.io/lamplight-nook-site/`, CSP `frame-src` updated) to `Lamplight Nook`, and deep-link `/lab?demo=` invariant cards on `walkie`, `autofill`, and `onthebeat`.
- **Static `/llms.txt` & Site-Wide Playwright Crawler (`e2e/crawler.spec.ts`)** — Added strict listed-only `/llms.txt` endpoint plus automated 20-route link/anchor/console/lightbox/embed E2E verification.

## [3.1.0] - 2026-11-21

### Architecture & Performance
- **Unified Case Registry Consolidation** — Added Zod-validated `workSummary` and `reviewMeta` fields to all 14 case records (`src/data/cases/*.ts`), driving Work Index rows and `proof:maintenance` baselines directly from the registry (`92/92` entries Fresh, `0` Stale).
- **`/projects` Server Component Refactor** — Moved `Shortlist`, `EvidenceMatrix`, `EvidenceMap`, and SVG preview rendering into `app/[locale]/projects/page.tsx`, reducing the `/projects` route JS bundle by **98.4%** (`80.2 kB -> 1.25 kB`, First Load JS `204 kB -> 125 kB`).
- **Tightened Bundle Gate (`scripts/check-bundle-budget.mjs`)** — Reduced maximum single-chunk budget to `75 kB gz` and introduced a dedicated `20 kB gz` ceiling for per-route `chunks/app/` bundles.

### Motion, Editorial Content & A11y QA
- **GSAP Route & Scroll Choreography** — Replaced Tailwind keyframe relics in `PageTransition` with `useGsapContext`, added lazy `ScrollTrigger`-backed `SectionReveal`, scoped `prefers-reduced-motion` cleanly in `src/styles/base.css`, and refined A4 `@media print` resume pagination.
- **Two Bilingual Deep-Dive Blog Posts** — Published EN/ZH essays on V3 engineering/performance architecture (`v3-architecture-and-performance-moat`) and hard safety invariants (`walkie-and-fencepost-invariants`).
- **Expanded Playwright E2E + Axe Moat & Node 22 CI** — Added Desktop Dark (`#141413`) and Mobile (`375x812`) `@axe-core/playwright` WCAG 2.1 AA audits (`e2e/a11y.spec.ts`), non-empty A4 `%PDF-` export verification (`e2e/resume-pdf.spec.ts`), and updated `.github/workflows/ci.yml` to Node 22 + current action majors.

## [3.0.0] - 2026-11-21

### Major Platform & Architecture Upgrades
- **Next.js 15.5 + React 19 + Tailwind CSS v4 + ESLint 9 Flat Config** — Upgraded core framework, migrated to `@tailwindcss/postcss` and `eslint.config.mjs`, and pruned 78 dead files plus 5 unused dependencies.
- **Unified Zod 4 Case Registry (`src/data/cases/` + `src/lib/cases/`)** — Extracted bilingual case study content out of JSON message bundles into modular, schema-validated TypeScript records. Reduced `src/messages/en.json` by 83.5% (`99 KB -> 16 KB`) and `zh.json` by 78.7% (`52 KB -> 11 KB`), restricting `NextIntlClientProvider` to client UI namespaces only.
- **Modular Case Page & Layered Lively Icons CSS** — Decomposed the 1,305-line case study route into 5 focused Server Components under `src/components/case/` and split `globals.css` (5,217 lines) into `tokens`, `base`, `primitives`, and `sections/*`.
- **GSAP 3 Motion Core (`src/lib/motion/gsap.ts`)** — Removed `framer-motion` across all interactive decks and modals, replacing with centralized GSAP + native Pointer Events + `prefers-reduced-motion` support (cutting home First Load JS from `175 kB` to `158 kB`).

### Flagship Experience & Content
- **New Integrity-Audited Case Studies (`walkie` & `fencepost`)** — Expanded portfolio to 10 listed cases with curated Top 6 homepage `FeaturedDeck` (`maze`, `walkie`, `lamplight`, `autofill`, `fencepost`, `connect`) and click-to-load `fencepost-app.vercel.app` prototype embed.
- **Rebuilt `/lab` Interactive Workbench** — Bilingual Lively Icons Design System Inspector, live GSAP Motion Sandbox, and interactive state-machine micro-demos for `On The Beat`, `Resume Autofill`, and `Walkie`.
- **Warm-Paper `cmdk` Command Palette (`⌘K`)** — Replaced `SearchModal` and `fuse.js` with an accessible `cmdk` command palette.

### Hiring Engine & QA Moat
- **Role-Tailored Hiring Lens (`/hire?role=product|interaction|design-eng|ai-ux`)** — URL-synchronized case filtering with copyable tailored links.
- **Updated `/resume` + A4 Vector PDF Script (`pnpm resume:pdf`)** — Honest 2026 project experience bullets plus on-demand Playwright EN/ZH A4 PDF generation.
- **Automated Quality Gates** — Added `pnpm media:optimize` / `pnpm media:check` (`sharp` + `ffmpeg`, cutting `public/projects/` by 59%), `pnpm budget:check` (gzipped JS/CSS budget gate), and `@axe-core/playwright` WCAG 2.1 AA audits (`e2e/a11y.spec.ts`) in GitHub Actions CI (`ubuntu-24.04`).

## [1.1.0] - 2026-03-07

### Security
- **Remove PII from API logs** — Stripped email, IP, and message content from `console.log` in `contact/route.ts` and `subscribe/route.ts`
- **Add CSP header** — Content-Security-Policy with strict directives in `next.config.js`
- **Add HSTS header** — Strict-Transport-Security with `max-age=63072000` and `includeSubDomains`
- **Fix empty catch block** — Proper error handling in `subscribe/route.ts`

### Added
- **Shared validation module** (`src/lib/validators.ts`) — Email validation and input sanitization utilities
- **Shared rate-limit module** (`src/lib/rate-limit.ts`) — Reusable rate limiting with IP extraction
- **CI/CD pipeline** (`.github/workflows/ci.yml`) — GitHub Actions for lint, unit tests, build, and E2E
- **API unit tests** — `contact-api.test.ts` (6 tests) and `subscribe-api.test.ts` (5 tests)

### Changed
- **Refactored contact API** — Uses shared validation and rate-limit modules, removed 40+ lines of duplicate code
- **Refactored subscribe API** — Uses shared validation and rate-limit modules, removed duplicate code
- **Improved E2E tests** — Stronger assertions for theme toggle, TOC visibility, and search modal shortcuts

### DevOps
- **ChatDev multi-agent review** — Completed 3 tasks: code review, prototype generation, batch test generation
- **Security audit score** — 82/100 (no critical vulnerabilities)
- **Test coverage** — 88 tests across 13 test files, all passing

## [1.0.0] - Previous Release

Initial portfolio release with Next.js 14, MDX blog, i18n, and project showcase.
