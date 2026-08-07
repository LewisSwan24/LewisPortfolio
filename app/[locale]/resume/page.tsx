import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { StructuredData, generateResumePersonSchema } from "@/lib/seo";
import {
  getHiringConversion,
  getRoleFit,
  type ProofLocale,
} from "@/lib/portfolio-proof";
import { ResumeActions } from "./ResumeActions";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const locale = (await getLocale()) as "en" | "zh";
  const title = t("resume.kicker");
  const description =
    locale === "zh"
      ? "经历、教育、能力——一页纸的诚实版本。"
      : "The one-page version — experience, education, skills.";
  return {
    title,
    description,
    alternates: buildAlternates("/resume", locale),
    openGraph: buildOpenGraph({ title, description, path: "/resume", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

const SKILLS: Array<{ en: string; zh: string; v: number; href?: string }> = [
  { en: "User research", zh: "用户研究", v: 92, href: "/projects/connect" },
  { en: "Information architecture", zh: "信息架构", v: 88, href: "/projects/connect" },
  { en: "Interaction design", zh: "交互设计", v: 85, href: "/projects/spectra" },
  { en: "Prototyping (Figma, Framer)", zh: "原型（Figma / Framer）", v: 90, href: "/projects/ai" },
  { en: "HTML / CSS / React", zh: "HTML / CSS / React", v: 72, href: "/blog/designing-for-ai" },
  { en: "Usability testing", zh: "可用性测试", v: 88, href: "/projects/spectra" },
];

export default async function ResumePage() {
  const t = await getTranslations();
  const locale = await getLocale();
  const isZh = locale === "zh";
  const proofLocale: ProofLocale = isZh ? "zh" : "en";
  const roleFit = getRoleFit(proofLocale);
  const hiringConversion = getHiringConversion(proofLocale);

  return (
    <main className="page" data-screen-label="05 Resume">
      <StructuredData data={generateResumePersonSchema()} />
      <section className="container res-hero">
        <div>
          <div className="label">{t("resume.kicker")}</div>
          <h1 className="h-display h2" style={{ marginTop: 16 }}>
            {t("resume.headline")}
          </h1>
        </div>
        <ResumeActions />
      </section>

      <section className="container">
        <div className="res-body">
          <div>
            <div className="res-section">
              <h3>{t("resume.section.exp")}</h3>

              <div className="res-entry">
                <div className="date">2026 · 01 – {isZh ? "至今" : "Now"}</div>
                <div>
                  <h4>
                    {isZh
                      ? "产品与交互设计师（自主项目）"
                      : "Product & Interaction Designer (self-initiated)"}
                  </h4>
                  <p className="org">
                    {isZh
                      ? "AI 辅助产品实践 · Vigil / Hoop Dream / MazeRunners"
                      : "AI-assisted product practice · Vigil, Hoop Dream, MazeRunners"}
                  </p>
                  <ul>
                    <li>
                      {isZh
                        ? "把自主选题的产品从书面规格一路带到可运行的实现：规格与设计决策由我定，再指挥 Codex 与 Claude Code 落地。"
                        : "Took self-directed products from written spec to running build — I wrote the specification and design decisions, then directed Codex and Claude Code to implement them."}
                    </li>
                    <li>
                      {isZh
                        ? "Vigil：140 封合成邮件、六个可切换界面变体；预测在测试前先写下，并设了一道闸门——一旦置信度能预测分类器的错误，build 就挂掉。"
                        : "Vigil: six switchable interface variants over a 140-email synthetic corpus, predictions recorded before testing, and a build gate that fails if confidence starts predicting the classifier's errors."}
                    </li>
                    <li>
                      {isZh
                        ? "Hoop Dream：六个批次共 299 张美术资产，靠一份成文美术圣经与一道带「拒绝风格」清单的闸门保持一致；线上公开可玩，自标 DEMO v0.6。"
                        : "Hoop Dream: 299 art assets across six batches held to one written art bible by a style gate with an explicit rejected-style list; publicly playable, self-labelled DEMO v0.6."}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="res-entry">
                <div className="date">2024 · 08 – 11</div>
                <div>
                  <h4>{isZh ? "首席 UX 设计师" : "Lead UX Designer"}</h4>
                  <p className="org">
                    Spectra Lens · {isZh ? "AR 无障碍工具" : "AR accessibility tool"}
                  </p>
                  <ul>
                    <li>
                      {isZh
                        ? "访谈 12 位色盲用户，覆盖 deutan / protan / tritan 三类。"
                        : "Interviewed 12 colourblind users across deutan / protan / tritan types."}
                    </li>
                    <li>
                      {isZh
                        ? "与目标用户共创多模态反馈；通过 8 人可用性测试验证。"
                        : "Co-designed multi-modal feedback with target users; validated via 8-person usability test."}
                    </li>
                    <li>
                      {isZh
                        ? "把多模态反馈带进真实场景做可用性测试。入选昆大 2024 设计年展。"
                        : "Took the multi-modal feedback through usability testing in real contexts. Selected for UQ Design Showcase 2024."}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="res-entry">
                <div className="date">2024 · 03 – 06</div>
                <div>
                  <h4>UX Researcher &amp; Designer</h4>
                  <p className="org">
                    UQ Connect ·{" "}
                    {isZh ? "学生门户 IA 重设计" : "Student portal IA redesign"}
                  </p>
                  <ul>
                    <li>
                      {isZh
                        ? "设计并执行树测试（n=50）、开放卡片分类（n=24）、任务分析（n=10）。"
                        : "Designed and ran tree tests (n=50), open card sort (n=24), and task analyses (n=10)."}
                    </li>
                    <li>
                      {isZh
                        ? "把十二个部门分类收敛成六个任务分类，并与原结构做树测试对比。"
                        : "Collapsed twelve department categories into six task categories and tree-tested the proposal against the original structure."}
                    </li>
                    <li>
                      {isZh
                        ? "把面向教职工的标签改写成学生语言：Study、Belong、Fees & finance。"
                        : "Rewrote staff-facing labels into plain student language: Study, Belong, Fees & finance."}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="res-section">
              <h3>{t("resume.section.edu")}</h3>
              <div className="res-entry">
                <div className="date">2024 – 2026</div>
                <div>
                  <h4>
                    {isZh ? "交互设计硕士" : "Master of Interaction Design"}
                  </h4>
                  <p className="org">
                    {isZh
                      ? "昆士兰大学，布里斯班"
                      : "The University of Queensland, Brisbane"}
                  </p>
                  <ul>
                    <li>
                      {isZh
                        ? "研究方法、信息架构、评估、设计工作室实践。"
                        : "Research methods, IA, evaluation, design studio practice."}
                    </li>
                    <li>GPA 6.7 / 7.0</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="res-section">
              <h3>{t("resume.section.awards")}</h3>
              <div className="res-entry">
                <div className="date">2024</div>
                <div>
                  <h4>
                    {isZh
                      ? "昆大设计年展 —— 入选"
                      : "UQ Design Showcase — Selected"}
                  </h4>
                  <p className="org">Spectra Lens</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="res-side">
            <div className="res-side-card role-fit-card">
              <h4>{isZh ? "最匹配岗位" : "Best-fit roles"}</h4>
              <p className="role-fit-availability">{roleFit.availability}</p>
              <div className="role-fit-tags">
                {roleFit.roles.map((role) => (
                  <span className="tag" key={role}>
                    {role}
                  </span>
                ))}
              </div>
              <h5>{isZh ? "适合的团队" : "Best-fit teams"}</h5>
              <ul className="role-fit-list">
                {roleFit.bestFit.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="role-fit-links">
                {roleFit.proofLinks.map((link) => (
                  <Link href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="res-side-card resume-proof-card">
              <h4>Proof-linked resume</h4>
              <p>{hiringConversion.hero.status}</p>
              <h5>Best cases to inspect</h5>
              <div className="resume-proof-links">
                {hiringConversion.proofRoutes.map((route) => (
                  <Link href={route.href} key={route.href}>
                    {route.title}
                  </Link>
                ))}
                <Link href="/hire">Interview decision</Link>
              </div>
            </div>
            <div className="res-side-card">
              <h4>{t("resume.section.skills")}</h4>
              {SKILLS.map((s) => {
                const inner = (
                  <>
                    <div className="row">
                      <span>{isZh ? s.zh : s.en}</span>
                      <span>{s.v}</span>
                    </div>
                    <div className="bar">
                      <i style={{ width: `${s.v}%` }} />
                    </div>
                  </>
                );
                return s.href ? (
                  <Link
                    href={s.href}
                    key={s.en}
                    className="res-skill res-skill-link"
                    aria-label={`${isZh ? s.zh : s.en} — ${
                      isZh ? "查看证明" : "see proof"
                    }`}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="res-skill" key={s.en}>
                    {inner}
                  </div>
                );
              })}
            </div>
            <div className="res-side-card">
              <h4>{isZh ? "工具" : "Tools"}</h4>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-ui)",
                  fontSize: 14,
                  color: "var(--text-2)",
                  lineHeight: 1.7,
                }}
              >
                Figma · Framer · Protopie · Maze · OptimalSort · Treejack · Otter · Dovetail · Notion · Rive · Miro · VS Code
              </p>
            </div>
            <div className="res-side-card">
              <h4>{isZh ? "语言" : "Languages"}</h4>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-ui)",
                  fontSize: 14,
                  color: "var(--text-2)",
                  lineHeight: 1.7,
                }}
              >
                {isZh
                  ? "英语（雅思 7.5） · 中文（母语）"
                  : "English (IELTS 7.5) · Mandarin (native)"}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
