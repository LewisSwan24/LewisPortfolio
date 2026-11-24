"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { RawResearchVaultRecord } from "@/lib/cases/research-vault-schema";
import { VerifiedStatusBadge } from "./VerifiedStatusBadge";
import styles from "./raw-research-vault.module.css";

type VaultTabId = "protocol" | "logs" | "spec" | "tension" | "rebuild";

const TAB_DEFS: ReadonlyArray<{
  id: VaultTabId;
  label: { en: string; zh: string };
}> = [
  { id: "protocol", label: { en: "01 · Planned protocol (not run as written)", zh: "01 · 计划中的测试方案（未按此执行）" } },
  { id: "logs", label: { en: "02 · Field & Bench Logs", zh: "02 · 现场与台架实录" } },
  { id: "spec", label: { en: "03 · Ergonomics / Stage Spec", zh: "03 · 人因与阶段规格" } },
  { id: "tension", label: { en: "04 · Tri-Role Tension", zh: "04 · 三方诉求冲突" } },
  { id: "rebuild", label: { en: "05 · Rebuild Today", zh: "05 · 重做复盘" } },
];

export function RawResearchVault({
  vault,
  locale,
}: {
  vault: RawResearchVaultRecord;
  locale: "en" | "zh";
}) {
  const [activeTab, setActiveTab] = useState<VaultTabId>("protocol");
  const baseId = useId();
  const isZh = locale === "zh";
  const tabRefs = useRef<Partial<Record<VaultTabId, HTMLButtonElement | null>>>({});
  const panelRefs = useRef<Partial<Record<VaultTabId, HTMLDivElement | null>>>({});

  // Sync hidden="until-found" and browser Find-in-page beforematch events
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    for (const def of TAB_DEFS) {
      const panelEl = panelRefs.current[def.id];
      if (!panelEl) continue;

      if (def.id === activeTab) {
        panelEl.removeAttribute("hidden");
      } else {
        panelEl.setAttribute("hidden", "until-found");
      }

      const onBeforeMatch = () => {
        setActiveTab(def.id);
      };
      panelEl.addEventListener("beforematch", onBeforeMatch);
      cleanups.push(() => panelEl.removeEventListener("beforematch", onBeforeMatch));
    }
    return () => {
      for (const fn of cleanups) fn();
    };
  }, [activeTab]);

  const selectAndScrollTab = (id: VaultTabId) => {
    setActiveTab(id);
    const btn = tabRefs.current[id];
    btn?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIdx: number) => {
    let nextIdx: number | null = null;
    if (e.key === "ArrowRight") nextIdx = (currentIdx + 1) % TAB_DEFS.length;
    else if (e.key === "ArrowLeft") nextIdx = (currentIdx - 1 + TAB_DEFS.length) % TAB_DEFS.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = TAB_DEFS.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      const target = TAB_DEFS[nextIdx]!;
      selectAndScrollTab(target.id);
      tabRefs.current[target.id]?.focus();
    }
  };

  return (
    <section
      id="research-vault"
      className={styles.vaultSection}
      aria-labelledby={`${baseId}-heading`}
      data-testid="raw-research-vault"
    >
      <header className={styles.vaultHeader}>
        <div className={styles.vaultHeadTop}>
          <span className={styles.eyebrow}>
            {isZh ? "研究档案库 · RESEARCH VAULT" : "Research Vault"}
          </span>
          <VerifiedStatusBadge status={vault.studyStatus} locale={locale} />
        </div>
        <h2 id={`${baseId}-heading`} className={styles.heading}>
          {isZh
            ? "研究引导词、现场台架笔记、三方博弈与重做复盘"
            : "Moderator guide, observation logs, role tensions & rebuild retrospective"}
        </h2>
        <p className={styles.scopeNote} data-testid="vault-honest-scope">
          <strong>{isZh ? "实证口径声明：" : "Verification boundary: "}</strong>
          {vault.honestScopeNote[locale]}
        </p>
      </header>

      <div
        role="tablist"
        aria-label={isZh ? "原始研究档案分页" : "Raw research vault sections"}
        className={styles.tabList}
      >
        {TAB_DEFS.map((tab, idx) => {
          const selected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              className={styles.tabButton}
              data-testid={`vault-tab-${tab.id}`}
              onClick={() => selectAndScrollTab(tab.id)}
              onKeyDown={(e) => handleTabKeyDown(e, idx)}
            >
              {tab.label[locale]}
            </button>
          );
        })}
      </div>

      {/* Panel 01: Moderator Guide */}
      <div
        ref={(el) => {
          panelRefs.current.protocol = el;
        }}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-protocol`}
        hidden={activeTab !== "protocol"}
        tabIndex={activeTab === "protocol" ? 0 : undefined}
        className={styles.tabPanel}
        data-testid="vault-panel-protocol"
      >
        <div className={styles.panelBody}>
          <div>
            <h3 className={styles.entryTitle}>{vault.moderatorGuide.protocolTitle[locale]}</h3>
            <p className={styles.subMeta} style={{ marginTop: 4 }}>
              {vault.moderatorGuide.cohortAndSetting[locale]}
            </p>
          </div>
          <div className={styles.briefBox}>
            <span className={styles.eyebrow} style={{ display: "block", marginBottom: 4 }}>
              {isZh ? "计划中的开场说明（未执行）" : "Planned opening prompt (not run)"}
            </span>
            {vault.moderatorGuide.openingBrief[locale]}
          </div>
          <div className={styles.cardGrid}>
            {vault.moderatorGuide.taskProbes.map((probe, idx) => (
              <article key={probe.id} className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h4 className={styles.entryTitle}>
                    {isZh ? `任务探针 0${idx + 1}` : `Task Probe 0${idx + 1}`}
                  </h4>
                  <VerifiedStatusBadge status={probe.verifiedStatus} locale={locale} />
                </div>
                <dl className={styles.kvList}>
                  <div className={styles.kvRow}>
                    <dt>{isZh ? "执行动作" : "Prompt"}</dt>
                    <dd>{probe.prompt[locale]}</dd>
                  </div>
                  <div className={styles.kvRow}>
                    <dt>{isZh ? "观察重点" : "What we watch for"}</dt>
                    <dd>{probe.whatWeWatchFor[locale]}</dd>
                  </div>
                  <div className={styles.kvRow}>
                    <dt>{isZh ? "判死红线" : "Failure signal"}</dt>
                    <dd>{probe.failureSignal[locale]}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          <p className={styles.subMeta}>
            <strong>{isZh ? "计划中的收尾追问：" : "Planned debrief question: "}</strong>
            {vault.moderatorGuide.debriefQuestion[locale]}
          </p>
        </div>
      </div>

      {/* Panel 02: Observation Logs */}
      <div
        ref={(el) => {
          panelRefs.current.logs = el;
        }}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-logs`}
        hidden={activeTab !== "logs"}
        tabIndex={activeTab === "logs" ? 0 : undefined}
        className={styles.tabPanel}
        data-testid="vault-panel-logs"
      >
        <div className={styles.panelBody}>
          <div className={styles.cardGrid}>
            {vault.observationLogs.map((log) => (
              <article key={log.id} className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>{log.sessionRef[locale]}</h3>
                  <VerifiedStatusBadge status={log.verifiedStatus} locale={locale} />
                </div>
                <dl className={styles.kvList}>
                  <div className={styles.kvRow}>
                    <dt>{isZh ? "测试背景" : "Context"}</dt>
                    <dd>{log.context[locale]}</dd>
                  </div>
                  <div className={styles.kvRow}>
                    <dt>{isZh ? "原始观察" : "Observation"}</dt>
                    <dd>{log.observation[locale]}</dd>
                  </div>
                  <div className={styles.kvRow}>
                    <dt>{isZh ? "交互与工程响应" : "Design & engineering change"}</dt>
                    <dd>{log.designResponse[locale]}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Panel 03: Hardware Ergonomics / Stage Spec */}
      <div
        ref={(el) => {
          panelRefs.current.spec = el;
        }}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-spec`}
        hidden={activeTab !== "spec"}
        tabIndex={activeTab === "spec" ? 0 : undefined}
        className={styles.tabPanel}
        data-testid="vault-panel-spec"
      >
        <div className={styles.panelBody}>
          <div>
            <h3 className={styles.entryTitle}>{vault.ergonomicsOrStageSpec.title[locale]}</h3>
            <p className={styles.subMeta} style={{ marginTop: 4 }}>
              {vault.ergonomicsOrStageSpec.subtitle[locale]}
            </p>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.specTable}>
              <thead>
                <tr>
                  <th scope="col">{isZh ? "维度" : "Dimension"}</th>
                  <th scope="col">{isZh ? "硬性约束" : "Locked Constraint"}</th>
                  <th scope="col">{isZh ? "工程与人因依据" : "Rationale"}</th>
                  <th scope="col">{isZh ? "验证层级" : "Evidence"}</th>
                </tr>
              </thead>
              <tbody>
                {vault.ergonomicsOrStageSpec.rows.map((row) => (
                  <tr key={row.dimension.en}>
                    <td><strong>{row.dimension[locale]}</strong></td>
                    <td>{row.constraint[locale]}</td>
                    <td>{row.rationale[locale]}</td>
                    <td>
                      <VerifiedStatusBadge status={row.verifiedStatus} locale={locale} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Panel 04: Tri-Role Tension Matrix */}
      <div
        ref={(el) => {
          panelRefs.current.tension = el;
        }}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-tension`}
        hidden={activeTab !== "tension"}
        tabIndex={activeTab === "tension" ? 0 : undefined}
        className={styles.tabPanel}
        data-testid="vault-panel-tension"
      >
        <div className={styles.panelBody}>
          <div className={styles.triGrid}>
            {vault.triRoleTension.map((item) => (
              <article key={item.role} className={styles.entryCard}>
                <h3 className={styles.entryTitle}>{item.roleLabel[locale]}</h3>
                <dl className={styles.kvList}>
                  <div className={styles.kvRow}>
                    <dt>{isZh ? "核心诉求" : "Priority"}</dt>
                    <dd>{item.priority[locale]}</dd>
                  </div>
                  <div className={styles.kvRow}>
                    <dt>{isZh ? "冲突张力" : "Tension"}</dt>
                    <dd>{item.tension[locale]}</dd>
                  </div>
                  <div className={styles.kvRow}>
                    <dt>{isZh ? "最终裁决" : "Resolution"}</dt>
                    <dd>{item.resolution[locale]}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Panel 05: Rebuild Today Retrospective */}
      <div
        ref={(el) => {
          panelRefs.current.rebuild = el;
        }}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-rebuild`}
        hidden={activeTab !== "rebuild"}
        tabIndex={activeTab === "rebuild" ? 0 : undefined}
        className={styles.tabPanel}
        data-testid="vault-panel-rebuild"
      >
        <div className={styles.panelBody}>
          <div className={styles.cardGrid}>
            {vault.rebuildToday.map((item) => (
              <article key={item.id} className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>{item.question[locale]}</h3>
                  <VerifiedStatusBadge status={item.verifiedStatus} locale={locale} />
                </div>
                <p className={styles.subMeta} style={{ color: "var(--text)" }}>
                  {item.answer[locale]}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
