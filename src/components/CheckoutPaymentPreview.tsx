"use client";

import { OrderSummary } from "@/components/OrderSummary";

type CheckoutPaymentPreviewProps = {
  subtotal: number;
  shipping: number;
  total: number;
};

function Field({
  label,
  placeholder,
  half,
}: {
  label: string;
  placeholder: string;
  half?: boolean;
}) {
  return (
    <label className={`block ${half ? "" : "col-span-full"}`}>
      <span className="type-label mb-2 block text-muted">{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        disabled
        className="w-full rounded-xl border border-border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted/50"
      />
    </label>
  );
}

export function CheckoutPaymentPreview({
  subtotal,
  shipping,
  total,
}: CheckoutPaymentPreviewProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-dashed border-border bg-background/60 px-4 py-3">
        <p className="type-label text-muted">Anteprima checkout</p>
        <p className="type-body mt-1 text-sm text-muted">
          Aggiungi le chiavi Stripe in <code className="text-foreground">.env.local</code>{" "}
          per attivare i pagamenti reali.
        </p>
      </div>

      <div className="space-y-4">
        <Field label="Email" placeholder="nome@email.com" />
        <Field label="Nome e cognome" placeholder="Mario Rossi" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Indirizzo" placeholder="Via Roma 1" half />
          <Field label="Città" placeholder="Milano" half />
          <Field label="CAP" placeholder="20100" half />
          <Field label="Telefono" placeholder="+39 333 123 4567" half />
        </div>
      </div>

      <div className="space-y-4 border-t border-border pt-6">
        <p className="type-label text-muted">Carta</p>
        <Field label="Numero carta" placeholder="4242 4242 4242 4242" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Scadenza" placeholder="MM / AA" half />
          <Field label="CVC" placeholder="123" half />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background/60 p-4">
        <OrderSummary
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          showShippingNote={false}
        />
      </div>

      <button
        type="button"
        disabled
        className="w-full rounded-full bg-foreground/40 px-6 py-3.5 font-sans text-sm font-medium text-surface"
      >
        Completa ordine
      </button>
    </div>
  );
}
