/**
 * Animation utilities using CSS
 * Lightweight alternative to Framer Motion
 * Respects prefers-reduced-motion
 */

export const animationClasses = {
    fadeInUp: "animate-fade-in-up",
    fadeIn: "animate-fade-in",
    scaleIn: "animate-scale-in",
    slideInLeft: "animate-slide-in-left",
    hoverScale: "transition-transform hover:scale-105 active:scale-100",
    hoverGlow: "transition-shadow hover:shadow-lg hover:shadow-accent/20",
};

/**
 * Simple animation wrapper components
 */
export function FadeInUp({
    children,
    delay = 0,
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    return (
        <div
            className={`animate-fade-in-up ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

export function HoverScale({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`transition-transform hover:scale-105 active:scale-100 ${className}`}>
            {children}
        </div>
    );
}
