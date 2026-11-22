import { redactPii } from "./redact-jd";

export interface StructuredCitationPayload {
  tension: string;
  rejected: string;
  chosen: string;
  limit: string;
}

export interface GroundedCitation {
  id: string;
  pillar: string;
  weight?: number;
  score?: number;
  matchedTerms?: string[];
  title: string;
  text: string;
  structured?: StructuredCitationPayload;
  href: string;
  caseTitle: string;
}

export interface GroundedMatchGroup {
  slug: string;
  type?: "case" | "blog";
  caseTitle: string;
  reasonLabel: string;
  citations: GroundedCitation[];
}

export interface AiMatchResponse {
  ok: boolean;
  mode?: string;
  redactedCount?: number;
  pipeline?: {
    corpusCount: number;
    candidateCount: number;
  };
  matches?: GroundedMatchGroup[];
  error?: string;
}

export const PRESET_DESIGN_QUESTIONS: ReadonlyArray<{ en: string; zh: string }> = [
  {
    en: "Why physical watch buttons instead of hands-free voice approval?",
    zh: "为什么坚持用手表实体按键审批，而不是纯语音口令直接放行？",
  },
  {
    en: "How do Lamplight & Autofill curb habitual approval or hallucinated guesses?",
    zh: "Lamplight 与 Autofill 如何防止习惯性回车误放行或 AI 胡乱猜题？",
  },
  {
    en: "When should social hardware step out of the way in a crowded gig?",
    zh: "演出现场社交工具为什么在双向点头确认后立刻退居二线？",
  },
  {
    en: "How does five-mission RTS grammar stay fair without special level buttons?",
    zh: "多关卡策略交互如何在复杂度递增时不背叛玩家肌肉记忆？",
  },
  {
    en: "How does the site maintain static SSG with strict CSP and WCAG AAA?",
    zh: "网站如何同时守住 77 个静态页面、严格 CSP 与 WCAG AAA 对比度？",
  },
];

export async function fetchGroundedEvidence(
  rawQuery: string,
  locale: "en" | "zh"
): Promise<{
  response: AiMatchResponse;
  clientRedactedCount: number;
  clientTruncated: boolean;
}> {
  const { sanitized, redactedCount, truncated } = redactPii(rawQuery);
  const res = await fetch("/api/ai/match", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query: sanitized, locale }),
  });

  const data = (await res.json()) as AiMatchResponse;
  return {
    response: data,
    clientRedactedCount: redactedCount,
    clientTruncated: truncated,
  };
}
