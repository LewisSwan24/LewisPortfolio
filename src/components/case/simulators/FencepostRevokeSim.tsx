"use client";

import { useState } from "react";
import type { SimulatorProps } from "./types";

type GrantState = "active" | "revoked" | "deleted";
type QuestionId = "street" | "exif" | "summary";

interface QASpec {
  id: QuestionId;
  prompt: { en: string; zh: string };
  activeAnswer: { en: string; zh: string };
}

const QUESTIONS: readonly QASpec[] = [
  {
    id: "street",
    prompt: {
      en: "Which street was this possum spotted on last night?",
      zh: "昨晚这只负鼠出现在哪条街？",
    },
    activeAnswer: {
      en: "Authorized summary: Shorncliffe fig-tree zone (evening). Exact house number and street address are excluded from the shared grant.",
      zh: "已授权摘要：桑克利夫（Shorncliffe）榕树带夜间目击。具体门牌号与街道地址在数据结构层面不进入分享上下文。",
    },
  },
  {
    id: "exif",
    prompt: {
      en: "Does this shared photo contain GPS EXIF coordinates?",
      zh: "这张分享的照片里是否保留 GPS EXIF 坐标？",
    },
    activeAnswer: {
      en: "No. Fencepost strips EXIF at ingest and persists only an opaque storage_key, so neither guests nor the assistant can extract coordinates.",
      zh: "没有。Fencepost 在入库时即剥离全部 EXIF 元数据，仅保存不透明 storage_key，访客与模型均无法读取定位坐标。",
    },
  },
  {
    id: "summary",
    prompt: {
      en: "Summarize this wildlife sighting for the neighbor.",
      zh: "帮我总结一下这条野生动物目击记录。",
    },
    activeAnswer: {
      en: "Ringtail possum observed near Shorncliffe fig canopy (21:40). Passed Screener check; visible strictly via active QR grant hash.",
      zh: "21:40 于桑克利夫树冠发现环尾负鼠；已通过 Screener 内容审核，仅凭有效二维码哈希授权查看。",
    },
  },
];

export function FencepostRevokeSim({ locale, onStatusChange }: SimulatorProps) {
  const isZh = locale === "zh";
  const [grantState, setGrantState] = useState<GrantState>("active");
  const [selectedQ, setSelectedQ] = useState<QuestionId | null>("street");
  const [askedCount, setAskedCount] = useState(1);

  const handleGrantChange = (next: GrantState) => {
    setGrantState(next);
    const msg =
      next === "active"
        ? isZh
          ? "权限已恢复为「有效分享」：模型上下文仅可见已剥离 EXIF 的授权摘要。"
          : "Access grant set to Active: assistant context includes the EXIF-stripped entry."
        : next === "revoked"
          ? isZh
            ? "二维码权限已吊销：访问边界立即生效，该条目已从 AI 查询上下文移除。"
            : "QR grant revoked: access boundary enforced immediately; entry removed from AI query context."
          : isZh
            ? "条目已软删除：模型下一次查询立刻失明，不再可见或引用该记录。"
            : "Entry soft-deleted: removed from assistant context on the very next query.";
    onStatusChange?.(msg);
  };

  const handleAsk = (question: QASpec) => {
    setSelectedQ(question.id);
    setAskedCount((c) => c + 1);
    if (grantState === "active") {
      onStatusChange?.(
        isZh
          ? `访客 AI 已基于有效权限回答「${question.prompt.zh}」。`
          : `Guest AI answered "${question.prompt.en}" using authorized EXIF-free summary.`
      );
    } else {
      onStatusChange?.(
        isZh
          ? "访问边界生效：该条记录已从查询上下文移除，模型不再可见。"
          : "Access boundary enforced: entry removed from query context; model can no longer see it."
      );
    }
  };

  const activeQuestion = QUESTIONS.find((q) => q.id === selectedQ) ?? QUESTIONS[0];

  const copy = isZh
    ? {
        residentTitle: "1. 居民视角 · 权限与隐私控制",
        sightingTitle: "环尾负鼠目击 · Shorncliffe 树冠区",
        sightingMeta: "EXIF 已剥离 · 仅存 storage_key · 经 access_grants 授权",
        grantLabel: "访客二维码权限开关",
        grants: [
          { id: "active" as const, label: "有效分享" },
          { id: "revoked" as const, label: "已吊销二维码" },
          { id: "deleted" as const, label: "已软删除" },
        ],
        contextOpen: "模型上下文：1 条授权记录可见（零 EXIF）",
        contextCut: "模型上下文：0 条记录（权限截断生效）",
        guestTitle: "2. 访客 AI 问答沙盒",
        guestHint: "点击预设提问，观察吊销权限前后模型回复的即时切换：",
        blockedTitle: "访问边界生效：该条记录已从查询上下文移除，模型不再可见。",
        blockedSub:
          grantState === "revoked"
            ? "原因：access_grants 哈希已被居民吊销（零缓存延迟）。"
            : "原因：记录已被居民软删除，查询层直接过滤。",
        turnTag: `第 ${askedCount} 次查询`,
      }
    : {
        residentTitle: "1. Resident view · Entry & QR permission",
        sightingTitle: "Ringtail possum · Shorncliffe fig canopy",
        sightingMeta: "EXIF stripped · storage_key only · gated by access_grants",
        grantLabel: "Guest QR access state",
        grants: [
          { id: "active" as const, label: "Active share" },
          { id: "revoked" as const, label: "Revoked QR" },
          { id: "deleted" as const, label: "Soft-deleted" },
        ],
        contextOpen: "Model context: 1 authorized entry visible (0 EXIF)",
        contextCut: "Model context: 0 entries (cut-off enforced)",
        guestTitle: "2. Guest AI Q&A box",
        guestHint: "Ask a preset question before and after revoking access:",
        blockedTitle: "Access boundary enforced: entry removed from query context; model can no longer see it.",
        blockedSub:
          grantState === "revoked"
            ? "Reason: resident revoked the QR access_grants hash (zero cache lag)."
            : "Reason: resident soft-deleted the entry; query layer omits it.",
        turnTag: `Query #${askedCount}`,
      };

  return (
    <div className="sim-fencepost">
      <div className="sim-panel-block sim-fp-resident">
        <h3 className="sim-panel-title">{copy.residentTitle}</h3>
        <article className="sim-fp-card" data-grant={grantState}>
          <div className="sim-fp-card-head">
            <strong>{copy.sightingTitle}</strong>
            <span className="sim-mono-pill">{copy.sightingMeta}</span>
          </div>
          <div className="sim-fp-context-bar" data-grant={grantState}>
            {grantState === "active" ? copy.contextOpen : copy.contextCut}
          </div>
        </article>

        <div className="sim-fp-grant-group">
          <span className="sim-field-label">{copy.grantLabel}</span>
          <div className="sim-segmented" role="group" aria-label={copy.grantLabel}>
            {copy.grants.map((grant) => (
              <button
                key={grant.id}
                type="button"
                className="sim-seg-btn"
                aria-pressed={grantState === grant.id}
                onClick={() => handleGrantChange(grant.id)}
              >
                {grant.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="sim-panel-block sim-fp-guest">
        <div className="sim-fp-guest-head">
          <h3 className="sim-panel-title">{copy.guestTitle}</h3>
          <span className="sim-mono-pill">{copy.turnTag}</span>
        </div>
        <p className="sim-hint-text">{copy.guestHint}</p>

        <div className="sim-fp-questions">
          {QUESTIONS.map((q) => (
            <button
              key={q.id}
              type="button"
              className="sim-scenario-btn"
              aria-pressed={selectedQ === q.id}
              onClick={() => handleAsk(q)}
            >
              <strong>{q.prompt[locale]}</strong>
            </button>
          ))}
        </div>

        <div className="sim-fp-reply" data-grant={grantState}>
          {grantState === "active" ? (
            <p>{activeQuestion.activeAnswer[locale]}</p>
          ) : (
            <div className="sim-fp-blocked">
              <strong>{copy.blockedTitle}</strong>
              <p>{copy.blockedSub}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
