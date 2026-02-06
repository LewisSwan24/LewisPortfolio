# Lewis Dong — Portfolio

A production-ready, fully internationalized portfolio website for a UQ Master of Interaction Design student. Built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](#scripts)
[![Tests](https://img.shields.io/badge/tests-62%20passed-brightgreen)](#testing)
[![Lint](https://img.shields.io/badge/lint-0%20errors-brightgreen)](#scripts)
[![i18n](https://img.shields.io/badge/i18n-EN%20%7C%20ZH-blue)](#internationalization)

---

## Features

### Core
- **Next.js 14 App Router** — Server components, static generation, streaming
- **MDX Content** — Case studies and blog posts with full frontmatter support
- **TypeScript** — Strict typing across the entire codebase
- **Tailwind CSS** — Utility-first styling with custom design tokens

### UX & Interactivity
- **Global Search** — Fuzzy search with Fuse.js, keyboard shortcut (⌘K / Ctrl+K)
- **Theme Toggle** — Light/dark mode with system preference detection
- **Custom Cursor** — Magnetic cursor effect on desktop (pointer devices only)
- **Page Transitions** — Fade-in animations with `motion-reduce` support
- **Reading Progress** — Chapter-aware progress bar on article pages
- **Back to Top** — Smooth scroll button with scroll-aware visibility
- **3D Tilt Cards / Magnetic Buttons** — Interactive lab experiments

### Content
- **Project Case Studies** — MDX with auto-generated TOC, related projects, share buttons
- **Blog System** — Full blog with tag filtering, related articles, RSS feed, newsletter signup
- **Resume Page** — Timeline-based resume with PDF download and print hint
- **Lab Page** — Interactive UI experiment showcase

### SEO & Performance
- **JSON-LD Structured Data** — Person, WebSite, Article, CreativeWork, BreadcrumbList schemas
- **Dynamic OG Images** — Auto-generated per-project Open Graph images via `next/og`
- **Sitemap & Robots.txt** — Dynamically generated
- **Web Vitals Monitoring** — CLS, INP, FCP, LCP, TTFB tracking
- **Dynamic Imports** — Code-split heavy components (search modal, cursor, charts)

### Accessibility
- **Skip Links** — Jump to main content
- **Keyboard Navigation** — Full keyboard support with visible focus rings
- **ARIA Attributes** — Semantic roles, labels, and live regions
- **Reduced Motion** — All animations respect `prefers-reduced-motion`
- **Screen Reader Friendly** — Proper heading hierarchy and landmark regions

### Internationalization
- **EN / ZH** — Full bilingual support across all pages
- **Cookie-based** — Language preference persisted via cookie
- **Server-side** — Dictionary resolved at render time, no client-side flash

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (strict) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + CSS variables |
| **Content** | [MDX](https://mdxjs.com/) via next-mdx-remote |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) |
| **Search** | [Fuse.js](https://www.fusejs.io/) |
| **Theme** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **Testing** | [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/) |
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) |
| **Package Manager** | [pnpm](https://pnpm.io/) |

---

## Getting Started

### Prerequisites

- Node.js 18.17+
- pnpm 8.0+

### Installation

```bash
git clone <your-repo-url>
cd portfolio
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
pnpm build
pnpm start
```

---

## Project Structure

```
portfolio/
├── app/                            # Next.js App Router
│   ├── layout.tsx                  # Root layout (Navbar, Footer, providers)
│   ├── page.tsx                    # Home page
│   ├── about/page.tsx
│   ├── blog/
│   │   ├── page.tsx                # Blog listing with filters + RSS button
│   │   └── [slug]/page.tsx         # Blog detail with TOC, related posts
│   ├── contact/page.tsx            # Contact form (Formspree-ready)
│   ├── lab/page.tsx                # Interactive experiments
│   ├── projects/
│   │   ├── page.tsx                # Projects grid with search + tag filter
│   │   ├── ProjectsGrid.tsx        # Client component (grid/list toggle)
│   │   └── [slug]/
│   │       ├── page.tsx            # Project detail with JSON-LD
│   │       └── opengraph-image.tsx # Dynamic OG image
│   ├── resume/page.tsx             # Resume with timeline
│   ├── not-found.tsx               # Custom 404
│   ├── sitemap.ts / robots.ts      # SEO
│   └── feed.xml/route.ts           # RSS feed
├── content/
│   ├── projects/*.mdx              # Project case studies
│   └── blog/*.mdx                  # Blog posts
├── src/
│   ├── components/                 # 40+ React components
│   │   ├── Card.tsx                # Project card (grid/list view modes)
│   │   ├── SearchModal.tsx         # Global fuzzy search
│   │   ├── Toast.tsx               # Toast notification system
│   │   ├── ShareButtons.tsx        # Social sharing + copy link
│   │   ├── CustomCursor.tsx        # Magnetic cursor effect
│   │   ├── PageTransition.tsx      # Fade-in page transitions
│   │   └── ...
│   ├── lib/
│   │   ├── i18n.ts                 # EN/ZH dictionaries + helpers
│   │   ├── i18n-server.ts          # Server-side language detection
│   │   ├── seo.tsx                 # JSON-LD schema generators
│   │   ├── projects.ts             # MDX project data layer
│   │   ├── blog.ts                 # MDX blog data layer
│   │   ├── date.ts                 # Locale-aware date formatting
│   │   ├── toc.ts                  # Heading extraction for TOC
│   │   └── cn.ts                   # clsx + tailwind-merge
│   └── styles/globals.css          # Design tokens (HSL variables)
├── e2e/basic.spec.ts               # Playwright E2E tests (17 cases)
├── src/lib/__tests__/              # Vitest unit tests (62 tests)
├── public/                         # Static assets
├── tailwind.config.ts
├── vitest.config.ts
└── playwright.config.ts
```

---

## Configuration

### Site Metadata

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

### Design Tokens

Colors in `src/styles/globals.css` (HSL format):

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

Dictionaries live in `src/lib/i18n.ts`. Both `en` and `zh` objects must have identical key structures. Language is detected from a `lang` cookie and resolved server-side in `src/lib/i18n-server.ts`.

---

## Content Authoring

### Adding a Project

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
4. Add cover image to `public/images/`

### Adding a Blog Post

Same pattern in `content/blog/`. Additional frontmatter: `excerpt`, `author`, `readingTime` (auto-calculated).

### Frontmatter Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | string | Yes | URL identifier (must match filename) |
| `title` | string | Yes | Display title |
| `oneLiner` | string | Yes | One-line description |
| `tags` | string[] | Yes | Categories for filtering |
| `date` | string | Yes | ISO date for sorting |
| `featured` | boolean | No | Show on homepage |
| `cover` | string | No | Cover image path |

---

## Testing

### Unit Tests (Vitest)

```bash
pnpm vitest run          # Run all 62 tests
pnpm vitest --coverage   # With coverage report
```

Test suites: `cn`, `i18n`, `toc`, `seo`, `projects`, `blog`, `image-utils`

### E2E Tests (Playwright)

```bash
pnpm playwright test     # Run 17 E2E test cases
```

Covers: homepage, projects, blog, blog detail, contact, resume, lab, search, 404, accessibility, responsive design.

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in [Vercel](https://vercel.com) — auto-detects Next.js
3. Set environment variable: `NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app`
4. Deploy

### CLI

```bash
pnpm add -g vercel
vercel --prod
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server (http://localhost:3000) |
| `pnpm build` | Production build |
| `pnpm start` | Production server |
| `pnpm lint` | ESLint check |
| `pnpm vitest run` | Unit tests |
| `pnpm playwright test` | E2E tests |

---

## Troubleshooting

| Issue | Solution |
|-------|---------|
| Module not found | Run `pnpm install` |
| Project not appearing | Check MDX is in `content/projects/`, slug matches filename, all required frontmatter present |
| TOC empty | Use `##` / `###` headings in MDX content |
| Build fails | Run `pnpm build` locally to check TypeScript errors |
| Images not loading | Place in `public/`, reference with absolute paths (`/images/...`) |

---

## License

MIT

---

Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.
