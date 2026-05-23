import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { VizConnect, VizSpectra, VizAI, VizCircles } from "@/components/viz/ProjectViz";
import { CaseInterviewPack } from "@/components/hiring/CaseInterviewPack";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { StructuredData, generateBreadcrumbSchema } from "@/lib/seo";
import { CURRENT_PROJECT_SLUGS, type CurrentProjectSlug } from "@/lib/project-routes";
import {
  getCaseDepth,
  getCaseInterviewPack,
  getCaseInterviewScan,
  getCaseReaderGuide,
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

const PROJECT_LINKS: Record<Slug, ProjectLink[]> = {
  connect: [],
  spectra: [],
  ai: [],
  circles: [],
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
  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale, type: "article" }),
    twitter: buildTwitter({ title, description }),
  };
}

function CoverViz({ slug }: { slug: Slug }) {
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const projectTitle = t(`proj.${k}.title`);
  const proofLocale: ProofLocale = isZh ? "zh" : "en";
  const caseSummary = getCaseSummary(k, proofLocale);
  const caseDepth = getCaseDepth(k, proofLocale);
  const caseInterviewScan = getCaseInterviewScan(k, proofLocale);
  const caseReaderGuide = getCaseReaderGuide(k, proofLocale);
  const caseInterviewPack = getCaseInterviewPack(k, proofLocale);

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
        <nav className="case-reader" aria-label="Case reader">
          <div className="case-reader-head">
            <div className="label">Case reader</div>
            <p>Choose a route, then jump to the proof.</p>
          </div>
          <div className="case-reader-links">
            {caseReaderGuide.sections
              .filter((section) => section.id !== "related-projects")
              .map((section) => (
                <a key={section.id} href={`#${section.id}`}>
                  <span>{section.label}</span>
                  <small>{section.description}</small>
                </a>
              ))}
          </div>
          <div className="case-reader-modes" aria-label="Review modes">
            {caseReaderGuide.modes.map((mode) => {
              const firstAnchor = mode.anchorIds[0];
              return (
                <a key={mode.id} href={`#${firstAnchor}`}>
                  <strong>{mode.label}</strong>
                  <span>{mode.description}</span>
                  <small>
                    {mode.anchorIds
                      .map((anchorId) =>
                        caseReaderGuide.sections.find((section) => section.id === anchorId)?.label
                      )
                      .filter(Boolean)
                      .join(" / ")}
                  </small>
                </a>
              );
            })}
          </div>
          <div className="case-reader-prompts">
            <h2>Ask me about</h2>
            <ul>
              {caseReaderGuide.prompts.map((prompt) => (
                <li key={prompt.question}>
                  <a href={`#${prompt.anchorId}`}>{prompt.question}</a>
                  <p>{prompt.reason}</p>
                </li>
              ))}
            </ul>
          </div>
          <CaseInterviewPack pack={caseInterviewPack} />
        </nav>
        <div id="snapshot" className="case-anchor" aria-hidden />
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
        <div id="interviewer-scan" className="case-anchor" aria-hidden />
        <aside className="case-interview-scan" aria-label="2-minute interviewer scan">
          <div className="case-interview-scan-head">
            <div className="label">2-minute interviewer scan</div>
            <h2>What this case proves</h2>
            <p>{caseInterviewScan.proves}</p>
          </div>
          <div className="case-interview-scan-grid">
            <div>
              <h3>What to inspect</h3>
              <ul>
                {caseInterviewScan.inspect.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Interview questions</h3>
              <ul>
                {caseInterviewScan.questions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Best-fit teams</h3>
              <ul>
                {caseInterviewScan.bestFit.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
        <div id="artifact" className="case-anchor" aria-hidden />
        <figure className="cs-cover">
          <CoverViz slug={k} />
        </figure>
      </section>

      <section className="container case-depth" aria-label="Interview-ready case depth">
        <div id="case-depth-overview" className="case-depth-block case-depth-intro">
          <div>
            <div className="label">Case depth</div>
            <h2>Interview-ready case depth</h2>
          </div>
          <p>
            The following notes make the work easier to inspect in a portfolio
            review: what I chose, what evidence moved the design, what changed
            between iterations, and what still needs validation.
          </p>
        </div>

        <div id="decision-timeline" className="case-depth-block">
          <div className="case-depth-head">
            <div className="label">Decision log</div>
            <h2>Decision timeline</h2>
          </div>
          <ol className="case-decision-list">
            {caseDepth.decisions.map((decision, index) => (
              <li className="case-decision" key={decision.label}>
                <span className="case-depth-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{decision.label}</h3>
                  <dl className="case-depth-dl">
                    <div>
                      <dt>Choice</dt>
                      <dd>{decision.choice}</dd>
                    </div>
                    <div>
                      <dt>Evidence</dt>
                      <dd>{decision.evidence}</dd>
                    </div>
                    <div>
                      <dt>Trade-off</dt>
                      <dd>{decision.tradeoff}</dd>
                    </div>
                    <div>
                      <dt>Impact</dt>
                      <dd>{decision.impact}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div id="evidence-board" className="case-depth-block">
          <div className="case-depth-head">
            <div className="label">Evidence</div>
            <h2>Research evidence board</h2>
          </div>
          <div className="case-evidence-board">
            {caseDepth.evidence.map((item) => (
              <article className="case-evidence-item" key={`${item.method}-${item.question}`}>
                <div className="case-evidence-meta">
                  <span>{item.method}</span>
                  <span>{item.sample}</span>
                </div>
                <h3>{item.question}</h3>
                <dl className="case-depth-dl">
                  <div>
                    <dt>Finding</dt>
                    <dd>{item.finding}</dd>
                  </div>
                  <div>
                    <dt>Design implication</dt>
                    <dd>{item.implication}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>

        <div id="iteration-gallery" className="case-depth-block">
          <div className="case-depth-head">
            <div className="label">Iterations</div>
            <h2>Iteration gallery</h2>
          </div>
          <div className="case-iteration-gallery">
            {caseDepth.iterations.map((iteration) => (
              <article className="case-iteration-item" key={iteration.version}>
                <span>{iteration.version}</span>
                <h3>{iteration.change}</h3>
                <p>{iteration.reason}</p>
                <strong>{iteration.improvement}</strong>
              </article>
            ))}
          </div>
        </div>

        <div id="outcome-limits" className="case-depth-block case-limits">
          <div className="case-depth-head">
            <div className="label">Limits</div>
            <h2>Outcome limits</h2>
          </div>
          <div className="case-limits-grid">
            {caseDepth.limits.map((limit) => (
              <article key={limit.constraint}>
                <h3>{limit.constraint}</h3>
                <dl className="case-depth-dl">
                  <div>
                    <dt>Why it matters</dt>
                    <dd>{limit.whyItMatters}</dd>
                  </div>
                  <div>
                    <dt>Next validation</dt>
                    <dd>{limit.nextValidation}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>

        <div id="interview-takeaway" className="case-depth-block case-takeaway">
          <div>
            <div className="label">Portfolio readout</div>
            <h2>Interview takeaway</h2>
          </div>
          <p>{caseDepth.takeaway}</p>
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
