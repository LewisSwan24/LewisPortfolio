import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { SectionReveal } from "@/components/motion/SectionReveal";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const locale = (await getLocale()) as "en" | "zh";
  const title = t("about.kicker");
  const description = t("about.p1");
  return {
    title,
    description,
    alternates: buildAlternates("/about", locale),
    openGraph: buildOpenGraph({ title, description, path: "/about", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function AboutPage() {
  const t = await getTranslations();
  const locale = await getLocale();
  const isZh = locale === "zh";

  const tlRows: Array<{ y: string; k: "y2026" | "y2025" | "y2024" | "y2020" }> = [
    { y: "2026", k: "y2026" },
    { y: "2025", k: "y2025" },
    { y: "2024", k: "y2024" },
    { y: "2020–24", k: "y2020" },
  ];

  return (
    <main className="page" data-screen-label="04 About">
      <section className="container about-hero">
        <div className="label">{t("about.kicker")}</div>
        <h1 className="h-display h1" style={{ marginTop: 16 }}>
          {isZh ? (
            <>
              我做的是「让<em>人</em>能找到路」的数字产品。
            </>
          ) : (
            <>
              I make digital things <em>people</em> can actually find their way through.
            </>
          )}
        </h1>
        <div className="about-actions">
          <Link href="/resume" className="btn btn-primary">
            {t("about.cv")} <span className="arrow">↓</span>
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            {t("hero.cta.note")}
          </Link>
        </div>
      </section>

      <section className="container">
        <div className="about-grid">
          <div className="about-prose">
            <p className="prose">{t("about.p1")}</p>
            <p className="prose">{t("about.p2")}</p>
            <p className="prose">{t("about.p3")}</p>
          </div>
          <aside className="about-side">
            <div className="label">{t("about.tl.label")}</div>
            <div className="about-tl" style={{ marginTop: 16 }}>
              {tlRows.map((row) => (
                <div className="about-tl-row" key={row.k}>
                  <div className="y">{row.y}</div>
                  <div className="t">{t(`about.tl.${row.k}`)}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="container section about-workflow-section" aria-labelledby="about-workflow-heading">
        <div className="about-workflow-head">
          <div className="label">{isZh ? "协作边界" : "Working loop"}</div>
          <h2 id="about-workflow-heading" className="h-display h2" style={{ marginTop: 12 }}>
            {isZh ? "我自己定规则，代理负责跑通实现，测试守住边界。" : "I own the spec and the judgment; agents draft the code; tests guard the edges."}
          </h2>
        </div>

        <ol className="about-loop-rail" aria-label={isZh ? "从研究到验收的四步循环" : "Four-step build loop"}>
          {(
            isZh
              ? [
                  { n: "01", t: "书面规格", d: "先写清楚场景假设、权限与停机规则，再决定界面长什么样。" },
                  { n: "02", t: "代理协作", d: "用 Claude Code / Codex 把结构落成可运行原型，而非停在静态线框。" },
                  { n: "03", t: "自动化门禁", d: "单元测试、红线拦截、硬件串口/屏幕场景脚本替代纯口头判断。" },
                  { n: "04", t: "诚实复盘", d: "实测没跑的部分直接标明空白，不拿模拟日志冒充真实用户。" },
                ]
              : [
                  { n: "01", t: "Written spec", d: "Pin down user tensions, safety invariants, and failure states before visual polish." },
                  { n: "02", t: "Agent-assisted build", d: "Use Claude Code and Codex to reach real interactive builds faster than mockups alone." },
                  { n: "03", t: "Reproducible gates", d: "Back every invariant with automated red-line checks, offline suites, or device scenes." },
                  { n: "04", t: "Honest scope", d: "Document where participant testing has not run yet instead of hiding gaps behind polish." },
                ]
          ).map((step) => (
            <li className="about-loop-step" key={step.n}>
              <span>{step.n}</span>
              <h3>{step.t}</h3>
              <p>{step.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container section">
        <div className="label">{t("about.philo.label")}</div>
        <SectionReveal>
          <div className="about-philo" style={{ marginTop: 24 }}>
            {([1, 2, 3, 4] as const).map((i) => (
              <div className="about-philo-item" key={i} data-reveal-item>
                <h4>{t(`about.philo.${i}.t`)}</h4>
                <p>{t(`about.philo.${i}.b`)}</p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>
    </main>
  );
}
