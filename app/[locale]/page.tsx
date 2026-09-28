import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import { PracticeDeck } from "@/components/hero/PracticeDeck";
import { FeaturedDeck } from "@/components/home/FeaturedDeck";
import {
  VizConnect,
  VizSpectra,
  VizMaze,
  VizHoop,
  VizPricewise,
  VizGapmapper,
  VizRules,
} from "@/components/viz/ProjectViz";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { getAllBlogPosts } from "@/lib/blog";
import {
  getHiringConversion,
  type ProofLocale,
} from "@/lib/portfolio-proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? `${siteConfig.author.nameZh}（${siteConfig.name}）· ${siteConfig.titleZh}`
      : `${siteConfig.name} · ${siteConfig.title}`;
  const description =
    locale === "zh" ? siteConfig.descriptionZh : siteConfig.description;
  return {
    title,
    description,
    alternates: buildAlternates("/", locale),
    openGraph: buildOpenGraph({ title, description, path: "/", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

type ProjKey =
  | "connect"
  | "spectra"
  | "maze"
  | "hoop"
  | "pricewise"
  | "gapmapper"
  | "rules";

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
  const allPosts = await getAllBlogPosts(isZh ? "zh" : "en");
  const latestPosts = allPosts.slice(0, 3);
  const dateLocale = isZh ? "zh-CN" : "en-US";
  const proofLocale: ProofLocale = isZh ? "zh" : "en";
  const hiringConversion = getHiringConversion(proofLocale);

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
            <p className="hero-lede">{t("hero.body")}</p>
            <div className="hero-ctas">
              <Link href="/projects" className="btn btn-primary">
                {t("hero.cta.work")} <span className="arrow">→</span>
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                {t("hero.cta.note")} <span className="arrow">→</span>
              </Link>
            </div>
            <div className="hero-focus-strip" aria-label={isZh ? "当前关注方向" : "Current focus"}>
              <span>{isZh ? "当前关注" : "Current focus"}</span>
              <strong>{isZh ? "UX 研究" : "UX research"}</strong>
              <strong>{isZh ? "交互设计" : "Interaction design"}</strong>
              <strong>{isZh ? "产品清晰度" : "Product clarity"}</strong>
            </div>
          </div>
          <div className="hero-visual">
            <PracticeDeck />
          </div>
        </div>
      </section>

      <section
        className="section container hiring-proof-desk"
        aria-labelledby="hiring-proof-title"
      >
        <div className="hiring-proof-head">
          <div>
            <div className="label">{isZh ? "招聘信号" : "Hiring signal"}</div>
            <h2 id="hiring-proof-title">{hiringConversion.hero.headline}</h2>
            <p className="hiring-proof-status">{hiringConversion.hero.status}</p>
            <p>{hiringConversion.hero.subhead}</p>
          </div>
          <div className="hiring-proof-actions">
            <Link
              href={hiringConversion.closingPrompt.primaryAction.href}
              className="btn btn-primary"
            >
              {hiringConversion.closingPrompt.primaryAction.label}
            </Link>
            <Link
              href={hiringConversion.closingPrompt.secondaryAction.href}
              className="btn btn-ghost"
            >
              {hiringConversion.closingPrompt.secondaryAction.label}
            </Link>
            <Link href="/hire" className="btn btn-ghost">
              {isZh ? "面试判断" : "Interview decision"}
            </Link>
          </div>
        </div>

        <div className="hiring-signal-grid">
          {hiringConversion.signals.map((signal) => (
            <div className="hiring-signal" key={signal.label}>
              <strong>{signal.value}</strong>
              <span>{signal.label}</span>
              <p>{signal.detail}</p>
            </div>
          ))}
        </div>

        <div className="proof-route-board">
          <div className="label">
            {isZh ? "最值得查看的案例" : "Best cases to inspect"}
          </div>
          <div className="proof-route-grid">
            {hiringConversion.proofRoutes.map((route, index) => (
              <Link className="proof-route-card" href={route.href} key={route.href}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{route.audience}</small>
                <h3>{route.title}</h3>
                <p>{route.claim}</p>
                <em>{route.evidence}</em>
              </Link>
            ))}
          </div>
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

        {/* One case at a time, not eight stacked. The stack this replaces ran
            4,560px of identical blocks — giving everything equal weight is the
            same as featuring nothing.

            The first six run in the same order as the portfolio PDF, so a
            recruiter holding both sees one sequence rather than two. That still
            puts MazeRunners first: it is the only case backed by a working
            physical build, so it differentiates hardest against screen-only
            portfolios. Spectra Lens is not in the PDF at all, so it follows
            the six rather than interleaving. Vigil is unlisted (see
            UNLISTED_PROJECT_SLUGS) and has no slot here.

            Every case is still rendered. FeaturedDeck hides the inactive ones
            visually but leaves them in the served HTML, so a crawler still gets
            all seven. */}
        <FeaturedDeck
          labels={{
            prev: t("feat.deckPrev"),
            next: t("feat.deckNext"),
            kbd: t("feat.deckKbd"),
          }}
          items={[
            { key: "maze", n: "01", node: <FeatItem n="01" k="maze" href="/projects/maze" t={t} viz={<VizMaze locale={proofLocale} />} /> },
            { key: "gapmapper", n: "02", node: <FeatItem n="02" k="gapmapper" href="/projects/gapmapper" flip t={t} viz={<VizGapmapper locale={proofLocale} />} /> },
            { key: "connect", n: "03", node: <FeatItem n="03" k="connect" href="/projects/connect" t={t} viz={<VizConnect locale={proofLocale} />} /> },
            { key: "pricewise", n: "04", node: <FeatItem n="04" k="pricewise" href="/projects/pricewise" flip t={t} viz={<VizPricewise locale={proofLocale} />} /> },
            { key: "hoop", n: "05", node: <FeatItem n="05" k="hoop" href="/projects/hoop" t={t} viz={<VizHoop locale={proofLocale} />} /> },
            { key: "rules", n: "06", node: <FeatItem n="06" k="rules" href="/projects/rules" flip t={t} viz={<VizRules locale={proofLocale} />} /> },
            { key: "spectra", n: "07", node: <FeatItem n="07" k="spectra" href="/projects/spectra" t={t} viz={<VizSpectra locale={proofLocale} />} /> },
          ]}
        />
      </section>

      {latestPosts.length > 0 && (
        <section className="section container">
          <div className="feat-head">
            <div>
              <div className="label">{t("home.latest.label")}</div>
              <h2 className="h-display h2">{t("home.latest.title")}</h2>
            </div>
            <Link href="/blog" className="feat-cta">
              {t("home.latest.cta")} <span>→</span>
            </Link>
          </div>
          <div className="latest-list">
            {latestPosts.map((post) => {
              const dateFmt = new Date(post.date).toLocaleDateString(
                dateLocale,
                { year: "numeric", month: "short", day: "numeric" }
              );
              return (
                <Link
                  className="latest-item"
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                >
                  <div className="latest-meta">
                    <span>{dateFmt}</span>
                    <span aria-hidden>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3 className="latest-title">{post.title}</h3>
                  <p className="latest-excerpt">{post.excerpt}</p>
                  {post.tags[0] && (
                    <span className="latest-tag">{post.tags[0]}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      )}

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
