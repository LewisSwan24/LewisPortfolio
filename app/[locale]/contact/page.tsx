import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import { ContactRoleContext } from "@/components/hiring/ContactRoleContext";
import { FollowThroughContactContext } from "@/components/hiring/FollowThroughComponents";
import { QuickContactForm } from "@/components/contact/QuickContactForm";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getHiringRoleFits, getProofUiLabels } from "@/lib/proof";
import { siteConfig } from "@/lib/site";
import type { ProofLocale } from "@/lib/portfolio-proof";

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
  const proofLabels = getProofUiLabels(proofLocale);
  const matchedRole =
    query?.role && getHiringRoleFits(proofLocale).some((fit) => fit.id === query.role)
      ? query.role
      : undefined;
  const isInterviewIntent = query?.intent === "interview" && Boolean(matchedRole);

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
              ? "如果你正在招人、推进一个交互复杂的新产品，或想先聊某个案例的取舍，直接写信给我即可，通常 48 小时内回复。"
              : "If you are hiring, shaping a tricky interaction problem, or want to compare notes on a shipped build, send a note — I usually reply within 48 hours."}
          </p>
          <ul className="contact-method-list" aria-label={isZh ? "联系方式" : "Contact methods"}>
            <li>
              <span aria-hidden="true">@</span>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
            {linkedin ? (
              <li>
                <span aria-hidden="true">in</span>
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                  {readableUrl(linkedin)}
                </a>
              </li>
            ) : null}
            <li>
              <span aria-hidden="true">gh</span>
              <a href={github} target="_blank" rel="noopener noreferrer">
                {readableUrl(github)}
              </a>
            </li>
          </ul>
          <p className="contact-hire-hint">
            <Link href="/hire">
              {isZh ? "正在评估岗位匹配？查看 1 分钟招聘简报 →" : "Evaluating role fit? Open the quick hiring dossier →"}
            </Link>
          </p>
        </div>
        {isInterviewIntent ? (
          <FollowThroughContactContext
            role={matchedRole}
            intent={query?.intent}
            locale={proofLocale}
            labels={proofLabels}
          />
        ) : matchedRole ? (
          <ContactRoleContext role={matchedRole} locale={proofLocale} />
        ) : (
          <aside className="contact-note-card" aria-label={isZh ? "来信建议" : "Note guide"}>
            <div className="contact-note-label">
              {isZh ? "写信时顺便带上一句" : "Helpful in your note"}
            </div>
            <p>
              {isZh
                ? "附上团队方向、产品阶段或想深聊的一件作品，我回信时可以直接把相关设计与边界整理给你。"
                : "Share the role scope, product stage, or specific build you want to unpack — I will reply with the right context ready."}
            </p>
            <span>{isZh ? "布里斯班 · 欢迎远程与澳洲本地机会" : "Brisbane · Open to AU & remote"}</span>
          </aside>
        )}
      </section>

      <QuickContactForm locale={proofLocale} initialRole={matchedRole ?? ""} />
    </main>
  );
}
