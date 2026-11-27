"use client";

import { useMemo, useState } from "react";
import {
  analyzeFsmGraph,
  computeFsmTelemetry,
  type CaseFsmSpec,
  type FsmStateNode,
  type FsmTimingBounds,
} from "@/lib/fsm/schema";
import { VerifiedStatusBadge } from "@/components/case/deep/VerifiedStatusBadge";
import styles from "../lab-engines.module.css";

const TIMING_CONTROLS: Array<{
  key: keyof FsmTimingBounds;
  min: number;
  max: number;
  step: number;
  unit: string;
  en: string;
  zh: string;
}> = [
  {
    key: "debounceMs",
    min: 10,
    max: 150,
    step: 5,
    unit: "ms",
    en: "Input / Sensor Debounce",
    zh: "物理信号防抖窗口",
  },
  {
    key: "holdThresholdMs",
    min: 80,
    max: 1600,
    step: 20,
    unit: "ms",
    en: "Deliberate Hold Dwell",
    zh: "意图确认长按阈值",
  },
  {
    key: "cooldownMs",
    min: 100,
    max: 2000,
    step: 50,
    unit: "ms",
    en: "Post-Action Cooldown",
    zh: "触发后冷却锁定窗",
  },
  {
    key: "relayTimeoutMs",
    min: 300,
    max: 3000,
    step: 100,
    unit: "ms",
    en: "Link / Timeout Cutoff",
    zh: "断连与超时判定上限",
  },
  {
    key: "confidenceThreshold",
    min: 60,
    max: 98,
    step: 1,
    unit: "%",
    en: "Confidence Cutoff",
    zh: "自动执行置信度门槛",
  },
];

function nodeFillColor(node: FsmStateNode, active: boolean): string {
  if (active) return "var(--accent)";
  if (node.kind === "error") return "var(--surface-2)";
  return "var(--bg)";
}

function nodeStrokeColor(node: FsmStateNode, active: boolean): string {
  if (active) return "var(--accent)";
  if (node.kind === "error") return "var(--danger, #a63f2a)";
  if (node.kind === "goal") return "var(--border-strong)";
  return "var(--border)";
}

export function FsmExplorerPanel({
  specs,
  locale,
}: {
  specs: readonly CaseFsmSpec[];
  locale: "en" | "zh";
}) {
  const isZh = locale === "zh";
  const [selectedSlug, setSelectedSlug] = useState<CaseFsmSpec["slug"]>(
    specs[0]?.slug ?? "walkie"
  );

  const activeSpec = useMemo(
    () => specs.find((s) => s.slug === selectedSlug) ?? specs[0]!,
    [specs, selectedSlug]
  );

  const [currentStateId, setCurrentStateId] = useState<string>(activeSpec.initialStateId);
  const [timing, setTiming] = useState<FsmTimingBounds>(activeSpec.timing.defaults);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleSelectCase = (spec: CaseFsmSpec) => {
    setSelectedSlug(spec.slug);
    setCurrentStateId(spec.initialStateId);
    setTiming(spec.timing.defaults);
    setStatusMessage(
      isZh
        ? `已载入 ${spec.caseName.zh} 状态机（初始状态：${spec.states[0]?.label.zh}）`
        : `Loaded ${spec.caseName.en} FSM at initial state: ${spec.states[0]?.label.en}`
    );
  };

  const currentState =
    activeSpec.states.find((s) => s.id === currentStateId) ?? activeSpec.states[0]!;
  const outgoingEdges = activeSpec.transitions.filter((e) => e.from === currentState.id);
  const graphReport = useMemo(() => analyzeFsmGraph(activeSpec), [activeSpec]);
  const telemetry = useMemo(
    () => computeFsmTelemetry(timing, activeSpec),
    [timing, activeSpec]
  );

  const fireTransition = (edgeId: string) => {
    const edge = activeSpec.transitions.find((t) => t.id === edgeId);
    if (!edge) return;
    const target = activeSpec.states.find((s) => s.id === edge.to);
    if (!target) return;
    setCurrentStateId(target.id);
    setStatusMessage(
      isZh
        ? `${edge.trigger[locale]} → ${target.label.zh}`
        : `${edge.trigger[locale]} -> ${target.label.en}`
    );
  };

  const handleReset = () => {
    setCurrentStateId(activeSpec.initialStateId);
    setTiming(activeSpec.timing.defaults);
    setStatusMessage(
      isZh ? "已复位至初始状态与默认硬件/时序边界。" : "Reset FSM to initial state and default bounds."
    );
  };

  const handleExportJson = () => {
    const payload = {
      specVersion: "v4.9",
      slug: activeSpec.slug,
      currentState: currentState.id,
      timing,
      telemetry,
      graphVerification: {
        deadlockCount: graphReport.deadlockStates.length,
        unreachableCount: graphReport.unreachableStates.length,
        reachableGoals: graphReport.reachableGoals,
      },
      states: activeSpec.states,
      transitions: activeSpec.transitions,
    };

    try {
      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `fsm-${activeSpec.slug}-spec.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // Headless or restricted environments still receive status confirmation
    }

    setStatusMessage(
      isZh
        ? `已导出 fsm-${activeSpec.slug}-spec.json（${graphReport.deadlockStates.length} 死锁）`
        : `Exported fsm-${activeSpec.slug}-spec.json (${graphReport.deadlockStates.length} deadlocks)`
    );
  };

  const nodeMap = new Map(activeSpec.states.map((n) => [n.id, n]));

  return (
    <section
      id="fsm-explorer"
      className={styles.engineSection}
      aria-labelledby="fsm-explorer-heading"
    >
      <header className={styles.engineHead}>
        <div>
          <div className="label">
            06 · {isZh ? "有限状态机模拟器与认知延迟仪表" : "Finite State Machine Explorer & Micro-Latency Simulator"}
          </div>
          <h2 id="fsm-explorer-heading" className={styles.engineTitle}>
            {isZh
              ? "把六个项目变成可单步推演的无死锁状态图"
              : "Step-by-step deadlock-verified state graphs across all 6 cases"}
          </h2>
          <p className={styles.engineLead}>{activeSpec.summary[locale]}</p>
        </div>

        <VerifiedStatusBadge status={activeSpec.verifiedStatus} locale={locale} />
      </header>

      <div
        className={styles.pillBar}
        role="group"
        aria-label={isZh ? "选择案例状态机" : "Select project state machine"}
      >
        {specs.map((spec) => (
          <button
            key={spec.slug}
            type="button"
            className={styles.pillBtn}
            aria-pressed={spec.slug === activeSpec.slug}
            onClick={() => handleSelectCase(spec)}
          >
            {spec.caseName[locale]}
          </button>
        ))}
      </div>

      <div className={styles.fsmLayout}>
        <div className={styles.graphCard}>
          <svg
            viewBox="0 0 680 285"
            className={styles.fsmSvg}
            role="img"
            aria-label={
              isZh
                ? `${activeSpec.caseName.zh} 状态流转图，当前处于 ${currentState.label.zh}`
                : `${activeSpec.caseName.en} FSM diagram. Current state: ${currentState.label.en}`
            }
          >
            <defs>
              <marker
                id={`arrow-default-${activeSpec.slug}`}
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--text-3)" />
              </marker>
              <marker
                id={`arrow-active-${activeSpec.slug}`}
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--accent)" />
              </marker>
            </defs>

            {activeSpec.transitions.map((edge, idx) => {
              const from = nodeMap.get(edge.from);
              const to = nodeMap.get(edge.to);
              if (!from || !to) return null;
              const isAvailable = from.id === currentState.id;
              const midX = (from.x + to.x) / 2;
              const curveOffset = (idx % 2 === 0 ? -1 : 1) * (from.y === to.y ? 26 : 14);
              const midY = (from.y + to.y) / 2 + curveOffset;
              const d = `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
              return (
                <path
                  key={edge.id}
                  d={d}
                  fill="none"
                  stroke={isAvailable ? "var(--accent)" : "var(--border)"}
                  strokeWidth={isAvailable ? 2.2 : 1.25}
                  strokeDasharray={edge.kind === "recover" ? "5 4" : undefined}
                  opacity={isAvailable ? 1 : 0.65}
                  markerEnd={
                    isAvailable
                      ? `url(#arrow-active-${activeSpec.slug})`
                      : `url(#arrow-default-${activeSpec.slug})`
                  }
                />
              );
            })}

            {activeSpec.states.map((node) => {
              const active = node.id === currentState.id;
              const boxW = 136;
              const boxH = 44;
              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x - boxW / 2}, ${node.y - boxH / 2})`}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setCurrentStateId(node.id);
                    setStatusMessage(
                      isZh
                        ? `跳转观察节点：${node.label.zh}`
                        : `Inspecting state: ${node.label.en}`
                    );
                  }}
                >
                  <rect
                    width={boxW}
                    height={boxH}
                    rx="7"
                    fill={nodeFillColor(node, active)}
                    stroke={nodeStrokeColor(node, active)}
                    strokeWidth={active ? 2 : 1.5}
                  />
                  <text
                    x={boxW / 2}
                    y={20}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight={active ? 700 : 600}
                    fill={active ? "var(--on-accent)" : "var(--text)"}
                    fontFamily="var(--font-body)"
                  >
                    {node.label[locale]}
                  </text>
                  <text
                    x={boxW / 2}
                    y={34}
                    textAnchor="middle"
                    fontSize="9.5"
                    fill={active ? "var(--on-accent)" : "var(--text-3)"}
                    fontFamily="var(--font-mono)"
                  >
                    {node.kind.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* v6.9 (review R21): on a phone the graph's labels are ~4px and its
              nodes are ~56x18px targets, so the same states are listed as buttons. */}
          <div
            className={styles.stateList}
            role="group"
            aria-label={isZh ? "选择状态节点" : "Choose a state"}
          >
            {activeSpec.states.map((node) => (
              <button
                key={node.id}
                type="button"
                className={styles.stateListBtn}
                data-testid={`fsm-state-btn-${node.id}`}
                aria-pressed={node.id === currentState.id}
                onClick={() => {
                  setCurrentStateId(node.id);
                  setStatusMessage(
                    isZh ? `跳转观察节点：${node.label.zh}` : `Inspecting state: ${node.label.en}`
                  );
                }}
              >
                {node.label[locale]}
              </button>
            ))}
          </div>

          <div className={styles.triggerTray}>
            <span className={styles.kicker}>
              {isZh ? "当前节点与约束保障" : "Active State Guarantee"} ·{" "}
              <strong data-testid="fsm-active-state">{currentState.label[locale]}</strong>
            </span>
            <p style={{ margin: 0, fontSize: 14, color: "var(--text-2)" }}>
              {currentState.guarantees[locale]}
            </p>
            <div className={styles.triggerButtons}>
              {outgoingEdges.map((edge) => (
                <button
                  key={edge.id}
                  type="button"
                  className={styles.triggerBtn}
                  data-kind={edge.kind}
                  data-testid={`fsm-trigger-${edge.id}`}
                  onClick={() => fireTransition(edge.id)}
                >
                  <span className={styles.triggerKindTag}>{edge.kind}</span>
                  <span>{edge.trigger[locale]}</span>
                </button>
              ))}
            </div>
          </div>

          <output role="status" className={styles.statusBar} data-testid="fsm-status-output">
            {statusMessage ||
              (isZh
                ? "点击状态节点或上方触发条件按钮，单步推进状态迁移。"
                : "Click a graph node or trigger button above to step through transitions.")}
          </output>
        </div>

        <aside className={styles.controlPanel} aria-label={isZh ? "时序阈值校准" : "Timing calibration"}>
          <div className={styles.telemetryGrid}>
            <div className={styles.telemetryCell}>
              <span className={styles.kicker}>
                {isZh ? "感知响应延迟" : "Perceived Delay"}
              </span>
              <span className={styles.telemetryValue} data-testid="fsm-perceived-delay">
                {telemetry.perceivedDelayMs} ms
              </span>
            </div>
            <div className={styles.telemetryCell}>
              <span className={styles.kicker}>
                {isZh ? "误触防御裕度" : "Accidental Margin"}
              </span>
              <span className={styles.telemetryValue} data-testid="fsm-mitigation-margin">
                {telemetry.mitigationMarginPct}% ({telemetry.safetyGrade})
              </span>
            </div>
            <div className={styles.telemetryCell}>
              <span className={styles.kicker}>
                {isZh ? "可达性 / 死锁审计" : "BFS Deadlock Check"}
              </span>
              <span className={styles.telemetryValue} data-testid="fsm-deadlock-badge">
                {graphReport.deadlockStates.length} deadlocks · {graphReport.reachableStates.length}/
                {activeSpec.states.length}
              </span>
            </div>
            <div className={styles.telemetryCell}>
              <span className={styles.kicker}>
                {isZh ? "关键调参重点" : "Tuning Anchor"}
              </span>
              <span style={{ fontSize: 13, color: "var(--text)", fontWeight: 600 }}>
                {activeSpec.timing.activeTuningFocus}
              </span>
            </div>
          </div>

          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: "var(--text-2)" }}>
            {activeSpec.timing.rationale[locale]}
          </p>

          <div className={styles.sliderList}>
            {TIMING_CONTROLS.map((ctrl) => (
              <label key={ctrl.key} className={styles.sliderRow}>
                <span className={styles.sliderHead}>
                  <span>{ctrl[locale]}</span>
                  <span className={styles.sliderOutput}>
                    {timing[ctrl.key]} {ctrl.unit}
                  </span>
                </span>
                <input
                  type="range"
                  className={styles.sliderInput}
                  min={ctrl.min}
                  max={ctrl.max}
                  step={ctrl.step}
                  value={timing[ctrl.key]}
                  aria-label={ctrl[locale]}
                  onChange={(e) =>
                    setTiming((prev) => ({
                      ...prev,
                      [ctrl.key]: Number(e.target.value),
                    }))
                  }
                />
              </label>
            ))}
          </div>

          <div className={styles.actionRow}>
            <button type="button" className="btn btn-ghost" onClick={handleReset}>
              {isZh ? "重置初始参数" : "Reset Bounds"}
            </button>
            <button type="button" className="btn btn-primary" onClick={handleExportJson}>
              {isZh ? "导出 JSON 状态规范" : "Export JSON Spec"}
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
