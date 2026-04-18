import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { VizConnect, VizSpectra, VizAI, VizCircles } from "@/components/viz/ProjectViz";

type Slug = "connect" | "spectra" | "ai" | "circles";
const SLUGS: Slug[] = ["connect", "spectra", "ai", "circles"];

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
  return {
    title: t(`proj.${slug}.title`),
    description: t(`proj.${slug}.sub`),
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

  if (k !== "connect") {
    return (
      <main className="page" data-screen-label={`03 Case · ${k}`}>
        <section className="container cs-hero">
          <Link className="cs-back" href="/projects">
            {t("cs.back")}
          </Link>
          <div className="eyebrow" style={{ marginBottom: 12 }}>
            {t(`proj.${k}.kicker`)}
          </div>
          <h1>{t(`proj.${k}.title`)}</h1>
          <p className="sub">{t(`proj.${k}.sub`)}</p>
          <dl className="cs-meta">
            <div>
              <dt>{t("cs.role")}</dt>
              <dd>{t(`proj.${k}.role`)}</dd>
            </div>
            <div>
              <dt>{t("cs.time")}</dt>
              <dd>{t(`proj.${k}.date`)}</dd>
            </div>
            <div>
              <dt>{t("cs.team")}</dt>
              <dd>—</dd>
            </div>
            <div>
              <dt>{t("cs.tools")}</dt>
              <dd>Figma · Framer</dd>
            </div>
          </dl>
          <figure className="cs-cover">
            <CoverViz slug={k} />
          </figure>
          <div style={{ padding: "64px 0", textAlign: "center" }}>
            <div
              className="hand"
              style={{ fontSize: 28, display: "block", marginBottom: 16 }}
            >
              {isZh ? "完整案例研究正在写。" : "Full case study in progress."}
            </div>
            <p className="prose" style={{ margin: "0 auto" }}>
              {isZh
                ? "UQ Connect 是完整版参考 —— 本篇会沿用同一结构：问题、研究、综合、IA、原型、测试、成果、反思。"
                : "See UQ Connect for the full treatment — same structure will apply here: challenge, research, synthesis, IA, prototype, test, outcome, reflection."}
            </p>
            <div style={{ marginTop: 32 }}>
              <Link href="/projects/connect" className="btn btn-primary">
                {isZh ? "阅读 UQ Connect →" : "Read UQ Connect →"}
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page" data-screen-label="03 Case · connect">
      <section className="container cs-hero">
        <Link className="cs-back" href="/projects">
          {t("cs.back")}
        </Link>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          {t("proj.connect.kicker")}
        </div>
        <h1>{t("cs.hero.title")}</h1>
        <p className="sub">{t("cs.hero.sub")}</p>
        <dl className="cs-meta">
          <div>
            <dt>{t("cs.role")}</dt>
            <dd>{t("cs.roleVal")}</dd>
          </div>
          <div>
            <dt>{t("cs.time")}</dt>
            <dd>{t("cs.timeVal")}</dd>
          </div>
          <div>
            <dt>{t("cs.team")}</dt>
            <dd>{t("cs.teamVal")}</dd>
          </div>
          <div>
            <dt>{t("cs.tools")}</dt>
            <dd>{t("cs.toolsVal")}</dd>
          </div>
        </dl>
        <figure className="cs-cover">
          <VizConnect />
        </figure>
      </section>

      <section className="container">
        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t("cs.ch.label")}</div>
            </div>
            <div className="cs-row-body">
              <h2>{t("cs.ch.title")}</h2>
              <p className="prose">{t("cs.ch.p")}</p>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t("cs.re.label")}</div>
            </div>
            <div className="cs-row-body">
              <h2>{t("cs.re.title")}</h2>
              <div className="cs-method-grid">
                {([1, 2, 3] as const).map((i) => (
                  <div key={i}>
                    <h5>{t(`cs.re.m${i}.t`)}</h5>
                    <p>{t(`cs.re.m${i}.b`)}</p>
                  </div>
                ))}
              </div>
              <div className="quote" style={{ marginTop: 32, maxWidth: "36em" }}>
                <p>{t("cs.re.quote")}</p>
                <cite>— {t("cs.re.quoteWho")}</cite>
              </div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t("cs.sy.label")}</div>
            </div>
            <div className="cs-row-body">
              <h2>{t("cs.sy.title")}</h2>
              <p className="prose">{t("cs.sy.p")}</p>
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
            </div>
          </div>
        </div>

        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t("cs.id.label")}</div>
            </div>
            <div className="cs-row-body">
              <p className="prose">{t("cs.id.p")}</p>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t("cs.pr.label")}</div>
            </div>
            <div className="cs-row-body">
              <p className="prose">{t("cs.pr.p")}</p>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t("cs.te.label")}</div>
            </div>
            <div className="cs-row-body">
              <p className="prose">{t("cs.te.p")}</p>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t("cs.ou.label")}</div>
            </div>
            <div className="cs-row-body">
              <dl className="cs-metrics">
                {([1, 2, 3] as const).map((i) => {
                  const v = t(`cs.ou.m${i}.v`);
                  const parts = v.split("→");
                  return (
                    <div key={i}>
                      <dt>{t(`cs.ou.m${i}.label`)}</dt>
                      <dd>
                        {parts[0]}
                        {parts.length > 1 && <em>→</em>}
                        {parts.slice(1).join("→")}
                      </dd>
                    </div>
                  );
                })}
              </dl>
              <p className="prose">{t("cs.ou.p")}</p>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side">
              <div className="label">{t("cs.rf.label")}</div>
            </div>
            <div className="cs-row-body">
              <p className="prose">{t("cs.rf.p")}</p>
            </div>
          </div>
        </div>

        <div
          className="cs-section"
          style={{ borderTop: "1px solid var(--border)", paddingTop: 48 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <Link href="/projects" className="btn btn-ghost">
              ← {t("nav.work")}
            </Link>
            <Link href="/projects/spectra" className="btn btn-primary">
              {t("cs.next")} · Spectra Lens →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
