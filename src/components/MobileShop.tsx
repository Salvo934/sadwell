import { MobileProductCard } from "@/components/MobileProductCard";
import { products } from "@/data/products";

export function MobileShop() {
  return (
    <div className="md:hidden">
      <section className="relative overflow-hidden border-b border-border bg-charcoal px-6 pb-10 pt-28 grain">
        <div className="absolute inset-0 hero-mesh opacity-60" />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/50" />

        <div className="relative">
          <p className="type-label animate-fade-up text-white/45">Collezione 01</p>
          <h1 className="type-headline animate-fade-up mt-4 text-[clamp(2.75rem,12vw,4rem)] text-white stagger-1">
            Merch
          </h1>
          <p className="type-body animate-fade-up mt-5 max-w-xs text-sm leading-relaxed text-white/55 stagger-2">
            Due pezzi essenziali. Materia, taglio, silenzio.
          </p>
          <p className="type-headline animate-fade-up mt-8 text-3xl text-white/90 stagger-3">
            {products.length} pezzi
          </p>
        </div>
      </section>

      <section className="bg-background px-6 py-10">
        <div className="mb-8 flex items-center gap-4">
          <span className="type-label tracking-[0.28em] text-muted">Drop</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="flex flex-col gap-12">
          {products.map((product, i) => (
            <MobileProductCard
              key={product.id}
              product={product}
              index={i}
              total={products.length}
            />
          ))}
        </div>

        <p className="type-label mx-auto mt-16 max-w-xs text-center leading-relaxed tracking-[0.28em] text-muted/80">
          Spedizione gratuita in Italia
          <br />
          Reso entro 14 giorni
        </p>
      </section>
    </div>
  );
}
