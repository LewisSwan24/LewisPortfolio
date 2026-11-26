import "@/lib/zod-jitless";
import { z } from "zod";
import { EVIDENCE_CORPUS_MAP, type EvidenceChunk } from "./evidence-corpus";

export const ReasonCodeSchema = z.enum([
  "design-rationale-match",
  "safety-boundary",
  "interaction-friction",
  "prototype-proof",
  "honest-scope",
]);

export type ReasonCode = z.infer<typeof ReasonCodeSchema>;

export const REASON_CODE_LABELS: Record<ReasonCode, { en: string; zh: string }> = {
  "design-rationale-match": {
    en: "Design tradeoff rationale",
    zh: "核心设计决策命中",
  },
  "safety-boundary": {
    en: "Refusal & safety boundary",
    zh: "安全与拒绝边界",
  },
  "interaction-friction": {
    en: "Human friction alignment",
    zh: "人因摩擦与场景对齐",
  },
  "prototype-proof": {
    en: "Working prototype verification",
    zh: "真实原型门禁验证",
  },
  "honest-scope": {
    en: "Explicit empirical scope",
    zh: "诚实边界与未测说明",
  },
};

export const AiMatchSelectionSchema = z.object({
  selections: z
    .array(
      z.object({
        slug: z.string().min(1),
        evidenceIds: z.array(z.string().min(1)).min(1).max(3),
        reasonCode: ReasonCodeSchema,
      })
    )
    .min(1)
    .max(4),
});

export type AiMatchSelection = z.infer<typeof AiMatchSelectionSchema>;

export async function optionalLlmRerank(params: {
  query: string;
  candidates: EvidenceChunk[];
}): Promise<{ mode: "openai" | "gemini" | "bm25-local"; selection: AiMatchSelection }> {
  const { query, candidates } = params;

  // Deterministic BM25 grouping fallback
  const fallbackGroup = (): AiMatchSelection => {
    const bySlug = new Map<string, string[]>();
    for (const c of candidates) {
      const arr = bySlug.get(c.slug) ?? [];
      if (arr.length < 2) arr.push(c.id);
      bySlug.set(c.slug, arr);
    }
    const selections = Array.from(bySlug.entries())
      .slice(0, 3)
      .map(([slug, evidenceIds]) => {
        const lead = EVIDENCE_CORPUS_MAP.get(evidenceIds[0]!);
        const reasonCode: ReasonCode =
          lead?.pillar === "design-rationale"
            ? "design-rationale-match"
            : lead?.pillar === "metric-limit"
              ? "honest-scope"
              : "interaction-friction";
        return { slug, evidenceIds, reasonCode };
      });
    return { selections: selections.length > 0 ? selections : [] };
  };

  const openaiKey = process.env.OPENAI_API_KEY?.trim();
  const geminiKey = process.env.GEMINI_API_KEY?.trim();

  if ((!openaiKey && !geminiKey) || query.length < 40 || candidates.length === 0) {
    return { mode: "bm25-local", selection: fallbackGroup() };
  }

  const compactCandidates = candidates.slice(0, 10).map((c) => ({
    id: c.id,
    slug: c.slug,
    pillar: c.pillar,
    title: c.title.en,
  }));

  const instruction =
    `Select 1 to 3 slugs and candidate IDs from the provided list ONLY. Return strict JSON ` +
    `matching {"selections":[{"slug":string,"evidenceIds":[string],"reasonCode":"design-rationale-match"|"safety-boundary"|"interaction-friction"|"prototype-proof"|"honest-scope"}]}. Never invent IDs.`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4500);

  try {
    let rawJsonText = "";
    if (openaiKey) {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        signal: controller.signal,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: instruction },
            { role: "user", content: JSON.stringify({ query, candidates: compactCandidates }) },
          ],
        }),
      });
      if (!res.ok) throw new Error(`OpenAI HTTP ${res.status}`);
      const json = (await res.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      rawJsonText = json.choices?.[0]?.message?.content ?? "";
    } else if (geminiKey) {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(geminiKey)}`,
        {
          method: "POST",
          signal: controller.signal,
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            generationConfig: { responseMimeType: "application/json", temperature: 0 },
            contents: [
              {
                role: "user",
                parts: [{ text: `${instruction}\n\n${JSON.stringify({ query, candidates: compactCandidates })}` }],
              },
            ],
          }),
        }
      );
      if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);
      const json = (await res.json()) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      };
      rawJsonText = json.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    }

    const parsed = AiMatchSelectionSchema.safeParse(JSON.parse(rawJsonText));
    if (!parsed.success) {
      return { mode: "bm25-local", selection: fallbackGroup() };
    }

    // Physical whitelist check: discard any hallucinated evidenceId not in EVIDENCE_CORPUS_MAP
    const verified = parsed.data.selections
      .map((item) => ({
        slug: item.slug,
        reasonCode: item.reasonCode,
        evidenceIds: item.evidenceIds.filter((id) => {
          const chunk = EVIDENCE_CORPUS_MAP.get(id);
          return chunk && chunk.slug === item.slug;
        }),
      }))
      .filter((item) => item.evidenceIds.length > 0);

    if (verified.length === 0) {
      return { mode: "bm25-local", selection: fallbackGroup() };
    }

    return {
      mode: openaiKey ? "openai" : "gemini",
      selection: { selections: verified },
    };
  } catch {
    return { mode: "bm25-local", selection: fallbackGroup() };
  } finally {
    clearTimeout(timer);
  }
}
