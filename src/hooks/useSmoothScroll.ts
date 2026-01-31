"use client";

import { useCallback } from "react";

interface SmoothScrollOptions {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
}

// Easing function: easeInOutCubic
const defaultEasing = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export function useSmoothScroll(options: SmoothScrollOptions = {}) {
  const { offset = 80, duration = 800, easing = defaultEasing } = options;

  const scrollToElement = useCallback(
    (elementId: string) => {
      const element = document.getElementById(elementId);
      if (!element) return;

      const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easing(progress);

        window.scrollTo(0, startPosition + distance * easedProgress);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          // Update URL hash without jumping
          history.pushState(null, "", `#${elementId}`);
        }
      };

      requestAnimationFrame(animation);
    },
    [offset, duration, easing]
  );

  const scrollToTop = useCallback(() => {
    const startPosition = window.scrollY;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easing(progress);

      window.scrollTo(0, startPosition * (1 - easedProgress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, [duration, easing]);

  return { scrollToElement, scrollToTop };
}
