import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import en from "@/messages/en.json";
import zh from "@/messages/zh.json";

// v6.5: core-page fixes from docs/reviews/2026-11-ux-review.md (Lewis: 「全部修」, 2026-11-25).

function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) sourceFiles(full, out);
    else if (/\.(tsx?|json)$/.test(name)) out.push(full);
  }
  return out;
}

describe("v6.5 core review fixes", () => {
  it("C11/C12: one name for the AI feature, and zh nav labels match en", () => {
    expect(en.nav.ai).toBe("AI Lab");
    expect(zh.nav.ai).toBe("AI 实验室");
    expect(zh.nav.hire).toBe("招聘与简历");
    expect(zh.nav.lab).toBe("UI 实验室");
  });

  it("C11: no surface still calls it Rationale AI or Ask AI", () => {
    const hits = [...sourceFiles("app"), ...sourceFiles("src/components"), ...sourceFiles("src/messages")]
      .filter((file) => /Rationale AI|Ask AI|AI 辩护工作台/.test(readFileSync(file, "utf8")));
    expect(hits).toEqual([]);
  });

  it("C01: /about no longer says Design Engineering Roles", () => {
    expect(readFileSync("app/[locale]/about/page.tsx", "utf8")).not.toMatch(/Design Engineering Roles/);
  });

  it("C17: the resume button reads Tailor CV", () => {
    const src = readFileSync("app/[locale]/resume/ResumeActions.tsx", "utf8");
    expect(src).toContain("Tailor CV");
    expect(src).not.toContain("Customize Dossier");
  });
});
