import { cn } from "@/lib/cn";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

/**
 * Base skeleton component for loading states
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-lg bg-muted/50",
                className
            )}
            {...props}
        />
    );
}
