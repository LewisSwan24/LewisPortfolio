"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SearchModal } from "./SearchModal";

interface SearchItem {
  type: "project" | "blog";
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

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
  items: SearchItem[];
}

export function SearchProvider({ children, items }: SearchProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openSearch = () => setIsOpen(true);
  const closeSearch = () => setIsOpen(false);
  const toggleSearch = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        toggleSearch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SearchContext.Provider value={{ isOpen, openSearch, closeSearch, toggleSearch }}>
      {children}
      <SearchModal isOpen={isOpen} onClose={closeSearch} items={items} />
    </SearchContext.Provider>
  );
}

export function SearchTrigger({ className }: { className?: string }) {
  const { openSearch } = useSearch();

  return (
    <button
      onClick={openSearch}
      className={`flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 backdrop-blur-md px-3 py-2 text-sm text-muted-foreground shadow-sm shadow-black/5 hover:border-border hover:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 ${className || ""}`}
      aria-label="Open search (⌘K)"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <span className="hidden sm:inline">Search</span>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border/60 bg-muted/50 px-1.5 py-0.5 text-xs">
        <span className="text-[10px]">⌘</span>K
      </kbd>
    </button>
  );
}
