import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { SectionReveal } from "@/components/motion/SectionReveal";

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
        eyebrow: "背景桥接与协作边界",
        title: "计算机科班底座 × 交互设计方法 × 清晰的人机署名规则",
        leftHeading: "我亲自定规并签署验收的环节",
        leftItems: [
          "识别真实人因摩擦、社会尴尬门槛与误触隐患（不靠想象捏造需求）",
          "裁决交互状态边界与拒绝红线（如 Walkie 实体批准、Lamplight 默认「先不要」、Autofill 禁猜与禁代投）",
          "真机物理连接、ESP32 双启动隔离与 Playwright 三视口无障碍实测走查",
          "把「已测上限」与「尚未开展的外部受试研究」拆开写明，绝不美化实验缺口",
        ],
        rightHeading: "AI 编码与设计工具负责提速的环节",
        rightItems: [
          "依据锁定后的协议帧规格与数据结构，快速展开 TypeScript / C++ / Electron 代码脚手架",
          "批量起草可运行交互态供我逐轮审阅并打回修正（如 On The Beat 连续返工 5–12 轮设计画布）",
          "辅助生成离线合规测试夹具与双语专栏文字草稿（均经源码、测试与人工复核对齐后方可发布）",
        ],
      }
    : {
        eyebrow: "CS Foundation × Interaction Craft × Authorship",
        title: "How Computer Science training, design judgment, and AI tooling divide work",
        leftHeading: "Owned & signed off by Lewis",
        leftItems: [
          "Human friction framing, interview transcript coding, and refusal-rule architecture before screens are drawn",
          "Explicit tradeoff gates across Walkie physical keys, Lamplight 'Not now' defaults, and Autofill hard Submit locks",
          "Real hardware wiring, ESP32 dual-boot partition isolation, and Chromium 3-viewport Playwright/Axe verification",
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
              我做的是「让<em>人</em>能找到路」的数字产品。
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
            {isZh ? "设计演进档案馆" : "Archive Vault"}
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
            ? "斯旺西大学 CS 工程底座 (2020–24) × 昆士兰大学交互设计方法 (2025–26) × 软硬协同与 AI 信任实证 · 面向亚太 AI 团队与澳新产品工程岗"
            : "Swansea CS Engineering Base (2020–24) × UQ Interaction Methods (2025–26) × Hardware/AI Proof · Open to ANZ & APAC Product/Design Engineering Roles"}
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
          <div className="label">{isZh ? "论证立场与协作边界" : "Design stance & working loop"}</div>
          <h2 id="about-workflow-heading" className="h-display h2" style={{ marginTop: 12 }}>
            {isZh
              ? "先替人写清交互规则与拒答边界，再让代码与原型去撞真实摩擦。"
              : "I define the human rule and refusal boundary first; prototypes exist to test where it holds."}
          </h2>
        </div>

        <ol className="about-loop-rail" aria-label={isZh ? "从人的摩擦到诚实边界的四步循环" : "Four-step rationale and build loop"}>
          {(
            isZh
              ? [
                  { n: "01", t: "找准人的摩擦", d: "先识别打扰注意力、引发误触风险或让人尴尬的真实场景，再决定界面长什么样。" },
                  { n: "02", t: "明示设计取舍", d: "写清否决了哪几种看似顺滑但伤害用户掌控感的备选路径。" },
                  { n: "03", t: "真原型压测", d: "用软件或硬件实体搭配自动化门禁跑到可测保真度，不止于口头讲故事。" },
                  { n: "04", t: "诚实标注空白", d: "实测没跑的部分直接标明，不拿离线模拟或自我体验冒充外部真实研究。" },
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
                <h4>{t(`about.philo.${i}.t`)}</h4>
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
            {isZh ? "高频使用的设计、硬件与全栈工具" : "Tools & systems used in daily builds"}
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
            <h4>{isZh ? "前端架构与服务端边界" : "RSC Boundaries & CSS Budgets"}</h4>
            <p>
              {isZh
                ? "使用 Next.js App Router、TypeScript 与 Zod 强校验把重内容留在服务端，并通过持续集成守住全局 CSS <= 30 kB gz 与零静态图片膨胀。"
                : "Keep heavy bilingual case payloads inside Server Components validated by Zod, paired with CI bundle checks enforcing global CSS <= 30 kB gz and zero static bloat."}
            </p>
          </div>
          <div className="about-philo-item">
            <h4>{isZh ? "三视口自动化无障碍检查" : "Automated 3-Viewport Accessibility"}</h4>
            <p>
              {isZh
                ? "在桌面亮色、真实切换暗黑模式（#141413）以及 375px 窄屏上运行 Playwright + Axe 审计，确保键盘可达性与焦点环完整。"
                : "Run Playwright + @axe-core/playwright across Desktop Light, switched Dark Mode (#141413), and 375px mobile viewports so contrast and keyboard focus never regress."}
            </p>
          </div>
          <div className="about-philo-item">
            <h4>{isZh ? "零幻想 AI 检索证据库" : "Deterministic BM25 Rationale Search"}</h4>
            <p>
              {isZh
                ? "作品集内的 AI 实验室采用确定性 BM25 证据检索与敏感信息脱敏；找不到实证就坦诚拒答，不替作者编造未测指标。"
                : "Our AI Lab uses deterministic BM25 indexing across case decisions and essays with PII redaction—refusing ungrounded claims whenever proof is missing."}
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
