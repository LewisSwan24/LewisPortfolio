import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { CaseInterviewPack } from "@/components/hiring/CaseInterviewPack";
import { DemoEmbed } from "@/components/case/DemoEmbed";
import { CaseInvariantLink, isLabLinkedCase } from "@/components/case/CaseInvariantLink";
import { CaseMediaGallery } from "@/components/case/CaseMediaGallery";
import { CaseSummaryBlock } from "@/components/case/CaseSummaryBlock";
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

  const pageCopy = isZh
    ? {
        coverCaption:
          "概念视觉图。真实证据、方法、指标和限制写在案例摘要与下方深度说明中。",
        caseDepthAria: "面试可用的案例深度",
        limitsLabel: "限制",
        outcomeLimits: "结果限制",
        whyItMatters: "为什么重要",
        nextValidation: "下一步验证",
      }
    : {
        coverCaption:
          "Concept visual. The evidence, methods, metrics, and limits are documented in the case summary and depth sections.",
        caseDepthAria: "Interview-ready case depth",
        limitsLabel: "Limits",
        outcomeLimits: "Outcome limits",
        whyItMatters: "Why it matters",
        nextValidation: "Next validation",
      };

  const jumpSections = [
    ["outcome-limits", pageCopy.outcomeLimits],
    ["long-form", narrative.ch.label],
    ["evidence-board", narrative.re.label],
    ["decision-timeline", narrative.id.label],
    ["iteration-gallery", narrative.te.label],
    ["interview-takeaway", narrative.rf.label],
  ] as const;

  return (
    <main className="page" data-screen-label={`03 Case · ${k}`}>
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: t("nav.home"), url: siteUrl },
          { name: t("nav.projects"), url: `${siteUrl}/projects` },
          { name: card.title, url: `${siteUrl}/projects/${k}` },
        ])}
      />
      <section className="container cs-hero">
        <Breadcrumb
          className="cs-breadcrumb"
          locale={locale}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.projects"), href: "/projects" },
            { label: card.title },
          ]}
        />
        <Link className="cs-back" href="/projects">
          {t("cs.back")}
        </Link>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          {card.kicker}
        </div>
        <h1>{narrative.hero.title}</h1>
        <p className="sub">{narrative.hero.sub}</p>
        {isUnlistedProject(k) && (
          <p className="sub" role="note" style={{ fontWeight: 600 }}>
            {isZh
              ? "这个项目已于 2026-09-23 放弃：评估协议写完了，受试实验从未运行，所以这一页没有任何受试者数据。"
              : "I abandoned this project on 23 Sep 2026. The evaluation protocol was finished and the participant study never ran, so this page holds no participant data."}
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

        <CaseInterviewPack pack={caseInterviewPack} locale={proofLocale} />

        <CaseSummaryBlock
          slug={k}
          locale={proofLocale}
          summary={caseSummary}
          coverCaption={pageCopy.coverCaption}
        />
      </section>

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
        <CaseNarrative
          slug={k}
          narrative={narrative}
          impactLabel={t("cs.impactLabel")}
          isZh={isZh}
        />

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
