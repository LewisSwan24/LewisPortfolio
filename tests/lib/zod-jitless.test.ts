import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * zod v4 probes for JIT support with `Function("")` the first time a schema
 * is built. The probe is caught, but Chrome still reports it as a CSP
 * `script-src 'eval'` violation (e2e v45 on /en/projects/walkie).
 * src/lib/zod-jitless.ts turns the probe off, so every module that imports
 * zod imports it first. Modules keep importing `z` from "zod" directly:
 * routing `z` through a wrapper module kept all of zod in the client bundle
 * (an 88 kB gz chunk, over budget:check's 70 kB).
 */

const ROOTS = ["src", "app"];
const JITLESS = "src/lib/zod-jitless.ts";
const ZOD_IMPORT = /^import\s[^;]*from\s+["']zod(\/[^"']*)?["']/m;
const JITLESS_IMPORT = /^import\s+["']@\/lib\/zod-jitless["'];/m;

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(ts|tsx)$/.test(name)) out.push(full);
  }
  return out;
}

const files = ROOTS.flatMap((root) => walk(root))
  .map((file) => relative(process.cwd(), file).replace(/\\/g, "/"))
  .filter((file) => file !== JITLESS);

describe("zod runs jitless everywhere", () => {
  it("every module that imports zod imports @/lib/zod-jitless before it", () => {
    const offenders = files.filter((file) => {
      const src = readFileSync(file, "utf8");
      const zod = src.search(ZOD_IMPORT);
      if (zod < 0) return false;
      const jitless = src.search(JITLESS_IMPORT);
      return jitless < 0 || jitless > zod;
    });
    expect(offenders).toEqual([]);
  });

  it("no module routes z through a wrapper", () => {
    const wrappers = files.filter((file) => /export\s*\{\s*z\s*\}\s*from/.test(readFileSync(file, "utf8")));
    expect(wrappers).toEqual([]);
  });

  it("the shared module turns the JIT probe off", async () => {
    await import("@/lib/zod-jitless");
    const { z } = await import("zod");
    expect(z.config().jitless).toBe(true);
  });
});
