# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-03-07

### Security
- **Remove PII from API logs** — Stripped email, IP, and message content from `console.log` in `contact/route.ts` and `subscribe/route.ts`
- **Add CSP header** — Content-Security-Policy with strict directives in `next.config.js`
- **Add HSTS header** — Strict-Transport-Security with `max-age=63072000` and `includeSubDomains`
- **Fix empty catch block** — Proper error handling in `subscribe/route.ts`

### Added
- **Shared validation module** (`src/lib/validators.ts`) — Email validation and input sanitization utilities
- **Shared rate-limit module** (`src/lib/rate-limit.ts`) — Reusable rate limiting with IP extraction
- **CI/CD pipeline** (`.github/workflows/ci.yml`) — GitHub Actions for lint, unit tests, build, and E2E
- **API unit tests** — `contact-api.test.ts` (6 tests) and `subscribe-api.test.ts` (5 tests)

### Changed
- **Refactored contact API** — Uses shared validation and rate-limit modules, removed 40+ lines of duplicate code
- **Refactored subscribe API** — Uses shared validation and rate-limit modules, removed duplicate code
- **Improved E2E tests** — Stronger assertions for theme toggle, TOC visibility, and search modal shortcuts

### DevOps
- **ChatDev multi-agent review** — Completed 3 tasks: code review, prototype generation, batch test generation
- **Security audit score** — 82/100 (no critical vulnerabilities)
- **Test coverage** — 88 tests across 13 test files, all passing

## [1.0.0] - Previous Release

Initial portfolio release with Next.js 14, MDX blog, i18n, and project showcase.
