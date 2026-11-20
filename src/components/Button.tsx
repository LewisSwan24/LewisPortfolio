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

// Lively Icons rules: one filled button in the accent, no shadows, gradients
// or scaling. Hover deepens the line, or adds a 1px ink ring to a filled button.
const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-[var(--accent)] text-[var(--on-accent)] border border-transparent",
    "hover:shadow-[0_0_0_2px_var(--bg),0_0_0_3px_var(--text)]"
  ),
  secondary: cn(
    "bg-[var(--surface)] text-[var(--text)] border border-[var(--border-strong)]",
    "hover:border-[var(--text)]"
  ),
  outline: cn(
    "bg-transparent text-[var(--text)] border border-[var(--border-strong)]",
    "hover:border-[var(--text)]"
  ),
  ghost: cn(
    "bg-transparent text-[var(--text-2)] border border-transparent",
    "hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
  ),
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs rounded-[var(--r-sm)]",
  md: "px-5 py-2.5 text-sm rounded-[var(--r-md)]",
  lg: "px-7 py-3.5 text-base rounded-[var(--r-md)]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = cn(
    "group inline-flex items-center justify-center gap-2 font-semibold",
    "transition-[border-color,box-shadow,background-color,color] duration-150 ease-out",
    "motion-reduce:transition-none",
    "disabled:pointer-events-none disabled:opacity-[0.45]",
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
