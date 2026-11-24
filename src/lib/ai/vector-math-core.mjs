/**
 * Shared 64-dimensional signed random-projection semantic vector kernel.
 * Single source of truth used by both build-time `scripts/build-semantic-index.mjs`
 * and runtime `src/lib/ai/hybrid-retrieval.ts`.
 */

export const SEMANTIC_DIM = 64;

const CONCEPT_GROUPS = [
  ["voice", "speech", "audio", "spoken", "tts", "stt", "语音", "口述", "朗读"],
  ["button", "physical", "key", "wrist", "watch", "tactile", "实体", "按键", "手腕", "拇指"],
  ["refusal", "refuse", "blank", "guess", "not now", "reject", "拒答", "留白", "先不要", "拦截"],
  ["safety", "privacy", "trust", "consent", "aes", "gcm", "加密", "隐私", "信任", "同意", "隔离"],
  ["social", "crowd", "gig", "stranger", "concert", "ble", "rssi", "社交", "演出", "人群", "陌生人"],
  ["strategy", "rts", "mission", "command", "checkpoint", "grammar", "策略", "关卡", "语法", "检查点"],
  ["hardware", "arduino", "firmware", "sensor", "servo", "relay", "usb", "ota", "硬件", "固件", "串口", "防抖"],
  ["architecture", "ssg", "rsc", "csp", "bundle", "performance", "静态", "架构", "性能", "预算"],
  ["accessibility", "wcag", "keyboard", "focus", "contrast", "target", "无障碍", "键盘", "焦点", "对比度"],
  ["research", "study", "observation", "moderator", "vault", "limit", "实测", "观察", "研究", "边界"],
];

function fnv1a32(str) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function extractSemanticFeatures(raw) {
  const features = [];
  const lower = String(raw || "").toLowerCase();

  // Latin words + character trigrams
  const words = lower.match(/[a-z0-9]{2,}/g) ?? [];
  for (const w of words) {
    features.push({ token: `w:${w}`, weight: 1.6 });
    if (w.length >= 4) {
      for (let i = 0; i <= w.length - 3; i += 1) {
        features.push({ token: `g3:${w.slice(i, i + 3)}`, weight: 0.45 });
      }
    }
    for (let g = 0; g < CONCEPT_GROUPS.length; g += 1) {
      if (CONCEPT_GROUPS[g].includes(w)) {
        features.push({ token: `c:${g}`, weight: 2.2 });
      }
    }
  }

  // CJK unigrams + bigrams + cross-lingual concept bridges
  const cjkRuns = lower.match(/[\u4e00-\u9fff]+/g) ?? [];
  for (const run of cjkRuns) {
    const chars = Array.from(run);
    for (let i = 0; i < chars.length; i += 1) {
      features.push({ token: `z1:${chars[i]}`, weight: 0.65 });
      if (i + 1 < chars.length) {
        const bg = chars[i] + chars[i + 1];
        features.push({ token: `z2:${bg}`, weight: 1.5 });
        for (let g = 0; g < CONCEPT_GROUPS.length; g += 1) {
          if (CONCEPT_GROUPS[g].includes(bg)) {
            features.push({ token: `c:${g}`, weight: 2.2 });
          }
        }
      }
    }
  }

  return features;
}

/**
 * Projects bilingual text into a normalized 64-dim int8 vector in [-127, 127].
 */
export function buildQuantizedVector(raw) {
  const vec = new Float64Array(SEMANTIC_DIM);
  const features = extractSemanticFeatures(raw);

  for (const { token, weight } of features) {
    const h1 = fnv1a32(token);
    const h2 = fnv1a32(`${token}#alt`);
    const idx1 = h1 % SEMANTIC_DIM;
    const idx2 = h2 % SEMANTIC_DIM;
    const sign1 = (h1 & 0x80000000) === 0 ? 1 : -1;
    const sign2 = (h2 & 0x80000000) === 0 ? 1 : -1;
    vec[idx1] += sign1 * weight;
    vec[idx2] += sign2 * weight * 0.7;
  }

  let normSq = 0;
  for (let i = 0; i < SEMANTIC_DIM; i += 1) {
    normSq += vec[i] * vec[i];
  }
  if (normSq === 0) {
    return new Array(SEMANTIC_DIM).fill(0);
  }
  const norm = Math.sqrt(normSq);
  const out = new Array(SEMANTIC_DIM);
  for (let i = 0; i < SEMANTIC_DIM; i += 1) {
    out[i] = Math.max(-127, Math.min(127, Math.round((vec[i] / norm) * 127)));
  }
  return out;
}

export function quantizedCosineSimilarity(a, b) {
  if (!a || !b || a.length !== b.length) return 0;
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i += 1) {
    const va = a[i];
    const vb = b[i];
    dot += va * vb;
    na += va * va;
    nb += vb * vb;
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}
