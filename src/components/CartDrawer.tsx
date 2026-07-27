"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { CartCheckout } from "@/components/CartCheckout";

export function CartDrawer() {
  const pathname = usePathname();
  const { isOpen, closeCart } = useCart();

  useEffect(() => {
    closeCart();
  }, [pathname, closeCart]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-[60] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Chiudi carrello"
        onClick={closeCart}
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        className={`absolute bottom-0 right-0 top-0 flex w-full max-w-md flex-col border-l border-border bg-background shadow-2xl transition-transform duration-500 ease-out md:max-w-sm ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrello"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <p className="type-label text-muted">Carrello</p>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Chiudi"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pb-6">
          <CartCheckout variant="drawer" onClose={closeCart} />
        </div>
      </aside>
    </div>
  );
}
