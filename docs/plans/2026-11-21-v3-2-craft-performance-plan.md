# LewisPortfolio V3.2 Craft, Shared Bundle Slimming & QA Crawler Plan

> **Baseline**: `master` @ `3b595fa` (`v3.1.0`)
> **Worktree**: `.worktrees/v3-2-craft` (branch `feat/v3-2-craft`)

## Confirmed Technical Decisions (3 Rounds of Interactive Alignment)
1. **Shared First-Load JS Reduction (Phase 1)**:
   - Static `/search-index/[locale]` routes (`force-static`, EN + ZH) replacing Layout-embedded `searchItems`.
   - Lazy `next/dynamic` mounting for `CommandPalette` (`cmdk`) and `KeyboardShortcutsModal` strictly on first trigger (`⌘K` / `⌘/`).
   - Pure CSS Scroll-Driven (`animation-timeline: view()`) + light `IntersectionObserver` fallback for `SectionReveal`, and pure CSS compositor settle for `PageTransition` — keeping GSAP isolated strictly to interactive decks and `/lab`.
2. **Native `<dialog>` Lightbox & Dependency Cleanup (Phase 2)**:
   - Remove unused `yet-another-react-lightbox` dependency & CSS.
   - Build zero-dep Lively Icons `<dialog>` `CaseLightbox` using `.showModal()`, `closedby="any"` + backdrop fallback, `@starting-style`, `transition-behavior: allow-discrete`, `overlay`, `←`/`→` navigation, and `Esc` focus restoration; reuse across both `CaseMediaGallery` and MDX `ImageGallery`.
3. **Honest Live Links, Bidirectional `/lab` & `/llms.txt` (Phase 3)**:
   - `On The Beat`: add verified live URL `https://on-the-beat.fly.dev` as external link (no iframe because live server sends `X-Frame-Options: DENY` & `frame-ancestors 'none'`).
   - `Lamplight Nook`: add `https://lewisswan24.github.io/lamplight-nook-site/` external link + click-to-load `DemoEmbed` (verified frameable; add `https://lewisswan24.github.io` to CSP `frame-src`).
   - `LabWorkbench` `?demo=onthebeat|autofill|walkie` deep-linking + interactive invariant cards on `walkie`, `autofill`, and `onthebeat` case pages.
   - Static `/llms.txt` route listing 10 public case facts and boundaries, strictly excluding all unlisted cases.
4. **Site-Wide E2E Crawler & Final Budget Tightening (Phase 4)**:
   - Add `e2e/crawler.spec.ts` verifying HTTP 200, internal links/anchors, zero console/page errors, zero unlisted leakage, lightbox open/nav, and Lamplight embed click-to-load.
   - Re-measure build chunks and tighten `scripts/check-bundle-budget.mjs` ceilings accordingly.
