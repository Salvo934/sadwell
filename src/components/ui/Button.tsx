import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "ghost" | "outline-light";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-foreground text-surface hover:bg-foreground/90 shadow-[0_8px_32px_rgba(12,12,12,0.18)] hover:shadow-[0_12px_40px_rgba(12,12,12,0.22)] hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-foreground border border-border hover:bg-foreground/5",
  "outline-light":
    "bg-transparent text-white/90 border border-white/25 hover:bg-white/10 hover:border-white/40 backdrop-blur-sm",
};

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  href?: string;
};

export function Button({
  variant = "primary",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-sans text-sm font-medium tracking-wide transition-all duration-300";

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
