"use client";

import { useEffect, useState } from "react";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

interface ShortcutItem {
  keys: string[];
  description: string;
}

const shortcuts: ShortcutItem[] = [
  { keys: ["⌘", "K"], description: "Open search" },
  { keys: ["⌘", "/"], description: "Show keyboard shortcuts" },
  { keys: ["↑", "↓"], description: "Navigate items" },
  { keys: ["Enter"], description: "Select item" },
  { keys: ["Esc"], description: "Close modal" },
  { keys: ["Tab"], description: "Next focusable element" },
  { keys: ["Shift", "Tab"], description: "Previous focusable element" },
];

export function KeyboardShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);

  useKeyboardShortcuts([
    {
      key: "/",
      meta: true,
      handler: () => setIsOpen((prev) => !prev),
    },
    {
      key: "Escape",
      handler: () => setIsOpen(false),
    },
  ]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-background/80 transition-opacity duration-150"
        onClick={() => setIsOpen(false)}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Keyboard Shortcuts"
        className="fixed left-1/2 top-1/2 z-[101] w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-4"
      >
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              Keyboard Shortcuts
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-3">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
              >
                <span className="text-sm text-muted-foreground">
                  {shortcut.description}
                </span>
                <div className="flex items-center gap-1">
                  {shortcut.keys.map((key, keyIndex) => (
                    <kbd
                      key={keyIndex}
                      className="px-2 py-1 text-xs font-medium rounded bg-muted text-foreground border border-border"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-muted-foreground text-center">
            Press <kbd className="px-1.5 py-0.5 text-xs rounded bg-muted border border-border">⌘ /</kbd> to toggle this modal
          </p>
        </div>
      </div>
    </>
  );
}
