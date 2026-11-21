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
 * Defers loading the keyboard-shortcuts modal chunk until the user first
 * triggers `?` or `Cmd/Ctrl + /`.
 */
export function LazyKeyboardShortcuts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "/") {
        setMounted(true);
      }
    };
    document.addEventListener("keydown", onKeyDown, { capture: true });
    return () => document.removeEventListener("keydown", onKeyDown, { capture: true });
  }, [mounted]);

  if (!mounted) return null;
  return <KeyboardShortcutsModal initialOpen />;
}
