import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  title,
  description,
  className,
  as: Component = "h2",
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-8", className)}>
      <Component
        className={cn(
          "font-semibold tracking-tight text-foreground",
          Component === "h1" && "text-3xl sm:text-4xl lg:text-5xl",
          Component === "h2" && "text-2xl sm:text-3xl",
          Component === "h3" && "text-xl sm:text-2xl"
        )}
      >
        {title}
      </Component>
      {description && (
        <p className="mt-2 text-muted-foreground max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
