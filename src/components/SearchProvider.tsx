"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { PaletteItem } from "@/components/command/CommandPalette";

const LazyCommandPalette = dynamic(
  () => import("@/components/command/CommandPalette").then((mod) => mod.CommandPalette),
  { ssr: false }
);

interface SearchContextType {
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}

interface SearchProviderProps {
  children: ReactNode;
  locale: "en" | "zh";
}

export function SearchProvider({ children, locale }: SearchProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasActivated, setHasActivated] = useState(false);
  const [items, setItems] = useState<PaletteItem[]>([]);
  const fetchedLocaleRef = useRef<string | null>(null);

  const ensureItemsLoaded = useCallback(() => {
    if (fetchedLocaleRef.current === locale) return;
    fetchedLocaleRef.current = locale;
    fetch(`/search-index/${locale}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data: PaletteItem[]) => {
        if (Array.isArray(data)) setItems(data);
      })
      .catch(() => {
        fetchedLocaleRef.current = null;
      });
  }, [locale]);

  const openSearch = useCallback(() => {
    setHasActivated(true);
    ensureItemsLoaded();
    setIsOpen(true);
  }, [ensureItemsLoaded]);

  const closeSearch = useCallback(() => setIsOpen(false), []);

  const toggleSearch = useCallback(() => {
    setHasActivated(true);
    ensureItemsLoaded();
    setIsOpen((prev) => !prev);
  }, [ensureItemsLoaded]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        toggleSearch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleSearch]);

  return (
    <SearchContext.Provider value={{ isOpen, openSearch, closeSearch, toggleSearch }}>
      {children}
      {hasActivated ? (
        <LazyCommandPalette isOpen={isOpen} onClose={closeSearch} items={items} />
      ) : null}
    </SearchContext.Provider>
  );
}
