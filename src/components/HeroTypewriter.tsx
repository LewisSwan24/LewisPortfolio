"use client";

import { Typewriter } from "./Typewriter";

interface HeroTypewriterProps {
  text: string;
  className?: string;
}

export function HeroTypewriter({ text, className }: HeroTypewriterProps) {
  return <Typewriter text={text} delay={80} className={className} />;
}
