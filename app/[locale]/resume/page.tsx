import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
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

const SKILLS: Array<{ en: string; zh: string; v: number }> = [
  { en: "User research", zh: "用户研究", v: 92 },
  { en: "Information architecture", zh: "信息架构", v: 88 },
  { en: "Interaction design", zh: "交互设计", v: 85 },
  { en: "Prototyping (Figma, Framer)", zh: "原型（Figma / Framer）", v: 90 },
  { en: "HTML / CSS / React", zh: "HTML / CSS / React", v: 72 },
  { en: "Usability testing", zh: "可用性测试", v: 88 },
];

export default async function ResumePage() {
  const t = await getTranslations();
  const locale = await getLocale();
  const isZh = locale === "zh";

  return (
    <main className="page" data-screen-label="05 Resume">
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
                <div className="date">2024 · 10 – {isZh ? "至今" : "Now"}</div>
                <div>
                  <h4>
                    {isZh
                      ? "产品设计师（自主项目）"
                      : "Product Designer (self-initiated)"}
                  </h4>
                  <p className="org">
                    Connect Circles ·{" "}
                    {isZh ? "国际学生社交 App" : "International student social app"}
                  </p>
                  <ul>
                    <li>
                      {isZh
                        ? "主导跨 3 个文化群体的 15 次深度访谈（东亚 / 南亚 / 欧洲）。"
                        : "Led 15 depth interviews across 3 cultural cohorts (East/South Asia, Europe)."}
                    </li>
                    <li>
                      {isZh
                        ? "执行 2 周日记研究（n=8）及 3 场共创工作坊。"
                        : "Ran a 2-week diary study (n=8) and 3 co-design workshops."}
                    </li>
                    <li>
                      {isZh
                        ? "整合三个学术框架（Weiss / SDT / SIT）到产品方向。"
                        : "Synthesised three academic frameworks (Weiss, SDT, SIT) into a product direction."}
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
                        ? "识别成功率 75 → 92%，平均 3.1 秒。入选昆大 2024 设计年展。"
                        : "Recognition success 75 → 92%, avg. 3.1s. Selected for UQ Design Showcase 2024."}
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
                        ? "可发现率 58 → 84%，任务成功率 72 → 94%，SUS 61 → 78。"
                        : "Findability 58 → 84%, task success 72 → 94%, SUS 61 → 78."}
                    </li>
                    <li>
                      {isZh
                        ? "这套树测试协议被沿用到后续两个昆大数字化项目。"
                        : "Tree test protocol reused on two subsequent UQ digital projects."}
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
            <div className="res-side-card">
              <h4>{t("resume.section.skills")}</h4>
              {SKILLS.map((s) => (
                <div className="res-skill" key={s.en}>
                  <div className="row">
                    <span>{isZh ? s.zh : s.en}</span>
                    <span>{s.v}</span>
                  </div>
                  <div className="bar">
                    <i style={{ width: `${s.v}%` }} />
                  </div>
                </div>
              ))}
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
