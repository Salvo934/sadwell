"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

export function ShopCheckoutBar() {
  const { itemCount, total, closeCart } = useCart();

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-surface/95 px-5 py-4 backdrop-blur-xl md:hidden">
      <Link
        href="/carrello"
        onClick={closeCart}
        className="mx-auto flex max-w-lg items-center justify-between gap-4 rounded-full bg-foreground px-5 py-3.5 font-sans text-sm font-medium text-surface transition-transform active:scale-[0.98]"
      >
        <span>
          {itemCount} {itemCount === 1 ? "articolo" : "articoli"}
        </span>
        <span className="type-headline text-base text-surface">
          {formatPrice(total)}
        </span>
        <span className="flex items-center gap-1">
          Checkout
          <span aria-hidden>→</span>
        </span>
      </Link>
    </div>
  );
}
