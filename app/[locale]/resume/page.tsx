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
          <p className="res-hr-strip">
            {isZh
              ? "2026 年 11 月毕业 · 布里斯班基地 · 面向澳新全职（可搬迁 / 远程）及亚太设计工程 / AI 产品研发团队 · CS 工程底座 × UQ 交互设计"
              : "Graduating Nov 2026 · Brisbane · Open to AU full-time (relocation/remote) & APAC Design Engineer / AI Product Engineer roles · Swansea CS (2:1) × UQ IxD"}
          </p>
        </div>
        <ResumeActions />
      </section>

      <section className="container">
        <div className="res-body v4-editorial-grid">
          <div className="v4-span-8">
            <div className="res-section">
              <h3>{t("resume.section.exp")}</h3>

              <div className="res-entry">
                <div className="date">2026 · 07 – {isZh ? "至今" : "Now"}</div>
                <div>
                  <h4>
                    {isZh
                      ? "设计工程师与产品交互构建（近一年独立主力项目）"
                      : "Design Engineer & Product Builder (recent builds)"}
                  </h4>
                  {/* Unlisted projects are intentionally excluded from every public resume line. */}
                  <p className="org">
                    {isZh
                      ? "聚焦最近 1–2 年高完整度项目 · Walkie / Lamplight Nook / Resume Autofill / On The Beat / 草原铁潮"
                      : "Flagship 2026 builds · Walkie, Lamplight Nook, Resume Autofill, On The Beat, Grassland Iron Tide, this portfolio"}
                  </p>
                  <ul>
                    <li>
                      {isZh
                        ? "物理数字协同（Walkie / On The Beat）：与 On The Beat 共用 M5StickS3 双启动固件，用有线 USB 优先 + AES-256-GCM 端到端加密中继驱动手腕实体按钮审批 Claude 工具，并完成两支真机手环离桌独立联调（代码由 Claude Code 编写，没有佩戴者测试）。"
                        : "Physical-AI & wearables (Walkie & On The Beat): dual-boot M5StickS3 C++ firmware with USB preemption and AES-256-GCM wrist approvals for Claude Code, paired with two wristbands that hear each other over ESP-NOW and reveal names only after both people say yes (code written with Claude Code; no wearer testing)."}
                    </li>
                    <li>
                      {isZh
                        ? "AI 桌面工作台与安全护栏（Lamplight Nook）：打造风险操作默认锁在「先不要」、让后台任务以咖啡馆分工图透明呈现的 Electron + Phaser 桌面应用（Windows 1.0 已发布日常自用），严守未做外部受试的界限。"
                        : "Calm AI workbench (Lamplight Nook): shipped v1.0 Electron + Phaser desktop companion that shows Claude agent steps, and risky steps open a confirmation card that defaults to 'Not now'."}
                    </li>
                    <li>
                      {isZh
                        ? "隐私求职工具与复杂系统（Resume Autofill / 草原铁潮）：做出不猜开放题、不代点提交且零联网的 Chrome + Android 双端填表工具，及 430 项单测全通过的 5 关 20 Hz 即时战略网页原型。"
                        : "Local privacy & systems rigor (Resume Autofill & Grassland Iron Tide): built zero-network Chrome/Android autofill with Submit lock, plus a 5-mission 20 Hz browser RTS verified across 430/430 unit tests."}
                    </li>
                  </ul>
                  <div className="res-inline-links no-print" aria-label={isZh ? "核查公开源码与原型" : "Verify public repositories and prototypes"}>
                    <a href="https://github.com/LewisSwan24/walkie" target="_blank" rel="noopener noreferrer">Walkie GitHub ↗</a>
                    <a href="https://lewisswan24.github.io/lamplight-nook-site/" target="_blank" rel="noopener noreferrer">Lamplight Site ↗</a>
                    <a href="https://github.com/LewisSwan24/lamplight-nook" target="_blank" rel="noopener noreferrer">Lamplight GitHub ↗</a>
                    <a href="https://github.com/LewisSwan24/resume-autofill" target="_blank" rel="noopener noreferrer">Autofill GitHub ↗</a>
                    <a href="https://on-the-beat.fly.dev" target="_blank" rel="noopener noreferrer">On The Beat Live ↗</a>
                  </div>
                </div>
              </div>

              <div className="res-entry">
                <div className="date">2026 · 03 – 06</div>
                <div>
                  <h4>
                    {isZh
                      ? "交互设计与硬件控制层开发（小组项目）"
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
                        ? "与组员共同设计核心机制：同色腕带由两名玩家共用，任何方向都无法单人触发，四个人必须一起配合。"
                        : "Co-designed the core co-touch mechanic with the team: two players share each directional wristband, so no direction can be triggered alone."}
                    </li>
                    <li>
                      {isZh
                        ? "个人负责：交互机制设计、Arduino Mega 固件（AI 工具辅助编写、我完成台架调试与签署验收）、十路红外传感器硬件接线及展览现场 Web Serial 实时计分网页。"
                        : "Owned mechanics, Arduino Mega firmware (AI coding assisted; personally debugged and signed off), 10-zone IR wiring, and the live Web Serial scoreboard."}
                    </li>
                    <li>
                      {isZh
                        ? "真实展览反馈：展出期间 9 组共 36 人现场试玩，约 3 组通关；如实标注手写榜未留档，未事后估算量化指标。"
                        : "Exhibition outcome: 9 groups (36 players) played live (~3 completed); handwritten leaderboard was not archived, keeping scope claims strictly observed."}
                    </li>
                  </ul>
                  <div className="res-inline-links no-print">
                    <a href="https://maze-runners.vercel.app" target="_blank" rel="noopener noreferrer">
                      {isZh ? "在线模拟控制台 ↗" : "Web Console Demo ↗"}
                    </a>
                  </div>
                </div>
              </div>

              <div className="res-entry">
                <div className="date">2025 · 02 – 12</div>
                <div>
                  <h4>
                    {isZh
                      ? "研究方法与高约束交互专项训练（UQ 研究生课程实践）"
                      : "Research Synthesis & High-Constraint Interaction Systems (UQ Coursework)"}
                  </h4>
                  <p className="org">
                    {isZh
                      ? "信息架构推倒重构 · 无障碍样式注入 · AI 权限隐私隔离（能力脱敏摘要）"
                      : "Information Architecture Redraws · WCAG Style Injection · Scoped AI Access"}
                  </p>
                  <ul>
                    <li>
                      {isZh
                        ? "通过用户出声思考测试重绘移动端多路由架构、构建面向第三方页面的 WCAG 间距增强扩展，并将 AI 摘要读写严格限制在动态授权范围内，把系统边界思维融入后续全栈主力作品。"
                        : "Practiced paper-first IA redraws grounded in think-aloud logs, third-party page WCAG style injection, and strict consent-scoped AI boundaries—shaping every flagship build shipped in 2026."}
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
                        ? "嵌入式原型：Walkie 的宿主机 g++ 协议测试、防误擦烧录守卫（guard.py）和 AES-256-GCM 端到端加密中继（代码由 Claude Code 编写，我定规则并验证），以及 MazeRunners 在 Arduino Mega 上的红外去抖与冷却。"
                        : "Embedded prototypes: Walkie's host g++ frame unit tests, pre-flash partition guards (guard.py) and AES-256-GCM end-to-end encrypted relay (code by Claude Code; I set the rules and verified them), and MazeRunners' IR debounce and cooldown on an Arduino Mega."}
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
                        ? "二等一级荣誉学位（2:1）：系统修习算法、软件工程、并发与数据库基础并完成长篇本科荣誉毕业论文，奠定日后用确定性状态机写原型的工程习惯。"
                        : "Upper Second-Class Honours (2:1): four years of core Computer Science (algorithms, software engineering, concurrent systems, databases) culminating in an extended honours dissertation."}
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
