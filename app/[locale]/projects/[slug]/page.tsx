import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { VizConnect, VizSpectra, VizAI, VizCircles } from "@/components/viz/ProjectViz";

type Slug = "connect" | "spectra" | "ai" | "circles";
const SLUGS: Slug[] = ["connect", "spectra", "ai", "circles"];

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

  return (
    <main className="page" data-screen-label={`03 Case · ${k}`}>
      <section className="container cs-hero">
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
        <figure className="cs-cover">
          <CoverViz slug={k} />
        </figure>
      </section>

      <section className="container">
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
