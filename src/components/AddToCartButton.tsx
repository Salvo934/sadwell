"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { QuantityControl } from "@/components/QuantityControl";
import { SIZES, type Product, type Size } from "@/data/products";

type AddToCartButtonProps = {
  product: Product;
  variant?: "dark" | "light";
  compact?: boolean;
};

export function AddToCartButton({
  product,
  variant = "dark",
  compact = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [size, setSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const isDark = variant === "dark";

  function handleAdd() {
    if (!size) return;
    addItem(product.id, size, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className={compact ? "space-y-2.5" : "space-y-3"}>
      <div>
        <p
          className={`type-label mb-2 ${compact ? "text-[10px]" : "text-xs"} ${
            isDark ? "text-white/45" : "text-muted"
          }`}
        >
          Scegli taglia
        </p>
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`min-w-11 rounded-full border px-4 font-sans font-medium transition-all active:scale-[0.97] ${
                compact ? "py-2 text-[11px]" : "py-2.5 text-xs"
              } ${
                size === s
                  ? isDark
                    ? "border-white bg-white text-foreground"
                    : "border-foreground bg-foreground text-surface"
                  : isDark
                    ? "border-white/20 text-white hover:border-white hover:bg-white hover:text-foreground"
                    : "border-border text-foreground hover:border-foreground hover:bg-foreground hover:text-surface"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div>
          <p
            className={`type-label mb-2 ${compact ? "text-[10px]" : "text-xs"} ${
              isDark ? "text-white/45" : "text-muted"
            }`}
          >
            Quantità
          </p>
          <QuantityControl
            value={quantity}
            onChange={setQuantity}
            variant={variant}
            compact={compact}
          />
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={!size}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 font-sans font-medium transition-all disabled:opacity-40 ${
            compact ? "self-end py-2.5 text-xs" : "self-end py-3 text-sm"
          } ${
            isDark
              ? "bg-white text-foreground active:scale-[0.97]"
              : "bg-foreground text-surface hover:bg-foreground/90"
          }`}
        >
          {added ? "Aggiunto ✓" : "Aggiungi al carrello"}
        </button>
      </div>
    </div>
  );
}
