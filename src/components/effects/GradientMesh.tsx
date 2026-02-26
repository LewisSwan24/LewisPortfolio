"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface GradientMeshProps {
    /** Array of gradient colors in HSL or hex format */
    colors?: string[];
    /** Animation speed multiplier (1 = default) */
    speed?: number;
    /** Additional CSS classes */
    className?: string;
    /** Intensity of the gradient (0-1) */
    intensity?: number;
}

const defaultColors = [
    "hsl(220, 80%, 60%)",  // Blue
    "hsl(280, 70%, 55%)",  // Purple
    "hsl(200, 90%, 50%)",  // Cyan
    "hsl(340, 65%, 55%)",  // Pink
];

/**
 * GradientMesh — Linear.app-inspired animated gradient background.
 * Uses CSS-animated radial gradients (no motion.ellipse needed).
 * Falls back to a static gradient when prefers-reduced-motion is set.
 */
export function GradientMesh({
    colors = defaultColors,
    speed = 1,
    className,
    intensity = 0.15,
}: GradientMeshProps) {
    const prefersReducedMotion = useReducedMotion();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const baseDuration = 20 / speed;

    // CSS keyframe animations for each orb
    const orbStyles = [
        {
            background: `radial-gradient(circle at center, ${colors[0] || defaultColors[0]}, transparent 70%)`,
            animation: prefersReducedMotion ? "none" : `meshOrb1 ${baseDuration}s ease-in-out infinite alternate`,
            left: "10%",
            top: "15%",
        },
        {
            background: `radial-gradient(circle at center, ${colors[1] || defaultColors[1]}, transparent 70%)`,
            animation: prefersReducedMotion ? "none" : `meshOrb2 ${baseDuration + 2}s ease-in-out infinite alternate`,
            right: "10%",
            top: "5%",
        },
        {
            background: `radial-gradient(circle at center, ${colors[2] || defaultColors[2]}, transparent 70%)`,
            animation: prefersReducedMotion ? "none" : `meshOrb3 ${baseDuration + 4}s ease-in-out infinite alternate`,
            left: "30%",
            bottom: "10%",
        },
        {
            background: `radial-gradient(circle at center, ${colors[3] || defaultColors[3]}, transparent 70%)`,
            animation: prefersReducedMotion ? "none" : `meshOrb4 ${baseDuration + 6}s ease-in-out infinite alternate`,
            right: "15%",
            bottom: "20%",
        },
    ];

    return (
        <div
            className={cn(
                "absolute inset-0 -z-10 overflow-hidden",
                className
            )}
            aria-hidden="true"
        >
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes meshOrb1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(20%, 30%) scale(1.2); }
        }
        @keyframes meshOrb2 {
          0% { transform: translate(0, 0) scale(1.1); }
          100% { transform: translate(-20%, 30%) scale(0.9); }
        }
        @keyframes meshOrb3 {
          0% { transform: translate(0, 0) scale(0.9); }
          100% { transform: translate(20%, -30%) scale(1.1); }
        }
        @keyframes meshOrb4 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-20%, -10%) scale(1.3); }
        }
      `}} />

            {orbStyles.map((style, i) => (
                <div
                    key={i}
                    className="absolute w-[60%] h-[60%] rounded-full blur-3xl"
                    style={{
                        ...style,
                        opacity: intensity,
                    }}
                />
            ))}

            {/* Noise texture overlay for grain effect */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
}
