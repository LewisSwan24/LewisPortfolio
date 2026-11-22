import { EVIDENCE_CORPUS_ITEMS, type EvidenceChunk } from "./evidence-corpus";

const SYNONYMS: Record<string, string[]> = {
  voice: ["speech", "audio", "spoken", "语音"],
  button: ["physical", "key", "wrist", "watch", "实体", "按键"],
  refusal: ["refuse", "blank", "guess", "not now", "拒答", "留白", "先不要"],
  safety: ["privacy", "trust", "consent", "边界", "隐私", "信任"],
  social: ["crowd", "gig", "stranger", "concert", "社交", "搭话"],
  strategy: ["rts", "mission", "command", "checkpoint", "策略", "语法", "关卡"],
  hardware: ["arduino", "firmware", "sensor", "servo", "relay", "usb", "ble", "硬件", "固件", "串口"],
  architecture: ["ssg", "rsc", "csp", "bundle", "performance", "hydration", "静态", "架构", "性能", "安全"],
  accessibility: ["a11y", "wcag", "aaa", "dialog", "keyboard", "focus", "contrast", "无障碍", "键盘", "对比"],
  research: ["limit", "boundary", "study", "sample", "empirical", "observation", "样本", "实测", "研究"],
  writing: ["essay", "blog", "article", "文章", "专栏"],
};

const STOP_WORDS = new Set([
  "the", "and", "for", "with", "that", "this", "from", "are", "was", "were",
  "why", "how", "what", "when", "does", "not", "instead", "into", "about",
]);

export function tokenizeBilingual(input: string): string[] {
  const tokens: string[] = [];
  const lower = input.toLowerCase();

  const latinMatches = lower.match(/[a-z0-9]+/g) ?? [];
  for (const w of latinMatches) {
    if (w.length < 2 || STOP_WORDS.has(w)) continue;
    tokens.push(w);
    const syns = SYNONYMS[w];
    if (syns) tokens.push(...syns);
  }

  const cjkRuns = input.match(/[\u4e00-\u9fff]+/g) ?? [];
  for (const run of cjkRuns) {
    const chars = Array.from(run);
    for (let i = 0; i < chars.length; i++) {
      tokens.push(chars[i]!);
      if (i + 1 < chars.length) {
        const bg = chars[i]! + chars[i + 1]!;
        tokens.push(bg);
        for (const [k, syns] of Object.entries(SYNONYMS)) {
          if (syns.includes(bg)) tokens.push(k, ...syns);
        }
      }
    }
  }

  return tokens;
}

const CORPUS_TOKENS = EVIDENCE_CORPUS_ITEMS.map((chunk) => ({
  chunk,
  enTokens: tokenizeBilingual(`${chunk.caseTitle.en} ${chunk.title.en} ${chunk.text.en}`),
  zhTokens: tokenizeBilingual(`${chunk.caseTitle.zh} ${chunk.title.zh} ${chunk.text.zh}`),
  titleEnTokens: new Set(tokenizeBilingual(`${chunk.caseTitle.en} ${chunk.title.en}`)),
  titleZhTokens: new Set(tokenizeBilingual(`${chunk.caseTitle.zh} ${chunk.title.zh}`)),
}));

const AVG_LEN =
  CORPUS_TOKENS.reduce((acc, row) => acc + row.enTokens.length + row.zhTokens.length, 0) /
  Math.max(1, CORPUS_TOKENS.length);

export interface ScoredEvidence extends EvidenceChunk {
  score: number;
  matchedTerms: string[];
}

export function rankEvidenceBm25(
  query: string,
  locale: "en" | "zh",
  topK = 8
): ScoredEvidence[] {
  const qTokens = Array.from(new Set(tokenizeBilingual(query)));
  if (qTokens.length === 0) return [];

  const N = CORPUS_TOKENS.length;
  const k1 = 1.4;
  const b = 0.75;

  const df = new Map<string, number>();
  for (const q of qTokens) {
    let count = 0;
    for (const row of CORPUS_TOKENS) {
      const bag = locale === "zh" ? row.zhTokens : row.enTokens;
      if (bag.includes(q)) count += 1;
    }
    df.set(q, count);
  }

  const scored: ScoredEvidence[] = [];
  for (const row of CORPUS_TOKENS) {
    const docTokens = locale === "zh" ? row.zhTokens : row.enTokens;
    const titleSet = locale === "zh" ? row.titleZhTokens : row.titleEnTokens;
    const dl = docTokens.length || 1;
    const tfMap = new Map<string, number>();
    for (const tok of docTokens) {
      tfMap.set(tok, (tfMap.get(tok) ?? 0) + 1);
    }

    let bm25 = 0;
    let titleMatches = 0;
    const hitTerms: string[] = [];

    for (const q of qTokens) {
      const tf = tfMap.get(q) ?? 0;
      if (tf === 0) continue;
      const dfVal = df.get(q) ?? 0;
      const idf = Math.log(1 + (N - dfVal + 0.5) / (dfVal + 0.5));
      bm25 += idf * ((tf * (k1 + 1)) / (tf + k1 * (1 - b + b * (dl / AVG_LEN))));
      if (titleSet.has(q)) titleMatches += 1;
      if (q.length >= 2 && hitTerms.length < 6) hitTerms.push(q);
    }

    if (bm25 > 0) {
      const titleMultiplier = titleMatches > 0 ? 1 + Math.min(titleMatches, 3) * 0.25 : 1;
      scored.push({
        ...row.chunk,
        score: Number((bm25 * row.chunk.weight * titleMultiplier).toFixed(2)),
        matchedTerms: hitTerms,
      });
    }
  }

  return scored.sort((a, bScore) => bScore.score - a.score).slice(0, topK);
}
