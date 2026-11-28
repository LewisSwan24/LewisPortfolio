"use client";

import { useCallback, useEffect, useRef } from "react";

export interface LightboxSlide {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

let cachedSupportsDisplayTransition: boolean | undefined;

function canTransitionDisplay(): boolean {
  if (cachedSupportsDisplayTransition !== undefined) return cachedSupportsDisplayTransition;
  if (
    typeof window === "undefined" ||
    !window.CSS?.supports?.("transition-behavior", "allow-discrete") ||
    !document.body
  ) {
    return false;
  }
  const probe = document.createElement("div");
  probe.style.cssText = "transition: display 1s allow-discrete !important; display: block;";
  document.body.appendChild(probe);
  getComputedStyle(probe).display;
  probe.style.display = "none";
  cachedSupportsDisplayTransition = getComputedStyle(probe).display === "block";
  probe.remove();
  return cachedSupportsDisplayTransition;
}

function supportsTopLayerExit(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(window.CSS?.supports?.("overlay", "auto") && canTransitionDisplay());
}

/**
 * Native `<dialog>` top-layer evidence inspector styled in Lively Icons tokens.
 * Supports Esc/backdrop dismissal (`closedby="any"` + fallback), left/right
 * keyboard navigation, and `@starting-style` / `allow-discrete` transitions.
 */
export function CaseLightbox({
  slides,
  openIndex,
  onClose,
  onSelectIndex,
  isZh = false,
}: {
  slides: LightboxSlide[];
  openIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
  isZh?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const activeSlide = openIndex !== null ? slides[openIndex] ?? null : null;
  const total = slides.length;

  const closeWithTransition = useCallback(async () => {
    const dialog = dialogRef.current;
    if (!dialog) {
      onClose();
      return;
    }
    if (dialog.open && !supportsTopLayerExit()) {
      dialog.setAttribute("data-closing", "");
      const animations = dialog.getAnimations({ subtree: true });
      if (animations.length > 0) {
        await Promise.race([
          Promise.allSettled(animations.map((a) => a.finished)),
          new Promise((resolve) => setTimeout(resolve, 400)),
        ]);
      }
      if (!dialog.hasAttribute("data-closing")) return;
      dialog.removeAttribute("data-closing");
    }
    if (dialog.open) dialog.close();
    onClose();
  }, [onClose]);

  const goPrev = useCallback(() => {
    if (openIndex === null || total < 2) return;
    onSelectIndex((openIndex - 1 + total) % total);
  }, [onSelectIndex, openIndex, total]);

  const goNext = useCallback(() => {
    if (openIndex === null || total < 2) return;
    onSelectIndex((openIndex + 1) % total);
  }, [onSelectIndex, openIndex, total]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (openIndex !== null) {
      dialog.removeAttribute("data-closing");
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [openIndex]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      void closeWithTransition();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (openIndex === null) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("keydown", handleKeyDown);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeWithTransition, goNext, goPrev, openIndex]);

  return (
    <dialog
      ref={dialogRef}
      className="case-lightbox"
      aria-label={isZh ? "放大查看图片" : "Inspect evidence image"}
      {...({ closedby: "any" } as Record<string, string>)}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          void closeWithTransition();
        }
      }}
    >
      {activeSlide && openIndex !== null && (
        <div className="case-lightbox-shell">
          <div className="case-lightbox-bar">
            <span className="eyebrow">
              {String(openIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              className="btn btn-ghost case-lightbox-close"
              onClick={() => void closeWithTransition()}
            >
              {isZh ? "关闭 (Esc)" : "Close (Esc)"}
            </button>
          </div>

          <div className="case-lightbox-stage">
            {/* Native img avoids fixed grid sizing inside the zoomed top-layer dialog */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeSlide.src}
              alt={activeSlide.alt}
              width={activeSlide.width}
              height={activeSlide.height}
            />
          </div>

          <div className="case-lightbox-foot">
            <p>{activeSlide.caption ?? activeSlide.alt}</p>
            {total > 1 && (
              <div className="case-lightbox-nav">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={goPrev}
                  aria-label={isZh ? "上一张" : "Previous image"}
                >
                  ← {isZh ? "上一张" : "Prev"}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={goNext}
                  aria-label={isZh ? "下一张" : "Next image"}
                >
                  {isZh ? "下一张" : "Next"} →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
