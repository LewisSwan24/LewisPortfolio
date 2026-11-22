"use client";

import { useState } from "react";
import type { SimulatorProps } from "./types";

type WaveCard = "SAY HI" | "FIRST SONG?" | "LET'S DANCE!";
type Stage = "scanning" | "blind-wave" | "mutual-nod" | "withdrawn";

export function OntheBeatHandshakeSim({ locale, onStatusChange }: SimulatorProps) {
  const isZh = locale === "zh";
  const [stage, setStage] = useState<Stage>("scanning");
  const [card, setCard] = useState<WaveCard | null>(null);

  const sendWave = (selected: WaveCard) => {
    setCard(selected);
    setStage("blind-wave");
    const msg = isZh
      ? `已发送匿名脉冲卡「${selected}」：对端只知道附近有人挥手，零姓名零头像。`
      : `Sent anonymous wave '${selected}': nearby wristbands see a pulse only, zero profile exposed.`;
    onStatusChange?.(msg);
  };

  const confirmMutualNod = () => {
    setStage("mutual-nod");
    const msg = isZh
      ? "双向点头完成：仅在双方手环均确认后才显示名字与现场碰面地标。"
      : "Mutual nod completed: both wrists confirmed before showing names and venue landmark.";
    onStatusChange?.(msg);
  };

  const withdrawDevice = () => {
    setStage("withdrawn");
    const msg = isZh
      ? "手机已收起，硬件立即静默退居二线，将注意力还给现场真人交流。"
      : "Devices stepped back into quiet mode so attention returns to live music and eye contact.";
    onStatusChange?.(msg);
  };

  return (
    <div className="sim-stack" style={{ display: "grid", gap: "var(--s-4)" }}>
      <div className="sim-field">
        <span className="eyebrow">
          {isZh ? "1. 选择一张非侵入式破冰脉冲卡" : "1. Pick one low-pressure icebreaker card"}
        </span>
        <div className="sim-segmented">
          {(["SAY HI", "FIRST SONG?", "LET'S DANCE!"] as const).map((c) => (
            <button
              key={c}
              type="button"
              className={`idx-filter${card === c ? " active" : ""}`}
              aria-pressed={card === c}
              onClick={() => sendWave(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="sim-field">
        <span className="eyebrow">
          {isZh ? "2. 隐私门槛与退场流转" : "2. Consent threshold & polite device withdrawal"}
        </span>
        <div className="sim-segmented">
          <button
            type="button"
            className="btn btn-ghost"
            disabled={stage === "scanning"}
            onClick={confirmMutualNod}
          >
            {isZh ? "对方手环双向点头确认" : "Simulate mutual wrist nod"}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={stage !== "mutual-nod"}
            onClick={withdrawDevice}
          >
            {isZh ? "收起手机 · 硬件退场" : "Pocket phones · Step back"}
          </button>
        </div>

        <p className="case-sim-prompt" style={{ marginTop: "var(--s-3)" }}>
          {stage === "scanning" &&
            (isZh
              ? "状态：RSSI -68 dBm 范围内静默待机，不展示附近人资料墙与颜值打分。"
              : "State: Quiet RSSI proximity scan (-68 dBm). No nearby-people wall or public popularity score.")}
          {stage === "blind-wave" &&
            (isZh
              ? `状态：附近有人发出匿名脉冲（${card}）。在双向确认前不透漏姓名、照片或微信号。`
              : `State: Someone nearby pulsed (${card}) — zero name, avatar, or contact exposed before mutual consent.`)}
          {stage === "mutual-nod" &&
            (isZh
              ? "状态：双向确认已成立！屏幕仅显示「Leo · 吧台左侧音响柱旁」供双方会合。"
              : "State: Mutual nod confirmed! Screen shows 'Leo · Left speaker stack by bar' so two people can meet.")}
          {stage === "withdrawn" &&
            (isZh
              ? "状态：已开口碰面，设备已静默退居二线。交互不再发通知弹窗打扰当前音乐现场。"
              : "State: Met in person — device has stepped back into silence with zero follow-up nudges.")}
        </p>
      </div>
    </div>
  );
}
