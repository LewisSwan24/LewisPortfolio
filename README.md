# Lewis Dong — Portfolio (v3.0)

A statically generated, bilingual portfolio and hiring decision platform for a UQ Master of Interaction Design graduate & Design Engineer. Built with **Next.js 15 App Router**, **React 19**, **TypeScript 5.7**, **Tailwind CSS v4**, **GSAP 3**, **Zod 4**, and **next-intl**. There is no database: all 10 listed case studies live in a schema-validated **Unified Case Registry** (`src/data/cases/` + `src/lib/cases/`), the blog is file-based **MDX**, and every route renders statically in both English and Chinese.

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black)](#tech-stack)
[![React 19](https://img.shields.io/badge/React-19-blue)](#tech-stack)
[![i18n](https://img.shields.io/badge/i18n-EN%20%7C%20ZH-blue)](#internationalization)
[![A11y](https://img.shields.io/badge/WCAG%202.1-AA%20Audited-brightgreen)](#testing)

---

## Features

### Core Architecture (V3)
- **Next.js 15 + React 19 App Router** — Server Components by default, static generation across EN/ZH locales, minimal client hydration boundary
- **Unified Case Registry (`src/data/cases/*.ts`)** — Modular TypeScript case records validated at build & CI time via **Zod 4** (`src/lib/cases/schema.ts`), paired with the hiring proof registry (`src/lib/proof/`)
- **Lively Icons Design System (`src/styles/`)** — Tailwind CSS v4 (`@theme inline`) + layered editorial CSS (`tokens`, `base`, `primitives`, `sections/*`): warm paper surfaces (`#EFE8DA` / `#F7F4EC`), single terra accent (`#A63F2A`), monochrome dark mode (`#141413`), 1px solid borders, zero shadows/blur
- **Single-point GSAP Motion (`src/lib/motion/gsap.ts`)** — Centralized GSAP registration, `useGsapContext` cleanup, `prefers-reduced-motion` gating, native Pointer Events (no `framer-motion`)
- **Minimal i18n Client Payload** — Case study copy moved out of JSON bundles into TypeScript registry modules; `NextIntlClientProvider` ships only the 11 UI namespaces needed on the client

### Flagship Experience & Hiring Engine
- **10 Listed Case Studies** — Curated Top 6 featured deck on home (`maze`, `walkie`, `lamplight`, `autofill`, `fencepost`, `connect`) plus full work archive (`hoop`, `onthebeat`, `ai`, `wayfinding`), native `<dialog>` gallery lightbox (`CaseLightbox.tsx`), interactive `/lab?demo=` invariant cards, and click-to-load embeds (`fencepost-app.vercel.app`, `lewisswan24.github.io/lamplight-nook-site/`)
- **Interactive `/lab` Workbench** — Bilingual Lively Icons Design System Inspector, live GSAP Motion Sandbox, and 3 URL-linkable state-machine micro-demos (`On The Beat`, `Resume Autofill`, `Walkie`)
- **Lazy `cmdk` Warm-Paper Command Palette (`⌘K`)** — Dynamically mounted on demand and backed by static `/search-index/{en,zh}` JSON endpoints
- **Machine-Readable `/llms.txt`** — Static summary of all 10 listed case studies, capabilities, and evidence boundaries (excluding unlisted archives)
- **Role-Tailored Hiring Lens (`/hire?role=product|interaction|design-eng|ai-ux`)** — URL-driven case filtering with one-click copyable tailored links, evidence matrix, interview question bank, and proof packets
- **Print-First `/resume` + Playwright PDF Builder** — Clean print-to-PDF layout with `pnpm resume:pdf` generating crisp EN/ZH A4 vector PDFs on demand

### QA & Performance Moat
- **Media Optimization & Budget Gate (`pnpm media:optimize` / `pnpm media:check`)** — `sharp` + `ffmpeg` pipeline enforcing per-project and total media budgets
- **Bundle Budget Gate (`pnpm budget:check`)** — Enforces gzipped JS chunk and CSS payload ceilings after every production build
- **WCAG 2.1 AA Automated Audit (`e2e/a11y.spec.ts`)** — `@axe-core/playwright` scanning 9 primary EN/ZH routes in CI

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 15.5](https://nextjs.org/) (App Router) + [React 19](https://react.dev/) |
| **Language** | [TypeScript 5.7](https://www.typescriptlang.org/) (strict) + [Zod 4](https://zod.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + layered Lively Icons CSS tokens |
| **Motion** | [GSAP 3](https://gsap.com/) + native CSS / Pointer Events |
| **Search** | [cmdk](https://cmdk.paco.me/) |
| **i18n** | [next-intl 4](https://next-intl.dev/) |
| **Content** | Typed Case & Proof Registries + [MDX](https://mdxjs.com/) (`next-mdx-remote`) |
| **Linting** | [ESLint 9](https://eslint.org/) Flat Config (`eslint.config.mjs`) |
| **Testing** | [Vitest 4](https://vitest.dev/) + [Playwright](https://playwright.dev/) + [`@axe-core/playwright`](https://github.com/dequelabs/axe-core-npm) |
| **Media** | [sharp](https://sharp.pixelplumbing.com/) + `ffmpeg` |
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) + `web-vitals` |
| **Package Manager** | [pnpm 9](https://pnpm.io/) |

---

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm 9+

### Installation & Dev

```bash
git clone https://github.com/LewisSwan24/LewisPortfolio.git
cd LewisPortfolio
pnpm install
cp .env.example .env.local   # optional
pnpm dev
```

Open <http://localhost:3000> (redirects to `/en` or `/zh`).

### Environment Variables

All optional; the site builds and runs with none set (see `.env.example`):

```bash
NEXT_PUBLIC_SITE_URL=https://portfolio-lewisdong.vercel.app
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=
NEXT_PUBLIC_GISCUS_REPO=
NEXT_PUBLIC_GISCUS_REPO_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=
NEXT_PUBLIC_ENABLE_PROOF_MAINTENANCE=false
```

---

## Project Structure

```text
portfolio/
├── app/[locale]/               # Locale-scoped App Router pages (en | zh)
│   ├── page.tsx                # Home (Featured Top 6 deck)
│   ├── projects/               # Work index & modular case study routes
│   ├── lab/                    # Lively Icons Design System + GSAP + State Machines
│   ├── hire/                   # Role lens (?role=...), evidence matrix, interview Q&A
│   ├── resume/, about/, contact/, blog/
├── content/blog/               # Bilingual MDX blog posts (en + zh/)
├── src/
│   ├── data/cases/             # 10 modular TypeScript case records (Zod-validated)
│   ├── lib/
│   │   ├── cases/              # Zod schema + unified case registry selectors
│   │   ├── proof/              # Hiring proof modules, evidence matrix, role packets
│   │   └── motion/gsap.ts      # Centralized GSAP bootstrap & hooks
│   ├── components/
│   │   ├── case/               # Decomposed Server Components for case pages
│   │   ├── command/            # cmdk warm-paper CommandPalette
│   │   ├── hiring/             # RoleLensSwitch, EvidenceMatrix, InterviewQuestionBank
│   │   └── lab/                # Interactive LabWorkbench
│   ├── messages/               # Minimal UI-only i18n bundles (en.json, zh.json)
│   └── styles/                 # globals.css + tokens, base, primitives, sections/*
├── scripts/                    # Validation, media optimization, bundle budget, resume PDF
├── tests/                      # Vitest unit & component tests
└── e2e/                        # Playwright E2E + axe WCAG 2.1 AA specs
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Local Next.js 15 dev server |
| `pnpm build` / `pnpm start` | Production build & start |
| `pnpm typecheck` | TypeScript strict check (`tsc --noEmit`) |
| `pnpm lint` | ESLint 9 Flat Config (`eslint .`) |
| `pnpm test` / `pnpm test:ci` | Vitest watch / single CI run |
| `pnpm automation:check` | Content validation + Zod/Proof validation + automation tests |
| `pnpm proof:validate` | Case & Proof registry schema/asset verification |
| `pnpm media:optimize` / `pnpm media:check` | Optimize images/videos or enforce media budget |
| `pnpm budget:check` | Enforce gzipped JS & CSS bundle budgets after build |
| `pnpm resume:pdf` | Generate bilingual A4 vector resume PDFs (`output/resume/`) |
| `pnpm exec playwright test` | Run E2E + `@axe-core/playwright` WCAG 2.1 AA suite |
| `pnpm analyze` | Production build with `@next/bundle-analyzer` |

---

## License

MIT
