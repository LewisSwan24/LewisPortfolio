import { NextResponse } from "next/server";
import { z } from "zod";
import { EVIDENCE_CORPUS_MAP } from "@/lib/ai/evidence-corpus";
import { redactPii, MAX_JD_QUERY_CHARS } from "@/lib/ai/redact-jd";
import { rankEvidenceBm25 } from "@/lib/ai/bm25";
import {
  optionalLlmRerank,
  REASON_CODE_LABELS,
} from "@/lib/ai/llm-adapter";
import { checkScopedRateLimit, extractClientIp } from "@/lib/server/rate-limit";

const MatchRequestSchema = z.object({
  query: z.string().trim().min(3).max(MAX_JD_QUERY_CHARS * 2),
  locale: z.enum(["en", "zh"]).optional().default("en"),
});

export async function POST(req: Request) {
  const ip = extractClientIp(req.headers);
  const limit = await checkScopedRateLimit("ai", ip, 20, 3600);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Rate limit exceeded (20 requests/hour)." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = MatchRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Query must be at least 3 characters." },
      { status: 400 }
    );
  }

  const locale = parsed.data.locale;
  const { sanitized, redactedCount } = redactPii(parsed.data.query);
  const candidates = rankEvidenceBm25(sanitized, locale, 10);

  if (candidates.length === 0) {
    return NextResponse.json({
      ok: true,
      mode: "bm25-local",
      redactedCount,
      pipeline: {
        corpusCount: EVIDENCE_CORPUS_MAP.size,
        candidateCount: 0,
      },
      matches: [],
    });
  }

  const candidateMeta = new Map(
    candidates.map((c) => [c.id, { score: c.score, matchedTerms: c.matchedTerms }])
  );

  const { mode, selection } = await optionalLlmRerank({
    query: sanitized,
    candidates,
  });

  // Strict physical table hydration: ONLY render strings directly stored in EVIDENCE_CORPUS_MAP
  const matches = selection.selections
    .map((sel) => {
      const citations = sel.evidenceIds
        .map((id) => EVIDENCE_CORPUS_MAP.get(id))
        .filter((c): c is NonNullable<typeof c> => Boolean(c))
        .map((c) => {
          const meta = candidateMeta.get(c.id);
          return {
            id: c.id,
            pillar: c.pillar,
            weight: c.weight,
            score: meta?.score ?? c.weight,
            matchedTerms: meta?.matchedTerms ?? [],
            title: c.title[locale],
            text: c.text[locale],
            structured: c.structured
              ? {
                  tension: c.structured.tension[locale],
                  rejected: c.structured.rejected[locale],
                  chosen: c.structured.chosen[locale],
                  limit: c.structured.limit[locale],
                }
              : undefined,
            href: c.href[locale],
            caseTitle: c.caseTitle[locale],
          };
        });

      if (citations.length === 0) return null;

      return {
        slug: sel.slug,
        type: (sel.slug.startsWith("essay:") ? "blog" : "case") as "case" | "blog",
        caseTitle: citations[0]!.caseTitle,
        reasonLabel: REASON_CODE_LABELS[sel.reasonCode][locale],
        citations,
      };
    })
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  return NextResponse.json({
    ok: true,
    mode,
    redactedCount,
    pipeline: {
      corpusCount: EVIDENCE_CORPUS_MAP.size,
      candidateCount: candidates.length,
    },
    matches,
  });
}
