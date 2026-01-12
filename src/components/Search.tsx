"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { cn } from "@/lib/cn";

interface SearchItem {
  type: "project" | "blog";
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

interface SearchProps {
  items: SearchItem[];
  placeholder?: string;
  className?: string;
}

export function Search({ items, placeholder = "Search...", className }: SearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const fuse = new Fuse(items, {
    keys: ["title", "description", "tags"],
    threshold: 0.3,
    includeScore: true,
  });

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
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }
      if (event.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    router.push(path);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyNavigation}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-xl border border-border/60 bg-background/40 backdrop-blur-md",
            "pl-10 pr-12 py-2.5 text-sm text-foreground placeholder:text-muted-foreground",
            "shadow-sm shadow-black/5",
            "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20",
            "transition-all duration-200"
          )}
          aria-label="Search"
          aria-expanded={isOpen && results.length > 0}
          aria-controls="search-results"
          role="combobox"
          aria-autocomplete="list"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
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
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 rounded border border-border/60 bg-muted/50 px-1.5 py-0.5 text-xs text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      {isOpen && results.length > 0 && (
        <div
          id="search-results"
          role="listbox"
          className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-xl shadow-black/10 overflow-hidden"
        >
          <ul className="py-2">
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
                        "inline-flex items-center justify-center w-6 h-6 rounded text-xs font-medium",
                        result.type === "project"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : "bg-green-500/10 text-green-600 dark:text-green-400"
                      )}
                    >
                      {result.type === "project" ? "P" : "B"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {result.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {result.description}
                      </p>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-xl shadow-black/10 p-8 text-center">
          <p className="text-sm text-muted-foreground">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
}

export function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-xl border border-border/60 bg-background/40 backdrop-blur-md",
        "px-3 py-2 text-sm text-muted-foreground",
        "shadow-sm shadow-black/5",
        "hover:border-border hover:bg-muted/40",
        "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background",
        "transition-all duration-200"
      )}
      aria-label="Open search"
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
      <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border/60 bg-muted/50 px-1.5 py-0.5 text-xs">
        <span>⌘</span>K
      </kbd>
    </button>
  );
}
