import { Skeleton } from "./Skeleton";

/**
 * Loading skeleton for project cards
 */
export function ProjectCardSkeleton() {
    return (
        <div className="rounded-2xl border border-border bg-card/85 backdrop-blur-sm overflow-hidden">
            {/* Image skeleton */}
            <Skeleton className="aspect-[16/10] w-full" />

            {/* Content skeleton */}
            <div className="p-6 space-y-4">
                {/* Status badge */}
                <Skeleton className="h-5 w-20 rounded-full" />

                {/* Title */}
                <Skeleton className="h-7 w-3/4" />

                {/* Description */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                {/* Tags */}
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                </div>

                {/* Meta info */}
                <div className="flex justify-between pt-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
        </div>
    );
}

/**
 * Grid of loading skeletons
 */
export function ProjectsGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(count)].map((_, i) => (
                <ProjectCardSkeleton key={i} />
            ))}
        </div>
    );
}
