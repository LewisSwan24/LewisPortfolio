import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import enMessages from "@/messages/en.json";
import zhMessages from "@/messages/zh.json";
import { buildLlmsTxt } from "@/lib/llms";

// One version, read from package.json. Every place a visitor or crawler can read a
// version must say the same thing, so a release bump is a single edit plus the strings
// this test names. Before 2026-11-25 the site showed five different versions at once.
const ROOT = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")) as { version: string };
const V = `v${pkg.version}`;
const read = (...p: string[]) => fs.readFileSync(path.join(ROOT, ...p), "utf8");

describe("site version is consistent", () => {
  it("package.json carries a real release version", () => {
    expect(pkg.version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(pkg.version).not.toBe("0.1.0");
  });

  it("footer shows the package version in both locales", () => {
    expect(enMessages.foot.meta.version).toContain(V);
    expect(zhMessages.foot.meta.version).toContain(V);
  });

  it("README title, llms.txt and the service-worker cache name match", async () => {
    expect(read("README.md").split("\n")[0]).toContain(V);
    expect(await buildLlmsTxt()).toContain(`(${V})`);
    expect(read("public", "sw.js")).toContain(`CACHE_VERSION = "${V}"`);
  });

  it("no page hard-codes a different release label", () => {
    const graph = read("app", "[locale]", "studio", "graph", "page.tsx");
    expect(graph).not.toMatch(/\(v\d+\.\d+(\.\d+)?\)/);
  });
});
