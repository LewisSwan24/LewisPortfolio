"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

function ParallaxLayer({ children, speed = 0.5, className = "" }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

interface ParallaxBackgroundProps {
  className?: string;
}

export function ParallaxBackground({ className = "" }: ParallaxBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden -z-10 ${className}`}>
      {/* Slow moving layer */}
      <ParallaxLayer speed={-0.2}>
        <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[hsl(var(--gradient-start)/0.15)] to-transparent blur-3xl" />
      </ParallaxLayer>

      {/* Medium speed layer */}
      <ParallaxLayer speed={-0.4}>
        <div className="absolute top-1/3 -right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[hsl(var(--gradient-end)/0.12)] to-transparent blur-3xl" />
      </ParallaxLayer>

      {/* Fast moving layer */}
      <ParallaxLayer speed={-0.6}>
        <div className="absolute -bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[hsl(var(--accent)/0.1)] to-transparent blur-3xl" />
      </ParallaxLayer>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}

export { ParallaxLayer };
