"use client";

import { useEffect, useState } from "react";
import { bannerMessages } from "@/data/trust";

const INTERVAL_MS = 4500;

type ShippingBannerProps = {
  integrated?: boolean;
};

export function ShippingBanner({ integrated = false }: ShippingBannerProps) {
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(media.matches);
    syncMotion();
    media.addEventListener("change", syncMotion);
    return () => media.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    if (reduceMotion || bannerMessages.length <= 1) return;

    const id = window.setInterval(() => {
      setActive((index) => (index + 1) % bannerMessages.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div
      className={
        integrated
          ? "bg-transparent"
          : "border-b border-white/10 bg-charcoal/90 backdrop-blur-xl"
      }
      role="note"
      aria-live="polite"
    >
      <div className="relative mx-auto h-7 max-w-7xl px-4">
        {bannerMessages.map((message, index) => {
          const isActive = index === active;

          return (
            <p
              key={message.id}
              className={`banner-ticker-message absolute inset-0 flex items-center justify-center gap-2 text-center font-sans text-[9px] font-medium uppercase tracking-[0.2em] md:text-[10px] ${
                integrated ? "text-white/70" : "text-white/80"
              } ${isActive ? "banner-ticker-message--active" : ""}`}
              aria-hidden={!isActive}
            >
              {!integrated && (
                <span aria-hidden className="hidden h-px w-4 bg-white/20 sm:block" />
              )}
              {message.label}
              {!integrated && (
                <span aria-hidden className="hidden h-px w-4 bg-white/20 sm:block" />
              )}
            </p>
          );
        })}
      </div>
    </div>
  );
}
