"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/cn";

interface CodeBlockProps {
    children: React.ReactNode;
    className?: string;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const preRef = useRef<HTMLPreElement>(null);

    const handleCopy = async () => {
        if (!preRef.current) return;

        // Get the text content from the pre element
        const code = preRef.current.textContent || "";

        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code:", err);
        }
    };

    return (
        <div className="group relative">
            <pre
                ref={preRef}
                className={cn(
                    "overflow-x-auto rounded-lg border border-border bg-muted p-4 pr-12",
                    className
                )}
                {...props}
            >
                {children}
            </pre>

            {/* Copy Button */}
            <button
                onClick={handleCopy}
                className={cn(
                    "absolute right-2 top-2 p-2 rounded-md",
                    "bg-background/80 backdrop-blur-sm border border-border/50",
                    "text-muted-foreground transition-all duration-200",
                    "opacity-0 group-hover:opacity-100 focus:opacity-100",
                    "hover:bg-accent hover:text-accent-foreground hover:border-accent",
                    "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-muted"
                )}
                aria-label={copied ? "Copied!" : "Copy code"}
                title={copied ? "Copied!" : "Copy code"}
            >
                {copied ? (
                    // Check icon
                    <svg
                        className="w-4 h-4 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                ) : (
                    // Copy icon
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                    </svg>
                )}
            </button>
        </div>
    );
}
