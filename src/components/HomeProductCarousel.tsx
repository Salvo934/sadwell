"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { ProductColorBadge } from "@/components/ProductColorBadge";
import { formatPrice, getProductImages, products } from "@/data/products";

function CarouselNav({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex shrink-0 gap-2">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Prodotto precedente"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-foreground hover:text-foreground"
      >
        ←
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Prodotto successivo"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-foreground hover:text-foreground"
      >
        →
      </button>
    </div>
  );
}

export function HomeProductCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "prev" | "next") {
    const track = trackRef.current;
    if (!track) return;

    const slide = track.querySelector<HTMLElement>("[data-slide]");
    const gap = window.innerWidth >= 768 ? 24 : 16;
    const amount = slide ? slide.offsetWidth + gap : 320;

    track.scrollBy({
      left: dir === "next" ? amount : -amount,
      behavior: "smooth",
    });
  }

  return (
    <section id="merch" className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl py-14 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-6 px-6 md:px-10">
          <div>
            <p className="type-label text-muted">Merch</p>
            <h2 className="type-headline mt-2 text-[clamp(1.75rem,4vw,2.75rem)] leading-none">
              Essential Tee
            </h2>
          </div>

          <CarouselNav
            onPrev={() => scroll("prev")}
            onNext={() => scroll("next")}
          />
        </div>

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-2 md:gap-6 md:px-10 scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => {
            const image = getProductImages(product)[0];

            return (
              <article
                key={product.id}
                data-slide
                className="w-[min(82vw,320px)] shrink-0 snap-center md:w-[min(38vw,380px)]"
              >
                <div className="relative aspect-3/4 overflow-hidden rounded-[1.35rem] bg-charcoal ring-1 ring-black/5">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image.src}
                      alt={product.name}
                      className="h-full w-full object-cover"
                      style={{
                        objectPosition: image.position ?? "center center",
                      }}
                    />
                  ) : (
                    <div
                      className="h-full w-full"
                      style={{ background: product.color }}
                      role="img"
                      aria-label={product.name}
                    />
                  )}
                  <div className="pointer-events-none absolute inset-3 rounded-2xl border border-white/10" />
                </div>

                <div className="mt-5 px-0.5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="type-headline text-xl leading-none md:text-2xl">
                      {product.name}
                    </h3>
                    <p className="type-headline shrink-0 text-lg text-muted md:text-xl">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <div className="mt-2">
                    <ProductColorBadge
                      name={product.colorName}
                      swatch={product.colorSwatch}
                      size="sm"
                    />
                  </div>

                  <p className="type-body mt-3 text-sm leading-relaxed text-muted">
                    {product.description}
                  </p>

                  <Button
                    href={`/negozio#${product.id}`}
                    className="mt-5 w-full md:w-auto"
                  >
                    Acquista
                    <span aria-hidden>→</span>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
