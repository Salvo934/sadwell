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

      <p
        aria-hidden
        className={`type-headline pointer-events-none absolute right-[-0.05em] top-1/2 z-1 hidden -translate-y-1/2 select-none text-[clamp(6rem,18vw,16rem)] leading-none opacity-[0.04] lg:block ${
          isDark ? "text-white" : "text-foreground"
        }`}
      >
        sadwell
      </p>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 pt-32 md:px-10 md:pb-20 md:pt-36">
        {hasCarousel && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 top-[30%] rounded-t-4xl bg-linear-to-t from-black/70 via-black/35 to-transparent md:hidden"
          />
        )}
        <div className="relative">
        <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p
              className={`type-label animate-fade-up mb-6 stagger-1 ${
                isDark ? "text-white/70" : "text-muted"
              }`}
            >
              Collezione 01 — 2026
            </p>
            <h1
              className={`type-headline animate-fade-up text-[clamp(2.75rem,7vw,5.5rem)] stagger-2 ${
                isDark ? "text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]" : "text-foreground"
              }`}
            >
              {campaign.title.split(" ").map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </h1>
          </div>

          <div className="lg:pb-2">
            <p
              className={`type-body animate-fade-up max-w-sm text-base md:text-[17px] stagger-3 ${
                isDark ? "text-white/80" : "text-muted"
              }`}
            >
              {campaign.subtitle}
            </p>
            <div className="animate-fade-up mt-10 flex flex-wrap items-center gap-4 stagger-4">
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
              <Button href="/negozio" variant={isDark ? "outline-light" : "ghost"}>
                Catalogo
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`animate-fade-in relative mt-16 flex items-center gap-4 stagger-5 ${
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
