# Lewis Dong — Portfolio (`v4.5`)

**Live site:** [lewisdong.vercel.app](https://lewisdong.vercel.app)

A statically generated, bilingual (`en` / `zh`) interaction-design practice log and design-engineering portfolio built with **Next.js 15 App Router**, **React 19**, **TypeScript 5.7**, **Tailwind CSS v4**, **Three.js**, **GSAP 3**, **Zod 4**, and **next-intl**. Case studies live in a schema-validated **Unified Case Registry** (`src/data/cases/` + `src/lib/cases/`), essays live in file-based **MDX**, and interactive rationale exploration runs with offline/static defaults plus optional Redis persistence.

[![Live](https://img.shields.io/badge/Live-lewisdong.vercel.app-151412)](https://lewisdong.vercel.app)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black)](#tech-stack)
[![React 19](https://img.shields.io/badge/React-19-blue)](#tech-stack)
[![i18n](https://img.shields.io/badge/i18n-EN%20%7C%20ZH-blue)](#project-structure)
[![Accessibility](https://img.shields.io/badge/WCAG-AA%20Audited%20%2B%20AAA%20Text-brightgreen)](#quality-gates--testing)

---

## Core Architecture & Features

### 1. Swiss Editorial Design System & WCAG AAA Calibration
- **Surface & Text Tokens (`src/styles/v4/tokens.css`, `src/lib/design-tokens.ts`)** — Warm Bone White light theme (`#F6F4EF` / `#FCFBF8` / `#ECE8DF`) and Deep Charcoal studio dark theme (`#111110` / `#181816` / `#222220`) toggled via CSS `data-theme`. Body/secondary/tertiary text tokens (`--text`, `--text-2`, `--text-3`, `--text-4`) are calibrated and unit-tested (`tests/lib/design-tokens.test.ts`) to exceed `>= 7.0:1` WCAG AAA contrast across elevated surfaces.
- **12-Column Asymmetric Grid (`src/styles/v4/grid.css`)** — `.v4-editorial-grid` (`4-col` sticky rail + `8-col` studio showcase), `.v4-reading-grid` (`Sticky TOC + 68ch` blog reader), per-case `--case-mood` accent ribbons (`src/lib/cases/mood.ts`), and `Space Grotesk` + `Inter` + `Noto Sans SC` + `Geist Mono` typography.

### 2. Curated Case Studies, Tradeoffs & Evidence Boundaries
- **6 Listed Flagships + 8 Unlisted Archives (`src/data/cases/*.ts`)** — Public listings focus on 6 core works (`walkie`, `lamplight`, `autofill`, `maze`, `onthebeat`, `grassland`), while 8 earlier coursework/archive records stay direct-link accessible with `noindex, nofollow` and strict isolation from `/`, `/resume`, `/llms.txt`, and `/search-index/{en,zh}`.
- **Structured Design Decisions (`#design-decisions`)** — Every listed case documents `humanTension`, `rejectedAlternatives`, `chosenTradeoff`, and `residualCostOrRisk` via Zod `DesignDecisionTradeoffSchema`, accompanied by `/projects` `DecisionComparator` (`src/components/case/DecisionComparator.tsx`).
- **Interactive Prototypes & Process Artifacts** — Lazy-loaded simulators (`WalkieWristSim`, `LamplightTriageSim`, `AutofillConfidenceSim`, `MazeContactSim`, `GrasslandRulesSim`, `OntheBeatHandshakeSim`, etc.), before/after pointer scrubbers, research quote decks, vector micro-loops, and `Shift + P` 16:9 presentation slides (`PresentationShell.tsx`).

### 3. Shared Three.js Specimen Kernel & `/lab` Workbench
- **Lazy 3D Coordinate Stage (`src/components/three/SpecimenAxisCanvas.tsx`)** — Plots all 6 listed cases by human friction, boundary stance, and medium physicality. Renders an immediate `0ms` SSR SVG baseline with full keyboard selection, lazily mounts WebGL2 only when visible (`<= 160 kB gz` chunk, zero WebGL leaked into initial routes), cleans up via `dispose()`, and falls back silently when WebGL is disabled. Includes hardware specimens (`HardwareFieldCanvas.tsx`) on physical cases.
- **Bilingual `/lab` Workbench** — Token & AAA contrast inspector, GSAP paper-motion curve sandbox (`prefers-reduced-motion` aware), URL-linkable rule micro-demos (`/lab?demo=walkie|autofill|onthebeat`), and live zero-PII telemetry readout.

### 4. Grounded BM25 Rationale AI Lab & A4 Critique Dossiers
- **Zero-Hallucination Rationale AI Lab (`/[locale]/ai`, `src/lib/ai/`, `app/api/ai/match/route.ts`)** — Bilingual BM25 index covering 18 structured design-decision tradeoffs (`3` per listed flagship case), research observations (`2.4x`), validation limits (`2.0x`), and 7 published bilingual technical essays (`1.8x`), with client-side PII redaction (`redactPii`, `<= 1200` chars). Runs key-free (`bm25-local`) with optional OpenAI/Gemini reranking returning strict ID allowlists hydrated verbatim into 4-quadrant cards (`Human Tension / Rejected Path / Chosen Tradeoff / Honest Limit`). Surfaces consistently across `/[locale]/ai`, `⌘K` Command Palette, `/hire` JD Matcher, and `StudioAssistantDrawer`.
- **Editorial Critique A4 Print & Role Decks (`/[locale]/brief/print`, `pnpm decks:build`)** — Allocates `>= 60%` of each A4 page width to human tension, rejected paths, and all structured tradeoffs paired with an offline vector SVG QR code (`src/lib/pdf/qr-svg.ts`), plus 3 pre-built static PDFs under `public/decks/`.

### 5. Security Hardening, Native Primitives & Zero-PII Telemetry
- **Layered CSP Without Breaking SSG (`next.config.js`, `middleware.ts`)** — Removes `'unsafe-eval'` from production CSP, enforces `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, and `frame-ancestors 'none'`, and keeps all 79 static App Router pages `● (SSG)`. Dynamic `/brief/*` routes receive per-request cryptographic nonces (`x-request-nonce`) and `private, no-store` caching.
- **Native Top-Layer `<dialog>` Primitives** — Keyboard shortcuts help (`?` / `⌘/` via `KeyboardShortcutsModal.tsx`), `CaseLightbox.tsx`, and `PresentationShell.tsx` use `.showModal()` with automatic `Esc` dismissal and focus restoration.
- **Zero-PII RUM (`app/api/vitals/route.ts`, `src/lib/vitals-store.ts`)** — Strict Zod `.strict()` schema accepting only enum `metric` (`LCP`, `INP`, `CLS`, `FCP`, `TTFB`, `INTERACTION`), numeric value, and enum `routeGroup` / `interactionTarget`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js `15.5.29` (App Router) + React `19.3` |
| **Language & Schema** | TypeScript `5.7` (strict) + Zod `4` |
| **Styling** | Tailwind CSS v4 (`@theme inline`) + custom CSS tokens (`src/styles/`) |
| **Motion & 3D** | GSAP `3.15` + Three.js `0.187` (lazy isolated chunk) |
| **Search & i18n** | `cmdk` + static `/search-index/{en,zh}` + `next-intl` `4.8` |
| **Content** | Typed Case & Proof Registries + MDX (`next-mdx-remote` v6) |
| **Linting & QA** | ESLint 9 Flat Config + Vitest 4 + Playwright Chromium + `@axe-core/playwright` |
| **Media & Assets** | `sharp` + `ffmpeg` optimization pipeline |

---

## Getting Started

```bash
git clone https://github.com/LewisSwan24/LewisPortfolio.git
cd LewisPortfolio
pnpm install
cp .env.example .env.local   # optional
pnpm dev
```

Open <http://localhost:3000> (routes to `/en` or `/zh`).

### Environment Variables

All environment variables are optional; the site builds and operates statically without them (see [`.env.example`](.env.example)):

```bash
NEXT_PUBLIC_SITE_URL=https://lewisdong.vercel.app
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=
NEXT_PUBLIC_ENABLE_PROOF_MAINTENANCE=false
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
PORTFOLIO_ADMIN_SECRET=
CONTACT_WEBHOOK_URL=
```

---

## Project Structure

```text
portfolio/
├── app/[locale]/               # Locale-scoped routes (en | zh)
│   ├── page.tsx                # Home (Featured deck + 3D/SVG specimen coordinates)
│   ├── projects/               # Work index (DecisionComparator) + modular case pages
│   ├── lab/                    # Token inspector, GSAP sandbox, specimens & RUM panel
│   ├── ai/                     # Dedicated AI Lab (4-quadrant BM25 rationale & refusal matrix)
│   ├── hire/                   # Role lens, JD matcher, tailored brief & print/PDF decks
│   ├── brief/                  # Dynamic tailored brief ([id]) & A4 critique print
│   └── resume/, about/, contact/, blog/
├── content/blog/               # Bilingual MDX essays (en + zh/)
├── public/decks/               # Static pre-built role A4 PDF decks
├── src/
│   ├── data/cases/             # 14 modular Zod-validated case records (6 listed, 8 unlisted)
│   ├── lib/
│   │   ├── ai/                 # Bilingual evidence corpus index, PII redactor & BM25 matcher
│   │   ├── cases/              # Zod schema, registry selectors & mood color tokens
│   │   ├── motion/gsap.ts      # Centralized GSAP bootstrap & cleanup hook
│   │   ├── pdf/qr-svg.ts       # Pure TypeScript byte-mode QR SVG encoder
│   │   └── proof/              # Hiring role claims, matrix, Q&A & maintenance metadata
│   ├── components/
│   │   ├── ai/, brief/, case/, command/, hiring/, lab/, providers/, three/
│   ├── messages/               # Minimal UI-only i18n bundles (en.json, zh.json)
│   └── styles/                 # v4/tokens.css, v4/grid.css, base, primitives, sections/*
├── scripts/                    # Validation, media & bundle budget checks, PDF generators
├── tests/                      # Vitest suites (40 files / 206 unit & component tests)
└── e2e/                        # Playwright E2E + Axe WCAG 2.1 AA + CSP/CWV specs
```

---

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` / `pnpm build` / `pnpm start` | Next.js 15 dev server, production build (`77` pages) & server |
| `pnpm typecheck` | TypeScript strict check (`tsc --noEmit`) |
| `pnpm lint` | ESLint 9 Flat Config (`eslint .`) |
| `pnpm test:ci` | Vitest full run (`40` files / `205` tests) |
| `pnpm automation:check` | Content validation + `proof:validate` + blog/automation tests |
| `pnpm media:optimize` / `pnpm media:check` | Optimize project assets (`<= 12.00 MB` budget check) |
| `pnpm budget:check` | Enforce JS chunk (`<= 70 kB`, lazy 3D `<= 160 kB`, route `<= 20 kB`) & App CSS (`<= 30 kB`) |
| `pnpm resume:pdf` | Generate EN/ZH A4 resume PDFs via Chromium |
| `pnpm decks:build` | Generate the 3 curated A4 role critique PDF decks (`public/decks/*.pdf`) |
| `pnpm exec playwright test --project=chromium` | Full Chromium E2E, crawler, dark/mobile Axe A11y & security headers suite |

---

## Quality Gates & Testing

Every push and Pull Request runs both `quality` and `e2e` jobs in [GitHub Actions CI](.github/workflows/ci.yml) on `ubuntu-24.04` (Node 22, Chromium):
- **Unit & Integration**: `40` test files / `205` tests covering Zod schemas, WCAG AAA relative-luminance contrast math, PII redaction, BM25 hydration, QR matrix generation, zero-PII vitals validation, and RTL component interactions.
- **E2E & Accessibility**: Automated Chromium crawl across all public EN/ZH routes, light/dark/375px `@axe-core/playwright` audits, native `<dialog>` focus traps, interactive simulator state machines, WebGL silent fallback, and `0` `securitypolicyviolation` checks.

---

## License

MIT
