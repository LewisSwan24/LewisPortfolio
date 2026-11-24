"use client";

import { useMemo, useState } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import type {
  ComposerRoleId,
  ComposerSlug,
  ResumeComposerCaseItem,
  ResumeComposerPreset,
} from "@/lib/resume/composer-data";
import { siteConfig } from "@/lib/site";
import styles from "./resume-composer.module.css";

export function ResumeComposerClient({
  presets,
  cases,
  initialLocale,
}: {
  presets: readonly ResumeComposerPreset[];
  cases: readonly ResumeComposerCaseItem[];
  initialLocale: "en" | "zh";
}) {
  const [roleId, setRoleId] = useState<ComposerRoleId>("ixd-ai");
  const [previewLocale, setPreviewLocale] = useState<"en" | "zh">(initialLocale);
  const [selectedSlugs, setSelectedSlugs] = useState<ComposerSlug[]>([
    ...(presets[0]?.defaultCaseSlugs ?? ["walkie", "lamplight", "autofill", "onthebeat"]),
  ]);
  const [includeTradeoffs, setIncludeTradeoffs] = useState(true);
  const [includeCeilings, setIncludeCeilings] = useState(true);
  const [includeLabLinks, setIncludeLabLinks] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  const isUiZh = initialLocale === "zh";
  const isDocZh = previewLocale === "zh";

  const activePreset = useMemo(
    () => presets.find((p) => p.id === roleId) ?? presets[0]!,
    [presets, roleId]
  );

  const activeCases = useMemo(
    () => cases.filter((c) => selectedSlugs.includes(c.slug)),
    [cases, selectedSlugs]
  );

  const applyPreset = (preset: ResumeComposerPreset) => {
    setRoleId(preset.id);
    setSelectedSlugs([...preset.defaultCaseSlugs]);
    setStatusMessage(
      isUiZh
        ? `已套用「${preset.label.zh}」模板（勾选 ${preset.defaultCaseSlugs.length} 项代表作）`
        : `Applied ${preset.label.en} preset (${preset.defaultCaseSlugs.length} selected works)`
    );
  };

  const toggleCaseSlug = (slug: ComposerSlug) => {
    setSelectedSlugs((prev) => {
      if (prev.includes(slug)) {
        if (prev.length === 1) return prev;
        return prev.filter((s) => s !== slug);
      }
      return [...prev, slug];
    });
  };

  const buildMarkdownDossier = () => {
    const lines = [
      `# ${isDocZh ? `${siteConfig.author.nameZh} (${siteConfig.name})` : siteConfig.name}`,
      `**${activePreset.roleTitle[previewLocale]}**`,
      `${siteConfig.author.email} | ${siteConfig.url}`,
      "",
      `## ${isDocZh ? "岗位匹配摘要" : "Role Alignment"}`,
      activePreset.summary[previewLocale],
      "",
      `## ${isDocZh ? "精选案例与设计论证" : "Selected Works & Design Rationale"} (${activeCases.length})`,
      ...activeCases.flatMap((c) => [
        `- **${c.title[previewLocale]}** (${c.scope[previewLocale]} · ${c.date})`,
        `  - ${c.impactBullet[previewLocale]}`,
        ...(includeTradeoffs ? [`  - ${isDocZh ? "核心取舍：" : "Key tradeoff:"} ${c.tradeoffNote[previewLocale]}`] : []),
        ...(includeCeilings ? [`  - ${isDocZh ? "诚实边界：" : "Honest ceiling:"} ${c.ceilingNote[previewLocale]}`] : []),
      ]),
      "",
      `## ${isDocZh ? "核心能力栈" : "Core Capabilities"}`,
      activePreset.skills[previewLocale].map((s) => `- ${s}`).join("\n"),
      "",
      `## ${isDocZh ? "教育背景" : "Education"}`,
      isDocZh
        ? "- **昆士兰大学（布里斯班）** — 交互设计硕士 · 2025.02 – 2026.11"
        : "- **The University of Queensland, Brisbane** — Master of Interaction Design · 2025.02 – 2026.11",
      isDocZh
        ? "- **斯旺西大学（英国威尔士）** — 计算机科学（荣誉）理学士，二等一级学位（2:1）· 2020.09 – 2024.07"
        : "- **Swansea University, Wales, UK** — BSc (Hons) Computer Science, Upper Second-Class (2:1) · 2020.09 – 2024.07",
    ];
    return lines.join("\n");
  };

  const handleCopyMarkdown = async () => {
    const md = buildMarkdownDossier();
    try {
      await navigator.clipboard.writeText(md);
      setStatusMessage(
        isUiZh
          ? `已复制 ${activeCases.length} 项案例组合的 Markdown 档案 (${previewLocale.toUpperCase()})`
          : `Copied ${activeCases.length}-case Markdown dossier (${previewLocale.toUpperCase()})`
      );
    } catch {
      setStatusMessage(
        isUiZh
          ? `已生成 ${activeCases.length} 项案例组合，当前环境可直接打印或保存 PDF。`
          : `Prepared ${activeCases.length}-case dossier — use Print / Save PDF directly.`
      );
    }
  };

  return (
    <div className={styles.composerShell}>
      <aside
        className={styles.controlSidebar}
        aria-label={isUiZh ? "简历组装控制面板" : "Resume customization controls"}
      >
        <div className={styles.controlGroup}>
          <span className={styles.kicker}>
            {isUiZh ? "01 · 目标岗位预设" : "01 · Role Specialization Preset"}
          </span>
          <div className={styles.presetRow} role="group" aria-label={isUiZh ? "岗位方向" : "Role preset"}>
            {presets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={styles.pillBtn}
                aria-pressed={preset.id === roleId}
                data-testid={`composer-preset-${preset.id}`}
                onClick={() => applyPreset(preset)}
              >
                {preset.label[initialLocale]}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.controlGroup}>
          <span className={styles.kicker}>
            {isUiZh ? "02 · 预览语言切换" : "02 · Dossier Output Language"}
          </span>
          <div className={styles.presetRow} role="group" aria-label={isUiZh ? "预览语言" : "Dossier language"}>
            <button
              type="button"
              className={styles.pillBtn}
              aria-pressed={previewLocale === "en"}
              onClick={() => setPreviewLocale("en")}
            >
              English A4
            </button>
            <button
              type="button"
              className={styles.pillBtn}
              aria-pressed={previewLocale === "zh"}
              onClick={() => setPreviewLocale("zh")}
            >
              中文 A4 版
            </button>
          </div>
        </div>

        <div className={styles.controlGroup}>
          <span className={styles.kicker}>
            {isUiZh ? "03 · 勾选代表性公开案例" : "03 · Include Listed Flagship Cases"}
          </span>
          <div className={styles.checkList}>
            {cases.map((item) => (
              <label key={item.slug} className={styles.checkLabel}>
                <input
                  type="checkbox"
                  checked={selectedSlugs.includes(item.slug)}
                  onChange={() => toggleCaseSlug(item.slug)}
                  data-testid={`composer-case-${item.slug}`}
                />
                <span>{item.title[initialLocale]}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.controlGroup}>
          <span className={styles.kicker}>
            {isUiZh ? "04 · 论证与实证层开关" : "04 · Evidence Layer Toggles"}
          </span>
          <div className={styles.checkList}>
            <label className={styles.checkLabel}>
              <input
                type="checkbox"
                checked={includeTradeoffs}
                onChange={(e) => setIncludeTradeoffs(e.target.checked)}
              />
              <span>{isUiZh ? "展示设计权衡与拒绝方案" : "Show structured design tradeoffs"}</span>
            </label>
            <label className={styles.checkLabel}>
              <input
                type="checkbox"
                checked={includeCeilings}
                onChange={(e) => setIncludeCeilings(e.target.checked)}
              />
              <span>{isUiZh ? "保留诚实边界声明 (Unverified Limits)" : "Include honest verification limits"}</span>
            </label>
            <label className={styles.checkLabel}>
              <input
                type="checkbox"
                checked={includeLabLinks}
                onChange={(e) => setIncludeLabLinks(e.target.checked)}
              />
              <span>{isUiZh ? "附加在线交互实验室与模式图谱锚点" : "Include Lab FSM & Pattern Atlas links"}</span>
            </label>
          </div>
        </div>

        <div className={styles.actionStack}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => window.print()}
          >
            {isUiZh ? "打印 / 导出 A4 PDF" : "Print / Save A4 PDF"}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={handleCopyMarkdown}
          >
            {isUiZh ? "复制 Markdown 档案" : "Copy Markdown Dossier"}
          </button>
          <Link href="/resume" className="btn btn-ghost">
            {isUiZh ? "← 返回标准一页简历" : "← Back to standard resume"}
          </Link>
          <output role="status" className={styles.statusMsg} data-testid="composer-status">
            {statusMessage}
          </output>
        </div>
      </aside>

      <article
        id="resume-a4-preview"
        className={styles.a4Sheet}
        data-testid="resume-a4-sheet"
        lang={previewLocale}
        aria-label={isDocZh ? "可打印 A4 简历预览" : "Printable A4 resume preview"}
      >
        <header className={styles.a4Head}>
          <div>
            <h2 className={styles.a4Name}>
              {isDocZh ? `${siteConfig.author.nameZh} · ${siteConfig.name}` : siteConfig.name}
            </h2>
            <p className={styles.a4Subtitle} data-testid="composer-doc-role-title">
              {activePreset.roleTitle[previewLocale]}
            </p>
          </div>
          <div className={styles.a4Meta}>
            <div>{siteConfig.author.email}</div>
            <div>{siteConfig.url.replace(/^https?:\/\//, "")}</div>
            <div>
              {isDocZh ? "澳洲布里斯班 · 中英双语" : "Brisbane, AU · EN / 中文 Bilingual"}
            </div>
          </div>
        </header>

        <section className={styles.a4Section}>
          <h3 className={styles.a4SectionTitle}>
            {isDocZh ? "核心聚焦" : "Profile Summary"}
          </h3>
          <p className={styles.a4Summary}>{activePreset.summary[previewLocale]}</p>
        </section>

        <section className={styles.a4Section}>
          <h3 className={styles.a4SectionTitle}>
            {isDocZh
              ? `精选案例论证 (${activeCases.length} 项)`
              : `Selected Works & Rationale (${activeCases.length})`}
          </h3>
          <div className={styles.a4CaseList}>
            {activeCases.map((item) => (
              <div
                key={item.slug}
                className={styles.a4CaseItem}
                data-testid={`a4-case-${item.slug}`}
              >
                <div className={styles.a4CaseTop}>
                  <span className={styles.a4CaseTitle}>{item.title[previewLocale]}</span>
                  <span className={styles.a4CaseScope}>
                    {item.scope[previewLocale]} · {item.date}
                  </span>
                </div>
                <p className={styles.a4CaseText}>{item.impactBullet[previewLocale]}</p>
                {includeTradeoffs && (
                  <p className={styles.a4CaseText}>
                    <strong>{isDocZh ? "权衡：" : "Tradeoff: "}</strong>
                    {item.tradeoffNote[previewLocale]}
                  </p>
                )}
                {includeCeilings && (
                  <p className={styles.a4CaseCeiling}>
                    <strong>{isDocZh ? "实证边界：" : "Ceiling: "}</strong>
                    {item.ceilingNote[previewLocale]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.a4Section}>
          <h3 className={styles.a4SectionTitle}>
            {isDocZh ? "交互工程与验证能力" : "Capabilities & Engineering Craft"}
          </h3>
          <div className={styles.a4SkillsGrid}>
            {activePreset.skills[previewLocale].map((skill) => (
              <span key={skill} className={styles.a4SkillPill}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className={styles.a4Section}>
          <h3 className={styles.a4SectionTitle}>
            {isDocZh ? "教育背景" : "Education"}
          </h3>
          <p className={styles.a4CaseText}>
            <strong>
              {isDocZh
                ? "昆士兰大学 (The University of Queensland, Brisbane)"
                : "The University of Queensland, Brisbane"}
            </strong>{" "}
            — {isDocZh ? "交互设计硕士 · 2025.02 – 2026.11" : "Master of Interaction Design · 2025.02 – 2026.11"}
          </p>
          <p className={styles.a4CaseText}>
            <strong>
              {isDocZh
                ? "斯旺西大学 (Swansea University, Wales, UK)"
                : "Swansea University, Wales, UK"}
            </strong>{" "}
            —{" "}
            {isDocZh
              ? "计算机科学（荣誉）理学士（2:1）· 2020.09 – 2024.07"
              : "BSc (Hons) Computer Science (2:1) · 2020.09 – 2024.07"}
          </p>
        </section>

        {includeLabLinks && (
          <section className={styles.a4Section}>
            <h3 className={styles.a4SectionTitle}>
              {isDocZh ? "可核验交互原语与实证表面" : "Live Verifiable Proof Surfaces"}
            </h3>
            <div className={styles.a4ProofRow}>
              <span>Pattern Atlas: /patterns</span>
              <span>FSM Explorer: /lab#fsm-explorer</span>
              <span>Heuristic Matrix: /lab#heuristic-auditor</span>
              <span>Critique Print: /brief/print</span>
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
