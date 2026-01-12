# Portfolio Website

A production-ready portfolio website skeleton for a UQ Interaction Design master student. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Modern Stack**: Next.js 14 App Router, TypeScript, Tailwind CSS
- **MDX Content**: Write case studies and blog posts in MDX with full frontmatter support
- **Theme Toggle**: Light/dark mode with next-themes
- **Dynamic OG Images**: Auto-generated Open Graph images for sharing
- **SEO Ready**: Sitemap, robots.txt, JSON-LD structured data, and comprehensive metadata
- **Responsive Design**: Mobile-first with accessible components
- **Table of Contents**: Auto-generated TOC from MDX headings
- **Tag Filtering**: Filter projects by tags on the projects page
- **Global Search**: Search projects and blog posts with keyboard shortcut (⌘K / Ctrl+K)
- **Blog System**: Full-featured blog with MDX support
- **Internationalization**: English and Chinese language support
- **Back to Top**: Smooth scroll back to top button
- **Accessibility**: Skip links, ARIA labels, and keyboard navigation
- **Contact Form**: Configurable contact form with Formspree integration

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **MDX**: [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Package Manager**: [pnpm](https://pnpm.io/)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm 8.0 or later

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
portfolio/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── about/page.tsx            # About page
│   ├── contact/page.tsx          # Contact page
│   ├── resume/page.tsx           # Resume page
│   ├── projects/
│   │   ├── page.tsx              # Projects listing
│   │   ├── ProjectsGrid.tsx      # Client component for filtering
│   │   └── [slug]/
│   │       ├── page.tsx          # Individual project page
│   │       └── opengraph-image.tsx
│   ├── not-found.tsx             # 404 page
│   ├── sitemap.ts                # Dynamic sitemap
│   ├── robots.ts                 # Robots.txt
│   └── opengraph-image.tsx       # Default OG image
├── content/
│   ├── projects/                 # MDX project files
│   │   ├── spectra-lens.mdx
│   │   ├── uq-connect.mdx
│   │   └── connect-circles.mdx
│   └── blog/                     # MDX blog posts
│       ├── ux-research-methods-guide.mdx
│       └── accessibility-in-design.mdx
├── src/
│   ├── components/               # React components
│   │   ├── BackToTop.tsx         # Back to top button
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ContactForm.tsx       # Contact form with validation
│   │   ├── Container.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Navbar.tsx
│   │   ├── PageTransition.tsx    # Page transition animations
│   │   ├── Prose.tsx
│   │   ├── SearchModal.tsx       # Global search modal
│   │   ├── SectionHeading.tsx
│   │   ├── SkipLink.tsx          # Accessibility skip link
│   │   ├── Tag.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── TOC.tsx
│   │   ├── mdx-components.tsx
│   │   └── index.ts
│   ├── lib/                      # Utility functions
│   │   ├── blog.ts               # Blog data fetching
│   │   ├── cn.ts                 # Class name utility
│   │   ├── i18n.ts               # Internationalization
│   │   ├── projects.ts           # Project data fetching
│   │   ├── seo.tsx               # SEO & structured data
│   │   ├── site.ts               # Site configuration
│   │   └── toc.ts                # TOC extraction
│   └── styles/
│       └── globals.css           # Global styles & CSS variables
├── public/
│   ├── favicon.svg
│   ├── resume.pdf
│   └── images/
│       └── cover-placeholder-*.png
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Configuration

### Site Metadata

Edit `src/lib/site.ts` to customize:

```typescript
export const siteConfig = {
  name: "Your Name",
  title: "Interaction Designer",
  description: "Your description...",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  author: {
    name: "Your Name",
    email: "your@email.com",
    location: "Your Location",
  },
  social: {
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourprofile",
    dribbble: "https://dribbble.com/yourprofile",
  },
  // ... more options
};
```

### Design Tokens

Colors are defined in `src/styles/globals.css` using CSS variables (HSL format):

```css
:root {
  --background: 0 0% 98%;
  --foreground: 220 15% 15%;
  --accent: 220 80% 55%;
  /* ... more tokens */
}

.dark {
  --background: 220 15% 10%;
  --foreground: 220 10% 92%;
  --accent: 220 80% 60%;
  /* ... more tokens */
}
```

To change the accent color, modify the `--accent` values in both `:root` and `.dark`.

## Adding New Projects

1. Create a new MDX file in `content/projects/`:

```bash
touch content/projects/my-new-project.mdx
```

2. Add frontmatter and content:

```mdx
---
slug: my-new-project
title: My New Project
oneLiner: A brief description of the project
role: Lead Designer
timeframe: Jan 2024 - Mar 2024
tools:
  - Figma
  - Miro
tags:
  - UX Design
  - Mobile App
featured: true
status: Completed
cover: /images/my-project-cover.png
date: 2024-03-15
---

## Overview

Your project overview...

## Problem

The problem you solved...

## Research

Your research process...

## Insights

Key insights...

## Ideation

Design exploration...

## Prototype

Prototyping details...

## Testing

Testing and iteration...

## Outcome

Results and impact...

## Reflection

Learnings and next steps...
```

3. Add a cover image to `public/images/`

4. The project will automatically appear on the projects page

### Required Frontmatter Fields

| Field | Type | Description |
|-------|------|-------------|
| `slug` | string | URL-safe identifier (must match filename) |
| `title` | string | Project title |
| `oneLiner` | string | Brief description |
| `role` | string | Your role in the project |
| `timeframe` | string | Project duration |
| `tools` | string[] | Tools used |
| `tags` | string[] | Categories/tags |
| `featured` | boolean | Show on homepage |
| `status` | string | "Completed", "In Progress", etc. |
| `cover` | string | Path to cover image |
| `date` | string | ISO date for sorting |

## Deploy to Vercel

### Option 1: Deploy from GitHub

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Next.js - no configuration needed
6. Click "Deploy"

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables (Optional)

Set in Vercel dashboard or `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

## OG Images

Dynamic Open Graph images are generated at:

- **Site-wide**: `/opengraph-image.png`
- **Per project**: `/projects/[slug]/opengraph-image.png`

These are generated using `next/og` ImageResponse. To customize:

1. Edit `app/opengraph-image.tsx` for the default image
2. Edit `app/projects/[slug]/opengraph-image.tsx` for project images

The accent color in OG images is hardcoded to `#3b82f6` (blue). Update the hex value in both files to match your accent color.

## Troubleshooting

### "Cannot find module" errors in IDE

Run `pnpm install` to install dependencies. TypeScript errors in the IDE will resolve after installation.

### Project not appearing

1. Check that the `.mdx` file is in `content/projects/`
2. Verify the `slug` in frontmatter matches the filename
3. Ensure all required frontmatter fields are present
4. Restart the dev server

### TOC not working

1. Ensure headings use `##` (h2) or `###` (h3) syntax
2. Headings must be plain text (no links or code)
3. Check that `extractTOC` is being called with the content

### Build fails on Vercel

1. Ensure all dependencies are in `package.json`
2. Check for TypeScript errors: `pnpm build`
3. Verify environment variables are set in Vercel

### Images not loading

1. Images must be in `public/` directory
2. Reference with absolute paths: `/images/my-image.png`
3. For external images, configure `next.config.js`

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## License

MIT

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.
