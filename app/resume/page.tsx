import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/site";
import { getCurrentDictionary } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "Resume",
  description: `View and download ${siteConfig.name}'s resume.`,
};

export default function ResumePage() {
  const { dict } = getCurrentDictionary();
  const cardTitle = dict.resume.cardTitle.replace("{name}", siteConfig.name);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <SectionHeading
            as="h1"
            title={dict.resume.title}
            description={dict.resume.description}
          />

          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-accent"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" x2="8" y1="13" y2="13" />
                <line x1="16" x2="8" y1="17" y2="17" />
                <line x1="10" x2="8" y1="9" y2="9" />
              </svg>
            </div>

            <h2 className="mb-2 text-xl font-semibold text-foreground">
              {cardTitle}
            </h2>
            <p className="mb-6 text-muted-foreground">
              {dict.resume.cardMeta}
            </p>

            <Button href="/resume.pdf" download>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              {dict.resume.downloadPdf}
            </Button>
          </div>

          {/* Quick Overview */}
          <div className="mt-12 space-y-8">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                {dict.resume.overview.education}
              </h3>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="font-medium text-foreground">
                  {dict.resume.education.degree}
                </p>
                <p className="text-sm text-muted-foreground">
                  {dict.resume.education.institutionAndYears}
                </p>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                {dict.resume.overview.experienceHighlights}
              </h3>
              <div className="space-y-3">
                {dict.resume.experience.map((item) => (
                  <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                    <p className="font-medium text-foreground">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.orgAndYear}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
 }
