"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

/** Smallest label size (CSS px) the enlarged view aims for. */
const TARGET_LABEL_PX = 12;

/**
 * v6.9 (review R01): a drawing whose labels shrink below reading size on a
 * phone gets a tap-to-enlarge button. The viewer draws the same diagram wide
 * enough that its smallest label is ~12px, and the reader pans sideways.
 * Uses the existing gallery badge and lightbox styles.
 */
export function DiagramViewer({
  children,
  label,
  isZh,
  className = "",
}: {
  children: ReactNode;
  /** Accessible name of the diagram, used for the button and the dialog. */
  label: string;
  isZh: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Size every drawing in the viewer so its smallest label reaches the target.
  useLayoutEffect(() => {
    if (!open || !stageRef.current) return;
    const stage = stageRef.current;
    const avail = stage.clientWidth;
    for (const svg of stage.querySelectorAll<SVGSVGElement>("svg")) {
      const vb = svg.viewBox.baseVal;
      if (!vb || !vb.width) continue;
      let minFont = Infinity;
      for (const t of svg.querySelectorAll("text")) {
        if (!t.textContent?.trim()) continue;
        const fs = parseFloat(getComputedStyle(t).fontSize);
        if (fs > 0) minFont = Math.min(minFont, fs);
      }
      const wanted = minFont === Infinity ? avail : (vb.width * TARGET_LABEL_PX) / minFont;
      svg.style.width = `${Math.ceil(Math.max(avail, wanted))}px`;
      svg.style.maxWidth = "none";
      svg.style.height = "auto";
    }
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  return (
    <div className={`diagram-zoom ${className}`.trim()} data-diagram-zoom="">
      {children}
      <button
        ref={triggerRef}
        type="button"
        className="case-build-trigger case-build-trigger--overlay"
        data-diagram-zoom-trigger=""
        onClick={() => setOpen(true)}
        aria-label={isZh ? `点击放大：${label}` : `Enlarge: ${label}`}
      >
        <span className="case-build-zoom-badge" aria-hidden="true">
          {isZh ? "点击放大 ↗" : "Enlarge ↗"}
        </span>
      </button>
      <dialog
        ref={dialogRef}
        className="case-lightbox diagram-zoom-dialog"
        data-diagram-zoom-dialog=""
        aria-label={label}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        {open && (
          <div className="case-lightbox-shell">
            <div className="case-lightbox-bar">
              <span className="eyebrow">{isZh ? "左右滑动查看全图" : "Scroll sideways to see it all"}</span>
              <button type="button" className="btn btn-ghost case-lightbox-close" onClick={close}>
                {isZh ? "关闭 (Esc)" : "Close (Esc)"}
              </button>
            </div>
            <div ref={stageRef} className="case-lightbox-stage diagram-zoom-stage">
              {children}
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
