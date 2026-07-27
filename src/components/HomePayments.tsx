import { formatPrice } from "@/data/products";
import { paymentMethods } from "@/data/trust";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";

function LockIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      className="text-white/80"
      aria-hidden
    >
      <path
        d="M6 10V7C6 4.791 7.791 3 10 3H12C14.209 3 16 4.791 16 7V10"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <rect
        x="4"
        y="10"
        width="14"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      className="text-white/80"
      aria-hidden
    >
      <path
        d="M3 15H4.5M4.5 15H14M4.5 15L6 7H15L17 15M14 15H18M18 15H19M14 15V12.5H17"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="16.5" r="1.25" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="16" cy="16.5" r="1.25" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      className="text-white/80"
      aria-hidden
    >
      <rect
        x="3"
        y="5"
        width="16"
        height="12"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path d="M3 9H19" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M6.5 14H9"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HomePayments() {
  return (
    <section
      className="border-t border-white/10 bg-charcoal"
      aria-label="Pagamenti e spedizione"
    >
      <div className="mx-auto max-w-5xl px-6 py-10 md:py-12">
        <ul className="grid gap-0 md:grid-cols-3 md:divide-x md:divide-white/10">
          <li className="flex flex-col items-center border-b border-white/10 px-2 py-6 text-center md:border-b-0 md:py-2 md:pr-8">
            <LockIcon />
            <p className="type-label mt-4 text-white/50">Pagamento sicuro</p>
            <p className="type-body mt-2 max-w-60 text-sm leading-relaxed text-white/65">
              Checkout Stripe cifrato. Non salviamo i dati della carta.
            </p>
          </li>

          <li className="flex flex-col items-center border-b border-white/10 px-2 py-6 text-center md:border-b-0 md:px-8 md:py-2">
            <CardIcon />
            <p className="type-label mt-4 text-white/50">Metodi accettati</p>
            <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
              {paymentMethods.map((method, index) => (
                <span key={method.id} className="inline-flex items-center gap-3">
                  {index > 0 && (
                    <span aria-hidden className="font-normal text-white/25">
                      ·
                    </span>
                  )}
                  {method.label}
                </span>
              ))}
            </p>
          </li>

          <li className="flex flex-col items-center px-2 py-6 text-center md:py-2 md:pl-8">
            <TruckIcon />
            <p className="type-label mt-4 text-white/50">Spedizione & resi</p>
            <p className="type-body mt-2 max-w-60 text-sm leading-relaxed text-white/65">
              Gratuita sopra {formatPrice(FREE_SHIPPING_THRESHOLD)} in Italia.
              Reso entro 14 giorni.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
