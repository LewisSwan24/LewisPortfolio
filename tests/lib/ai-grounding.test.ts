import { describe, expect, it, beforeEach, vi, afterEach } from "vitest";
import { EVIDENCE_CORPUS_ITEMS, EVIDENCE_CORPUS_MAP } from "@/lib/ai/evidence-corpus";
import { redactPii } from "@/lib/ai/redact-jd";
import { rankEvidenceBm25 } from "@/lib/ai/bm25";
import { optionalLlmRerank } from "@/lib/ai/llm-adapter";
import { POST as matchPost } from "../../app/api/ai/match/route";
import { resetMemoryRateLimiterForTests } from "@/lib/server/rate-limit";
import { UNLISTED_PROJECT_SLUGS } from "@/lib/project-routes";

describe("Grounded Design-Defense Rationale Matching", () => {
  beforeEach(() => {
    resetMemoryRateLimiterForTests();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("corpus includes all 6 listed cases with design-rationale chunks and zero unlisted leaks", () => {
    const slugs = new Set(EVIDENCE_CORPUS_ITEMS.map((item) => item.slug));
    for (const listed of ["walkie", "lamplight", "autofill", "maze", "onthebeat", "grassland"]) {
      expect(slugs.has(listed)).toBe(true);
    }
    for (const unlisted of UNLISTED_PROJECT_SLUGS) {
      expect(slugs.has(unlisted)).toBe(false);
    }
    const rationaleChunks = EVIDENCE_CORPUS_ITEMS.filter((c) => c.pillar === "design-rationale");
    expect(rationaleChunks.length).toBeGreaterThanOrEqual(12);
    expect(EVIDENCE_CORPUS_MAP.size).toBe(EVIDENCE_CORPUS_ITEMS.length);
  });

  it("redactPii strips email, phone, internal URLs and caps at 1200 characters", () => {
    const noisy =
      "Contact jane.doe@corp.example or +61 412 345 678 via https://intranet.corp.internal/jd?id=9 " +
      "A".repeat(1400);
    const result = redactPii(noisy);

    expect(result.sanitized).not.toContain("jane.doe@corp.example");
    expect(result.sanitized).not.toContain("412 345 678");
    expect(result.sanitized).not.toContain("https://intranet.corp.internal");
    expect(result.sanitized.length).toBeLessThanOrEqual(1200);
    expect(result.redactedCount).toBeGreaterThanOrEqual(3);
    expect(result.truncated).toBe(true);
  });

  it("BM25 prioritizes design-rationale tradeoffs in both EN and ZH", () => {
    const enHits = rankEvidenceBm25("Why physical watch buttons instead of voice approval?", "en");
    expect(enHits[0]?.slug).toBe("walkie");
    expect(enHits[0]?.pillar).toBe("design-rationale");

    const zhHits = rankEvidenceBm25("为什么在AI填表遇到签证问题时宁可留白也不猜测", "zh");
    expect(zhHits[0]?.slug).toBe("autofill");
    expect(zhHits[0]?.pillar).toBe("design-rationale");
  });

  it("/api/ai/match returns grounded citations offline without API keys and enforces rate limit", async () => {
    const makeReq = (body: unknown, ip = "203.0.113.10") =>
      new Request("http://localhost/api/ai/match", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": ip },
        body: JSON.stringify(body),
      });

    const badRes = await matchPost(makeReq({ query: "hi", locale: "en" }));
    expect(badRes.status).toBe(400);

    const okRes = await matchPost(
      makeReq({
        query: "Looking for Design Engineer experienced in AI safety refusal boundaries and modal default not now",
        locale: "en",
      })
    );
    expect(okRes.status).toBe(200);
    const data = (await okRes.json()) as {
      ok: boolean;
      mode: string;
      matches: Array<{ slug: string; citations: Array<{ id: string; href: string; text: string }> }>;
    };
    expect(data.ok).toBe(true);
    expect(data.matches.length).toBeGreaterThanOrEqual(1);
    for (const match of data.matches) {
      expect(UNLISTED_PROJECT_SLUGS).not.toContain(match.slug);
      for (const cit of match.citations) {
        expect(EVIDENCE_CORPUS_MAP.has(cit.id)).toBe(true);
      }
    }

    // 20 requests/hr cap -> 21st request returns 429
    for (let i = 0; i < 19; i++) {
      const r = await matchPost(makeReq({ query: "walkie physical confirmation rules", locale: "en" }, "203.0.113.99"));
      expect(r.status).toBe(200);
    }
    const r20 = await matchPost(makeReq({ query: "walkie physical confirmation rules", locale: "en" }, "203.0.113.99"));
    expect(r20.status).toBe(200);
    const r21 = await matchPost(makeReq({ query: "walkie physical confirmation rules", locale: "en" }, "203.0.113.99"));
    expect(r21.status).toBe(429);
  });

  it("drops hallucinated LLM evidence IDs not found in static EVIDENCE_CORPUS_MAP", async () => {
    vi.stubEnv("OPENAI_API_KEY", "sk-test-fake");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({
          choices: [
            {
              message: {
                content: JSON.stringify({
                  selections: [
                    {
                      slug: "vigil",
                      evidenceIds: ["vigil:fake:1"],
                      reasonCode: "safety-boundary",
                    },
                    {
                      slug: "walkie",
                      evidenceIds: [
                        "walkie:decision:physical-key-over-voice-approval",
                        "walkie:hallucinated:999",
                      ],
                      reasonCode: "design-rationale-match",
                    },
                  ],
                }),
              },
            },
          ],
        }),
      }))
    );

    const candidates = rankEvidenceBm25("Why physical buttons on Walkie?", "en");
    const result = await optionalLlmRerank({
      query: "Why do we need physical buttons on Walkie instead of hands-free speech approval?",
      candidates,
    });

    expect(result.mode).toBe("openai");
    expect(result.selection.selections).toHaveLength(1);
    expect(result.selection.selections[0]!.slug).toBe("walkie");
    expect(result.selection.selections[0]!.evidenceIds).toEqual([
      "walkie:decision:physical-key-over-voice-approval",
    ]);
  });
});
