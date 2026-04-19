import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const locale = (await getLocale()) as "en" | "zh";
  const title = t("contact.kicker");
  const description = t("contact.body");
  return {
    title,
    description,
    alternates: buildAlternates("/contact", locale),
    openGraph: buildOpenGraph({ title, description, path: "/contact", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function ContactPage() {
  const t = await getTranslations();
  const locale = await getLocale();
  const isZh = locale === "zh";
  const email = t("contact.email");

  return (
    <main className="page" data-screen-label="06 Contact">
      <section className="container contact-hero">
        <div className="label">{t("contact.kicker")}</div>
        <h1 className="h-display h1" style={{ marginTop: 16 }}>
          {isZh ? (
            <>
              最短的路径，<em>就是直接那一条。</em>
            </>
          ) : (
            <>
              The shortest path is the <em>direct</em> one.
            </>
          )}
        </h1>
        <p className="prose" style={{ marginTop: 32 }}>
          {t("contact.body")}
        </p>

        <div className="contact-card">
          <div>
            <div className="label" style={{ marginBottom: 24 }}>
              Email
            </div>
            <a className="contact-big-link" href={`mailto:${email}`}>
              {email}
            </a>
            <div style={{ marginTop: 32 }}>
              <div className="label" style={{ marginBottom: 16 }}>
                {isZh ? "别处" : "Elsewhere"}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gap: 10,
                  fontFamily: "var(--font-ui)",
                  fontSize: 15,
                }}
              >
                <li>
                  <a
                    href="https://www.linkedin.com/in/lewis-dong"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--text)",
                      textDecoration: "none",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    LinkedIn · lewis-dong
                  </a>
                </li>
                <li>
                  <a
                    href="https://read.cv/lewisdong"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--text)",
                      textDecoration: "none",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    Read.cv · lewisdong
                  </a>
                </li>
                <li>
                  <a
                    href="https://calendly.com/lewisdong"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--text)",
                      textDecoration: "none",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {t("contact.cal")} · calendly.com/lewisdong
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="contact-fit">
            <h4 className="ok">{t("contact.fit.label")}</h4>
            <ul>
              <li>{t("contact.fit.1")}</li>
              <li>{t("contact.fit.2")}</li>
              <li>{t("contact.fit.3")}</li>
            </ul>
            <h4 className="no">{t("contact.notfit.label")}</h4>
            <ul>
              <li>{t("contact.notfit.1")}</li>
              <li>{t("contact.notfit.2")}</li>
              <li>{t("contact.notfit.3")}</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
