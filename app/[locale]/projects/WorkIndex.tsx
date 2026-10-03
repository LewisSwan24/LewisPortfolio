"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { EvidenceMatrix } from "@/components/hiring/EvidenceMatrix";
import {
  VizConnect,
  VizMaze,
  VizSpectra,
  VizHoop,
  VizPricewise,
  VizGapmapper,
  VizRules,
} from "@/components/viz/ProjectViz";
import {
  getEvidenceMatrix,
  getHiringConversion,
  getProjectEvidence,
  type ProofLocale,
} from "@/lib/portfolio-proof";

type ProjKey =
  | "connect"
  | "spectra"
  | "maze"
  | "hoop"
  | "pricewise"
  | "gapmapper"
  | "rules";
type FilterId = "all" | "flag" | "research" | "acc" | "ai" | "hardware";
type Localized = { en: string; zh: string };

interface Item {
  n: string;
  k: ProjKey;
  tags: string[];
  role: string;
  year: string;
  dur: string;
  problem: Localized;
  changed: Localized;
}

const FILTERS: Array<{ id: FilterId; en: string; zh: string }> = [
  { id: "all", en: "All", zh: "全部" },
  { id: "flag", en: "Flagship", zh: "旗舰" },
  { id: "research", en: "Research-led", zh: "研究驱动" },
  { id: "acc", en: "Accessibility", zh: "无障碍" },
  { id: "ai", en: "AI / ML", zh: "AI" },
  { id: "hardware", en: "Hardware", zh: "硬件" },
];

const ITEMS: Item[] = [
  {
    n: "01",
    k: "maze",
    tags: ["flag", "hardware"],
    role: "Design tech",
    year: "2026",
    dur: "Built",
    problem: {
      en: "A physical maze that noticed nothing and answered nothing",
      zh: "一台什么都察觉不到、也不会回应的实体迷宫",
    },
    changed: {
      en: "One sensor event driving score, haptics, light, audio, and a web console",
      zh: "一个传感器事件同时驱动计分、震动、灯光、音效与网页控制台",
    },
  },
  {
    n: "02",
    k: "gapmapper",
    tags: ["flag", "research"],
    role: "Prototype + turn",
    year: "2026",
    dur: "Submitted",
    problem: {
      en: "A safety interface that cannot guarantee safety, sounding certain anyway",
      zh: "一个保证不了安全的安全界面，说起话来却很笃定",
    },
    changed: {
      en: "Perception and indicators kept apart, so the gap is a reason to look rather than a verdict",
      zh: "感知与客观指标分开放，让落差变成去查一查的理由，而不是一句判决",
    },
  },
  {
    n: "03",
    k: "connect",
    tags: ["flag", "research"],
    role: "Solo",
    year: "Coursework",
    dur: "Not shipped",
    problem: { en: "Disjointed structure and hard-to-find information", zh: "结构割裂，关键信息难找" },
    changed: { en: "Clearer task flow and navigation structure", zh: "更清楚的任务流和导航结构" },
  },
  {
    n: "04",
    k: "pricewise",
    tags: ["flag", "ai"],
    role: "Product + direction",
    year: "2026",
    dur: "Prototype, demo data",
    problem: {
      en: "An AI wrote the code, and a green build proved nothing about whether it ran",
      zh: "代码是 AI 写的，构建通过却证明不了到底跑没跑",
    },
    changed: {
      en: "Four classes of defect that a green build, a clean type-check and passing tests all missed",
      zh: "构建、类型检查和测试全绿，照样漏掉四类缺陷",
    },
  },
  {
    n: "05",
    k: "hoop",
    tags: ["ai", "hardware"],
    role: "Design + art dir",
    year: "2026",
    dur: "Playable",
    problem: {
      en: "A registry of 299 asset specs, where what goes wrong shows only as a set",
      zh: "299 条资产规格的登记表，毛病要整组摆在一起才看得出来",
    },
    changed: {
      en: "An art bible and a rejected list written first, with style checked by eye",
      zh: "先写美术圣经和拒绝清单，风格靠人眼对照",
    },
  },
  {
    n: "06",
    k: "rules",
    tags: ["research", "ai"],
    role: "Interface + spec",
    year: "2025",
    dur: "Submitted",
    problem: {
      en: "Requirements everyone agreed with and nobody could build to",
      zh: "所有人都同意、却没人能照着施工的要求",
    },
    changed: {
      en: "150–250 m of warning lead, a 48 px floor, and three triggers from one paper",
      zh: "150–250 m 的提前量、48px 的下限，以及从一篇论文拆出的三条触发条件",
    },
  },
  {
    n: "07",
    k: "spectra",
    tags: ["acc"],
    role: "Solo build",
    year: "2026",
    dur: "DEMO",
    problem: { en: "Type and spacing are fixed by whoever built the page", zh: "字体和行距由建站的人决定，读的人改不了" },
    changed: { en: "A browser extension that rewrites both from one popup", zh: "一个浏览器扩展，从一个扩展弹窗就能改写两者" },
  },
];

function WorkPreview({ project, locale }: { project: ProjKey; locale: ProofLocale }) {
  if (project === "maze") return <VizMaze locale={locale} />;
  if (project === "hoop") return <VizHoop locale={locale} />;
  if (project === "pricewise") return <VizPricewise locale={locale} />;
  if (project === "gapmapper") return <VizGapmapper locale={locale} />;
  if (project === "rules") return <VizRules locale={locale} />;
  if (project === "connect") return <VizConnect locale={locale} />;
  return <VizSpectra locale={locale} />;
}

export function WorkIndex() {
  const t = useTranslations();
  const locale = useLocale();
  const isZh = locale === "zh";
  const proofLocale: ProofLocale = isZh ? "zh" : "en";
  const evidence = getProjectEvidence(proofLocale);
  const hiringConversion = getHiringConversion(proofLocale);
  const evidenceMatrix = getEvidenceMatrix(proofLocale);
  const [filter, setFilter] = useState<FilterId>("all");
  const pageCopy = isZh
    ? {
        conceptVisual: "概念视觉",
        shortlistLabel: "招聘方短名单",
        shortlistTitle: "按岗位需求选择最相关案例。",
        shortlistBody: "每条路径都指向常见 UX / 产品设计招聘信号下最强的证据。",
        interviewDecision: "招聘决策页",
      }
    : {
        conceptVisual: "Concept visual",
        shortlistLabel: "Recruiter shortlist",
        shortlistTitle: "Choose the case that matches your opening.",
        shortlistBody:
          "Each route points to the strongest proof for a common UX/Product Design hiring signal.",
        interviewDecision: "Interview decision",
      };

  const shown = filter === "all" ? ITEMS : ITEMS.filter((i) => i.tags.includes(filter));

  return (
    <main className="page" data-screen-label="02 Work">
      <section className="container idx-hero">
        <div className="label">{t("nav.work")}</div>
        <h1 className="h-display h1" style={{ marginTop: 16 }}>
          {isZh ? "精选作品" : "Selected work"}
        </h1>
      </section>

      <section className="container">
        <div
          className="idx-filters"
          role="tablist"
          aria-label={isZh ? "筛选项目" : "Filter projects"}
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={`idx-filter ${filter === f.id ? "active" : ""}`}
              onClick={() => setFilter(f.id)}
              role="tab"
              aria-selected={filter === f.id}
              type="button"
            >
              {isZh ? f.zh : f.en}
            </button>
          ))}
        </div>
      </section>

      <section className="container work-index-board" aria-labelledby="work-index-title">
        <h2 id="work-index-title" className="sr-only">
          {isZh ? "项目清单" : "Project list"}
        </h2>
        <div className="work-index-head" aria-hidden="true">
          <span>{isZh ? "项目" : "Project"}</span>
          <span>{isZh ? "角色" : "Role"}</span>
          <span>{isZh ? "问题" : "Problem"}</span>
          <span>{isZh ? "改变了什么" : "What changed"}</span>
          <span />
        </div>
        <div className="work-index-list">
          {shown.map((i) => (
            <Link className="work-index-row" href={`/projects/${i.k}`} key={i.k}>
              <div className="work-index-project">
                <div className="work-index-thumb" aria-hidden="true">
                  <WorkPreview project={i.k} locale={proofLocale} />
                  <span className="work-index-thumb-label">{pageCopy.conceptVisual}</span>
                </div>
                <div>
                  <h3>{t(`proj.${i.k}.title`)}</h3>
                  <p>{t(`proj.${i.k}.kicker`)}</p>
                </div>
              </div>
              <div className="work-index-role">
                <strong>{t(`proj.${i.k}.role`)}</strong>
                <span>{i.year} · {i.dur}</span>
              </div>
              <p className="work-index-copy">{isZh ? i.problem.zh : i.problem.en}</p>
              <p className="work-index-copy">{isZh ? i.changed.zh : i.changed.en}</p>
              <span className="work-index-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container work-shortlist-section">
        <div className="work-shortlist-head">
          <div>
            <div className="label">{pageCopy.shortlistLabel}</div>
            <h2>{pageCopy.shortlistTitle}</h2>
          </div>
          <p>{pageCopy.shortlistBody}</p>
          <Link className="work-shortlist-room-link" href="/hire">
            {pageCopy.interviewDecision}
          </Link>
        </div>
        <div className="work-shortlist-grid">
          {hiringConversion.proofRoutes.map((route) => (
            <Link className="work-shortlist-card" href={route.href} key={route.href}>
              <small>{route.audience}</small>
              <h3>{route.title}</h3>
              <p>{route.claim}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container">
        <EvidenceMatrix capabilities={evidenceMatrix} locale={proofLocale} />
      </section>

      <section className="container work-evidence-section">
        <div className="work-evidence-head">
          <div>
            <div className="label">{isZh ? "证据地图" : "Evidence map"}</div>
            <h2>
              {isZh
                ? "不用逐个点开，也能先看见每个项目证明了什么。"
                : "A scan-first map of what each project proves."}
            </h2>
          </div>
          <p>
            {isZh
              ? "我把方法、样本、结果和能力证明放在同一个表里，方便招聘方快速判断哪几个 case 值得深入看。"
              : "Methods, sample, outcomes, and proof statements sit together so hiring teams can choose the most relevant case quickly."}
          </p>
        </div>
        <div className="work-evidence-grid">
          {evidence.map((item, index) => (
            <Link className="work-evidence-card" href={item.href} key={item.slug}>
              <div className="work-evidence-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{t(`proj.${item.slug}.title`)}</strong>
              </div>
              <p className="work-evidence-problem">{item.problemType}</p>
              <dl>
                <div>
                  <dt>{isZh ? "方法" : "Methods"}</dt>
                  <dd>{item.methods.join(" / ")}</dd>
                </div>
                <div>
                  <dt>{isZh ? "样本" : "Sample"}</dt>
                  <dd>{item.sample}</dd>
                </div>
                <div>
                  <dt>{isZh ? "结果" : "Outcome"}</dt>
                  <dd>{item.outcome}</dd>
                </div>
                <div className="work-evidence-proof">
                  <dt>{isZh ? "证明什么" : "What this proves"}</dt>
                  <dd>{item.proves}</dd>
                </div>
              </dl>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
