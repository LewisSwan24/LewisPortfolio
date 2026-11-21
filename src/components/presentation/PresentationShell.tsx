"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import type { PresentationDeckData } from "@/lib/presentation/build-deck";
import { localizeInternalHref } from "@/lib/locale-href";
import { BeforeAfterScrubber } from "@/components/case/BeforeAfterScrubber";
import { CaseMicroLoop } from "@/components/case/CaseMicroLoop";
import { ResearchQuoteDeck } from "@/components/case/ResearchQuoteDeck";
import { getSimulatorComponent } from "@/components/case/simulators/registry";

const NOTES_STORAGE_KEY = "lewis-pres-notes";

interface PresentationShellProps {
  deck: PresentationDeckData;
  open: boolean;
  onClose: () => void;
}

function isInteractiveChild(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.closest('[role="slider"]')) return true;
  if (target.closest(".pres-interactive-host button, .pres-interactive-host input, .pres-interactive-host select")) {
    return true;
  }
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
}

export function PresentationShell({ deck, open, onClose }: PresentationShellProps) {
  const isZh = deck.locale === "zh";
  const headingId = useId();
  const [dialogEl, setDialogEl] = useState<HTMLDialogElement | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const total = deck.slides.length;
  const current = deck.slides[slideIdx] ?? deck.slides[0];

  // Hydrate machine-only speaker notes state from sessionStorage
  useEffect(() => {
    try {
      setShowNotes(window.sessionStorage.getItem(NOTES_STORAGE_KEY) === "1");
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  const toggleNotes = useCallback(() => {
    setShowNotes((prev) => {
      const next = !prev;
      try {
        window.sessionStorage.setItem(NOTES_STORAGE_KEY, next ? "1" : "0");
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!dialogEl) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen?.();
      } else {
        await dialogEl.requestFullscreen?.();
      }
    } catch {
      // Graceful no-op when fullscreen API is blocked or unsupported
    }
  }, [dialogEl]);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // Synchronize native <dialog> modal state
  useEffect(() => {
    if (!dialogEl) return;
    if (open) {
      setSlideIdx(0);
      if (typeof dialogEl.showModal === "function") {
        if (!dialogEl.open) dialogEl.showModal();
      } else {
        dialogEl.setAttribute("open", "");
      }
    } else if (dialogEl.open) {
      if (typeof dialogEl.close === "function") dialogEl.close();
      else dialogEl.removeAttribute("open");
    }
  }, [dialogEl, open]);

  const goPrev = useCallback(() => {
    setSlideIdx((prev) => Math.max(0, prev - 1));
  }, []);

  const goNext = useCallback(() => {
    setSlideIdx((prev) => Math.min(total - 1, prev + 1));
  }, [total]);

  const handleDialogKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDialogElement>) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "Escape") {
        // Fallback for non-modal environments (e.g. jsdom without showModal)
        if (typeof event.currentTarget.showModal !== "function") {
          event.preventDefault();
          onClose();
        }
        return;
      }

      if (isInteractiveChild(event.target)) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight" || event.key === " ") {
        if (event.target instanceof HTMLElement && event.target.tagName === "BUTTON" && event.key === " ") {
          return;
        }
        event.preventDefault();
        goNext();
      } else if (event.key === "n" || event.key === "N") {
        event.preventDefault();
        toggleNotes();
      } else if (event.key === "f" || event.key === "F") {
        event.preventDefault();
        void toggleFullscreen();
      }
    },
    [goNext, goPrev, onClose, toggleFullscreen, toggleNotes]
  );

  const Simulator = current?.interactiveDemo
    ? getSimulatorComponent(current.interactiveDemo.id)
    : null;

  const copy = isZh
    ? {
        prev: "上一页",
        next: "下一页",
        notes: "备注 (N)",
        fullscreen: isFullscreen ? "退出全屏" : "全屏 (F)",
        close: "退出演示 (Esc)",
        speakerLabel: "本机演讲备注（仅本机可见）",
        followUpLabel: "面试官常见追问",
        slideNav: "演示页面导航",
      }
    : {
        prev: "Prev",
        next: "Next",
        notes: "Notes (N)",
        fullscreen: isFullscreen ? "Exit full" : "Fullscreen (F)",
        close: "Exit (Esc)",
        speakerLabel: "Local speaker notes (device only)",
        followUpLabel: "Manager follow-up",
        slideNav: "Presentation slide navigation",
      };

  return (
    <dialog
      ref={setDialogEl}
      className="pres-dialog"
      aria-labelledby={headingId}
      onClose={onClose}
      onCancel={onClose}
      onKeyDown={handleDialogKeyDown}
    >
      {open && current && (
        <div className="pres-frame case-sim-shell">
          <header className="case-sim-head">
            <div className="lab-pill-row">
              <span className="tag">
                {String(slideIdx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="eyebrow">{deck.deckSubtitle}</span>
              <h2 id={headingId} style={{ margin: 0, fontSize: "clamp(18px, 2vw, 24px)" }}>
                {current.stepLabel} · {current.title}
              </h2>
            </div>

            <div className="lab-pill-row">
              <button
                type="button"
                className="btn btn-ghost"
                disabled={slideIdx === 0}
                onClick={goPrev}
              >
                {copy.prev}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                disabled={slideIdx === total - 1}
                onClick={goNext}
              >
                {copy.next}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                aria-pressed={showNotes}
                onClick={toggleNotes}
              >
                {copy.notes}
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => void toggleFullscreen()}>
                {copy.fullscreen}
              </button>
              <button type="button" className="btn btn-primary" autoFocus onClick={onClose}>
                {copy.close}
              </button>
            </div>
          </header>

          <div className="pres-stage">
            {current.subtitle && <p className="case-sim-prompt">{current.subtitle}</p>}

            {current.metrics && current.metrics.length > 0 && (
              <div className="sim-segmented" role="list" aria-label="Metrics">
                {current.metrics.map((metric) => (
                  <span key={metric} className="tag tag-accent" role="listitem">
                    {metric}
                  </span>
                ))}
              </div>
            )}

            {current.meta && current.meta.length > 0 && (
              <dl className="v3-card-grid">
                {current.meta.map((item) => (
                  <div key={item.label} className="sim-field">
                    <dt className="eyebrow">{item.label}</dt>
                    <dd className="case-sim-prompt" style={{ margin: 0 }}>{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {current.image && (
              <div className="sim-field" style={{ maxHeight: 360 }}>
                <Image
                  src={current.image.src}
                  alt={current.image.alt}
                  width={current.image.width}
                  height={current.image.height}
                  sizes="(max-width: 960px) 92vw, 960px"
                  className="proc-wf-svg"
                  style={{ maxHeight: 330 }}
                />
              </div>
            )}

            {current.quotes && <ResearchQuoteDeck data={current.quotes} locale={deck.locale} />}

            {current.scrubber && <BeforeAfterScrubber data={current.scrubber} locale={deck.locale} />}

            {Simulator && (
              <div className="pres-interactive-host case-sim-stage">
                <Simulator locale={deck.locale} />
              </div>
            )}

            {!Simulator && current.microLoop && (
              <div className="pres-interactive-host">
                <CaseMicroLoop data={current.microLoop} locale={deck.locale} />
              </div>
            )}

            {current.bullets && current.bullets.length > 0 && !current.quotes && !Simulator && (
              <div className="v3-card-grid">
                {current.bullets.map((bullet) => (
                  <article key={bullet.title} className="sim-field">
                    <div className="eyebrow">{bullet.title}</div>
                    <p className="case-sim-prompt">{bullet.detail}</p>
                  </article>
                ))}
              </div>
            )}

            {current.followUp && (
              <div className="case-sim-takeaway">
                <span className="case-sim-takeaway-label">{copy.followUpLabel}</span>
                <div>
                  <p>
                    <strong>{current.followUp.question}</strong>
                  </p>
                  <p>{current.followUp.answer}</p>
                </div>
              </div>
            )}

            {current.ctaHref && current.ctaLabel && (
              <div>
                <Link
                  href={localizeInternalHref(current.ctaHref, deck.locale)}
                  className="btn btn-ghost"
                  onClick={onClose}
                >
                  {current.ctaLabel} →
                </Link>
              </div>
            )}
          </div>

          {showNotes && (
            <aside className="case-sim-takeaway" role="region" aria-label={copy.speakerLabel}>
              <span className="case-sim-takeaway-label">{copy.speakerLabel}</span>
              <p>{current.speakerNote}</p>
            </aside>
          )}

          <nav className="case-sim-takeaway" aria-label={copy.slideNav}>
            <span className="case-sim-takeaway-label">{String(slideIdx + 1).padStart(2, "0")}</span>
            <div className="sim-segmented">
              {deck.slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  className="sim-seg-btn"
                  aria-pressed={idx === slideIdx}
                  onClick={() => setSlideIdx(idx)}
                >
                  {slide.stepLabel}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </dialog>
  );
}
