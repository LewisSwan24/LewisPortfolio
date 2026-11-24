"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { VerifiedStatusBadge } from "@/components/case/deep/VerifiedStatusBadge";
import type { ReplayTrackSlug, ReplayTrace } from "@/lib/replay/schema";
import { mapReplayFrameToHardwareTwin, type HardwareZoneId } from "@/lib/replay/hardware-twin-map";
import { HardwareTwinCanvas } from "@/components/three/HardwareTwinCanvas";
import { ReplayWaveformSvg } from "./ReplayWaveformSvg";
import { WebSerialProbePanel } from "./WebSerialProbePanel";
import styles from "./replay.module.css";

const FAULT_BADGE: Record<"nominal" | "fault" | "recovered", { en: string; zh: string }> = {
  nominal: { en: "NOMINAL", zh: "正常帧" },
  fault: { en: "FAULT / GUARD", zh: "故障拦截" },
  recovered: { en: "RECOVERED", zh: "安全恢复" },
};

export function ReplayWorkbenchClient({
  traces,
  locale,
}: {
  traces: readonly ReplayTrace[];
  locale: "en" | "zh";
}) {
  const searchParams = useSearchParams();
  const requestedTrack = searchParams.get("track") as ReplayTrackSlug | null;
  const initialSlug: ReplayTrackSlug =
    traces.some((t) => t.slug === requestedTrack) && requestedTrack
      ? requestedTrack
      : (traces[0]?.slug ?? "walkie");

  const [trackSlug, setTrackSlug] = useState<ReplayTrackSlug>(initialSlug);
  const [faultMode, setFaultMode] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const isZh = locale === "zh";
  const activeTrace = traces.find((t) => t.slug === trackSlug) ?? traces[0]!;
  const frames = faultMode ? activeTrace.faultFrames : activeTrace.nominalFrames;
  const safeIndex = Math.min(frameIndex, frames.length - 1);
  const activeFrame = frames[safeIndex] ?? frames[0]!;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setFrameIndex((prev) => {
        if (prev + 1 >= frames.length) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 950);
    return () => window.clearInterval(timer);
  }, [playing, frames.length]);

  const switchTrack = (slug: ReplayTrackSlug) => {
    setPlaying(false);
    setFaultMode(false);
    setFrameIndex(0);
    setTrackSlug(slug);
  };

  const toggleFaultMode = () => {
    setPlaying(false);
    setFrameIndex(0);
    setFaultMode((prev) => !prev);
  };

  const stepBy = useCallback(
    (delta: number) => {
      setPlaying(false);
      setFrameIndex((prev) => Math.max(0, Math.min(frames.length - 1, prev + delta)));
    },
    [frames.length]
  );

  const handleStageKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      stepBy(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      stepBy(-1);
    } else if (e.key === " ") {
      e.preventDefault();
      setPlaying((p) => !p);
    }
  };

  return (
    <div className={styles.studioShell}>
      {/* Track & Fault Controls */}
      <div className={styles.trackBar}>
        <div
          className={styles.trackGroup}
          role="group"
          aria-label={isZh ? "选择硬件与协议轨迹" : "Select hardware or protocol trace"}
        >
          {traces.map((trace) => (
            <button
              key={trace.slug}
              type="button"
              className={styles.pillBtn}
              aria-pressed={trace.slug === activeTrace.slug}
              data-testid={`replay-track-${trace.slug}`}
              onClick={() => switchTrack(trace.slug)}
            >
              {trace.title[locale].split("·")[0]?.trim()}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={styles.faultBtn}
          aria-pressed={faultMode}
          data-testid="replay-fault-toggle"
          onClick={toggleFaultMode}
        >
          <span>{faultMode ? "⚡" : "○"}</span>
          <span>{activeTrace.faultInjectionLabel[locale]}</span>
        </button>
      </div>

      {/* Main Scrubber & Byte Inspector */}
      <div className={styles.workbenchGrid}>
        <section
          className={styles.stageCard}
          tabIndex={0}
          onKeyDown={handleStageKeyDown}
          aria-label={
            isZh
              ? "协议帧时序重放舞台，支持空格播放与左右方向键步进"
              : "Protocol frame replay stage, press Space to play or Left/Right arrows to step"
          }
          data-testid="replay-stage"
        >
          <header className={styles.stageHead}>
            <div>
              <span className={styles.eyebrow}>{activeTrace.transportSummary[locale]}</span>
              <h2 className={styles.stageTitle}>{activeTrace.title[locale]}</h2>
            </div>
            <VerifiedStatusBadge status={activeTrace.verifiedStatus} locale={locale} />
          </header>

          <p className={styles.calibrationNote}>
            <strong>{faultMode ? (isZh ? "故障注入场景：" : "Fault scenario: ") : (isZh ? "口径说明：" : "Calibration: ")}</strong>
            {faultMode
              ? activeTrace.faultInjectionSummary[locale]
              : activeTrace.honestCalibrationNote[locale]}
          </p>

          <ReplayWaveformSvg frames={frames} activeIndex={safeIndex} locale={locale} />

          <HardwareTwinCanvas
            slug={activeTrace.slug}
            frame={activeFrame}
            locale={locale}
            onSelectZone={(zoneId: HardwareZoneId) => {
              const matchingIdx = frames.findIndex(
                (f) => mapReplayFrameToHardwareTwin(activeTrace.slug, f).activeZoneId === zoneId
              );
              if (matchingIdx !== -1 && matchingIdx !== safeIndex) {
                setPlaying(false);
                setFrameIndex(matchingIdx);
              }
            }}
          />

          <div className={styles.transportRow}>
            <div className={styles.transportControls}>
              <button
                type="button"
                className={styles.transportBtn}
                disabled={safeIndex === 0}
                data-testid="replay-prev"
                onClick={() => stepBy(-1)}
              >
                ← {isZh ? "上一帧" : "Prev"}
              </button>
              <button
                type="button"
                className={styles.transportBtn}
                data-testid="replay-play"
                onClick={() => {
                  if (safeIndex >= frames.length - 1) setFrameIndex(0);
                  setPlaying((p) => !p);
                }}
              >
                {playing ? (isZh ? "❚❚ 暂停" : "❚❚ Pause") : (isZh ? "▶ 播放" : "▶ Play")}
              </button>
              <button
                type="button"
                className={styles.transportBtn}
                disabled={safeIndex >= frames.length - 1}
                data-testid="replay-next"
                onClick={() => stepBy(1)}
              >
                {isZh ? "下一帧" : "Next"} →
              </button>
              <button
                type="button"
                className={styles.transportBtn}
                data-testid="replay-reset"
                onClick={() => {
                  setPlaying(false);
                  setFrameIndex(0);
                }}
              >
                {isZh ? "↺ 归零" : "↺ Reset"}
              </button>
            </div>
            <span className={styles.kbdHint}>
              {isZh ? "键盘：Space 播放 · ← → 单步" : "Keys: Space play · ← → step"}
            </span>
          </div>

          <div
            className={styles.frameTimeline}
            role="group"
            aria-label={isZh ? "帧时间轴节点" : "Timeline frame steps"}
          >
            {frames.map((frame, idx) => (
              <button
                key={frame.id}
                type="button"
                className={styles.frameChip}
                aria-current={idx === safeIndex ? "step" : undefined}
                data-fault={frame.faultState}
                data-testid={`replay-frame-btn-${idx}`}
                onClick={() => {
                  setPlaying(false);
                  setFrameIndex(idx);
                }}
              >
                <span>#{idx + 1}</span>
                <span>{frame.timestampMs}ms</span>
              </button>
            ))}
          </div>
        </section>

        <aside
          className={styles.inspectorCard}
          aria-label={isZh ? "当前帧字节与结构解析器" : "Active frame byte and structural inspector"}
          data-testid="replay-inspector"
        >
          <div className={styles.stageHead}>
            <div>
              <span className={styles.eyebrow}>
                {activeFrame.channel} · t={activeFrame.timestampMs}ms
              </span>
              <h3 className={styles.stageTitle} data-testid="replay-active-state">
                {activeFrame.stateLabel[locale]}
              </h3>
            </div>
            <span className="tag" data-testid="replay-fault-badge">
              {FAULT_BADGE[activeFrame.faultState][locale]}
            </span>
          </div>

          <div>
            <span className={styles.eyebrow} style={{ display: "block", marginBottom: 6 }}>
              {isZh ? "原始十六进制载荷 (RAW HEX)" : "Raw Frame Payload (Hex)"}
            </span>
            <pre className={styles.hexBlock} data-testid="replay-raw-hex">
              {activeFrame.rawHex}
            </pre>
          </div>

          <div>
            <span className={styles.eyebrow} style={{ display: "block", marginBottom: 6 }}>
              {isZh ? "结构化解码字段" : "Decoded Protocol Fields"}
            </span>
            <table className={styles.fieldTable}>
              <tbody>
                {activeFrame.decodedFields.map((field) => (
                  <tr key={field.key}>
                    <th scope="row">{field.key}</th>
                    <td>{field.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.invariantBox}>
            <span className={styles.eyebrow} style={{ display: "block", marginBottom: 4 }}>
              {isZh ? "交互语义与工程护栏" : "Human & Engineering Invariant"}
            </span>
            <p style={{ margin: "0 0 8px" }}>{activeFrame.humanSummary[locale]}</p>
            <p style={{ margin: 0, color: "var(--text-2)", fontSize: 13 }}>
              <strong>{isZh ? "守门规则：" : "Guardrail: "}</strong>
              {activeFrame.invariantCheck[locale]}
            </p>
          </div>

          <Link href={activeTrace.caseHref} className="btn btn-ghost" style={{ justifySelf: "start" }}>
            {isZh ? "查看完整案例论证 →" : "Open full case study →"}
          </Link>
        </aside>
      </div>

      {/* Progressive Read-Only Web Serial Probe */}
      <WebSerialProbePanel locale={locale} />
    </div>
  );
}
