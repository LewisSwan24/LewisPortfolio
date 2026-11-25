"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import type { PresentationDeckData } from "@/lib/presentation/build-deck";

const LazyPresentationShell = dynamic(
  () => import("./PresentationShell").then((mod) => mod.PresentationShell),
  { ssr: false }
);

interface PresentationTriggerProps {
  deck: PresentationDeckData;
  locale: "en" | "zh";
  className?: string;
}

function isEditableElement(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
}

export function PresentationTrigger({ deck, locale, className }: PresentationTriggerProps) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  const openDeck = useCallback(() => {
    setHasLoaded(true);
    setOpen(true);
  }, []);

  const closeDeck = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isEditableElement(event.target)) return;
      if (event.shiftKey && event.key.toLowerCase() === "p") {
        event.preventDefault();
        openDeck();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openDeck]);

  const label = locale === "zh" ? "演示模式" : "Presentation mode";

  return (
    <>
      <button type="button" className={className ?? "btn btn-ghost"} onClick={openDeck}>
        {label}
        {/* Keyboard hint; presentation.css hides it where there is no hover (touch). */}
        <span className="presentation-shortcut"> (Shift+P)</span>
      </button>
      {hasLoaded && (
        <LazyPresentationShell deck={deck} open={open} onClose={closeDeck} />
      )}
    </>
  );
}
