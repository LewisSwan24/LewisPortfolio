import { z } from "zod";
import { EVIDENCE_CORPUS_MAP } from "@/lib/ai/evidence-corpus";
import { hybridRetrieve } from "@/lib/ai/hybrid-retrieval";
import { redactPii, MAX_JD_QUERY_CHARS } from "@/lib/ai/redact-jd";
import { getCaseRedTeamDeck } from "@/data/critique/red-team";
import { checkScopedRateLimit, extractClientIp } from "@/lib/server/rate-limit";

const CritiqueRequestSchema = z.object({
  query: z.string().trim().min(3).max(MAX_JD_QUERY_CHARS * 2),
  locale: z.enum(["en", "zh"]).optional().default("en"),
  caseSlug: z.string().optional(),
});

function formatSseEvent(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export async function POST(req: Request) {
  const ip = extractClientIp(req.headers);
  const limit = await checkScopedRateLimit("ai", ip, 20, 3600);
  if (!limit.allowed) {
    return new Response(
      JSON.stringify({ ok: false, error: "Rate limit exceeded (20 requests/hour)." }),
      { status: 429, headers: { "content-type": "application/json" } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: "Invalid JSON payload." }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  const parsed = CritiqueRequestSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ ok: false, error: "Query must be at least 3 characters." }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  const locale = parsed.data.locale;
  const { sanitized, redactedCount } = redactPii(parsed.data.query);
  const hits = hybridRetrieve(sanitized, locale, 6);

  const primarySlug =
    (parsed.data.caseSlug && getCaseRedTeamDeck(parsed.data.caseSlug)?.slug) ||
    hits.find((h) => h.type === "case")?.slug ||
    "walkie";
  const deck = getCaseRedTeamDeck(primarySlug);

  const hasExternalKey = Boolean(
    process.env.OPENAI_API_KEY?.trim() || process.env.GEMINI_API_KEY?.trim()
  );

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      controller.enqueue(
        encoder.encode(
          formatSseEvent("meta", {
            ok: true,
            mode: hasExternalKey ? "hybrid-sse-grounded" : "offline-snapshot-sse",
            locale,
            redactedCount,
            corpusCount: EVIDENCE_CORPUS_MAP.size,
            candidateCount: hits.length,
            primarySlug,
          })
        )
      );

      for (const hit of hits.slice(0, 4)) {
        controller.enqueue(
          encoder.encode(
            formatSseEvent("evidence", {
              id: hit.id,
              slug: hit.slug,
              pillar: hit.pillar,
              title: hit.title[locale],
              text: hit.text[locale],
              bm25Score: hit.bm25Score,
              vectorScore: hit.vectorScore,
              hybridScore: hit.hybridScore,
              href: hit.href[locale],
            })
          )
        );
      }

      if (deck) {
        controller.enqueue(
          encoder.encode(
            formatSseEvent("redteam", {
              slug: deck.slug,
              caseTitle: deck.caseTitle[locale],
              executiveThesis: deck.executiveThesis[locale],
              lenses: deck.lenses.map((item) => ({
                lens: item.lens,
                severity: item.severity,
                challengeQuestion: item.challengeQuestion[locale],
                empiricalDefense: item.empiricalDefense[locale],
                codeOrTestReceipt: item.codeOrTestReceipt[locale],
                unresolvedHypothesis: item.unresolvedHypothesis[locale],
                verifiedStatus: item.verifiedStatus,
                evidenceHref: item.evidenceHref,
              })),
            })
          )
        );
      }

      controller.enqueue(
        encoder.encode(
          formatSseEvent("done", {
            ok: true,
            groundedCount: hits.length,
          })
        )
      );
      controller.close();
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      connection: "keep-alive",
    },
  });
}
