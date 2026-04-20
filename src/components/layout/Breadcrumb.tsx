import Link from "next/link";
import { cn } from "@/lib/cn";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
    return (
        <nav
            aria-label="Breadcrumb"
            className={cn("flex items-center space-x-2 text-sm", className)}
        >
            <ol className="flex items-center space-x-2">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index} className="flex items-center space-x-2">
                            {index > 0 && (
                                <svg
                                    className="h-4 w-4 text-muted-foreground"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            )}

                            {isLast || !item.href ? (
                                <span
                                    className={cn(
                                        "font-medium",
                                        isLast ? "text-foreground" : "text-muted-foreground"
                                    )}
                                    aria-current={isLast ? "page" : undefined}
                                >
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "text-muted-foreground hover:text-foreground transition-colors",
                                        "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
