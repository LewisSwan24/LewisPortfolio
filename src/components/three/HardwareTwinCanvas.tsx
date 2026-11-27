"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import type { ReplayFrame, ReplayTrackSlug } from "@/lib/replay/schema";
import {
  HARDWARE_TWIN_ZONES,
  mapReplayFrameToHardwareTwin,
  type HardwareZoneId,
} from "@/lib/replay/hardware-twin-map";
import { useWebGLSupport } from "./useWebGLSupport";
import styles from "./hardware-twin.module.css";

const HardwareFieldWebGL = dynamic(
  () => import("./HardwareFieldWebGL").then((mod) => mod.HardwareFieldWebGL),
  { ssr: false, loading: () => null }
);

export function HardwareTwinCanvas({
  slug,
  frame,
  locale,
  onSelectZone,
}: {
  slug: ReplayTrackSlug;
  frame: ReplayFrame;
  locale: "en" | "zh";
  onSelectZone?: (zoneId: HardwareZoneId) => void;
}) {
  const isZh = locale === "zh";
  const [webglLost, setWebglLost] = useState(false);
  const [forceSchematic, setForceSchematic] = useState(false);
  const [manualZoneId, setManualZoneId] = useState<HardwareZoneId | null>(null);

  const webgl = useWebGLSupport(!webglLost && !forceSchematic);
  const showWebGL = webgl.supported && !webglLost && !forceSchematic;
  const zones = HARDWARE_TWIN_ZONES[slug];
  const mapped = mapReplayFrameToHardwareTwin(slug, frame);

  // Clear temporary manual subsystem highlight whenever active frame or slug changes
  useEffect(() => {
    setManualZoneId(null);
  }, [slug, frame.id]);

  const activeZoneId = manualZoneId ?? mapped.activeZoneId;
  const activeZone =
    zones.find((zone) => zone.id === activeZoneId) ?? mapped.activeZone;

  const handleContextLost = useCallback(() => {
    setWebglLost(true);
  }, []);

  const handleContextRestored = useCallback(() => {
    setWebglLost(false);
  }, []);

  const renderMode = showWebGL ? "webgl-3d" : "svg-fallback";

  return (
    <section
      className={styles.twinCard}
      data-testid="hardware-twin-panel"
      data-render-mode={renderMode}
      data-active-zone={activeZoneId}
      data-fault-state={mapped.faultState}
      aria-label={isZh ? "双向协议联动 3D 硬件数字孪生" : "Bidirectional 3D hardware digital twin"}
    >
      <div className={styles.twinHead}>
        <div>
          <span className={styles.twinEyebrow}>
            {isZh
              ? "Spatial 3D Digital Twin · 协议帧联动标本"
              : "Spatial 3D Digital Twin · Frame-Locked Specimen"}
          </span>
          <div style={{ fontSize: 13.5, fontWeight: 600, marginTop: 2 }}>
            {activeZone.label[locale]} ·{" "}
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400 }}>
              {activeZone.pinOrBus}
            </span>
          </div>
        </div>

        <div className={styles.twinControls}>
          {/* v6.9 (review R22): only offer the switch when it can do something. With
              reduced motion on, or no WebGL, "Restore 3D" toggled state that changed
              nothing; the HUD badge already says why the view is 2D. */}
          {(showWebGL || forceSchematic || webglLost) && (
          <button
            type="button"
            className={styles.modeBtn}
            data-testid="twin-toggle-fallback"
            onClick={() => {
              if (webglLost) {
                setWebglLost(false);
                setForceSchematic(false);
              } else {
                setForceSchematic((prev) => !prev);
              }
            }}
          >
            {showWebGL
              ? isZh
                ? "切换 2D 图纸"
                : "2D Schematic"
              : isZh
                ? "尝试恢复 3D"
                : "Restore 3D"}
          </button>
          )}
        </div>
      </div>

      <div
        className={styles.stageFrame}
        data-fault={mapped.faultState}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className={styles.hudCorner} data-testid="twin-hud-mode">
          {showWebGL
            ? isZh
              ? "WebGL 3D 联动"
              : "WebGL 3D Live"
            : webglLost
              ? isZh
                ? "上下文丢失 · 2D 安全降级"
                : "Context Lost · 2D Fallback"
              : webgl.reducedMotion
                ? isZh
                  ? "动态减弱 · 2D 图纸"
                  : "Reduced Motion · 2D"
                : isZh
                  ? "2D 原理降级视图"
                  : "2D Schematic Fallback"}
        </div>

        <svg
          viewBox="0 0 320 180"
          className={styles.svgStage}
          data-testid="hardware-twin-svg"
          aria-hidden="true"
          style={{ opacity: showWebGL ? 0.14 : 1 }}
        >
          <rect
            x="18"
            y="16"
            width="284"
            height="148"
            rx="6"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.18"
            strokeDasharray="3 3"
          />

          {slug === "walkie" && (
            <g>
              <rect
                x="116"
                y="36"
                width="88"
                height="108"
                rx="6"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.5"
                strokeWidth="1.5"
              />
              <rect
                x="136"
                y="88"
                width="48"
                height="32"
                rx="3"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.55"
              />
              <ellipse
                cx="160"
                cy="90"
                rx="96"
                ry="42"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.28"
                strokeDasharray="4 4"
              />
            </g>
          )}

          {slug === "maze" && (
            <g>
              <rect
                x="64"
                y="42"
                width="192"
                height="96"
                rx="4"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.5"
                strokeWidth="1.5"
              />
              <circle cx="122" cy="90" r="24" fill="none" stroke="currentColor" strokeOpacity="0.5" />
              <circle cx="198" cy="90" r="24" fill="none" stroke="currentColor" strokeOpacity="0.5" />
              <line x1="160" y1="42" x2="160" y2="138" stroke="currentColor" strokeOpacity="0.5" />
            </g>
          )}

          {slug === "onthebeat" && (
            <g>
              <circle cx="110" cy="90" r="22" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" />
              <circle cx="210" cy="90" r="22" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" />
              <ellipse
                cx="160"
                cy="90"
                rx="92"
                ry="44"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.35"
                strokeDasharray="4 4"
              />
            </g>
          )}

          <rect
            x={activeZone.svgFocus.x}
            y={activeZone.svgFocus.y}
            width={activeZone.svgFocus.w}
            height={activeZone.svgFocus.h}
            rx="5"
            fill={mapped.faultState === "fault" ? "#c43d2d" : mapped.faultState === "recovered" ? "#226f4c" : "var(--accent)"}
            fillOpacity="0.22"
            stroke={mapped.faultState === "fault" ? "#c43d2d" : mapped.faultState === "recovered" ? "#226f4c" : "var(--accent)"}
            strokeWidth="2"
            data-testid="twin-svg-focus-box"
          />
        </svg>

        {showWebGL && (
          <div className={styles.webglWrap}>
            <HardwareFieldWebGL
              slug={slug}
              twinState={{
                activeZoneId,
                faultState: mapped.faultState,
                signalLevel: frame.signalLevel,
                reducedMotion: webgl.reducedMotion,
              }}
              onContextLost={handleContextLost}
              onContextRestored={handleContextRestored}
            />
          </div>
        )}
      </div>

      <div
        className={styles.zoneRow}
        role="group"
        aria-label={isZh ? "硬件子系统分区切换" : "Hardware subsystem inspection"}
      >
        {zones.map((zone) => {
          const isCurrent = zone.id === activeZoneId;
          return (
            <button
              key={zone.id}
              type="button"
              className={styles.zoneBtn}
              aria-pressed={isCurrent}
              data-testid={`twin-zone-btn-${zone.id}`}
              onClick={() => {
                setManualZoneId(zone.id);
                onSelectZone?.(zone.id);
              }}
            >
              <span>{zone.label[locale]}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.calloutBox} data-fault={mapped.faultState} data-testid="twin-callout">
        <div className={styles.pinMeta}>
          {activeZone.pinOrBus} ·{" "}
          {isZh ? `信号强度 ${frame.signalLevel}%` : `Signal ${frame.signalLevel}%`}
        </div>
        <div>
          {manualZoneId
            ? activeZone.role[locale]
            : mapped.telemetryCallout[locale]}
        </div>
      </div>
    </section>
  );
}
