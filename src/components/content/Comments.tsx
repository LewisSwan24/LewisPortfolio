"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface CommentsProps {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  lang?: string;
}

export function Comments({ repo, repoId, category, categoryId, lang = "en" }: CommentsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!ref.current) return;

    const scriptElem = document.createElement("script");
    scriptElem.src = "https://giscus.app/client.js";
    scriptElem.async = true;
    scriptElem.crossOrigin = "anonymous";

    scriptElem.setAttribute("data-repo", repo);
    scriptElem.setAttribute("data-repo-id", repoId);
    scriptElem.setAttribute("data-category", category);
    scriptElem.setAttribute("data-category-id", categoryId);
    scriptElem.setAttribute("data-mapping", "pathname");
    scriptElem.setAttribute("data-strict", "0");
    scriptElem.setAttribute("data-reactions-enabled", "1");
    scriptElem.setAttribute("data-emit-metadata", "0");
    scriptElem.setAttribute("data-input-position", "bottom");
    scriptElem.setAttribute("data-theme", resolvedTheme === "dark" ? "dark" : "light");
    scriptElem.setAttribute("data-lang", lang);

    ref.current.appendChild(scriptElem);

    return () => {
      if (ref.current) {
        ref.current.innerHTML = "";
      }
    };
  }, [repo, repoId, category, categoryId, resolvedTheme, lang]);

  return <div ref={ref} className="giscus mt-12 pt-8 border-t border-border" />;
}
