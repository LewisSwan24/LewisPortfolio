"use client";

import { useState } from "react";
import type { SimulatorProps } from "./types";

type MissionId = 1 | 2 | 3 | 4 | 5;
type CommandId = "scout" | "guard" | "regroup";

const MISSIONS: ReadonlyArray<{ id: MissionId; label: { en: string; zh: string } }> = [
  { id: 1, label: { en: "M01 · Open Steppe", zh: "M01 · 初入草原" } },
  { id: 2, label: { en: "M02 · Supply Road", zh: "M02 · 补给线" } },
  { id: 3, label: { en: "M03 · Ridge Watch", zh: "M03 · 高地警戒" } },
  { id: 4, label: { en: "M04 · Night Patrol", zh: "M04 · 夜间巡逻" } },
  { id: 5, label: { en: "M05 · Night Ford", zh: "M05 · 第五关夜渡" } },
];

export function GrasslandRulesSim({ locale, onStatusChange }: SimulatorProps) {
  const isZh = locale === "zh";
  const [mission, setMission] = useState<MissionId>(1);
  const [command, setCommand] = useState<CommandId | null>(null);
  const [checkpointState, setCheckpointState] = useState<"active" | "restored">("active");

  const selectMission = (m: MissionId) => {
    setMission(m);
    setCheckpointState("active");
    const msg = isZh
      ? `已切换至第 ${m} 关：沿用同一套框选、命令与检查点语法，无单关例外按键。`
      : `Loaded Mission ${m}: same box-select, queue, and save grammar stays intact.`;
    onStatusChange?.(msg);
  };

  const issueCommand = (cmd: CommandId) => {
    setCommand(cmd);
    setCheckpointState("active");
    const msg = isZh
      ? `第 ${mission} 关已执行统一语法命令（${cmd}），未触发任何单关临时特例。`
      : `Mission ${mission} uses the exact same shared '${cmd}' rule without hidden level exceptions.`;
    onStatusChange?.(msg);
  };

  const triggerRollback = () => {
    setCheckpointState("restored");
    const msg = isZh
      ? `第 ${mission} 关失败后已从检查点无损恢复，无需重头重打整章。`
      : `Mission ${mission} failure: Restored at checkpoint cleanly without restarting Chapter 1.`;
    onStatusChange?.(msg);
  };

  return (
    <div className="sim-stack" style={{ display: "grid", gap: "var(--s-4)" }}>
      <div className="sim-field">
        <span className="eyebrow">
          {isZh ? "1. 选择关卡（检验五关操作一致性）" : "1. Switch mission (verify consistent controls)"}
        </span>
        <div className="sim-segmented" role="group" aria-label={isZh ? "选择关卡" : "Select mission"}>
          {MISSIONS.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`idx-filter${mission === m.id ? " active" : ""}`}
              aria-pressed={mission === m.id}
              onClick={() => selectMission(m.id)}
            >
              {m.label[locale]}
            </button>
          ))}
        </div>
      </div>

      <div className="sim-field">
        <span className="eyebrow">
          {isZh ? "2. 下达统一语法指令（拒绝自动托管）" : "2. Issue unified command (auto-play disabled)"}
        </span>
        <div className="sim-segmented">
          <button
            type="button"
            className={`btn ${command === "scout" ? "btn-primary" : "btn-ghost"}`}
            onClick={() => issueCommand("scout")}
          >
            {isZh ? "框选并侦察 (Scout)" : "Box-select & Scout"}
          </button>
          <button
            type="button"
            className={`btn ${command === "guard" ? "btn-primary" : "btn-ghost"}`}
            onClick={() => issueCommand("guard")}
          >
            {isZh ? "驻守要道 (Guard)" : "Hold & Guard"}
          </button>
          <button
            type="button"
            className={`btn ${command === "regroup" ? "btn-primary" : "btn-ghost"}`}
            onClick={() => issueCommand("regroup")}
          >
            {isZh ? "整队回防 (Regroup)" : "Regroup Squads"}
          </button>
        </div>
      </div>

      <div className="sim-field">
        <div className="sim-scenario-head">
          <span className="eyebrow">
            {isZh ? "3. 单一存档因果恢复链" : "3. Deterministic checkpoint chain"}
          </span>
          <button type="button" className="btn btn-ghost" onClick={triggerRollback}>
            {isZh ? "触发失败并从检查点恢复" : "Trigger failure & restore checkpoint"}
          </button>
        </div>
        <p className="case-sim-prompt">
          {checkpointState === "restored"
            ? isZh
              ? `已从检查点恢复（Mission 0${mission}）：保留前置任务进度，避免界面惩罚。`
              : `Restored at checkpoint for Mission 0${mission} — prior progress preserved, zero chapter restart.`
            : isZh
              ? `当前规则语法稳定运行于第 ${mission} 关（${command ? `最新命令：${command}` : "待下达指令"}）。`
              : `Shared command grammar active on Mission 0${mission} (${command ? `last command: ${command}` : "awaiting order"}).`}
        </p>
      </div>
    </div>
  );
}
