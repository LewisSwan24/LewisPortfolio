"use client";

import { useEffect } from "react";

/**
 * The interviewer appendix is a closed <details>. A link that lands on a
 * section inside it (#red-team-defense, #research-vault …) opens it first.
 * Old section ids from the long-form layout are mapped to where that
 * content lives now, so links from other pages still land.
 */
export function CaseAppendixHashOpener({
  aliases,
}: {
  aliases: Readonly<Record<string, string>>;
}) {
  useEffect(() => {
    const reveal = () => {
      const raw = decodeURIComponent(window.location.hash.slice(1));
      if (!raw) return;
      const id = document.getElementById(raw) ? raw : aliases[raw];
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      const appendix = target.closest("details");
      if (appendix && !appendix.open) appendix.open = true;
      if (appendix || id !== raw) {
        requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
      }
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, [aliases]);

  return null;
}
