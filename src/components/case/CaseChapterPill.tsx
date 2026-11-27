"use client";

import Link from "next/link";
import type React from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CaseTocEntry } from "@/lib/cases/case-toc";

/**
 * v6.9 (review D02, Lewis 2026-11-27): on a phone a case page runs 13–16
 * screens, and its only chapter list sits near the top. Once the reader is
 * past that list, a pill in the corner names the chapter they are in; tapping
 * it opens a sheet with every chapter, back to top and the next project.
 * Phones only (CSS hides it from 768px up); it replaces back-to-top there.
 */

/**
 * A section counts as current once its top passes this line. Sections carry a
 * scroll margin of about 180px, so a jump lands its top there; the line sits
 * below that, at 30% of the viewport.
 */
const currentLine = () => Math.max(200, window.innerHeight * 0.3);

export function CaseChapterPill({
  entries,
  locale,
  next,
}: {
  entries: readonly CaseTocEntry[];
  locale: "en" | "zh";
  next: { href: string; title: string };
}) {
  const isZh = locale === "zh";
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pillRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const sheetId = useId();

  const copy = isZh
    ? { title: "本页目录", close: "关闭目录", top: "回到顶部", next: "下一个项目" }
    : { title: "On this page", close: "Close the list", top: "Back to top", next: "Next project" };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const jump = document.querySelector(".cs-jump");
      const footer = document.querySelector("footer");
      const pastList = jump ? jump.getBoundingClientRect().bottom < 0 : window.scrollY > 600;
      const beforeFooter = footer ? footer.getBoundingClientRect().top > window.innerHeight : true;
      setVisible(pastList && beforeFooter);

      const line = currentLine();
      let index = 0;
      entries.forEach((entry, i) => {
        const el = document.getElementById(entry.id);
        if (el && el.getBoundingClientRect().top <= line) index = i;
      });
      setCurrent(index);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [entries]);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) requestAnimationFrame(() => pillRef.current?.focus());
  }, []);

  // While the sheet is open: lock the page, start focus on the current
  // chapter, keep Tab inside, and close on Escape.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";

    const sheet = sheetRef.current;
    const focusables = () =>
      Array.from(sheet?.querySelectorAll<HTMLElement>("a[href], button") ?? []);
    (sheet?.querySelector<HTMLElement>("[aria-current='location']") ?? focusables()[0])?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = previous;
    };
  }, [open, close]);

  // The jump waits until the sheet has closed and the page is unlocked:
  // restoring `overflow` in the middle of a smooth scroll stops it short.
  const pendingChapter = useRef<string | null>(null);
  useEffect(() => {
    const id = pendingChapter.current;
    if (open || !id) return;
    pendingChapter.current = null;
    const target = document.getElementById(id);
    if (!target) return;
    if (window.location.hash === `#${id}`) {
      target.scrollIntoView({ block: "start" });
    } else {
      // Setting the hash keeps the URL in step with the page's own list and
      // fires hashchange, which opens the collapsed appendix when it is chosen.
      window.location.hash = id;
    }
    // Move focus to the section so keyboard and screen-reader users land where they asked.
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });

    // Sections further up mount and grow while a long smooth scroll is
    // running (about 900px on Walkie), so it can stop short of the target.
    // When the scroll settles, check and correct, a few times at most.
    let tries = 0;
    let timer = 0;
    const settle = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const top = target.getBoundingClientRect().top;
        if ((top < 0 || top > currentLine()) && tries < 3) {
          tries += 1;
          target.scrollIntoView({ block: "start" });
          return;
        }
        window.removeEventListener("scroll", settle);
      }, 180);
    };
    window.addEventListener("scroll", settle, { passive: true });
    settle();
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", settle);
    };
  }, [open]);

  const goToChapter = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    pendingChapter.current = id;
    close(false);
  };

  const backToTop = () => {
    close(false);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0 });
      pillRef.current?.blur();
    });
  };

  if (!entries.length) return null;
  const active = entries[Math.min(current, entries.length - 1)];
  const position = `${current + 1}/${entries.length}`;

  return (
    <>
      <button
        ref={pillRef}
        type="button"
        className="cs-chapter-pill"
        data-chapter-pill
        data-visible={visible || open ? "" : undefined}
        tabIndex={visible || open ? 0 : -1}
        aria-hidden={visible || open ? undefined : true}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? sheetId : undefined}
        aria-label={`${copy.title}: ${position} ${active.label}`}
        onClick={() => setOpen(true)}
      >
        <span className="cs-chapter-pill-count">{position}</span>
        <span className="cs-chapter-pill-label">{active.label}</span>
        <span className="cs-chapter-pill-caret" aria-hidden="true">▴</span>
      </button>

      {open && mounted
        ? createPortal(
            <>
              <div className="cs-chapter-backdrop" onClick={() => close(true)} aria-hidden="true" />
              <div
                ref={sheetRef}
                id={sheetId}
                className="cs-chapter-sheet"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
              >
                <div className="cs-chapter-sheet-head">
                  <h2 id={titleId}>{copy.title}</h2>
                  <button type="button" className="cs-chapter-sheet-close" aria-label={copy.close} onClick={() => close(true)}>
                    <span aria-hidden="true">✕</span>
                  </button>
                </div>
                <ol>
                  {entries.map((entry, i) => (
                    <li key={entry.id}>
                      <a
                        href={`#${entry.id}`}
                        aria-current={i === current ? "location" : undefined}
                        onClick={(event) => goToChapter(event, entry.id)}
                      >
                        <span className="cs-chapter-sheet-n" aria-hidden="true">
                          {i + 1}
                        </span>
                        {entry.label}
                      </a>
                    </li>
                  ))}
                </ol>
                <div className="cs-chapter-sheet-foot">
                  <button type="button" onClick={backToTop}>
                    ↑ {copy.top}
                  </button>
                  <Link href={next.href}>
                    {copy.next}
                    {isZh ? "：" : ": "}
                    {next.title} →
                  </Link>
                </div>
              </div>
            </>,
            document.body,
          )
        : null}
    </>
  );
}
