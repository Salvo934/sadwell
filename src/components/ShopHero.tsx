import { products } from "@/data/products";

export function ShopHero() {
  return (
    <section className="border-b border-white/10 bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 pb-14 pt-36 md:px-10 md:pb-20 md:pt-40">
        <p className="type-label text-white/50">Collezione 01 — 2026</p>

        <div className="mt-5 flex items-end justify-between gap-6">
          <h1 className="type-headline text-[clamp(3rem,11vw,5rem)] leading-[0.92] text-white">
            Merch
          </h1>
          <p
            className="type-headline shrink-0 text-[clamp(1.75rem,5vw,2.5rem)] leading-none text-white/90"
            aria-label={`${products.length} pezzi in collezione`}
          >
            {products.length}{" "}
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-white/45 md:text-xs">
              pezzi
            </span>
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-16">
          <div className="max-w-sm">
            <div className="h-px w-10 bg-white/30" aria-hidden />
            <p className="type-body mt-6 text-[15px] leading-[1.85] text-white/70">
              Due pezzi essenziali. Materia, taglio, silenzio.
            </p>
          </div>

          <p className="type-body max-w-xs text-sm leading-relaxed text-white/50 md:text-right md:text-[15px]">
            Pochi pezzi, scelti con cura. Ogni articolo è pensato per integrarsi
            nel tuo guardaroba e durare nel tempo.
          </p>
        </div>
      </div>
    </section>
  );
}
