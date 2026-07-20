import Link from "next/link";

type LogoVideoProps = {
  className?: string;
  href?: string;
};

export function LogoVideo({ className = "", href = "/" }: LogoVideoProps) {
  const video = (
    <video
      autoPlay
      loop
      muted
      playsInline
      className={`h-10 w-auto max-w-40 object-contain md:h-12 md:max-w-48 ${className}`}
      aria-label="sadwell"
    >
      <source src="/sadwell.mp4" type="video/mp4" />
    </video>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-block shrink-0 transition-opacity hover:opacity-80"
        aria-label="Sadwell — Home"
      >
        {video}
      </Link>
    );
  }

  return video;
}
