"use client";

import { useEffect, useRef, useState } from "react";
import type { SimulatorProps } from "./types";

interface TriageStep {
  id: string;
  actor: string;
  risk: "low" | "high";
  title: { en: string; zh: string };
  detail: { en: string; zh: string };
  impactBefore?: { en: string; zh: string };
  impactAfter?: { en: string; zh: string };
}

const STEPS: readonly TriageStep[] = [
  {
    id: "read",
    actor: "Clem",
    risk: "low",
    title: {
      en: "Inspect workspace copies & spending cap",
      zh: "读取文件副本并校验任务预算上限",
    },
    detail: {
      en: "Read-only copy prepared; originals untouched.",
      zh: "仅读取工作副本，原目录零改动。",
    },
  },
  {
    id: "draft",
    actor: "Wick",
    risk: "low",
    title: {
      en: "Chalk plan & draft bilingual summary",
      zh: "在黑板拆解计划并起草双语摘要",
    },
    detail: {
      en: "Drafted summary.md inside staging folder.",
      zh: "已在暂存目录生成 summary.md 草稿。",
    },
  },
  {
    id: "qa",
    actor: "Flint",
    risk: "low",
    title: {
      en: "Verify citations against copy",
      zh: "核对副本中的引用与数据口径",
    },
    detail: {
      en: "3 citations matched; 0 external calls made.",
      zh: "3 处引用核验通过，未触发外部请求。",
    },
  },
  {
    id: "overwrite",
    actor: "Wick",
    risk: "high",
    title: {
      en: "Overwrite existing config.json in workspace",
      zh: "覆盖写入工作区现有 config.json",
    },
    detail: {
      en: "High-risk write outside staging copy.",
      zh: "越过暂存副本的高风险写入操作。",
    },
    impactBefore: {
      en: "Before: existing config.json (14 lines, active API routing)",
      zh: "改动前：现有 config.json（14 行生产路由配置）",
    },
    impactAfter: {
      en: "After: replaces 6 routing keys; requires manual undo if wrong",
      zh: "改动后：将覆盖 6 个路由字段，误操作需手动恢复",
    },
  },
  {
    id: "outreach",
    actor: "Clem",
    risk: "high",
    title: {
      en: "Send batch status update to 12 external contacts",
      zh: "向 12 位外部联系人批量发送进度邮件",
    },
    detail: {
      en: "Irreversible external side effect.",
      zh: "不可撤回的外部群发操作。",
    },
    impactBefore: {
      en: "Before: 0 emails dispatched; draft saved locally",
      zh: "改动前：尚未外发，草稿保存在本地",
    },
    impactAfter: {
      en: "After: 12 outbound emails sent immediately (cannot recall)",
      zh: "改动后：立即向 12 位收件人发出邮件（无法撤回）",
    },
  },
];

type StepStatus = "todo" | "done" | "waiting" | "paused" | "approved";

export function LamplightTriageSim({ locale, onStatusChange }: SimulatorProps) {
  const isZh = locale === "zh";
  const [statuses, setStatuses] = useState<Record<string, StepStatus>>({
    read: "done",
    draft: "done",
    qa: "todo",
    overwrite: "todo",
    outreach: "todo",
  });
  const [activeRiskId, setActiveRiskId] = useState<string | null>(null);
  const [showImpact, setShowImpact] = useState(false);
  const [pausedBanner, setPausedBanner] = useState(false);

  const notNowBtnRef = useRef<HTMLButtonElement>(null);
  const shouldFocusNotNowRef = useRef(false);

  useEffect(() => {
    if (activeRiskId && shouldFocusNotNowRef.current) {
      shouldFocusNotNowRef.current = false;
      notNowBtnRef.current?.focus();
    }
  }, [activeRiskId]);

  const doneCount = STEPS.filter(
    (step) => statuses[step.id] === "done" || statuses[step.id] === "approved"
  ).length;

  const overallState: "organizing" | "waiting" | "paused" | "complete" = activeRiskId
    ? "waiting"
    : pausedBanner
      ? "paused"
      : doneCount === STEPS.length
        ? "complete"
        : "organizing";

  const advanceNext = () => {
    setPausedBanner(false);
    const nextStep = STEPS.find(
      (s) => statuses[s.id] === "todo" || statuses[s.id] === "paused"
    );
    if (!nextStep) {
      onStatusChange?.(
        isZh ? "全部 5 步任务已完成。" : "All 5 café steps are already complete."
      );
      return;
    }

    if (nextStep.risk === "low") {
      setStatuses((prev) => ({ ...prev, [nextStep.id]: "done" }));
      const msg = isZh
        ? `${nextStep.actor} 已自动完成低风险步骤：${nextStep.title.zh}`
        : `${nextStep.actor} completed low-risk step: ${nextStep.title.en}`;
      onStatusChange?.(msg);
      return;
    }

    setStatuses((prev) => ({ ...prev, [nextStep.id]: "waiting" }));
    setShowImpact(false);
    shouldFocusNotNowRef.current = true;
    setActiveRiskId(nextStep.id);
    const msg = isZh
      ? `遇到高风险步骤「${nextStep.title.zh}」，已停下等待确认，默认焦点落在「先不要」。`
      : `Paused on high-risk step "${nextStep.title.en}". Default focus placed on "Not now".`;
    onStatusChange?.(msg);
  };

  const jumpToRiskyStep = () => {
    setPausedBanner(false);
    const targetRisk =
      STEPS.find(
        (s) => s.risk === "high" && statuses[s.id] !== "approved"
      ) ?? STEPS[3];
    setStatuses((prev) => ({
      ...prev,
      read: "done",
      draft: "done",
      qa: "done",
      [targetRisk.id]: "waiting",
    }));
    setShowImpact(false);
    shouldFocusNotNowRef.current = true;
    setActiveRiskId(targetRisk.id);
    const msg = isZh
      ? `前 3 步低风险任务已完成，高风险卡「${targetRisk.title.zh}」已弹出，默认聚焦「先不要」。`
      : `3 low-risk steps complete. High-risk card "${targetRisk.title.en}" opened with focus on "Not now".`;
    onStatusChange?.(msg);
  };

  const handleNotNow = () => {
    if (!activeRiskId) return;
    const pausedStep = STEPS.find((s) => s.id === activeRiskId);
    setStatuses((prev) => ({ ...prev, [activeRiskId]: "paused" }));
    setActiveRiskId(null);
    setShowImpact(false);
    setPausedBanner(true);
    const msg = isZh
      ? `已选择「先不要」：${pausedStep?.title.zh ?? "风险步骤"} 安全挂起，已完成进度（${doneCount}/5）完整保留。`
      : `Chose "Not now": "${pausedStep?.title.en ?? "risky step"}" suspended safely with ${doneCount}/5 steps preserved.`;
    onStatusChange?.(msg);
  };

  const handleProceedRisk = () => {
    if (!activeRiskId) return;
    const approvedStep = STEPS.find((s) => s.id === activeRiskId);
    setStatuses((prev) => ({ ...prev, [activeRiskId]: "approved" }));
    setActiveRiskId(null);
    setShowImpact(false);
    setPausedBanner(false);
    const msg = isZh
      ? `已明确授权执行：${approvedStep?.title.zh ?? "高风险步骤"}。`
      : `Explicitly approved risky step: ${approvedStep?.title.en ?? "step"}.`;
    onStatusChange?.(msg);
  };

  const activeRiskStep = STEPS.find((s) => s.id === activeRiskId) ?? null;

  const copy = isZh
    ? {
        crew: [
          { name: "Wick", role: "黑板规划" },
          { name: "Clem", role: "资料检索" },
          { name: "Flint", role: "副本复核" },
        ],
        states: {
          organizing: "整理中",
          waiting: "等待确认",
          paused: "已安全暂停",
          complete: "全部完成",
        },
        safetyBadge: "仅改副本 · 预算上限 $2.00",
        advance: "推进下一步",
        jumpRisk: "直达高风险确认卡",
        riskBadge: "高风险 · 默认「先不要」",
        notNow: "先不要（安全暂停）",
        inspect: "查看影响范围",
        hideInspect: "收起影响范围",
        proceed: "仍要继续执行",
        pausedNote: "角色已退回吧台待命，已完成步骤与工作副本完整保留，未执行任何高风险改动。",
        statusTags: {
          todo: "待办",
          done: "已完成",
          waiting: "等待确认",
          paused: "已暂缓",
          approved: "已授权",
        },
      }
    : {
        crew: [
          { name: "Wick", role: "Planner" },
          { name: "Clem", role: "Research" },
          { name: "Flint", role: "QA" },
        ],
        states: {
          organizing: "Organizing",
          waiting: "Waiting on you",
          paused: "Paused safely",
          complete: "Complete",
        },
        safetyBadge: "Copies only · Cap $2.00",
        advance: "Advance next step",
        jumpRisk: "Jump to risky step",
        riskBadge: "HIGH RISK · DEFAULT: NOT NOW",
        notNow: "Not now (Pause safely)",
        inspect: "Inspect impact scope",
        hideInspect: "Hide impact scope",
        proceed: "Proceed anyway",
        pausedNote:
          "Crew paused cleanly at the counter. Completed steps and working copies remain intact; nothing risky ran.",
        statusTags: {
          todo: "Queued",
          done: "Done",
          waiting: "Waiting",
          paused: "Paused",
          approved: "Approved",
        },
      };

  return (
    <div className="sim-lamplight">
      <div className="sim-cafe-bar" data-state={overallState}>
        <div className="sim-crew-pills">
          {copy.crew.map((member) => (
            <span key={member.name} className="sim-crew-pill">
              <strong>{member.name}</strong> · {member.role}
            </span>
          ))}
        </div>
        <div className="sim-cafe-meta">
          <span className="sim-state-badge" data-state={overallState}>
            {copy.states[overallState]} · {doneCount}/{STEPS.length}
          </span>
          <span className="sim-mono-pill">{copy.safetyBadge}</span>
        </div>
      </div>

      <div className="sim-triage-controls">
        <button
          type="button"
          className="btn btn-ghost"
          disabled={Boolean(activeRiskId) || doneCount === STEPS.length}
          onClick={advanceNext}
        >
          {copy.advance}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={Boolean(activeRiskId)}
          onClick={jumpToRiskyStep}
        >
          {copy.jumpRisk}
        </button>
      </div>

      {pausedBanner && (
        <div className="sim-paused-banner" role="note">
          <strong>{copy.states.paused}:</strong> {copy.pausedNote}
        </div>
      )}

      {activeRiskStep && (
        <div
          className="sim-risk-card"
          role="group"
          aria-label={activeRiskStep.title[locale]}
        >
          <div className="sim-risk-card-head">
            <span className="sim-risk-badge">{copy.riskBadge}</span>
            <span className="sim-mono-pill">{activeRiskStep.actor}</span>
          </div>
          <h3>{activeRiskStep.title[locale]}</h3>
          <p>{activeRiskStep.detail[locale]}</p>

          {showImpact && activeRiskStep.impactBefore && activeRiskStep.impactAfter && (
            <div className="sim-impact-diff">
              <p>{activeRiskStep.impactBefore[locale]}</p>
              <p>{activeRiskStep.impactAfter[locale]}</p>
            </div>
          )}

          <div className="sim-risk-actions">
            <button
              ref={notNowBtnRef}
              type="button"
              className="btn btn-primary sim-not-now-btn"
              data-default-safe="true"
              onClick={handleNotNow}
            >
              {copy.notNow}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              aria-expanded={showImpact}
              onClick={() => setShowImpact((prev) => !prev)}
            >
              {showImpact ? copy.hideInspect : copy.inspect}
            </button>
            <button
              type="button"
              className="btn btn-ghost sim-risky-proceed-btn"
              onClick={handleProceedRisk}
            >
              {copy.proceed}
            </button>
          </div>
        </div>
      )}

      <ol className="sim-step-list">
        {STEPS.map((step, index) => {
          const st = statuses[step.id];
          return (
            <li key={step.id} className="sim-step-item" data-status={st} data-risk={step.risk}>
              <div className="sim-step-main">
                <span className="sim-step-index">0{index + 1}</span>
                <div>
                  <div className="sim-step-title">{step.title[locale]}</div>
                  <div className="sim-step-detail">
                    {step.actor} · {step.detail[locale]}
                  </div>
                </div>
              </div>
              <span className="sim-step-badge" data-status={st}>
                {copy.statusTags[st]}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
