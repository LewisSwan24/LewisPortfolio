# Changelog

All notable changes to this project will be documented in this file.

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
