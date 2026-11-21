"use client";

import { useState } from "react";
import type { SimulatorProps } from "./types";

type IaMode = "legacy" | "reset";
type ScreenView = "events" | "detail";

export function ConnectIaResetSim({ locale, onStatusChange }: SimulatorProps) {
  const isZh = locale === "zh";
  const [mode, setMode] = useState<IaMode>("legacy");
  const [screen, setScreen] = useState<ScreenView>("events");
  const [legacyTaps, setLegacyTaps] = useState(0);
  const [enrolled, setEnrolled] = useState(false);
  const [trapWarning, setTrapWarning] = useState(false);

  const switchMode = (next: IaMode) => {
    setMode(next);
    setScreen("events");
    setLegacyTaps(0);
    setEnrolled(false);
    setTrapWarning(false);
    onStatusChange?.(
      next === "legacy"
        ? isZh
          ? "已切回「Iteration 2 · 补丁旧结构」：体验九月测试发现的重复点击与无返回路径卡点。"
          : "Switched to Iteration 2 (Patched legacy IA): inspect duplicate-tap ambiguity and missing back route."
        : isZh
          ? "已切换至「Oct Reset · 纸面重画新结构」：体验清晰的已报名锁定态与显性返回路径。"
          : "Switched to Oct Reset (Paper-redrawn IA): inspect locked enrollment state and clear back route."
    );
  };

  const openDetail = () => {
    setScreen("detail");
    setTrapWarning(false);
    onStatusChange?.(
      isZh
        ? "Step 1 完成：已进入校园活动详情页，请尝试点击「报名」。"
        : "Step 1 complete: opened event detail. Try Step 2 (Register) next."
    );
  };

  const handleRegister = () => {
    if (mode === "legacy") {
      const nextCount = legacyTaps + 1;
      setLegacyTaps(nextCount);
      onStatusChange?.(
        isZh
          ? `旧结构异常：已点击报名 ${nextCount} 次，但按钮仍可重复点击且未写明是否成功。`
          : `Legacy friction: Register tapped ${nextCount}x — button stays ambiguously clickable with no clear enrolled state.`
      );
      return;
    }

    setEnrolled(true);
    onStatusChange?.(
      isZh
        ? "新结构 Step 2：已锁定为「已报名 ✓（1 个名额已保存）」，不再允许重复误触。"
        : "Oct Reset Step 2: locked cleanly as Enrolled ✓ (1 spot saved), preventing duplicate taps."
    );
  };

  const handleBack = () => {
    if (mode === "legacy") {
      setTrapWarning(true);
      onStatusChange?.(
        isZh
          ? "旧结构卡点：子页缺少显性返回入口，用户不知道如何回到上一页。"
          : "Legacy dead-end: nested sub-page lacks a clear Back route."
      );
      return;
    }

    setScreen("events");
    setTrapWarning(false);
    onStatusChange?.(
      isZh
        ? "新结构 Step 3：沿显性「← 活动列表」路径顺利返回，已报名状态同步保留。"
        : "Oct Reset Step 3: returned cleanly via explicit '← Events' path with enrolled badge preserved."
    );
  };

  const copy = isZh
    ? {
        modeLabel: "信息架构版本对比",
        legacyBtn: "Iteration 2 · 补丁旧结构",
        resetBtn: "Oct Reset · 纸面重画新结构",
        step1: "Step 1 浏览活动",
        step2: "Step 2 点击报名",
        step3: "Step 3 返回上一页",
        phoneHeaderLegacy: "活动详情（无返回栏）",
        phoneHeaderReset: "← 返回活动列表",
        listTitle: "校园活动 · 本周",
        eventTitle: "UQ 纪录片之夜（小组放映）",
        eventMeta: "免费 · 图书馆草坪 · 限 18 人",
        openBtn: "查看详情 →",
        enrolledPill: "已报名 ✓",
        registerLegacy: legacyTaps > 0 ? `报名参加（已点 ${legacyTaps} 次？）` : "报名参加",
        registerReset: enrolled ? "已报名 ✓（名额已锁定）" : "报名参加",
        backAttemptLegacy: "尝试返回上一页",
        legacyTrapMsg: "找不到返回入口：页面栈被多层 Tab 遮挡。",
        quoteLabel: mode === "legacy" ? "第二轮出声思考原话（2025-09-17）" : "十一月任务走查观察（重画后）",
        quoteText:
          mode === "legacy"
            ? "「我能回上一页吗？要怎么回？」"
            : "「受测者独自走完浏览、报名与返回整条链路，并把分色首页直接读成了整套应用的地图。」",
      }
    : {
        modeLabel: "Information architecture version",
        legacyBtn: "Iteration 2 · Patched Legacy IA",
        resetBtn: "Oct Reset · Paper-Redrawn IA",
        step1: "Step 1 Browse",
        step2: "Step 2 Register",
        step3: "Step 3 Back",
        phoneHeaderLegacy: "Event view (no back bar)",
        phoneHeaderReset: "← Back to Events",
        listTitle: "Campus Events · This week",
        eventTitle: "UQ Documentary Night (Small group)",
        eventMeta: "Free · Library Lawn · Cap 18",
        openBtn: "Open event →",
        enrolledPill: "Enrolled ✓",
        registerLegacy: legacyTaps > 0 ? `Register (tapped ${legacyTaps}x?)` : "Register",
        registerReset: enrolled ? "Enrolled ✓ (Spot saved)" : "Register",
        backAttemptLegacy: "Try to go back",
        legacyTrapMsg: "No explicit back path: user is trapped inside nested tab shell.",
        quoteLabel:
          mode === "legacy"
            ? "Think-aloud participant quote (17 Sep 2025)"
            : "November usability observation (Post-reset)",
        quoteText:
          mode === "legacy"
            ? '"Can I go to the previous page? How can I do that?"'
            : '"Participant completed browse → enroll → return unaided and read the color-coded home screen as a map of the app."',
      };

  return (
    <div className="sim-connect">
      <div className="sim-walkie-top">
        <span className="sim-field-label">{copy.modeLabel}</span>
        <div className="sim-segmented" role="group" aria-label={copy.modeLabel}>
          <button
            type="button"
            className="sim-seg-btn"
            aria-pressed={mode === "legacy"}
            onClick={() => switchMode("legacy")}
          >
            {copy.legacyBtn}
          </button>
          <button
            type="button"
            className="sim-seg-btn"
            aria-pressed={mode === "reset"}
            onClick={() => switchMode("reset")}
          >
            {copy.resetBtn}
          </button>
        </div>
      </div>

      <div className="sim-connect-stage">
        <div className="sim-connect-steps" aria-hidden="true">
          <span className="sim-step-badge" data-active={screen === "events" ? "true" : "false"}>
            {copy.step1}
          </span>
          <span
            className="sim-step-badge"
            data-active={screen === "detail" && !enrolled && legacyTaps === 0 ? "true" : "false"}
          >
            {copy.step2}
          </span>
          <span className="sim-step-badge" data-active={enrolled || trapWarning ? "true" : "false"}>
            {copy.step3}
          </span>
        </div>

        <div className="sim-phone-frame" data-mode={mode}>
          <div className="sim-phone-topbar">
            {screen === "events" ? (
              <span className="sim-phone-title">{copy.listTitle}</span>
            ) : mode === "reset" ? (
              <button type="button" className="sim-phone-back-btn" onClick={handleBack}>
                {copy.phoneHeaderReset}
              </button>
            ) : (
              <span className="sim-phone-title">{copy.phoneHeaderLegacy}</span>
            )}
          </div>

          <div className="sim-phone-body">
            {screen === "events" ? (
              <div className="sim-phone-card">
                <div className="sim-phone-card-head">
                  <strong>{copy.eventTitle}</strong>
                  {mode === "reset" && enrolled && (
                    <span className="sim-tier-badge">{copy.enrolledPill}</span>
                  )}
                </div>
                <p>{copy.eventMeta}</p>
                <button type="button" className="btn btn-primary sim-phone-cta" onClick={openDetail}>
                  {copy.openBtn}
                </button>
              </div>
            ) : (
              <div className="sim-phone-card">
                <strong>{copy.eventTitle}</strong>
                <p>{copy.eventMeta}</p>
                <button
                  type="button"
                  className={
                    mode === "reset" && enrolled
                      ? "btn btn-ghost sim-phone-cta"
                      : "btn btn-primary sim-phone-cta"
                  }
                  aria-disabled={mode === "reset" && enrolled}
                  onClick={handleRegister}
                >
                  {mode === "legacy" ? copy.registerLegacy : copy.registerReset}
                </button>

                {mode === "legacy" && (
                  <button
                    type="button"
                    className="btn btn-ghost sim-phone-cta"
                    onClick={handleBack}
                  >
                    {copy.backAttemptLegacy}
                  </button>
                )}

                {trapWarning && mode === "legacy" && (
                  <div className="sim-phone-trap" role="note">
                    {copy.legacyTrapMsg}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <aside className="sim-connect-quote" data-mode={mode}>
          <span className="sim-field-label">{copy.quoteLabel}</span>
          <p>{copy.quoteText}</p>
        </aside>
      </div>
    </div>
  );
}
