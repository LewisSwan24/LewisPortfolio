import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { StructuredData, generateResumePersonSchema } from "@/lib/seo";
import {
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
      ? "经历、教育、能力：一页纸的诚实版本。"
      : "The one-page version — experience, education, skills.";
  return {
    title,
    description,
    alternates: buildAlternates("/resume", locale),
    openGraph: buildOpenGraph({ title, description, path: "/resume", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function ResumePage() {
  const t = await getTranslations();
  const locale = await getLocale();
  const isZh = locale === "zh";
  const proofLocale: ProofLocale = isZh ? "zh" : "en";
  const roleFit = getRoleFit(proofLocale);

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
        <div className="res-body v4-editorial-grid">
          <div className="v4-span-8">
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
                  {/* Unlisted projects are intentionally excluded from every public resume line. */}
                  <p className="org">
                    {isZh
                      ? "AI 辅助产品与设计工程实践 · Walkie / Lamplight Nook / Resume Autofill / On The Beat / 草原铁潮 / 个人作品集"
                      : "AI-assisted product & design engineering · Walkie, Lamplight Nook, Resume Autofill, On The Beat, Grassland Iron Tide, this site"}
                  </p>
                  <ul>
                    <li>
                      {isZh
                        ? "物理数字协同（Walkie / On The Beat）：与 On The Beat 共用 M5StickS3 的双启动固件，以 USB 优先与 AES-256-GCM 零知识中继驱动手腕实体按钮审批 Claude 工具，并让社交卡片停在非侵入式的握手阈值上。"
                        : "Physical-digital control (Walkie & On The Beat): dual-boot M5StickS3 firmware with USB-first AES-256-GCM relay and wrist button approvals for Claude Code, paired with three-card BLE social pacing anchored at non-intrusive proximity thresholds."}
                    </li>
                    <li>
                      {isZh
                        ? "温柔陪伴与低压力确认（Lamplight Nook）：打造风险动作默认「先不要」、把停滞任务拆成低负担微动作的 Electron + Phaser 桌面陪伴界面，并坦诚标注未经外部受试验证的边界。"
                        : "Calm agency & low-pressure confirmation (Lamplight Nook): an Electron + Phaser companion UI where risky actions default to 'not now' and stalled tasks break into micro-steps, with unverified user-study scope marked explicitly."}
                    </li>
                    <li>
                      {isZh
                        ? "求职工作流与策略交互边界（Resume Autofill / 草原铁潮）：打造不猜测、不替投、简历不出设备的本地填表工具，以及拒绝自动化代操作、突出决策清晰度的即时策略（RTS）双界面原型。"
                        : "Trustworthy workflow & strategy boundaries (Resume Autofill & Grassland Iron Tide): local-first Chrome/Android autofill that never guesses or submits, alongside an RTS prototype that withholds automation shortcuts so tactical clarity stays legible."}
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
                        ? "我的部分：交互机制、Arduino 程序、电路和全部布线，以及展出用的实时计分网页。程序有 AI 编码工具参与实现，调试与验收由我负责；迷宫本体和外观由组员完成。"
                        : "My part: interaction mechanics, Arduino firmware (AI coding tools helped implement it; I debugged and signed it off), the circuit and all wiring, plus the live scoring page used at the exhibition; teammates built the maze body and exterior."}
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
              <h3>{isZh ? "工程架构与验证方法" : "Engineering & Verification Practices"}</h3>
              <div className="res-entry">
                <div className="date">CI · E2E · Embedded</div>
                <div>
                  <h4>
                    {isZh
                      ? "全栈质量门禁、双语无障碍与嵌入式硬件测试"
                      : "Full-Stack Quality Gates, A11y Audits & Hardware-in-the-Loop Tests"}
                  </h4>
                  <ul>
                    <li>
                      {isZh
                        ? "基于 Next.js App Router + Zod Schema 管理 18 条设计取舍结构与全站 100% 路由门禁；每次合并触发 TypeScript、Vitest、媒体体积预算与 Playwright 三视口 Axe 扫描。"
                        : "Structured Next.js App Router + Zod schema registry enforcing 18 design-decision tradeoffs and zero-drift bilingual routes under Playwright 3-viewport @axe-core/playwright and CSS budget checks."}
                    </li>
                    <li>
                      {isZh
                        ? "在嵌入式 AI 原型中建立宿主机 g++ 协议测试、防误擦烧录守卫（guard.py）、AES-256-GCM 零知识中继与传感器去抖冷却状态机。"
                        : "Built host g++ frame unit tests, pre-flash partition safety guards (guard.py), AES-256-GCM zero-knowledge WebSocket relays, and debounced hardware state machines across M5StickS3 & Arduino Mega."}
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

          <aside className="res-side v4-span-4 v4-rail-sticky">
            <div className="res-side-card role-fit-card">
              <h4>{isZh ? "目标岗位" : "Target roles"}</h4>
              <p className="role-fit-availability">{roleFit.availability}</p>
              <div className="role-fit-tags">
                {roleFit.roles.map((role) => (
                  <span className="tag" key={role}>
                    {role}
                  </span>
                ))}
              </div>
              <div className="role-fit-links">
                <Link href="/hire">
                  {isZh ? "查看岗位与证据简报 →" : "Open hiring dossier →"}
                </Link>
                <Link href="/ai">
                  {isZh ? "用 AI 辩护工作台评估匹配度 →" : "Interrogate Rationale AI Lab →"}
                </Link>
              </div>
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
                Figma / Miro · HTML / CSS / TypeScript · React / Next.js · Tailwind CSS · GSAP · Python / SQLite · Phaser / Canvas · Arduino / ESP32 · Web Serial · Playwright / Vitest
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
                {isZh ? "英语 · 中文（母语）" : "English · Mandarin (native)"}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
