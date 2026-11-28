"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

interface ShortcutItem {
  keys: string[];
  en: string;
  zh: string;
}

const SHORTCUTS: readonly ShortcutItem[] = [
  { keys: ["⌘", "K"], en: "Open command & rationale palette", zh: "打开命令面板与 AI 设计理由问答" },
  { keys: ["Shift", "P"], en: "Launch case presentation deck", zh: "在案例页启动演示模式" },
  { keys: ["←", "→"], en: "Navigate slides or lightbox frames", zh: "切换幻灯片或灯箱图片" },
  { keys: ["?"], en: "Toggle keyboard shortcuts dialog", zh: "打开或关闭快捷键说明" },
  { keys: ["Esc"], en: "Close active dialog or drawer", zh: "关闭当前弹窗或抽屉" },
];

function isTypingTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  return (
    el.tagName === "INPUT" ||
    el.tagName === "TEXTAREA" ||
    el.tagName === "SELECT" ||
    el.isContentEditable
  );
}

export function KeyboardShortcutsModal({ initialOpen = false }: { initialOpen?: boolean }) {
  const locale = useLocale() === "zh" ? "zh" : "en";
  const isZh = locale === "zh";
  const [isOpen, setIsOpen] = useState(initialOpen);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;
      const isQuestion = event.key === "?" && !event.metaKey && !event.ctrlKey && !event.altKey;
      const isMetaSlash = (event.metaKey || event.ctrlKey) && event.key === "/";
      if (isQuestion || isMetaSlash) {
        event.preventDefault();
        setIsOpen((prev) => {
          if (!prev && document.activeElement instanceof HTMLElement) {
            lastFocusRef.current = document.activeElement;
          }
          return !prev;
        });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      if (!lastFocusRef.current && document.activeElement instanceof HTMLElement) {
        lastFocusRef.current = document.activeElement;
      }
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
      lastFocusRef.current?.focus();
      lastFocusRef.current = null;
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <dialog
      ref={dialogRef}
      className="shortcuts-dialog"
      aria-labelledby="shortcuts-dialog-title"
      onClose={() => {
        setIsOpen(false);
        lastFocusRef.current?.focus();
        lastFocusRef.current = null;
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          handleClose();
        }
      }}
    >
      <div className="shortcuts-dialog-surface">
        <header className="shortcuts-dialog-head">
          <div>
            <span className="eyebrow">{isZh ? "键盘导航" : "Keyboard Navigation"}</span>
            <h2 id="shortcuts-dialog-title">
              {isZh ? "快捷键面板" : "Keyboard Shortcuts"}
            </h2>
          </div>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={handleClose}
            aria-label={isZh ? "关闭快捷键说明" : "Close keyboard shortcuts"}
          >
            ✕
          </button>
        </header>

        <ul className="shortcuts-dialog-list">
          {SHORTCUTS.map((item) => (
            <li key={item.en} className="shortcuts-dialog-row">
              <span>{isZh ? item.zh : item.en}</span>
              <span className="shortcuts-dialog-keys">
                {item.keys.map((k) => (
                  <kbd key={k}>{k}</kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>

        <p className="shortcuts-dialog-foot">
          {isZh ? "按 ? 或 ⌘/ 随时打开或关闭" : "Press ? or ⌘/ anytime to toggle this dialog"}
        </p>
      </div>
    </dialog>
  );
}
