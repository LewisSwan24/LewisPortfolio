import { cn } from "@/lib/cn";
import type React from "react";

interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent";
  size?: "sm" | "md";
}

export function Tag({
  children,
  className,
  variant = "default",
  size = "sm",
}: TagProps) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center overflow-hidden rounded-full border font-medium shadow-sm shadow-black/5",
        "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-80",
        size === "sm" && "px-2.5 py-0.5 text-xs",
        size === "md" && "px-3 py-1 text-sm",
        variant === "default" &&
          "border-border/60 bg-muted/50 text-muted-foreground",
        variant === "accent" &&
          "border-accent/20 bg-accent/10 text-accent shadow-accent/10",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </span>
  );
}
