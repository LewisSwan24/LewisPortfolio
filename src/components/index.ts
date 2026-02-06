// UI Components
export { Container } from "./ui/Container";
export { Button } from "./ui/Button";
export { Tag } from "./ui/Tag";
export { Card } from "./ui/Card";
export { SectionHeading } from "./ui/SectionHeading";
export { Prose } from "./ui/Prose";
export { ViewToggle } from "./ui/ViewToggle";

// Layout Components
export { Navbar } from "./layout/Navbar";
export { Footer } from "./layout/Footer";
export { SkipLink, VisuallyHidden, LiveRegion } from "./layout/SkipLink";
export { MobileMenu } from "./layout/MobileMenu";
export { Breadcrumb } from "./layout/Breadcrumb";

// Navigation Components
export { BackToTop } from "./navigation/BackToTop";
export { Search, SearchButton } from "./navigation/Search";
export { SearchModal } from "./navigation/SearchModal";
export { SearchProvider, SearchTrigger, useSearch } from "./navigation/SearchProvider";
export { PageLoader } from "./navigation/PageLoader";

// Content Components
export { TOC } from "./content/TOC";
export { Comments } from "./content/Comments";
export { ContactForm } from "./content/ContactForm";
export { CodeBlock } from "./content/CodeBlock";
export { NewsletterSignup } from "./content/NewsletterSignup";
export { RelatedPosts } from "./content/RelatedPosts";
export { RelatedProjects } from "./content/RelatedProjects";
export { ShareButtons } from "./content/ShareButtons";
export { ProjectTimeline } from "./content/ProjectTimeline";
export { ReadingProgress } from "./content/ReadingProgress";
export { ReadingProgressChapters } from "./content/ReadingProgressChapters";
export { ResumeTimeline } from "./content/ResumeTimeline";
export { getMdxComponents } from "./content/mdx-components";
export { ImageGallery } from "./content/ImageGallery";
export { BlogListWithFilters } from "./content/BlogListWithFilters";

// Effects Components
export { AnimatedSection } from "./effects/AnimatedSection";
export { ParallaxBackground, ParallaxLayer } from "./effects/ParallaxBackground";
export { CustomCursor } from "./effects/CustomCursor";
export { MagneticButton } from "./effects/MagneticButton";
export { TiltCard } from "./effects/TiltCard";
export { Typewriter } from "./effects/Typewriter";
export { PageTransition, FadeIn, SlideUp, StaggerChildren } from "./effects/PageTransition";
export { PageTransitionWrapper } from "./effects/PageTransitionWrapper";
export { HeroTypewriter } from "./effects/HeroTypewriter";

// Motion Components
export * from "./motion";
export { ScrollReveal } from "./motion/ScrollReveal";

// Provider Components
export { ThemeProvider } from "./providers/ThemeProvider";
export { ThemeToggle } from "./providers/ThemeToggle";
export { ErrorBoundary } from "./providers/ErrorBoundary";
export { KeyboardShortcutsModal } from "./providers/KeyboardShortcutsModal";
export { PerformanceMonitor } from "./providers/PerformanceMonitor";
export { AutoThemeSwitch } from "./providers/AutoThemeSwitch";
export { LanguageToggle } from "./providers/LanguageToggle";
export { ToastProvider, useToast } from "./providers/Toast";

// SEO Components
export { DynamicSkillsVisualization } from "./seo/DynamicImports";
export { SkillsRadar } from "./seo/SkillsVisualization";
export { ViewCounter } from "./seo/ViewCounter";
export { VisitorCounter } from "./seo/VisitorCounter";
export { SeriesNavigation } from "./seo/SeriesNavigation";
