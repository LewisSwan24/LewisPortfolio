"use client";

import { cn } from "@/lib/cn";

interface SkillData {
    name: string;
    level: number; // 0-100
    category?: "design" | "research" | "technical" | "soft";
}

interface SkillsRadarProps {
    skills: SkillData[];
    className?: string;
    size?: number;
    showLabels?: boolean;
}

const categoryColors = {
    design: "hsl(var(--accent))",
    research: "hsl(280 70% 55%)",
    technical: "hsl(160 70% 45%)",
    soft: "hsl(45 90% 50%)",
};

export function SkillsRadar({
    skills,
    className,
    size = 300,
    showLabels = true,
}: SkillsRadarProps) {
    const center = size / 2;
    const radius = (size / 2) * 0.75;
    const levels = 5; // Number of concentric circles
    const angleStep = (2 * Math.PI) / skills.length;

    // Generate points for the skill polygon
    const skillPoints = skills.map((skill, index) => {
        const angle = index * angleStep - Math.PI / 2; // Start from top
        const distance = (skill.level / 100) * radius;
        return {
            x: center + distance * Math.cos(angle),
            y: center + distance * Math.sin(angle),
            skill,
            angle,
        };
    });

    const polygonPoints = skillPoints.map((p) => `${p.x},${p.y}`).join(" ");

    return (
        <div className={cn("relative", className)}>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="mx-auto"
            >
                {/* Background circles */}
                {Array.from({ length: levels }).map((_, i) => {
                    const r = (radius / levels) * (i + 1);
                    return (
                        <circle
                            key={i}
                            cx={center}
                            cy={center}
                            r={r}
                            fill="none"
                            stroke="hsl(var(--border))"
                            strokeWidth="1"
                            opacity={0.5}
                        />
                    );
                })}

                {/* Axis lines */}
                {skills.map((_, index) => {
                    const angle = index * angleStep - Math.PI / 2;
                    const x2 = center + radius * Math.cos(angle);
                    const y2 = center + radius * Math.sin(angle);
                    return (
                        <line
                            key={index}
                            x1={center}
                            y1={center}
                            x2={x2}
                            y2={y2}
                            stroke="hsl(var(--border))"
                            strokeWidth="1"
                            opacity={0.3}
                        />
                    );
                })}

                {/* Skill polygon with gradient */}
                <defs>
                    <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--gradient-start))" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="hsl(var(--gradient-end))" stopOpacity="0.6" />
                    </linearGradient>
                </defs>
                <polygon
                    points={polygonPoints}
                    fill="url(#skillGradient)"
                    stroke="hsl(var(--accent))"
                    strokeWidth="2"
                    className="transition-all duration-500"
                />

                {/* Skill points */}
                {skillPoints.map((point, index) => (
                    <g key={index}>
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r="6"
                            fill="hsl(var(--accent))"
                            stroke="hsl(var(--background))"
                            strokeWidth="2"
                            className="transition-all duration-300 hover:r-8"
                        />
                        {/* Glow effect on hover */}
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r="10"
                            fill="hsl(var(--accent))"
                            opacity="0"
                            className="transition-opacity duration-300 hover:opacity-30"
                        />
                    </g>
                ))}
            </svg>

            {/* Labels */}
            {showLabels && (
                <div className="absolute inset-0 pointer-events-none">
                    {skillPoints.map((point, index) => {
                        const labelRadius = radius * 1.15;
                        const x = center + labelRadius * Math.cos(point.angle);
                        const y = center + labelRadius * Math.sin(point.angle);

                        // Determine text alignment based on position
                        const isLeft = point.angle > Math.PI / 2 && point.angle < (3 * Math.PI) / 2;
                        const isTop = point.angle < 0 || point.angle > Math.PI;

                        return (
                            <div
                                key={index}
                                className="absolute text-xs font-medium text-muted-foreground whitespace-nowrap"
                                style={{
                                    left: `${(x / size) * 100}%`,
                                    top: `${(y / size) * 100}%`,
                                    transform: `translate(${isLeft ? "-100%" : "0%"}, ${isTop ? "-100%" : "0%"})`,
                                }}
                            >
                                <span className="block">{point.skill.name}</span>
                                <span className="block text-[10px] text-accent">{point.skill.level}%</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// Alternative: Horizontal bar chart for skills
interface SkillsBarsProps {
    skills: SkillData[];
    className?: string;
}

export function SkillsBars({ skills, className }: SkillsBarsProps) {
    return (
        <div className={cn("space-y-4", className)}>
            {skills.map((skill, index) => (
                <div key={skill.name} className="group">
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[var(--text-2)] rounded-full transition-all duration-700 ease-out"
                            style={{
                                width: `${skill.level}%`,
                                animationDelay: `${index * 100}ms`,
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
