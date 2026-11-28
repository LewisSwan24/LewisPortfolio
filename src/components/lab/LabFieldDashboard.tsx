"use client";

import { useMemo, useState } from "react";
import {
  buildDailySeries,
  buildTableRows,
  DASHBOARD_METRICS,
  formatMetricValue,
  sparklineGeometry,
  THRESHOLDS,
  type ByRouteGroup,
  type DailyRow,
  type DashboardMetric,
  type Rating,
} from "@/lib/vitals-dashboard";
import styles from "./lab-field-data.module.css";

export interface TelemetrySummary {
  source?: "kv" | "memory";
  windowDays?: number;
  sampleCount: number;
  byRouteGroup?: ByRouteGroup;
  daily?: DailyRow[];
}

const GROUPS: Record<string, { en: string; zh: string; path: string }> = {
  home: { en: "Home", zh: "首页", path: "/" },
  projects: { en: "Projects", zh: "项目", path: "/projects" },
  case: { en: "Case pages", zh: "案例页", path: "/projects/*" },
  hire: { en: "Hire & CV", zh: "招聘与简历", path: "/hire" },
  lab: { en: "UI Lab", zh: "UI 实验室", path: "/lab" },
  blog: { en: "Blog", zh: "博客", path: "/blog/*" },
  brief: { en: "Briefs", zh: "简报", path: "/brief/*" },
  other: { en: "Other pages", zh: "其他页面", path: "" },
};

const RATING_TEXT: Record<Rating, { en: string; zh: string }> = {
  good: { en: "Good", zh: "良好" },
  "needs-improvement": { en: "Needs improvement", zh: "需改进" },
  poor: { en: "Poor", zh: "较差" },
  "few-samples": { en: "Few samples", zh: "样本不足" },
  none: { en: "No data", zh: "无数据" },
};

const RATING_GLYPH: Partial<Record<Rating, string>> = {
  good: "●",
  "needs-improvement": "▲",
  poor: "■",
  "few-samples": "○",
};

const SPARK_W = 160;
const SPARK_H = 32;

function Sparkline({ series, metric }: { series: Array<{ day: string; value: number | null; count: number }>; metric: DashboardMetric }) {
  const good = THRESHOLDS[metric][0];
  const peak = Math.max(good, ...series.map((s) => s.value ?? 0));
  const max = peak * 1.1;
  const { path, dots } = sparklineGeometry(
    series.map((s) => s.value),
    { width: SPARK_W, height: SPARK_H, max },
  );
  const thresholdY = SPARK_H - (good / max) * SPARK_H;
  const step = series.length > 1 ? SPARK_W / (series.length - 1) : SPARK_W;
  return (
    <svg
      className={styles.spark}
      viewBox={`-4 -4 ${SPARK_W + 8} ${SPARK_H + 8}`}
      width={SPARK_W + 8}
      height={SPARK_H + 8}
      aria-hidden="true"
      focusable="false"
    >
      <line className={styles.sparkBase} x1={0} x2={SPARK_W} y1={SPARK_H} y2={SPARK_H} />
      <line className={styles.sparkThreshold} x1={0} x2={SPARK_W} y1={thresholdY} y2={thresholdY} />
      {path ? <path className={styles.sparkLine} d={path} /> : null}
      {dots.map((d) => (
        <circle key={`${d.x}-${d.y}`} className={styles.sparkDot} cx={d.x} cy={d.y} r={3} />
      ))}
      {series.map((s, i) =>
        s.value === null ? null : (
          <rect
            key={s.day}
            className={styles.sparkHit}
            x={i * step - step / 2}
            y={-4}
            width={step}
            height={SPARK_H + 8}
          >
            <title>{`${s.day}: ${formatMetricValue(metric, s.value)} (n = ${s.count})`}</title>
          </rect>
        ),
      )}
    </svg>
  );
}

export function LabFieldDashboard({ locale, summary }: { locale: "en" | "zh"; summary: TelemetrySummary }) {
  const isZh = locale === "zh";
  const t = (text: { en: string; zh: string }) => (isZh ? text.zh : text.en);
  const [metric, setMetric] = useState<DashboardMetric>("LCP");

  const rows = useMemo(() => buildTableRows(summary.byRouteGroup ?? {}), [summary]);
  const daily = summary.daily ?? [];
  const windowDays = summary.windowDays ?? 30;
  // The window ends on the latest day with data, so the chart does not drift
  // into empty days when nothing has arrived since.
  const endDay = daily.reduce((latest, d) => (d.day > latest ? d.day : latest), "") || new Date().toISOString().slice(0, 10);

  const sourceText =
    summary.source === "kv"
      ? t({ en: "stored across all servers", zh: "所有服务器共享存储" })
      : t({ en: "this server only, since its last restart", zh: "仅本服务器内存，重启后清空" });

  return (
    <section className="container section" aria-labelledby="lab-rum-heading">
      <div className={`v4-studio-plate ${styles.plate}`}>
        <div>
          <div className="label">05 · {t({ en: "Field data (RUM)", zh: "真实用户数据 (RUM)" })}</div>
          <h2 id="lab-rum-heading" className={`h-display ${styles.heading}`}>
            {t({ en: "How fast the site is for real visitors", zh: "真实访客看到的加载与响应速度" })}
          </h2>
          <p className={styles.context}>
            {isZh
              ? `最近 ${windowDays} 天 · ${summary.sampleCount} 个样本 · ${sourceText} · 不计爬虫、无头浏览器和 Lighthouse。`
              : `Last ${windowDays} days · ${summary.sampleCount} samples · ${sourceText} · crawlers, headless browsers and Lighthouse runs are not counted.`}
          </p>
          <p className={`prose ${styles.method}`}>
            {t({
              en: "Each cell is the 75th percentile for that route group, rated against Google's Core Web Vitals thresholds. A cell with fewer than 10 samples is shown but not rated. No cookies, IP addresses or user agents are stored.",
              zh: "每格是该页面组的第 75 百分位，按 Google 的 Core Web Vitals 门槛评级；样本少于 10 个的格子只显示数值，不评级。不存 Cookie、IP 地址或浏览器标识。",
            })}
          </p>
        </div>

        <div
          className={styles.tableWrap}
          role="region"
          aria-label={t({ en: "p75 by route group and metric", zh: "各页面组各指标的 p75" })}
          tabIndex={0}
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">{t({ en: "Route group", zh: "页面组" })}</th>
                {DASHBOARD_METRICS.map((m) => (
                  <th scope="col" key={m}>
                    {m} (p75)
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.group}>
                  <th scope="row">
                    {t(GROUPS[row.group])}
                    {GROUPS[row.group].path ? <span className={styles.path}>{GROUPS[row.group].path}</span> : null}
                  </th>
                  {DASHBOARD_METRICS.map((m) => {
                    const cell = row.cells[m];
                    if (cell.rating === "none") {
                      return (
                        <td key={m} className={styles.empty}>
                          {t(RATING_TEXT.none)}
                        </td>
                      );
                    }
                    return (
                      <td key={m}>
                        <span className={styles.value}>{formatMetricValue(m, cell.p75)}</span>
                        <span className={styles.rating} data-rating={cell.rating}>
                          <span className={styles.glyph} aria-hidden="true">
                            {RATING_GLYPH[cell.rating]}
                          </span>
                          {t(RATING_TEXT[cell.rating])}
                        </span>
                        <span className={styles.count}>n = {cell.count}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.trend}>
          <div className={styles.trendHead}>
            <h3 className={styles.trendTitle}>{t({ en: `${windowDays}-day trend`, zh: `${windowDays} 天趋势` })}</h3>
            <div className={styles.switch} role="group" aria-label={t({ en: "Metric", zh: "指标" })}>
              {DASHBOARD_METRICS.map((m) => (
                <button
                  key={m}
                  type="button"
                  className={styles.switchButton}
                  aria-pressed={metric === m}
                  onClick={() => setMetric(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <p className={styles.legend}>
            {t({
              en: `p75 per day; the dashed line is the "good" threshold. Days with fewer than 3 samples are gaps.`,
              zh: "每日 p75；虚线是“良好”门槛。样本少于 3 个的日子留空。",
            })}
          </p>
          <ul
            className={styles.trendList}
            aria-label={t({
              en: `${windowDays}-day trend: ${metric} p75 by route group`,
              zh: `${windowDays} 天趋势：各页面组的 ${metric} p75`,
            })}
          >
            {rows.map((row) => {
              const series = buildDailySeries(daily, metric, row.group, endDay, windowDays);
              const shown = series.filter((s) => s.value !== null);
              const first = shown[0];
              const last = shown[shown.length - 1];
              const summaryText = !first
                ? t({ en: "Too few samples per day", zh: "每日样本不足" })
                : first === last
                  ? formatMetricValue(metric, first.value)
                  : `${formatMetricValue(metric, first.value)} → ${formatMetricValue(metric, last.value)}`;
              return (
                <li key={row.group} className={styles.trendItem}>
                  <span className={styles.trendLabel}>{t(GROUPS[row.group])}</span>
                  <Sparkline series={series} metric={metric} />
                  <span className={styles.trendValue}>{summaryText}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
