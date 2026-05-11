import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { ContactRoleContext } from "@/components/hiring/ContactRoleContext";
import { FollowThroughContactContext } from "@/components/hiring/FollowThroughComponents";
import { HiringRoleFitPanel } from "@/components/hiring/HiringRoleFitPanel";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getProofUiLabels } from "@/lib/proof";
import {
  getHiringConversion,
  getHiringRoleFits,
  getRoleFit,
  type ProofLocale,
} from "@/lib/portfolio-proof";

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

interface ContactPageProps {
  searchParams?: Promise<{ role?: string; intent?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const t = await getTranslations();
  const locale = await getLocale();
  const isZh = locale === "zh";
  const query = await searchParams;
  const email = t("contact.email");
  const proofLocale: ProofLocale = isZh ? "zh" : "en";
  const roleFit = getRoleFit(proofLocale);
  const hiringRoleFits = getHiringRoleFits(proofLocale);
  const hiringConversion = getHiringConversion(proofLocale);
  const proofLabels = getProofUiLabels(proofLocale);

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

        <ContactRoleContext role={query?.role} locale={proofLocale} />
        <FollowThroughContactContext
          role={query?.role}
          intent={query?.intent}
          locale={proofLocale}
          labels={proofLabels}
        />

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

        <section className="contact-use" aria-labelledby="contact-use-title">
          <div>
            <div className="label">{isZh ? "使用方式" : "Use this portfolio for"}</div>
            <h2 id="contact-use-title">
              {isZh ? "快速判断我是否适合你的 UX / Product Design 团队。" : "Quickly decide whether I fit your UX or product design team."}
            </h2>
            <p>{roleFit.availability}</p>
          </div>
          <div className="contact-use-body">
            <div className="role-fit-tags">
              {roleFit.roles.map((role) => (
                <span className="tag" key={role}>
                  {role}
                </span>
              ))}
            </div>
            <ul className="role-fit-list">
              {roleFit.bestFit.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="contact-use-links">
              {roleFit.proofLinks.map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
              <a href={`mailto:${email}`}>{isZh ? "直接发邮件" : "Email me directly"}</a>
            </div>
          </div>
        </section>

        <section className="contact-next-step" aria-labelledby="contact-next-step-title">
          <div>
            <div className="label">Hiring next step</div>
            <h2 id="contact-next-step-title">{hiringConversion.closingPrompt.title}</h2>
            <p className="contact-next-status">{hiringConversion.hero.status}</p>
            <p>{hiringConversion.closingPrompt.body}</p>
          </div>
          <div className="contact-next-step-links">
            {hiringConversion.proofRoutes.map((route) => (
              <Link href={route.href} key={route.href}>
                {route.title}
              </Link>
            ))}
            <a href={`mailto:${email}`}>Email me directly</a>
            <Link href="/hire">Interview decision</Link>
          </div>
        </section>

        <HiringRoleFitPanel
          roles={hiringRoleFits}
          title="Best reasons to contact me."
          intro="Each role fit links to evidence, so the next step can be specific."
          labels={proofLabels}
          compact
        />
      </section>
    </main>
  );
}
