import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { readCoverage, readKnipUnused, toMarkdown } from "../../scripts/loc-report.mjs";

const scriptPath = join(process.cwd(), "scripts", "loc-report.mjs");
const roots: string[] = [];

function makeRoot(files: Record<string, string>) {
  const root = mkdtempSync(join(tmpdir(), "portfolio-loc-report-"));
  roots.push(root);
  for (const [rel, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, rel)), { recursive: true });
    writeFileSync(join(root, rel), text);
  }
  return root;
}

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe("readKnipUnused", () => {
  it("returns files knip reports as unused, ignoring other issue types", () => {
    const root = makeRoot({
      "knip.json": JSON.stringify({
        issues: [
          { file: "src/dead.ts", files: [{ name: "src/dead.ts" }], exports: [] },
          { file: "src/live.ts", files: [], exports: [{ name: "x" }] },
        ],
      }),
    });
    expect([...readKnipUnused(join(root, "knip.json"))]).toEqual(["src/dead.ts"]);
  });
});

describe("readCoverage", () => {
  it("marks files with any executed statement as loaded and sums lines", () => {
    const root = makeRoot({});
    const coverage = {
      [join(root, "src", "a.ts")]: {
        path: join(root, "src", "a.ts"),
        statementMap: { 0: { start: { line: 1 } }, 1: { start: { line: 2 } }, 2: { start: { line: 2 } } },
        s: { 0: 1, 1: 0, 2: 3 },
      },
      [join(root, "src", "b.ts")]: {
        path: join(root, "src", "b.ts"),
        statementMap: { 0: { start: { line: 1 } } },
        s: { 0: 0 },
      },
    };
    writeFileSync(join(root, "coverage-final.json"), JSON.stringify(coverage));
    const { loaded, lines } = readCoverage(join(root, "coverage-final.json"), root);
    expect([...loaded]).toEqual(["src/a.ts"]);
    expect(lines.get("src/a.ts")).toEqual({ covered: 2, total: 2 });
    expect(lines.get("src/b.ts")).toEqual({ covered: 0, total: 1 });
  });
});

describe("toMarkdown", () => {
  it("prints the per-kind table, the total and what was missing", () => {
    const md = toMarkdown(
      {
        kinds: { app: { files: 2, nonBlank: 10, effective: 7, effectiveFiles: 1 } },
        notCode: { content: { files: 1, nonBlank: 4 } },
        totals: { files: 2, nonBlank: 10, effective: 7, effectiveFiles: 1 },
        unitLineCoverage: { covered: 0, total: 0 },
        visitedPaths: 3,
        files: [{ path: "src/x.ts", kind: "app", nonBlank: 3, code: 3, effective: 0, reason: "untested" }],
      },
      { ref: "v7.0.0", coverage: false, knip: false },
    );
    expect(md).toContain("# Effective lines of code at v7.0.0");
    expect(md).toContain("| app | 2 | 10 | 1 | 7 |");
    expect(md).toContain("| **Total** | 2 | 10 | 1 | **7** |");
    expect(md).toContain("| content | 1 | 4 |");
    expect(md).toContain("untested 3");
    expect(md).toContain("Unit-test coverage was not supplied");
    expect(md).toContain("knip output was not supplied");
  });
});

describe("loc-report CLI", () => {
  it("measures a git checkout and writes JSON and Markdown", () => {
    const root = makeRoot({
      "app/[locale]/page.tsx": 'import { x } from "@/lib/x";\nexport default function P() {\n  return x;\n}\n',
      "src/lib/x.ts": "// one\nexport const x = 1;\n",
      "src/lib/orphan.ts": "export const y = 2;\n",
      "e2e/home.spec.ts": 'test("home", async ({ page }) => {\n  await page.goto("/");\n});\n',
      "README.md": "# Readme\n",
    });
    execFileSync("git", ["init", "-q"], { cwd: root });
    execFileSync("git", ["add", "."], { cwd: root });
    const out = join(root, "out");
    const result = spawnSync("node", [scriptPath, "--root", root, "--out", out], { encoding: "utf8" });
    expect(result.status).toBe(0);
    const json = JSON.parse(readFileSync(join(out, "loc-report.json"), "utf8"));
    expect(json.totals).toMatchObject({ effective: 4 + 1 + 3, nonBlank: 4 + 2 + 1 + 3 });
    expect(json.files.find((f: { path: string }) => f.path === "src/lib/orphan.ts").reason).toBe("untested");
    expect(readFileSync(join(out, "loc-report.md"), "utf8")).toContain("| **Total** |");
    expect(result.stdout).toContain("# Effective lines of code");
  });

  it("fails on an unknown flag", () => {
    const result = spawnSync("node", [scriptPath, "--nope"], { encoding: "utf8" });
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("Unknown argument: --nope");
  });
});
