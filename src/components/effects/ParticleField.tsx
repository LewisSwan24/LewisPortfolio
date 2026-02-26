"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { cn } from "@/lib/cn";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
}

interface ParticleFieldProps {
    /** Number of particles */
    count?: number;
    /** Particle color (CSS color string) */
    color?: string;
    /** Maximum connection line distance */
    connectionDistance?: number;
    /** Mouse attraction radius */
    mouseRadius?: number;
    /** Additional CSS classes */
    className?: string;
    /** Speed multiplier */
    speed?: number;
}

/**
 * ParticleField — Canvas-based particle system with mouse attraction.
 * Renders interconnected particles that drift and react to cursor movement.
 * Respects prefers-reduced-motion by hiding entirely.
 */
export function ParticleField({
    count = 50,
    color = "hsl(var(--accent))",
    connectionDistance = 120,
    mouseRadius = 150,
    className,
    speed = 0.3,
}: ParticleFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const rafRef = useRef<number>(0);
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    const initParticles = useCallback(
        (width: number, height: number) => {
            const particles: Particle[] = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * speed,
                    vy: (Math.random() - 0.5) * speed,
                    radius: Math.random() * 1.5 + 0.5,
                    opacity: Math.random() * 0.5 + 0.2,
                });
            }
            particlesRef.current = particles;
        },
        [count, speed]
    );

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setIsReducedMotion(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        if (isReducedMotion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            initParticles(rect.width, rect.height);
        };

        resize();
        window.addEventListener("resize", resize);

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };

        const onMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mouseleave", onMouseLeave);

        // Parse CSS color to get a usable color string
        const computedColor = getComputedStyle(document.documentElement)
            .getPropertyValue("--accent")
            .trim();
        const particleColor = computedColor
            ? `hsl(${computedColor})`
            : color;

        const animate = () => {
            const rect = canvas.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;
            ctx.clearRect(0, 0, w, h);
            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            // Update & draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Mouse attraction
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouseRadius && dist > 0) {
                    const force = (mouseRadius - dist) / mouseRadius;
                    p.vx += (dx / dist) * force * 0.015;
                    p.vy += (dy / dist) * force * 0.015;
                }

                // Damping
                p.vx *= 0.99;
                p.vy *= 0.99;

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = particleColor;
                ctx.globalAlpha = p.opacity;
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const cdx = p.x - p2.x;
                    const cdy = p.y - p2.y;
                    const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
                    if (cdist < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = particleColor;
                        ctx.globalAlpha = (1 - cdist / connectionDistance) * 0.15;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            ctx.globalAlpha = 1;
            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", onMouseMove);
            canvas.removeEventListener("mouseleave", onMouseLeave);
        };
    }, [isReducedMotion, initParticles, color, connectionDistance, mouseRadius]);

    if (isReducedMotion) return null;

    return (
        <canvas
            ref={canvasRef}
            className={cn("absolute inset-0 -z-10 pointer-events-auto", className)}
            aria-hidden="true"
        />
    );
}
