# Portfolio Maintenance Checklist (V3)

## Weekly
- [ ] Check Vercel production deployment status and Analytics (`https://lewisdong.vercel.app`)
- [ ] Verify GitHub Actions CI (`quality` + `e2e` including `a11y.spec.ts`) on `master`

## Monthly
- [ ] Run `pnpm audit` to review dependency advisories
- [ ] Run full local verification gate:
  ```bash
  pnpm typecheck && pnpm lint && pnpm test:ci && pnpm automation:check && pnpm media:check && pnpm build && pnpm budget:check
  ```
- [ ] Run `pnpm proof:maintenance` to review case-study freshness and evidence links
- [ ] Regenerate bilingual A4 resume PDFs if `/resume` changed: `pnpm resume:pdf`

## Quarterly
- [ ] Review Next.js, React, Tailwind CSS v4, and GSAP minor/security updates
- [ ] Audit `next.config.js` CSP (`frame-src`, `img-src`, `script-src`) whenever adding or retiring external demo embeds
- [ ] Optimize newly added case media with `pnpm media:optimize` and confirm `pnpm media:check` stays within budget

## Release Workflow
1. Branch from `master`, make atomic commits with Conventional Commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`)
2. Verify locally: `pnpm typecheck && pnpm lint && pnpm test:ci && pnpm automation:check && pnpm media:check && pnpm build && pnpm budget:check`
3. Open PR and confirm GitHub Actions (`quality`, `e2e` + `a11y.spec.ts`) and Vercel Preview pass
4. Rebase-merge to `master`, update `CHANGELOG.md`, tag `vX.Y.Z`, and push tags (`git push origin master --tags`)
5. Verify live production routes (`/en`, `/zh`, `/en/lab`, `/en/hire`, `/en/projects/walkie`, `/en/projects/fencepost`)
