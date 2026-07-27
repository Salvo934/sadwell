import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductColorBadge } from "@/components/ProductColorBadge";
import { formatPrice, getProductImages, type Product } from "@/data/products";
import {
  ProductGallery,
  ProductGalleryControls,
  ProductGalleryMedia,
} from "@/components/ProductGallery";
import { ProductVisual } from "@/components/ProductVisual";

type MobileProductCardProps = {
  product: Product;
  index: number;
  total: number;
};

export function MobileProductCard({
  product,
  index,
  total,
}: MobileProductCardProps) {
  const images = getProductImages(product);

  return (
    <article
      id={product.id}
      className="mobile-shop-item mx-auto w-full max-w-75 scroll-mt-32"
      style={{ animationDelay: `${index * 140 + 80}ms` }}
    >
      <div className="product-card-premium group relative">
        <div className="mb-3 flex items-end justify-between px-0.5">
          <span className="type-label text-[10px] text-muted">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          {product.tag && (
            <span className="type-label rounded-full border border-foreground/10 bg-surface px-2.5 py-0.5 text-[10px] tracking-[0.2em] text-foreground/70">
              {product.tag}
            </span>
          )}
        </div>

        <div className="relative overflow-hidden rounded-[1.35rem] bg-charcoal shadow-[0_12px_40px_rgba(12,12,12,0.12)] ring-1 ring-black/5">
          {images.length > 0 ? (
            <ProductGallery images={images}>
              <div className="relative aspect-[3/3.6] overflow-hidden">
                <ProductGalleryMedia />
                <div className="pointer-events-none absolute inset-2 rounded-2xl border border-white/10" />
              </div>
              <ProductGalleryControls className="border-t border-white/10 bg-charcoal px-3 py-2.5" />
            </ProductGallery>
          ) : (
            <div className="relative aspect-[3/3.6] overflow-hidden">
              <ProductVisual product={product} />
              <div className="pointer-events-none absolute inset-2 rounded-2xl border border-white/10" />
            </div>
          )}

          <div className="border-t border-white/10 bg-charcoal px-4 py-4">
            <p className="type-label text-[10px] tracking-[0.24em] text-white/40">
              Collezione 01
            </p>
            <h2 className="type-headline mt-1.5 text-[1.65rem] leading-[0.92] text-white">
              {product.name}
            </h2>
            <ProductColorBadge
              name={product.colorName}
              swatch={product.colorSwatch}
              variant="dark"
              size="sm"
            />
            <p className="type-body mt-2 text-xs leading-relaxed text-white/55">
              {product.description}
            </p>

            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="type-headline mb-3 text-xl text-white">
                {formatPrice(product.price)}
              </p>
              <AddToCartButton product={product} variant="dark" compact />
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 px-0.5">
          <div className="h-px flex-1 bg-border" />
          <span className="type-label text-[10px] text-muted/70">
            {product.tone === "dark" ? "480gsm · Brushed" : "240gsm · Oversize"}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>
    </article>
  );
}
