import { describe, expect, it } from "vitest";
import {
  buildReport,
  classifyPath,
  countCodeLines,
  extractImports,
  extractVisitedPaths,
  matchVisitedPath,
  resolveImport,
  routeFromAppFile,
} from "../../scripts/lib/loc-report-core.mjs";

describe("countCodeLines", () => {
  it("skips blank lines and line comments in TypeScript", () => {
    const text = ["// header", "", "const a = 1; // trailing", "   ", "export { a };"].join("\n");
    expect(countCodeLines(text, "ts")).toEqual({ nonBlank: 3, code: 2 });
  });

  it("skips block comments, including JSX comment braces", () => {
    const text = [
      "/**",
      " * Docs",
      " */",
      "function f() {",
      "  /* inline */ return (",
      "    <div>",
      "      {/* note */}",
      "    </div>",
      "  );",
      "}",
    ].join("\n");
    expect(countCodeLines(text, "tsx")).toEqual({ nonBlank: 10, code: 6 });
  });

  it("does not treat comment markers inside strings as comments", () => {
    const text = [
      'const url = "https://example.com"; ',
      "const glob = '/* not a comment */';",
      "const t = `// still a string`;",
    ].join("\n");
    expect(countCodeLines(text, "ts")).toEqual({ nonBlank: 3, code: 3 });
  });

  it("handles CSS comments and YAML comments", () => {
    expect(countCodeLines("/* a */\n.x { color: red; }\n\n/*\n b\n*/", "css")).toEqual({ nonBlank: 5, code: 1 });
    expect(countCodeLines("# c\nname: CI\n  # indented\non: push", "yml")).toEqual({ nonBlank: 4, code: 2 });
  });
});

describe("classifyPath", () => {
  it.each([
    ["app/[locale]/page.tsx", "app", true],
    ["src/lib/vitals-store.ts", "app", true],
    ["middleware.ts", "app", true],
    ["src/styles/globals.css", "css", true],
    ["app/[locale]/lab/lab.module.css", "css", true],
    ["e2e/basic.spec.ts", "test", true],
    ["tests/scripts/loc-report.test.ts", "test", true],
    ["src/lib/__tests__/blog.test.ts", "test", true],
    ["src/test/setup.ts", "test", true],
    ["scripts/check-banned-claims.mjs", "script", true],
    ["scripts/pre-commit-image-optimization.sh", "script", true],
    [".github/workflows/ci.yml", "ci", true],
    ["src/data/cases/walkie.ts", "data", false],
    ["content/blog/post.mdx", "content", false],
    ["README.md", "content", false],
    ["src/messages/en.json", "i18n", false],
    ["next.config.js", "config", false],
    ["tsconfig.json", "config", false],
    ["public/images/a.webp", "asset", false],
    ["pnpm-lock.yaml", "excluded", false],
    ["src/data/ai/semantic-index.generated.json", "excluded", false],
    ["scripts/banned-claims.json", "excluded", false],
  ])("%s is %s (counted: %s)", (path, kind, counted) => {
    expect(classifyPath(path)).toMatchObject({ kind, counted });
  });
});

describe("extractImports", () => {
  it("finds static, dynamic, re-export, side-effect and require imports", () => {
    const text = [
      'import a from "./a";',
      "import { b } from '@/lib/b';",
      'import "./side.css";',
      'export { c } from "../c";',
      'export * from "./d";',
      'const e = await import("./e");',
      'const f = require("./f");',
      "import type { G } from './g';",
      'import React from "react";',
    ].join("\n");
    expect(extractImports(text, "ts").sort()).toEqual(
      ["./a", "@/lib/b", "./side.css", "../c", "./d", "./e", "./f", "./g", "react"].sort(),
    );
  });

  it("finds CSS @import", () => {
    expect(extractImports('@import "./tokens.css";\n@import url("./b.css");\n.x{}', "css")).toEqual([
      "./tokens.css",
      "./b.css",
    ]);
  });

  it("ignores imports that only appear in comments", () => {
    expect(extractImports('// import x from "./x";\n/* import y from "./y" */\nconst z = 1;', "ts")).toEqual([]);
  });
});

describe("resolveImport", () => {
  const files = new Set([
    "src/lib/b.ts",
    "src/components/Card/index.tsx",
    "app/[locale]/page.tsx",
    "app/[locale]/a.module.css",
    "content/x.mdx",
    "scripts/lib/core.mjs",
  ]);

  it("resolves relative paths with and without extensions", () => {
    expect(resolveImport("./a.module.css", "app/[locale]/page.tsx", files)).toBe("app/[locale]/a.module.css");
    expect(resolveImport("../../src/lib/b", "app/[locale]/page.tsx", files)).toBe("src/lib/b.ts");
    expect(resolveImport("./lib/core.mjs", "scripts/run.mjs", files)).toBe("scripts/lib/core.mjs");
  });

  it("resolves the @/ alias and index files", () => {
    expect(resolveImport("@/lib/b", "app/[locale]/page.tsx", files)).toBe("src/lib/b.ts");
    expect(resolveImport("@/components/Card", "app/[locale]/page.tsx", files)).toBe(
      "src/components/Card/index.tsx",
    );
    expect(resolveImport("@/content/x.mdx", "app/[locale]/page.tsx", files)).toBe("content/x.mdx");
  });

  it("returns null for packages and missing files", () => {
    expect(resolveImport("react", "app/[locale]/page.tsx", files)).toBeNull();
    expect(resolveImport("./missing", "app/[locale]/page.tsx", files)).toBeNull();
  });
});

describe("routeFromAppFile", () => {
  it("turns page and route files into segment patterns", () => {
    expect(routeFromAppFile("app/[locale]/projects/[slug]/page.tsx")).toEqual({
      segments: ["[locale]", "projects", "[slug]"],
      type: "page",
    });
    expect(routeFromAppFile("app/api/vitals/route.ts")).toEqual({ segments: ["api", "vitals"], type: "route" });
    expect(routeFromAppFile("app/(marketing)/about/page.tsx")).toEqual({ segments: ["about"], type: "page" });
    expect(routeFromAppFile("app/feed.xml/route.ts")).toEqual({ segments: ["feed.xml"], type: "route" });
  });

  it("maps metadata files to the URLs Next serves them at", () => {
    expect(routeFromAppFile("app/sitemap.ts")).toEqual({ segments: ["sitemap.xml"], type: "route" });
    expect(routeFromAppFile("app/robots.ts")).toEqual({ segments: ["robots.txt"], type: "route" });
    expect(routeFromAppFile("app/manifest.ts")).toEqual({ segments: ["manifest.webmanifest"], type: "route" });
    expect(routeFromAppFile("app/opengraph-image.tsx")).toEqual({ segments: ["opengraph-image"], type: "route" });
  });

  it("ignores layouts, components and other files", () => {
    expect(routeFromAppFile("app/[locale]/layout.tsx")).toBeNull();
    expect(routeFromAppFile("app/[locale]/lab/LabClient.tsx")).toBeNull();
  });
});

describe("matchVisitedPath", () => {
  const appFiles = [
    "app/layout.tsx",
    "app/[locale]/layout.tsx",
    "app/[locale]/page.tsx",
    "app/[locale]/not-found.tsx",
    "app/[locale]/lab/page.tsx",
    "app/[locale]/lab/loading.tsx",
    "app/[locale]/projects/page.tsx",
    "app/[locale]/projects/[slug]/page.tsx",
    "app/[locale]/projects/walkie-extra/page.tsx",
    "app/[locale]/[...rest]/page.tsx",
    "app/api/vitals/route.ts",
    "app/search-index/[locale]/route.ts",
  ];
  const locales = ["en", "zh"];

  it("maps unprefixed English paths onto the [locale] tree with its layouts", () => {
    expect(matchVisitedPath("/lab", appFiles, locales)?.sort()).toEqual(
      ["app/layout.tsx", "app/[locale]/layout.tsx", "app/[locale]/lab/page.tsx", "app/[locale]/lab/loading.tsx"].sort(),
    );
    expect(matchVisitedPath("/", appFiles, locales)).toContain("app/[locale]/page.tsx");
    expect(matchVisitedPath("/zh/lab", appFiles, locales)).toContain("app/[locale]/lab/page.tsx");
  });

  it("prefers static segments over dynamic ones and dynamic over catch-all", () => {
    expect(matchVisitedPath("/projects/walkie-extra", appFiles, locales)).toContain(
      "app/[locale]/projects/walkie-extra/page.tsx",
    );
    expect(matchVisitedPath("/en/projects/maze", appFiles, locales)).toContain(
      "app/[locale]/projects/[slug]/page.tsx",
    );
    expect(matchVisitedPath("/this-page-does-not-exist", appFiles, locales)).toEqual(
      expect.arrayContaining(["app/[locale]/[...rest]/page.tsx", "app/[locale]/not-found.tsx"]),
    );
  });

  it("strips query and hash, and treats ${...} as a dynamic segment", () => {
    expect(matchVisitedPath("/lab?x=1#top", appFiles, locales)).toContain("app/[locale]/lab/page.tsx");
    expect(matchVisitedPath("/projects/${slug}", appFiles, locales)).toContain(
      "app/[locale]/projects/[slug]/page.tsx",
    );
    expect(matchVisitedPath("/search-index/${locale}", appFiles, locales)).toEqual([
      "app/search-index/[locale]/route.ts",
    ]);
  });

  it("matches API routes directly, without layouts", () => {
    expect(matchVisitedPath("/api/vitals", appFiles, locales)).toEqual(["app/api/vitals/route.ts"]);
  });
});

describe("extractVisitedPaths", () => {
  it("collects path-like string literals from specs", () => {
    const spec = [
      'const PAGES = ["/", "/hire", "/vault#lineage-graph"];',
      "await page.goto(`/en/projects/${slug}`);",
      'await request.get("/api/vitals");',
      'test("renders the hero", async () => {});',
      'expect(x).toBe("not a path");',
      'const url = "https://example.com/abs";',
    ].join("\n");
    expect(extractVisitedPaths(spec).sort()).toEqual(
      ["/", "/hire", "/vault#lineage-graph", "/en/projects/${slug}", "/api/vitals"].sort(),
    );
  });
});

describe("buildReport", () => {
  const file = (path: string, text: string) => ({ path, text });
  const files = [
    file("app/layout.tsx", 'import "./globals.css";\nexport default function L() {\n  return null;\n}'),
    file("app/globals.css", "/* base */\nbody { margin: 0; }"),
    file("app/[locale]/page.tsx", 'import { used } from "@/lib/used";\nexport default function P() {\n  return used();\n}'),
    file("app/[locale]/orphan/page.tsx", "export default function O() {\n  return null;\n}"),
    file("src/lib/used.ts", "// helper\nexport function used() {\n  return 1;\n}"),
    file("src/lib/zz-copy.ts", "// helper\nexport function used() {\n  return 1;\n}"),
    file("src/lib/unit-only.ts", "export const x = 1;\nexport const y = 2;"),
    file("src/lib/dead.ts", "export const dead = 1;"),
    file("src/data/cases/a.ts", "export const a = {\n  title: 'A',\n};"),
    file("scripts/check.mjs", "console.log(1);\nprocess.exit(0);"),
    file("scripts/untested.mjs", "console.log(2);"),
    file("e2e/home.spec.ts", 'test("home", async ({ page }) => {\n  await page.goto("/");\n});'),
    file("tests/scripts/check.test.ts", 'const p = join("scripts", "check.mjs");\nit("runs", () => {});'),
    file("tests/scripts/mention.test.ts", 'const list = ["scripts/untested.mjs"];'),
    file("src/data/ai/x.generated.json", '{"a":1}'),
    file("content/blog/a.mdx", "# Title\n\nBody"),
  ];

  const report = buildReport({
    files,
    unusedFiles: new Set(["src/lib/dead.ts"]),
    unitLoaded: new Set(["src/lib/unit-only.ts", "src/lib/dead.ts", "src/lib/zz-copy.ts"]),
    unitLines: new Map([["src/lib/unit-only.ts", { covered: 1, total: 2 }]]),
    locales: ["en", "zh"],
  });
  const byPath = (p: string) => report.files.find((f: { path: string }) => f.path === p);

  it("counts files reached from a visited route, including layouts, CSS and imports", () => {
    expect(byPath("app/layout.tsx")).toMatchObject({ effective: 4 });
    expect(byPath("app/globals.css")).toMatchObject({ effective: 1 });
    expect(byPath("app/[locale]/page.tsx")).toMatchObject({ effective: 4 });
    expect(byPath("src/lib/used.ts")).toMatchObject({ effective: 3 });
  });

  it("counts unit-loaded files and scripts a test refers to", () => {
    expect(byPath("src/lib/unit-only.ts")).toMatchObject({ effective: 2 });
    expect(byPath("scripts/check.mjs")).toMatchObject({ effective: 2 });
  });

  it("excludes untested, dead, duplicated and non-code files, with a reason", () => {
    expect(byPath("app/[locale]/orphan/page.tsx")).toMatchObject({ effective: 0, reason: "untested" });
    expect(byPath("scripts/untested.mjs")).toMatchObject({ effective: 0, reason: "untested" });
    expect(byPath("src/lib/dead.ts")).toMatchObject({ effective: 0, reason: "unused" });
    expect(byPath("src/lib/zz-copy.ts")).toMatchObject({ effective: 0, reason: "duplicate" });
    expect(byPath("src/data/cases/a.ts")).toMatchObject({ effective: 0, reason: "not-code" });
    expect(byPath("src/data/ai/x.generated.json")).toMatchObject({ effective: 0, reason: "excluded" });
  });

  it("counts framework entry files Next loads on every render once any page is visited", () => {
    const r = buildReport({
      files: [
        file("app/[locale]/page.tsx", "export default function P() {\n  return null;\n}"),
        file("middleware.ts", "export const config = {};"),
        file("src/i18n/request.ts", 'import { routing } from "./routing";\nexport default routing;'),
        file("src/i18n/routing.ts", "export const routing = {};"),
        file("e2e/a.spec.ts", 'await page.goto("/");'),
      ],
      locales: ["en", "zh"],
    });
    const eff = (p: string) => r.files.find((f: { path: string }) => f.path === p)?.effective;
    expect(eff("middleware.ts")).toBe(1);
    expect(eff("src/i18n/request.ts")).toBe(2);
    expect(eff("src/i18n/routing.ts")).toBe(1);
  });

  it("counts a declaration file beside a reached JavaScript module", () => {
    const r = buildReport({
      files: [
        file("app/[locale]/page.tsx", 'import { f } from "@/lib/core.mjs";\nexport default f;'),
        file("src/lib/core.mjs", "export const f = () => null;"),
        file("src/lib/core.d.ts", "export declare const f: () => null;"),
        file("src/lib/other.d.ts", "export declare const g: number;"),
        file("e2e/a.spec.ts", 'await page.goto("/");'),
      ],
      locales: ["en", "zh"],
    });
    const eff = (p: string) => r.files.find((f: { path: string }) => f.path === p)?.effective;
    expect(eff("src/lib/core.d.ts")).toBe(1);
    expect(eff("src/lib/other.d.ts")).toBe(0);
  });

  it("counts tests as they are", () => {
    expect(byPath("e2e/home.spec.ts")).toMatchObject({ effective: 3 });
    expect(byPath("tests/scripts/check.test.ts")).toMatchObject({ effective: 2 });
    expect(byPath("tests/scripts/mention.test.ts")).toMatchObject({ effective: 1 });
  });

  it("sums per kind and in total, keeping non-code apart", () => {
    expect(report.kinds.app).toMatchObject({ effective: 4 + 4 + 3 + 2 });
    expect(report.kinds.css).toMatchObject({ effective: 1 });
    expect(report.kinds.test).toMatchObject({ effective: 6 });
    expect(report.kinds.script).toMatchObject({ effective: 2 });
    expect(report.totals.effective).toBe(13 + 1 + 6 + 2);
    expect(report.notCode.data.nonBlank).toBe(3);
    expect(report.notCode.content.nonBlank).toBe(2);
    expect(report.unitLineCoverage).toEqual({ covered: 1, total: 2 });
  });
});
