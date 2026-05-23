"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Fuse from "fuse.js";
import { cn } from "@/lib/cn";

interface SearchItem {
  type: "project" | "blog";
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: SearchItem[];
  placeholder?: string;
  noResultsText?: string;
}

export function SearchModal({
  isOpen,
  onClose,
  items,
  placeholder = "Search projects and blog posts...",
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["title", "description", "tags"],
        threshold: 0.3,
        includeScore: true,
      }),
    [items]
  );

  const handleSearch = useCallback(
    (searchQuery: string) => {
      if (searchQuery.trim() === "") {
        setResults([]);
        return;
      }
      const searchResults = fuse.search(searchQuery).map((result) => result.item);
      setResults(searchResults.slice(0, 8));
      setSelectedIndex(0);
    },
    [fuse]
  );

  useEffect(() => {
    handleSearch(query);
  }, [query, handleSearch]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleKeyNavigation = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "Enter" && results[selectedIndex]) {
      event.preventDefault();
      navigateToResult(results[selectedIndex]);
    }
  };

  const navigateToResult = (item: SearchItem) => {
    const path = item.type === "project" ? `/projects/${item.slug}` : `/blog/${item.slug}`;
    onClose();
    window.location.href = path;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl mx-4 rounded-2xl border border-border/60 bg-background shadow-2xl shadow-black/20 overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center border-b border-border/50 px-4">
          <svg
            className="h-5 w-5 text-muted-foreground shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyNavigation}
            placeholder={placeholder}
            className="flex-1 bg-transparent px-4 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
            aria-label="Search"
            aria-expanded={results.length > 0}
            aria-controls="search-modal-results"
            role="combobox"
            aria-autocomplete="list"
          />
          <kbd className="hidden sm:inline-flex items-center rounded border border-border/60 bg-muted/50 px-2 py-1 text-xs text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul
            id="search-modal-results"
            role="listbox"
            className="max-h-[50vh] overflow-y-auto py-2"
          >
            {results.map((result, index) => (
              <li key={`${result.type}-${result.slug}`}>
                <button
                  role="option"
                  aria-selected={index === selectedIndex}
                  onClick={() => navigateToResult(result)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    "w-full px-4 py-3 text-left transition-colors",
                    "focus:outline-none",
                    index === selectedIndex ? "bg-accent/10" : "hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-medium",
                        result.type === "project"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : "bg-green-500/10 text-green-600 dark:text-green-400"
                      )}
                    >
                      {result.type === "project" ? (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      ) : (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {result.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {result.description}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground capitalize">
                      {result.type}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* No Results */}
        {query && results.length === 0 && (
          <div className="p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-muted-foreground">
              No results found for &quot;<span className="font-medium">{query}</span>&quot;
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Try searching for project names or blog topics
            </p>
          </div>
        )}

        {/* Empty State */}
        {!query && (
          <div className="p-6 text-center text-sm text-muted-foreground">
            <p>Type to search projects and blog posts</p>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border/60 bg-muted/50 px-1.5 py-0.5">↑</kbd>
                <kbd className="rounded border border-border/60 bg-muted/50 px-1.5 py-0.5">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border/60 bg-muted/50 px-1.5 py-0.5">↵</kbd>
                to select
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
