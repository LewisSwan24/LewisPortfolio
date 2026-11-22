## Summary
- What does this change do, and what human friction or engineering boundary does it address?

## Design & Technical Tradeoffs
- Alternatives considered or rejected:
- Explicit scope limits or unverified edges (if applicable):

## Verification Checklist
- [ ] `pnpm typecheck` passes (`tsc --noEmit`)
- [ ] `pnpm lint` passes (`eslint .`)
- [ ] `pnpm test:ci` passes (`vitest run`)
- [ ] `pnpm automation:check` passes (`content:validate` + `proof:validate`)
- [ ] `pnpm media:check` passes (`<= 12.00 MB` under `public/projects/`)
- [ ] `pnpm build && pnpm budget:check` passes (bundle JS/CSS ceilings + `● (SSG)` preserved)
- [ ] `pnpm exec playwright test --project=chromium` passes (functional E2E, `a11y.spec.ts` Light/Dark/375px, `0` CSP violations)
