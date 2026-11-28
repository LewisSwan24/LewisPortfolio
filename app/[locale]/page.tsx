import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { PracticeDeck } from "@/components/hero/PracticeDeck";
import { ManuscriptReveal } from "@/components/motion/ManuscriptReveal";
import { VizMaze } from "@/components/viz/ProjectViz";
import { ProjectCoverImage } from "@/components/viz/ProjectCoverImage";
import { getProjectCover } from "@/lib/project-covers";
import { getCaseCard, getFeaturedDeckCases } from "@/lib/cases/registry";
import type { CurrentProjectSlug } from "@/lib/project-routes";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { getAllBlogPosts } from "@/lib/blog";
import type { ProofLocale } from "@/lib/portfolio-proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? `${siteConfig.author.nameZh}（${siteConfig.name}）· ${siteConfig.titleZh}`
      : `${siteConfig.name} · ${siteConfig.title}`;
  const description =
    locale === "zh" ? siteConfig.descriptionZh : siteConfig.description;
  return {
    // absolute: the title already names Lewis, so skip the layout's "| Lewis Dong".
    title: { absolute: title },
    description,
    alternates: buildAlternates("/", locale),
    openGraph: buildOpenGraph({ title, description, path: "/", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

type ProjKey = CurrentProjectSlug;

function FeatCard({ n, k, href, priority = false, viz, t, locale, externalLinks }: {
  externalLinks: ReadonlyArray<{ label: string; labelZh?: string; href: string; external?: boolean }>;
  n: string;
  k: CurrentProjectSlug;
  href: string;
  priority?: boolean;
  viz?: React.ReactNode;
  t: Awaited<ReturnType<typeof getTranslations>>;
  locale: ProofLocale;
}) {
  const cover = getProjectCover(k);
  const card = getCaseCard(k, locale);
  const localizedExternalLabel = (link: { label: string; labelZh?: string }) =>
    locale === "zh" && link.labelZh ? link.labelZh : link.label;
  return (
    <article className="feat-card">
      <TransitionLink href={href} className="feat-card-link" data-vt-media>
        <span className={`feat-card-visual${cover ? " has-cover" : ""}`}>
          <span className="num" aria-hidden="true">{n}</span>
          {cover ? (
            <ProjectCoverImage
              cover={cover}
              locale={locale}
              sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 420px"
              priority={priority}
            />
          ) : (
            viz
          )}
        </span>
        <span className="eyebrow">{card.kicker}</span>
        <span className="feat-card-title" data-vt-title>{card.title}</span>
        <span className="feat-card-sub">{card.sub}</span>
        <span className="feat-card-meta">
          {card.role} · {card.date}
        </span>
        <span className="feat-card-cta">
          {t("common.viewCaseStudy")} <span aria-hidden="true">→</span>
        </span>
      </TransitionLink>
      {externalLinks.length > 0 ? (
        <div className="feat-actions">
          {externalLinks.map((ext) => (
            <a
              key={ext.href}
              href={ext.href}
              target="_blank"
              rel="noopener noreferrer"
              className="feat-ext-link"
            >
              {localizedExternalLabel(ext)} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      ) : null}
    </article>
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

  return (
    <main className="page v4-home" data-screen-label="01 Home · V4 Studio">
      <section className="hero container">
        <div className="v4-editorial-grid" style={{ alignItems: "center" }}>
          <div className="hero-text v4-span-5">
            <div className="eyebrow">{t("hero.eyebrow")}</div>
            <h1 className="h-display h1">
              {t.rich("hero.headline.a", { nobr: (c) => <span className="nobr">{c}</span> })}{" "}
              <br />{" "}
              <em>{t.rich("hero.headline.b", { nobr: (c) => <span className="nobr">{c}</span> })}</em>{" "}
              <br />{" "}
              {t("hero.headline.c")}
            </h1>
            <p className="hero-lede">{t("hero.body")}</p>
            <div className="hero-ctas">
              <Link href="/projects" className="btn btn-primary">
                {t("hero.cta.work")} <span className="arrow">→</span>
              </Link>
              <Link href="/ai" className="btn btn-ghost">
                {isZh ? "AI 实验室" : "AI Lab"} <span className="arrow">→</span>
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                {t("hero.cta.note")} <span className="arrow">→</span>
              </Link>
            </div>
            <div className="hero-focus-strip" aria-label={isZh ? "招聘与简历及快捷入口" : "Hire & CV and quick links"}>
              <span>{isZh ? "教育经历 · 技能" : "Education · Skills"}</span>
              <strong>
                {isZh
                  ? "斯旺西 CS 本科 (2:1) × UQ 交互硕士 (2026.11 毕业)"
                  : "Swansea CS BSc (2:1) × UQ IxD Master (Nov 2026)"}
              </strong>
              <strong>
                {isZh
                  ? "TypeScript · Electron · ESP32 · 可验证真实原型"
                  : "TypeScript · Electron · ESP32 · Testable builds"}
              </strong>
              <strong>
                {isZh
                  ? "布里斯班基地 · 面向澳新全职（可搬迁/远程）及亚太团队"
                  : "Brisbane · AU & APAC Full-Time Roles"}
              </strong>
              <div className="hero-hr-links">
                <a
                  href={`/resume/lewis-dong-resume-${proofLocale}.pdf`}
                  download
                  className="hero-pdf-link"
                >
                  {isZh ? "PDF 简历 ↗" : "PDF CV ↗"}
                </a>
                <Link href="/hire" className="hero-hire-link">
                  {isZh ? "招聘与简历 ↗" : "Hire & CV ↗"}
                </Link>
              </div>
            </div>
          </div>
          <div className="hero-visual v4-span-7 v4-studio-plate">
            <PracticeDeck />
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

        {/* v6.4: all six cases at once. The carousel showed one at a time, so a
            recruiter needed five clicks to see what Lewis has built. */}
        <ol className="feat-grid">
          {getFeaturedDeckCases().map((record, index) => (
            <li key={record.slug}>
              <FeatCard
                n={String(index + 1).padStart(2, "0")}
                k={record.slug}
                href={`/projects/${record.slug}`}
                priority={index < 3}
                t={t}
                locale={proofLocale}
                viz={record.slug === "maze" ? <VizMaze locale={proofLocale} /> : undefined}
                externalLinks={record.links.filter((l) => l.external)}
              />
            </li>
          ))}
        </ol>
      </section>

      <section className="section container">
        <div className="v4-editorial-grid">
          <div className="approach-text v4-span-4 v4-rail-sticky">
            <div className="label">{t("approach.label")}</div>
            <h2 className="h-display h2">
              {t("approach.title.text")} <em>{t("approach.title.em")}</em>
            </h2>
            <p className="prose">{t("approach.body")}</p>
          </div>
          <div className="v4-span-8">
            <ManuscriptReveal withHairline itemSelector="[data-reveal-item]">
              <div className="approach-steps">
                {[1, 2, 3, 4].map((i) => (
                  <div className="approach-step" key={i} data-reveal-item="">
                    <div className="num">0{i}</div>
                    <h3>{t(`approach.step.${i}.t`)}</h3>
                    <p>{t(`approach.step.${i}.b`)}</p>
                  </div>
                ))}
              </div>
            </ManuscriptReveal>
          </div>
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
                ? "每一封真切来信，48 小时内必回；可直发邮件或填写联系页速写表单。"
                : "Write directly or use the quick note form on /contact — I reply within 48 hours."}
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
