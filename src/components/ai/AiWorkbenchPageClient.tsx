"use client";

import Link from "next/link";
import { useState } from "react";
import {
  fetchGroundedEvidence,
  type GroundedMatchGroup,
} from "@/lib/ai/client";
import { localizeInternalHref } from "@/lib/locale-href";
import { trackInteraction } from "@/lib/web-vitals";
import { StructuredRationaleCard } from "./StructuredRationaleCard";
import styles from "./ai-workbench.module.css";

type PerspectiveId = "interviewer" | "architect" | "hiring";

const PERSPECTIVE_PRESETS: Record<
  PerspectiveId,
  {
    enLabel: string;
    zhLabel: string;
    prompts: Array<{ en: string; zh: string }>;
  }
> = {
  interviewer: {
    enLabel: "Interviewer Tradeoff Critique",
    zhLabel: "面试官取舍追问视角",
    prompts: [
      {
        en: "Why physical watch buttons on Walkie instead of hands-free voice approval?",
        zh: "Walkie 为什么坚持手腕实体按键审批，而不是语音口令放行？",
      },
      {
        en: "How do Lamplight & Autofill curb habitual approval or hallucinated guesses?",
        zh: "Lamplight 与 Autofill 如何防止习惯性回车误放行或 AI 乱猜？",
      },
      {
        en: "Why does On The Beat withdraw right after a mutual nod in a gig?",
        zh: "On The Beat 为什么在演出人群握手确认后主动隐去屏幕界面？",
      },
    ],
  },
  architect: {
    enLabel: "Architecture & Safety Boundaries",
    zhLabel: "工程架构与安全边界视角",
    prompts: [
      {
        en: "How does the site maintain static SSG with strict CSP and WCAG AAA?",
        zh: "作品集如何兼顾静态页面 SSG、严格 CSP 与 WCAG AAA 正文对比度？",
      },
      {
        en: "What hardware debounce and fault-isolation rules run in MazeRunners?",
        zh: "MazeRunners 固件中做了哪些传感器防抖、舵机隔离与串口状态机规范？",
      },
      {
        en: "How does Grassland keep five RTS missions fair without level-specific buttons?",
        zh: "草原铁潮如何用单一策略文法覆盖五个关卡而不增添专属按键？",
      },
    ],
  },
  hiring: {
    enLabel: "Hiring JD Fit & Scope",
    zhLabel: "岗位 JD 匹配与诚实局限视角",
    prompts: [
      {
        en: "Design Engineer owning AI refusal boundaries, Three.js and accessible primitives",
        zh: "寻找兼具 AI 拒绝边界设计、Three.js 标本可视化与无障碍工程的工程师",
      },
      {
        en: "What honest user-study gaps and unverified claims are documented across cases?",
        zh: "六个核心项目各自有哪些尚未完成外部实测的诚实局限？",
      },
    ],
  },
};

interface HistoryEntry {
  query: string;
  mode: string;
  corpusCount: number;
  candidateCount: number;
  redactedCount: number;
  matches: GroundedMatchGroup[];
}

export function AiWorkbenchPageClient({
  locale,
  semanticStats,
}: {
  locale: "en" | "zh";
  semanticStats?: { version: string; dim: number; indexedCount: number };
}) {
  const isZh = locale === "zh";
  const [perspective, setPerspective] = useState<PerspectiveId>("interviewer");
  const [query, setQuery] = useState(PERSPECTIVE_PRESETS.interviewer.prompts[0]![locale]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  const current = history[activeIdx] ?? null;

  const runSearch = async (rawText: string) => {
    const clean = rawText.trim();
    if (clean.length < 3) return;
    setLoading(true);
    setError("");
    trackInteraction("rationale-ai");
    try {
      const { response, clientRedactedCount } = await fetchGroundedEvidence(clean, locale);
      if (!response.ok) {
        setError(response.error ?? (isZh ? "检索失败，请重试。" : "Lookup failed, please retry."));
      } else {
        const entry: HistoryEntry = {
          query: clean,
          mode: response.mode ?? "bm25-local",
          corpusCount: response.pipeline?.corpusCount ?? 0,
          candidateCount: response.pipeline?.candidateCount ?? 0,
          redactedCount: Math.max(clientRedactedCount, response.redactedCount ?? 0),
          matches: response.matches ?? [],
        };
        setHistory((prev) => [entry, ...prev].slice(0, 6));
        setActiveIdx(0);
      }
    } catch {
      setError(isZh ? "网络异常，请稍后再试。" : "Network error, please retry.");
    } finally {
      setLoading(false);
    }
  };

  const matchedCaseSlugs = current
    ? Array.from(new Set(current.matches.filter((m) => m.type !== "blog").map((m) => m.slug)))
    : [];

  return (
    <section className={`section container ${styles.workbenchWrap}`} aria-labelledby="ai-workbench-heading">
      <div className="v4-studio-plate" style={{ display: "grid", gap: "var(--s-4)" }}>
        <div>
          <span className="eyebrow">
            {isZh ? "四步零幻觉检索与防篡改管线" : "Zero-Hallucination Retrieval & Hydration Pipeline"}
          </span>
          <h2 id="ai-workbench-heading" className="h-display" style={{ fontSize: "clamp(22px, 2.5vw, 30px)", marginTop: 6 }}>
            {isZh
              ? "输入任何设计取舍问题、架构追问或岗位 JD"
              : "Interrogate design tradeoffs, architecture boundaries, or a role JD"}
          </h2>
        </div>

        <div className={styles.pipelineBar}>
          <div className={styles.pipelineStep}>
            <span className={styles.pipelineIndex}>01 · PII SCRUB</span>
            <strong>{isZh ? "本地脱敏截断" : "Local Redaction"}</strong>
            <p>{isZh ? "邮箱、电话与内网域名在发送前于浏览器端剥离（<=1200 字）。" : "Emails, phone numbers, and internal URLs stripped client-side."}</p>
          </div>
          <div className={styles.pipelineStep}>
            <span className={styles.pipelineIndex}>02 · HYBRID INDEX</span>
            <strong>{isZh ? "BM25F + 量化语义向量" : "BM25F + Quantized Vector"}</strong>
            <p>
              {isZh
                ? `融合字段加权 BM25F 与 ${semanticStats?.dim ?? 64} 维量化向量（覆盖 ${semanticStats?.indexedCount ?? 140} 条案例、Vault 与专栏证据）。`
                : `Fuses weighted BM25F with ${semanticStats?.dim ?? 64}-dim quantized vectors across ${semanticStats?.indexedCount ?? 140} verified chunks.`}
            </p>
          </div>
          <div className={styles.pipelineStep}>
            <span className={styles.pipelineIndex}>03 · ID ALLOWLIST</span>
            <strong>{isZh ? "仅允许返回编号" : "Strict ID Rerank"}</strong>
            <p>{isZh ? "即使接外置大模型重排，也只准从候选 ID 白名单点选。" : "Optional LLM rerank may pick strictly from verified corpus IDs."}</p>
          </div>
          <div className={styles.pipelineStep}>
            <span className={styles.pipelineIndex}>04 · HYDRATION</span>
            <strong>{isZh ? "物理证据表还原" : "Physical Table Hydration"}</strong>
            <p>{isZh ? "界面渲染 100% 取自静态校验库原文，彻底封死编造数据。" : "All copy, citations & limits hydrate verbatim from static proof tables."}</p>
          </div>
        </div>

        <div className={styles.perspectiveTabs} role="group" aria-label={isZh ? "检索视角" : "Query perspectives"}>
          {(Object.keys(PERSPECTIVE_PRESETS) as PerspectiveId[]).map((pid) => (
            <button
              key={pid}
              type="button"
              className={styles.perspectiveBtn}
              aria-pressed={perspective === pid}
              onClick={() => setPerspective(pid)}
            >
              {isZh ? PERSPECTIVE_PRESETS[pid].zhLabel : PERSPECTIVE_PRESETS[pid].enLabel}
            </button>
          ))}
        </div>

        <div className={styles.presetRow}>
          {PERSPECTIVE_PRESETS[perspective].prompts.map((item) => (
            <button
              key={item.en}
              type="button"
              className="idx-filter"
              onClick={() => {
                setQuery(item[locale]);
                void runSearch(item[locale]);
              }}
            >
              {item[locale]}
            </button>
          ))}
        </div>

        <form
          className={styles.queryForm}
          onSubmit={(e) => {
            e.preventDefault();
            void runSearch(query);
          }}
        >
          <label htmlFor="ai-workbench-query" className="eyebrow">
            {isZh ? "追问输入框（自动剥离敏感字符）" : "Ask design tradeoff or architecture question"}
          </label>
          <div className={styles.queryControls}>
            <input
              id="ai-workbench-query"
              type="text"
              className={styles.queryInput}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isZh ? "例如：为什么在 AI 填表遇到模糊问题时宁可留白？" : "e.g. Why refuse guessing ambiguous ATS dropdown fields?"}
            />
            <button type="submit" className="btn btn-primary" disabled={loading || query.trim().length < 3}>
              {loading ? (isZh ? "核验查表中..." : "Checking corpus...") : isZh ? "执行物理查表 →" : "Verify in corpus →"}
            </button>
          </div>
        </form>

        {error && (
          <p role="alert" style={{ color: "var(--accent)", margin: 0, fontSize: 13 }}>
            {error}
          </p>
        )}

        <output role="status" aria-live="polite" className={styles.telemetryStrip}>
          {current ? (
            <>
              <span>mode: <strong>{current.mode}</strong></span>
              <span>· {isZh ? "检索库" : "corpus"}: <strong>{current.corpusCount}</strong></span>
              <span>· {isZh ? "命中候选" : "candidates"}: <strong>{current.candidateCount}</strong></span>
              <span>· {isZh ? "脱敏" : "PII scrubbed"}: <strong>{current.redactedCount}</strong></span>
              {matchedCaseSlugs.length > 0 && (
                <Link
                  href={localizeInternalHref(`/brief/print?cases=${matchedCaseSlugs.join(",")}`, locale)}
                  className={styles.jumpLink}
                >
                  {isZh ? "导出命中案例为 A4 评注打印页 ↗" : "Open matched cases in A4 Critique Print ↗"}
                </Link>
              )}
            </>
          ) : (
            <span>
              {isZh
                ? "点击任意预设追问或输入自拟问题，查看「冲突 / 否决 / 取舍 / 局限」四栏原文依据与 BM25 打分链路。"
                : "Select a prompt or enter any question to inspect 4-quadrant evidence cards and live BM25 traceability."}
            </span>
          )}
        </output>

        {history.length > 1 && (
          <div className={styles.historyBar} aria-label={isZh ? "本次会话追问历史" : "Session query history"}>
            <span className="eyebrow">{isZh ? "会话记录：" : "Session history:"}</span>
            {history.map((item, idx) => (
              <button
                key={`${item.query}-${idx}`}
                type="button"
                className={`idx-filter${idx === activeIdx ? " active" : ""}`}
                onClick={() => setActiveIdx(idx)}
              >
                {item.query.length > 36 ? `${item.query.slice(0, 36)}…` : item.query}
              </button>
            ))}
          </div>
        )}
      </div>

      {current && (
        <div className={styles.resultsStack}>
          {current.matches.length === 0 ? (
            <div className={styles.groupCard}>
              <p style={{ margin: 0, color: "var(--text-2)" }}>
                {isZh
                  ? "静态证明库未命中足够关键词。这是系统刻意拒绝兜底编造的表现——请换用案例名称、硬件/交互规则或边界词汇重试。"
                  : "No static evidence chunks matched this query. By rule, the navigator refuses to synthesize ungrounded answers — try keywords around hardware, refusal rules, CSS, or specific cases."}
              </p>
            </div>
          ) : (
            current.matches.map((group) => (
              <article key={group.slug} className={styles.groupCard}>
                <header className={styles.groupHead}>
                  <span className={styles.groupTitle}>{group.caseTitle}</span>
                  <span className="tag">{group.reasonLabel}</span>
                </header>
                <div className={styles.citationList}>
                  {group.citations.map((cit) => (
                    <StructuredRationaleCard
                      key={cit.id}
                      citation={cit}
                      locale={locale}
                      showInspector
                    />
                  ))}
                </div>
              </article>
            ))
          )}
        </div>
      )}
    </section>
  );
}
