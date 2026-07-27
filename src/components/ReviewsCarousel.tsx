"use client";

import { useRef } from "react";
import { reviews } from "@/data/trust";

const reviewDateFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatReviewDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return reviewDateFormatter.format(new Date(year, month - 1, day));
}

function CarouselNav({
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
}: {
  onPrev: () => void;
  onNext: () => void;
  prevLabel: string;
  nextLabel: string;
}) {
  return (
    <div className="flex shrink-0 gap-2">
      <button
        type="button"
        onClick={onPrev}
        aria-label={prevLabel}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-foreground hover:text-foreground"
      >
        ←
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label={nextLabel}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-foreground hover:text-foreground"
      >
        →
      </button>
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} stelle su 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`text-sm ${i < rating ? "text-foreground" : "text-border"}`}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function ReviewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "prev" | "next") {
    const track = trackRef.current;
    if (!track) return;

    const slide = track.querySelector<HTMLElement>("[data-review-slide]");
    const gap = window.innerWidth >= 768 ? 20 : 16;
    const amount = slide ? slide.offsetWidth + gap : 300;

    track.scrollBy({
      left: dir === "next" ? amount : -amount,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="type-label text-muted">Recensioni</p>
          <h2 className="type-headline mt-2 text-[clamp(1.75rem,4vw,2.5rem)] leading-none">
            Dicono di noi
          </h2>
          <p className="type-body mt-3 max-w-md text-sm text-muted md:text-base">
            Chi ha scelto Sadwell racconta la propria esperienza.
          </p>
        </div>

        <CarouselNav
          onPrev={() => scroll("prev")}
          onNext={() => scroll("next")}
          prevLabel="Recensione precedente"
          nextLabel="Recensione successiva"
        />
      </div>

      <div
        ref={trackRef}
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-2 md:-mx-10 md:gap-5 md:px-10 scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review) => (
          <article
            key={review.id}
            data-review-slide
            className="flex w-[min(85vw,340px)] shrink-0 snap-center flex-col rounded-3xl border border-border bg-background p-5 md:w-[min(42vw,380px)] md:p-6"
          >
            <Stars rating={review.rating} />
            <blockquote className="type-body mt-4 flex-1 text-sm leading-relaxed text-foreground md:text-[15px]">
              &ldquo;{review.quote}&rdquo;
            </blockquote>
            <footer className="mt-5 border-t border-border pt-4">
              <div className="flex items-start justify-between gap-4">
                <cite className="type-label not-italic text-muted">
                  {review.author}
                </cite>
                <time
                  dateTime={review.date}
                  className="type-label shrink-0 text-muted/70"
                >
                  {formatReviewDate(review.date)}
                </time>
              </div>
              <p className="type-label mt-1 text-muted/70">{review.location}</p>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
