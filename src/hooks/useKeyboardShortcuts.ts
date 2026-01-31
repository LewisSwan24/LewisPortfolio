"use client";

import { useEffect, useCallback } from "react";

interface ShortcutHandler {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  handler: () => void;
  description?: string;
}

export function useKeyboardShortcuts(shortcuts: ShortcutHandler[]) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      for (const shortcut of shortcuts) {
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = shortcut.ctrl ? e.ctrlKey : !e.ctrlKey;
        const metaMatch = shortcut.meta ? e.metaKey : !e.metaKey;
        const shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey;
        const altMatch = shortcut.alt ? e.altKey : !e.altKey;

        // For shortcuts that can use either Ctrl or Cmd
        const modifierMatch =
          (shortcut.ctrl || shortcut.meta)
            ? e.ctrlKey || e.metaKey
            : ctrlMatch && metaMatch;

        if (keyMatch && modifierMatch && shiftMatch && altMatch) {
          e.preventDefault();
          shortcut.handler();
          break;
        }
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}

// Common shortcuts
export const defaultShortcuts = {
  search: { key: "k", meta: true, description: "Open search" },
  home: { key: "h", meta: true, description: "Go to home" },
  help: { key: "/", description: "Show shortcuts" },
  escape: { key: "Escape", description: "Close modal" },
};
