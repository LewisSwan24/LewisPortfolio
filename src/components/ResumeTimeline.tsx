import { cn } from "@/lib/cn";
import type { ResumeData } from "@/lib/resume-data";

interface ResumeTimelineProps {
    data: ResumeData;
}

export function ResumeTimeline({ data }: ResumeTimelineProps) {
    return (
        <div className="space-y-16">
            {/* Education */}
            <section>
                <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </span>
                    Education
                </h2>
                <div className="space-y-6">
                    {data.education.map((edu, index) => (
                        <div
                            key={index}
                            className="relative pl-8 pb-8 border-l-2 border-border last:pb-0 last:border-l-0"
                        >
                            {/* Timeline dot */}
                            <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full border-2 border-accent bg-background" />

                            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 hover:border-accent/50 transition-colors">
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
                                        <p className="text-accent font-medium">{edu.institution}</p>
                                    </div>
                                    <div className="text-right text-sm text-muted-foreground">
                                        <p>{edu.period}</p>
                                        <p>{edu.location}</p>
                                    </div>
                                </div>
                                {edu.description && (
                                    <p className="text-muted-foreground mb-3">{edu.description}</p>
                                )}
                                {edu.highlights && edu.highlights.length > 0 && (
                                    <ul className="space-y-2">
                                        {edu.highlights.map((highlight, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <svg className="h-4 w-4 mt-0.5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience */}
            <section>
                <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </span>
                    Experience
                </h2>
                <div className="space-y-6">
                    {data.experience.map((exp, index) => (
                        <div
                            key={index}
                            className="relative pl-8 pb-8 border-l-2 border-border last:pb-0 last:border-l-0"
                        >
                            <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full border-2 border-accent bg-background" />

                            <div className="rounded-2xl border border-border/50 bg-card/50 p-6 hover:border-accent/50 transition-colors">
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                                        <p className="text-accent font-medium">{exp.company}</p>
                                    </div>
                                    <div className="text-right text-sm text-muted-foreground">
                                        <p>{exp.period}</p>
                                        <p>{exp.location}</p>
                                    </div>
                                </div>
                                <p className="text-muted-foreground mb-4">{exp.description}</p>
                                {exp.achievements && exp.achievements.length > 0 && (
                                    <ul className="space-y-2">
                                        {exp.achievements.map((achievement, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <svg className="h-4 w-4 mt-0.5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills */}
            <section>
                <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                    </span>
                    Skills
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {Object.entries(data.skills).map(([category, skills]) => (
                        <div
                            key={category}
                            className="rounded-2xl border border-border/50 bg-card/50 p-6"
                        >
                            <h3 className="text-lg font-semibold text-foreground mb-4">{category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className={cn(
                                            "inline-flex items-center px-3 py-1.5 rounded-full text-sm",
                                            "bg-accent/10 text-accent border border-accent/20",
                                            "hover:bg-accent/20 transition-colors cursor-default"
                                        )}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Certifications (if any) */}
            {data.certifications && data.certifications.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        </span>
                        Certifications
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {data.certifications.map((cert, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-border/50 bg-card/50 p-4 hover:border-accent/50 transition-colors"
                            >
                                <h3 className="font-semibold text-foreground">{cert.name}</h3>
                                <p className="text-sm text-accent mt-1">{cert.issuer}</p>
                                <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Awards (if any) */}
            {data.awards && data.awards.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </span>
                        Awards & Recognition
                    </h2>
                    <div className="space-y-4">
                        {data.awards.map((award, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-border/50 bg-card/50 p-4 hover:border-accent/50 transition-colors"
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <h3 className="font-semibold text-foreground">{award.title}</h3>
                                        <p className="text-sm text-accent mt-1">{award.issuer}</p>
                                        {award.description && (
                                            <p className="text-sm text-muted-foreground mt-2">{award.description}</p>
                                        )}
                                    </div>
                                    <span className="text-xs text-muted-foreground shrink-0">{award.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
