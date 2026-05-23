import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const scriptPath = join(process.cwd(), "scripts", "content-automation.mjs");
const tempRoots: string[] = [];

function makeRoot() {
  const root = mkdtempSync(join(tmpdir(), "portfolio-content-automation-"));
  mkdirSync(join(root, "content", "blog"), { recursive: true });
  mkdirSync(join(root, "content", "projects"), { recursive: true });
  tempRoots.push(root);
  return root;
}

function runCli(root: string, args: string[]) {
  const result = spawnSync("node", [scriptPath, ...args, "--root", root], {
    cwd: process.cwd(),
    encoding: "utf8",
  });

  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || `Command failed with ${result.status}`);
  }

  return result.stdout;
}

function runCliRaw(root: string, args: string[]) {
  return spawnSync("node", [scriptPath, ...args, "--root", root], {
    cwd: process.cwd(),
    encoding: "utf8",
  });
}

afterEach(() => {
  for (const root of tempRoots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

describe("content automation CLI", () => {
  it("creates a draft blog post with stable frontmatter", () => {
    const root = makeRoot();

    runCli(root, [
      "blog:new",
      "Design Systems for Fast Teams",
      "--excerpt",
      "A practical note on using design systems without slowing product work.",
      "--tags",
      "Design Systems,UX Design",
      "--date",
      "2026-05-23",
    ]);

    const draft = readFileSync(
      join(root, "content", "blog", "design-systems-for-fast-teams.mdx"),
      "utf8"
    );

    expect(draft).toContain('title: "Design Systems for Fast Teams"');
    expect(draft).toContain('date: "2026-05-23"');
    expect(draft).toContain("published: false");
    expect(draft).toContain("## Draft notes");
  });

  it("fails validation for invalid blog frontmatter", () => {
    const root = makeRoot();
    writeFileSync(
      join(root, "content", "blog", "bad-post.mdx"),
      ["---", 'title: ""', "date: yesterday", "tags: []", "---", "", "Body"].join("\n")
    );

    const result = runCliRaw(root, ["content:validate"]);

    expect(result.status).toBe(1);
    expect(result.stderr).toMatch(/content validation failed/i);
  });

  it("publishes an existing draft blog post", () => {
    const root = makeRoot();

    runCli(root, [
      "blog:new",
      "Publishing Workflow",
      "--excerpt",
      "How a simple Git-based publishing workflow keeps content releases calm.",
      "--tags",
      "Workflow",
      "--date",
      "2026-05-23",
    ]);
    runCli(root, ["blog:publish", "publishing-workflow"]);

    const published = readFileSync(
      join(root, "content", "blog", "publishing-workflow.mdx"),
      "utf8"
    );

    expect(published).toContain("published: true");
    expect(runCli(root, ["content:validate"])).toContain("Content validation passed");
  });

  it("validates project case-study metadata and cover assets", () => {
    const root = makeRoot();
    mkdirSync(join(root, "public", "images"), { recursive: true });
    writeFileSync(join(root, "public", "images", "case-cover.svg"), "<svg />");
    writeFileSync(
      join(root, "content", "projects", "case-system.mdx"),
      [
        "---",
        "slug: case-system",
        "title: Case System",
        "oneLiner: A modular case-study validation example",
        "role: UX Designer",
        "timeframe: May 2026",
        "tools:",
        "  - Figma",
        "tags:",
        "  - UX Design",
        "featured: false",
        "status: Draft",
        "cover: /images/case-cover.svg",
        "date: 2026-05-23",
        "---",
        "",
        "## Overview",
        "",
        "A short case-study body.",
        "",
      ].join("\n")
    );

    expect(runCli(root, ["content:validate"])).toContain("Content validation passed");
  });
});
