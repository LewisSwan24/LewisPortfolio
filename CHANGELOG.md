# Changelog

All notable changes to this project will be documented in this file.

## [4.2.0] - 2026-11-22

### Shared Three.js Specimen Kernel, DecisionComparator & Essay #1
- **Shared Three.js Specimen Kernel (`src/components/three/`)** — Added `SpecimenAxisCanvas` (Home & `/lab`) plotting the 6 listed cases across human friction, boundary stance, and medium physicality with a `0ms` SSR SVG drafting frame, equal keyboard controls, lazy WebGL2 mounting, explicit `dispose()` lifecycle, and silent 2D fallback (`--disable-webgl` / reduced motion). Added `HardwareFieldCanvas` architectural specimens for `walkie`, `maze`, and `onthebeat`.
- **Lazy 3D Chunk Budget Guard (`scripts/check-bundle-budget.mjs`)** — Extended bundle budget checks to isolate lazy Three.js chunks (`<= 160 kB gz`) and verify zero WebGL code leaks into initial App route bundles (`<= 20 kB gz`).
- **Interactive Prototypes & `DecisionComparator` (`src/components/case/`)** — Completed `GrasslandRulesSim` (`grassland-rules`) and `OntheBeatHandshakeSim` (`onthebeat-handshake` featuring blind pulse -> mutual nod -> polite device withdrawal), plus `/projects` `DecisionComparator` prioritizing human tension, rejected alternatives, chosen tradeoff, and residual cost (`375px` accessible accordions with `0px` overflow).
- **Essay #1 (`content/blog/{,zh/}withdrawing-interfaces-in-social-spaces.mdx`)** — Published bilingual essay examining polite device withdrawal (`On The Beat`) and anti-isolation physical co-play (`MazeRunners`) with explicit empirical boundaries.

## [4.1.0] - 2026-11-22

### Human-Centered Design Rationale, 6-Case Curation & Grid Unification
- **Curated `10 -> 6` Listed Portfolio + 8 Unlisted Archives (`src/lib/project-routes.ts`, `src/lib/project-covers.ts`, `src/data/cases/`)** — Curated listed portfolio to the 6 strongest human-centered cases (`walkie`, `lamplight`, `autofill`, `maze`, `onthebeat`, `grassland`), moved `fencepost`, `connect`, `hoop`, and `pricewise` to `unlisted` (preserving direct URL access + `noindex` while removing all public links from Home `PracticeDeck`, `/resume`, `seo.tsx`, `search-index`, `llms.txt`, and `src/lib/proof/`).
- **Structured `designDecisions` Schema & `CaseDesignDecisions.tsx`** — Extended `CaseRecordSchema` with `DesignDecisionTradeoffSchema` (`decisionTitle`, `humanTension`, `rejectedAlternatives`, `chosenTradeoff`, `residualCostOrRisk`), authored `>= 2` bilingual entries for every listed case, and mounted `#design-decisions` directly below `#snapshot` across all case pages.
- **Human-Centered POV & Cross-Page Grid Unification (`src/styles/v4/grid.css`)** — Reframed Home Hero, `How I work`, `/about`, and `PracticeDeck` around human friction, refusal boundaries, and falsifiable prototypes; added `.v4-reading-grid` (`Sticky TOC + 68ch` reading column) for `/blog/[slug]`; unified `/contact`, `/resume`, `/brief/[id]`, `/lab`, and `/hire` hero onto `.v4-editorial-grid`; refactored `/lab` theme inspector swatches to zero-hydration pure CSS `[data-theme="dark"]` toggles; pruned dead V1–V3 selectors (`MAX_APP_CSS_GZ_KB = 30`).

## [4.0.0] - 2026-11-22

### Modern Swiss Editorial & Digital Studio Visual System
- **V4 Design Tokens & Color System (`src/styles/v4/tokens.css`, `src/lib/cases/mood.ts`)** — Migrated from Lively Icons parchment (`#EFE8DA`) to Warm Bone White (`#F6F4EF` / `#FCFBF8`), Deep Charcoal ink (`#151412`), three-tier Deep Charcoal Studio dark workbench (`#111110` / `#181816` / `#222220`), `color-scheme: light dark`, `forced-colors: active` guards, and per-case WCAG AA `--case-mood` signature ribbons across all 14 cases.
- **Bilingual Editorial Typography (`app/layout.tsx`)** — Replaced `Shantell Sans` / `ZCOOL KuaiLe` / `Lexend` with `Space Grotesk` + `Inter` + `Noto Sans SC` + `Geist Mono` on a `1.25` modular scale (`1px` architectural hairlines, CJK zero-letter-spacing preserved).
- **12-Column Asymmetric Swiss Grid (`src/styles/v4/grid.css`)** — Rolled out `.v4-editorial-grid` (`4-col` sticky rail + `8-col` wide studio showcase canvas) across Home, case study pages, and `/about`, paired with `/lab` V4 token/mood swatches.
- **V4 Dynamic OpenGraph & Strict `<= 26 kB gz` App CSS (`scripts/check-bundle-budget.mjs`)** — Upgraded root, project, and blog OG generators to V4 Warm Bone + Space Grotesk + case mood bars, updated footer version to `v4.0`, and pruned over 800 lines of unused hiring/legacy CSS.

## [3.9.0] - 2026-11-22

### Interview Presentation Mode, Tailored Briefs & Zero-PII Server Loop
- **Lazy-Loaded Presentation Mode (`PresentationShell.tsx`, `PresentationTrigger.tsx`)** — Added `Shift + P` and trigger controls on case studies, `/hire`, and tailored brief pages rendering a 16:9 native `<dialog>` slide deck with embedded V3.6 interactive simulators, V3.8 scrubbers, keyboard pagination, `sessionStorage` local speaker notes (`N`), and fullscreen support (`F`).
- **Tailored Brief Generator & `noindex` Dossier (`app/api/brief/route.ts`, `app/[locale]/brief/[id]/page.tsx`)** — Added Upstash Redis REST adapter (`brief:v1:<id>`, anonymous `brief:views:<id>`) plus automatic Base64url/HMAC stateless `s_...` fallback and `/hire` builder UI.
- **Rate-Limited `/api/contact` & Progressive Form (`QuickContactForm.tsx`)** — Added Zod validation, `:user-invalid` post-interaction error handling, honeypot trap, 3-per-10-min sliding IP-hash rate limiter (`rl:contact:<ipHash>`), zero PII logging, and seamless `mailto:` fallback.

## [3.8.0] - 2026-11-21

### Design Process Artifacts, Research Attribution & Vector Micro-Loops
- **Before/After Scrubber (`BeforeAfterScrubber.tsx`)** — Pointer + keyboard (`role="slider"`) structural comparison for `connect`, `pricewise`, `hoop`, and `lamplight` with `touch-action: pan-y` axis locking.
- **Research Quote Deck (`ResearchQuoteDeck.tsx`)** — Filterable participant friction cards mapped directly to product decisions across `connect`, `maze`, `autofill`, `lamplight`, and `walkie`.
- **Declarative Vector Micro-Loops (`CaseMicroLoop.tsx`)** — Zero-video interactive SVG loops with explicit Play/Pause and `prefers-reduced-motion` static keyframe fallback for `onthebeat`, `walkie`, and `grassland`.

## [3.7.0] - 2026-11-21

### Modern Web Platform Primitives & 6-Primitive Lab
- **Native View Transitions (`TransitionLink.tsx`)**, **Anchored Popover Terminology Notes (`AnchorNote.tsx`, `CaseTerminologyNotes.tsx`)**, **CSS Scroll-Driven Progress (`cs-scroll-progress`)**, and **V3.7 `/lab` Interactive Primitives Gallery (`LabPrimitivesGallery.tsx`)**.

## [3.6.0] - 2026-11-21

### Interactive Case Prototype Engine & 6 Flagship Simulators
- **Lazy-Loaded `CaseSimulatorFrame` + 6 Interactive Simulators** — Shipped `WalkieWristSim`, `LamplightTriageSim`, `AutofillConfidenceSim`, `MazeContactSim`, `FencepostRevokeSim`, and `ConnectIaResetSim` mounted only on intersection or explicit activation.

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

### Quality Assurance
- **Automated validation suites** — Ran schema validation, regression tests, and accessibility checks across core workflows
- **Security audit score** — 82/100 (no critical vulnerabilities)
- **Test coverage** — 88 tests across 13 test files, all passing

## [1.0.0] - Previous Release

Initial portfolio release with Next.js 14, MDX blog, i18n, and project showcase.
