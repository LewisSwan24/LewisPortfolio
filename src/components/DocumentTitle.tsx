"use client";

import { useEffect } from "react";

/**
 * Sets the tab title after hydration. On 404 pages the server HTML carries the
 * right title (generateMetadata in not-found.tsx), but in a browser Next's
 * client metadata swapped it back to the site default (v7.0 R31, measured in
 * Chromium on next start).
 */
export function DocumentTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
}
