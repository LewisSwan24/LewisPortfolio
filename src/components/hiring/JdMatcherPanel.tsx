"use client";

import Link from "next/link";
import { useState } from "react";
import { StructuredRationaleCard } from "@/components/ai/StructuredRationaleCard";
import {
  fetchGroundedEvidence,
  PRESET_DESIGN_QUESTIONS,
  type GroundedMatchGroup,
} from "@/lib/ai/client";
import { localizeInternalHref } from "@/lib/locale-href";
import type { ProofLocale } from "@/lib/portfolio-proof";

export function JdMatcherPanel({ locale }: { locale: ProofLocale }) {
  const isZh = locale === "zh";
  const [jdText, setJdText] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<GroundedMatchGroup[]>([]);
  const [status, setStatus] = useState("");
  const [briefUrl, setBriefUrl] = useState("");

  const handleAnalyze = async () => {
    if (jdText.trim().length < 3) return;
    setLoading(true);
    setBriefUrl("");
    try {
      const { response, clientRedactedCount, clientTruncated } = await fetchGroundedEvidence(
        jdText,
        locale
      );
      if (!response.ok) {
        setStatus(response.error ?? (isZh ? "分析失败" : "Analysis failed"));
        setMatches([]);
      } else {
        const list = response.matches ?? [];
        setMatches(list);
        const notes: string[] = [];
        if (clientRedactedCount > 0) {
          notes.push(
            isZh
              ? `发送前已在浏览器本地剥离 ${clientRedactedCount} 处邮箱/电话/网址`
              : `Redacted ${clientRedactedCount} PII field(s) locally before request`
          );
        }
        if (clientTruncated) {
          notes.push(isZh ? "已截断至 1200 字安全上限" : "Truncated to 1200 chars");
        }
        notes.push(
          isZh
            ? `命中 ${list.length} 组经物理证据库核验的案例论证`
            : `Matched ${list.length} case(s) grounded in static proof corpus`
        );
        setStatus(notes.join(" · "));
      }
    } catch {
      setStatus(isZh ? "请求异常" : "Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleExportBrief = async () => {
    const caseMatches = matches.filter((m) => m.type !== "blog" && !m.slug.startsWith("essay:"));
    if (caseMatches.length === 0) {
      setStatus(
        isZh
          ? "当前命中均为专栏文章，请至少命中 1 个案例后再生成定向简报。"
          : "Only essays matched so far — match at least one case study to build a tailored brief."
      );
      return;
    }
    setLoading(true);
    try {
      const topSlugs = caseMatches.map((m) => m.slug).slice(0, 4);
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          company: companyName.trim() || (isZh ? "定向评估团队" : "Hiring Team"),
          roleTrack: "design-eng",
          locale,
          slugs: topSlugs,
          intro:
            caseMatches
              .map((m) => `${m.caseTitle}: ${m.reasonLabel}`)
              .join(" · ")
              .slice(0, 260) || "Matched design rationale review",
        }),
      });
      const data = (await res.json()) as { ok?: boolean; url?: string; error?: string };
      if (data.ok && data.url) {
        setBriefUrl(data.url);
      } else {
        setStatus(data.error ?? (isZh ? "简报导出失败。" : "Failed to generate brief."));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="jd-matcher"
      className="section container"
      aria-labelledby="jd-matcher-heading"
    >
      <div className="v4-studio-plate" style={{ display: "grid", gap: "var(--s-4)" }}>
        <div>
          <div className="label">{isZh ? "零幻觉 JD 与设计论证匹配" : "Grounded JD & Rationale Matcher"}</div>
          <h2 id="jd-matcher-heading" className="h-display" style={{ fontSize: "clamp(22px, 2.5vw, 30px)", marginTop: 8 }}>
            {isZh
              ? "粘贴岗位描述（JD）或面试追问，自动对照真实取舍与诚实边界"
              : "Paste a role JD or interview prompt to inspect grounded design tradeoffs"}
          </h2>
          <p className="prose" style={{ marginTop: 6 }}>
            {isZh
              ? "发送前在浏览器端自动剥离邮箱、电话与内网网址并限制长度，不留存原文；所有返回论证文本均从本地静态证明库物理查表还原。"
              : "Emails, phone numbers, and URLs are stripped locally before matching, raw prompts are never persisted, and every returned claim hydrates strictly from static case records."}
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {PRESET_DESIGN_QUESTIONS.slice(0, 3).map((q) => (
            <button
              key={q.en}
              type="button"
              className="idx-filter"
              onClick={() => setJdText(q[locale])}
            >
              {q[locale]}
            </button>
          ))}
        </div>

        <div className="v4-editorial-grid">
          <div className="v4-span-8" style={{ display: "grid", gap: 10 }}>
            <label htmlFor="jd-matcher-input" className="eyebrow">
              {isZh ? "岗位需求 / 面试问题文本" : "Role description or interview question"}
            </label>
            <textarea
              id="jd-matcher-input"
              rows={4}
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder={
                isZh
                  ? "如：Seeking a Design Engineer who builds AI refusal boundaries and hardware prototypes..."
                  : "e.g. Seeking a Design Engineer who builds legible AI refusal boundaries and hardware prototypes..."
              }
              style={{
                width: "100%",
                padding: 12,
                border: "1px solid var(--border)",
                background: "var(--bg)",
                color: "var(--text)",
              }}
            />
          </div>
          <div className="v4-span-4" style={{ display: "grid", gap: 10, alignContent: "end" }}>
            <label htmlFor="jd-company-input" className="eyebrow">
              {isZh ? "公司名称（可选，用于导出简报）" : "Company name (optional for brief)"}
            </label>
            <input
              id="jd-company-input"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Anthropic / Linear"
              style={{
                width: "100%",
                padding: 10,
                border: "1px solid var(--border)",
                background: "var(--bg)",
                color: "var(--text)",
              }}
            />
            <button
              type="button"
              className="btn btn-primary"
              disabled={loading || jdText.trim().length < 3}
              onClick={() => void handleAnalyze()}
            >
              {loading
                ? isZh
                  ? "匹配中..."
                  : "Matching..."
                : isZh
                  ? "匹配证据与取舍 →"
                  : "Match grounded evidence →"}
            </button>
          </div>
        </div>

        {status && (
          <div role="status" className="eyebrow" style={{ color: "var(--text-2)" }}>
            {status}
          </div>
        )}

        {matches.length > 0 && (
          <div style={{ display: "grid", gap: "var(--s-3)" }}>
            <div className="v4-editorial-grid">
              {matches.map((group) => (
                <article
                  key={group.slug}
                  className="v4-span-6"
                  style={{
                    border: "1px solid var(--border)",
                    padding: "var(--s-4)",
                    background: "var(--bg)",
                    display: "grid",
                    gap: 10,
                    minInlineSize: 0,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                    <strong>{group.caseTitle}</strong>
                    <span className="tag">{group.reasonLabel}</span>
                  </div>
                  {group.citations.map((cit) => (
                    <StructuredRationaleCard
                      key={cit.id}
                      citation={cit}
                      locale={locale}
                      compact
                      showInspector
                    />
                  ))}
                </article>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <button
                type="button"
                className="btn btn-ghost"
                disabled={loading}
                onClick={() => void handleExportBrief()}
              >
                {isZh ? "一键生成这组案例的专属简报 →" : "Export matched cases to tailored brief →"}
              </button>
              <Link
                href={localizeInternalHref("/ai", locale)}
                className="btn btn-ghost"
              >
                {isZh ? "进入完整 AI 辩护工作台 ↗" : "Open full AI Workbench ↗"}
              </Link>
              {briefUrl && (
                <Link href={briefUrl} className="btn btn-primary">
                  {isZh ? "打开定制简报 ↗" : "Open matched brief ↗"}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
