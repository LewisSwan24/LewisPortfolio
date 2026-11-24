import semanticIndexJson from "@/data/ai/semantic-index.generated.json";
import { EVIDENCE_CORPUS_ITEMS, type EvidenceChunk } from "./evidence-corpus";
import { rankEvidenceBm25, tokenizeBilingual } from "./bm25";
import {
  buildQuantizedVector,
  quantizedCosineSimilarity,
} from "./vector-math-core.mjs";

interface SemanticIndexPayload {
  version: string;
  dim: number;
  count: number;
  entries: Record<string, { en: number[]; zh: number[] }>;
}

const SEMANTIC_INDEX = semanticIndexJson as SemanticIndexPayload;

const FALLBACK_VECTORS = new Map<string, { en: number[]; zh: number[] }>();

function getDocVector(chunk: EvidenceChunk, locale: "en" | "zh"): number[] {
  const precomputed = SEMANTIC_INDEX.entries[chunk.id];
  if (precomputed) return precomputed[locale];

  let cached = FALLBACK_VECTORS.get(chunk.id);
  if (!cached) {
    cached = {
      en: buildQuantizedVector(`${chunk.caseTitle.en} ${chunk.title.en} ${chunk.text.en}`),
      zh: buildQuantizedVector(`${chunk.caseTitle.zh} ${chunk.title.zh} ${chunk.text.zh}`),
    };
    FALLBACK_VECTORS.set(chunk.id, cached);
  }
  return cached[locale];
}

export interface HybridScoredEvidence extends EvidenceChunk {
  score: number;
  bm25Score: number;
  vectorScore: number;
  hybridScore: number;
  matchedTerms: string[];
}

export function hybridRetrieve(
  query: string,
  locale: "en" | "zh",
  topK = 8
): HybridScoredEvidence[] {
  const cleanQuery = query.trim();
  if (cleanQuery.length < 2) return [];

  const qVec = buildQuantizedVector(cleanQuery);
  const bm25Hits = rankEvidenceBm25(cleanQuery, locale, Math.max(24, topK * 3));
  const bm25ById = new Map(bm25Hits.map((h) => [h.id, h]));
  const maxBm25 = bm25Hits[0]?.score ?? 0;

  // Include high-similarity semantic candidates even if exact BM25 tokens missed
  const queryTerms = Array.from(new Set(tokenizeBilingual(cleanQuery))).filter((t) => t.length >= 2);
  const results: HybridScoredEvidence[] = [];

  for (const chunk of EVIDENCE_CORPUS_ITEMS) {
    const bm25Entry = bm25ById.get(chunk.id);
    const bm25Raw = bm25Entry?.score ?? 0;
    const rawCosine = quantizedCosineSimilarity(qVec, getDocVector(chunk, locale));
    const vectorClamped = Math.max(0, Math.min(1, rawCosine));

    // Guard against ungrounded noise: require either a BM25 match or strong semantic overlap
    if (bm25Raw === 0 && vectorClamped < 0.34) continue;

    const bm25Norm = maxBm25 > 0 ? bm25Raw / maxBm25 : 0;
    const pillarBoost = Math.min(1.15, 0.85 + chunk.weight * 0.1);
    const hybrid = Number(
      ((bm25Norm * 0.68 + vectorClamped * 0.32) * pillarBoost * 10).toFixed(2)
    );

    results.push({
      ...chunk,
      score: bm25Raw > 0 ? bm25Raw : Number((vectorClamped * chunk.weight).toFixed(2)),
      bm25Score: Number(bm25Raw.toFixed(2)),
      vectorScore: Number(vectorClamped.toFixed(3)),
      hybridScore: hybrid,
      matchedTerms:
        bm25Entry?.matchedTerms && bm25Entry.matchedTerms.length > 0
          ? bm25Entry.matchedTerms
          : queryTerms.slice(0, 4),
    });
  }

  return results
    .sort((a, b) => b.hybridScore - a.hybridScore || b.bm25Score - a.bm25Score)
    .slice(0, topK);
}

export function getSemanticIndexStats() {
  return {
    version: SEMANTIC_INDEX.version,
    dim: SEMANTIC_INDEX.dim,
    indexedCount: SEMANTIC_INDEX.count,
  };
}
