"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { EvidenceMatrix } from "@/components/hiring/EvidenceMatrix";
import {
  VizConnect,
  VizMaze,
  VizHoop,
  VizPricewise,
} from "@/components/viz/ProjectViz";
import { ProjectCoverImage } from "@/components/viz/ProjectCoverImage";
import { getProjectCover } from "@/lib/project-covers";
import type { CaseCardCopy } from "@/lib/cases/schema";
import {
  getEvidenceMatrix,
  getHiringConversion,
  getProjectEvidence,
  type ProofLocale,
} from "@/lib/portfolio-proof";

type ProjKey =
  | "connect"
  | "maze"
  | "hoop"
  | "pricewise"
  | "grassland"
  | "onthebeat"
  | "lamplight"
  | "autofill"
  | "walkie"
  | "fencepost";
// "acc" left with Spectra Lens, its only case (unlisted 2026-11-20).
type FilterId = "all" | "flag" | "research" | "ai" | "hardware";
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
    k: "connect",
    tags: ["flag", "research"],
    role: "Solo",
    year: "Coursework",
    dur: "Not shipped",
    problem: { en: "Disjointed structure and hard-to-find information", zh: "结构割裂，关键信息难找" },
    changed: { en: "Clearer task flow and navigation structure", zh: "更清楚的任务流和导航结构" },
  },
  {
    n: "03",
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
    n: "04",
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
    n: "05",
    k: "grassland",
    tags: ["flag", "ai"],
    role: "Solo, with AI tools",
    year: "2026",
    dur: "Chapter one playable",
    problem: {
      en: "Many units, many commands and a running clock, where one inconsistent rule makes the whole game unpredictable",
      zh: "单位多、命令多、时钟一直在走，一条规则不一致，整个游戏就不可预测",
    },
    changed: {
      en: "One command grammar across five missions, and failure restored from one save chain",
      zh: "五关共用一套命令语法，失败后从同一条存档链恢复",
    },
  },
  {
    n: "06",
    k: "onthebeat",
    tags: ["hardware", "ai"],
    role: "Requirements + review",
    year: "2026",
    dur: "Paired on real bands",
    problem: {
      en: "Two strangers at a gig with no easy way to say hello",
      zh: "演出现场两个陌生人，缺一个容易开口的方式",
    },
    changed: {
      en: "A phone, two wristbands and a cloud relay that run without a laptop",
      zh: "手机、两支手环加云端 relay，不需要笔电就能运转",
    },
  },
  {
    n: "07",
    k: "lamplight",
    tags: ["ai"],
    role: "Direction + interaction",
    year: "2026",
    dur: "1.0, in daily use",
    problem: {
      en: "A long AI task shows up as a log nobody can read at a glance",
      zh: "AI 长任务只是一屏没人能一眼看懂的日志",
    },
    changed: {
      en: "A café crew acting out the task, with questions and risky steps as cards",
      zh: "一组咖啡馆店员演出任务，提问和风险步骤变成卡片",
    },
  },
  {
    n: "08",
    k: "autofill",
    tags: ["ai"],
    role: "Problem + rules",
    year: "2026",
    dur: "Used on my applications",
    problem: {
      en: "One resume typed into Workday, Beisen and Moka, field by field",
      zh: "同一份简历在 Workday、北森、Moka 里一格格重填",
    },
    changed: {
      en: "An autofill that never guesses, never submits and keeps the resume on the device",
      zh: "一个不猜、不提交、简历不离开设备的自动填表工具",
    },
  },
  {
    n: "09",
    k: "walkie",
    tags: ["flag", "hardware", "ai"],
    role: "Hardware + AI UX",
    year: "2026",
    dur: "Dual-boot S3 build",
    problem: {
      en: "Stepping away from the desk leaves coding agents blocked on short permission checks",
      zh: "离开电脑前，编码 Agent 常常卡在简短的权限审批与一句追问上",
    },
    changed: {
      en: "A sealed AES-256-GCM wrist voice remote where physical watch buttons own every approval",
      zh: "一套 AES-256-GCM 加密手腕语音遥控器，高风险审批全部落在实体按键上",
    },
  },
  {
    n: "10",
    k: "fencepost",
    tags: ["flag", "ai", "research"],
    role: "Product + AI Safety",
    year: "2026",
    dur: "Live deployment",
    problem: {
      en: "Sharing backyard wildlife sightings risks leaking EXIF, private entries, or unsafe AI replies",
      zh: "分享社区野生动物记录容易泄露 EXIF、私密条目或引发不安全的 AI 回复",
    },
    changed: {
      en: "Revocable QR grants, zero EXIF schema, and 431 offline tests cutting revoked data out of model context",
      zh: "可吊销二维码权限、零 EXIF 表结构与 431 项离线测试，确保权限吊销后模型立刻截断上下文",
    },
  },
];

function WorkPreview({ project, locale }: { project: ProjKey; locale: ProofLocale }) {
  const cover = getProjectCover(project);
  if (cover) {
    return <ProjectCoverImage cover={cover} locale={locale} sizes="240px" />;
  }
  if (project === "maze") return <VizMaze locale={locale} />;
  if (project === "hoop") return <VizHoop locale={locale} />;
  if (project === "pricewise") return <VizPricewise locale={locale} />;
  if (project === "connect") return <VizConnect locale={locale} />;
  return null;
}

export function WorkIndex({
  cardsBySlug,
}: {
  cardsBySlug: Record<string, CaseCardCopy>;
}) {
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
                {/* The row's link names the case; the thumbnail repeats it as
                    a picture, so it stays out of the accessibility tree. */}
                <div className="work-index-thumb" aria-hidden="true">
                  <WorkPreview project={i.k} locale={proofLocale} />
                  {!getProjectCover(i.k) && (
                    <span className="work-index-thumb-label">{pageCopy.conceptVisual}</span>
                  )}
                </div>
                <div>
                  <h3>{cardsBySlug[i.k]?.title ?? i.k}</h3>
                  <p>{cardsBySlug[i.k]?.kicker ?? ""}</p>
                </div>
              </div>
              <div className="work-index-role">
                <strong>{cardsBySlug[i.k]?.role ?? i.role}</strong>
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
                <strong>{cardsBySlug[item.slug]?.title ?? item.slug}</strong>
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
