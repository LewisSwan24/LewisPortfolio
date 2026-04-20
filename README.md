# Lewis Dong — Portfolio

A production-ready, fully internationalized portfolio for a UQ Master of Interaction Design student. Built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, **next-intl**, and **Prisma + PostgreSQL**.

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](#scripts)
[![Lint](https://img.shields.io/badge/lint-0%20errors-brightgreen)](#scripts)
[![i18n](https://img.shields.io/badge/i18n-EN%20%7C%20ZH-blue)](#internationalization)
[![SEO](https://img.shields.io/badge/SEO-schema%20%7C%20hreflang%20%7C%20RSS-blue)](#seo--performance)

---

## Features

### Core
- **Next.js 14 App Router** — Server components, static generation, streaming, route groups
- **Locale routing (`/[locale]/...`)** — Real URL segments (`/en/...`, `/zh/...`), not cookie-only
- **MDX content** — Case studies and blog posts with full frontmatter
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
- **Project case studies** — MDX with auto TOC, related projects, share buttons, per-project OG image
- **Blog** — Tag filtering, related posts, reading time, comments, reactions
- **Resume** — Timeline layout with PDF download and print hint
- **Lab** — Interactive UI experiment showcase
- **Guestbook + comments** — Postgres-backed, moderated via admin routes
- **Booking** — Meeting request form wired to API route
- **Newsletter** — Resend-based subscription flow

### Admin (`/app/(admin)`)
- Dashboard, posts, projects management routes (private route group)

### APIs (`/app/api/*`)
- `contact`, `subscribe`, `comments`, `reactions`, `guestbook`, `booking`, `chat`

### SEO & performance
- **JSON-LD structured data** — Person, Organization, WebSite, Article, CreativeWork, BreadcrumbList
- **Dynamic OG images** — Per-project and per-blog-post via `next/og`
- **Sitemap + robots** — Dynamically generated, hreflang-aware
- **RSS feeds** — `/feed.xml` (EN) and `/zh/feed.xml` (ZH)
- **Canonical + hreflang + OG/Twitter tags** — Wired through `src/lib/seo.tsx`
- **Web Vitals monitoring** — CLS, INP, FCP, LCP, TTFB via `@vercel/analytics` + `web-vitals`
- **Dynamic imports** — Heavy components code-split (search modal, cursor, charts)
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

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 14.2](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5.7](https://www.typescriptlang.org/) (strict) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) + CSS variables |
| **i18n** | [next-intl 4](https://next-intl.dev/) |
| **Content** | [MDX](https://mdxjs.com/) via `next-mdx-remote` + `gray-matter` |
| **Database** | [PostgreSQL](https://www.postgresql.org/) via [Prisma 7](https://www.prisma.io/) |
| **Auth/storage** | [Supabase](https://supabase.com/) (`@supabase/ssr`) |
| **Email** | [Resend](https://resend.com/) |
| **Animation** | [Framer Motion 11](https://www.framer.com/motion/) |
| **Search** | [Fuse.js 7](https://www.fusejs.io/) |
| **Theme** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **Testing** | [Vitest 4](https://vitest.dev/) + [Playwright 1.57](https://playwright.dev/) |
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) + [web-vitals](https://github.com/GoogleChrome/web-vitals) |
| **Package manager** | [pnpm](https://pnpm.io/) |

---

## Getting started

### Prerequisites

- Node.js 18.17+ (Node 20+ recommended)
- pnpm 8+
- PostgreSQL database (local or hosted — e.g. Supabase, Neon)

### Installation

```bash
git clone <your-repo-url>
cd portfolio
pnpm install          # runs `prisma generate` automatically
cp .env.example .env  # then fill in values (see below)
pnpm prisma migrate deploy
pnpm dev
```

Open <http://localhost:3000> — you will be redirected to `/en` (or `/zh` based on `Accept-Language`).

### Environment variables

Minimum set (see `.env.example` for the full list):

```bash
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Database
DATABASE_URL=postgres://user:pass@host:5432/db

# Supabase (optional — required for admin/auth features)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Email (optional — required for contact / subscribe)
RESEND_API_KEY=
CONTACT_TO_EMAIL=

# Giscus comments (optional — all four must be set to enable comments on blog posts)
# Get these by configuring a repo at https://giscus.app
NEXT_PUBLIC_GISCUS_REPO=
NEXT_PUBLIC_GISCUS_REPO_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=
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
│   │   ├── blog/
│   │   │   ├── page.tsx         # Listing + filters
│   │   │   ├── BlogIndex.tsx    # Client index component
│   │   │   └── [slug]/page.tsx  # Article + TOC + related + comments
│   │   ├── projects/
│   │   │   ├── page.tsx         # Grid + filters
│   │   │   ├── WorkIndex.tsx    # Client grid/list toggle
│   │   │   └── [slug]/
│   │   │       ├── page.tsx            # Case study + JSON-LD
│   │   │       └── opengraph-image.tsx # Per-project OG
│   │   └── [...rest]/page.tsx   # 404 fallback within locale
│   ├── (admin)/                 # Private route group
│   │   ├── dashboard/, posts/, projects/
│   ├── api/                     # Route handlers
│   │   ├── contact/, subscribe/, chat/
│   │   ├── comments/, reactions/, guestbook/, booking/
│   ├── guestbook/, booking/     # Public non-localized pages
│   ├── feed.xml/route.ts        # RSS (EN)
│   ├── zh/feed.xml/route.ts     # RSS (ZH)
│   ├── sitemap.ts, robots.ts, manifest.ts
│   ├── opengraph-image.tsx      # Default site OG
│   └── layout.tsx               # Root <html> shell
├── content/
│   ├── projects/*.mdx           # 4 case studies
│   └── blog/*.mdx               # Blog posts
├── src/
│   ├── components/              # ~100 components organized by concern
│   │   ├── layout/              # Navigation, Footer, SkipLink, Breadcrumb
│   │   ├── navigation/          # Search, SearchModal, BackToTop
│   │   ├── content/             # MDX components, TOC, ReadingProgress,
│   │   │                        # ShareButtons, Comments, RelatedPosts,
│   │   │                        # NewsletterSignup, ContactForm
│   │   ├── effects/             # CustomCursor, TiltCard, MagneticButton,
│   │   │                        # Parallax, PageTransition, Typewriter
│   │   ├── providers/           # ThemeProvider, Toast, ErrorBoundary,
│   │   │                        # PerformanceMonitor, KeyboardShortcutsModal
│   │   ├── seo/                 # DynamicImports, skill viz, visitor counters
│   │   └── ui/                  # Button, Card, Container, Tag, Prose, …
│   ├── i18n/                    # next-intl routing + request config
│   ├── lib/
│   │   ├── seo.tsx              # JSON-LD schema generators
│   │   ├── projects.ts, blog.ts # MDX data layer
│   │   ├── feed.ts              # RSS builder
│   │   ├── date.ts, toc.ts, cn.ts
│   │   ├── site.ts              # Site config
│   │   └── __tests__/*.test.ts  # Vitest unit tests
│   ├── messages/                # next-intl message bundles (en.json, zh.json)
│   └── styles/globals.css       # HSL design tokens + Tailwind layers
├── prisma/schema.prisma         # Comments, reactions, guestbook, bookings
├── e2e/                         # Playwright specs
├── public/                      # Static assets, images
└── tailwind.config.ts, vitest.config.ts, playwright.config.ts
```

---

## Configuration

### Site metadata

Edit `src/lib/site.ts`:

```typescript
export const siteConfig = {
  name: "Your Name",
  title: "Interaction Designer",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  author: { name: "Your Name", email: "you@example.com", location: "City" },
  social: { linkedin: "...", github: "...", dribbble: "..." },
};
```

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

### Database

Schema lives in `prisma/schema.prisma`. `pnpm install` runs `prisma generate`; run migrations with:

```bash
pnpm prisma migrate dev       # local
pnpm prisma migrate deploy    # production
```

---

## Content authoring

### Adding a project

1. Create `content/projects/my-project.mdx`
2. Add frontmatter:

```yaml
---
slug: my-project
title: My Project
oneLiner: Brief description
role: Lead Designer
timeframe: Jan – Mar 2024
tools: [Figma, Miro]
tags: [UX Design, Mobile App]
featured: true
status: Completed
cover: /images/my-project-cover.png
date: 2024-03-15
---
```

3. Write content with `##` and `###` headings (auto-extracted for TOC)
4. Put cover image in `public/images/`

### Adding a blog post

Same pattern in `content/blog/`. Extra frontmatter: `excerpt`, `author`; `readingTime` is auto-calculated.

### Frontmatter reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | string | Yes | URL identifier (must match filename) |
| `title` | string | Yes | Display title |
| `oneLiner` / `excerpt` | string | Yes | Summary shown in lists and meta |
| `tags` | string[] | Yes | Categories for filtering |
| `date` | string | Yes | ISO date for sorting |
| `featured` | boolean | No | Surface on home page |
| `cover` | string | No | Cover image path under `/public` |

---

## Testing

### Unit tests (Vitest)

```bash
pnpm test                # watch mode
pnpm test -- run         # single run
pnpm test:coverage       # coverage report
pnpm test:ui             # Vitest UI
```

Covered modules: `cn`, `i18n`, `toc`, `seo`, `projects`, `blog`, `site`, `resume-data`, `contact-api`, `subscribe-api`.

### E2E tests (Playwright)

```bash
pnpm exec playwright install   # first time only
pnpm exec playwright test
```

Covers: home, projects, blog (list + detail), contact, resume, lab, search, 404, a11y landmarks, responsive breakpoints.

---

## Deployment

### Vercel (recommended)

1. Push to GitHub.
2. Import the repo in [Vercel](https://vercel.com) — framework auto-detected.
3. Add environment variables (at minimum `NEXT_PUBLIC_SITE_URL`, `DATABASE_URL`; plus Supabase / Resend if used).
4. Deploy. Preview deployments are created per PR.

### CLI

```bash
pnpm add -g vercel
vercel env pull .env.local
vercel --prod
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server at <http://localhost:3000> |
| `pnpm build` | Production build (runs `prisma generate` via postinstall) |
| `pnpm start` | Production server |
| `pnpm lint` | ESLint (`eslint-config-next`) |
| `pnpm test` | Vitest watch |
| `pnpm test -- run` | Vitest single run |
| `pnpm test:coverage` | Vitest with coverage |
| `pnpm test:ui` | Vitest UI |
| `pnpm analyze` | Build with `@next/bundle-analyzer` |
| `pnpm exec playwright test` | E2E suite |
| `pnpm prisma migrate deploy` | Apply database migrations |

---

## Troubleshooting

| Issue | Solution |
|-------|---------|
| Module not found | Run `pnpm install` |
| `prisma` errors on install | Ensure `DATABASE_URL` is reachable or skip with `PRISMA_SKIP_POSTINSTALL_GENERATE=1` |
| Project not appearing | Check MDX lives in `content/projects/`, slug matches filename, required frontmatter is present |
| TOC empty | Use `##` / `###` headings in MDX |
| Build fails | Run `pnpm build` locally — surfaces TypeScript errors |
| Images not loading | Place under `public/`, reference with absolute path (`/images/...`) |
| Wrong language on first load | Check the URL — language is driven by `/en` vs `/zh` route prefix, not a cookie |

---

## License

MIT

---

Built with Next.js, TypeScript, Tailwind CSS, next-intl, Prisma, and Framer Motion.
