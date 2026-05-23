import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { PracticeDeck } from "@/components/hero/PracticeDeck";
import { HiringRoleFitPanel } from "@/components/hiring/HiringRoleFitPanel";
import { VizConnect, VizSpectra, VizAI, VizCircles } from "@/components/viz/ProjectViz";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { getAllBlogPosts } from "@/lib/blog";
import { getProofUiLabels } from "@/lib/proof";
import {
  getCapabilityPillars,
  getCareerSnapshot,
  getHiringConversion,
  getHiringPaths,
  getHiringRoleFits,
  type ProofLocale,
} from "@/lib/portfolio-proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "董宇哲 Lewis · 交互设计 / UX 设计师"
      : `${siteConfig.name} · ${siteConfig.title}`;
  const description =
    locale === "zh"
      ? "昆士兰大学交互设计硕士在读，常驻布里斯班。通过可用性测试、AI 工具、原型设计与可访问性打造以研究驱动的体验。"
      : siteConfig.description;
  return {
    title,
    description,
    alternates: buildAlternates("/", locale),
    openGraph: buildOpenGraph({ title, description, path: "/", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

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
  const allPosts = await getAllBlogPosts();
  const latestPosts = allPosts.slice(0, 3);
  const dateLocale = isZh ? "zh-CN" : "en-US";
  const proofLocale: ProofLocale = isZh ? "zh" : "en";
  const snapshot = getCareerSnapshot(proofLocale);
  const pillars = getCapabilityPillars(proofLocale);
  const hiringPaths = getHiringPaths(proofLocale);
  const hiringConversion = getHiringConversion(proofLocale);
  const roleFits = getHiringRoleFits(proofLocale);
  const proofLabels = getProofUiLabels(proofLocale);

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
            <div className="label">Hiring signal</div>
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
              Interview decision
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
          <div className="label">Best cases to inspect</div>
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
        <HiringRoleFitPanel
          roles={roleFits}
          title="Match the opening to the strongest proof."
          intro="Pick the role signal first, then inspect the exact case evidence."
          labels={proofLabels}
        />
      </section>

      <section className="section container proof-front-door">
        <div className="proof-intro">
          <div className="label">{isZh ? "证据概览" : "Evidence at a glance"}</div>
          <h2 className="h-display h2">{snapshot.headline}</h2>
          <p className="prose">{snapshot.summary}</p>
          <p className="proof-status">{snapshot.status}</p>
        </div>

        <div className="proof-stats" aria-label={isZh ? "作品集证据数据" : "Portfolio evidence stats"}>
          {snapshot.stats.map((stat) => (
            <div className="proof-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
              <p>{stat.detail}</p>
            </div>
          ))}
        </div>

        <div className="capability-map" aria-labelledby="capability-map-title">
          <div>
            <div className="label">{isZh ? "能力地图" : "Capability map"}</div>
            <h3 id="capability-map-title">{isZh ? "从研究到交付的证据路径" : "Proof paths from research to delivery"}</h3>
          </div>
          <div className="capability-list">
            {pillars.map((pillar, index) => (
              <Link className="capability-card" href={pillar.href} key={pillar.id}>
                <span className="capability-index">{String(index + 1).padStart(2, "0")}</span>
                <h4>{pillar.title}</h4>
                <p>{pillar.summary}</p>
                <small>{pillar.proof}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container hiring-guide">
        <div className="hiring-guide-head">
          <div>
            <div className="label">{isZh ? "招聘方阅读路径" : "Start here if you are hiring"}</div>
            <h2>{isZh ? "按你有的时间，直接进入对应证明。" : "Use the portfolio at the speed you actually have."}</h2>
          </div>
          <p>
            {isZh
              ? "这不是一条固定浏览路线，而是给招聘方和设计经理的快速入口。你可以先扫信号，也可以直接打开最相关的案例。"
              : "This is a practical route map for recruiters and design managers: skim the signal, inspect the strongest proof, or read the craft in depth."}
          </p>
        </div>
        <div className="hiring-guide-list">
          {hiringPaths.map((path, index) => (
            <Link className="hiring-guide-item" href={path.href} key={path.time}>
              <span className="hiring-guide-index">{String(index + 1).padStart(2, "0")}</span>
              <strong>{path.time}</strong>
              <h3>{path.title}</h3>
              <p>{path.action}</p>
            </Link>
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
