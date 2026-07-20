import Link from "next/link";

type WordmarkProps = {
  variant?: "light" | "dark";
  className?: string;
};

export function Wordmark({ variant = "dark", className = "" }: WordmarkProps) {
  return (
    <Link
      href="/"
      className={`font-cooper type-headline text-[2.25rem] transition-opacity hover:opacity-80 md:text-[1.65rem] ${
        variant === "light" ? "text-white" : "text-foreground"
      } ${className}`}
      aria-label="Sadwell — Home"
    >
      sadwell
    </Link>
  );
}
