import { getActiveCampaign } from "@/data/campaigns";
import { HeroBackgroundCarousel } from "@/components/HeroBackgroundCarousel";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const campaign = getActiveCampaign();
  const isDark = campaign.overlay !== "light";
  const hasCarousel = Boolean(campaign.carousel?.length);
  const hasDesktopImage = Boolean(campaign.image);

  return (
    <section className="relative flex min-h-dvh items-end overflow-hidden grain">
      <div className="absolute inset-0 z-0">
        {hasCarousel && (
          <HeroBackgroundCarousel slides={campaign.carousel!} intervalMs={6000} />
        )}

        {hasDesktopImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={campaign.image}
            alt=""
            className="hidden h-full w-full scale-105 object-cover md:block"
          />
        ) : (
          <div className={`hero-mesh h-full w-full ${hasCarousel ? "hidden md:block" : ""}`} />
        )}

        {/* Overlay leggero — copy leggibile senza coprire le foto */}
        <div
          className={`pointer-events-none absolute inset-0 ${
            isDark
              ? hasCarousel
                ? "bg-linear-to-t from-black/75 from-30% via-black/30 via-55% to-transparent md:from-black/70 md:via-black/30 md:to-transparent"
                : "bg-linear-to-t from-black/80 via-black/35 to-transparent"
              : "bg-linear-to-t from-background via-background/60 to-transparent"
          }`}
        />

        <div className="absolute -right-24 top-1/4 hidden h-105 w-105 animate-float rounded-full bg-white/3 blur-3xl md:block" />
        <div className="absolute -left-16 bottom-1/3 hidden h-70 w-70 animate-float rounded-full bg-white/2 blur-3xl [animation-delay:2s] md:block" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 pt-32 md:px-10 md:pb-20 md:pt-36">
        {hasCarousel && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 top-[30%] rounded-t-4xl bg-linear-to-t from-black/70 via-black/35 to-transparent md:hidden"
          />
        )}
        <div className="relative max-w-xl">
        <div className="flex flex-col gap-10 md:max-w-2xl">
          <div>
            <p
              className={`type-label animate-fade-up mb-6 stagger-1 ${
                isDark ? "text-white/70" : "text-muted"
              }`}
            >
              {campaign.label ?? "Collezione 01 — 2026"}
            </p>
            <h1
              className={`type-headline animate-fade-up text-[clamp(2.75rem,7vw,5.5rem)] stagger-2 ${
                isDark ? "text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]" : "text-foreground"
              }`}
            >
              {campaign.title.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>

          <div>
            <div
              className={`animate-fade-up mb-5 h-px w-10 stagger-3 ${
                isDark ? "bg-white/35" : "bg-foreground/20"
              }`}
            />
            <p
              className={`type-body animate-fade-up max-w-md text-[15px] leading-[1.85] tracking-[0.01em] md:text-base stagger-3 ${
                isDark ? "text-white/75" : "text-muted"
              }`}
            >
              {campaign.subtitle.split("\n").map((line, i) => (
                <span
                  key={i}
                  className={`block ${
                    i === 0
                      ? isDark
                        ? "text-white/85"
                        : "text-foreground/90"
                      : isDark
                        ? "mt-1 text-white/55"
                        : "mt-1 text-muted"
                  }`}
                >
                  {line}
                </span>
              ))}
            </p>
            {campaign.closingLine && (
              <p
                className={`type-body animate-fade-up mt-6 max-w-sm text-sm leading-relaxed md:text-[15px] stagger-4 ${
                  isDark ? "text-white/65" : "text-muted"
                }`}
              >
                {campaign.closingLine}
              </p>
            )}
            <div className={`animate-fade-up flex flex-wrap items-center gap-4 ${campaign.closingLine ? "mt-10 stagger-5" : "mt-10 stagger-4"}`}>
              <Button
                href={campaign.ctaHref}
                variant={isDark ? "primary" : "primary"}
                className={
                  isDark
                    ? "bg-white! text-foreground! hover:bg-white/90!"
                    : ""
                }
              >
                {campaign.cta}
                <span aria-hidden>→</span>
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`animate-fade-in relative mt-16 flex items-center gap-4 stagger-6 ${
            isDark ? "text-white/55" : "text-muted"
          }`}
        >
          <div className="relative h-10 w-px bg-current/30">
            <div className="absolute inset-x-0 top-0 h-full w-px origin-top bg-current animate-[scroll-line_2.2s_ease-in-out_infinite]" />
          </div>
          <span className="type-label tracking-[0.25em]">Scroll</span>
        </div>
        </div>
      </div>
    </section>
  );
}
