export interface ResumeData {
    personal: {
        name: string;
        title: string;
        email: string;
        location: string;
        linkedin?: string;
        github?: string;
        website?: string;
    };
    summary: string;
    education: Array<{
        degree: string;
        institution: string;
        location: string;
        period: string;
        description?: string;
        highlights?: string[];
    }>;
    experience: Array<{
        title: string;
        company: string;
        location: string;
        period: string;
        description: string;
        achievements: string[];
    }>;
    skills: {
        [category: string]: string[];
    };
    certifications?: Array<{
        name: string;
        issuer: string;
        date: string;
    }>;
    awards?: Array<{
        title: string;
        issuer: string;
        date: string;
        description?: string;
    }>;
}

export const resumeData: ResumeData = {
    personal: {
        name: "Lewis Dong",
        title: "Graduate Interaction Designer · UX Designer · UX Researcher",
        email: "24kplo@gmail.com",
        location: "Brisbane, Australia",
        github: "https://github.com/LewisSwan24",
        website: "https://portfolio-j4imt7s0v-lewisswan24s-projects.vercel.app",
    },

    summary:
        "Passionate Interaction Design graduate student at The University of Queensland with a strong foundation in user research, prototyping, and human-centered design. Experienced in conducting usability testing, creating accessible interfaces, and leveraging AI in UX workflows. Seeking full-time opportunities to create meaningful digital experiences that prioritize user needs and accessibility.",

    education: [
        {
            degree: "Master of Interaction Design",
            institution: "The University of Queensland",
            location: "Brisbane, Australia",
            period: "2023 – Present",
            description: "Advanced study in human-computer interaction, UX research, and design thinking",
            highlights: [
                "GPA: 6.5/7.0 (Distinction)",
                "Relevant coursework: User Research, Prototyping, Accessibility, Design Systems",
                "Participated in UQ Design Showcase 2024",
            ],
        },
        {
            degree: "Bachelor of Information Technology",
            institution: "Queensland University of Technology",
            location: "Brisbane, Australia",
            period: "2019 – 2022",
            highlights: [
                "Developed strong analytical and problem-solving skills",
                "Completed projects involving user-centered design principles",
            ],
        },
    ],

    experience: [
        {
            title: "UX Design Intern",
            company: "Design Studio Co.",
            location: "Brisbane, Australia",
            period: "2024",
            description: "Contributed to user research and interface design for client-facing web applications",
            achievements: [
                "Conducted 15+ user interviews and synthesized findings into actionable insights",
                "Designed high-fidelity prototypes in Figma, improving task completion rate by 25%",
                "Collaborated with developers to implement accessible UI components",
            ],
        },
        {
            title: "Freelance Designer",
            company: "Self-employed",
            location: "Remote",
            period: "2022 – 2023",
            description: "Provided UX/UI design services for small businesses and startups",
            achievements: [
                "Delivered 10+ design projects including websites and mobile apps",
                "Improved client website conversion rates by an average of 30%",
                "Managed full design process from research to final implementation",
            ],
        },
    ],

    skills: {
        "Design Tools": [
            "Figma",
            "Adobe XD",
            "Sketch",
            "Framer",
            "Photoshop",
            "Illustrator",
        ],
        "Research & Testing": [
            "Usability Testing",
            "User Interviews",
            "Survey Design",
            "A/B Testing",
            "Heuristic Evaluation",
            "Card Sorting",
        ],
        "Development": [
            "HTML/CSS",
            "JavaScript",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Next.js",
            "Git",
        ],
        "Methodologies": [
            "Design Thinking",
            "Agile/Scrum",
            "Lean UX",
            "Accessibility (WCAG)",
            "Information Architecture",
            "Journey Mapping",
        ],
        "Tools & Platforms": [
            "Miro",
            "Notion",
            "Maze",
            "Hotjar",
            "Optimal Workshop",
            "UserTesting",
        ],
    },

    certifications: [
        {
            name: "Google UX Design Professional Certificate",
            issuer: "Coursera",
            date: "2023",
        },
        {
            name: "Accessibility Fundamentals",
            issuer: "Deque University",
            date: "2024",
        },
    ],

    awards: [
        {
            title: "UQ Design Showcase 2024 Selection",
            issuer: "The University of Queensland",
            date: "2024",
            description: "Spectra Lens project selected for university design showcase",
        },
    ],
};
