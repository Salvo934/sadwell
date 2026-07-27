"use client";

import { useCart } from "@/context/CartContext";

type CartButtonProps = {
  variant?: "light" | "dark";
};

function BagIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M5.25 6V4.75C5.25 2.955 6.705 1.5 8.5 1.5C10.295 1.5 11.75 2.955 11.75 4.75V6"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M3.25 6H13.75L12.75 16.25H4.25L3.25 6Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CartButton({ variant = "dark" }: CartButtonProps) {
  const { itemCount, openCart } = useCart();
  const isLight = variant === "light";

  return (
    <button
      type="button"
      onClick={openCart}
      className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ${
        isLight
          ? "text-white/70 hover:bg-white/10 hover:text-white"
          : "text-muted hover:bg-foreground/5 hover:text-foreground"
      }`}
      aria-label={`Carrello${itemCount > 0 ? `, ${itemCount} articoli` : ""}`}
    >
      <BagIcon />
      {itemCount > 0 && (
        <span
          className={`absolute top-0 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 font-sans text-[9px] font-semibold leading-none ${
            isLight ? "bg-white text-foreground" : "bg-foreground text-surface"
          }`}
        >
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </button>
  );
}
