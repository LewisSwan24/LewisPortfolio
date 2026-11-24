"use client";

import { useState } from "react";

type Locale = "en" | "zh";
type LinkMode = "usb" | "relay";

export function PrimitiveWrist({ locale }: { locale: Locale }) {
  const isZh = locale === "zh";
  const [linkMode, setLinkMode] = useState<LinkMode>("usb");
  const [outcome, setOutcome] = useState<"waiting" | "approved" | "denied">("waiting");
  const [denyReason, setDenyReason] = useState(
    isZh ? "先只读检索，不要改文件" : "Read-only first, no edits yet"
  );

  return (
    <div className="lab-prim-panel">
      <p className="lab-prim-summary">
        {isZh
          ? "对比插线 USB（0ms 抢占）与离缆加密中继（+180ms 模拟延迟），并测试手腕前键批准与侧键拒绝附原因。"
          : "Compare wired USB preemption (0ms) vs end-to-end encrypted relay (+180ms simulated RTT) with physical Front Approve / Side Deny."}
      </p>

      <div className="lab-pill-row" role="group" aria-label={isZh ? "链路模式" : "Transport link"}>
        <button
          type="button"
          className="lab-pill"
          aria-pressed={linkMode === "usb"}
          onClick={() => setLinkMode("usb")}
        >
          {isZh ? "USB 直连优先 (0ms · PCM)" : "USB Direct Priority (0ms · PCM)"}
        </button>
        <button
          type="button"
          className="lab-pill"
          aria-pressed={linkMode === "relay"}
          onClick={() => setLinkMode("relay")}
        >
          {isZh ? "Fly.io 端到端加密中继 (+180ms · ADPCM)" : "Fly.io Sealed Relay (+180ms · ADPCM)"}
        </button>
      </div>

      <div className="lab-wrist-box" aria-live="polite">
        <div className="lab-wrist-meta">
          <span className="eyebrow">
            {linkMode === "usb" ? "AES-256-GCM · USB" : "AES-256-GCM · RELAY (+180ms)"}
          </span>
          <strong>write_file(&quot;next.config.js&quot;)</strong>
        </div>

        <div className="lab-wrist-status" data-outcome={outcome}>
          {outcome === "waiting" &&
            (isZh ? "等待手腕实体按键确认..." : "Waiting for physical key press on wrist...")}
          {outcome === "approved" &&
            (isZh ? "前键批准 -> 桥接已执行并语音回传结果" : "Front key approved -> Executed & spoken summary sent")}
          {outcome === "denied" &&
            (isZh ? `侧键拒绝 -> 已拦截 (${denyReason})` : `Side key denied -> Blocked (${denyReason})`)}
        </div>

        <div className="lab-sm-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setOutcome("approved")}
          >
            {isZh ? "前键 · 批准" : "Front Key · Approve"}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setDenyReason(isZh ? "先只读检索，不要改文件" : "Read-only first, no edits yet");
              setOutcome("denied");
            }}
          >
            {isZh ? "侧键 · 拒绝并口述原因" : "Side Key · Deny with reason"}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setOutcome("waiting")}
          >
            {isZh ? "重置请求" : "Reset request"}
          </button>
        </div>
      </div>
    </div>
  );
}
