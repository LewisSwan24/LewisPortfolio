"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { StructuredRationaleCard } from "@/components/ai/StructuredRationaleCard";
import {
  fetchGroundedEvidence,
  PRESET_DESIGN_QUESTIONS,
  type GroundedMatchGroup,
} from "@/lib/ai/client";
import { localizeInternalHref } from "@/lib/locale-href";
import { trackInteraction } from "@/lib/web-vitals";

export function StudioAssistantDrawer({ locale }: { locale: "en" | "zh" }) {
  const isZh = locale === "zh";
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<GroundedMatchGroup[]>([]);
  const [modeNote, setModeNote] = useState("");
  const [error, setError] = useState("");

  // Hide the floating drawer trigger inside the dedicated /ai workbench
  if (/^\/(en|zh)?\/?ai(\/|$)/.test(pathname ?? "")) {
    return null;
  }

  const runQuery = async (text: string) => {
    const clean = text.trim();
    if (clean.length < 3) return;
    setLoading(true);
    setError("");
    trackInteraction("rationale-ai");
    try {
      const { response, clientRedactedCount } = await fetchGroundedEvidence(clean, locale);
      if (!response.ok) {
        setError(response.error ?? (isZh ? "请求暂不可用。" : "Request unavailable."));
        setMatches([]);
      } else {
        setMatches(response.matches ?? []);
        const scrubbed = Math.max(clientRedactedCount, response.redactedCount ?? 0);
        const corpusCount = response.pipeline?.corpusCount ?? 0;
        setModeNote(
          scrubbed > 0
            ? isZh
              ? `已本地脱敏 ${scrubbed} 处敏感信息 · ${corpusCount} 条证明库查表`
              : `Scrubbed ${scrubbed} PII item(s) · ${corpusCount}-chunk static corpus`
            : isZh
              ? `纯静态证明库（${corpusCount} 条）· 零幻觉结构化回表`
              : `Static corpus (${corpusCount} chunks) · Zero-hallucination cards`
        );
      }
    } catch {
      setError(isZh ? "网络异常，请稍后再试。" : "Network error, please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="studio-assistant-wrap no-print">
      {open && (
        <section
          className="studio-assistant-drawer"
          role="dialog"
          aria-modal="false"
          aria-label={isZh ? "设计论证与证据助手" : "Design Rationale Navigator"}
        >
          <header className="studio-assistant-head">
            <div>
              <span className="eyebrow">{isZh ? "零幻觉证据检索" : "Grounded Rationale AI"}</span>
              <strong>{isZh ? "设计取舍追问台" : "Ask Design Tradeoffs"}</strong>
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <Link
                href={localizeInternalHref("/ai", locale)}
                className="btn btn-ghost"
                style={{ padding: "4px 10px", fontSize: 12 }}
                onClick={() => setOpen(false)}
              >
                {isZh ? "AI 实验室 ↗" : "AI Lab ↗"}
              </Link>
              <button
                type="button"
                className="btn btn-ghost"
                style={{ padding: "4px 10px", fontSize: 12 }}
                onClick={() => setOpen(false)}
                aria-label={isZh ? "收起助手" : "Close rationale assistant"}
              >
                {isZh ? "收起" : "Close"}
              </button>
            </div>
          </header>

          <div className="studio-assistant-presets">
            {PRESET_DESIGN_QUESTIONS.slice(0, 4).map((q) => (
              <button
                key={q.en}
                type="button"
                className="idx-filter"
                style={{ fontSize: 12, textAlign: "left" }}
                onClick={() => {
                  setQuery(q[locale]);
                  void runQuery(q[locale]);
                }}
              >
                {q[locale]}
              </button>
            ))}
          </div>

          <form
            className="studio-assistant-form"
            onSubmit={(e) => {
              e.preventDefault();
              void runQuery(query);
            }}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isZh ? "输入想核查的设计问题或边界..." : "Ask a design tradeoff question..."}
              aria-label={isZh ? "设计追问输入框" : "Design rationale query"}
            />
            <button type="submit" className="btn btn-primary" disabled={loading || query.trim().length < 3}>
              {loading ? "..." : isZh ? "查证" : "Ask"}
            </button>
          </form>

          {error && (
            <p role="alert" style={{ color: "var(--accent)", fontSize: 12, margin: 0 }}>
              {error}
            </p>
          )}
          {modeNote && (
            <output role="status" aria-live="polite" className="eyebrow" style={{ color: "var(--text-3)" }}>
              {modeNote}
            </output>
          )}

          {matches.length > 0 && (
            <ul className="studio-assistant-results">
              {matches.map((group) => (
                <li key={group.slug} className="studio-assistant-card">
                  <div className="studio-assistant-card-head">
                    <strong>{group.caseTitle}</strong>
                    <span className="tag">{group.reasonLabel}</span>
                  </div>
                  {group.citations.map((cit) => (
                    <div key={cit.id} onClick={() => setOpen(false)}>
                      <StructuredRationaleCard
                        citation={cit}
                        locale={locale}
                        compact
                        showInspector={false}
                      />
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <button
        type="button"
        className="studio-assistant-pill btn btn-primary"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {isZh ? "查设计依据" : "Rationale AI"}
      </button>
    </div>
  );
}
