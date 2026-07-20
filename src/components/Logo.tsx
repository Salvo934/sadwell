import Link from "next/link";

type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
  href?: string;
  size?: "sm" | "md" | "lg" | "nav" | "navMobile";
};

const sizes = {
  sm: "h-6 w-[5.5rem]",
  md: "h-8 w-[10.875rem]",
  lg: "h-9 w-[12rem]",
  nav: "h-8 w-[10.875rem]",
  navMobile: "h-11 w-[15rem] origin-center scale-[2.75] md:scale-100 md:h-8 md:w-[10.875rem]",
};

export function Logo({
  variant = "dark",
  className = "",
  href = "/",
  size = "md",
}: LogoProps) {
  const image = (
    <span
      role="img"
      aria-label="sadwell"
      className={`block ${sizes[size]} ${
        variant === "light" ? "bg-white" : "bg-foreground"
      } mask-[url(/logo.png)] mask-contain mask-no-repeat mask-center [-webkit-mask-image:url(/logo.png)] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center] md:mask-[left_center] md:[-webkit-mask-position:left_center] ${className}`}
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-block shrink-0 transition-opacity hover:opacity-80"
        aria-label="Sadwell — Home"
      >
        {image}
      </Link>
    );
  }

  return image;
}
