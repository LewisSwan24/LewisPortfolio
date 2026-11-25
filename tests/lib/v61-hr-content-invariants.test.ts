import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { grasslandCase } from "@/data/cases/grassland";
import { grasslandModules } from "@/data/cases/modules/grassland-modules";
import { ALL_CASE_RECORDS } from "@/data/cases";
import { auditTranslationese } from "@/lib/i18n/editorial-voice";
import enMessages from "@/messages/en.json";
import zhMessages from "@/messages/zh.json";

describe("v6.1 HR Content Richness, Natural Copy & Taxonomy Invariants", () => {
  it("keeps English grassland narrative and deep modules free of raw CJK characters", () => {
    const enNarrativeJson = JSON.stringify(grasslandCase.narrative.en);
    const enModulesText = JSON.stringify(
      grasslandModules.journey.map((j) => ({
        title: j.title.en,
        trigger: j.trigger.en,
        mental: j.userMentalModel.en,
        action: j.systemAction.en,
      }))
    );
    expect(/[\u4e00-\u9fff]/.test(enNarrativeJson)).toBe(false);
    expect(/[\u4e00-\u9fff]/.test(enModulesText)).toBe(false);
    expect(enNarrativeJson).toContain("Embers of the Pale Wolf");
  });

  it("maintains crisp 7-item top bar labels without ambiguous Lab vs AI Lab naming", () => {
    expect(enMessages.nav.lab).toBe("UI Lab");
    expect(enMessages.nav.ai).toBe("AI Lab");
    expect(enMessages.nav.hire).toBe("Hire & CV");
    expect(zhMessages.nav.lab).toBe("UI 实验室");
    expect(zhMessages.nav.ai).toBe("AI 实验室");
    expect(zhMessages.nav.hire).toBe("招聘与简历");
  });

  it("removes '尚待补充' placeholders across all listed flagship case cards", () => {
    const listed = ALL_CASE_RECORDS.filter((c) => c.status === "listed");
    expect(listed.length).toBe(6);
    for (const item of listed) {
      const text = JSON.stringify(item.card);
      expect(text).not.toContain("尚待补充");
      expect(auditTranslationese(item.card.zh.sub, "zh")).toEqual([]);
      expect(auditTranslationese(item.card.en.sub, "en")).toEqual([]);
    }
  });

  it("wires HR fast-track 1-page PDF CV & repo external links without nested anchors", () => {
    const homeSource = fs.readFileSync(
      path.join(process.cwd(), "app", "[locale]", "page.tsx"),
      "utf8"
    );
    const resumeActionsSource = fs.readFileSync(
      path.join(process.cwd(), "app", "[locale]", "resume", "ResumeActions.tsx"),
      "utf8"
    );
    const resumePageSource = fs.readFileSync(
      path.join(process.cwd(), "app", "[locale]", "resume", "page.tsx"),
      "utf8"
    );
    expect(homeSource).toContain("/resume/lewis-dong-resume-");
    expect(homeSource).toContain("feat-actions");
    expect(resumeActionsSource).toContain("/resume/lewis-dong-resume-");
    expect(resumePageSource).toContain("honours dissertation");
    expect(resumePageSource).toContain("荣誉毕业论文");
  });
});
