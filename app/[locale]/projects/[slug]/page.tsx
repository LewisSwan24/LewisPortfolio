import { Suspense } from "react";
import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { CaseInterviewPack } from "@/components/hiring/CaseInterviewPack";
import { DemoEmbed } from "@/components/case/DemoEmbed";
import { CaseInvariantLink, isLabLinkedCase } from "@/components/case/CaseInvariantLink";
import { CaseMediaGallery } from "@/components/case/CaseMediaGallery";
import { CaseCoverVisual, hasScreenshotCover } from "@/components/case/CaseCoverVisual";
import { CaseSummaryBlock } from "@/components/case/CaseSummaryBlock";
import { CaseDesignDecisions } from "@/components/case/CaseDesignDecisions";
import { HardwareFieldCanvas } from "@/components/three/HardwareFieldCanvas";
import { CaseSimulatorFrame } from "@/components/case/CaseSimulatorFrame";
import { CaseTerminologyNotes } from "@/components/case/CaseTerminologyNotes";
import { BeforeAfterScrubber } from "@/components/case/BeforeAfterScrubber";
import { ResearchQuoteDeck } from "@/components/case/ResearchQuoteDeck";
import { CaseMicroLoop } from "@/components/case/CaseMicroLoop";
import { PresentationTrigger } from "@/components/presentation/PresentationTrigger";
import { buildCaseDeck } from "@/lib/presentation/build-deck";
import { getCaseMood, getCaseMoodStyle } from "@/lib/cases/mood";
import { CaseNarrative } from "@/components/case/CaseNarrative";
import { CaseRelatedNav } from "@/components/case/CaseRelatedNav";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { StructuredData, generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import {
  CURRENT_PROJECT_SLUGS,
  isUnlistedProject,
  type CurrentProjectSlug,
} from "@/lib/project-routes";
import {
  AI_TRUST_THREAD_HREF,
  getAiTrustThread,
  getCaseDepth,
  getCaseInterviewPack,
  getCaseSummary,
  isOnAiTrustThread,
  type ProofLocale,
} from "@/lib/portfolio-proof";
import { getCaseCard, getCaseRecordOrThrow } from "@/lib/cases/registry";
import { getCaseDepthModules } from "@/data/cases/modules";
import { getCaseResearchVault } from "@/data/cases/research-vault";
import { getCaseRedTeamDeck } from "@/data/critique/red-team";
import { CaseReviewLensSwitch } from "@/components/case/deep/CaseReviewLensSwitch";
import { CaseFocusRegion } from "@/components/case/deep/CaseFocusRegion";
import { CaseJourneyRail } from "@/components/case/deep/CaseJourneyRail";
import { CaseStateMatrixTable } from "@/components/case/deep/CaseStateMatrixTable";
import { CaseRejectionArchive } from "@/components/case/deep/CaseRejectionArchive";
import { RawResearchVault } from "@/components/case/deep/RawResearchVault";
import { RedTeamCritiquePanel } from "@/components/ai/RedTeamCritiquePanel";
import deepStyles from "@/components/case/deep/cases-deep.module.css";

type Slug = CurrentProjectSlug;
const SLUGS = [...CURRENT_PROJECT_SLUGS];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!SLUGS.includes(slug as Slug)) return { title: "Project Not Found" };
  const locale = (await getLocale()) as "en" | "zh";
  const card = getCaseCard(slug as Slug, locale);
  const title = card.title;
  const description = card.sub;
  const path = `/projects/${slug}`;
  const image = `/${locale}${path}/opengraph-image`;
  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale, type: "article", image }),
    twitter: buildTwitter({ title, description, image }),
    ...(isUnlistedProject(slug) ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  if (!SLUGS.includes(slug as Slug)) notFound();

  const k = slug as Slug;
  const t = await getTranslations();
  const locale = await getLocale();
  const isZh = locale === "zh";
  const proofLocale: ProofLocale = isZh ? "zh" : "en";

  const record = getCaseRecordOrThrow(k);
  const card = record.card[proofLocale];
  const narrative = record.narrative[proofLocale];

  const idx = SLUGS.indexOf(k);
  const neighbour = (step: 1 | -1): Slug => {
    for (let i = 1; i < SLUGS.length; i += 1) {
      const candidate = SLUGS[(((idx + step * i) % SLUGS.length) + SLUGS.length) % SLUGS.length];
      if (!isUnlistedProject(candidate)) return candidate;
    }
    return k;
  };
  const nextSlug = neighbour(1);
  const prevSlug = neighbour(-1);

  const siteUrl = siteConfig.url;
  const caseSummary = getCaseSummary(k, proofLocale);
  const caseDepth = getCaseDepth(k, proofLocale);
  const caseInterviewPack = getCaseInterviewPack(k, proofLocale);
  const aiTrustMarker = isOnAiTrustThread(k) ? getAiTrustThread(proofLocale).caseMarker : null;
  const presentationDeck = buildCaseDeck({
    record,
    summary: caseSummary,
    depth: caseDepth,
    interviewPack: caseInterviewPack,
    locale: proofLocale,
  });

  const pageCopy = isZh
    ? {
        coverCaption: "系统示意图 · 下方展开构建证据与诚实边界。",
        caseDepthAria: "案例局限与下步规划",
        limitsLabel: "边界",
        outcomeLimits: "实证局限与边界",
        whyItMatters: "影响",
        nextValidation: "下步验证",
        interviewPack: "面试深入问答",
      }
    : {
        coverCaption: "Concept schematic · build evidence and honest limits follow below.",
        caseDepthAria: "Outcome limits",
        limitsLabel: "Limits",
        outcomeLimits: "Outcome limits",
        whyItMatters: "Why it matters",
        nextValidation: "Next validation",
        interviewPack: "Interview pack",
      };

  const subtitleText =
    narrative.hero.title !== card.title ? narrative.hero.title : narrative.hero.sub;

  const interactiveDemo = record.interactiveDemo;
  const processArtifacts = record.processArtifacts;
  const hasProcessArtifacts = Boolean(
    processArtifacts?.scrubber ||
      processArtifacts?.quotes ||
      processArtifacts?.microLoop
  );
  const interactiveJump: [string, string] | null = interactiveDemo
    ? ["interactive-demo", isZh ? "交互原型" : "Interactive prototype"]
    : null;
  const processJump: [string, string] | null = hasProcessArtifacts
    ? ["process-artifacts", isZh ? "过程手稿与调研" : "Process & research"]
    : null;

  const designDecisions = record.designDecisions ?? [];
  const designDecisionsJump: [string, string] | null =
    designDecisions.length > 0
      ? ["design-decisions", isZh ? "设计决策论证" : "Design Decisions"]
      : null;

  const depthModules = getCaseDepthModules(k);
  const researchVault = getCaseResearchVault(k);
  const redTeamDeck = getCaseRedTeamDeck(k);
  const depthJumps: Array<readonly [string, string]> = [
    ...(depthModules
      ? ([
          ["journey-map", isZh ? "全流程旅程" : "Journey map"],
          ["state-matrix", isZh ? "五态边界矩阵" : "5-State matrix"],
          ["rejection-archive", isZh ? "打回重做档案" : "Rejection archive"],
        ] as const)
      : []),
    ...(researchVault
      ? ([["research-vault", isZh ? "原始研究档案" : "Research vault"]] as const)
      : []),
    ...(redTeamDeck
      ? ([["red-team-defense", isZh ? "红队对抗答辩" : "Red-Team defense"]] as const)
      : []),
  ];

  const jumpSections: Array<readonly [string, string]> = [
    ["artifact", isZh ? "核心产物" : "Artifact"],
    ["snapshot", isZh ? "案例摘要" : "Summary"],
    ...(designDecisionsJump ? [designDecisionsJump] : []),
    ...depthJumps,
    ...(interactiveJump && interactiveDemo?.placement === "after-summary"
      ? [interactiveJump]
      : []),
    ...(interactiveJump && interactiveDemo?.placement === "mid-narrative"
      ? [interactiveJump]
      : []),
    ...(processJump ? [processJump] : []),
    ["long-form", narrative.ch.label],
    ["evidence-board", narrative.re.label],
    ["decision-timeline", narrative.id.label],
    ["iteration-gallery", narrative.te.label],
    ["outcome-limits", pageCopy.outcomeLimits],
    ["interview-takeaway", narrative.rf.label],
    ["interview-pack", pageCopy.interviewPack],
  ];

  const mood = getCaseMood(k);
  const moodStyle = getCaseMoodStyle(k);

  return (
    <main
      className="page v4-case-page"
      data-screen-label={`03 Case · ${k}`}
      data-case-mood={k}
      style={moodStyle}
    >
      <div className="cs-scroll-progress" aria-hidden="true" />
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: t("nav.home"), url: siteUrl },
          { name: t("nav.projects"), url: `${siteUrl}/projects` },
          { name: card.title, url: `${siteUrl}/projects/${k}` },
        ])}
      />
      <section className="container cs-hero">
        <div className="v4-case-ribbon" aria-hidden="true" />
        <Breadcrumb
          className="cs-breadcrumb"
          locale={locale}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.projects"), href: "/projects" },
            { label: card.title },
          ]}
        />
        <div className="lab-pill-row" style={{ marginBottom: 12, alignItems: "center" }}>
          <span className="eyebrow">{card.kicker}</span>
          <span className="tag" style={{ borderColor: "var(--case-mood)", color: "var(--case-mood)" }}>
            {isZh ? mood.labelZh : mood.labelEn}
          </span>
        </div>
        <h1 tabIndex={-1}>{card.title}</h1>
        <p className="sub">{subtitleText}</p>
        {isUnlistedProject(k) && (
          <p className="sub" role="note" style={{ fontWeight: 600 }}>
            {isZh
              ? "项目归档说明（2026-09-23）：评估方案已撰写，受试实验未执行。"
              : "Project note (23 Sep 2026): evaluation protocol written; participant study never ran."}
          </p>
        )}
        <dl className="cs-meta">
          <div>
            <dt>{t("cs.role")}</dt>
            <dd>{narrative.roleVal}</dd>
          </div>
          <div>
            <dt>{t("cs.time")}</dt>
            <dd>{narrative.timeVal}</dd>
          </div>
          <div>
            <dt>{t("cs.team")}</dt>
            <dd>{narrative.teamVal}</dd>
          </div>
          <div>
            <dt>{t("cs.tools")}</dt>
            <dd>{narrative.toolsVal}</dd>
          </div>
          {record.links.length > 0 && (
            <div>
              <dt>{isZh ? "链接" : "Links"}</dt>
              <dd>
                <ul className="cs-links">
                  {record.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                      >
                        {link.label}
                        {link.external && (
                          <span aria-hidden className="cs-links-arrow">
                            ↗
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          {aiTrustMarker && (
            <div>
              <dt>{aiTrustMarker.label}</dt>
              <dd>
                <ul className="cs-links">
                  <li>
                    <Link href={AI_TRUST_THREAD_HREF}>{aiTrustMarker.link}</Link>
                  </li>
                </ul>
              </dd>
            </div>
          )}
        </dl>

        {depthModules && (
          <div style={{ marginTop: "var(--s-5)" }}>
            <Suspense
              fallback={
                <div className={deepStyles.lensShell} aria-hidden="true">
                  <p className={deepStyles.lensCallout}>
                    {depthModules.lensCallouts.all[proofLocale]}
                  </p>
                </div>
              }
            >
              <CaseReviewLensSwitch
                callouts={depthModules.lensCallouts}
                locale={proofLocale}
              />
            </Suspense>
          </div>
        )}

        <div className="v4-editorial-grid" style={{ marginTop: "var(--s-6)" }}>
          <aside className="v4-span-4 v4-rail-sticky" aria-label={isZh ? "案例导航轨" : "Case rail"}>
            <CaseTerminologyNotes slug={k} locale={proofLocale} />

            <div>
              <PresentationTrigger deck={presentationDeck} locale={proofLocale} className="btn btn-primary" />
            </div>

            <nav className="cs-jump" aria-label={isZh ? "本页目录" : "On this page"}>
              <span className="cs-jump-label" aria-hidden="true">
                {isZh ? "本页目录" : "On this page"}
              </span>
              <ol>
                {jumpSections.map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`}>{label}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="v4-span-8">
            <div id="artifact" className="case-anchor" aria-hidden />
            <figure className="cs-cover">
              <CaseCoverVisual slug={k} locale={proofLocale} />
              {!hasScreenshotCover(k) && <figcaption>{pageCopy.coverCaption}</figcaption>}
            </figure>

            <CaseSummaryBlock locale={proofLocale} summary={caseSummary} />

            <CaseDesignDecisions
              decisions={designDecisions}
              locale={proofLocale}
            />
          </div>
        </div>
      </section>

      {interactiveDemo?.placement === "after-summary" && (
        <CaseSimulatorFrame demo={interactiveDemo} locale={proofLocale} />
      )}

      {(k === "walkie" || k === "maze" || k === "onthebeat") && (
        <section className="container" style={{ marginTop: "var(--s-6)" }}>
          <HardwareFieldCanvas slug={k} locale={proofLocale} />
        </section>
      )}

      {isLabLinkedCase(k) && <CaseInvariantLink slug={k} isZh={isZh} />}

      {record.media && <CaseMediaGallery media={record.media} isZh={isZh} />}

      {record.demo && (
        <DemoEmbed
          src={record.demo.src}
          poster={record.demo.poster}
          title={isZh ? record.demo.titleZh : record.demo.title}
          posterAlt={isZh ? record.demo.posterAltZh : record.demo.posterAlt}
          label={isZh ? record.demo.labelZh : record.demo.label}
          blurb={isZh ? record.demo.blurbZh : record.demo.blurb}
          action={isZh ? record.demo.actionZh : record.demo.action}
          openLabel={isZh ? "在新标签页打开 ↗" : "Open in a new tab ↗"}
        />
      )}

      {interactiveDemo?.placement === "mid-narrative" && (
        <CaseSimulatorFrame demo={interactiveDemo} locale={proofLocale} />
      )}

      {hasProcessArtifacts && (
        <section
          id="process-artifacts"
          className="container case-sim-section proc-stage"
          aria-label={isZh ? "设计过程手稿与研究证据" : "Design process artifacts"}
        >
          {processArtifacts?.scrubber && (
            <BeforeAfterScrubber
              data={processArtifacts.scrubber}
              locale={proofLocale}
            />
          )}
          {processArtifacts?.microLoop && (
            <CaseMicroLoop data={processArtifacts.microLoop} locale={proofLocale} />
          )}
          {processArtifacts?.quotes && (
            <ResearchQuoteDeck data={processArtifacts.quotes} locale={proofLocale} />
          )}
        </section>
      )}

      {(depthModules || researchVault) && (
        <div
          className="container"
          style={{ marginTop: "var(--s-7)" }}
        >
          {depthModules ? (
            <Suspense
              fallback={
                <div id="case-deep-root" className={deepStyles.focusScope} data-active-focus="all">
                  <CaseJourneyRail stages={depthModules.journey} locale={proofLocale} />
                  <CaseStateMatrixTable states={depthModules.stateMatrix} locale={proofLocale} />
                  <CaseRejectionArchive entries={depthModules.rejectionArchive} locale={proofLocale} />
                  {researchVault && <RawResearchVault vault={researchVault} locale={proofLocale} />}
                </div>
              }
            >
              <CaseFocusRegion>
                <CaseJourneyRail stages={depthModules.journey} locale={proofLocale} />
                <CaseStateMatrixTable states={depthModules.stateMatrix} locale={proofLocale} />
                <CaseRejectionArchive entries={depthModules.rejectionArchive} locale={proofLocale} />
                {researchVault && <RawResearchVault vault={researchVault} locale={proofLocale} />}
              </CaseFocusRegion>
            </Suspense>
          ) : (
            researchVault && <RawResearchVault vault={researchVault} locale={proofLocale} />
          )}
        </div>
      )}

      <section id="long-form" className="container">
        <CaseNarrative
          slug={k}
          narrative={narrative}
          impactLabel={t("cs.impactLabel")}
          isZh={isZh}
        />

        <div className="case-depth" aria-label={pageCopy.caseDepthAria}>
          <div id="outcome-limits" className="case-depth-block case-limits">
            <div className="case-depth-head">
              <div className="label">{pageCopy.limitsLabel}</div>
              <h2>{pageCopy.outcomeLimits}</h2>
            </div>
            <div className="case-limits-grid">
              {caseDepth.limits.map((limit) => (
                <article key={limit.constraint}>
                  <h3>{limit.constraint}</h3>
                  <dl className="case-depth-dl">
                    <div>
                      <dt>{pageCopy.whyItMatters}</dt>
                      <dd>{limit.whyItMatters}</dd>
                    </div>
                    <div>
                      <dt>{pageCopy.nextValidation}</dt>
                      <dd>{limit.nextValidation}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CaseInterviewPack pack={caseInterviewPack} locale={proofLocale} />

      {redTeamDeck && (
        <section className="container" style={{ marginTop: "var(--s-6)" }}>
          <RedTeamCritiquePanel
            decks={[redTeamDeck]}
            locale={proofLocale}
            sectionId="red-team-defense"
          />
        </section>
      )}

      <section className="container">
        <CaseRelatedNav
          prevSlug={prevSlug}
          prevCard={getCaseCard(prevSlug, proofLocale)}
          nextSlug={nextSlug}
          nextCard={getCaseCard(nextSlug, proofLocale)}
          locale={proofLocale}
          labels={{
            related: t("cs.related"),
            prev: t("cs.prev"),
            next: t("cs.next"),
            work: t("nav.work"),
          }}
        />
      </section>
    </main>
  );
}
