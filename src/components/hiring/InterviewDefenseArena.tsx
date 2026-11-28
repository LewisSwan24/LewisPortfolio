"use client";

import { useState } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import {
  DEFENSE_DRILLS,
  DEFENSE_MARKETS,
  DEFENSE_ROLES,
  type DefenseMarketId,
  type DefenseRoleId,
} from "@/data/critique/defense-drills";
import styles from "./defense-arena.module.css";

export function InterviewDefenseArena({ locale }: { locale: "en" | "zh" }) {
  const isZh = locale === "zh";
  const [roleId, setRoleId] = useState<DefenseRoleId>("product");
  const [marketId, setMarketId] = useState<DefenseMarketId>("apac");
  const [showWeakContrast, setShowWeakContrast] = useState(true);

  const activeDrill =
    DEFENSE_DRILLS.find((d) => d.roleId === roleId && d.marketId === marketId) ??
    DEFENSE_DRILLS[0]!;

  return (
    <section
      id="defense-arena"
      className="section container"
      aria-labelledby="defense-arena-heading"
      data-testid="interview-defense-arena"
    >
      <div className={styles.arenaShell}>
        <header style={{ display: "grid", gap: 6 }}>
          <span className="eyebrow">
            {isZh
              ? "Live Interview Defense Arena · 岗位与双市场高压追问演练"
              : "Live Interview Defense Arena · Role × Market Pressure Drill"}
          </span>
          <h2 id="defense-arena-heading" className="h-display h2" style={{ margin: 0 }}>
            {isZh
              ? "先看面试官会怎么挑战，再对比套话与实证边界怎么答"
              : "Test sharp interviewer pushback: contrast inflated pitch traps against codebase receipts"}
          </h2>
          <p className="prose" style={{ margin: 0, maxWidth: "68ch", color: "var(--text-2)" }}>
            {isZh
              ? "覆盖 APAC 快迭代与 ANZ 稳健合规双重视角。每条回答都对应真实状态机、物理引脚或测试限制，绝不虚构指标。"
              : "Switch across hiring roles and regional expectations. Every grounded response links straight to live protocol specs, diffs, or honest field gaps."}
          </p>
        </header>

        <div className={styles.controlsBar}>
          <div className={styles.pillGroup} role="group" aria-label={isZh ? "选择面试岗位视角" : "Select interviewer role lens"}>
            <span className={styles.groupLabel}>{isZh ? "岗位视角" : "Role Lens"}</span>
            {DEFENSE_ROLES.map((role) => (
              <button
                key={role.id}
                type="button"
                className={styles.pillBtn}
                aria-pressed={roleId === role.id}
                data-testid={`defense-role-${role.id}`}
                onClick={() => setRoleId(role.id)}
              >
                {role[locale]}
              </button>
            ))}
          </div>

          <div className={styles.pillGroup} role="group" aria-label={isZh ? "选择区域评审习惯" : "Select hiring market expectations"}>
            <span className={styles.groupLabel}>{isZh ? "区域考纲" : "Market"}</span>
            {DEFENSE_MARKETS.map((mkt) => (
              <button
                key={mkt.id}
                type="button"
                className={styles.pillBtn}
                aria-pressed={marketId === mkt.id}
                data-testid={`defense-market-${mkt.id}`}
                onClick={() => setMarketId(mkt.id)}
              >
                {mkt[locale]}
              </button>
            ))}

            <button
              type="button"
              className={styles.pillBtn}
              aria-pressed={showWeakContrast}
              data-testid="defense-compare-toggle"
              onClick={() => setShowWeakContrast((prev) => !prev)}
            >
              {showWeakContrast
                ? isZh
                  ? "隐藏「空洞套话对照」"
                  : "Hide Weak Trap Contrast"
                : isZh
                  ? "显示「空洞套话对照」"
                  : "Show Weak Trap Contrast"}
            </button>
          </div>
        </div>

        <div className={styles.questionCard} data-testid="defense-active-question">
          <span className="eyebrow">
            {activeDrill.roleLabel[locale]} · {activeDrill.marketLabel[locale]}
          </span>
          <p style={{ margin: 0, fontSize: 17, fontWeight: 600, lineHeight: 1.45 }}>
            “{activeDrill.challengeQuestion[locale]}”
          </p>
        </div>

        <div className={styles.comparisonGrid}>
          {showWeakContrast && (
            <article className={styles.answerBox} data-stance="trap" data-testid="defense-trap-card">
              <span className="eyebrow">
                {isZh ? "拒绝写法 · 无根据美化套话" : "Rejected Trap · Unverified Pitch Fluff"}
              </span>
              <p style={{ margin: 0, color: "var(--text-2)", lineHeight: 1.6 }}>
                {activeDrill.overclaimedWeakAnswer[locale]}
              </p>
            </article>
          )}

          <article className={styles.answerBox} data-stance="grounded" data-testid="defense-grounded-card">
            <span className="eyebrow">
              {isZh ? "推荐实证答法 · 立足真实代码与交互护栏" : "Evidence-Bounded Defense · Code & Spec Grounded"}
            </span>
            <p style={{ margin: 0, lineHeight: 1.65 }}>{activeDrill.groundedDefense[locale]}</p>
          </article>
        </div>

        <div className={styles.receiptRow}>
          <div style={{ fontSize: 13, color: "var(--text-2)" }}>
            <strong>{isZh ? "公开验证缺口：" : "Residual Gap: "}</strong>
            {activeDrill.residualGap[locale]}
          </div>
          <Link href={activeDrill.evidenceHref} className="btn btn-ghost">
            {activeDrill.verificationReceipt[locale]} →
          </Link>
        </div>
      </div>
    </section>
  );
}
