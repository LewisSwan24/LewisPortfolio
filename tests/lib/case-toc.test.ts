import { describe, expect, it } from "vitest";
import { buildCaseToc, resolveCaseEvidenceLink } from "@/lib/cases/case-toc";
import { mazeModules } from "@/data/cases/modules/maze-modules";
import { walkieModules } from "@/data/cases/modules/walkie-modules";
import { lamplightModules } from "@/data/cases/modules/lamplight-modules";
import { autofillModules } from "@/data/cases/modules/autofill-modules";
import { onthebeatModules } from "@/data/cases/modules/onthebeat-modules";
import { grasslandModules } from "@/data/cases/modules/grassland-modules";

describe("case TOC (review row 08)", () => {
  it("keeps render order, drops absent sections and merges duplicate labels", () => {
    const toc = buildCaseToc([
      { id: "artifact", label: "Artifact" },
      { id: "design-decisions", label: "Design Decisions" },
      { id: "interactive-demo", label: "Interactive prototype", present: false },
      { id: "decision-timeline", label: "Design decisions" },
      { id: "red-team-defense", label: "Red-Team defense" },
    ]);
    expect(toc.map((entry) => entry.id)).toEqual(["artifact", "design-decisions", "red-team-defense"]);
  });
});

describe("case evidence links (review row 20)", () => {
  const sectionLabels = { "decision-timeline": "Technical decisions" };

  it("turns a link to the same case into an in-page anchor named after the section", () => {
    expect(
      resolveCaseEvidenceLink("/projects/walkie#decision-timeline", {
        currentSlug: "walkie",
        sectionLabels,
        locale: "en",
      })
    ).toEqual({ href: "#decision-timeline", label: "Jump to Technical decisions ↓", inPage: true });
  });

  it("leaves links to another page as page links", () => {
    const link = resolveCaseEvidenceLink("/projects/maze#decision-timeline", {
      currentSlug: "walkie",
      sectionLabels,
      locale: "zh",
    });
    expect(link.inPage).toBe(false);
    expect(link.href).toBe("/projects/maze#decision-timeline");
  });
});

describe("journey short labels (review row 16)", () => {
  const all = [
    mazeModules,
    walkieModules,
    lamplightModules,
    autofillModules,
    onthebeatModules,
    grasslandModules,
  ];

  it("gives every stage a short label that fits the 24ch progress chip", () => {
    for (const record of all) {
      for (const stage of record.journey) {
        expect(stage.shortTitle.en.length, `${stage.id} en`).toBeLessThanOrEqual(22);
        // A Han character takes about two Latin character widths.
        const zhWidth = [...stage.shortTitle.zh].reduce(
          (sum, ch) => sum + ((ch.codePointAt(0) ?? 0) >= 0x3000 ? 2 : 1),
          0
        );
        expect(zhWidth, `${stage.id} zh`).toBeLessThanOrEqual(22);
      }
    }
  });
});
