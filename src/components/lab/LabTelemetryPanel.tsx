"use client";

import { useEffect, useState } from "react";

interface TelemetrySummary {
  sampleCount: number;
  totalsByRouteGroup: Record<string, number>;
  interactionsByTarget: Record<string, number>;
  metricsP75: {
    LCP: number | null;
    INP: number | null;
    CLS: number | null;
    FCP: number | null;
    TTFB: number | null;
  };
}

export function LabTelemetryPanel({ locale }: { locale: "en" | "zh" }) {
  const isZh = locale === "zh";
  const [summary, setSummary] = useState<TelemetrySummary | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/vitals")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { ok?: boolean; summary?: TelemetrySummary } | null) => {
        if (alive && data?.ok && data.summary) {
          setSummary(data.summary);
        }
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);

  const fmtMs = (v: number | null | undefined, unit = "ms") =>
    v === null || v === undefined ? (isZh ? "采集待命" : "Awaiting") : `${v}${unit}`;

  return (
    <section
      className="container section"
      aria-labelledby="lab-rum-heading"
    >
      <div className="v4-studio-plate" style={{ display: "grid", gap: "var(--s-4)" }}>
        <div>
          <div className="label">05 · {isZh ? "零个人隐私实测遥测 (RUM)" : "Zero-PII Live Telemetry (RUM)"}</div>
          <h2 id="lab-rum-heading" className="h-display" style={{ fontSize: "clamp(20px, 2.2vw, 26px)", marginTop: 8 }}>
            {isZh
              ? "只收枚举型核心体验指标，不存 Cookie 与访客身份"
              : "Enum-only Web Vitals & interaction buckets without cookies or PII"}
          </h2>
          <p className="prose" style={{ marginTop: 6, maxWidth: "66ch" }}>
            <code>/api/vitals</code>{" "}
            {isZh
              ? "严格校验字段白名单，仅聚合页面组的 P75 LCP / INP / CLS 与关键原语互动频次。"
              : "strictly validates enum-only fields, keeping aggregate P75 CWV and prototype engagement metrics without storing user identifiers."}
          </p>
        </div>

        <div className="v4-editorial-grid">
          <div className="v4-span-4" style={{ border: "1px solid var(--border)", padding: 14, background: "var(--bg)" }}>
            <span className="eyebrow">LCP (p75)</span>
            <div style={{ fontSize: 24, fontFamily: "var(--font-mono)", marginTop: 6 }}>
              {fmtMs(summary?.metricsP75.LCP)}
            </div>
          </div>
          <div className="v4-span-4" style={{ border: "1px solid var(--border)", padding: 14, background: "var(--bg)" }}>
            <span className="eyebrow">INP (p75)</span>
            <div style={{ fontSize: 24, fontFamily: "var(--font-mono)", marginTop: 6 }}>
              {fmtMs(summary?.metricsP75.INP)}
            </div>
          </div>
          <div className="v4-span-4" style={{ border: "1px solid var(--border)", padding: 14, background: "var(--bg)" }}>
            <span className="eyebrow">CLS (p75) · {isZh ? "样本" : "Samples"}: {summary?.sampleCount ?? 0}</span>
            <div style={{ fontSize: 24, fontFamily: "var(--font-mono)", marginTop: 6 }}>
              {fmtMs(summary?.metricsP75.CLS, "")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
