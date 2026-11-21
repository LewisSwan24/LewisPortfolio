# LewisPortfolio V3.1 Consolidation, Performance & A11y Plan

> **Baseline**: `master` @ `adc4e2e` (`v3.0.0`)
> **Worktree**: `.worktrees/v3-1-consolidation` (branch `feat/v3-1-consolidation`)

## Confirmed Technical Decisions (3 Rounds of Interactive Alignment)
1. **Architecture Convergence (Phase A)**: Extend `CaseRecordSchema` (`src/lib/cases/schema.ts`) with `workSummary` (`tags`, `year`, `dur`, `problem`, `changed`) and `reviewMeta` (`reviewedAt`, `nextReviewAt`, `auditNote`) across all 14 case modules. Preserve `src/lib/portfolio-proof.ts` public API compatibility so all existing proof tests stay green, while deriving Work Index rows and `proof:maintenance` baselines directly from the Unified Case Registry (`2026-11-21` -> `2027-02-21`, eliminating all 92 stale alerts honestly).
2. **Work Index Bundle Reduction (Phase B)**: Refactor `app/[locale]/projects/page.tsx` into a pure Server Component preparing compact card DTOs + pre-rendered SVG preview slots (`VizConnect`, `VizMaze`, `VizHoop`, `VizPricewise`), keeping `Shortlist`, `EvidenceMatrix`, and `EvidenceMap` completely server-rendered and passed as children/slots. Keep `WorkIndex.tsx` as a minimal client tab filter shell and tighten `scripts/check-bundle-budget.mjs` based on measured output.
3. **Motion, Editorial MDX & Print Polish (Phase C)**:
   - Upgrade `PageTransition.tsx` to `useGsapContext` + `gsap.matchMedia()` (`clearProps: "transform"`), remove overly broad `* { animation-duration: 0.01ms !important }` overrides in `src/styles/base.css`, and add lazy ScrollTrigger `SectionReveal` with zero risk of trapping elements at `opacity: 0`.
   - Publish 2 bilingual deep-dive MDX blog posts (`v3-architecture-and-performance-moat` and `walkie-and-fencepost-invariants`) strictly grounded in verified repository metrics and tests.
   - Refine `@media print` CSS for clean A4 resume pagination while keeping `pnpm resume:pdf` on-demand and preserving `a[href='/resume.pdf'] === 0`.
4. **QA Moat, CI & Deployment Alignment (Phase D)**:
   - Expand `e2e/a11y.spec.ts` to test Desktop Light, Desktop Dark (`ThemeToggle` click -> `#141413`), and Mobile (`375x812`) across primary routes with zero `critical`/`serious` Axe violations.
   - Update `.github/workflows/ci.yml` to Node 22 + current action versions to eliminate Node 20 deprecation warnings.
   - Update stale `NEXT_PUBLIC_SITE_URL` Vercel production env var to `https://portfolio-lewisdong.vercel.app` via Vercel CLI and verify live `<link rel="canonical">`.
