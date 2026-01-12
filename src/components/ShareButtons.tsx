import Link from "next/link";
import { cn } from "@/lib/cn";

interface ShareButtonsProps {
    url: string;
    title: string;
    description: string;
}

const shareLinks = {
    twitter: (url: string, title: string) =>
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: (url: string) =>
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: (url: string) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    email: (url: string, title: string, description: string) =>
        `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + "\n\n" + url)}`,
};

/**
 * Social sharing buttons component
 */
export function ShareButtons({ url, title, description }: ShareButtonsProps) {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text: description,
                    url,
                });
            } catch (err) {
                // User cancelled or error occurred
                console.log("Share cancelled or failed:", err);
            }
        }
    };

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Share:</span>

            {/* Native Share (Mobile) */}
            {typeof window !== "undefined" && "share" in navigator && (
                <button
                    onClick={handleShare}
                    className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg",
                        "border border-border/60 bg-background/40 backdrop-blur-md",
                        "text-muted-foreground transition-colors",
                        "hover:bg-accent hover:text-accent-foreground hover:border-accent",
                        "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                    )}
                    aria-label="Share"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                </button>
            )}

            {/* Twitter */}
            <Link
                href={shareLinks.twitter(url, title)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    "border border-border/60 bg-background/40 backdrop-blur-md",
                    "text-muted-foreground transition-colors",
                    "hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]",
                    "focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:ring-offset-2"
                )}
                aria-label="Share on Twitter"
            >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
            </Link>

            {/* LinkedIn */}
            <Link
                href={shareLinks.linkedin(url)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    "border border-border/60 bg-background/40 backdrop-blur-md",
                    "text-muted-foreground transition-colors",
                    "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
                    "focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:ring-offset-2"
                )}
                aria-label="Share on LinkedIn"
            >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            </Link>

            {/* Email */}
            <Link
                href={shareLinks.email(url, title, description)}
                className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    "border border-border/60 bg-background/40 backdrop-blur-md",
                    "text-muted-foreground transition-colors",
                    "hover:bg-accent hover:text-accent-foreground hover:border-accent",
                    "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                )}
                aria-label="Share via Email"
            >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </Link>

            {/* Copy Link */}
            <button
                onClick={() => {
                    navigator.clipboard.writeText(url);
                    // You can add a toast notification here
                }}
                className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    "border border-border/60 bg-background/40 backdrop-blur-md",
                    "text-muted-foreground transition-colors",
                    "hover:bg-accent hover:text-accent-foreground hover:border-accent",
                    "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                )}
                aria-label="Copy link"
            >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            </button>
        </div>
    );
}
