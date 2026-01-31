"use client";

import { ScrollReveal } from "./motion/ScrollReveal";
import { type ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  return (
    <ScrollReveal className={className} delay={delay} direction={direction}>
      {children}
    </ScrollReveal>
  );
}
