"use client";

export interface ViewTransitionNavigateOptions {
  href: string;
  triggerEl: HTMLElement | null;
  navigate: (href: string) => void;
}

interface ViewTransitionLike {
  finished: Promise<void>;
}

type DocumentWithViewTransition = Document & {
  startViewTransition?: (updateCallback: () => void | Promise<void>) => ViewTransitionLike;
};

export function clearActiveViewTransitions(doc: Document = document): void {
  doc.querySelectorAll(".vt-active-media").forEach((el) => {
    el.classList.remove("vt-active-media");
  });
  doc.querySelectorAll(".vt-active-title").forEach((el) => {
    el.classList.remove("vt-active-title");
  });
}

export function markTransitionPair(triggerEl: HTMLElement | null): void {
  if (!triggerEl) return;
  const media = triggerEl.querySelector<HTMLElement>("[data-vt-media]");
  const title = triggerEl.querySelector<HTMLElement>("[data-vt-title]");
  media?.classList.add("vt-active-media");
  title?.classList.add("vt-active-title");
}

export function focusRouteHeading(doc: Document = document): void {
  const heading = doc.querySelector<HTMLElement>('main h1[tabindex="-1"], main h1');
  if (!heading) return;
  if (!heading.hasAttribute("tabindex")) {
    heading.setAttribute("tabindex", "-1");
  }
  heading.focus({ preventScroll: true });
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function navigateWithViewTransition({
  href,
  triggerEl,
  navigate,
}: ViewTransitionNavigateOptions): void {
  if (typeof document === "undefined") {
    navigate(href);
    return;
  }

  const doc = document as DocumentWithViewTransition;
  if (prefersReducedMotion() || typeof doc.startViewTransition !== "function") {
    clearActiveViewTransitions(doc);
    navigate(href);
    window.requestAnimationFrame(() => focusRouteHeading(doc));
    return;
  }

  clearActiveViewTransitions(doc);
  markTransitionPair(triggerEl);

  try {
    const transition = doc.startViewTransition(() => {
      navigate(href);
    });
    void transition.finished.finally(() => {
      clearActiveViewTransitions(doc);
      window.requestAnimationFrame(() => focusRouteHeading(doc));
    });
  } catch {
    clearActiveViewTransitions(doc);
    navigate(href);
    window.requestAnimationFrame(() => focusRouteHeading(doc));
  }
}
