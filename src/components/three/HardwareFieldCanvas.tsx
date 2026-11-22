"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { HardwareSpecimenSlug, ThreeLocale } from "./types";
import { useWebGLSupport } from "./useWebGLSupport";

const HardwareFieldWebGL = dynamic(
  () => import("./HardwareFieldWebGL").then((mod) => mod.HardwareFieldWebGL),
  { ssr: false, loading: () => null }
);

const HARDWARE_SPECS: Record<
  HardwareSpecimenSlug,
  {
    en: { title: string; summary: string };
    zh: { title: string; summary: string };
  }
> = {
  walkie: {
    en: {
      title: "M5StickS3 dual-key specimen",
      summary: "Physical Front & Side keys separate approval gates from background speech over encrypted USB / Fly.io relay.",
    },
    zh: {
      title: "M5StickS3 实体双键标本",
      summary: "实体前键与侧键将高风险命令批准锁定在拇指本体感觉中，语音仅提供上下文摘要。",
    },
  },
  maze: {
    en: {
      title: "Shared colour conductive maze",
      summary: "Paired conductive wristbands share axes between players so physical touch replaces isolated controller focus.",
    },
    zh: {
      title: "共色腕带协作迷宫标本",
      summary: "共色导电腕带将单一移动轴耦合在两名玩家手里，促使共处一室的人抬头配合。",
    },
  },
  onthebeat: {
    en: {
      title: "BLE proximity threshold specimen",
      summary: "RSSI bands (-68 / -58 dBm) unlock anonymous wave cards and fade quietly after mutual nod reveal.",
    },
    zh: {
      title: "BLE 临近感应退场标本",
      summary: "以 RSSI 距离阈值与三阶无名卡片开启搭话，双方点头揭示身份后硬件即刻静默退场。",
    },
  },
};

export function HardwareFieldCanvas({
  slug,
  locale,
}: {
  slug: HardwareSpecimenSlug;
  locale: ThreeLocale;
}) {
  const [webglLost, setWebglLost] = useState(false);
  const webgl = useWebGLSupport(!webglLost);
  const copy = HARDWARE_SPECS[slug][locale];

  return (
    <aside
      className="hardware-field-card v4-studio-plate"
      aria-label={copy.title}
    >
      <div className="hardware-field-meta">
        <span className="eyebrow">
          {locale === "zh" ? "硬件结构标本" : "Physical specimen"}
        </span>
        <strong style={{ fontSize: 15 }}>{copy.title}</strong>
        <p>{copy.summary}</p>
      </div>

      <div className="hardware-field-stage">
        <svg
          viewBox="0 0 320 180"
          className="hardware-field-svg"
          data-testid="hardware-field-svg"
          aria-hidden="true"
          style={{ opacity: webgl.supported ? 0 : 1 }}
        >
          <rect x="24" y="20" width="272" height="140" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeDasharray="3 3" />
          {slug === "walkie" && (
            <g>
              <rect x="116" y="36" width="88" height="108" rx="4" fill="none" stroke="var(--case-mood, var(--accent))" strokeWidth="1.5" />
              <rect x="136" y="88" width="48" height="32" rx="2" fill="var(--case-mood, var(--accent))" fillOpacity="0.18" stroke="var(--case-mood, var(--accent))" />
            </g>
          )}
          {slug === "maze" && (
            <g>
              <rect x="64" y="42" width="192" height="96" fill="none" stroke="var(--case-mood, var(--accent))" strokeWidth="1.5" />
              <circle cx="122" cy="90" r="24" fill="none" stroke="currentColor" strokeOpacity="0.65" />
              <circle cx="198" cy="90" r="24" fill="none" stroke="var(--case-mood, var(--accent))" />
            </g>
          )}
          {slug === "onthebeat" && (
            <g>
              <circle cx="110" cy="90" r="22" fill="none" stroke="var(--case-mood, var(--accent))" strokeWidth="1.5" />
              <circle cx="210" cy="90" r="22" fill="none" stroke="currentColor" strokeOpacity="0.65" strokeWidth="1.5" />
              <ellipse cx="160" cy="90" rx="92" ry="44" fill="none" stroke="var(--case-mood, var(--accent))" strokeOpacity="0.32" strokeDasharray="4 4" />
            </g>
          )}
        </svg>

        {webgl.supported && (
          <div className="hardware-field-webgl-layer">
            <HardwareFieldWebGL slug={slug} onContextLost={() => setWebglLost(true)} />
          </div>
        )}
      </div>
    </aside>
  );
}
