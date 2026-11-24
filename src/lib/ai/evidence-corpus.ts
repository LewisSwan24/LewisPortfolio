import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getListedCases } from "@/lib/cases/registry";
import type { RoleTrack } from "@/lib/cases/schema";
import { localizeInternalHref } from "@/lib/locale-href";
import { getAllInteractionPatterns } from "@/data/patterns/patterns-data";
import { CASE_FSM_SPECS } from "@/data/fsm/case-fsms";
import { CASE_HEURISTIC_AUDITS } from "@/data/heuristics/case-heuristics";
import { getAllResearchVaults } from "@/data/cases/research-vault";
import { getCaseDepth } from "@/lib/proof/case-depth";

export type EvidencePillar =
  | "design-rationale"
  | "research-quote"
  | "research-vault"
  | "pattern"
  | "heuristic"
  | "metric-limit"
  | "narrative"
  | "writing";

export interface StructuredRationaleFields {
  tension: { en: string; zh: string };
  rejected: { en: string; zh: string };
  chosen: { en: string; zh: string };
  limit: { en: string; zh: string };
}

export interface EvidenceChunk {
  id: string;
  slug: string;
  type: "case" | "blog";
  pillar: EvidencePillar;
  weight: number;
  roleTracks: RoleTrack[];
  caseTitle: { en: string; zh: string };
  title: { en: string; zh: string };
  text: { en: string; zh: string };
  structured?: StructuredRationaleFields;
  href: { en: string; zh: string };
}

export const PILLAR_WEIGHT: Record<EvidencePillar, number> = {
  "design-rationale": 2.8,
  "research-quote": 2.4,
  "research-vault": 2.3,
  pattern: 2.2,
  heuristic: 1.9,
  "metric-limit": 2.0,
  writing: 1.8,
  narrative: 1.0,
};

function stripMarkdownForIndex(raw: string): string {
  return raw
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_`>|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function loadPublishedBlogChunks(): EvidenceChunk[] {
  const blogDir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(blogDir)) return [];

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));
  const chunks: EvidenceChunk[] = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const enPath = path.join(blogDir, file);
    const zhPath = path.join(blogDir, "zh", file);
    try {
      const enParsed = matter(fs.readFileSync(enPath, "utf8"));
      if (enParsed.data.published === false) continue;

      const zhParsed = fs.existsSync(zhPath)
        ? matter(fs.readFileSync(zhPath, "utf8"))
        : enParsed;

      const enTitle = String(enParsed.data.title ?? slug);
      const zhTitle = String(zhParsed.data.title ?? enTitle);
      const enExcerpt = String(enParsed.data.excerpt ?? "").trim();
      const zhExcerpt = String(zhParsed.data.excerpt ?? enExcerpt).trim();
      const enBody = stripMarkdownForIndex(enParsed.content).slice(0, 420);
      const zhBody = stripMarkdownForIndex(zhParsed.content).slice(0, 320);

      chunks.push({
        id: `essay:${slug}:thesis`,
        slug: `essay:${slug}`,
        type: "blog",
        pillar: "writing",
        weight: PILLAR_WEIGHT.writing,
        roleTracks: ["design-eng", "interaction", "ai-ux"],
        caseTitle: { en: `Essay · ${enTitle}`, zh: `专栏文章 · ${zhTitle}` },
        title: { en: enTitle, zh: zhTitle },
        text: {
          en: `${enExcerpt} ${enBody}`.trim(),
          zh: `${zhExcerpt} ${zhBody}`.trim(),
        },
        href: {
          en: localizeInternalHref(`/blog/${slug}`, "en"),
          zh: localizeInternalHref(`/blog/${slug}`, "zh"),
        },
      });
    } catch {
      // Skip unreadable file without crashing build
    }
  }

  return chunks;
}

function buildCorpus(): EvidenceChunk[] {
  const chunks: EvidenceChunk[] = [];

  // Listed cases ONLY — every unlisted slug is excluded structurally.
  for (const record of getListedCases()) {
    const slug = record.slug;
    const caseTitle = {
      en: record.card.en.title,
      zh: record.card.zh.title,
    };

    for (const dec of record.designDecisions ?? []) {
      const rejectedEn = dec.rejectedAlternatives
        .map((a) => `${a.option.en} — ${a.flaw.en}`)
        .join("; ");
      const rejectedZh = dec.rejectedAlternatives
        .map((a) => `${a.option.zh}（${a.flaw.zh}）`)
        .join("；");

      chunks.push({
        id: `${slug}:decision:${dec.id}`,
        slug,
        type: "case",
        pillar: "design-rationale",
        weight: PILLAR_WEIGHT["design-rationale"],
        roleTracks: record.roleTracks,
        caseTitle,
        title: dec.decisionTitle,
        structured: {
          tension: dec.humanTension,
          rejected: { en: rejectedEn, zh: rejectedZh },
          chosen: dec.chosenTradeoff,
          limit: dec.residualCostOrRisk,
        },
        text: {
          en: `Tension: ${dec.humanTension.en} | Rejected: ${rejectedEn} | Chosen: ${dec.chosenTradeoff.en} | Limit: ${dec.residualCostOrRisk.en}`,
          zh: `人因冲突：${dec.humanTension.zh} | 否决方案：${rejectedZh} | 最终取舍：${dec.chosenTradeoff.zh} | 诚实边界：${dec.residualCostOrRisk.zh}`,
        },
        href: {
          en: localizeInternalHref(`/projects/${slug}#design-decisions`, "en"),
          zh: localizeInternalHref(`/projects/${slug}#design-decisions`, "zh"),
        },
      });
    }

    if (record.processArtifacts?.quotes) {
      record.processArtifacts.quotes.items.forEach((item, idx) => {
        const cleanEnQuote = item.quote.en.replace(/^["“]+|["”]+$/g, "");
        const cleanZhQuote = item.quote.zh.replace(/^[「"“]+|[」"”]+$/g, "");
        chunks.push({
          id: `${slug}:quote:${idx}`,
          slug,
          type: "case",
          pillar: "research-quote",
          weight: PILLAR_WEIGHT["research-quote"],
          roleTracks: record.roleTracks,
          caseTitle,
          title: item.context,
          text: {
            en: `"${cleanEnQuote}" — Decision: ${item.decision.en}`,
            zh: `「${cleanZhQuote}」— 对应决策：${item.decision.zh}`,
          },
          href: {
            en: localizeInternalHref(`/projects/${slug}#process-artifacts`, "en"),
            zh: localizeInternalHref(`/projects/${slug}#process-artifacts`, "zh"),
          },
        });
      });
    }

    const depthEn = getCaseDepth(slug, "en");
    const depthZh = getCaseDepth(slug, "zh");
    depthEn.limits.forEach((lim, idx) => {
      const limZh = depthZh.limits[idx];
      chunks.push({
        id: `${slug}:limit:${idx}`,
        slug,
        type: "case",
        pillar: "metric-limit",
        weight: PILLAR_WEIGHT["metric-limit"],
        roleTracks: record.roleTracks,
        caseTitle,
        title: { en: lim.constraint, zh: limZh?.constraint ?? lim.constraint },
        text: {
          en: `${lim.constraint} — ${lim.whyItMatters} Next: ${lim.nextValidation}`,
          zh: `${limZh?.constraint ?? lim.constraint} — ${limZh?.whyItMatters ?? ""} 下一步：${limZh?.nextValidation ?? ""}`,
        },
        href: {
          en: localizeInternalHref(`/projects/${slug}#outcome-limits`, "en"),
          zh: localizeInternalHref(`/projects/${slug}#outcome-limits`, "zh"),
        },
      });
    });

    chunks.push({
      id: `${slug}:narrative:decision`,
      slug,
      type: "case",
      pillar: "narrative",
      weight: PILLAR_WEIGHT.narrative,
      roleTracks: record.roleTracks,
      caseTitle,
      title: { en: record.narrative.en.sy.title, zh: record.narrative.zh.sy.title },
      text: {
        en: `${record.narrative.en.ch.p} ${record.narrative.en.sy.p}`,
        zh: `${record.narrative.zh.ch.p} ${record.narrative.zh.sy.p}`,
      },
      href: {
        en: localizeInternalHref(`/projects/${slug}#decision-timeline`, "en"),
        zh: localizeInternalHref(`/projects/${slug}#decision-timeline`, "zh"),
      },
    });
  }

  chunks.push(...loadPublishedBlogChunks());

  for (const pat of getAllInteractionPatterns()) {
    chunks.push({
      id: `pattern:${pat.slug}`,
      slug: pat.sourceCaseSlug,
      type: "case",
      pillar: "pattern",
      weight: PILLAR_WEIGHT.pattern,
      roleTracks: pat.roleTracks,
      caseTitle: {
        en: `Pattern · ${pat.title.en}`,
        zh: `交互模式 · ${pat.title.zh}`,
      },
      title: pat.title,
      structured: {
        tension: pat.humanTension,
        rejected: pat.commonAntiPattern,
        chosen: pat.chosenRule,
        limit: pat.metricsCeiling.summary,
      },
      text: {
        en: `${pat.tagline.en} Rule: ${pat.chosenRule.en} Limit: ${pat.metricsCeiling.summary.en}`,
        zh: `${pat.tagline.zh} 规则：${pat.chosenRule.zh} 边界：${pat.metricsCeiling.summary.zh}`,
      },
      href: {
        en: localizeInternalHref(`/patterns?pattern=${pat.slug}`, "en"),
        zh: localizeInternalHref(`/patterns?pattern=${pat.slug}`, "zh"),
      },
    });
  }

  for (const fsm of CASE_FSM_SPECS) {
    chunks.push({
      id: `fsm:${fsm.slug}`,
      slug: fsm.slug,
      type: "case",
      pillar: "heuristic",
      weight: PILLAR_WEIGHT.heuristic,
      roleTracks: ["interaction", "design-eng"],
      caseTitle: fsm.caseName,
      title: {
        en: `FSM Simulator · ${fsm.caseName.en}`,
        zh: `有限状态机模型 · ${fsm.caseName.zh}`,
      },
      text: {
        en: `${fsm.summary.en} Timing bounds: debounce ${fsm.timing.defaults.debounceMs}ms, hold ${fsm.timing.defaults.holdThresholdMs}ms, cooldown ${fsm.timing.defaults.cooldownMs}ms. ${fsm.timing.rationale.en}`,
        zh: `${fsm.summary.zh} 时序边界：防抖 ${fsm.timing.defaults.debounceMs}ms、长按阈值 ${fsm.timing.defaults.holdThresholdMs}ms、冷却 ${fsm.timing.defaults.cooldownMs}ms。${fsm.timing.rationale.zh}`,
      },
      href: {
        en: localizeInternalHref(`/lab#fsm-explorer`, "en"),
        zh: localizeInternalHref(`/lab#fsm-explorer`, "zh"),
      },
    });
  }

  for (const audit of CASE_HEURISTIC_AUDITS) {
    chunks.push({
      id: `heuristic:${audit.id}`,
      slug: audit.slug,
      type: "case",
      pillar: "heuristic",
      weight: PILLAR_WEIGHT.heuristic,
      roleTracks: ["interaction", "ai-ux"],
      caseTitle: {
        en: `${audit.slug} · ${audit.wcagRef}`,
        zh: `${audit.slug} · ${audit.wcagRef}`,
      },
      title: {
        en: audit.heuristic,
        zh: `${audit.heuristic} (${audit.wcagRef})`,
      },
      text: audit.finding,
      href: {
        en: localizeInternalHref(`/lab#heuristic-auditor`, "en"),
        zh: localizeInternalHref(`/lab#heuristic-auditor`, "zh"),
      },
    });
  }

  for (const vault of getAllResearchVaults()) {
    const slug = vault.slug;
    const roleTracks: RoleTrack[] = ["interaction", "product", "ai-ux", "design-eng"];

    for (const log of vault.observationLogs) {
      chunks.push({
        id: `${slug}:vault:${log.id}`,
        slug,
        type: "case",
        pillar: "research-vault",
        weight: PILLAR_WEIGHT["research-vault"],
        roleTracks,
        caseTitle: {
          en: `Research Vault · ${slug}`,
          zh: `原始研究档案 · ${slug}`,
        },
        title: log.sessionRef,
        text: {
          en: `${log.context.en} Observation: ${log.observation.en} Response: ${log.designResponse.en}`,
          zh: `${log.context.zh} 观察：${log.observation.zh} 响应：${log.designResponse.zh}`,
        },
        href: {
          en: localizeInternalHref(`/projects/${slug}#research-vault`, "en"),
          zh: localizeInternalHref(`/projects/${slug}#research-vault`, "zh"),
        },
      });
    }

    for (const tension of vault.triRoleTension) {
      chunks.push({
        id: `${slug}:vault:tension:${tension.role}`,
        slug,
        type: "case",
        pillar: "research-vault",
        weight: PILLAR_WEIGHT["research-vault"],
        roleTracks,
        caseTitle: {
          en: `Tri-Role Tension · ${slug}`,
          zh: `三方冲突 · ${slug}`,
        },
        title: tension.roleLabel,
        text: {
          en: `Priority: ${tension.priority.en} Tension: ${tension.tension.en} Resolution: ${tension.resolution.en}`,
          zh: `诉求：${tension.priority.zh} 冲突：${tension.tension.zh} 裁决：${tension.resolution.zh}`,
        },
        href: {
          en: localizeInternalHref(`/projects/${slug}#research-vault`, "en"),
          zh: localizeInternalHref(`/projects/${slug}#research-vault`, "zh"),
        },
      });
    }
  }

  return chunks;
}

export const EVIDENCE_CORPUS_ITEMS: readonly EvidenceChunk[] = buildCorpus();

export const EVIDENCE_CORPUS_MAP: ReadonlyMap<string, EvidenceChunk> = new Map(
  EVIDENCE_CORPUS_ITEMS.map((item) => [item.id, item])
);
