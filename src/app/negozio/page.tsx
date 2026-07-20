import type { Metadata } from "next";
import { MobileShop } from "@/components/MobileShop";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Merch",
  description: "Scopri i pezzi essenziali di sadwell.",
};

export default function NegozioPage() {
  const [featured, ...rest] = products;

  return (
    <div className="bg-background">
      <MobileShop />

      <div className="hidden md:block">
        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="type-label text-muted">Collezione</p>
                <h1 className="type-headline mt-4 text-[clamp(2.5rem,6vw,4.5rem)]">
                  Merch
                </h1>
              </div>
              <div className="max-w-md lg:text-right">
                <p className="type-body text-sm text-muted md:text-base">
                  Pochi pezzi, scelti con cura. Ogni articolo è pensato per
                  integrarsi nel tuo guardaroba e durare nel tempo.
                </p>
                <p className="type-headline mt-4 text-2xl">
                  {products.length} pezzi
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="mb-10 flex items-center gap-4">
            <span className="type-label tracking-[0.25em] text-muted">
              In evidenza
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 lg:grid-cols-2">
            <ProductCard product={featured} index={0} featured />
          </div>

          {rest.length > 0 && (
            <>
              <div className="my-16 flex items-center gap-4 md:my-20">
                <span className="type-label tracking-[0.25em] text-muted">
                  Tutti i pezzi
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
                {rest.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i + 1} />
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
