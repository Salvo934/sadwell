import Link from "next/link";

type LogoMarkProps = {
  className?: string;
  href?: string;
  size?: "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
};

const sizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14",
  xl: "h-20 w-20 md:h-24 md:w-24",
};

export function LogoMark({
  className = "",
  href = "/",
  size = "lg",
  onClick,
}: LogoMarkProps) {
  const mark = (
    <span
      role="img"
      aria-label="sadwell"
      className={`block bg-foreground mask-[url(/logo-mark.png)] mask-contain mask-no-repeat mask-center [-webkit-mask-image:url(/logo-mark.png)] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center] ${sizes[size]} ${className}`}
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className="inline-block shrink-0 transition-opacity hover:opacity-80"
        aria-label="Sadwell — Home"
      >
        {mark}
      </Link>
    );
  }

  return mark;
}
