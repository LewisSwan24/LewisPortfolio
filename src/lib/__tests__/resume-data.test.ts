import { describe, it, expect } from "vitest";
import { resumeData } from "../resume-data";

describe("resumeData", () => {
    describe("personal info", () => {
        it("should have required personal fields", () => {
            expect(resumeData.personal.name).toBeTruthy();
            expect(resumeData.personal.title).toBeTruthy();
            expect(resumeData.personal.email).toContain("@");
            expect(resumeData.personal.location).toBeTruthy();
        });
    });

    describe("summary", () => {
        it("should have a non-empty summary", () => {
            expect(resumeData.summary).toBeTruthy();
            expect(resumeData.summary.length).toBeGreaterThan(50);
        });
    });

    describe("education", () => {
        it("should have at least one education entry", () => {
            expect(resumeData.education.length).toBeGreaterThan(0);
        });

        it("should have valid education entries", () => {
            resumeData.education.forEach((edu) => {
                expect(edu.degree).toBeTruthy();
                expect(edu.institution).toBeTruthy();
                expect(edu.location).toBeTruthy();
                expect(edu.period).toBeTruthy();
            });
        });
    });

    describe("experience", () => {
        it("should have at least one experience entry", () => {
            expect(resumeData.experience.length).toBeGreaterThan(0);
        });

        it("should have valid experience entries with achievements", () => {
            resumeData.experience.forEach((exp) => {
                expect(exp.title).toBeTruthy();
                expect(exp.company).toBeTruthy();
                expect(exp.period).toBeTruthy();
                expect(exp.description).toBeTruthy();
                expect(exp.achievements.length).toBeGreaterThan(0);
            });
        });
    });

    describe("skills", () => {
        it("should have at least one skill category", () => {
            const categories = Object.keys(resumeData.skills);
            expect(categories.length).toBeGreaterThan(0);
        });

        it("should have non-empty skill arrays", () => {
            Object.values(resumeData.skills).forEach((skillList) => {
                expect(skillList.length).toBeGreaterThan(0);
                skillList.forEach((skill) => {
                    expect(typeof skill).toBe("string");
                    expect(skill.length).toBeGreaterThan(0);
                });
            });
        });
    });

    describe("certifications", () => {
        it("should have valid certifications if present", () => {
            if (resumeData.certifications) {
                resumeData.certifications.forEach((cert) => {
                    expect(cert.name).toBeTruthy();
                    expect(cert.issuer).toBeTruthy();
                    expect(cert.date).toBeTruthy();
                });
            }
        });
    });

    describe("awards", () => {
        it("should have valid awards if present", () => {
            if (resumeData.awards) {
                resumeData.awards.forEach((award) => {
                    expect(award.title).toBeTruthy();
                    expect(award.issuer).toBeTruthy();
                    expect(award.date).toBeTruthy();
                });
            }
        });
    });
});
