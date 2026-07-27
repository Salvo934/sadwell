import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductColorBadge } from "@/components/ProductColorBadge";
import { formatPrice, getProductImages, type Product } from "@/data/products";
import {
  ProductGallery,
  ProductGalleryControls,
  ProductGalleryMedia,
} from "@/components/ProductGallery";
import { ProductVisual } from "@/components/ProductVisual";

type ProductCardProps = {
  product: Product;
  index: number;
  featured?: boolean;
};

export function ProductCard({ product, index, featured = false }: ProductCardProps) {
  const images = getProductImages(product);
  const hasGallery = images.length > 0;

  const mediaBlock = (
    <div
      className={`relative overflow-hidden ${
        hasGallery
          ? featured
            ? "aspect-4/5 lg:aspect-auto lg:min-h-105"
            : "aspect-4/5"
          : "absolute inset-0"
      }`}
    >
      {hasGallery ? (
        <ProductGalleryMedia />
      ) : (
        <ProductVisual product={product} featured={featured} />
      )}

      <div className="pointer-events-none absolute inset-4 rounded-3xl border border-white/10 transition-colors duration-500 group-hover:border-white/20" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-6">
        <span className="type-label rounded-full border border-white/15 bg-black/25 px-3 py-1.5 tracking-[0.22em] text-white/75 backdrop-blur-md">
          {String(index + 1).padStart(2, "0")}
        </span>
        {product.tag && (
          <span className="type-label rounded-full bg-white px-3 py-1.5 tracking-wider text-foreground shadow-lg">
            {product.tag}
          </span>
        )}
      </div>
    </div>
  );

  const infoBlock = hasGallery ? (
    <div className="flex flex-col justify-end border-t border-white/10 bg-charcoal px-6 py-6 md:px-7 md:py-7 lg:border-l lg:border-t-0">
      <ProductGalleryControls className="mb-5" />
      <p className="type-label tracking-[0.28em] text-white/40">Collezione 01</p>
      <div className="mt-3 flex items-start justify-between gap-6">
        <div>
          <h3
            className={`type-headline leading-none text-white ${
              featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
            }`}
          >
            {product.name}
          </h3>
          <ProductColorBadge
            name={product.colorName}
            swatch={product.colorSwatch}
            variant="dark"
            size="sm"
          />
          <p className="type-body mt-2 max-w-sm text-sm text-white/60">
            {product.description}
          </p>
        </div>
        <p className="type-headline shrink-0 text-xl text-white md:text-2xl">
          {formatPrice(product.price)}
        </p>
      </div>

      <div className="mt-5 border-t border-white/10 pt-5">
        <span className="type-label mb-4 block text-white/40">
          {product.tone === "dark" ? "480gsm · Brushed" : "240gsm · Oversize"}
        </span>
        <AddToCartButton product={product} variant="dark" />
      </div>
    </div>
  ) : null;

  return (
    <article
      id={product.id}
      className={`group product-card-premium flex flex-col scroll-mt-32 ${featured ? "lg:col-span-2" : ""}`}
    >
      <div
        className={`product-card-shadow relative overflow-hidden rounded-4xl bg-charcoal ring-1 ring-black/6 transition-all duration-700 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_28px_80px_rgba(12,12,12,0.14)] ${
          hasGallery
            ? featured
              ? "lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:aspect-auto"
              : "lg:grid lg:grid-cols-1 lg:grid-rows-[1fr_auto]"
            : featured
              ? "aspect-16/10 lg:aspect-2/1"
              : "aspect-4/5"
        }`}
      >
        {hasGallery ? (
          <ProductGallery
            images={images}
            featured={featured}
            revealOnHover={images.length > 1}
          >
            {mediaBlock}
            {infoBlock}
          </ProductGallery>
        ) : (
          <>
            {mediaBlock}
            <p
              aria-hidden
              className="type-headline pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none text-[clamp(4rem,12vw,8rem)] leading-none text-white/4"
            >
              sadwell
            </p>

            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/95 via-black/55 to-transparent px-6 pb-6 pt-24 md:px-7 md:pb-7">
              <p className="type-label mb-2 tracking-[0.28em] text-white/40">
                Collezione 01
              </p>
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h3
                    className={`type-headline leading-none text-white ${
                      featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                    }`}
                  >
                    {product.name}
                  </h3>
                  <p className="type-body mt-2 max-w-sm text-sm text-white/55">
                    {product.description}
                  </p>
                </div>
                <p className="type-headline shrink-0 text-xl text-white md:text-2xl">
                  {formatPrice(product.price)}
                </p>
              </div>

              <div className="mt-5 border-t border-white/10 pt-5 opacity-0 transition-all duration-500 group-hover:opacity-100">
                <span className="type-label mb-4 block text-white/40">
                  {product.tone === "dark" ? "480gsm · Brushed" : "240gsm · Oversize"}
                </span>
                <AddToCartButton product={product} variant="dark" />
              </div>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
