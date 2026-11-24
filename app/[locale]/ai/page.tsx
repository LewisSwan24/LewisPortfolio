import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import { AiWorkbenchPageClient } from "@/components/ai/AiWorkbenchPageClient";
import { McpProtocolSandbox } from "@/components/ai/McpProtocolSandbox";
import { InterviewDefenseArena } from "@/components/hiring/InterviewDefenseArena";
import { RedTeamCritiquePanel } from "@/components/ai/RedTeamCritiquePanel";
import styles from "@/components/ai/ai-workbench.module.css";
import { getAllRedTeamDecks } from "@/data/critique/red-team";
import { getSemanticIndexStats } from "@/lib/ai/hybrid-retrieval";
import { localizeInternalHref } from "@/lib/locale-href";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "AI 实验室 · 零幻觉交互证据与拒绝边界"
      : "AI Lab · Zero-Hallucination Evidence & Refusal Boundaries";
  const description =
    locale === "zh"
      ? `${siteConfig.author.nameZh} 的 AI 实验室：本地 PII 脱敏、双语 BM25 加权检索与静态证明库原文还原，拒绝大语言模型编造数据。`
      : `Grounded AI Lab by ${siteConfig.name}: local PII scrubbing, bilingual BM25 scoring, and strict static corpus hydration.`;

  return {
    title,
    description,
    alternates: buildAlternates("/ai", locale),
    openGraph: buildOpenGraph({ title, description, path: "/ai", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

const REFUSAL_MATRIX: ReadonlyArray<{
  name: { en: string; zh: string };
  rule: { en: string; zh: string };
  fallback: { en: string; zh: string };
  href?: string;
}> = [
  {
    name: { en: "Walkie", zh: "Walkie 手腕语音助手" },
    rule: {
      en: "High-risk shell/file calls block until physical watch button press",
      zh: "高危命令行/文件工具调用阻塞至手表实体前键批准，口述「yes」不放行",
    },
    fallback: {
      en: "Explicit OFFLINE separation (No Wi-Fi / Relay unreachable / Bridge offline)",
      zh: "离线界面严格拆分为无 Wi-Fi / 云中继不可达 / 电脑桥离线三种状态",
    },
    href: "/projects/walkie#design-decisions",
  },
  {
    name: { en: "Lamplight Nook", zh: "Lamplight Nook" },
    rule: {
      en: "Risky agent actions default to 'not now'; Enter key fatigue blocked",
      zh: "高风险确认弹窗默认聚焦「先不要」，阻断惯性按回车误确认",
    },
    fallback: {
      en: "Folder-scoped local execution + spoken micro-step cues",
      zh: "限定用户主动授权目录内读写 + 低压力咖啡馆 Crew 分工展示",
    },
    href: "/projects/lamplight#design-decisions",
  },
  {
    name: { en: "Resume Autofill", zh: "Resume Autofill" },
    rule: {
      en: "Visa, salary, and open-ended essays stay blank rather than LLM-guessed",
      zh: "签证身份、薪资期望与开放式长问答题强制留白，绝不 AI 代猜",
    },
    fallback: {
      en: "Deterministic exact match fills first; final form submit locked manual",
      zh: "仅确定字段自动填充；最终 Submit 按钮永久锁定纯手动提交",
    },
    href: "/projects/autofill#design-decisions",
  },
  {
    name: { en: "This AI Lab Pipeline", zh: "本站 AI 实验室防篡改管线" },
    rule: {
      en: "External LLM may only pick IDs from candidate allowlist; text is static-hydrated",
      zh: "即使接大模型重排也仅准返回候选 ID，展示正文 100% 从静态证明库回表读取",
    },
    fallback: {
      en: "Zero-key local bilingual BM25 + honest non-match refusal when ungrounded",
      zh: "无 API Key 也能用纯本地 BM25 运行；未命中证据直接坦诚拒答",
    },
  },
];

export default async function AiWorkbenchPage() {
  const rawLocale = await getLocale();
  const locale: "en" | "zh" = rawLocale === "zh" ? "zh" : "en";
  const isZh = locale === "zh";
  const redTeamDecks = getAllRedTeamDecks();
  const semanticStats = getSemanticIndexStats();

  return (
    <main className="page" data-screen-label="09 Rationale AI">
      <section className="container lab-hero">
        <div className="v4-editorial-grid">
          <div className="v4-span-8">
            <div className="eyebrow">
              {isZh ? "AI 实验室 · 拒绝边界与证据溯源" : "AI Lab · Refusal Boundaries & Grounded Defense"}
            </div>
            <h1 className="h-display h1" style={{ marginTop: 12 }}>
              {isZh ? "会拒绝胡编的 AI，才敢写进产品" : "AI built to show receipts, never invent them"}
            </h1>
            <p className="sub">
              {isZh
                ? "把作品集里每个设计冲突、被否决的常规方案和尚未实测的局限开放成可核查工作台。问题先在浏览器脱敏，再通过加权 BM25 命中公开案例与深度专栏，所有答案原文物理还原自验证库。"
                : "Ask about any design tension, rejected alternative, or honest validation gap. Prompts scrub PII locally before bilingual BM25 scoring across 6 listed cases and technical essays — zero fabricated metrics allowed."}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18 }}>
              <Link className="btn btn-ghost" href={localizeInternalHref("/hire", locale)}>
                {isZh ? "前往面试决策室 & JD 匹配 →" : "Open Hiring Dossier & JD Matcher →"}
              </Link>
              <Link className="btn btn-ghost" href={localizeInternalHref("/brief/print", locale)}>
                {isZh ? "生成可打印 A4 评注本 ↗" : "Open A4 Critique Print Dossier ↗"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AiWorkbenchPageClient locale={locale} semanticStats={semanticStats} />

      <McpProtocolSandbox locale={locale} />

      <InterviewDefenseArena locale={locale} />

      <section className="section container">
        <RedTeamCritiquePanel decks={redTeamDecks} locale={locale} />
      </section>

      <section className="section container" aria-labelledby="refusal-matrix-heading">
        <div style={{ marginBottom: 16 }}>
          <span className="eyebrow">{isZh ? "跨项目架构准则" : "Cross-Portfolio Refusal Rules"}</span>
          <h2 id="refusal-matrix-heading" className="h-display h2" style={{ marginTop: 6 }}>
            {isZh ? "四套产品如何界定「系统绝不代人拍板」的红线" : "Where each system stops short and hands control back"}
          </h2>
        </div>

        <div className={styles.matrixTableWrap}>
          <table className={styles.matrixTable}>
            <caption className="visually-hidden">
              {isZh ? "各个 AI 与硬件作品的默认拒绝边界与降级机制" : "Explicit refusal rules and fallback mechanisms across projects"}
            </caption>
            <thead>
              <tr>
                <th scope="col">{isZh ? "系统 / 作品" : "System"}</th>
                <th scope="col">{isZh ? "强制拒绝红线" : "Mandatory Refusal Boundary"}</th>
                <th scope="col">{isZh ? "离线 / 确定性降级" : "Deterministic Fallback"}</th>
              </tr>
            </thead>
            <tbody>
              {REFUSAL_MATRIX.map((row) => (
                <tr key={row.name.en}>
                  <th scope="row" style={{ color: "var(--text)" }}>
                    {row.href ? (
                      <Link href={localizeInternalHref(row.href, locale)} className="u-underline">
                        {row.name[locale]} ↗
                      </Link>
                    ) : (
                      row.name[locale]
                    )}
                  </th>
                  <td>{row.rule[locale]}</td>
                  <td>{row.fallback[locale]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
