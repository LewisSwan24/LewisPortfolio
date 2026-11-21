"use client";

import { useEffect, useId, useRef, useState } from "react";

export interface AnchorNoteProps {
  term: string;
  note: string;
  label?: string;
}

export function AnchorNote({ term, note, label }: AnchorNoteProps) {
  const uid = useId().replace(/:/g, "");
  const popoverId = `anchor-note-${uid}`;
  // Default to true on SSR and initial hydration to avoid server/client attribute mismatch;
  // useEffect downgrades cleanly in environments without native Popover API.
  const [supportsNativePopover, setSupportsNativePopover] = useState(true);
  const [fallbackOpen, setFallbackOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setSupportsNativePopover(
      typeof HTMLElement !== "undefined" &&
        Object.prototype.hasOwnProperty.call(HTMLElement.prototype, "popover")
    );
  }, []);

  useEffect(() => {
    if (!fallbackOpen || supportsNativePopover) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFallbackOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [fallbackOpen, supportsNativePopover]);

  return (
    <span className="anchor-note-wrap">
      <button
        ref={triggerRef}
        type="button"
        className="anchor-note-trigger"
        popoverTarget={popoverId}
        aria-describedby={popoverId}
        aria-expanded={supportsNativePopover ? undefined : fallbackOpen}
        onClick={
          supportsNativePopover
            ? undefined
            : () => setFallbackOpen((prev) => !prev)
        }
      >
        {term}
      </button>
      {/* Keep phrasing-only tags inside AnchorNote so MDX inline usage inside <p> never causes HTML auto-close hydration mismatches. */}
      <span
        id={popoverId}
        popover="auto"
        role="note"
        className="anchor-note-popover"
        data-fallback-open={
          !supportsNativePopover && fallbackOpen ? "true" : undefined
        }
      >
        <span className="anchor-note-content">
          {label && <span className="anchor-note-eyebrow">{label}</span>}
          <span className="anchor-note-text">{note}</span>
        </span>
      </span>
    </span>
  );
}
