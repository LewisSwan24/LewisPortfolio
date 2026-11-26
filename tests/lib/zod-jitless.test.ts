import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * zod v4 probes for JIT support with `Function("")`. The probe is caught,
 * but Chrome still reports it as a CSP `script-src 'eval'` violation
 * (e2e v45 on /en/projects/walkie). Every import goes through src/lib/zod.ts,
 * which turns the probe off with `z.config({ jitless: true })`.
 */

const ROOTS = ["src", "app"];
const ALLOWED = new Set(["src/lib/zod.ts"]);

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(ts|tsx)$/.test(name)) out.push(full);
  }
  return out;
}

describe("zod runs jitless everywhere", () => {
  it("no module imports zod directly except src/lib/zod.ts", () => {
    const offenders = ROOTS.flatMap((root) => walk(root))
      .map((file) => relative(process.cwd(), file).replace(/\\/g, "/"))
      .filter((file) => !ALLOWED.has(file))
      .filter((file) => /from\s+["']zod(\/[^"']*)?["']/.test(readFileSync(file, "utf8")));
    expect(offenders).toEqual([]);
  });

  it("the shared module turns the JIT probe off", async () => {
    const { z } = await import("@/lib/zod");
    expect(z.config().jitless).toBe(true);
  });
});
