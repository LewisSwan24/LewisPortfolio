"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";

interface ChapterMarker {
  id: string;
  title: string;
  level: number;
}

interface ReadingProgressProps {
  chapters?: ChapterMarker[];
}

export function ReadingProgressChapters({ chapters }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState<string | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setProgress(scrollRatio);

      if (chapters && chapters.length > 0) {
        const viewportMiddle = scrollTop + window.innerHeight / 2;
        for (let i = chapters.length - 1; i >= 0; i--) {
          const element = document.getElementById(chapters[i].id);
          if (element && element.offsetTop <= viewportMiddle) {
            setActiveChapter(chapters[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, [chapters]);

  const progressStyle: CSSProperties = {
    transform: `scaleX(${progress})`,
    transformOrigin: "0 50%",
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none" aria-hidden="true">
        <div
          className="h-full w-full bg-accent reading-progress-fill"
          style={progressStyle}
        />
      </div>

      {chapters && chapters.length > 0 && (
        <nav
          aria-label="Article chapters"
          className="hidden xl:block fixed right-6 top-1/2 -translate-y-1/2 z-40"
        >
          <div className="flex flex-col gap-1.5">
            {chapters.map((chapter) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                aria-label={chapter.title}
                className={cn(
                  "group flex items-center justify-end gap-2.5 text-sm transition-colors min-w-6 min-h-6",
                  activeChapter === chapter.id
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  const reduced =
                    typeof window !== "undefined" &&
                    typeof window.matchMedia === "function" &&
                    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                  document.getElementById(chapter.id)?.scrollIntoView({
                    behavior: reduced ? "auto" : "smooth",
                  });
                }}
              >
                <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity whitespace-nowrap">
                  {chapter.title}
                </span>
                <span className="inline-flex items-center justify-center min-w-6 min-h-6">
                  <span
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-transform",
                      activeChapter === chapter.id
                        ? "bg-accent scale-125"
                        : "bg-muted-foreground/35 group-hover:bg-muted-foreground"
                    )}
                  />
                </span>
              </a>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}
