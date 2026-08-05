import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import { ContactRoleContext } from "@/components/hiring/ContactRoleContext";
import { FollowThroughContactContext } from "@/components/hiring/FollowThroughComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getProofUiLabels } from "@/lib/proof";
import { siteConfig } from "@/lib/site";
import {
  getHiringConversion,
  getRoleFit,
  type ProofLocale,
} from "@/lib/portfolio-proof";

function readableUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

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
  const email = siteConfig.author.email;
  const linkedin = siteConfig.social.linkedin;
  const github = siteConfig.social.github;
  const proofLocale: ProofLocale = isZh ? "zh" : "en";
  const roleFit = getRoleFit(proofLocale);
  const hiringConversion = getHiringConversion(proofLocale);
  const proofLabels = getProofUiLabels(proofLocale);

  return (
    <main className="page" data-screen-label="06 Contact">
      <section className="container contact-hero">
        <div className="contact-hero-copy">
          <div className="label">{t("contact.kicker")}</div>
          <h1 className="h-display h1">
            {isZh ? (
              <>
                一起做点<em>讲得通的事。</em>
              </>
            ) : (
              <>
                Let&apos;s build something that makes <em>sense.</em>
              </>
            )}
          </h1>
          <p className="prose">
            {isZh
              ? "把岗位、问题，或你想让我准备的问题发来。我会带着最相关的案例和判断回复。"
              : "Send the role, the problem, or the question you want me to prepare for. I will reply with the most relevant case and a clear next step."}
          </p>
          <ul className="contact-method-list" aria-label={isZh ? "联系方式" : "Contact methods"}>
            <li>
              <span aria-hidden="true">@</span>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
            <li>
              <span aria-hidden="true">in</span>
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                {readableUrl(linkedin)}
              </a>
            </li>
            <li>
              <span aria-hidden="true">gh</span>
              <a href={github} target="_blank" rel="noopener noreferrer">
                {readableUrl(github)}
              </a>
            </li>
          </ul>
        </div>
        <aside className="contact-note-card" aria-label={isZh ? "最佳联系方式" : "Best way to reach me"}>
          <div className="contact-note-label">
            {isZh ? "最好这样联系我" : "Best way to reach me"}
          </div>
          <p>
            {isZh
              ? "告诉我你想解决的问题，我会带着一条清楚的证据路径回复。"
              : "Tell me the problem you are trying to solve, and I will reply with a useful evidence path."}
          </p>
          <span>{isZh ? "具体一点 → 回复更快" : "specificity → speed"}</span>
        </aside>

        <ContactRoleContext role={query?.role} locale={proofLocale} />
        <FollowThroughContactContext
          role={query?.role}
          intent={query?.intent}
          locale={proofLocale}
          labels={proofLabels}
        />

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
            </div>
          </div>
        </section>

        <section className="contact-next-step" aria-labelledby="contact-next-step-title">
          <div>
            <div className="label">
              {isZh ? "招聘下一步" : "Hiring next step"}
            </div>
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
            <a href={`mailto:${email}`}>
              {isZh ? "直接发邮件" : "Email me directly"}
            </a>
            <Link href="/hire">{isZh ? "面试判断" : "Interview decision"}</Link>
          </div>
        </section>

      </section>
    </main>
  );
}
