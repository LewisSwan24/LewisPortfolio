# Effective lines of code, per release

`pnpm loc:report` counts effective code as the v7.1–7.5 plan defines it: tracked
code (app, CSS, tests, scripts, CI) that knip does not call unused, that is a test
or is reached by one, and that is not generated or a copy. Content, typed case data
under `src/data/`, i18n messages and config are listed but not counted.

"Reached by a test" is per file: a unit test loads it (v8 coverage), an e2e spec
visits a route that imports it, or a test runs it as a script. The report prints
unit-test line coverage beside the count.

CI runs it on every push and uploads `loc-report` as an artifact (90 days), with
the table in the run summary. Each release saves its numbers here, and "new
effective lines" for v7.x is that release minus `v7.0.0.json`.

To measure locally:

```sh
pnpm test:ci --coverage
pnpm knip --reporter json > knip-report.json
pnpm loc:report --coverage coverage/coverage-final.json --knip knip-report.json
```

`v7.0.0.json` (with its table in `v7.0.0.md`) was measured on 28 Nov 2026 from a checkout of the `v7.0.0` tag,
with that tree's own unit tests and e2e specs, and this repository's `knip.json`.
