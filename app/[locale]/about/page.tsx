import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "About",
  description: "UX designer and Interaction Design master's candidate at UQ.",
};

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

      <section className="container section">
        <div className="label">{t("about.philo.label")}</div>
        <div className="about-philo" style={{ marginTop: 24 }}>
          {([1, 2, 3, 4] as const).map((i) => (
            <div className="about-philo-item" key={i}>
              <h4>{t(`about.philo.${i}.t`)}</h4>
              <p>{t(`about.philo.${i}.b`)}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
