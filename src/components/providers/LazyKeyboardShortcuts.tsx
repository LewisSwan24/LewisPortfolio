"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const KeyboardShortcutsModal = dynamic(
  () =>
    import("@/components/providers/KeyboardShortcutsModal").then(
      (mod) => mod.KeyboardShortcutsModal
    ),
  { ssr: false }
);

/**
 * Defers loading the keyboard-shortcuts native `<dialog>` chunk until `?` or `Cmd/Ctrl + /`.
 */
export function LazyKeyboardShortcuts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      const isQuestion = event.key === "?" && !event.metaKey && !event.ctrlKey && !event.altKey;
      const isMetaSlash = (event.metaKey || event.ctrlKey) && event.key === "/";
      if (isQuestion || isMetaSlash) {
        event.preventDefault();
        setMounted(true);
      }
    };
    document.addEventListener("keydown", onKeyDown, { capture: true });
    return () => document.removeEventListener("keydown", onKeyDown, { capture: true });
  }, [mounted]);

  if (!mounted) return null;
  return <KeyboardShortcutsModal initialOpen />;
}
