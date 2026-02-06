import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ResumeTimeline } from "@/components/content/ResumeTimeline";
import { siteConfig } from "@/lib/site";
import { resumeData } from "@/lib/resume-data";
import { getCurrentDictionary } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "Resume",
  description: `View and download ${siteConfig.name}'s resume.`,
};

export default function ResumePage() {
  const { dict } = getCurrentDictionary();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            as="h1"
            title={dict.resume.title}
            description={dict.resume.description}
          />

          {/* Personal Info Card */}
          <div className="rounded-2xl border border-border/50 bg-card/50 p-8 mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  {resumeData.personal.name}
                </h2>
                <p className="text-lg text-accent mb-4">
                  {resumeData.personal.title}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <a href={`mailto:${resumeData.personal.email}`} className="hover:text-accent transition-colors">
                    📧 {resumeData.personal.email}
                  </a>
                  <span>📍 {resumeData.personal.location}</span>
                </div>
                <div className="flex gap-3 mt-4">
                  {resumeData.personal.github && (
                    <a
                      href={resumeData.personal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                  {resumeData.personal.website && (
                    <a
                      href={resumeData.personal.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      Website
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button href="/resume.pdf" download>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {dict.resume.downloadPdfShort}
                </Button>
                <Button href="/contact" variant="secondary">
                  {dict.resume.getInTouch}
                </Button>
              </div>
            </div>

            {/* Summary */}
            {resumeData.summary && (
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-muted-foreground leading-relaxed">
                  {resumeData.summary}
                </p>
              </div>
            )}
          </div>

          {/* Resume Timeline */}
          <ResumeTimeline data={resumeData} dict={dict} />

          {/* Print Hint */}
          <div className="mt-12 rounded-xl border border-border/50 bg-muted/30 p-6 text-center print:hidden">
            <p className="text-sm text-muted-foreground">
              💡 {dict.resume.printHint}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
