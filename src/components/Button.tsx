import { cn } from "@/lib/cn";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButtonProps
  extends ButtonBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  href?: never;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string;
  download?: boolean;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    "relative overflow-hidden bg-accent text-accent-foreground",
    "before:content-[''] before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity motion-reduce:before:transition-none hover:before:opacity-100",
    "after:content-[''] after:absolute after:inset-y-0 after:left-[-150%] after:w-[150%] after:skew-x-[-20deg] after:bg-[linear-gradient(110deg,transparent,hsl(0_0%_100%_/_0.35),transparent)] after:opacity-0 after:pointer-events-none after:transition-all after:duration-700 motion-reduce:after:transition-none motion-safe:hover:after:left-[150%] motion-safe:hover:after:opacity-100",
    "shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30",
    "motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98]"
  ),
  secondary: cn(
    "bg-muted/80 text-foreground border border-border/50",
    "hover:bg-muted hover:border-border",
    "motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98]"
  ),
  outline: cn(
    "bg-transparent text-foreground border-2 border-accent/50",
    "hover:bg-accent/10 hover:border-accent",
    "motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98]"
  ),
  ghost: cn(
    "text-muted-foreground hover:text-foreground hover:bg-muted/50",
    "motion-safe:active:scale-[0.98]"
  ),
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-7 py-3.5 text-base rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = cn(
    "group inline-flex items-center justify-center gap-2 font-medium",
    "transition-all duration-200 ease-out",
    "motion-reduce:transition-none",
    "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if ("href" in props && props.href) {
    const { href, download, ...rest } = props;
    return (
      <Link href={href} className={baseStyles} download={download} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseStyles} {...(props as ButtonAsButtonProps)}>
      {children}
    </button>
  );
}
