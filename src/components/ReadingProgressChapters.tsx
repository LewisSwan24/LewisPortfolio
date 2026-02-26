'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

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
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));

      // Update active chapter
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

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, [chapters]);

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50">
        <div 
          className="h-full bg-accent transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Chapter markers (desktop only) */}
      {chapters && chapters.length > 0 && (
        <div className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
          <div className="flex flex-col gap-3">
            {chapters.map((chapter) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                className={cn(
                  "group flex items-center gap-3 text-sm transition-colors",
                  activeChapter === chapter.id 
                    ? "text-accent" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(chapter.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span 
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    activeChapter === chapter.id 
                      ? "bg-accent scale-125" 
                      : "bg-muted-foreground/30 group-hover:bg-muted-foreground"
                  )}
                />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {chapter.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
