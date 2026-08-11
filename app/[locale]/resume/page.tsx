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
                      ? "AI 辅助产品实践 · Vigil / Hoop Dream / 个人作品集网站"
                      : "AI-assisted product practice · Vigil, Hoop Dream, this site"}
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
                <div className="date">2026 · 03 – 06</div>
                <div>
                  <h4>
                    {isZh
                      ? "交互设计与控制层开发（小组项目）"
                      : "Interaction design & control layer (group project)"}
                  </h4>
                  <p className="org">
                    MazeRunners ·{" "}
                    {isZh
                      ? "接触控制的多人协作迷宫，已公开展出"
                      : "Contact-controlled multiplayer maze, publicly exhibited"}
                  </p>
                  <ul>
                    <li>
                      {isZh
                        ? "设计核心机制：每种颜色的腕带由两名玩家共用，任何方向都无法单人完成，四个人必须配合。"
                        : "Designed the core mechanic: each colour wristband is shared by two players, so no direction can be triggered alone and the four have to coordinate."}
                    </li>
                    <li>
                      {isZh
                        ? "负责控制层全部实现：Arduino 程序、电路、布线和展出用的计分网页；迷宫本体由组员完成。"
                        : "Built the whole control layer: Arduino code, circuits, wiring, and the score webpage used at the exhibition; teammates built the maze body."}
                    </li>
                    <li>
                      {isZh
                        ? "展出期间 9 组共 36 人试玩，约 3 组通关；手写排行榜没有留档，所以没有量化数据。"
                        : "9 groups (36 people) played during the exhibition and about 3 finished; the handwritten leaderboard was not archived, so there are no quantified metrics."}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="res-section">
              <h3>{t("resume.section.edu")}</h3>
              <div className="res-entry">
                <div className="date">2025.02 – 2026.11</div>
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
                        ? "研究方法、信息架构、评估方法、物理计算。"
                        : "Research methods, IA, evaluation, physical computing."}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="res-entry">
                <div className="date">2020.09 – 2024.07</div>
                <div>
                  <h4>
                    {isZh
                      ? "计算机科学学士（荣誉）"
                      : "BSc (Hons) Computer Science"}
                  </h4>
                  <p className="org">
                    {isZh
                      ? "斯旺西大学，英国威尔士"
                      : "Swansea University, Wales, UK"}
                  </p>
                  <ul>
                    <li>
                      {isZh
                        ? "二等一级荣誉学位（2:1）。"
                        : "Second-class honours, upper division (2:1)."}
                    </li>
                  </ul>
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
                Figma · Framer · Protopie · Maze · Otter · Dovetail · Notion · Rive · Miro · VS Code
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
