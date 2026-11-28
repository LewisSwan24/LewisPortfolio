import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = path.resolve(__dirname, "../..");
const read = (...p: string[]) => fs.readFileSync(path.join(ROOT, ...p), "utf8");

// v7.0 block 3, item 13: R16 was answered 「頭銜統一，視角保留」. Lewis's title is
// "Interaction & Product Designer"; a role lens may still be named after a team.
describe("Lewis's title is the canonical one", () => {
  it("the OG image subtitle uses it", () => {
    const og = read("app", "opengraph-image.tsx");
    expect(og).not.toMatch(/Design Engineering/);
    expect(og).toContain("Interaction & Product Designer");
  });

  it("the /about capability diagram does not call the work 'Design Engineering Proof'", () => {
    expect(read("src", "components", "editorial", "CapabilityDiagrams.tsx")).not.toContain(
      "Design Engineering Proof"
    );
  });
});
