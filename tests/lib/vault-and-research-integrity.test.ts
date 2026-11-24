import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { LISTED_PROJECT_SLUGS, UNLISTED_PROJECT_SLUGS } from "@/lib/project-routes";
import { buildSearchIndexItems } from "@/lib/search-index";
import { auditTranslationese, EDITORIAL_VOICE_GUIDE } from "@/lib/i18n/editorial-voice";
import {
  RawResearchVaultRecordSchema,
  type RawResearchVaultRecord,
} from "@/lib/cases/research-vault-schema";
import {
  getAllResearchVaults,
  getCaseResearchVault,
} from "@/data/cases/research-vault";
import {
  getAllVaultAutopsies,
  VaultAutopsyRecordSchema,
} from "@/data/vault/autopsies";

function collectLocalizedText(value: unknown, enOut: string[], zhOut: string[]) {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    for (const item of value) collectLocalizedText(item, enOut, zhOut);
    return;
  }
  const obj = value as Record<string, unknown>;
  if (typeof obj.en === "string" && typeof obj.zh === "string") {
    enOut.push(obj.en);
    zhOut.push(obj.zh);
    return;
  }
  for (const child of Object.values(obj)) {
    collectLocalizedText(child, enOut, zhOut);
  }
}

describe("v5.1 Research Vault, Editorial Voice & Archive Lineage Invariants", () => {
  it("aligns ResumeComposerClient.tsx education strictly to UQ (2025.02–2026.11) and Swansea (2020.09–2024.07)", () => {
    const composerSource = fs.readFileSync(
      path.join(process.cwd(), "src/components/resume/ResumeComposerClient.tsx"),
      "utf8"
    );
    expect(composerSource).not.toMatch(/University of Melbourne|墨尔本大学|Melbourne ·/);
    expect(composerSource).toContain("University of Queensland");
    expect(composerSource).toContain("2025.02 – 2026.11");
    expect(composerSource).toContain("Swansea University");
    expect(composerSource).toContain("2020.09 – 2024.07");
  });

  it("enforces bilingual editorial voice rules and catches EN/ZH translationese regressions", () => {
    expect(EDITORIAL_VOICE_GUIDE.en.cadence.length).toBeGreaterThan(20);
    expect(EDITORIAL_VOICE_GUIDE.zh.cadence.length).toBeGreaterThan(20);

    const zhBad = auditTranslationese(
      "当按钮被用户点击时，一个为设计师而设计的工具会进行一次全局状态重构，从而被用户所信任。",
      "zh"
    );
    expect(zhBad.length).toBeGreaterThanOrEqual(3);

    const enBad = auditTranslationese(
      "We carry out a research to realize the function of wrist approval for users.",
      "en"
    );
    expect(enBad.length).toBeGreaterThanOrEqual(2);

    const zhClean = auditTranslationese(
      "用户离开桌面后常怕后台代理越权改文件；因此手腕前键专管放行、侧键专管拦下，让每次审批都有明确物理边界。",
      "zh"
    );
    expect(zhClean).toEqual([]);

    const enClean = auditTranslationese(
      "Front-key approval is physically separated from side-key denial so thumb muscle memory never approves a destructive tool call by accident.",
      "en"
    );
    expect(enClean).toEqual([]);
  });

  it("provides schema-valid Raw Research Vaults for all 6 listed flagships with clean editorial voice", () => {
    const vaults = getAllResearchVaults();
    expect(vaults).toHaveLength(6);

    for (const slug of LISTED_PROJECT_SLUGS) {
      const vault = getCaseResearchVault(slug);
      expect(vault, `Missing research vault for ${slug}`).not.toBeNull();
      const parsed = RawResearchVaultRecordSchema.safeParse(vault);
      expect(parsed.success, parsed.success ? "" : JSON.stringify(parsed.error.issues)).toBe(true);

      const record = vault as RawResearchVaultRecord;
      expect(record.moderatorGuide.taskProbes.length).toBeGreaterThanOrEqual(3);
      expect(record.observationLogs.length).toBeGreaterThanOrEqual(3);
      expect(record.ergonomicsOrStageSpec.rows.length).toBeGreaterThanOrEqual(3);
      expect(record.triRoleTension).toHaveLength(3);
      expect(record.rebuildToday.length).toBeGreaterThanOrEqual(4);

      const enStrings: string[] = [];
      const zhStrings: string[] = [];
      collectLocalizedText(record, enStrings, zhStrings);
      for (const s of enStrings) {
        expect(auditTranslationese(s, "en"), `EN translationese in ${slug}: ${s}`).toEqual([]);
      }
      for (const s of zhStrings) {
        expect(auditTranslationese(s, "zh"), `ZH translationese in ${slug}: ${s}`).toEqual([]);
      }
    }

    for (const unlisted of UNLISTED_PROJECT_SLUGS) {
      expect(getCaseResearchVault(unlisted)).toBeNull();
    }
  });

  it("curates all 8 archival projects in Archive Vault with valid flagship successors and zero search-index leakage", async () => {
    const autopsies = getAllVaultAutopsies();
    expect(autopsies).toHaveLength(UNLISTED_PROJECT_SLUGS.length);

    const autopsySlugs = new Set(autopsies.map((a) => a.slug));
    for (const unlisted of UNLISTED_PROJECT_SLUGS) {
      expect(autopsySlugs.has(unlisted), `Missing autopsy for ${unlisted}`).toBe(true);
    }

    for (const record of autopsies) {
      const parsed = VaultAutopsyRecordSchema.safeParse(record);
      expect(parsed.success, parsed.success ? "" : JSON.stringify(parsed.error.issues)).toBe(true);
      expect(record.lineageSuccessors.length).toBeGreaterThanOrEqual(1);
      for (const successor of record.lineageSuccessors) {
        expect((LISTED_PROJECT_SLUGS as readonly string[]).includes(successor.slug)).toBe(true);
      }

      const enStrings: string[] = [];
      const zhStrings: string[] = [];
      collectLocalizedText(record, enStrings, zhStrings);
      for (const s of enStrings) {
        expect(auditTranslationese(s, "en"), `EN translationese in vault ${record.slug}: ${s}`).toEqual([]);
      }
      for (const s of zhStrings) {
        expect(auditTranslationese(s, "zh"), `ZH translationese in vault ${record.slug}: ${s}`).toEqual([]);
      }
    }

    for (const locale of ["en", "zh"] as const) {
      const items = await buildSearchIndexItems(locale);
      const projects = items.filter((item) => item.type === "project");
      expect(projects).toHaveLength(6);
    }
  });
});
