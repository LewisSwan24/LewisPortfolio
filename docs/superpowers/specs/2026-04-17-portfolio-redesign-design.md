# Portfolio Redesign — Design Spec

**Date**: 2026-04-17
**Author**: Lewis Dong (with Claude Opus 4.7)
**Status**: Draft pending user review

---

## 1. Positioning

**One-line**: *"UX researcher who builds the tools she studies."*

**Who it's for** (in priority order):
1. **Primary** — Summer/Winter 2026 UXR / HCI research internships at AI-first companies: Anthropic, OpenAI, Google DeepMind PAIR, Microsoft Research, Meta Reality Labs.
2. **Secondary** — China market: 字节 / 阿里 / 小红书 / 百度 "AI 方向用研" intern pipelines; AI startup UXR/design-engineer hybrid roles at 智谱 / MiniMax / 月之暗面.
3. **Tertiary** — Product Designer / Design Engineer internships at AI-tooling companies (Vercel, Figma, Linear, Cursor).

**Why this framing**: Based on 2025–2026 market research, AI UXR at top labs is the fastest-growing UXR specialty; Anthropic posts a "Research Engineer, Human Computer Interfaces" role at $280K-485K. Positioning Lewis's UXR base (50+ interviews, 300+ tree-test participants) × coding ability × AI literacy lands precisely in that gap. Target roles scale with career stage (intern → junior → senior) without changing the story.

**What this positioning deliberately rejects**:
- Generic "Product Designer" positioning — too crowded, AI angle lost.
- Pure full-stack generalist — read as "哪个都不精" without a single top-10% spike.
- "AI-powered designer" — the most crowded 2026 label; UXR depth would be buried.

---

## 2. Visual System

### Philosophy

**Academic minimalism with a touch of modern** — modeled on Karina Nguyen (OpenAI), adapted with Anthropic's warm-neutral palette. The site should read as "a published researcher who also ships code" within 2 seconds.

**Principles**:
1. **Hero = signal, Case Study = craft.** Home page stays simple for HR 2-second scan. Complex/polished design moments live inside each case study page where design reviewers spend 30s–4min.
2. **Warm neutral palette only.** No cool blue-grays. Every gray has a yellow-brown undertone.
3. **Serif headlines + sans UI.** Serif for authority, sans for utility.
4. **Ring shadows over drop shadows.** `0px 0px 0px 1px` borders-as-shadows, never generic drop shadows.
5. **No 3D, no parallax, no particles.** The site itself being well-coded Next.js is the craft proof.

### Inspiration Source

Adapted from `DESIGN.md` at repo root (Anthropic/Claude design system reference), with **3 mandatory divergences** to avoid looking like a clone:

| Aspect | Anthropic System | **Lewis's Portfolio** |
|--------|------------------|----------------------|
| Accent color | Terracotta `#c96442` | **Moss Green `#4a5d3a`** |
| Serif family | Anthropic Serif (proprietary) | **Fraunces** or **Instrument Serif** (open source) |
| Illustrations | Organic hand-drawn style | **Geometric SVG covers** (already in `content/projects/*/cover`) |

### Color Tokens

| Token | Hex | Role |
|-------|-----|------|
| `bg/parchment` | `#f5f4ed` | Primary page background |
| `bg/ivory` | `#faf9f5` | Card & elevated container surfaces |
| `bg/sand` | `#e8e6dc` | Button secondary / prominent interactive surfaces |
| `text/primary` | `#141413` | Headlines & primary body |
| `text/secondary` | `#5e5d59` | Subheadings & body secondary |
| `text/tertiary` | `#87867f` | Metadata, captions, timestamps |
| `border/cream` | `#f0eee6` | Default light borders |
| `border/warm` | `#e8e6dc` | Emphasis borders / dividers |
| `accent/moss` | `#4a5d3a` | **Single chromatic accent** — CTAs, hero emphasis, active states |
| `accent/moss-hover` | `#3d4d2f` | Moss hover state |
| `semantic/success` | `#166534` | "Open for internships" pill |
| `semantic/error` | `#b53333` | Error states |
| `semantic/focus` | `#3898ec` | Input focus ring (only cool color) |
| `dark/surface` | `#30302e` | Dark mode containers |
| `dark/bg` | `#141413` | Dark mode page background |

### Typography

- **Headlines**: Fraunces (preferred) or Instrument Serif, weight 500, single weight across all sizes.
- **Body & UI**: Inter or system-ui sans-serif, weights 400–500.
- **Code**: JetBrains Mono or system monospace.

Size scale (desktop):

| Role | Font | Size | Line-height |
|------|------|------|-------------|
| Hero display | Fraunces 500 | 56–64px | 1.10 |
| Section heading | Fraunces 500 | 40–48px | 1.20 |
| Case title | Fraunces 500 | 28–32px | 1.20 |
| Body large | Inter 400 | 18–20px | 1.60 |
| Body standard | Inter 400 | 16px | 1.60 |
| Caption | Inter 400 | 13–14px | 1.45 |
| Overline | Inter 500, uppercase, 0.1em tracking | 11px | 1.40 |

### Shadows & Depth

- **Level 1 — contained**: `1px solid var(--border-cream)`
- **Level 2 — ring (hover)**: `0px 0px 0px 1px var(--border-warm)`
- **Level 3 — whisper (feature cards)**: `rgba(0,0,0,0.05) 0px 4px 24px`
- **No drop shadows beyond Level 3.**

### Motion

- `prefers-reduced-motion: reduce` respected strictly.
- Allowed: 150–200ms fade/slide on mount, opacity transitions on hover, smooth scroll.
- Forbidden: parallax scrolling, scroll-triggered 3D, particle systems, marquee, cursor followers, text split-character animations.

---

## 3. Information Architecture

### Routes (post-redesign)

```
/ (Home)                     — Hero + Stats + Recent Work + About teaser + Writing teaser
/work                        — Full case study index (all 4+ projects)
/work/[slug]                 — Individual case study pages (rich layout)
/writing                     — Blog / essay index
/writing/[slug]              — MDX essays
/about                       — Long-form bio + skills + CV link
/guestbook                   — (existing) kept as-is
/lab                         — (existing) keep for side experiments
```

Dropped/deferred from current site:
- `src/components/hero/*` (3D hero experiment) — **delete**; redesign goes another direction.
- `/booking` — keep as WIP page (already committed), no redesign this cycle.
- `(admin)/*` — separate admin domain, not part of public redesign.
- Chat widget — keep as-is for now (already hardened in B2).

### Home Structure (top to bottom)

1. **Mini nav bar** (sticky): `Lewis Dong` wordmark · Work · Writing · About · CV · 🌐 locale switch
2. **Availability pill**: "● Open for Summer 2026 internships"
3. **Hero headline**: Fraunces 500 ~60px
   > "I build **research tools** for AI products."  *(moss green on "research tools")*
4. **Sub-hero**: 1-sentence positioning + MID at UQ + ask
5. **Stats strip** (3 numbers, divider-separated, no cards): `50+ interviews · 300+ tree-test participants · 4 shipped projects`
6. **Recent Work** (3 items max, list not grid):
   - 40×40 cover thumbnail · title · 1-line outcome with numeric · year
   - Clickable entire row → case study page
7. **Writing teaser** (2 latest essays)
8. **About teaser** (3-sentence bio) → `Read more →`
9. **Footer**: email · GitHub · LinkedIn · Twitter/X · RSS

### Case Study Page Structure

This is where the **craft demo** lives. Each `/work/[slug]` page:

```
[Cover banner — 16:9 large SVG or image, full-width]
[Title — Fraunces 500 64px]
[Meta strip: Role · Timeline · Team · Tools · Outcome]
[One-paragraph summary (body-large)]

[Overline] THE PROBLEM
  ... 2–3 paragraphs with inline metrics ...

[Overline] RESEARCH METHOD
  ... method blocks: card for each (Interviews, Tree test, Diary study) ...
  ... sample size + duration + tooling shown prominently ...

[Overline] FINDINGS
  ... data viz (simple bar/line charts) ...
  ... pull-quotes from interview participants (blockquote style) ...

[Overline] DESIGN DECISIONS
  ... before/after image pairs ...
  ... annotated screenshots ...
  ... decision rationale ...

[Overline] OUTCOME
  ... quantified impact (numbers) ...
  ... what I'd do differently ...

[Overline] ARTIFACTS
  ... links to Figma, prototype, research report PDF, GitHub repo ...

[CTA strip: Next case study · Back to work index]
```

### Content Updates Required

- **Keep all 4 MDX files** in `content/projects/` (no rewrites to content).
- **Upgrade the rendering** of each MDX via new case-study layout component.
- **Add meta fields** to each project front-matter if missing: `teamSize`, `primaryOutcome` (headline number), `artifacts` (links).

---

## 4. Component Inventory

### New / Rewrite

| Component | Path | Purpose |
|-----------|------|---------|
| `HeroSection` (rewrite) | `src/components/sections/HeroSection.tsx` | B+ hero layout: mini-nav + pill + headline + sub + stats strip |
| `AvailabilityPill` (new) | `src/components/ui/AvailabilityPill.tsx` | Green pill, status driven by prop/env |
| `StatsStrip` (new) | `src/components/sections/StatsStrip.tsx` | 3-column divider-separated numbers |
| `WorkList` (new) | `src/components/sections/WorkList.tsx` | 40×40 thumbnail + outcome row for home |
| `CaseStudyLayout` (new) | `src/components/case-study/CaseStudyLayout.tsx` | Full page shell for `/work/[slug]` |
| `MetaStrip` (new) | `src/components/case-study/MetaStrip.tsx` | Role/Timeline/Team/Tools/Outcome strip |
| `MethodBlock` (new) | `src/components/case-study/MethodBlock.tsx` | Research method card |
| `PullQuote` (new) | `src/components/case-study/PullQuote.tsx` | Participant quote block |
| `BeforeAfter` (new) | `src/components/case-study/BeforeAfter.tsx` | Side-by-side image comparison |

### Styling Tokens

- Replace Tailwind arbitrary values with CSS variables defined in `src/styles/globals.css`.
- Tailwind config extends with `bg-parchment`, `bg-ivory`, `text-primary`, `text-secondary`, `border-cream`, `accent-moss`, etc.
- Typography plugin configured for Fraunces + Inter.

### Delete

- `src/components/hero/*` (10 files — 3D hero experiment, unreferenced).
- `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three` from `package.json`.

### Keep as-is (no redesign touch)

- `src/components/booking/*`, `app/booking/*`
- `src/components/admin/*`, `app/(admin)/*`
- `src/components/chat/*`, `src/components/ChatWidget.tsx`, `app/api/chat/*`
- `src/components/command/*`
- `src/components/guestbook/*`, `src/components/comments/*`, `src/components/reactions/*`
- All i18n plumbing

---

## 5. Content & Copy

### Hero copy (English primary)

> **Headline**: I build [research tools] for AI products.
> *(square brackets = moss green emphasis)*
>
> **Sub**: UX researcher who also ships code. Currently at UQ Master of Interaction Design, looking for AI UXR / HCI research internships for Summer/Winter 2026.

### Hero copy (Chinese alternate via i18n)

> **Headline**: 我为 AI 产品，[搭建研究工具]。
>
> **Sub**: 会写代码的用户研究员。UQ Master of Interaction Design 在读，寻找 2026 Summer/Winter 大厂 AI 用研实习岗。

### Case study copy

Do **not** rewrite the existing MDX content in this cycle. Keep methodology and findings as authored. Only add/update frontmatter metadata.

### About page

**In scope**: visual redesign of the existing About page using the new token system + layout:
- Preserve existing copy unless the user supplies updates.
- Apply new typography + parchment background + moss accent.
- Add "Currently" block (3 bullets: studying / building / learning).
- Add a grouped Skills block (Research Methods · Design · Engineering · AI Tools).
- CV download + contact links.

**Out of scope**: rewriting the personal-story paragraph — if the user wants updated bio copy, that is a separate content task.

---

## 6. Scope & Timeline

### In scope (this redesign)

1. Visual system tokens (colors, type, spacing) — 1 day
2. Home page B+ redesign (Hero + Stats + WorkList + teasers) — 1 day
3. Case study page layout + rendering of existing 4 MDX — 2 days
4. About page redesign — 0.5 day
5. Navigation + footer redesign — 0.5 day
6. Mobile responsive pass — 0.5 day
7. Delete 3D hero + three.js deps — 0.5 hour
8. Lighthouse + a11y pass — 0.5 day

**Estimated total**: 6–7 days of focused work.

### Out of scope (explicit)

- Writing new case studies or rewriting existing MDX content.
- Admin dashboard redesign.
- Booking flow polish.
- Chat widget visual update.
- Dark mode (keep existing if any works, don't invest new effort).
- Animations beyond 150–200ms hover/fade.
- New languages beyond existing en/zh.
- Analytics / A/B testing setup.
- SEO rewrite (keep existing meta tags).

### Sequencing recommendation

- Day 1: Visual tokens + typography + HeroSection rewrite.
- Day 2: WorkList + StatsStrip + home page assembly.
- Day 3: CaseStudyLayout shell + test render `uq-connect.mdx`.
- Day 4: MethodBlock + PullQuote + BeforeAfter + apply to all 4 cases.
- Day 5: About + Nav + Footer.
- Day 6: Mobile pass + Lighthouse + a11y + cleanup.
- Day 7: Buffer for polish / user feedback.

---

## 7. Success Criteria

A post-redesign visit by a hypothetical AI UXR hiring manager should result in:

1. **2-second scan**: They correctly identify "UX researcher + can code + AI focus + looking for internship."
2. **30-second scan**: They pick one case study to open based on matching their team's work.
3. **4-minute case study read**: They leave with a concrete artifact (method, outcome number, or design decision) they can ask about in an interview.

**Measurable bars** (post-launch):
- Lighthouse Performance ≥ 90 desktop / ≥ 80 mobile
- Lighthouse Accessibility ≥ 95
- No layout shift on font load (CLS < 0.05)
- Home page LCP < 2s on 4G
- Bundle size reduction vs current (drops three.js) — target -100KB+ gzip

---

## 8. Risks & Mitigations

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Fraunces/Instrument Serif loading causes CLS | Medium | Self-host woff2, `font-display: swap`, tune `size-adjust` |
| Case study pages look template-y with 4 items | Medium | Each case gets customized cover + 1 unique data viz |
| Moss green reads too "earthy" / outdated | Low | If so, swap `accent/moss` via single CSS var; no layout change |
| Chinese typography at h1 64px looks oversized | Medium | Locale-specific size scale via CSS `:lang(zh)` |
| 3D hero deletion breaks imports | Very low | Grep confirmed zero imports; tsc will catch |
| Ambition to "dramatically upgrade" not met by minimalism | Medium-High | Invest complexity in case study pages (per §3); user-test after day 3 |

---

## 9. Open Questions

None blocking. Pre-implementation checklist:
- [x] Positioning confirmed (A revised)
- [x] Visual direction confirmed (B+: Hero simple, Case Study rich)
- [ ] Accent color — **Moss Green `#4a5d3a` proposed by Claude**; user originally picked "E · 自己想" then said "听你的". Listing as pending explicit confirmation.
- [ ] Serif family — Fraunces preferred, Instrument Serif fallback. Can be decided day 1 of implementation.
- [ ] Timeline — 6–7 focused days proposed; needs user sign-off.

---

## 10. Next Step

Upon user approval of this spec, invoke `superpowers:writing-plans` to produce the sequenced implementation plan.
