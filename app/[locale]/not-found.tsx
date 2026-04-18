import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations();

  const quick = [
    { href: "/", label: t("nav.home") },
    { href: "/projects", label: t("nav.projects") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
    { href: "/resume", label: t("nav.resume") },
  ];

  return (
    <main className="page" data-screen-label="— 404">
      <section className="container cs-hero">
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          {t("notFound.kicker")}
        </div>
        <h1>{t("notFound.title")}</h1>
        <p className="sub">{t("notFound.description")}</p>

        <div
          className="hand"
          style={{ fontSize: 28, display: "inline-block", marginBottom: 32 }}
        >
          {t("notFound.hand")}
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-primary">
            {t("notFound.goHome")} <span className="arrow">→</span>
          </Link>
          <Link href="/projects" className="btn btn-ghost">
            {t("notFound.viewProjects")}
          </Link>
        </div>

        <div
          style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="label" style={{ marginBottom: 20 }}>
            {t("notFound.tryPopular")}
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            {quick.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="tag">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
