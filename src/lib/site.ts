export const siteConfig = {
  name: "Lewis Dong",
  title: "Graduate Interaction Designer (Full-time) · UX Designer · UX Researcher",
  description:
    "UQ Master of Interaction Design student in Brisbane crafting research-driven experiences through usability testing, AI, prototyping, and accessibility.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  author: {
    name: "Lewis Dong",
    email: "24kplo@gmail.com",
    location: "Brisbane, Australia",
  },
  social: {
    // Add your social media links below (leave empty to hide the icon)
    linkedin: "https://linkedin.com/in/lewis-dong", // TODO: Update with your LinkedIn URL
    github: "https://github.com/LewisSwan24",
    dribbble: "https://dribbble.com/lewisdong", // TODO: Update with your Dribbble URL
  },
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/resume", label: "Resume" },
  ],
  footerLinks: [
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/resume", label: "Resume" },
  ],
  skills: [
    "Interaction Design",
    "UX Research",
    "Prototyping",
    "Usability Testing",
    "Accessibility",
    "AI in UX",
    "Information Architecture",
    "Design Systems",
    "Figma",
    "Wireframing",
    "Journey Mapping",
  ],
};

export type SiteConfig = typeof siteConfig;
