"use client";

import { useState } from "react";
import type { CaseCodeDiffSpec } from "@/data/cases/code-diffs";
import styles from "./code-diff-viewer.module.css";

export function CaseCodeDiffViewer({
  diff,
  locale,
}: {
  diff: CaseCodeDiffSpec;
  locale: "en" | "zh";
}) {
  const isZh = locale === "zh";
  const [invariantOnly, setInvariantOnly] = useState(false);
  const [copied, setCopied] = useState(false);

  const visibleHunks = invariantOnly
    ? diff.hunks.filter((h) => h.kind !== "remove")
    : diff.hunks;

  const copyInvariant = async () => {
    const snippet = diff.hunks
      .filter((h) => h.kind !== "remove")
      .map((h) => h.code)
      .join("\n");
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      className={styles.diffShell}
      aria-labelledby={`code-diff-${diff.slug}`}
      data-testid="case-code-diff-viewer"
    >
      <div className={styles.diffHead}>
        <div>
          <span className="eyebrow">
            {isZh ? "工程护栏 Diff · 代码级论证对比" : "Engineering Invariant Diff · Hunk Proof"}
          </span>
          <h3 id={`code-diff-${diff.slug}`} className="h-display" style={{ fontSize: 19, margin: "4px 0 0" }}>
            {diff.title[locale]}
          </h3>
          <div className={styles.diffMeta}>
            {diff.filePath} · {diff.symbolName}()
          </div>
        </div>

        <div className={styles.actionRow}>
          <button
            type="button"
            className={styles.actionBtn}
            aria-pressed={!invariantOnly}
            data-testid="diff-mode-all"
            onClick={() => setInvariantOnly(false)}
          >
            {isZh ? "完整对比 (+/-)" : "Unified (+/-)"}
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            aria-pressed={invariantOnly}
            data-testid="diff-mode-safe"
            onClick={() => setInvariantOnly(true)}
          >
            {isZh ? "仅看线上铁律 (+)" : "Safe Invariant Only"}
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            data-testid="diff-copy-btn"
            onClick={copyInvariant}
          >
            {copied ? (isZh ? "已复制" : "Copied") : isZh ? "复制安全片段" : "Copy Safe Snippet"}
          </button>
        </div>
      </div>

      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: "var(--text-2)" }}>
        {diff.rationale[locale]}
      </p>

      <div className={styles.labelGrid}>
        <div>
          <strong>-</strong> {diff.antiPatternLabel[locale]}
        </div>
        <div>
          <strong>+</strong> {diff.invariantLabel[locale]}
        </div>
      </div>

      <pre className={styles.codeBlock}>
        <code>
          {visibleHunks.map((line, idx) => {
            const prefix = line.kind === "remove" ? "- " : line.kind === "add" ? "+ " : "  ";
            const cls =
              line.kind === "remove"
                ? styles.lineRemove
                : line.kind === "add"
                  ? styles.lineAdd
                  : styles.lineContext;
            return (
              <span key={`${line.kind}-${idx}`} className={cls}>
                {prefix}
                {line.code}
              </span>
            );
          })}
        </code>
      </pre>
    </section>
  );
}
