import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// v6.4 review C11: one AI feature carried five names. The site calls it "AI Lab"
// (zh "AI 实验室"); Lewis picked renaming the blog's "Rationale AI Lab" on 2026-11-27.
describe("v6.9 AI Lab has one name", () => {
  it("no essay calls it Rationale AI Lab", () => {
    const dir = path.join(process.cwd(), "content", "blog");
    const files = fs.readdirSync(dir, { recursive: true }).map(String).filter((f) => f.endsWith(".mdx"));
    const hits = files.filter((f) => /Rationale AI Lab/.test(fs.readFileSync(path.join(dir, f), "utf8")));
    expect(hits).toEqual([]);
  });
});
