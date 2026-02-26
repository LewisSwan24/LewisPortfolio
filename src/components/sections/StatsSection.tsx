"use client";

import { motion } from "framer-motion";
import { sectionStagger, counterSpring } from "@/lib/animation-presets";
import { CountUp } from "@/components/effects/CountUp";
import { Container } from "@/components/ui/Container";

interface StatItem {
    number: number;
    suffix: string;
    label: string;
}

interface StatsSectionProps {
    stats: StatItem[];
}

/**
 * Stats section with spring-animated counter numbers.
 */
export function StatsSection({ stats }: StatsSectionProps) {
    return (
        <section className="py-24">
            <Container>
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={sectionStagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.label}
                            variants={counterSpring}
                            className="text-center p-6 rounded-2xl border border-border bg-card/50 hover:border-accent/50 transition-colors"
                        >
                            <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
                                <CountUp end={stat.number} suffix={stat.suffix} duration={2000} />
                            </div>
                            <div className="text-sm text-muted-foreground uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </section>
    );
}
