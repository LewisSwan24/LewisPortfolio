"use client";

import { useCallback, useState } from "react";
import type { SimulatorProps } from "./types";

type TransportMode = "usb" | "relay";
type ScenarioId = "read" | "edit" | "delete";
type DenyReasonId = "none" | "readonly" | "desk";
type DecisionState = "idle" | "pending" | "approved" | "denied";

interface ScenarioSpec {
  id: ScenarioId;
  risk: "low" | "medium" | "high";
  label: { en: string; zh: string };
  toolCall: string;
  watchSummary: { en: string; zh: string };
  approvedReply: { en: string; zh: string };
}

const SCENARIOS: readonly ScenarioSpec[] = [
  {
    id: "read",
    risk: "low",
    label: { en: "Read-only search", zh: "只读检索" },
    toolCall: 'grep_search("schema.ts")',
    watchSummary: {
      en: "Read src/lib/cases/schema.ts (0 writes)",
      zh: "只读检索 schema.ts（无写入）",
    },
    approvedReply: {
      en: "Spoken brief: Found 3 schema types; no files touched.",
      zh: "语音简报：已定位 3 处类型定义，未修改任何文件。",
    },
  },
  {
    id: "edit",
    risk: "medium",
    label: { en: "Edit config file", zh: "改写配置文件" },
    toolCall: 'write_file("next.config.js")',
    watchSummary: {
      en: "Modify next.config.js (+4 / -1 lines)",
      zh: "修改 next.config.js（+4 / -1 行）",
    },
    approvedReply: {
      en: "Spoken brief: Config updated; typecheck queued.",
      zh: "语音简报：配置已更新，正在排队类型检查。",
    },
  },
  {
    id: "delete",
    risk: "high",
    label: { en: "Run delete command", zh: "执行删除命令" },
    toolCall: 'run("rm -rf build && git reset --hard")',
    watchSummary: {
      en: "HIGH RISK: Delete build & hard reset",
      zh: "高危操作：删除构建目录并硬重置",
    },
    approvedReply: {
      en: "Spoken brief: Destructive shell command executed after physical confirm.",
      zh: "语音简报：已按实体按键确认执行清理命令。",
    },
  },
];

const DENY_REASONS: ReadonlyArray<{
  id: DenyReasonId;
  label: { en: string; zh: string };
  spoken: { en: string; zh: string };
}> = [
  {
    id: "none",
    label: { en: "Silent deny", zh: "直接拒绝" },
    spoken: { en: "Denied on wrist", zh: "手腕直接拦截" },
  },
  {
    id: "readonly",
    label: { en: '"Read-only first"', zh: "「先只读检索」" },
    spoken: { en: 'Voice note: "Read-only first"', zh: "口述原因：「先只读检索」" },
  },
  {
    id: "desk",
    label: { en: '"Wait till I\'m at desk"', zh: "「等我回电脑前」" },
    spoken: { en: 'Voice note: "Wait till I\'m at desk"', zh: "口述原因：「等我回电脑前」" },
  },
];

interface TimelineEvent {
  id: number;
  tag: string;
  text: string;
}

export function WalkieWristSim({ locale, onStatusChange }: SimulatorProps) {
  const isZh = locale === "zh";
  const [transport, setTransport] = useState<TransportMode>("usb");
  const [activeScenarioId, setActiveScenarioId] = useState<ScenarioId | null>(null);
  const [decision, setDecision] = useState<DecisionState>("idle");
  const [denyReason, setDenyReason] = useState<DenyReasonId>("readonly");
  const [timeline, setTimeline] = useState<TimelineEvent[]>(() => [
    {
      id: 1,
      tag: isZh ? "待命" : "IDLE",
      text: isZh
        ? "M5StickS3 已配对 pair.key · 等待右侧触发 Claude Code 工具请求。"
        : "M5StickS3 paired via pair.key · Trigger a Claude Code request to test wrist gating.",
    },
  ]);

  const activeScenario = SCENARIOS.find((s) => s.id === activeScenarioId) ?? null;

  const pushTimeline = useCallback((tag: string, text: string) => {
    setTimeline((prev) => [{ id: prev.length + 1, tag, text }, ...prev].slice(0, 5));
  }, []);

  const handleTransportChange = (next: TransportMode) => {
    setTransport(next);
    const msg =
      next === "usb"
        ? isZh
          ? "链路已切换：USB 直连优先（PCM · 0ms 中继）。"
          : "Transport switched: USB direct priority (uncompressed PCM)."
        : isZh
          ? "链路已切换：离缆零知识 Fly.io 中继（AES-256-GCM · 4-bit ADPCM）。"
          : "Transport switched: Away-from-desk zero-knowledge Fly.io relay (AES-256-GCM · 4-bit ADPCM).";
    pushTimeline(next === "usb" ? "USB" : "RELAY", msg);
    onStatusChange?.(msg);
  };

  const triggerScenario = (scenario: ScenarioSpec) => {
    setActiveScenarioId(scenario.id);
    setDecision("pending");
    const linkLabel =
      transport === "usb"
        ? isZh
          ? "USB 直连"
          : "USB link"
        : isZh
          ? "Fly.io 加密中继"
          : "Fly.io sealed relay";
    const msg = isZh
      ? `Claude 请求「${scenario.label.zh}」(${scenario.toolCall})，已通过${linkLabel}推至手腕等待物理审批。`
      : `Claude requested "${scenario.label.en}" (${scenario.toolCall}) over ${linkLabel}. Waiting on wrist key.`;
    pushTimeline(scenario.risk.toUpperCase(), msg);
    onStatusChange?.(msg);
  };

  const handleFrontKey = () => {
    if (!activeScenario || decision !== "pending") {
      const idleMsg = isZh
        ? "当前无待审批请求，请先在右侧模拟一条 Claude 请求。"
        : "No pending request. Trigger a simulated Claude request first.";
      onStatusChange?.(idleMsg);
      return;
    }
    setDecision("approved");
    const reply = activeScenario.approvedReply[locale];
    const msg = isZh
      ? `前键已按下（批准）→ 桥接放行 ${activeScenario.toolCall} → ${reply}`
      : `Front Key pressed (Approve) -> Bridge executed ${activeScenario.toolCall} -> ${reply}`;
    pushTimeline(isZh ? "放行" : "APPROVED", msg);
    onStatusChange?.(msg);
  };

  const handleSideKey = () => {
    if (!activeScenario || decision !== "pending") {
      const idleMsg = isZh
        ? "当前无待审批请求，请先在右侧模拟一条 Claude 请求。"
        : "No pending request. Trigger a simulated Claude request first.";
      onStatusChange?.(idleMsg);
      return;
    }
    setDecision("denied");
    const reasonObj = DENY_REASONS.find((r) => r.id === denyReason) ?? DENY_REASONS[0];
    const msg = isZh
      ? `侧键已按下（拒绝）→ 桥接拦截 ${activeScenario.toolCall} · ${reasonObj.spoken.zh}`
      : `Side Key pressed (Deny) -> Bridge blocked ${activeScenario.toolCall} · ${reasonObj.spoken.en}`;
    pushTimeline(isZh ? "拦截" : "DENIED", msg);
    onStatusChange?.(msg);
  };

  const handleWatchKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && event.target === event.currentTarget) {
      event.preventDefault();
      handleFrontKey();
      return;
    }
    if (
      event.key === "Backspace" &&
      !(
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      )
    ) {
      event.preventDefault();
      handleSideKey();
    }
  };

  const copy = isZh
    ? {
        transportLabel: "传输链路优先级",
        usbBtn: "USB 直连优先",
        relayBtn: "离缆零知识中继",
        usbMeta: "AES-256-GCM · PCM · 有线抢占",
        relayMeta: "AES-256-GCM · 4-bit ADPCM · 零知识密文",
        watchAria: "M5StickS3 手表审批终端，按 Enter 批准，按 Backspace 拒绝",
        screenIdle: "手腕待命",
        screenIdleSub: "触发右侧请求后在此审批",
        screenPending: "等待手腕按键",
        screenApproved: "已批准并语音回传",
        screenDenied: "已拦截 · 未执行",
        frontKey: "前键 · 批准 (Enter)",
        sideKey: "侧键 · 拒绝 (Backspace)",
        denyReasonLabel: "拒绝时可选口述原因：",
        scenarioTitle: "1. 模拟 Claude Code 请求",
        timelineTitle: "2. 闭环状态时间线（手表 → 桥接 → 语音回传）",
      }
    : {
        transportLabel: "Transport priority",
        usbBtn: "USB Direct Priority",
        relayBtn: "Zero-Knowledge Relay",
        usbMeta: "AES-256-GCM · PCM · Cable preempts",
        relayMeta: "AES-256-GCM · 4-bit ADPCM · Ciphertext only",
        watchAria:
          "M5StickS3 wrist terminal. Press Enter for Front Key approve or Backspace for Side Key deny.",
        screenIdle: "WRIST IDLE",
        screenIdleSub: "Trigger a request on the right",
        screenPending: "APPROVAL GATE",
        screenApproved: "APPROVED · SPOKEN",
        screenDenied: "BLOCKED AT WRIST",
        frontKey: "Front Key · Approve (Enter)",
        sideKey: "Side Key · Deny (Backspace)",
        denyReasonLabel: "Optional spoken reason on deny:",
        scenarioTitle: "1. Simulate Claude Code request",
        timelineTitle: "2. Closed-loop timeline (Watch -> Bridge -> Audio brief)",
      };

  return (
    <div className="sim-walkie">
      <div className="sim-walkie-top">
        <span className="sim-field-label">{copy.transportLabel}</span>
        <div className="sim-segmented" role="group" aria-label={copy.transportLabel}>
          <button
            type="button"
            className="sim-seg-btn"
            aria-pressed={transport === "usb"}
            onClick={() => handleTransportChange("usb")}
          >
            {copy.usbBtn}
          </button>
          <button
            type="button"
            className="sim-seg-btn"
            aria-pressed={transport === "relay"}
            onClick={() => handleTransportChange("relay")}
          >
            {copy.relayBtn}
          </button>
        </div>
        <span className="sim-mono-pill">
          {transport === "usb" ? copy.usbMeta : copy.relayMeta}
        </span>
      </div>

      <div className="sim-walkie-grid">
        <div
          className="sim-watch-column"
          tabIndex={0}
          role="group"
          aria-label={copy.watchAria}
          onKeyDown={handleWatchKeyDown}
        >
          <div className="sim-watch-bezel" data-state={decision}>
            <div className="sim-watch-statusbar">
              <span>{transport === "usb" ? "USB·PCM" : "FLY·ADPCM"}</span>
              <span>AES-256</span>
            </div>

            <div className="sim-watch-screen">
              <div className="sim-watch-badge" data-decision={decision}>
                {decision === "idle" && copy.screenIdle}
                {decision === "pending" && copy.screenPending}
                {decision === "approved" && copy.screenApproved}
                {decision === "denied" && copy.screenDenied}
              </div>

              {activeScenario ? (
                <>
                  <code className="sim-watch-cmd">{activeScenario.toolCall}</code>
                  <p className="sim-watch-desc">{activeScenario.watchSummary[locale]}</p>
                </>
              ) : (
                <p className="sim-watch-desc">{copy.screenIdleSub}</p>
              )}

              {decision === "approved" && activeScenario && (
                <p className="sim-watch-reply">{activeScenario.approvedReply[locale]}</p>
              )}
              {decision === "denied" && (
                <p className="sim-watch-reply">
                  {(DENY_REASONS.find((r) => r.id === denyReason) ?? DENY_REASONS[0]).spoken[locale]}
                </p>
              )}
            </div>

            <div className="sim-watch-keys">
              <button
                type="button"
                className="sim-watch-key sim-watch-key--front"
                aria-disabled={decision !== "pending"}
                onClick={handleFrontKey}
              >
                {copy.frontKey}
              </button>
              <button
                type="button"
                className="sim-watch-key sim-watch-key--side"
                aria-disabled={decision !== "pending"}
                onClick={handleSideKey}
              >
                {copy.sideKey}
              </button>
            </div>
          </div>

          <div className="sim-deny-reasons">
            <span className="sim-hint-text">{copy.denyReasonLabel}</span>
            <div className="sim-chip-row" role="group" aria-label={copy.denyReasonLabel}>
              {DENY_REASONS.map((reason) => (
                <button
                  key={reason.id}
                  type="button"
                  className="sim-chip"
                  aria-pressed={denyReason === reason.id}
                  onClick={() => setDenyReason(reason.id)}
                >
                  {reason.label[locale]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sim-walkie-right">
          <div className="sim-panel-block">
            <h3 className="sim-panel-title">{copy.scenarioTitle}</h3>
            <div className="sim-scenario-list">
              {SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  type="button"
                  className="sim-scenario-btn"
                  data-risk={scenario.risk}
                  aria-pressed={activeScenarioId === scenario.id && decision === "pending"}
                  onClick={() => triggerScenario(scenario)}
                >
                  <span className="sim-scenario-head">
                    <strong>{scenario.label[locale]}</strong>
                    <span className="sim-risk-tag" data-risk={scenario.risk}>
                      {scenario.risk.toUpperCase()}
                    </span>
                  </span>
                  <code>{scenario.toolCall}</code>
                </button>
              ))}
            </div>
          </div>

          <div className="sim-panel-block">
            <h3 className="sim-panel-title">{copy.timelineTitle}</h3>
            <ol className="sim-timeline">
              {timeline.map((item) => (
                <li key={item.id}>
                  <span className="sim-timeline-tag">{item.tag}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
