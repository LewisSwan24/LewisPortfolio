import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { CaseInterviewPack } from "@/components/hiring/CaseInterviewPack";
import { DemoEmbed } from "@/components/case/DemoEmbed";
import { CaseInvariantLink, isLabLinkedCase } from "@/components/case/CaseInvariantLink";
import { CaseMediaGallery } from "@/components/case/CaseMediaGallery";
import { CaseCoverVisual, hasCaseSchematic, hasScreenshotCover } from "@/components/case/CaseCoverVisual";
import { HardwareFieldCanvas } from "@/components/three/HardwareFieldCanvas";
import { CaseSimulatorFrame } from "@/components/case/CaseSimulatorFrame";
import { CaseTerminologyNotes } from "@/components/case/CaseTerminologyNotes";
import { BeforeAfterScrubber } from "@/components/case/BeforeAfterScrubber";
import { ResearchQuoteDeck } from "@/components/case/ResearchQuoteDeck";
import { CaseMicroLoop } from "@/components/case/CaseMicroLoop";
import { PresentationTrigger } from "@/components/presentation/PresentationTrigger";
import { buildCaseDeck } from "@/lib/presentation/build-deck";
import { getCaseMoodStyle } from "@/lib/cases/mood";
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
import type { CaseTocEntry, CaseTocSection } from "@/lib/cases/case-toc";
import { getCaseDepthModules } from "@/data/cases/modules";
import { getCaseResearchVault } from "@/data/cases/research-vault";
import { getCaseRedTeamDeck } from "@/data/critique/red-team";
import { CaseJourneyRail } from "@/components/case/deep/CaseJourneyRail";
import { CaseRejectionArchive } from "@/components/case/deep/CaseRejectionArchive";
import { RawResearchVault } from "@/components/case/deep/RawResearchVault";
import { RedTeamCritiquePanel } from "@/components/ai/RedTeamCritiquePanel";
import { WalkieTactileSchematicSvg } from "@/components/editorial/CapabilityDiagrams";
import { getCaseStory } from "@/data/cases/story";
import { CaseAppendixHashOpener } from "@/components/case/story/CaseAppendixHashOpener";
import { DiagramViewer } from "@/components/case/DiagramViewer";
import { localizeMediaSrc } from "@/lib/cases/localized-media";
import {
  PlainLimits,
  SummaryGlance,
  SummaryLede,
  ledeCopyLabels,
} from "@/components/case/story/CaseLedeLayout";
import {
  STORY_SECTION_ALIASES,
  StoryAppendix,
  StoryAppendixGroup,
  StoryBuilt,
  StoryDecisions,
  StoryLede,
  StoryOutcome,
  StoryProblem,
  StoryTryIt,
  storyCopyLabels,
  storyToc,
} from "@/components/case/story/CaseStoryBody";

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
        schematicLabel: "示意图",
        caseDepthAria: "案例局限与下步规划",
        limitsLabel: "边界",
        outcomeLimits: "实证局限与边界",
        whyItMatters: "影响",
        nextValidation: "下步验证",
        interviewPack: "面试深入问答",
      }
    : {
        coverCaption: "Concept schematic · build evidence and honest limits follow below.",
        schematicLabel: "schematic",
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
  const designDecisions = record.designDecisions ?? [];

  const depthModules = getCaseDepthModules(k);
  const researchVault = getCaseResearchVault(k);
  const redTeamDeck = getCaseRedTeamDeck(k);

  // Every anchored section, listed once in the order the page renders it.
  // The side TOC and the in-page evidence links both read from this list.
  const interactiveLabel = isZh ? "交互原型" : "Interactive prototype";
  const pageSections: CaseTocSection[] = [
    { id: "artifact", label: isZh ? "核心产物" : "Artifact" },
    { id: "snapshot", label: isZh ? "案例摘要" : "Summary" },
    {
      id: "design-decisions",
      label: isZh ? "设计决策论证" : "Design Decisions",
      present: designDecisions.length > 0,
    },
    {
      id: "interactive-demo",
      label: interactiveLabel,
      present: interactiveDemo?.placement === "after-summary",
    },
    {
      id: "interactive-demo",
      label: interactiveLabel,
      present: interactiveDemo?.placement === "mid-narrative",
    },
    {
      id: "process-artifacts",
      label: isZh ? "过程手稿与调研" : "Process & research",
      present: hasProcessArtifacts,
    },
    { id: "journey-map", label: isZh ? "全流程旅程" : "Journey map", present: Boolean(depthModules) },
    { id: "state-matrix", label: isZh ? "五态边界矩阵" : "5-State matrix", present: Boolean(depthModules) },
    {
      id: "rejection-archive",
      label: isZh ? "打回重做档案" : "Rejection archive",
      present: Boolean(depthModules),
    },
    {
      id: "research-vault",
      label: isZh ? "原始研究档案" : "Research vault",
      present: Boolean(researchVault),
    },
    { id: "long-form", label: narrative.ch.label },
    { id: "evidence-board", label: narrative.re.label },
    { id: "decision-timeline", label: narrative.id.label },
    { id: "iteration-gallery", label: narrative.te.label },
    { id: "interview-takeaway", label: narrative.rf.label },
    { id: "outcome-limits", label: pageCopy.outcomeLimits },
    { id: "interview-pack", label: pageCopy.interviewPack },
    {
      id: "red-team-defense",
      label: isZh ? "红队对抗答辩" : "Red-Team defense",
      present: Boolean(redTeamDeck),
    },
  ];
  const sectionLabels: Record<string, string> = Object.fromEntries(
    pageSections
      .filter((section) => section.present !== false)
      .map((section) => [section.id, section.label])
  );

  const moodStyle = getCaseMoodStyle(k);

  const breadcrumbSchema = (
    <StructuredData
      data={generateBreadcrumbSchema([
        { name: t("nav.home"), url: siteUrl },
        { name: t("nav.projects"), url: `${siteUrl}/projects` },
        { name: card.title, url: `${siteUrl}/projects/${k}` },
      ])}
    />
  );
  const relatedNav = (
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
  );

  // v6.6 story cases carry rewritten copy. v6.7: every other case takes the
  // same layout with its copy untouched (Lewis, 2026-11-26: 「只換版面」).
  const story = getCaseStory(k)?.[proofLocale];
  const labels = storyCopyLabels(isZh);
  const ledeLabels = ledeCopyLabels(isZh);

  const toc: CaseTocEntry[] = story
    ? storyToc(labels)
    : [
        { id: "long-form", label: narrative.ch.label },
        { id: "evidence-board", label: narrative.re.label },
        { id: "decision-timeline", label: narrative.id.label },
        { id: "iteration-gallery", label: narrative.te.label },
        { id: "interview-takeaway", label: narrative.rf.label },
        ...(interactiveDemo ? [{ id: "interactive-demo", label: interactiveLabel }] : []),
        { id: "outcome-limits", label: ledeLabels.outcomeLimits },
        { id: "for-interviewers", label: labels.appendix },
      ];

  const appendixLabels: Record<string, string> = {
    ...(story ? {} : sectionLabels),
    ...Object.fromEntries(toc.map((entry) => [entry.id, entry.label])),
    "journey-map": labels.journey,
    "process-artifacts": labels.beforeAfter,
    "rejection-archive": labels.rejected,
    "research-vault": labels.research,
    "interview-pack": labels.interview,
    "red-team-defense": labels.redTeam,
  };
  const aliases = story ? STORY_SECTION_ALIASES : undefined;

  return (
    <main
      className={`page v4-case-page v66-case-story${story ? "" : " v67-case-lede"}`}
      data-screen-label={`03 Case · ${k}`}
      data-case-mood={k}
      data-case-story={story ? "" : undefined}
      data-case-layout={story ? undefined : "lede"}
      style={moodStyle}
    >
      <div className="cs-scroll-progress" aria-hidden="true" />
      {breadcrumbSchema}
      <CaseAppendixHashOpener aliases={aliases ?? {}} />
      <section className="container cs-hero cs-story-hero">
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
        <span className="eyebrow">{card.kicker}</span>
        <h1 tabIndex={-1}>{card.title}</h1>
        {!story && <p className="sub cs-lede-sub">{subtitleText}</p>}
        <div className="cs-story-first">
          {story ? <StoryLede copy={story} labels={labels} /> : <SummaryLede summary={caseSummary} />}
          <figure id="artifact" className="cs-cover cs-story-cover">
            {record.cover ? (
              <Image
                src={localizeMediaSrc(record.cover.src, locale)}
                fill
                priority
                sizes="(max-width: 960px) 100vw, 58vw"
                alt={record.cover.alt[proofLocale]}
                className={`project-cover project-cover--${record.cover.fit}`}
              />
            ) : (
              <>
                {hasScreenshotCover(k) ? (
                  <CaseCoverVisual slug={k} locale={proofLocale} />
                ) : (
                  <DiagramViewer label={`${card.title} · ${pageCopy.schematicLabel}`} isZh={isZh}>
                    <CaseCoverVisual slug={k} locale={proofLocale} />
                  </DiagramViewer>
                )}
                {!hasScreenshotCover(k) && <figcaption>{pageCopy.coverCaption}</figcaption>}
              </>
            )}
          </figure>
        </div>
        <dl className="cs-meta cs-story-meta">
          {!story && (
            <>
              <div>
                <dt>{ledeLabels.role}</dt>
                <dd>{narrative.roleVal}</dd>
              </div>
              <div>
                <dt>{ledeLabels.team}</dt>
                <dd>{narrative.teamVal}</dd>
              </div>
            </>
          )}
          <div>
            <dt>{labels.time}</dt>
            <dd>{narrative.timeVal}</dd>
          </div>
          <div>
            <dt>{labels.tools}</dt>
            <dd>{narrative.toolsVal}</dd>
          </div>
          {(record.links.length > 0 || aiTrustMarker) && (
            <div>
              <dt>{labels.links}</dt>
              <dd>
                <ul className="cs-links">
                  {record.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                      >
                        {isZh && link.labelZh ? link.labelZh : link.label}
                        {link.external && (
                          <span aria-hidden className="cs-links-arrow">
                            ↗
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                  {aiTrustMarker && (
                    <li>
                      <Link href={AI_TRUST_THREAD_HREF}>{aiTrustMarker.link}</Link>
                    </li>
                  )}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </section>

      <div className="container v4-editorial-grid cs-story-grid">
        <aside className="v4-span-3 v4-rail-sticky" aria-label={isZh ? "案例导航轨" : "Case rail"}>
          <nav className="cs-jump" aria-label={isZh ? "本页目录" : "On this page"}>
            <span className="cs-jump-label" aria-hidden="true">
              {isZh ? "本页目录" : "On this page"}
            </span>
            <ol>
              {toc.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`}>{label}</a>
                </li>
              ))}
            </ol>
          </nav>
          <div>
            <PresentationTrigger deck={presentationDeck} locale={proofLocale} className="btn btn-ghost" />
          </div>
        </aside>

        <article className="v4-span-9 cs-story-body">
          {story ? (
            <>
              <StoryProblem copy={story} labels={labels} />
              <StoryDecisions copy={story} labels={labels} />
              <StoryTryIt
                copy={story}
                labels={labels}
                simulatorId={interactiveDemo?.id}
                simulator={
                  interactiveDemo ? (
                    <CaseSimulatorFrame demo={interactiveDemo} locale={proofLocale} embedded />
                  ) : null
                }
              />
              <StoryBuilt
                copy={story}
                labels={labels}
                media={
                  <>
                    {record.media && <CaseMediaGallery media={record.media} isZh={isZh} />}
                    {k === "walkie" && (
                      <DiagramViewer label={`${card.title} · ${pageCopy.schematicLabel}`} isZh={isZh}>
                        <WalkieTactileSchematicSvg locale={proofLocale} />
                      </DiagramViewer>
                    )}
                  </>
                }
              />
              <StoryOutcome copy={story} labels={labels} />
            </>
          ) : (
            <>
              <section id="long-form" className="cs-lede-longform">
                <CaseNarrative
                  slug={k}
                  narrative={narrative}
                  impactLabel={t("cs.impactLabel")}
                  isZh={isZh}
                />
              </section>
              {(interactiveDemo || record.demo || record.media || isLabLinkedCase(k)) && (
                <div className="cs-lede-proof">
                  {/* The photo took the hero; the case's own schematic stays here. */}
                  {record.cover && hasCaseSchematic(k) && (
                    <figure className="cs-cover cs-lede-schematic">
                      <DiagramViewer label={`${card.title} · ${pageCopy.schematicLabel}`} isZh={isZh}>
                        <CaseCoverVisual slug={k} locale={proofLocale} />
                      </DiagramViewer>
                      <figcaption>{pageCopy.coverCaption}</figcaption>
                    </figure>
                  )}
                  {interactiveDemo && <CaseSimulatorFrame demo={interactiveDemo} locale={proofLocale} />}
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
                  {record.media && <CaseMediaGallery media={record.media} isZh={isZh} />}
                  {isLabLinkedCase(k) && <CaseInvariantLink slug={k} isZh={isZh} />}
                </div>
              )}
              <PlainLimits limits={caseDepth.limits} labels={ledeLabels} />
            </>
          )}

          <StoryAppendix labels={labels} hint={story ? undefined : ledeLabels.appendixHint}>
            {!story && <SummaryGlance summary={caseSummary} labels={ledeLabels} />}
            <CaseTerminologyNotes slug={k} locale={proofLocale} />
            {depthModules && (
              <CaseJourneyRail
                stages={depthModules.journey}
                locale={proofLocale}
                headingLevel={3}
                headingText={labels.journey}
              />
            )}
            {hasProcessArtifacts && (
              <StoryAppendixGroup id="process-artifacts" title={labels.beforeAfter}>
                {processArtifacts?.scrubber && (
                  <BeforeAfterScrubber data={processArtifacts.scrubber} locale={proofLocale} headingLevel={4} />
                )}
                {processArtifacts?.microLoop && (
                  <CaseMicroLoop data={processArtifacts.microLoop} locale={proofLocale} headingLevel={4} />
                )}
                {processArtifacts?.quotes && (
                  <ResearchQuoteDeck data={processArtifacts.quotes} locale={proofLocale} headingLevel={4} />
                )}
              </StoryAppendixGroup>
            )}
            {depthModules && (
              <CaseRejectionArchive
                entries={depthModules.rejectionArchive}
                locale={proofLocale}
                headingLevel={3}
                headingText={labels.rejected}
              />
            )}
            {researchVault && (
              <RawResearchVault
                vault={researchVault}
                locale={proofLocale}
                headingLevel={3}
                headingText={labels.research}
              />
            )}
            {(k === "walkie" || k === "maze" || k === "onthebeat") && (
              <StoryAppendixGroup title={labels.hardware}>
                <HardwareFieldCanvas slug={k} locale={proofLocale} />
              </StoryAppendixGroup>
            )}
            <CaseInterviewPack
              pack={caseInterviewPack}
              locale={proofLocale}
              currentSlug={k}
              sectionLabels={appendixLabels}
              sectionAliases={aliases}
              headingLevel={3}
              headingText={labels.interview}
            />
            {redTeamDeck && (
              <RedTeamCritiquePanel
                decks={[redTeamDeck]}
                locale={proofLocale}
                sectionId="red-team-defense"
                currentSlug={k}
                sectionLabels={appendixLabels}
                sectionAliases={aliases}
                probeVariant="ghost"
                headingLevel={3}
                headingText={labels.redTeam}
              />
            )}
          </StoryAppendix>
        </article>
      </div>

      {relatedNav}
    </main>
  );
}
