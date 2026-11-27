"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Shows the first screen of a long module and keeps the rest in the DOM
 * behind a "Show all" toggle (v7.0 L2). Nothing is removed, so find-in-page
 * still works, and keyboard focus that lands in the clipped part opens it.
 */
export function Foldable({
  children,
  isZh,
  testId,
  label,
}: {
  children: ReactNode;
  isZh: boolean;
  testId?: string;
  /** What is folded, for the toggle's accessible name. */
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const [needed, setNeeded] = useState(true);
  const bodyRef = useRef<HTMLDivElement>(null);

  // A module shorter than the preview height needs no toggle.
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const check = () => setNeeded(body.scrollHeight > body.clientHeight + 4 || open);
    check();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(check);
    ro.observe(body);
    return () => ro.disconnect();
  }, [open]);

  const folded = needed && !open;

  return (
    <div className="foldable" data-testid={testId} data-folded={folded ? "true" : "false"}>
      <div
        ref={bodyRef}
        className="foldable-body"
        onFocus={(e) => {
          if (folded && e.target !== e.currentTarget) setOpen(true);
        }}
      >
        {children}
      </div>
      {needed && (
        <button
          type="button"
          className="btn btn-ghost foldable-toggle"
          aria-expanded={open}
          aria-label={
            open
              ? `${isZh ? "收起" : "Show less"}: ${label}`
              : `${isZh ? "显示全部" : "Show all"}: ${label}`
          }
          onClick={() => {
            if (open) bodyRef.current?.scrollIntoView({ block: "start" });
            setOpen((v) => !v);
          }}
        >
          {open ? (isZh ? "收起 ↑" : "Show less ↑") : isZh ? "显示全部 ↓" : "Show all ↓"}
        </button>
      )}
    </div>
  );
}
