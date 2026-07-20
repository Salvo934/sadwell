"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { ProductImage } from "@/data/products";

type GalleryContextValue = {
  active: number;
  setActive: (index: number) => void;
  go: (index: number) => void;
  images: ProductImage[];
  featured: boolean;
  revealOnHover: boolean;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const GalleryContext = createContext<GalleryContextValue | null>(null);

function useGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error("ProductGallery components must be used within ProductGallery");
  return ctx;
}

type ProductGalleryProps = {
  images: ProductImage[];
  featured?: boolean;
  revealOnHover?: boolean;
  children: ReactNode;
};

export function ProductGallery({
  images,
  featured = false,
  revealOnHover = false,
  children,
}: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback(
    (index: number) => {
      if (images.length <= 1) return;
      setActive((index + images.length) % images.length);
    },
    [images.length],
  );

  const onMouseEnter = () => {
    if (revealOnHover && images.length > 1) setActive(1);
  };

  const onMouseLeave = () => {
    if (revealOnHover) setActive(0);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null || images.length <= 1) return;

    const deltaX = e.changedTouches[0].clientX - touchStart.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStart.current.y;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      go(active + (deltaX < 0 ? 1 : -1));
    } else if (Math.abs(deltaX) < 12 && Math.abs(deltaY) < 12) {
      go(active + 1);
    }

    touchStart.current = null;
  };

  return (
    <GalleryContext.Provider
      value={{
        active,
        setActive,
        go,
        images,
        featured,
        revealOnHover,
        onTouchStart,
        onTouchEnd,
        onMouseEnter,
        onMouseLeave,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
}

type ProductGalleryMediaProps = {
  className?: string;
};

export function ProductGalleryMedia({ className = "" }: ProductGalleryMediaProps) {
  const {
    active,
    images,
    featured,
    onTouchStart,
    onTouchEnd,
    onMouseEnter,
    onMouseLeave,
  } = useGallery();

  const current = images[active];
  const isFlat = current?.bg != null;

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: img.bg ?? "#0a0a0a" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt=""
            className={`product-visual-image absolute inset-0 h-full w-full object-cover ${
              featured ? "md:scale-100" : ""
            }`}
            style={{
              objectPosition: img.position ?? "center center",
              transform: `scale(${img.scale ?? 1})`,
            }}
          />
        </div>
      ))}

      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          isFlat
            ? "bg-linear-to-t from-black/15 via-transparent to-transparent"
            : "bg-linear-to-t from-black/20 via-transparent to-transparent"
        }`}
      />
    </div>
  );
}

type ProductGalleryControlsProps = {
  className?: string;
};

const labels = ["Prodotto", "Look"];

export function ProductGalleryControls({ className = "" }: ProductGalleryControlsProps) {
  const { active, setActive, images } = useGallery();

  if (images.length <= 1) return null;

  return (
    <div className={className}>
      <div className="flex rounded-full border border-white/10 bg-black/25 p-0.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={i === 0 ? "Foto prodotto" : "Foto modello"}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={`flex-1 rounded-full px-3 py-2 font-sans text-[11px] font-medium tracking-wide transition-all duration-300 ${
              i === active
                ? "bg-white text-foreground shadow-sm"
                : "text-white/55 hover:text-white/80"
            }`}
          >
            {labels[i] ?? `0${i + 1}`}
          </button>
        ))}
      </div>
    </div>
  );
}
