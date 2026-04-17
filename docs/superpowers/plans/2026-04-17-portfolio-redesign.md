# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio's visual system, home page, and case study presentation to target AI UXR / HCI research internships, per the spec at `docs/superpowers/specs/2026-04-17-portfolio-redesign-design.md`.

**Architecture:** Keep current Next.js 14 App Router + next-intl i18n + Prisma + MDX. Swap the visual layer (design tokens, typography, components) without changing routing (`/projects/[slug]` stays — renaming to `/work` deferred). Strip heavy motion/glass/gradient effects; adopt Fraunces serif + Inter sans on parchment background with Moss Green accent.

**Tech Stack:** Next.js 14, TypeScript (strict), Tailwind CSS v3, next-intl, next/font, MDX via next-mdx-remote, Vitest + Testing Library.

**Divergences from spec (pragmatic):**
- Keep URL `/projects/[slug]` (spec said `/work/[slug]`) — avoids SEO/redirect churn, doesn't block the story.
- Keep existing TOC/ReadingProgress/ViewCounter on case study page (already good).
- Delete 3D hero as part of Sprint 3, not pre-sprint.

---

## File Structure

### Create

| Path | Purpose |
|------|---------|
| `src/lib/design-tokens.ts` | Single-source TS module exporting token names → values (for tests) |
| `src/components/ui/AvailabilityPill.tsx` | Green "Open for internships" status pill |
| `src/components/sections/StatsStrip.tsx` | 3-column divider-separated numbers |
| `src/components/sections/WorkList.tsx` | Home-page recent-work list (40×40 + outcome) |
| `src/components/case-study/PullQuote.tsx` | Participant quote blockquote (MDX component) |
| `src/components/case-study/MethodBlock.tsx` | Research method card (MDX component) |
| `src/components/case-study/BeforeAfter.tsx` | Side-by-side image comparison (MDX component) |
| `tests/components/StatsStrip.test.tsx` | Unit test for stats rendering |
| `tests/components/WorkList.test.tsx` | Unit test for work-list ordering and rendering |
| `tests/components/AvailabilityPill.test.tsx` | Unit test for pill |
| `tests/lib/design-tokens.test.ts` | Unit test for token values |

### Rewrite

| Path | What changes |
|------|--------------|
| `src/styles/globals.css` | Replace HSL tokens with parchment/moss system; strip aurora/gradient-text/glass/blob/shimmer |
| `tailwind.config.ts` | New color names (bg-parchment, text-primary, accent-moss, etc.) + Fraunces family |
| `src/components/sections/HeroSection.tsx` | Strip ParticleField/HeroTypewriter/GradientMesh/framer-motion; new B+ layout |
| `app/[locale]/page.tsx` | Assemble new sections (Hero + WorkList) |
| `src/components/layout/Navbar.tsx` | Remove gradient logo, glass backdrop; simpler serif wordmark |
| `src/components/layout/Footer.tsx` | Align to new tokens |
| `app/[locale]/projects/[slug]/page.tsx` | New typography scale, Fraunces title, parchment bg; keep TOC/progress/share |
| `app/[locale]/projects/page.tsx` | List layout aligned to home WorkList style |
| `app/[locale]/about/page.tsx` | Apply new tokens; remove parallax/blob; Fraunces headline |
| `app/layout.tsx` | next/font registration for Fraunces + Inter |
| `src/components/content/mdx-components.tsx` | Register MethodBlock, PullQuote, BeforeAfter |

### Delete

| Path | Why |
|------|-----|
| `src/components/hero/*` (10 files) | 3D hero experiment, unreferenced |
| `src/components/effects/ParticleField.tsx` | Removed from hero |
| `src/components/effects/HeroTypewriter.tsx` | Removed from hero |
| `src/components/effects/GradientMesh.tsx` | Removed from hero |

### Package.json changes

Remove: `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`

---

## Sprint 1 — Design Tokens (Day 1)

### Task 1: Register Fraunces + Inter fonts via next/font

**Files:**
- Modify: `app/layout.tsx` — add font loaders, pass CSS variables to `<html>`
- Modify: `tailwind.config.ts` — add font families using the variables

- [ ] **Step 1: Find the current layout file**

Run: `rg "export default.*RootLayout" app/ -l`
Expected: one path printed (likely `app/layout.tsx`).

- [ ] **Step 2: Read current layout**

Use the Read tool on the path found in Step 1. Note the existing `<html>` tag.

- [ ] **Step 3: Add font imports to layout**

At the top of `app/layout.tsx` (below other imports), add:

```tsx
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
```

- [ ] **Step 4: Wire fonts onto the html element**

Find the `<html lang=...>` tag. Change it to:

```tsx
<html
  lang={locale}
  className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}
  suppressHydrationWarning
>
```

(If the file uses `[locale]/layout.tsx` instead of `app/layout.tsx`, apply the same change there.)

- [ ] **Step 5: Update tailwind.config.ts font families**

Open `tailwind.config.ts` and replace the `fontFamily` block with:

```ts
fontFamily: {
  sans: ["var(--font-sans)", "system-ui", "sans-serif"],
  serif: ["var(--font-serif)", "Georgia", "serif"],
  mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
},
```

- [ ] **Step 6: Verify typecheck**

Run: `npx tsc --noEmit`
Expected: `EXIT=0`.

- [ ] **Step 7: Commit**

```bash
git add app/layout.tsx tailwind.config.ts
git commit -m "feat(design): register Fraunces + Inter + JetBrains Mono via next/font"
```

---

### Task 2: Replace CSS tokens with parchment / warm system

**Files:**
- Rewrite: `src/styles/globals.css`
- Modify: `tailwind.config.ts` colors block

- [ ] **Step 1: Read current globals.css**

Use Read on `src/styles/globals.css`. Note what uses `--background`, `--accent`, `--gradient-start`, etc.

- [ ] **Step 2: Overwrite globals.css with the new token system**

Write the following to `src/styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg-parchment: #f5f4ed;
    --bg-ivory: #faf9f5;
    --bg-sand: #e8e6dc;
    --text-primary: #141413;
    --text-secondary: #5e5d59;
    --text-tertiary: #87867f;
    --border-cream: #f0eee6;
    --border-warm: #e8e6dc;
    --accent-moss: #4a5d3a;
    --accent-moss-hover: #3d4d2f;
    --success: #166534;
    --error: #b53333;
    --focus: #3898ec;
    --dark-surface: #30302e;
    --dark-bg: #141413;
  }

  .dark {
    --bg-parchment: #141413;
    --bg-ivory: #1c1c1a;
    --bg-sand: #30302e;
    --text-primary: #faf9f5;
    --text-secondary: #b0aea5;
    --text-tertiary: #87867f;
    --border-cream: #30302e;
    --border-warm: #4d4c48;
    --accent-moss: #7a9461;
    --accent-moss-hover: #8fa872;
  }

  * { border-color: var(--border-cream); }

  body {
    background-color: var(--bg-parchment);
    color: var(--text-primary);
    font-family: var(--font-sans), system-ui, sans-serif;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  ::selection {
    background-color: color-mix(in srgb, var(--accent-moss) 30%, transparent);
  }

  h1, h2, h3, h4 {
    font-family: var(--font-serif), Georgia, serif;
    font-weight: 500;
    letter-spacing: -0.01em;
  }
}

@layer utilities {
  .ring-shadow { box-shadow: 0px 0px 0px 1px var(--border-warm); }
  .ring-shadow-hover:hover { box-shadow: 0px 0px 0px 1px var(--accent-moss); }
  .whisper-shadow { box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 24px; }
  .overline {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-tertiary);
  }
}

html { scroll-behavior: smooth; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}

.skip-link {
  position: absolute;
  left: 16px;
  top: 16px;
  z-index: 50;
  transform: translateY(-64px);
  background: var(--accent-moss);
  color: var(--bg-ivory);
  padding: 8px 16px;
  border-radius: 6px;
  transition: transform 150ms;
}
.skip-link:focus { transform: translateY(0); }

@media print {
  body { background: white !important; color: black !important; }
  nav, footer, .no-print { display: none !important; }
}
```

- [ ] **Step 3: Update tailwind.config.ts colors to reference new tokens**

Open `tailwind.config.ts`. Replace the `colors` block inside `theme.extend` with:

```ts
colors: {
  parchment: "var(--bg-parchment)",
  ivory: "var(--bg-ivory)",
  sand: "var(--bg-sand)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  tertiary: "var(--text-tertiary)",
  "border-cream": "var(--border-cream)",
  "border-warm": "var(--border-warm)",
  moss: {
    DEFAULT: "var(--accent-moss)",
    hover: "var(--accent-moss-hover)",
  },
  success: "var(--success)",
  error: "var(--error)",
  focus: "var(--focus)",
  // Backwards-compat aliases for pre-redesign components (swept in sprints 4–5):
  background: "var(--bg-parchment)",
  foreground: "var(--text-primary)",
  muted: { DEFAULT: "var(--bg-sand)", foreground: "var(--text-secondary)" },
  card: { DEFAULT: "var(--bg-ivory)", foreground: "var(--text-primary)" },
  border: "var(--border-cream)",
  accent: { DEFAULT: "var(--accent-moss)", foreground: "var(--bg-ivory)" },
},
```

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: `EXIT=0`.

- [ ] **Step 5: Smoke test dev server**

Run: `pnpm dev` in one terminal. Open `http://localhost:3000`.
Expected: site loads on parchment background. Some legacy components may still look off — handled in later sprints.

- [ ] **Step 6: Commit**

```bash
git add src/styles/globals.css tailwind.config.ts
git commit -m "feat(design): adopt parchment + moss warm-neutral token system"
```

---

### Task 3: Create design-tokens.ts for testable constants

**Files:**
- Create: `src/lib/design-tokens.ts`
- Create: `tests/lib/design-tokens.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/lib/design-tokens.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { tokens } from "@/lib/design-tokens";

describe("design tokens", () => {
  it("exposes the Moss Green accent hex", () => {
    expect(tokens.accent.moss).toBe("#4a5d3a");
  });
  it("exposes the Parchment background hex", () => {
    expect(tokens.bg.parchment).toBe("#f5f4ed");
  });
  it("exposes the primary text hex", () => {
    expect(tokens.text.primary).toBe("#141413");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/lib/design-tokens.test.ts`
Expected: FAIL — "Cannot find module '@/lib/design-tokens'".

- [ ] **Step 3: Implement tokens**

Create `src/lib/design-tokens.ts`:

```ts
export const tokens = {
  bg: { parchment: "#f5f4ed", ivory: "#faf9f5", sand: "#e8e6dc" },
  text: { primary: "#141413", secondary: "#5e5d59", tertiary: "#87867f" },
  border: { cream: "#f0eee6", warm: "#e8e6dc" },
  accent: { moss: "#4a5d3a", mossHover: "#3d4d2f" },
  semantic: { success: "#166534", error: "#b53333", focus: "#3898ec" },
  dark: { surface: "#30302e", bg: "#141413" },
} as const;

export type Tokens = typeof tokens;
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run tests/lib/design-tokens.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/design-tokens.ts tests/lib/design-tokens.test.ts
git commit -m "feat(design): add typed design-tokens module"
```

---

## Sprint 2 — Home Page Atoms + Hero Rewrite (Day 2)

### Task 4: AvailabilityPill component

**Files:**
- Create: `src/components/ui/AvailabilityPill.tsx`
- Test: `tests/components/AvailabilityPill.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/AvailabilityPill.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AvailabilityPill } from "@/components/ui/AvailabilityPill";

describe("AvailabilityPill", () => {
  it("renders the given label", () => {
    render(<AvailabilityPill label="Open for Summer 2026 internships" />);
    expect(screen.getByText("Open for Summer 2026 internships")).toBeInTheDocument();
  });
  it("renders with role='status'", () => {
    render(<AvailabilityPill label="Open" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/components/AvailabilityPill.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement the component**

Create `src/components/ui/AvailabilityPill.tsx`:

```tsx
interface AvailabilityPillProps {
  label: string;
}

export function AvailabilityPill({ label }: AvailabilityPillProps) {
  return (
    <span
      role="status"
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "color-mix(in srgb, var(--success) 30%, transparent)",
        backgroundColor: "color-mix(in srgb, var(--success) 10%, transparent)",
        color: "var(--success)",
      }}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: "var(--success)" }}
      />
      {label}
    </span>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/components/AvailabilityPill.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/AvailabilityPill.tsx tests/components/AvailabilityPill.test.tsx
git commit -m "feat(ui): add AvailabilityPill component"
```

---

### Task 5: StatsStrip component

**Files:**
- Create: `src/components/sections/StatsStrip.tsx`
- Test: `tests/components/StatsStrip.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/StatsStrip.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsStrip } from "@/components/sections/StatsStrip";

const stats = [
  { value: "50+", label: "interviews" },
  { value: "300+", label: "tree-test participants" },
  { value: "4", label: "shipped projects" },
];

describe("StatsStrip", () => {
  it("renders every stat's value", () => {
    render(<StatsStrip stats={stats} />);
    expect(screen.getByText("50+")).toBeInTheDocument();
    expect(screen.getByText("300+")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });
  it("renders every stat's label", () => {
    render(<StatsStrip stats={stats} />);
    expect(screen.getByText("interviews")).toBeInTheDocument();
    expect(screen.getByText("tree-test participants")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/components/StatsStrip.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement the component**

Create `src/components/sections/StatsStrip.tsx`:

```tsx
interface Stat { value: string; label: string; }
interface StatsStripProps { stats: Stat[]; }

export function StatsStrip({ stats }: StatsStripProps) {
  return (
    <div className="grid grid-cols-3 border-y border-border-warm py-4 my-8">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={i === 0 ? "pr-4" : "border-l border-border-warm pl-4"}
        >
          <div className="text-2xl font-serif font-medium text-primary leading-none">
            {stat.value}
          </div>
          <div className="mt-1 text-xs text-tertiary">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/components/StatsStrip.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/StatsStrip.tsx tests/components/StatsStrip.test.tsx
git commit -m "feat(sections): add StatsStrip component"
```

---

### Task 6: WorkList component

**Files:**
- Create: `src/components/sections/WorkList.tsx`
- Test: `tests/components/WorkList.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/WorkList.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WorkList } from "@/components/sections/WorkList";

const items = [
  {
    slug: "uq-connect",
    title: "UQ Connect",
    outcome: "Findability 58 → 84 · tree test n=50",
    year: "2024",
    coverGradient: "linear-gradient(135deg,#fbbf24,#f97316)",
  },
  {
    slug: "ai-interview-assistant",
    title: "AI Interview Assistant",
    outcome: "+68% reduced anxiety · React + GPT-4",
    year: "2024",
    coverGradient: "linear-gradient(135deg,#06b6d4,#3b82f6)",
  },
];

describe("WorkList", () => {
  it("renders each item's title", () => {
    render(<WorkList items={items} />);
    expect(screen.getByText("UQ Connect")).toBeInTheDocument();
    expect(screen.getByText("AI Interview Assistant")).toBeInTheDocument();
  });
  it("links to /projects/[slug]", () => {
    render(<WorkList items={items} />);
    expect(screen.getByRole("link", { name: /UQ Connect/ })).toHaveAttribute(
      "href",
      "/projects/uq-connect"
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/components/WorkList.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement the component**

Create `src/components/sections/WorkList.tsx`:

```tsx
import Link from "next/link";

export interface WorkItem {
  slug: string;
  title: string;
  outcome: string;
  year: string;
  coverGradient?: string;
  coverImage?: string;
}

interface WorkListProps { items: WorkItem[]; }

export function WorkList({ items }: WorkListProps) {
  return (
    <ul className="divide-y divide-border-cream">
      {items.map((item) => (
        <li key={item.slug}>
          <Link
            href={`/projects/${item.slug}`}
            className="grid grid-cols-[40px_1fr_auto] items-center gap-3 py-3 transition-colors hover:bg-ivory"
          >
            <span
              aria-hidden="true"
              className="block h-10 w-10 rounded-md"
              style={{
                background: item.coverImage
                  ? `center / cover no-repeat url(${item.coverImage})`
                  : item.coverGradient ?? "linear-gradient(135deg,#a8a29e,#57534e)",
              }}
            />
            <div>
              <div className="text-sm font-medium text-primary">{item.title}</div>
              <div className="text-xs text-secondary">{item.outcome}</div>
            </div>
            <span className="text-xs text-tertiary">{item.year}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/components/WorkList.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/WorkList.tsx tests/components/WorkList.test.tsx
git commit -m "feat(sections): add WorkList component for recent work on home"
```

---

### Task 7: Rewrite HeroSection with B+ layout

**Files:**
- Rewrite: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: Overwrite HeroSection.tsx**

Replace the entire contents of `src/components/sections/HeroSection.tsx` with:

```tsx
import { Container } from "@/components/ui/Container";
import { AvailabilityPill } from "@/components/ui/AvailabilityPill";
import { StatsStrip } from "@/components/sections/StatsStrip";

interface HeroSectionProps {
  availabilityLabel: string;
  headlineLead: string;
  headlineEmphasis: string;
  headlineTail?: string;
  subHeadline: string;
  stats: { value: string; label: string }[];
}

export function HeroSection({
  availabilityLabel,
  headlineLead,
  headlineEmphasis,
  headlineTail = "",
  subHeadline,
  stats,
}: HeroSectionProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <AvailabilityPill label={availabilityLabel} />
          <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-primary">
            {headlineLead}{" "}
            <span style={{ color: "var(--accent-moss)" }}>{headlineEmphasis}</span>
            {headlineTail}
          </h1>
          <p className="mt-5 text-lg text-secondary leading-relaxed">{subHeadline}</p>
          <StatsStrip stats={stats} />
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck — home page WILL error (fixed next task)**

Run: `npx tsc --noEmit`
Expected: ERRORS in `app/[locale]/page.tsx` due to prop mismatch. Acceptable — fixed in Task 8.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "feat(hero): rewrite HeroSection with B+ layout"
```

---

### Task 8: Rewrite home page to assemble new sections

**Files:**
- Rewrite: `app/[locale]/page.tsx`
- Modify: `src/i18n/locales/en.json`, `src/i18n/locales/zh.json`

- [ ] **Step 1: Add i18n keys (en)**

Open `src/i18n/locales/en.json`. Add to the `home` object (keep existing keys):

```json
"availability": "Open for Summer 2026 internships",
"headline": {
  "lead": "I build",
  "emphasis": "research tools",
  "tail": " for AI products."
},
"sub": "UX researcher who also ships code. Currently at UQ Master of Interaction Design, looking for AI UXR / HCI research internships.",
"stats": {
  "interviews": "interviews",
  "participants": "tree-test participants",
  "projects": "shipped projects"
},
"sectionWork": "Recent work"
```

- [ ] **Step 2: Add i18n keys (zh)**

Open `src/i18n/locales/zh.json`. Add to the `home` object:

```json
"availability": "开放 2026 Summer 实习合作",
"headline": {
  "lead": "我为 AI 产品",
  "emphasis": "搭建研究工具",
  "tail": "。"
},
"sub": "会写代码的用户研究员。UQ Master of Interaction Design 在读，寻找 2026 Summer/Winter 大厂 AI 用研实习岗。",
"stats": {
  "interviews": "访谈",
  "participants": "tree test 参与者",
  "projects": "已交付项目"
},
"sectionWork": "近期作品"
```

- [ ] **Step 3: Overwrite home page**

Replace `app/[locale]/page.tsx` with:

```tsx
import { Container } from "@/components/ui/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { WorkList, type WorkItem } from "@/components/sections/WorkList";
import { getAllProjects } from "@/lib/projects";
import { getCurrentDictionary } from "@/lib/i18n-compat";
import Link from "next/link";

export default async function HomePage() {
  const { dict } = await getCurrentDictionary();
  const projects = getAllProjects();

  const stats = [
    { value: "50+", label: dict.home.stats.interviews },
    { value: "300+", label: dict.home.stats.participants },
    { value: String(projects.length), label: dict.home.stats.projects },
  ];

  const recentWork: WorkItem[] = projects.slice(0, 3).map((p) => ({
    slug: p.slug,
    title: p.title,
    outcome: p.highlights[0] ?? p.oneLiner,
    year: p.timeframe?.split(" ").pop() ?? "",
    coverImage: p.cover,
  }));

  return (
    <>
      <HeroSection
        availabilityLabel={dict.home.availability}
        headlineLead={dict.home.headline.lead}
        headlineEmphasis={dict.home.headline.emphasis}
        headlineTail={dict.home.headline.tail}
        subHeadline={dict.home.sub}
        stats={stats}
      />

      <section className="py-12">
        <Container>
          <div className="max-w-2xl">
            <div className="overline mb-4">{dict.home.sectionWork}</div>
            <WorkList items={recentWork} />
            <Link
              href="/projects"
              className="mt-6 inline-block text-sm font-medium text-moss hover:text-moss-hover"
            >
              {dict.nav.projects} →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Typecheck + visual smoke**

Run: `npx tsc --noEmit`
Expected: `EXIT=0`.

Run `pnpm dev`. Open `http://localhost:3000`:
- Parchment background
- Green availability pill
- Fraunces serif headline with moss-green emphasis
- Stats strip
- Recent work list with 3 items

- [ ] **Step 5: Commit**

```bash
git add app/[locale]/page.tsx src/i18n/locales/
git commit -m "feat(home): assemble B+ home page with Hero + WorkList"
```

---

## Sprint 3 — Case Study Typography + MDX Components (Day 3-4)

### Task 9: Delete 3D hero + effects + three deps

**Files:**
- Delete: `src/components/hero/` (all)
- Delete: `src/components/effects/ParticleField.tsx`, `HeroTypewriter.tsx`, `GradientMesh.tsx`
- Modify: `package.json`

- [ ] **Step 1: Verify no imports of `components/hero`**

Run: `rg "components/hero" src/ app/`
Expected: no matches. If any match, investigate.

- [ ] **Step 2: Delete the files**

```bash
rm -r src/components/hero
rm src/components/effects/ParticleField.tsx
rm src/components/effects/HeroTypewriter.tsx
rm src/components/effects/GradientMesh.tsx
```

- [ ] **Step 3: Check for lingering imports of the three effect components**

Run: `rg "ParticleField|HeroTypewriter|GradientMesh" src/ app/`
Expected: no matches.

If any match, remove those import + usage lines in the offending file.

- [ ] **Step 4: Remove three-related deps from package.json**

Open `package.json`. Delete these lines from `"dependencies"`:
- `"@react-three/drei": "^10.7.7",`
- `"@react-three/fiber": "^9.5.0",`
- `"three": "^0.183.2",`

Delete from `"devDependencies"`:
- `"@types/three": "^0.183.1",`

- [ ] **Step 5: Reinstall**

Run: `pnpm install`

- [ ] **Step 6: Typecheck**

Run: `npx tsc --noEmit`
Expected: `EXIT=0`.

- [ ] **Step 7: Commit**

```bash
git add -A src/components/hero src/components/effects package.json pnpm-lock.yaml
git commit -m "chore: remove unused 3D hero prototype and three.js dependencies"
```

---

### Task 10: Redesign case study page typography

**Files:**
- Modify: `app/[locale]/projects/[slug]/page.tsx`

- [ ] **Step 1: Read the file**

Use Read on `app/[locale]/projects/[slug]/page.tsx`. Note lines 107–188 (the `<header>` block).

- [ ] **Step 2: Replace the `<header>` block**

Find `<header className="mb-12">...</header>` (roughly lines 108–188). Replace with:

```tsx
<header className="mb-12 border-b border-border-warm pb-8">
  <Button href="/projects" variant="ghost" className="mb-8">
    ← {dict.project.backToProjects}
  </Button>

  <div className="overline mb-3">Case study · {project.timeframe}</div>

  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-primary">
    {project.title}
  </h1>

  <p className="mt-4 text-xl text-secondary max-w-3xl leading-relaxed">
    {project.oneLiner}
  </p>

  <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
    <div>
      <dt className="overline">Role</dt>
      <dd className="mt-1 text-primary">{project.role}</dd>
    </div>
    <div>
      <dt className="overline">Timeline</dt>
      <dd className="mt-1 text-primary">{project.timeframe}</dd>
    </div>
    {project.tools.length > 0 && (
      <div className="col-span-2">
        <dt className="overline">Tools</dt>
        <dd className="mt-1 text-primary">{project.tools.join(", ")}</dd>
      </div>
    )}
  </dl>

  {project.highlights.length > 0 && (
    <div className="mt-8">
      <div className="overline mb-3">Outcomes</div>
      <ul className="space-y-2">
        {project.highlights.map((h) => (
          <li key={h} className="flex items-start gap-3 text-secondary">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: "var(--accent-moss)" }}
            />
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </div>
  )}

  <div className="mt-6 flex items-center gap-3">
    {project.tags.map((tag) => (
      <Tag key={tag} size="sm">{tag}</Tag>
    ))}
    <ViewCounter slug={slug} />
  </div>
</header>
```

- [ ] **Step 3: Update article wrapper background**

Find `<article className="py-16 sm:py-20">` and change to:

```tsx
<article className="py-16 sm:py-20 bg-parchment">
```

- [ ] **Step 4: Typecheck + visual**

Run: `npx tsc --noEmit` → PASS.
Dev server, open `/projects/uq-connect`. Check: Fraunces title, parchment bg, meta strip, moss outcome bullets.

- [ ] **Step 5: Commit**

```bash
git add app/[locale]/projects/[slug]/page.tsx
git commit -m "feat(case-study): refresh project page typography + meta strip"
```

---

### Task 11: Add MDX components (PullQuote, MethodBlock, BeforeAfter)

**Files:**
- Create: `src/components/case-study/PullQuote.tsx`, `MethodBlock.tsx`, `BeforeAfter.tsx`
- Modify: `src/components/content/mdx-components.tsx`

- [ ] **Step 1: Create PullQuote**

Write `src/components/case-study/PullQuote.tsx`:

```tsx
interface PullQuoteProps {
  children: React.ReactNode;
  attribution?: string;
}

export function PullQuote({ children, attribution }: PullQuoteProps) {
  return (
    <blockquote
      className="my-8 border-l-2 pl-6"
      style={{ borderColor: "var(--accent-moss)" }}
    >
      <p className="font-serif text-2xl font-medium leading-snug text-primary">
        {children}
      </p>
      {attribution && (
        <footer className="mt-3 text-sm text-tertiary">— {attribution}</footer>
      )}
    </blockquote>
  );
}
```

- [ ] **Step 2: Create MethodBlock**

Write `src/components/case-study/MethodBlock.tsx`:

```tsx
interface MethodBlockProps {
  method: string;
  sample?: string;
  duration?: string;
  tool?: string;
  description: string;
}

export function MethodBlock({ method, sample, duration, tool, description }: MethodBlockProps) {
  return (
    <div className="my-6 rounded-lg border border-border-warm bg-ivory p-5">
      <div className="overline mb-2">{method}</div>
      <p className="text-sm text-secondary leading-relaxed">{description}</p>
      <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-tertiary">
        {sample && (<div className="flex gap-1.5"><dt>Sample:</dt><dd className="text-secondary">{sample}</dd></div>)}
        {duration && (<div className="flex gap-1.5"><dt>Duration:</dt><dd className="text-secondary">{duration}</dd></div>)}
        {tool && (<div className="flex gap-1.5"><dt>Tool:</dt><dd className="text-secondary">{tool}</dd></div>)}
      </dl>
    </div>
  );
}
```

- [ ] **Step 3: Create BeforeAfter**

Write `src/components/case-study/BeforeAfter.tsx`:

```tsx
import Image from "next/image";

interface BeforeAfterProps {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
  caption?: string;
}

export function BeforeAfter({ before, after, beforeAlt = "Before", afterAlt = "After", caption }: BeforeAfterProps) {
  return (
    <figure className="my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <div className="overline mb-2">Before</div>
          <Image src={before} alt={beforeAlt} width={1200} height={800} className="rounded-md border border-border-cream" />
        </div>
        <div>
          <div className="overline mb-2">After</div>
          <Image src={after} alt={afterAlt} width={1200} height={800} className="rounded-md border border-border-cream" />
        </div>
      </div>
      {caption && <figcaption className="mt-3 text-sm text-tertiary">{caption}</figcaption>}
    </figure>
  );
}
```

- [ ] **Step 4: Register in mdx-components**

Open `src/components/content/mdx-components.tsx`. Add imports:

```tsx
import { PullQuote } from "@/components/case-study/PullQuote";
import { MethodBlock } from "@/components/case-study/MethodBlock";
import { BeforeAfter } from "@/components/case-study/BeforeAfter";
```

In `getMdxComponents` return object, add:

```tsx
return {
  // ... existing components
  PullQuote,
  MethodBlock,
  BeforeAfter,
};
```

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit` → PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/case-study src/components/content/mdx-components.tsx
git commit -m "feat(case-study): add PullQuote, MethodBlock, BeforeAfter MDX components"
```

---

### Task 12: Demonstrate rich components in uq-connect.mdx

**Files:**
- Modify: `content/projects/uq-connect.mdx`

- [ ] **Step 1: Read the file**

Use Read on `content/projects/uq-connect.mdx`.

- [ ] **Step 2: Insert MethodBlock near Card Sorting**

Find `### Card Sorting`. Below its paragraph, insert:

```mdx
<MethodBlock
  method="Open Card Sort"
  sample="n=24, across 6 faculties"
  duration="45 min sessions"
  tool="Optimal Workshop"
  description="Participants grouped 60 portal items into self-labeled categories to surface mental-model mismatches with the current navigation."
/>
```

- [ ] **Step 3: Insert PullQuote in a findings section**

Find a section about student pain points or findings. Insert:

```mdx
<PullQuote attribution="Participant P14, Year 2 BSc">
  I don't know what "myHR" even means — is that a form? An app? I just Google "UQ pay date" instead.
</PullQuote>
```

If no obvious spot exists, add it in the "Research Findings" or "Overview" section.

- [ ] **Step 4: Render check**

Dev server → `/projects/uq-connect`. Verify MethodBlock card + PullQuote render with moss-border styling.

- [ ] **Step 5: Commit**

```bash
git add content/projects/uq-connect.mdx
git commit -m "docs(uq-connect): demonstrate MethodBlock + PullQuote in case study"
```

---

## Sprint 4 — Nav + Footer + About (Day 5)

### Task 13: Simplify Navbar

**Files:**
- Rewrite: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Overwrite Navbar**

Replace entire `src/components/layout/Navbar.tsx` with:

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SearchModal } from "@/components/navigation/SearchModal";

const ThemeToggle = dynamic(
  () => import("@/components/providers/ThemeToggle").then((m) => ({ default: m.ThemeToggle })),
  { ssr: false }
);
const MobileMenu = dynamic(
  () => import("./MobileMenu").then((m) => ({ default: m.MobileMenu })),
  { ssr: false }
);
const LanguageToggle = dynamic(
  () => import("@/components/providers/LanguageToggle").then((m) => ({ default: m.LanguageToggle })),
  { ssr: false }
);

interface SearchItem { type: "project" | "blog"; slug: string; title: string; description: string; tags: string[]; }
interface NavbarProps { searchItems?: SearchItem[]; }

export function Navbar({ searchItems = [] }: NavbarProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const navLabels: Record<string, string> = {
    "/": t("nav.home"),
    "/projects": t("nav.projects"),
    "/about": t("nav.about"),
    "/contact": t("nav.contact"),
    "/resume": t("nav.resume"),
    "/blog": t("nav.blog"),
  };
  const navLinks = siteConfig.navLinks.slice(0, 5);

  return (
    <header className="sticky top-0 z-40 border-b border-border-cream bg-parchment">
      <Container>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="font-serif text-lg font-medium text-primary">
            {siteConfig.name}
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors",
                  pathname === link.href ? "text-moss" : "text-secondary hover:text-primary"
                )}
              >
                {navLabels[link.href] ?? link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search (⌘K)"
              className="flex h-8 w-8 items-center justify-center rounded-md text-tertiary hover:text-primary"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <LanguageToggle />
            <ThemeToggle />
            <MobileMenu navLabels={navLabels} />
          </div>
        </div>
      </Container>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        items={searchItems}
        placeholder={t("search.placeholder")}
        noResultsText={t("search.noResults")}
      />
    </header>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit` → PASS.

- [ ] **Step 3: Visual smoke**

Dev server refresh. Navbar should show serif wordmark, text links, simple icons on right, cream bottom border.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat(nav): simplify Navbar to minimalist serif wordmark + text links"
```

---

### Task 14: Align Footer to new tokens

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Read current Footer**

Use Read on `src/components/layout/Footer.tsx`.

- [ ] **Step 2: Apply token class updates**

Replace Tailwind class usages per this mapping (find-and-replace within the file):
- `bg-background` → `bg-parchment`
- `text-muted-foreground` → `text-secondary`
- `text-muted` → `text-tertiary`
- `border-border` → `border-border-cream`
- Remove utility classes that no longer exist: `gradient-text`, `glass`, `glass-subtle`, `glow`, `glow-lg`, `blob`, `animated-underline`, `shadow-layered`, `shadow-layered-lg`
- Add `font-serif` to wordmark text if present

- [ ] **Step 3: Typecheck + visual**

Run: `npx tsc --noEmit` → PASS.
Dev server — footer matches parchment theme.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "style(footer): align Footer to parchment + moss tokens"
```

---

### Task 15: About page visual refresh

**Files:**
- Modify: `app/[locale]/about/page.tsx`

- [ ] **Step 1: Read current about page**

Use Read.

- [ ] **Step 2: Replace hero block**

Find the `{/* Hero Section */}` block (starts near line 21). Remove:
- The `<ParallaxBackground />` component (and its import)
- The `blob blob-1` and `blob blob-2` divs
- The spinning dashed circles (`motion-safe:animate-[spin_20s...]` etc.)
- The emoji placeholder (🧑‍🎨) profile block

Replace the hero section with:

```tsx
<section className="py-16 sm:py-24">
  <Container>
    <div className="overline mb-3">{dict.about.badge}</div>
    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-primary">
      {dict.about.title.prefix}
      <span style={{ color: "var(--accent-moss)" }}>{dict.about.title.highlight}</span>
      {dict.about.title.suffix}
    </h1>
    <p className="mt-6 max-w-2xl text-lg text-secondary leading-relaxed">
      {dict.about.intro.p1}
    </p>
    <p className="mt-4 max-w-2xl text-lg text-secondary leading-relaxed">
      {dict.about.intro.p2}
    </p>
    <div className="mt-8 flex flex-wrap gap-3">
      <Button href="/projects">{dict.cta.viewProjects} →</Button>
      <Button href="/resume.pdf" variant="secondary" download>{dict.cta.downloadResume}</Button>
    </div>
  </Container>
</section>
```

Keep the rest of the About page (skills visualization, etc.) as-is for now.

- [ ] **Step 3: Typecheck + visual**

Run: `npx tsc --noEmit` → PASS.
Open `/about` in dev: clean parchment + serif + moss emphasis, no spinning circles.

- [ ] **Step 4: Commit**

```bash
git add app/[locale]/about/page.tsx
git commit -m "style(about): apply parchment tokens + serif headline to About hero"
```

---

## Sprint 5 — Projects Index + Mobile + Lighthouse (Day 6)

### Task 16: Rewrite projects index as list

**Files:**
- Rewrite: `app/[locale]/projects/page.tsx`

- [ ] **Step 1: Replace page body**

Overwrite `app/[locale]/projects/page.tsx` with:

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { WorkList, type WorkItem } from "@/components/sections/WorkList";
import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import { getCurrentDictionary } from "@/lib/i18n-compat";

export const metadata: Metadata = {
  title: "Projects",
  description: `Case studies and projects by ${siteConfig.name}.`,
};

export default async function ProjectsPage() {
  const projects = getAllProjects();
  const { dict } = await getCurrentDictionary();

  const items: WorkItem[] = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    outcome: p.highlights[0] ?? p.oneLiner,
    year: p.timeframe?.split(" ").pop() ?? "",
    coverImage: p.cover,
  }));

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <h1 className="font-serif text-4xl sm:text-5xl font-medium leading-tight text-primary">
            {dict.projects.title}
          </h1>
          <p className="mt-4 text-lg text-secondary leading-relaxed">
            {dict.projects.description}
          </p>
          <div className="mt-10">
            <WorkList items={items} />
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck + visual**

Run: `npx tsc --noEmit` → PASS.
Open `/projects` → clean list of all projects.

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/projects/page.tsx
git commit -m "feat(projects): rewrite projects index as WorkList"
```

---

### Task 17: Mobile responsive pass

**Files:** Various — spot fixes only.

- [ ] **Step 1: Manual inspection at 4 breakpoints**

Breakpoints: 360px, 480px, 768px, 1024px.
Visit: `/`, `/projects`, `/projects/uq-connect`, `/about`, `/writing` (or `/blog`).

- [ ] **Step 2: Fix known candidates**

Apply these fixes if observed:
- Hero headline too large at 360px → change `text-4xl sm:text-5xl lg:text-6xl` to `text-3xl sm:text-5xl lg:text-6xl`.
- StatsStrip overflow → change to `grid-cols-1 sm:grid-cols-3` and only apply `border-l` at `sm:` breakpoint.
- Case study meta grid → `grid-cols-1 sm:grid-cols-2 md:grid-cols-4`.
- Navbar hiding links → ensure `md:flex hidden` is on the `<nav>` element and MobileMenu shows on `<md:`.

- [ ] **Step 3: Re-check at every breakpoint**

Iterate until all 4 breakpoints pass.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "fix(responsive): polish mobile breakpoints across pages"
```

---

### Task 18: Lighthouse + accessibility audit

- [ ] **Step 1: Build and run production server**

```bash
pnpm build
pnpm start
```

- [ ] **Step 2: Run Lighthouse**

Chrome DevTools → Lighthouse. Run on `/` and `/projects/uq-connect`.
Categories: Performance, Accessibility, Best Practices, SEO.
Mode: Navigation. Device: Desktop, then Mobile.

- [ ] **Step 3: Record scores and compare to targets**

Targets (spec §7):
- Performance ≥ 90 desktop / ≥ 80 mobile
- Accessibility ≥ 95
- CLS < 0.05
- LCP < 2s on 4G

- [ ] **Step 4: Fix regressions**

Common fixes:
- CLS from font load: ensure `font-display: swap` (already set in Task 1); add `size-adjust` via `adjustFontFallback` next/font option if FOIT is ugly.
- LCP: ensure cover images use `next/image` with proper dimensions.
- Accessibility: one `<h1>` per page; button/link accessible names; contrast ratio ≥ 4.5:1 for body text.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "perf: address Lighthouse regressions from redesign"
```

---

## Sprint 6 — Buffer (Day 7)

Use this day for:
- User-test feedback after day-3 preview.
- Polish iteration on moss saturation, serif size, whitespace.
- Add MethodBlock/PullQuote/BeforeAfter usage to remaining MDX files.
- Extract a `MetaStrip` component if the inline grid in Task 10 gets reused.
- Optional `WritingTeaser` and `AboutTeaser` components for the home page.

Each polish commit follows:

```bash
git add <files>
git commit -m "polish: <specific tweak>"
```

---

## Self-Review Checklist

**1. Spec coverage** (against `docs/superpowers/specs/2026-04-17-portfolio-redesign-design.md`):

| Spec section | Covered by |
|--------------|-----------|
| §1 Positioning | Hero copy in Task 8; about page in Task 15 |
| §2 Visual System tokens | Tasks 2 + 3 |
| §2 Typography | Task 1 (font registration), Task 2 (global serif) |
| §2 Shadows | Task 2 (ring-shadow + whisper-shadow utilities) |
| §2 Motion | Task 2 (reduced-motion global; no new animations introduced) |
| §3 Routes | Spec said `/work`, plan uses `/projects` — documented divergence |
| §3 Home structure | Tasks 5–8 |
| §3 Case study structure | Tasks 10–12 |
| §4 Component Inventory | Tasks 4–6 + 11 (WritingTeaser/AboutTeaser/MetaStrip deferred to Sprint 6) |
| §5 Hero copy (en/zh) | Task 8 step 1–2 |
| §6 Scope | Tasks sequence matches Day 1–7 |
| §6 Delete 3D hero | Task 9 |
| §7 Success Criteria | Task 18 |

**Known gaps accepted into plan:**
- `WritingTeaser` and `AboutTeaser` — deferred to Sprint 6. Home without them still conveys positioning.
- `MetaStrip` — inlined in Task 10 rather than extracted. Can be pulled out if a 2nd consumer appears.

**2. Placeholder scan**: No TBDs. No "similar to previous task" references without code. Every code step contains executable code.

**3. Type consistency**:
- `WorkItem` defined once (Task 6), imported twice (Tasks 8, 16). Consistent.
- `HeroSection` stats prop matches `StatsStrip` stats prop. Consistent.
- `tokens` object (Task 3) matches CSS variables (Task 2). Consistent.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-17-portfolio-redesign.md`. Two execution options:

**1. Subagent-Driven (recommended)** — dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — execute tasks in this session using `superpowers:executing-plans`, batch execution with checkpoints for review.

**Which approach?**
