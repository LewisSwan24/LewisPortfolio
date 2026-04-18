import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { PracticeDeck } from "@/components/hero/PracticeDeck";
import { VizConnect, VizSpectra, VizAI, VizCircles } from "@/components/viz/ProjectViz";

type ProjKey = "connect" | "spectra" | "ai" | "circles";

interface FeatItemProps {
  n: string;
  k: ProjKey;
  href: string;
  flip?: boolean;
  viz: React.ReactNode;
  t: Awaited<ReturnType<typeof getTranslations>>;
}

function FeatItem({ n, k, href, flip, viz, t }: FeatItemProps) {
  return (
    <Link
      className={`feat-item ${flip ? "flip" : ""}`}
      href={href}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="feat-visual">
        <span className="num">{n}</span>
        {viz}
      </div>
      <div className="feat-body">
        <div className="eyebrow">{t(`proj.${k}.kicker`)}</div>
        <h3>{t(`proj.${k}.title`)}</h3>
        <p className="sub">{t(`proj.${k}.sub`)}</p>
        <dl className="feat-meta">
          <dt>{t("cs.role")}</dt>
          <dd>{t(`proj.${k}.role`)}</dd>
          <dt>{t("cs.time")}</dt>
          <dd>{t(`proj.${k}.date`)}</dd>
        </dl>
        <div className="feat-metrics">
          <span className="m">{t(`proj.${k}.m1`)}</span>
          <span className="m">{t(`proj.${k}.m2`)}</span>
          <span className="m">{t(`proj.${k}.m3`)}</span>
        </div>
        <span className="feat-cta">
          {t("feat.footer")} <span>→</span>
        </span>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const t = await getTranslations();
  const locale = await getLocale();
  const isZh = locale === "zh";

  return (
    <main className="page" data-screen-label="01 Home">
      <section className="hero container">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="eyebrow">{t("hero.eyebrow")}</div>
            <h1 className="h-display h1">
              {t("hero.headline.a")}
              <br />
              <em>{t("hero.headline.b")}</em>
              <br />
              {t("hero.headline.c")}
            </h1>
            <div className="hero-ctas">
              <Link href="/projects" className="btn btn-primary">
                {t("hero.cta.work")} <span className="arrow">→</span>
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                {t("hero.cta.note")}
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <PracticeDeck />
          </div>
        </div>
      </section>

      <section className="container">
        <div className="now">
          <div className="now-label">
            <span className="dot" />
            <span className="text">{t("now.label")}</span>
          </div>
          {(["reading", "building", "learning", "location"] as const).map((k) => (
            <div className="now-item" key={k}>
              <h4>{t(`now.${k}.label`)}</h4>
              <p>{t(`now.${k}.val`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="approach">
          <div className="approach-text">
            <div className="label">{t("approach.label")}</div>
            <h2 className="h-display h2">
              {t("approach.title.text")} <em>{t("approach.title.em")}</em>
            </h2>
            <p className="prose">{t("approach.body")}</p>
          </div>
          <div className="approach-steps">
            {[1, 2, 3, 4].map((i) => (
              <div className="approach-step" key={i}>
                <div className="num">0{i}</div>
                <h4>{t(`approach.step.${i}.t`)}</h4>
                <p>{t(`approach.step.${i}.b`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="feat-head">
          <div>
            <div className="label">{t("feat.label")}</div>
            <h2 className="h-display h2">{t("feat.title")}</h2>
          </div>
          <Link href="/projects" className="feat-cta">
            {t("feat.footer")} <span>→</span>
          </Link>
        </div>

        <div className="feat-list">
          <FeatItem n="01" k="connect" href="/projects/connect" t={t} viz={<VizConnect />} />
          <FeatItem n="02" k="spectra" href="/projects/spectra" flip t={t} viz={<VizSpectra />} />
          <FeatItem n="03" k="ai" href="/projects/ai" t={t} viz={<VizAI />} />
          <FeatItem n="04" k="circles" href="/projects/circles" flip t={t} viz={<VizCircles />} />
        </div>
      </section>

      <section className="container">
        <div className="end-cta">
          <h3 className="h-display">
            {isZh ? (
              <>
                觉得我们<em>可能合得来？</em>
              </>
            ) : (
              <>
                Think we&apos;d be <em>useful to each other?</em>
              </>
            )}
          </h3>
          <div>
            <p className="prose" style={{ marginBottom: 24 }}>
              {isZh
                ? "每一封真实的邮件，48 小时内必回。没有表单，也没有过滤器。"
                : "I reply to every real email within 48 hours. No form, no filter."}
            </p>
            <Link href="/contact" className="btn btn-primary">
              {t("hero.cta.note")} <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
