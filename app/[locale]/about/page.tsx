import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { CrossPracticeArchitectureSvg } from "@/components/editorial/CapabilityDiagrams";

interface ToolCategory {
  name: string;
  tools: string[];
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const locale = (await getLocale()) as "en" | "zh";
  const title = t("about.kicker");
  const description = t("about.p1");
  return {
    title,
    description,
    alternates: buildAlternates("/about", locale),
    openGraph: buildOpenGraph({ title, description, path: "/about", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function AboutPage() {
  const t = await getTranslations();
  const locale = await getLocale();
  const isZh = locale === "zh";
  const toolCategories = t.raw("about.toolCategories") as ToolCategory[];

  const tlRows: Array<{ y: string; k: "y2026" | "y2025" | "y2024" | "y2020" }> = [
    { y: "2026", k: "y2026" },
    { y: "2025", k: "y2025" },
    { y: "2024", k: "y2024" },
    { y: "2020–24", k: "y2020" },
  ];

  const charter = isZh
    ? {
        eyebrow: "分工与署名边界",
        title: "计算机科班基础 × 交互设计方法 × 人机分工原则",
        leftHeading: "由我拍板并验收的环节",
        leftItems: [
          "识别真实使用摩擦、误触成本和社交尴尬门槛（靠现场与日志判断，不靠凭空想象）",
          "定下高风险交互规则（如 Walkie 实体键确认、Lamplight 默认「先不要」、Autofill 拒绝乱猜与代投）",
          "MazeRunners 的硬件接线，ESP32 双系统烧录隔离的验收，以及 Playwright 三视口无障碍走查",
          "如实分清「已跑通的代码/真机门禁」与「尚待开展的外部受试研究」，绝不美化实验缺口",
        ],
        rightHeading: "AI 编码工具负责提速的环节",
        rightItems: [
          "协议帧格式、Zod 数据约束和交互规则定好后，快速搭出 TypeScript / C++ / Electron 脚手架",
          "并行产出多套可运行交互版本供我评审和打回重构（如 On The Beat 连续打回多轮修改）",
          "辅助起草双语测试用例与初稿说明（均须经源码、单测与人工核对一致后才发布）",
        ],
      }
    : {
        eyebrow: "CS Base × IxD Craft × Authorship",
        title: "How Computer Science training, design judgment, and AI tooling split work",
        leftHeading: "Owned & signed off by Lewis",
        leftItems: [
          "Human friction framing, interview transcript coding, and refusal-rule architecture before screens are drawn",
          "Explicit tradeoff gates across Walkie physical keys, Lamplight 'Not now' defaults, and Autofill hard Submit locks",
          "MazeRunners hardware wiring, sign-off on ESP32 dual-boot partition isolation, and Chromium 3-viewport Playwright/Axe verification",
          "Honest separation between repository/bench proofs and unmeasured outside participant testing",
        ],
        rightHeading: "Where AI coding & design tools accelerate",
        rightItems: [
          "Drafting TypeScript, C++, and Electron scaffolds once frame specs, Zod schemas, and constraints are locked",
          "Spooling runtime UI variants rapidly so deceptive mock polish can be audited and rejected across review loops",
          "Producing fixture harnesses and bilingual drafting passes strictly bound to source-verified project truth",
        ],
      };

  return (
    <main className="page" data-screen-label="04 About">
      <section className="container about-hero">
        <div className="label">{t("about.kicker")}</div>
        <h1 className="h-display h1" style={{ marginTop: 16 }}>
          {isZh ? (
            <>
              我做的是<span className="nobr">「让<em>人</em>能找到路」</span>的数字产品。
            </>
          ) : (
            <>
              I make digital things <em>people</em> can actually find their way through.
            </>
          )}
        </h1>
        <div className="about-actions">
          <Link href="/resume" className="btn btn-primary">
            {t("about.cv")} <span className="arrow">→</span>
          </Link>
          <Link href="/hire" className="btn btn-ghost">
            {t("nav.hire")}
          </Link>
          <Link href="/vault" className="btn btn-ghost">
            {isZh ? "演进档案馆" : "Archive Vault"}
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            {t("hero.cta.note")}
          </Link>
        </div>
        <p
          className="eyebrow"
          style={{ marginTop: 14, color: "var(--text-2)" }}
          data-testid="about-trajectory-pill"
        >
          {isZh
            ? "斯旺西 CS 荣誉本科 (2020–24, 2:1) × 昆士兰大学交互硕士 (2025–26.11) · 常驻布里斯班 · 欢迎澳新与亚太全职机会"
            : "Swansea CS BSc (2020–24, 2:1) × UQ IxD Master (2025–Nov 2026) · Brisbane · Open to AU & APAC Interaction & Product Design Roles"}
        </p>
      </section>

      <section className="container">
        <div className="v4-editorial-grid">
          <div className="about-prose v4-span-8">
            <p className="prose">{t("about.p1")}</p>
            <p className="prose">{t("about.p2")}</p>
            <p className="prose">{t("about.p3")}</p>
            <p className="prose">{t("about.p4")}</p>
          </div>
          <aside className="about-side v4-span-4 v4-rail-sticky v4-studio-plate">
            <div className="label">{t("about.tl.label")}</div>
            <div className="about-tl" style={{ marginTop: 16 }}>
              {tlRows.map((row) => (
                <div className="about-tl-row" key={row.k}>
                  <div className="y">{row.y}</div>
                  <div className="t">{t(`about.tl.${row.k}`)}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
        <CrossPracticeArchitectureSvg locale={isZh ? "zh" : "en"} />
      </section>

      <section className="container section" aria-labelledby="about-charter-heading">
        <div className="about-workflow-head">
          <div className="label">{charter.eyebrow}</div>
          <h2 id="about-charter-heading" className="h-display h2" style={{ marginTop: 12 }}>
            {charter.title}
          </h2>
        </div>

        <div className="v4-editorial-grid" style={{ marginTop: 24 }}>
          <article className="v4-span-6 v4-studio-plate" style={{ padding: 20 }}>
            <h3 style={{ marginTop: 0, fontSize: 17 }}>{charter.leftHeading}</h3>
            <ul style={{ margin: "12px 0 0", paddingLeft: 18, display: "grid", gap: 8, color: "var(--text-2)", fontSize: 14, lineHeight: 1.6 }}>
              {charter.leftItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="v4-span-6 v4-studio-plate" style={{ padding: 20 }}>
            <h3 style={{ marginTop: 0, fontSize: 17 }}>{charter.rightHeading}</h3>
            <ul style={{ margin: "12px 0 0", paddingLeft: 18, display: "grid", gap: 8, color: "var(--text-2)", fontSize: 14, lineHeight: 1.6 }}>
              {charter.rightItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="container section about-workflow-section" aria-labelledby="about-workflow-heading">
        <div className="about-workflow-head">
          <div className="label">{isZh ? "工作方法循环" : "How ideas get tested"}</div>
          <h2 id="about-workflow-heading" className="h-display h2" style={{ marginTop: 12 }}>
            {isZh
              ? "先替用户守住操作底线，再把原型拉进真实场景试错。"
              : "Lock the safety rule first; prototypes exist to test where it breaks."}
          </h2>
        </div>

        <ol className="about-loop-rail" aria-label={isZh ? "从人的摩擦到诚实边界的四步循环" : "Four-step rationale and build loop"}>
          {(
            isZh
              ? [
                  { n: "01", t: "找准人的摩擦", d: "先识别打扰注意力、引发误触风险或让人尴尬的真实场景，再决定界面长什么样。" },
                  { n: "02", t: "明示设计取舍", d: "写清否决了哪几种看似顺滑、但削弱用户掌控感的备选方案。" },
                  { n: "03", t: "跑通真原型", d: "用软件或硬件实体配上自动化门禁做到可测阶段，不停在口头讲故事。" },
                  { n: "04", t: "诚实标清边界", d: "实测没跑的部分直接标明，不拿离线模拟或自我体验冒充外部真实研究。" },
                ]
              : [
                  { n: "01", t: "Human friction first", d: "Pin down attention overload, error cost, and social discomfort before choosing visual components." },
                  { n: "02", t: "Explicit tradeoffs", d: "Write out the tempting alternatives that had to be rejected so the user keeps legible control." },
                  { n: "03", t: "Falsifiable prototypes", d: "Ship software or physical builds backed by automated gates so rules are tested in motion." },
                  { n: "04", t: "Honest scope", d: "Keep verified behavior distinct from what still waits for outside participant testing." },
                ]
          ).map((step) => (
            <li className="about-loop-step" key={step.n}>
              <span>{step.n}</span>
              <h3>{step.t}</h3>
              <p>{step.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container section">
        <div className="label">{t("about.philo.label")}</div>
        <SectionReveal>
          <div className="about-philo" style={{ marginTop: 24 }}>
            {([1, 2, 3, 4] as const).map((i) => (
              <div className="about-philo-item" key={i} data-reveal-item>
                <h3>{t(`about.philo.${i}.t`)}</h3>
                <p>{t(`about.philo.${i}.b`)}</p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      <section className="container section" aria-labelledby="about-toolbox-heading">
        <div className="about-workflow-head">
          <div className="label">{t("about.sections.toolbox.label")}</div>
          <h2 id="about-toolbox-heading" className="h-display h2" style={{ marginTop: 12 }}>
            {isZh ? "常用的设计、硬件与全栈工具" : "Tools & systems used in daily builds"}
          </h2>
        </div>

        <div className="v4-editorial-grid" style={{ marginTop: 24 }}>
          {toolCategories.map((cat) => (
            <article key={cat.name} className="v4-span-4 v4-studio-plate" style={{ padding: 18 }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>{cat.name}</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {cat.tools.map((tool) => (
                  <span key={tool} className="tag">
                    {tool}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container section" aria-labelledby="about-arch-heading">
        <div className="about-workflow-head">
          <div className="label">
            {isZh ? "工程栈与可验证标准" : "Engineering & Verification Rigor"}
          </div>
          <h2 id="about-arch-heading" className="h-display h2" style={{ marginTop: 12 }}>
            {isZh
              ? "交互判断必须落到可复现的系统结构与预算红线上。"
              : "Every interaction claim ships alongside reproducible architecture and budget gates."}
          </h2>
        </div>

        <div className="about-philo" style={{ marginTop: 24 }}>
          <div className="about-philo-item">
            <h3>{isZh ? "前端架构与服务端边界" : "RSC Boundaries & CSS Budgets"}</h3>
            <p>
              {isZh
                ? "用 Next.js App Router、TypeScript 和 Zod 强校验，把重内容留在服务端。持续集成卡住 CSS 体积（应用 ≤ 68 kB、总计 ≤ 98 kB，gzip 后），项目素材总量不超过 12 MB。"
                : "Keep heavy bilingual case payloads inside Server Components validated by Zod, with CI budgets holding app CSS to 68 kB and total CSS to 98 kB gzipped, and project media to 12 MB."}
            </p>
          </div>
          <div className="about-philo-item">
            <h3>{isZh ? "三视口自动化无障碍检查" : "Automated 3-Viewport Accessibility"}</h3>
            <p>
              {isZh
                ? "在桌面亮色、真实切换暗黑模式（#141413）和 375px 窄屏上跑 Playwright + Axe 检查，确保键盘可达、焦点环完整。"
                : "Run Playwright + @axe-core/playwright across Desktop Light, switched Dark Mode (#141413), and 375px mobile viewports so contrast and keyboard focus never regress."}
            </p>
          </div>
          <div className="about-philo-item">
            <h4>{isZh ? "有据可查的 AI 检索" : "Grounded Hybrid Rationale Search"}</h4>
            <p>
              {isZh
                ? "AI 实验室用 BM25F 加 64 维 int8 语义索引检索案例决策和专文，查询里的个人信息先脱敏。找不到证据就直说没有，不替作者编造未测指标。"
                : "The AI Lab ranks case decisions and essays with BM25F plus a 64-dim int8 semantic index, redacts personal details from queries, and says so plainly when no evidence matches."}
            </p>
          </div>
          <div className="about-philo-item">
            <h4>{isZh ? "进一步查验" : "Inspect Live Artifacts"}</h4>
            <p>
              {isZh ? (
                <>
                  浏览 <Link href="/projects" className="u-underline">六大精选案例</Link>、前往{" "}
                  <Link href="/ai" className="u-underline">AI 实验室</Link> 拷问取舍理由，或打开{" "}
                  <Link href="/lab" className="u-underline">实验室</Link> 与{" "}
                  <Link href="/blog" className="u-underline">设计专栏</Link>。
                </>
              ) : (
                <>
                  Browse <Link href="/projects" className="u-underline">6 flagship cases</Link>, interrogate tradeoffs in{" "}
                  <Link href="/ai" className="u-underline">AI Lab</Link>, or inspect <Link href="/lab" className="u-underline">Lab</Link> and{" "}
                  <Link href="/blog" className="u-underline">Writing</Link>.
                </>
              )}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
