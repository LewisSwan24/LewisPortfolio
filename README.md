# Lewis Dong — Portfolio

A statically generated, fully internationalized portfolio for a UQ Master of Interaction Design student. Built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, and **next-intl**. There is no database: case studies live in a typed **proof registry** (`src/lib/proof/`), the blog is file-based **MDX**, and everything renders statically in both English and Chinese.

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](#scripts)
[![Lint](https://img.shields.io/badge/lint-0%20errors-brightgreen)](#scripts)
[![i18n](https://img.shields.io/badge/i18n-EN%20%7C%20ZH-blue)](#internationalization)
[![SEO](https://img.shields.io/badge/SEO-schema%20%7C%20hreflang%20%7C%20RSS-blue)](#seo--performance)

---

## Features

### Core
- **Next.js 14 App Router** — Server components, static generation, route groups
- **Locale routing (`/[locale]/...`)** — Real URL segments (`/en/...`, `/zh/...`), not cookie-only
- **Proof registry** — Case studies, hiring evidence, and role packets defined once in typed modules (`src/lib/proof/`), validated in CI via `pnpm proof:validate`
- **MDX blog** — Bilingual posts (`content/blog/` + `content/blog/zh/`) with full frontmatter
- **TypeScript strict** — Fully typed codebase
- **Tailwind CSS + CSS variables** — Utility-first styling with HSL design tokens

### UX & interactivity
- **Global search** — Fuzzy search (Fuse.js) with keyboard shortcut (⌘K / Ctrl+K)
- **Theme toggle** — Light/dark with system preference detection (next-themes)
- **Language toggle** — Explicit EN/ZH switch that preserves route path
- **Reading progress + chapter markers** — Chapter-aware progress bar on articles
- **Custom cursor, tilt cards, magnetic buttons, parallax** — Interactive polish on pointer devices; all respect `prefers-reduced-motion`
- **Page transitions, back-to-top, toast notifications, keyboard shortcuts modal**

### Content
- **Case studies** — Six cases (Connect, Spectra, AI, MazeRunners, Vigil, Hoop Dream) sourced from the proof registry, with per-project OG images and click-to-load live demo embeds (MazeRunners demo, Vigil prototype)
- **Hire page** — Role fits, evidence matrix, interview question bank, downloadable proof packets
- **Blog** — Bilingual, tag filtering, related posts, reading time, Giscus (GitHub Discussions) comments
- **Resume** — Timeline layout with PDF download and print hint
- **Lab** — Interactive UI experiment showcase
- **Contact** — Form posting to an external endpoint (`NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`, e.g. Formspree)

### SEO & performance
- **JSON-LD structured data** — Person, WebSite, Article, CreativeWork, BreadcrumbList
- **Dynamic OG images** — Per-project and per-blog-post via `next/og`
- **Sitemap + robots** — Dynamically generated, hreflang-aware
- **RSS feeds** — `/feed.xml` (EN) and `/zh/feed.xml` (ZH)
- **Canonical + hreflang + OG/Twitter tags** — Wired through `src/lib/seo.tsx`
- **Web Vitals monitoring** — CLS, INP, FCP, LCP, TTFB via `@vercel/analytics` + `web-vitals`
- **Dynamic imports** — Heavy components code-split (search modal, cursor, embeds)
- **Bundle analyzer** — `pnpm analyze`

### Accessibility
- Skip links, full keyboard navigation, visible focus rings
- ARIA roles, labels, live regions
- All animations respect `prefers-reduced-motion`
- Proper heading hierarchy and landmark regions

### Internationalization
- **next-intl** — Messages loaded server-side, `NextIntlClientProvider` hydrates on the client
- **`/en` and `/zh` routes** — Static-rendered per locale via `generateStaticParams`
- **`<html lang>` set dynamically** and hreflang alternates emitted
- **Bilingual content, not translated content** — Case copy and blog posts are written per locale

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 14.2](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5.7](https://www.typescriptlang.org/) (strict) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) + CSS variables |
| **i18n** | [next-intl 4](https://next-intl.dev/) |
| **Content** | Typed proof registry + [MDX](https://mdxjs.com/) via `next-mdx-remote` + `gray-matter` |
| **Comments** | [Giscus](https://giscus.app/) (GitHub Discussions) |
| **Animation** | [Framer Motion 11](https://www.framer.com/motion/) |
| **Search** | [Fuse.js 7](https://www.fusejs.io/) |
| **Theme** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **Testing** | [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/) |
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) + [web-vitals](https://github.com/GoogleChrome/web-vitals) |
| **Package manager** | [pnpm](https://pnpm.io/) |

There is **no database, auth, or server-side persistence** — no Prisma, no Supabase. Comments run on Giscus and the contact form posts to an external form endpoint.

---

## Getting started

### Prerequisites

- Node.js 18.17+ (Node 20+ recommended)
- pnpm 8+

### Installation

```bash
git clone <your-repo-url>
cd portfolio
pnpm install
cp .env.example .env.local   # optional — see below
pnpm dev
```

Open <http://localhost:3000> — you will be redirected to `/en` (or `/zh` based on `Accept-Language`).

### Environment variables

All optional; the site builds and runs with none set (see `.env.example`):

```bash
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Contact form endpoint (Formspree / Getform / Basin, etc.)
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=

# Giscus comments (all four must be set to enable comments on blog posts)
NEXT_PUBLIC_GISCUS_REPO=
NEXT_PUBLIC_GISCUS_REPO_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=

# Internal proof maintenance route (local/dev only)
NEXT_PUBLIC_ENABLE_PROOF_MAINTENANCE=false
```

> **Giscus**: the blog detail page auto-hides the comments section if any of the four values are missing, so it's safe to leave unset in development.

### Production build

```bash
pnpm build
pnpm start
```

---

## Project structure

```
portfolio/
├── app/
│   ├── [locale]/                # Locale-scoped pages (en | zh)
│   │   ├── layout.tsx           # NextIntlClientProvider, theme, nav, footer
│   │   ├── page.tsx             # Home
│   │   ├── about/, resume/, lab/, contact/
│   │   ├── hire/                # Role fits, evidence matrix, interview prep
│   │   ├── maintenance/proof/   # Internal proof maintenance view (dev only)
│   │   ├── blog/
│   │   │   ├── page.tsx         # Listing + filters
│   │   │   └── [slug]/page.tsx  # Article + TOC + related + Giscus comments
│   │   ├── projects/
│   │   │   ├── page.tsx         # Grid + filters
│   │   │   ├── WorkIndex.tsx    # Client grid/list toggle
│   │   │   └── [slug]/
│   │   │       ├── page.tsx            # Case study + JSON-LD + demo embeds
│   │   │       └── opengraph-image.tsx # Per-project OG
│   │   └── [...rest]/page.tsx   # 404 fallback within locale
│   ├── feed.xml/route.ts        # RSS (EN)
│   ├── zh/feed.xml/route.ts     # RSS (ZH)
│   ├── sitemap.ts, robots.ts, manifest.ts
│   ├── opengraph-image.tsx      # Default site OG
│   └── layout.tsx               # Root <html> shell
├── content/
│   └── blog/                    # EN posts (*.mdx) + zh/ mirror
├── src/
│   ├── components/              # Components organized by concern
│   │   ├── case/                # Case-study building blocks, DemoEmbed
│   │   ├── hiring/              # EvidenceMatrix, InterviewQuestionBank, …
│   │   ├── layout/, navigation/, content/, effects/, providers/, seo/, ui/, viz/
│   ├── i18n/                    # next-intl routing + request config
│   ├── lib/
│   │   ├── proof/               # Proof registry: projects, matrix, validation,
│   │   │                        # role packets, handoff/export, release bundle
│   │   ├── seo.tsx              # JSON-LD schema generators
│   │   ├── blog.ts, feed.ts     # MDX data layer + RSS builder
│   │   ├── project-routes.ts    # Case routing helpers
│   │   └── site.ts              # Site config
│   ├── messages/                # next-intl bundles (en.json, zh.json)
│   └── styles/globals.css       # HSL design tokens + Tailwind layers
├── scripts/                     # Content automation + proof tooling (*.mjs)
├── tests/                       # Vitest suites (components, lib, scripts)
├── e2e/                         # Playwright specs
├── public/                      # Static assets, project media, demos
└── tailwind.config.ts, vitest.config.ts, playwright.config.ts
```

---

## Configuration

### Site metadata

Edit `src/lib/site.ts`.

### Design tokens

HSL variables in `src/styles/globals.css`:

```css
:root {
  --background: 0 0% 98%;
  --foreground: 220 15% 15%;
  --accent: 220 80% 55%;
}
.dark {
  --background: 220 15% 10%;
  --foreground: 220 10% 92%;
  --accent: 220 80% 60%;
}
```

### Internationalization

- Message bundles: `src/messages/en.json`, `src/messages/zh.json` (same key shape)
- Routing: `src/i18n/routing.ts` (locales, default, prefix strategy)
- Request config: `src/i18n/request.ts` (loads messages per request)
- `<html lang>` and hreflang alternates are emitted from `app/[locale]/layout.tsx` and `src/lib/seo.tsx`

---

## Content authoring

### Case studies (proof registry)

Case studies are **not MDX** — they live as typed data in `src/lib/proof/projects.ts` (both locales in one place), rendered by `app/[locale]/projects/[slug]/page.tsx`. To add or edit a case:

1. Edit `src/lib/proof/projects.ts` — add EN and ZH entries with matching slugs
2. Put media under `public/projects/<slug>/`
3. Validate: `pnpm proof:validate` (also runs in CI)

Supporting tooling: `pnpm proof:maintenance` (freshness report), `pnpm proof:handoff`, `pnpm proof:export`, `pnpm proof:bundle`.

### Blog posts

```bash
pnpm blog:new         # scaffold a draft
pnpm blog:publish     # promote a draft
pnpm content:validate # frontmatter + content checks
```

Posts live in `content/blog/*.mdx` with a Chinese counterpart in `content/blog/zh/`. Frontmatter: `slug`, `title`, `excerpt`, `tags`, `date`, plus optional `featured` and `cover`; `readingTime` is auto-calculated. Use `##`/`###` headings — they are auto-extracted for the TOC.

---

## Testing

### Unit tests (Vitest)

```bash
pnpm test                # watch mode
pnpm test -- run         # single run
pnpm test:coverage       # coverage report
pnpm test:ui             # Vitest UI
pnpm automation:check    # content + proof validation + related suites
```

Suites live in `tests/` (components, lib, scripts) and `src/lib/__tests__/`.

### E2E tests (Playwright)

```bash
pnpm exec playwright install   # first time only
pnpm exec playwright test
```

Covers: home, projects, blog (list + detail), hire, contact, resume, lab, search, 404, a11y landmarks, responsive breakpoints — in both locales.

---

## Deployment

### Vercel (recommended)

1. Push to GitHub.
2. Import the repo in [Vercel](https://vercel.com) — framework auto-detected.
3. Add environment variables (at minimum `NEXT_PUBLIC_SITE_URL`; plus the contact endpoint / Giscus values if used).
4. Deploy. Preview deployments are created per PR.

### CLI

```bash
pnpm add -g vercel
vercel --prod
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server at <http://localhost:3000> |
| `pnpm build` | Production build |
| `pnpm start` | Production server |
| `pnpm lint` | ESLint (`eslint-config-next`) |
| `pnpm test` / `test:coverage` / `test:ui` | Vitest |
| `pnpm analyze` | Build with `@next/bundle-analyzer` |
| `pnpm exec playwright test` | E2E suite |
| `pnpm blog:new` / `blog:publish` | Blog scaffolding and publishing |
| `pnpm content:validate` | Blog frontmatter/content checks |
| `pnpm proof:validate` | Proof registry validation (CI gate) |
| `pnpm proof:maintenance` | Proof freshness report |
| `pnpm proof:handoff` / `proof:export` / `proof:bundle` | Proof packaging tooling |
| `pnpm automation:check` | content:validate + proof:validate + related tests |

---

## Troubleshooting

| Issue | Solution |
|-------|---------|
| Module not found | Run `pnpm install` |
| Case not appearing | Check `src/lib/proof/projects.ts` — both locales present, slugs match; run `pnpm proof:validate` |
| Blog post not appearing | Check MDX lives in `content/blog/` (and `zh/`), slug matches filename, required frontmatter present; run `pnpm content:validate` |
| TOC empty | Use `##` / `###` headings in MDX |
| Build fails | Run `pnpm build` locally — surfaces TypeScript errors |
| Images not loading | Place under `public/`, reference with absolute path (`/projects/...` or `/images/...`) |
| Wrong language on first load | Check the URL — language is driven by `/en` vs `/zh` route prefix, not a cookie |

---

## License

MIT

---

Built with Next.js, TypeScript, Tailwind CSS, next-intl, and Framer Motion.
