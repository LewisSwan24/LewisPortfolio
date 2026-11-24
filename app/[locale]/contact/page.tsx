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
        <div className="v4-editorial-grid" style={{ alignItems: "center" }}>
          <div className="contact-hero-copy v4-span-7">
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
        <div className="v4-span-5">
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
        </div>
        </div>
      </section>

      <QuickContactForm locale={proofLocale} initialRole={matchedRole ?? ""} />

      <section className="container section" aria-labelledby="contact-walkthrough-heading">
        <div className="label">{isZh ? "面试与沟通预期" : "What to expect in a call"}</div>
        <h2 id="contact-walkthrough-heading" className="h-display h2" style={{ marginTop: 12 }}>
          {isZh
            ? "30 分钟作品集 Walkthrough 通常怎么聊？"
            : "How a 30-minute portfolio walkthrough is structured"}
        </h2>
        <div className="contact-walkthrough-grid">
          <article className="v4-studio-plate" style={{ padding: 20 }}>
            <span className="eyebrow">{isZh ? "01 · 5 分钟对齐" : "01 · 5 min alignment"}</span>
            <h3 style={{ margin: "8px 0", fontSize: 18 }}>
              {isZh ? "岗位匹配与到岗节奏" : "Role scope & availability"}
            </h3>
            <p className="prose" style={{ fontSize: 14, margin: 0 }}>
              {isZh
                ? "确认团队目前卡在产品定义、AI 边界设计还是全栈原型交付，并同步我 2026 年 11 月毕业、布里斯班基地与澳新/亚太全职入职窗口。"
                : "Confirm whether your team prioritizes interaction architecture, AI guardrails, or full-stack prototyping—aligned with my Nov 2026 graduation and AU/APAC full-time availability."}
            </p>
          </article>
          <article className="v4-studio-plate" style={{ padding: 20 }}>
            <span className="eyebrow">{isZh ? "02 · 15 分钟实机演练" : "02 · 15 min live demo"}</span>
            <h3 style={{ margin: "8px 0", fontSize: 18 }}>
              {isZh ? "现场跑通 2 个重点项目" : "Live walkthrough of 2 core builds"}
            </h3>
            <p className="prose" style={{ fontSize: 14, margin: 0 }}>
              {isZh
                ? "直接打开 Walkie、Lamplight Nook 或 Resume Autofill 可交互原貌与源码取舍，拆解当初否决的脆方案及真实代码测试门禁。"
                : "Step directly through Walkie, Lamplight Nook, or Resume Autofill—unpacking rejected shortcuts, state-machine guardrails, and verified repo gates."}
            </p>
          </article>
          <article className="v4-studio-plate" style={{ padding: 20 }}>
            <span className="eyebrow">{isZh ? "03 · 10 分钟坦诚答疑" : "03 · 10 min open Q&A"}</span>
            <h3 style={{ margin: "8px 0", fontSize: 18 }}>
              {isZh ? "工程协作方式与实证局限" : "Engineering workflow & honest gaps"}
            </h3>
            <p className="prose" style={{ fontSize: 14, margin: 0 }}>
              {isZh
                ? "当场讨论我与 AI 编码工具的分工边界、Playwright 三视口验收标准，以及每个项目尚未开展外部用户研究的部分。"
                : "Discuss how I work alongside AI coding tools, verify builds via Playwright/Axe, and separate bench verification from unstudied field gaps."}
            </p>
          </article>
        </div>
        <div className="res-inline-links" style={{ marginTop: 20 }}>
          <a href={`/resume/lewis-dong-resume-${proofLocale}.pdf`} download>
            {isZh ? "直下中/英单页 PDF 简历 ↗" : "Download 1-Page PDF CV ↗"}
          </a>
          <Link href="/hire">
            {isZh ? "打开 1 分钟招聘简报 →" : "Open 1-min hiring dossier →"}
          </Link>
        </div>
      </section>
    </main>
  );
}
