"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface VisitorCounterProps {
  className?: string;
}

export function VisitorCounter({ className = "" }: VisitorCounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching visitor count
    // In production, replace with actual API call
    const fetchCount = async () => {
      try {
        // Simulated count - replace with actual analytics API
        const storedCount = localStorage.getItem("visitor_count");
        const currentCount = storedCount ? parseInt(storedCount) : 1000;
        
        // Increment on first visit per session
        const hasVisited = sessionStorage.getItem("has_visited");
        if (!hasVisited) {
          const newCount = currentCount + 1;
          localStorage.setItem("visitor_count", newCount.toString());
          sessionStorage.setItem("has_visited", "true");
          setCount(newCount);
        } else {
          setCount(currentCount);
        }
      } catch {
        setCount(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();
  }, []);

  if (isLoading) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <div className="w-4 h-4 rounded-full bg-muted animate-pulse" />
        <div className="w-16 h-4 rounded bg-muted animate-pulse" />
      </div>
    );
  }

  if (count === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`inline-flex items-center gap-2 text-sm text-muted-foreground ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>
      <span>
        <span className="font-medium text-foreground">{count.toLocaleString()}</span> visitors
      </span>
    </motion.div>
  );
}
