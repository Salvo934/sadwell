"use client";

import { useEffect, useState } from "react";
import type { CampaignSlide } from "@/data/campaigns";

type HeroBackgroundCarouselProps = {
  slides: CampaignSlide[];
  intervalMs?: number;
};

export function HeroBackgroundCarousel({
  slides,
  intervalMs = 6000,
}: HeroBackgroundCarouselProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [slides.length, intervalMs]);

  return (
    <div className="absolute inset-0 md:hidden">
      {slides.map((slide, i) => {
        const isActive = i === active;
        return (
          <div
            key={slide.src}
            className={`hero-carousel-slide absolute inset-0 ${
              isActive ? "hero-carousel-slide--active" : ""
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt=""
              className="h-full w-full object-cover"
              style={{
                objectPosition: slide.position ?? "center center",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
