import type { Metadata } from "next";
import type { ReactNode } from "react";
import { MobileShop } from "@/components/MobileShop";
import { ProductCard } from "@/components/ProductCard";
import { ShopCheckoutBar } from "@/components/ShopCheckoutBar";
import { ShopHero } from "@/components/ShopHero";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Merch",
  description: "Scopri i pezzi essenziali di sadwell.",
};

function ShopSectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-10 flex items-center gap-4 md:mb-12">
      <span className="type-label tracking-[0.25em] text-muted">{children}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

export default function NegozioPage() {
  const [featured, ...rest] = products;

  return (
    <div className="bg-background pb-24 md:pb-0">
      <ShopHero />
      <MobileShop />
      <ShopCheckoutBar />

      <div className="hidden md:block">
        <section className="mx-auto max-w-7xl px-6 pb-24 pt-4 md:px-10 md:pt-8">
          <ShopSectionLabel>In evidenza</ShopSectionLabel>

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 lg:grid-cols-2">
            <ProductCard product={featured} index={0} featured />
          </div>

          {rest.length > 0 && (
            <>
              <div className="my-16 md:my-20">
                <ShopSectionLabel>Tutti i pezzi</ShopSectionLabel>
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
