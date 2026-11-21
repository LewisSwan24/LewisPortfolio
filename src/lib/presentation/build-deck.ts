import type {
  CaseInteractiveDemo,
  CaseMicroLoopData,
  CaseRecord,
  CaseResearchQuotes,
  CaseScrubber,
} from "@/lib/cases/schema";
import type {
  CaseDepth,
  CaseInterviewPack,
  CaseSummary,
  InterviewDecisionRoom,
  ProofLocale,
} from "@/lib/portfolio-proof";

export type PresentationSlideKind =
  | "cover"
  | "evidence"
  | "comparison"
  | "interactive"
  | "limits"
  | "case-snapshot";

export interface PresentationSlide {
  id: string;
  stepLabel: string;
  title: string;
  subtitle?: string;
  speakerNote: string;
  kind: PresentationSlideKind;
  metrics?: string[];
  meta?: Array<{ label: string; value: string }>;
  bullets?: Array<{ title: string; detail: string }>;
  image?: { src: string; alt: string; width: number; height: number };
  quotes?: CaseResearchQuotes;
  scrubber?: CaseScrubber;
  interactiveDemo?: CaseInteractiveDemo;
  microLoop?: CaseMicroLoopData;
  followUp?: { question: string; answer: string; boundary: string };
  ctaHref?: string;
  ctaLabel?: string;
}

export interface PresentationDeckData {
  id: string;
  locale: ProofLocale;
  deckTitle: string;
  deckSubtitle: string;
  slides: PresentationSlide[];
}

export function buildCaseDeck(input: {
  record: CaseRecord;
  summary: CaseSummary;
  depth: CaseDepth;
  interviewPack: CaseInterviewPack;
  locale: ProofLocale;
}): PresentationDeckData {
  const { record, summary, depth, interviewPack, locale } = input;
  const isZh = locale === "zh";
  const card = record.card[locale];
  const narrative = record.narrative[locale];
  const firstImg = record.media?.images[0];
  const primaryImage = firstImg
    ? {
        src: firstImg.src,
        alt: isZh ? firstImg.altZh : firstImg.alt,
        width: firstImg.width,
        height: firstImg.height,
      }
    : record.processArtifacts?.scrubber
      ? {
          src: record.processArtifacts.scrubber.afterImage.src,
          alt: record.processArtifacts.scrubber.afterImage.alt[locale],
          width: record.processArtifacts.scrubber.afterImage.width,
          height: record.processArtifacts.scrubber.afterImage.height,
        }
      : undefined;

  const slides: PresentationSlide[] = [
    {
      id: `${record.slug}-cover`,
      stepLabel: isZh ? "01 封面与问题" : "01 Cover & Problem",
      title: card.title,
      subtitle: narrative.hero.sub || card.sub,
      kind: "cover",
      metrics: [card.m1, card.m2, card.m3].filter(Boolean),
      meta: [
        { label: isZh ? "角色" : "Role", value: narrative.roleVal },
        { label: isZh ? "周期" : "Timeline", value: narrative.timeVal },
        { label: isZh ? "团队" : "Team", value: narrative.teamVal },
        { label: isZh ? "工具栈" : "Tools", value: narrative.toolsVal },
      ],
      speakerNote: `${summary.challenge} ${summary.role}`,
    },
    {
      id: `${record.slug}-artifact`,
      stepLabel: isZh ? "02 核心产物" : "02 Core Artifact",
      title: isZh ? "系统结构与可交付产物" : "Shipped Architecture & Core Artifact",
      subtitle: summary.outcome,
      kind: "evidence",
      image: primaryImage,
      bullets: summary.evidence.slice(0, 3).map((item, idx) => ({
        title: isZh ? `实证 ${idx + 1}` : `Evidence 0${idx + 1}`,
        detail: item,
      })),
      speakerNote: summary.evidence[0] ?? summary.outcome,
    },
    {
      id: `${record.slug}-research`,
      stepLabel: isZh ? "03 调研原声" : "03 Research & Friction",
      title: isZh ? "调研卡点与用户反馈" : "Participant Friction & Evidence",
      subtitle: narrative.re.label,
      kind: "evidence",
      quotes: record.processArtifacts?.quotes,
      bullets: depth.evidence.slice(0, 3).map((ev) => ({
        title: `${ev.method} · ${ev.sample}`,
        detail: `${ev.finding} -> ${ev.implication}`,
      })),
      speakerNote:
        record.processArtifacts?.quotes?.items[0]?.decision[locale] ??
        depth.evidence[0]?.implication ??
        summary.challenge,
    },
    {
      id: `${record.slug}-comparison`,
      stepLabel: isZh ? "04 迭代对比" : "04 Iteration & Trade-offs",
      title:
        record.processArtifacts?.scrubber?.title[locale] ??
        (isZh ? "关键结构重构与方案取舍" : "Key Structural Iterations & Trade-offs"),
      subtitle:
        record.processArtifacts?.scrubber?.summary[locale] ?? narrative.id.label,
      kind: "comparison",
      scrubber: record.processArtifacts?.scrubber,
      bullets: depth.decisions.slice(0, 2).map((d) => ({
        title: d.label,
        detail: `${d.choice} — ${d.tradeoff}`,
      })),
      speakerNote: depth.decisions[0]
        ? `${depth.decisions[0].choice} (${depth.decisions[0].tradeoff})`
        : summary.outcome,
    },
    {
      id: `${record.slug}-prototype`,
      stepLabel: isZh ? "05 活原型演练" : "05 Live Prototype",
      title:
        record.interactiveDemo?.title[locale] ??
        record.processArtifacts?.microLoop?.title[locale] ??
        (isZh ? "核心交互状态流" : "Interactive System Flow"),
      subtitle:
        record.interactiveDemo?.prompt[locale] ??
        record.processArtifacts?.microLoop?.summary[locale] ??
        summary.methods.join(" · "),
      kind: "interactive",
      interactiveDemo: record.interactiveDemo,
      microLoop: record.processArtifacts?.microLoop,
      bullets: summary.methods.slice(0, 3).map((m, idx) => ({
        title: isZh ? `方法 ${idx + 1}` : `Method 0${idx + 1}`,
        detail: m,
      })),
      speakerNote:
        interviewPack.answers[0]?.answer ??
        record.interactiveDemo?.takeaway[locale] ??
        summary.outcome,
    },
    {
      id: `${record.slug}-limits`,
      stepLabel: isZh ? "06 边界与反思" : "06 Limits & Reflection",
      title: isZh ? "实证边界、取舍与下一步" : "Honest Limits, Follow-Up & Next Step",
      subtitle: depth.takeaway,
      kind: "limits",
      bullets: depth.limits.slice(0, 3).map((l) => ({
        title: l.constraint,
        detail: `${l.whyItMatters} (${l.nextValidation})`,
      })),
      followUp: {
        question: interviewPack.managerFollowUp.question,
        answer: interviewPack.managerFollowUp.answer,
        boundary: interviewPack.managerFollowUp.boundary,
      },
      ctaHref: `/projects/${record.slug}`,
      ctaLabel: isZh ? "回到完整案例阅读" : "Return to full case",
      speakerNote: interviewPack.managerFollowUp.answer,
    },
  ];

  return {
    id: `case-${record.slug}`,
    locale,
    deckTitle: card.title,
    deckSubtitle: card.kicker,
    slides,
  };
}

export function buildHiringDeck(input: {
  room: InterviewDecisionRoom;
  cases: readonly CaseRecord[];
  locale: ProofLocale;
  customIntro?: string;
  deckTitle?: string;
}): PresentationDeckData {
  const { room, cases, locale, customIntro, deckTitle } = input;
  const isZh = locale === "zh";

  const introSlide: PresentationSlide = {
    id: "hiring-thesis",
    stepLabel: isZh ? "01 岗位适配与命题" : "01 Role Thesis",
    title: deckTitle ?? room.brief.headline,
    subtitle: customIntro ?? room.brief.subhead,
    kind: "cover",
    meta: room.brief.signals.map((sig) => ({
      label: sig.label,
      value: `${sig.value} — ${sig.detail}`,
    })),
    speakerNote: room.brief.status,
  };

  const caseSlides: PresentationSlide[] = cases.slice(0, 4).map((record, idx) => {
    const card = record.card[locale];
    const narrative = record.narrative[locale];
    return {
      id: `hiring-case-${record.slug}`,
      stepLabel: isZh ? `0${idx + 2} 案例 · ${card.title}` : `0${idx + 2} ${card.title}`,
      title: card.title,
      subtitle: card.sub,
      kind: "case-snapshot",
      metrics: [card.m1, card.m2, card.m3].filter(Boolean),
      bullets: [
        { title: isZh ? "核心角色" : "Role", detail: narrative.roleVal },
        { title: isZh ? "结构要点" : "Focus", detail: narrative.hero.sub },
      ],
      interactiveDemo: record.interactiveDemo,
      ctaHref: `/projects/${record.slug}`,
      ctaLabel: isZh ? "打开完整案例" : "Open full case",
      speakerNote: `${card.title}: ${card.sub}`,
    };
  });

  const closingIdx = caseSlides.length + 2;
  const closingSlide: PresentationSlide = {
    id: "hiring-boundaries",
    stepLabel: isZh ? `0${closingIdx} 边界与下一步` : `0${closingIdx} Limits & Next`,
    title: isZh ? "诚实边界与合作方式" : "Honest Scope Boundaries & Next Step",
    subtitle: isZh
      ? "所有指标均附样本口径；欢迎在通话中现场拆解任意交互原型。"
      : "Every claim stays tied to sample bounds; happy to walk through any live prototype in a call.",
    kind: "limits",
    bullets: room.boundaries.slice(0, 3).map((note) => ({
      title: note.claim,
      detail: `${note.boundary} (${note.validation})`,
    })),
    ctaHref: "/contact",
    ctaLabel: isZh ? "预约沟通 / 写信给我" : "Schedule / Send a note",
    speakerNote: room.boundaries[0]?.boundary ?? room.brief.status,
  };

  return {
    id: "hiring-overview",
    locale,
    deckTitle: deckTitle ?? room.brief.headline,
    deckSubtitle: room.brief.eyebrow,
    slides: [introSlide, ...caseSlides, closingSlide],
  };
}
