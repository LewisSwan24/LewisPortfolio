export type EditorialLocale = "en" | "zh";

export interface EditorialVoiceSpec {
  readonly register: string;
  readonly cadence: string;
  readonly structureFormula: readonly string[];
  readonly forbiddenPatterns: readonly string[];
}

export const EDITORIAL_VOICE_GUIDE: Record<EditorialLocale, EditorialVoiceSpec> = {
  en: {
    register: "Silicon Valley / ANZ Senior Design Engineer",
    cadence:
      "Concise active verbs, concrete systems nouns, and earned empirical claims. Avoid inflated adjectives and literal Chinese-to-English calques.",
    structureFormula: [
      "Friction first (what breaks for a real human or operator)",
      "Boundary or mechanism (the concrete rule, hardware key, or state gate)",
      "Verification limit (what ran on real hardware vs synthetic checks)",
    ],
    forbiddenPatterns: [
      "realize the function of",
      "carry out a research / carry out research",
      "in order to solve the problem of",
      "play an important role in",
      "with the rapid development of",
    ],
  },
  zh: {
    register: "大中华区 / 亚太一线研发与产品设计团队自然中文",
    cadence:
      "采用「用户痛点 → 交互机制 → 工程闭环 → 系统/业务价值」直叙句式，多用短句与动宾结构，杜绝欧化被动语态与长定语翻译腔。",
    structureFormula: [
      "用户痛点：一语点明真实卡点、误触代价或信任断裂",
      "交互机制：给出物理按键、阈值分层或状态门禁的具体做法",
      "工程闭环：说明单测、协议帧、固件或无障碍门禁如何兜底",
      "系统边界：诚实交代已测上限与尚待外部受试验证的空白",
    ],
    forbiddenPatterns: [
      "当……被……时（欧化被动状语从句）",
      "被……所……（冗余被动结构）",
      "进行一次 / 进行一个（空心动词名词化）",
      "一个为……而设计的（长前置定语从句）",
      "基于此背景下的 / 通过利用（翻译腔连接词）",
    ],
  },
};

export interface TranslationeseViolation {
  ruleId: string;
  locale: EditorialLocale;
  match: string;
  suggestion: string;
}

interface LintRule {
  id: string;
  pattern: RegExp;
  suggestion: string;
}

const ZH_TRANSLATIONESE_RULES: readonly LintRule[] = [
  {
    id: "zh-passive-when-triggered",
    pattern: /当[^，。；\n]{1,18}被[^，。；\n]{1,14}时/g,
    suggestion: "改为无主/主动短句，例如「点击……后」「触发……时」",
  },
  {
    id: "zh-bei-suo-passive",
    pattern: /被[\u4e00-\u9fa5A-Za-z0-9]{1,10}所[\u4e00-\u9fa5]{1,6}/g,
    suggestion: "去掉冗余「被……所」，改为主动语态或「让/令……」",
  },
  {
    id: "zh-hollow-jinxing",
    pattern: /进行(?:一次|一个|一项|了?深入的?)(?:[\u4e00-\u9fa5]{2,8})/g,
    suggestion: "用具体动词替代「进行一次/一个……」，如「重构」「实测」「排查」",
  },
  {
    id: "zh-relative-clause-yige-wei",
    pattern: /一个为[\u4e00-\u9fa5A-Za-z0-9]{1,16}而设计的/g,
    suggestion: "拆为短定语或后置分句，例如「专为……打造的」「用于解决……」",
  },
  {
    id: "zh-tongguo-liyong",
    pattern: /通过利用|基于此背景下的|当谈及/g,
    suggestion: "直接切入动词或主语，例如「借助……」「针对这一场景」",
  },
  {
    id: "zh-make-it-become",
    pattern: /使其成为一个/g,
    suggestion: "简写为「让它成为」「化作」或直接用动词收束",
  },
];

const EN_CALQUE_RULES: readonly LintRule[] = [
  {
    id: "en-realize-function",
    pattern: /\brealize\s+the\s+function(?:s)?\s+of\b/gi,
    suggestion: "Replace with active engineering verbs like 'implements', 'enforces', or 'ships'",
  },
  {
    id: "en-carry-out-research",
    pattern: /\bcarry\s+out\s+(?:a\s+)?(?:research|study|analysis|investigation)\b/gi,
    suggestion: "Use 'ran', 'conducted', 'audited', or 'tested' instead of 'carry out research'",
  },
  {
    id: "en-with-rapid-development",
    pattern: /\bwith\s+the\s+rapid\s+development\s+of\b/gi,
    suggestion: "Start directly with the concrete engineering constraint or user tension",
  },
  {
    id: "en-play-important-role",
    pattern: /\bplay(?:s|ed)?\s+an?\s+(?:important|vital|crucial)\s+role\s+in\b/gi,
    suggestion: "State the concrete causal mechanism instead of 'plays an important role'",
  },
  {
    id: "en-in-order-to-solve",
    pattern: /\bin\s+order\s+to\s+solve\s+the\s+problem\s+of\b/gi,
    suggestion: "Use 'to prevent', 'to eliminate', or 'so operators never'",
  },
];

export function auditTranslationese(
  text: string,
  locale: EditorialLocale
): TranslationeseViolation[] {
  const rules = locale === "zh" ? ZH_TRANSLATIONESE_RULES : EN_CALQUE_RULES;
  const violations: TranslationeseViolation[] = [];

  for (const rule of rules) {
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
    let m: RegExpExecArray | null;
    while ((m = regex.exec(text)) !== null) {
      violations.push({
        ruleId: rule.id,
        locale,
        match: m[0],
        suggestion: rule.suggestion,
      });
    }
  }

  return violations;
}

