import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { VizConnect, VizSpectra, VizAI, VizCircles, VizMaze } from "@/components/viz/ProjectViz";
import { CaseInterviewPack } from "@/components/hiring/CaseInterviewPack";
import { DemoEmbed } from "@/components/case/DemoEmbed";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { StructuredData, generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { CURRENT_PROJECT_SLUGS, type CurrentProjectSlug } from "@/lib/project-routes";
import {
  getCaseDepth,
  getCaseInterviewPack,
  getCaseSummary,
  type ProofLocale,
} from "@/lib/portfolio-proof";

type Slug = CurrentProjectSlug;
const SLUGS = [...CURRENT_PROJECT_SLUGS];

interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

interface CaseMediaImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  altZh: string;
  caption: string;
  captionZh: string;
}

interface CaseMedia {
  images: CaseMediaImage[];
  video?: { src: string; poster: string; caption: string; captionZh: string };
}

/**
 * Photographic evidence, for cases that have a physical artefact. Only
 * MazeRunners does — the rest are screen work whose artefact is the cover viz.
 */
const CASE_MEDIA: Partial<Record<Slug, CaseMedia>> = {
  maze: {
    images: [
      {
        src: "/projects/maze/01-exhibition-setup.png",
        width: 900,
        height: 520,
        alt: "The MazeRunners table set up at the exhibition with players around it",
        altZh: "MazeRunners 在展览现场的桌面布置，玩家围在四周",
        caption: "Exhibition setup, mid-round.",
        captionZh: "展览现场，回合进行中。",
      },
      {
        src: "/projects/maze/02-bracelet-finger-sleeve.png",
        width: 900,
        height: 520,
        alt: "Close-up of the wearable finger sleeve that delivers vibration feedback",
        altZh: "提供震动反馈的可穿戴手指套特写",
        caption: "The finger sleeve — where the trap actually lands.",
        captionZh: "手指套 —— 陷阱真正落在这里。",
      },
      {
        src: "/projects/maze/03-wiring-layer.png",
        width: 900,
        height: 520,
        alt: "The wiring layer underneath the maze board",
        altZh: "迷宫板下方的接线层",
        caption: "Wiring layer under the board.",
        captionZh: "板子底下的接线层。",
      },
      {
        src: "/projects/maze/04-engineering-overview.png",
        width: 1536,
        height: 1024,
        alt: "Annotated engineering overview of sensors, controllers, and feedback hardware",
        altZh: "带标注的工程总览：传感器、控制器与反馈硬件",
        caption: "Annotated overview: sensors, controllers, feedback.",
        captionZh: "带标注的总览：传感器、控制器、反馈。",
      },
    ],
    video: {
      src: "/projects/maze/05-planb-circuit.mp4",
      poster: "/projects/maze/05-planb-circuit-thumbnail.jpg",
      caption: "The PlanB feedback circuit running.",
      captionZh: "PlanB 反馈电路运行录像。",
    },
  },
};

/**
 * Playable builds, for cases where the thing itself can be handed to a reader.
 * MazeRunners' showcase runs in demo mode with no hardware attached.
 */
const CASE_DEMO: Partial<Record<Slug, { src: string; poster: string }>> = {
  maze: {
    src: "https://maze-runners.vercel.app",
    poster: "/projects/maze/01-exhibition-setup.png",
  },
};

const PROJECT_LINKS: Record<Slug, ProjectLink[]> = {
  connect: [],
  spectra: [],
  ai: [],
  circles: [],
  maze: [],
};

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!SLUGS.includes(slug as Slug)) return { title: "Project Not Found" };
  const t = await getTranslations();
  const locale = (await getLocale()) as "en" | "zh";
  const title = t(`proj.${slug}.title`);
  const description = t(`proj.${slug}.sub`);
  const path = `/projects/${slug}`;
  // Per-case card rendered by ./opengraph-image.tsx, so a shared case link
  // previews with that case's title rather than the generic site card.
  const image = `/${locale}${path}/opengraph-image`;
  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale, type: "article", image }),
    twitter: buildTwitter({ title, description, image }),
  };
}

function CoverViz({ slug }: { slug: Slug }) {
  if (slug === "maze") return <VizMaze />;
  if (slug === "connect") return <VizConnect />;
  if (slug === "spectra") return <VizSpectra />;
  if (slug === "ai") return <VizAI />;
  return <VizCircles />;
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  if (!SLUGS.includes(slug as Slug)) notFound();

  const k = slug as Slug;
  const t = await getTranslations();
  const locale = await getLocale();
  const isZh = locale === "zh";
  const idx = SLUGS.indexOf(k);
  const nextSlug = SLUGS[(idx + 1) % SLUGS.length];
  const prevSlug = SLUGS[(idx - 1 + SLUGS.length) % SLUGS.length];
  const projectLinks = PROJECT_LINKS[k];

  const siteUrl = siteConfig.url;
  const projectTitle = t(`proj.${k}.title`);
  const proofLocale: ProofLocale = isZh ? "zh" : "en";
  const caseSummary = getCaseSummary(k, proofLocale);
  const caseDepth = getCaseDepth(k, proofLocale);
  const caseInterviewPack = getCaseInterviewPack(k, proofLocale);
  const pageCopy = isZh
    ? {
        caseReaderAria: "案例阅读路径",
        caseReaderLabel: "案例阅读器",
        caseReaderIntro: "选择一种阅读路径，再跳到对应证据。",
        reviewModesAria: "阅读模式",
        askMeAbout: "可以问我",
        interviewerScanAria: "2 分钟面试官速览",
        interviewerScanLabel: "2 分钟面试官速览",
        whatThisCaseProves: "这个案例证明什么",
        whatToInspect: "建议检查",
        interviewQuestions: "面试问题",
        bestFitTeams: "最适合的团队",
        coverCaption:
          "概念视觉图。真实证据、方法、指标和限制写在案例摘要与下方深度说明中。",
        caseDepthAria: "面试可用的案例深度",
        caseDepthLabel: "案例深度",
        caseDepthTitle: "面试可用的案例深度",
        caseDepthIntro:
          "下面的说明帮助招聘方更快检查作品集：我做了什么选择、哪些证据推动了设计、迭代之间改变了什么，以及还需要验证什么。",
        decisionLogLabel: "决策记录",
        decisionTimeline: "决策时间线",
        choice: "选择",
        evidence: "证据",
        tradeoff: "取舍",
        impact: "影响",
        researchEvidenceLabel: "证据",
        researchEvidenceBoard: "研究证据板",
        finding: "发现",
        designImplication: "设计影响",
        iterationsLabel: "迭代",
        iterationGallery: "迭代展示",
        limitsLabel: "限制",
        outcomeLimits: "结果限制",
        whyItMatters: "为什么重要",
        nextValidation: "下一步验证",
        portfolioReadout: "作品集结论",
        interviewTakeaway: "面试要点",
      }
    : {
        caseReaderAria: "Case reader",
        caseReaderLabel: "Case reader",
        caseReaderIntro: "Choose a route, then jump to the proof.",
        reviewModesAria: "Review modes",
        askMeAbout: "Ask me about",
        interviewerScanAria: "2-minute interviewer scan",
        interviewerScanLabel: "2-minute interviewer scan",
        whatThisCaseProves: "What this case proves",
        whatToInspect: "What to inspect",
        interviewQuestions: "Interview questions",
        bestFitTeams: "Best-fit teams",
        coverCaption:
          "Concept visual. The evidence, methods, metrics, and limits are documented in the case summary and depth sections.",
        caseDepthAria: "Interview-ready case depth",
        caseDepthLabel: "Case depth",
        caseDepthTitle: "Interview-ready case depth",
        caseDepthIntro:
          "The following notes make the work easier to inspect in a portfolio review: what I chose, what evidence moved the design, what changed between iterations, and what still needs validation.",
        decisionLogLabel: "Decision log",
        decisionTimeline: "Decision timeline",
        choice: "Choice",
        evidence: "Evidence",
        tradeoff: "Trade-off",
        impact: "Impact",
        researchEvidenceLabel: "Evidence",
        researchEvidenceBoard: "Research evidence board",
        finding: "Finding",
        designImplication: "Design implication",
        iterationsLabel: "Iterations",
        iterationGallery: "Iteration gallery",
        limitsLabel: "Limits",
        outcomeLimits: "Outcome limits",
        whyItMatters: "Why it matters",
        nextValidation: "Next validation",
        portfolioReadout: "Portfolio readout",
        interviewTakeaway: "Interview takeaway",
      };

  return (
    <main className="page" data-screen-label={`03 Case · ${k}`}>
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: t("nav.home"), url: siteUrl },
          { name: t("nav.projects"), url: `${siteUrl}/projects` },
          { name: projectTitle, url: `${siteUrl}/projects/${k}` },
        ])}
      />
      <section className="container cs-hero">
        <Breadcrumb
          className="cs-breadcrumb"
          locale={locale}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.projects"), href: "/projects" },
            { label: projectTitle },
          ]}
        />
        <Link className="cs-back" href="/projects">
          {t("cs.back")}
        </Link>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          {t(`proj.${k}.kicker`)}
        </div>
        <h1>{t(`cs.${k}.hero.title`)}</h1>
        <p className="sub">{t(`cs.${k}.hero.sub`)}</p>
        <dl className="cs-meta">
          <div>
            <dt>{t("cs.role")}</dt>
            <dd>{t(`cs.${k}.roleVal`)}</dd>
          </div>
          <div>
            <dt>{t("cs.time")}</dt>
            <dd>{t(`cs.${k}.timeVal`)}</dd>
          </div>
          <div>
            <dt>{t("cs.team")}</dt>
            <dd>{t(`cs.${k}.teamVal`)}</dd>
          </div>
          <div>
            <dt>{t("cs.tools")}</dt>
            <dd>{t(`cs.${k}.toolsVal`)}</dd>
          </div>
          {projectLinks.length > 0 && (
            <div>
              <dt>{isZh ? "链接" : "Links"}</dt>
              <dd>
                <ul className="cs-links">
                  {projectLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                      >
                        {link.label}
                        {link.external && (
                          <span aria-hidden className="cs-links-arrow">↗</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
        {/* One interview surface, not three. The reader nav, its mode list and
            its prompt list all restated what the interview pack already answers
            with evidence links, so only the pack survives. */}
        <CaseInterviewPack pack={caseInterviewPack} locale={proofLocale} />
        <div id="snapshot" className="case-anchor" aria-hidden />
        {/* The 2-minute scan block was removed; its anchor now resolves to the
            case summary so existing proof links still land on something. */}
        <div id="interviewer-scan" className="case-anchor" aria-hidden />
        <aside className="case-summary" aria-label={isZh ? "案例摘要" : "Case summary"}>
          <div className="case-summary-head">
            <div className="label">{isZh ? "案例摘要" : "Case summary"}</div>
            <p>{caseSummary.challenge}</p>
          </div>
          <div className="case-summary-grid">
            <div>
              <h3>{isZh ? "我的角色" : "My role"}</h3>
              <p>{caseSummary.role}</p>
            </div>
            <div>
              <h3>{isZh ? "方法" : "Methods"}</h3>
              <ul>
                {caseSummary.methods.map((method) => (
                  <li key={method}>{method}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{isZh ? "证据" : "Evidence collected"}</h3>
              <ul>
                {caseSummary.evidence.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{isZh ? "结果" : "Outcome"}</h3>
              <p>{caseSummary.outcome}</p>
            </div>
            <div className="case-summary-next">
              <h3>{isZh ? "下一步我会做什么" : "What I would do next"}</h3>
              <p>{caseSummary.next}</p>
            </div>
          </div>
        </aside>
        <div id="artifact" className="case-anchor" aria-hidden />
        <figure className="cs-cover">
          <CoverViz slug={k} />
          <figcaption>{pageCopy.coverCaption}</figcaption>
        </figure>
      </section>

      {CASE_MEDIA[k] && (
        <section className="container case-build-evidence" aria-label={isZh ? "实物证据" : "Build evidence"}>
          <div className="case-build-head">
            <div className="label">{isZh ? "实物证据" : "Build evidence"}</div>
            <p>
              {isZh
                ? "以下是实际搭建与展出的照片和电路运行录像，不是渲染图。"
                : "Photographs of the actual build and a clip of the circuit running — not renders."}
            </p>
          </div>
          <div className="case-build-grid">
            {CASE_MEDIA[k]!.images.map((image) => (
              <figure key={image.src}>
                <Image
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={isZh ? image.altZh : image.alt}
                  sizes="(max-width: 720px) 100vw, 50vw"
                />
                <figcaption>{isZh ? image.captionZh : image.caption}</figcaption>
              </figure>
            ))}
          </div>
          {CASE_MEDIA[k]!.video && (
            <figure className="case-build-video">
              <video
                controls
                preload="none"
                poster={CASE_MEDIA[k]!.video!.poster}
                src={CASE_MEDIA[k]!.video!.src}
              />
              <figcaption>
                {isZh ? CASE_MEDIA[k]!.video!.captionZh : CASE_MEDIA[k]!.video!.caption}
              </figcaption>
            </figure>
          )}
        </section>
      )}

      {CASE_DEMO[k] && (
        <DemoEmbed
          src={CASE_DEMO[k]!.src}
          poster={CASE_DEMO[k]!.poster}
          title={isZh ? "MazeRunners 互动 demo" : "MazeRunners interactive demo"}
          posterAlt={
            isZh
              ? "MazeRunners 展览现场，点击开始互动 demo"
              : "MazeRunners at the exhibition; click to start the interactive demo"
          }
          label={isZh ? "自己玩玩看" : "Play it yourself"}
          blurb={
            isZh
              ? "这是驱动实体迷宫的同一套控制台，跑在 demo 模式下，不需要接硬体。按 Start 开一局，再按 Trap Test，看计分、震动通道和事件日志同时反应。"
              : "This is the same console that drives the physical maze, running in demo mode with no hardware attached. Hit Start, then Trap Test, and watch the score, the haptic channels, and the event log all answer the same event."
          }
          action={isZh ? "载入互动 demo" : "Load the interactive demo"}
          openLabel={isZh ? "在新分页打开 ↗" : "Open in a new tab ↗"}
        />
      )}

      <section className="container case-depth" aria-label={pageCopy.caseDepthAria}>
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

      </section>

      <section id="long-form" className="container">
        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t(`cs.${k}.ch.label`)}</div>
            </div>
            <div className="cs-row-body">
              <h2>{t(`cs.${k}.ch.title`)}</h2>
              <p className="prose">{t(`cs.${k}.ch.p`)}</p>
            </div>
          </div>
        </div>

        {/* The structured evidence board was removed as a duplicate of this
            narrative; its anchor moves here so proof links keep working. */}
        <div id="evidence-board" className="case-anchor" aria-hidden />
        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t(`cs.${k}.re.label`)}</div>
            </div>
            <div className="cs-row-body">
              <h2>{t(`cs.${k}.re.title`)}</h2>
              <div className="cs-method-grid">
                {([1, 2, 3] as const).map((i) => (
                  <div key={i}>
                    <h5>{t(`cs.${k}.re.m${i}.t`)}</h5>
                    <p>{t(`cs.${k}.re.m${i}.b`)}</p>
                  </div>
                ))}
              </div>
              <div className="quote" style={{ marginTop: 32, maxWidth: "36em" }}>
                <p>{t(`cs.${k}.re.quote`)}</p>
                <cite>— {t(`cs.${k}.re.quoteWho`)}</cite>
              </div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t(`cs.${k}.sy.label`)}</div>
            </div>
            <div className="cs-row-body">
              <h2>{t(`cs.${k}.sy.title`)}</h2>
              <p className="prose">{t(`cs.${k}.sy.p`)}</p>
              {k === "connect" && (
                <div className="cs-tree">
                  <div>
                    <h6>
                      {isZh ? "原版 · 12 个部门导向" : "Before · 12 staff-oriented"}
                    </h6>
                    <ul>
                      <li className="ko">HiQ</li>
                      <li className="ko">SI-net</li>
                      <li className="ko">my.UQ</li>
                      <li className="ko">ask.UQ</li>
                      <li className="ko">Money</li>
                      <li className="ko">+7 more</li>
                    </ul>
                  </div>
                  <div>
                    <h6>
                      {isZh ? "新版 · 6 个任务导向" : "After · 6 task-oriented"}
                    </h6>
                    <ul>
                      <li className="ok">{isZh ? "我是新生" : "I'm new"}</li>
                      <li className="ok">{isZh ? "学业" : "Study"}</li>
                      <li className="ok">{isZh ? "归属" : "Belong"}</li>
                      <li className="ok">{isZh ? "缴费 & 财务" : "Fees & finance"}</li>
                      <li className="ok">{isZh ? "校园生活" : "Life on campus"}</li>
                      <li className="ok">{isZh ? "毕业离开" : "Moving on"}</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* The decision timeline duplicated these technical decisions.
            Its anchor moves here so proof links keep working. */}
        <div id="decision-timeline" className="case-anchor" aria-hidden />
        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t(`cs.${k}.id.label`)}</div>
            </div>
            <div className="cs-row-body">
              <p className="prose">{t(`cs.${k}.id.p`)}</p>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t(`cs.${k}.pr.label`)}</div>
            </div>
            <div className="cs-row-body">
              <p className="prose">{t(`cs.${k}.pr.p`)}</p>
            </div>
          </div>
        </div>

        {/* The iteration gallery duplicated this testing narrative.
            Its anchor moves here so proof links keep working. */}
        <div id="iteration-gallery" className="case-anchor" aria-hidden />
        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t(`cs.${k}.te.label`)}</div>
            </div>
            <div className="cs-row-body">
              <p className="prose">{t(`cs.${k}.te.p`)}</p>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t(`cs.${k}.ou.label`)}</div>
            </div>
            <div className="cs-row-body">
              <div className="cs-impact" role="figure" aria-label={t("cs.impactLabel")}>
                <div className="cs-impact-eyebrow">{t("cs.impactLabel")}</div>
                <p className="cs-impact-headline">
                  <span className="cs-impact-num">{t(`cs.${k}.ou.m1.v`)}</span>
                  <span className="cs-impact-label">
                    {t(`cs.${k}.ou.m1.label`)}
                  </span>
                </p>
              </div>
              <dl className="cs-metrics">
                {([1, 2, 3] as const).map((i) => {
                  const v = t(`cs.${k}.ou.m${i}.v`);
                  const parts = v.split("→");
                  return (
                    <div key={i}>
                      <dt>{t(`cs.${k}.ou.m${i}.label`)}</dt>
                      <dd>
                        {parts[0]}
                        {parts.length > 1 && <em>→</em>}
                        {parts.slice(1).join("→")}
                      </dd>
                    </div>
                  );
                })}
              </dl>
              <p className="prose">{t(`cs.${k}.ou.p`)}</p>
            </div>
          </div>
        </div>

        {/* The structured interview takeaway duplicated this reflection.
            Its anchor moves here so proof links keep working. */}
        <div id="interview-takeaway" className="case-anchor" aria-hidden />
        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t(`cs.${k}.rf.label`)}</div>
            </div>
            <div className="cs-row-body">
              <p className="prose">{t(`cs.${k}.rf.p`)}</p>
            </div>
          </div>
        </div>

        <div
          id="related-projects"
          className="cs-section cs-related-section"
          style={{ borderTop: "1px solid var(--border)", paddingTop: 48 }}
        >
          <div className="label" style={{ marginBottom: 20 }}>
            {t("cs.related")}
          </div>
          <div className="cs-related">
            <Link
              href={`/projects/${prevSlug}`}
              className="cs-related-card cs-related-prev"
            >
              <div className="cs-related-eyebrow">← {t("cs.prev")}</div>
              <div className="cs-related-viz" aria-hidden>
                <CoverViz slug={prevSlug} />
              </div>
              <div className="cs-related-meta">
                <h4>{t(`proj.${prevSlug}.title`)}</h4>
                <p>{t(`proj.${prevSlug}.sub`)}</p>
              </div>
            </Link>
            <Link
              href={`/projects/${nextSlug}`}
              className="cs-related-card cs-related-next"
            >
              <div className="cs-related-eyebrow">{t("cs.next")} →</div>
              <div className="cs-related-viz" aria-hidden>
                <CoverViz slug={nextSlug} />
              </div>
              <div className="cs-related-meta">
                <h4>{t(`proj.${nextSlug}.title`)}</h4>
                <p>{t(`proj.${nextSlug}.sub`)}</p>
              </div>
            </Link>
          </div>
          <div className="cs-related-foot">
            <Link href="/projects" className="btn btn-ghost">
              ← {t("nav.work")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
