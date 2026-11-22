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
        <div className="v4-editorial-grid">
          <div className="about-prose v4-span-8">
            <p className="prose">{t("about.p1")}</p>
            <p className="prose">{t("about.p2")}</p>
            <p className="prose">{t("about.p3")}</p>
          </div>
          <aside className="about-side v4-span-4 v4-rail-sticky v4-studio-plate">
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
          <div className="label">{isZh ? "论证立场与协作边界" : "Design stance & working loop"}</div>
          <h2 id="about-workflow-heading" className="h-display h2" style={{ marginTop: 12 }}>
            {isZh
              ? "先替人写清交互规则与拒答边界，再让代码与原型去撞真实摩擦。"
              : "I define the human rule and refusal boundary first; prototypes exist to test where it holds."}
          </h2>
        </div>

        <ol className="about-loop-rail" aria-label={isZh ? "从人的摩擦到诚实边界的四步循环" : "Four-step rationale and build loop"}>
          {(
            isZh
              ? [
                  { n: "01", t: "找准人的摩擦", d: "先识别打扰注意力、引发误触风险或让人尴尬的真实场景，再决定界面长什么样。" },
                  { n: "02", t: "明示设计取舍", d: "写清否决了哪几种看似顺滑但伤害用户掌控感的备选路径。" },
                  { n: "03", t: "真原型压测", d: "用软件或硬件实体搭配自动化门禁跑到可测保真度，不止于口头讲故事。" },
                  { n: "04", t: "诚实标注空白", d: "实测没跑的部分直接标明，不拿离线模拟或自我体验冒充外部真实研究。" },
                ]
              : [
                  { n: "01", t: "Human friction first", d: "Pin down attention overload, error cost, and social discomfort before choosing visual components." },
                  { n: "02", t: "Explicit tradeoffs", d: "Write out the tempting alternatives that had to be rejected so the user keeps legible control." },
                  { n: "03", t: "Falsifiable prototypes", d: "Ship software or physical builds backed by automated gates so rules are tested in motion." },
                  { n: "04", t: "Honest scope", d: "Keep verified behavior distinct from what still waits for outside participant testing." },
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
