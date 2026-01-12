import { cn } from "@/lib/cn";

interface ProseProps {
  children: React.ReactNode;
  className?: string;
}

export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        "prose prose-neutral dark:prose-invert",
        "prose-headings:scroll-mt-20",
        "prose-a:text-accent prose-a:no-underline hover:prose-a:underline",
        "prose-pre:bg-muted prose-pre:border prose-pre:border-border",
        "prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none",
        "max-w-none",
        className
      )}
    >
      {children}
    </div>
  );
}
