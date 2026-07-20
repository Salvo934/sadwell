import type { Product } from "@/data/products";

type ProductVisualProps = {
  product: Product;
  featured?: boolean;
  className?: string;
};

/** Placeholder visivo per prodotti senza foto */
export function ProductVisual({
  product,
  featured = false,
  className = "",
}: ProductVisualProps) {
  const isDark =
    product.tone === "dark" ||
    product.color === "#2a2a2a" ||
    product.color === "#1a1a1a";

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div
        className={`absolute inset-0 ${isDark ? "hero-mesh" : ""}`}
        style={
          isDark
            ? undefined
            : {
                background: `linear-gradient(155deg, ${product.color} 0%, #cfc9be 55%, #b8b0a4 100%)`,
              }
        }
      />
      {isDark && (
        <>
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/4 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/3 blur-3xl" />
        </>
      )}
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(255,255,255,0.08),transparent_70%)]"
            : "bg-[radial-gradient(ellipse_80%_70%_at_30%_20%,rgba(255,255,255,0.5),transparent_60%)]"
        }`}
      />
      <div
        className={`absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 ${
          featured ? "h-[58%] w-[48%]" : "h-[52%] w-[44%]"
        }`}
      >
        <div
          className={`absolute inset-x-[8%] top-[18%] h-[22%] rounded-[999px] border ${
            isDark ? "border-white/12 bg-white/4" : "border-black/[0.07] bg-black/3"
          }`}
        />
        <div
          className={`absolute inset-x-0 bottom-0 top-[32%] rounded-[2.5rem] border ${
            isDark ? "border-white/10 bg-white/3" : "border-black/6 bg-black/2.5"
          }`}
        />
        <div
          className={`absolute inset-x-[18%] top-[38%] h-px ${
            isDark ? "bg-white/10" : "bg-black/10"
          }`}
        />
      </div>

      <div className="product-visual-vignette pointer-events-none absolute inset-0 opacity-40" />
      <div className="product-visual-grain pointer-events-none absolute inset-0 opacity-[0.12]" />
    </div>
  );
}
