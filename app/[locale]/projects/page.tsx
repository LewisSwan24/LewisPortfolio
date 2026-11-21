import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import { EvidenceMatrix } from "@/components/hiring/EvidenceMatrix";
import {
  VizConnect,
  VizMaze,
  VizHoop,
  VizPricewise,
} from "@/components/viz/ProjectViz";
import { ProjectCoverImage } from "@/components/viz/ProjectCoverImage";
import { getProjectCover } from "@/lib/project-covers";
import { getCaseCard, getWorkIndexItems } from "@/lib/cases/registry";
import {
  getEvidenceMatrix,
  getHiringConversion,
  getProjectEvidence,
  type ProofLocale,
} from "@/lib/portfolio-proof";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { WorkIndex, type WorkIndexClientRow } from "./WorkIndex";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const locale = (await getLocale()) as "en" | "zh";
  const title = t("nav.work");
  const description =
    locale === "zh"
      ? "十个案例，涵盖 UX、交互设计、物理计算、AI Agent 与可运行全栈原型。"
      : "Ten cases across UX, interaction design, physical computing, AI agents, and working full-stack prototypes.";
  return {
    title,
    description,
    alternates: buildAlternates("/projects", locale),
    openGraph: buildOpenGraph({ title, description, path: "/projects", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

function renderThumbVisual(slug: string, locale: ProofLocale, conceptLabel: string) {
  const cover = getProjectCover(slug as Parameters<typeof getProjectCover>[0]);
  return (
    <div className="work-index-thumb" aria-hidden="true">
      {cover ? (
        <ProjectCoverImage cover={cover} locale={locale} sizes="240px" />
      ) : slug === "maze" ? (
        <VizMaze locale={locale} />
      ) : slug === "hoop" ? (
        <VizHoop locale={locale} />
      ) : slug === "pricewise" ? (
        <VizPricewise locale={locale} />
      ) : slug === "connect" ? (
        <VizConnect locale={locale} />
      ) : null}
      {!cover && <span className="work-index-thumb-label">{conceptLabel}</span>}
    </div>
  );
}

export default async function ProjectsPage() {
  const t = await getTranslations();
  const rawLocale = await getLocale();
  const locale = (rawLocale === "zh" ? "zh" : "en") as "en" | "zh";
  const isZh = locale === "zh";

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

  const clientRows: WorkIndexClientRow[] = getWorkIndexItems(locale).map((item) => ({
    slug: item.slug,
    tags: item.tags,
    title: item.title,
    kicker: item.kicker,
    role: item.role,
    year: item.year,
    dur: item.dur,
    problem: item.problem,
    changed: item.changed,
    thumb: renderThumbVisual(item.slug, locale, pageCopy.conceptVisual),
  }));

  const evidenceMatrix = getEvidenceMatrix(locale);
  const hiringConversion = getHiringConversion(locale);
  const evidence = getProjectEvidence(locale);

  return (
    <main className="page" data-screen-label="02 Work">
      <section className="container idx-hero">
        <div className="label">{t("nav.work")}</div>
        <h1 className="h-display h1" style={{ marginTop: 16 }}>
          {isZh ? "精选作品" : "Selected work"}
        </h1>
      </section>

      <WorkIndex items={clientRows} locale={locale} />

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
        <EvidenceMatrix capabilities={evidenceMatrix} locale={locale} />
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
                <strong>{getCaseCard(item.slug, locale).title}</strong>
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
