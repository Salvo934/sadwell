"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { CheckoutPaymentPreview } from "@/components/CheckoutPaymentPreview";
import { OrderSummary } from "@/components/OrderSummary";
import { ProductColorBadge } from "@/components/ProductColorBadge";
import { QuantityControl } from "@/components/QuantityControl";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";
import { Button } from "@/components/ui/Button";
import {
  formatPrice,
  getProductById,
  getProductImages,
  SIZES,
} from "@/data/products";

type PaymentStep =
  | null
  | { mode: "preview" }
  | { mode: "stripe"; clientSecret: string };

type CartCheckoutProps = {
  variant?: "page" | "drawer";
  onClose?: () => void;
};

const stripeEnabled = Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export function CartCheckout({ variant = "page", onClose }: CartCheckoutProps) {
  const router = useRouter();
  const { items, subtotal, shipping, total, removeItem, updateItemSize, updateItemQuantity } =
    useCart();
  const [paymentStep, setPaymentStep] = useState<PaymentStep>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isPage = variant === "page";

  useEffect(() => {
    if (!isPage || items.length === 0) {
      setPaymentStep(null);
      return;
    }

    if (!stripeEnabled) {
      setPaymentStep({ mode: "preview" });
      return;
    }

    let cancelled = false;

    async function initPayment() {
      setLoading(true);
      setError(null);
      setPaymentStep(null);

      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((item) => ({
              productId: item.productId,
              size: item.size,
              quantity: item.quantity,
            })),
          }),
        });

        const data = (await res.json()) as {
          clientSecret?: string;
          preview?: boolean;
          error?: string;
        };

        if (cancelled) return;

        if (!res.ok) {
          throw new Error(data.error ?? "Impossibile avviare il pagamento");
        }

        if (data.preview) {
          setPaymentStep({ mode: "preview" });
          return;
        }

        if (!data.clientSecret) {
          throw new Error("Impossibile avviare il pagamento");
        }

        setPaymentStep({ mode: "stripe", clientSecret: data.clientSecret });
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Qualcosa è andato storto",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    initPayment();

    return () => {
      cancelled = true;
    };
  }, [isPage, items]);

  if (items.length === 0) {
    return (
      <div
        className={
          isPage ? "mx-auto max-w-md px-6 py-32 text-center" : "p-6 text-center"
        }
      >
        <p className="type-label text-muted">Carrello</p>
        <h1
          className={`type-headline mt-4 ${isPage ? "text-3xl" : "text-2xl"}`}
        >
          Il carrello è vuoto
        </h1>
        <p className="type-body mt-4 text-muted">
          Scegli una taglia dal merch per aggiungere.
        </p>
        <Button href="/negozio" className="mt-8" onClick={onClose}>
          Vai al merch
        </Button>
      </div>
    );
  }

  return (
    <div
      className={
        isPage ? "mx-auto w-full max-w-lg px-6 py-28 md:py-32" : "flex flex-col"
      }
    >
      {isPage && (
        <a
          href="/negozio"
          className="type-label inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground"
        >
          ← Merch
        </a>
      )}

      <div className={isPage ? "mt-10" : "px-5 pt-5"}>
        <p className="type-label text-muted">Carrello</p>
        <h1
          className={`type-headline mt-2 leading-none ${
            isPage ? "text-[clamp(2rem,7vw,2.75rem)]" : "text-2xl"
          }`}
        >
          {isPage ? "Checkout" : "Il tuo ordine"}
        </h1>
      </div>

      <ul className={`space-y-3 ${isPage ? "mt-8" : "mt-5 px-5"}`}>
        {items.map((item) => {
          const product = getProductById(item.productId);
          if (!product) return null;

          const image = getProductImages(product)[0];
          const lineTotal = product.price * item.quantity;

          return (
            <li
              key={`${item.productId}-${item.size}`}
              className="flex gap-3 rounded-2xl border border-border bg-surface p-3"
            >
              <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-charcoal">
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image.src}
                    alt=""
                    className="h-full w-full object-cover"
                    style={{
                      objectPosition: image.position ?? "center center",
                    }}
                  />
                ) : (
                  <div
                    className="h-full w-full"
                    style={{ background: product.color }}
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="type-headline text-base leading-none">
                      {product.name}
                    </h2>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <ProductColorBadge
                        name={product.colorName}
                        swatch={product.colorSwatch}
                        size="sm"
                      />
                      <span className="type-body text-xs text-muted">
                        Taglia {item.size}
                      </span>
                    </div>
                  </div>
                  <p className="type-headline shrink-0 text-base">
                    {formatPrice(lineTotal)}
                  </p>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex gap-1">
                    {SIZES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() =>
                          updateItemSize(item.productId, item.size, s)
                        }
                        className={`min-w-7 rounded-full border px-2 py-1 font-sans text-[10px] font-medium ${
                          item.size === s
                            ? "border-foreground bg-foreground text-surface"
                            : "border-border text-muted"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <QuantityControl
                      value={item.quantity}
                      onChange={(qty) =>
                        updateItemQuantity(item.productId, item.size, qty)
                      }
                      min={1}
                      compact
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId, item.size)}
                      className="type-label text-[10px] text-muted underline-offset-2 hover:underline"
                    >
                      Rimuovi
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div
        className={`rounded-3xl border border-border bg-surface ${
          isPage ? "mt-8 p-6 md:p-8" : "mx-5 mt-5 p-5"
        }`}
      >
        <OrderSummary subtotal={subtotal} shipping={shipping} total={total} />

        {error && (
          <p className="type-body mt-4 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {isPage ? (
          <div className="mt-8 border-t border-border pt-8">
            <p className="type-label text-muted">Pagamento</p>
            <p className="type-body mt-1 text-sm text-muted">
              Email, indirizzo e carta per completare l&apos;ordine
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-background p-4 md:p-6">
              {loading && !paymentStep ? (
                <p className="type-body py-8 text-center text-sm text-muted">
                  Caricamento pagamento…
                </p>
              ) : paymentStep?.mode === "preview" ? (
                <CheckoutPaymentPreview
                  subtotal={subtotal}
                  shipping={shipping}
                  total={total}
                />
              ) : paymentStep?.mode === "stripe" ? (
                <StripeEmbeddedCheckout clientSecret={paymentStep.clientSecret} />
              ) : null}
            </div>

            <p className="type-label mt-4 text-center text-muted/80">
              Pagamento sicuro con Stripe · Spedizione in Italia
            </p>
          </div>
        ) : (
          <>
            <Button
              className="mt-5 w-full"
              onClick={() => {
                onClose?.();
                router.push("/carrello");
              }}
            >
              Paga in sicurezza · {formatPrice(total)}
              <span aria-hidden>→</span>
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="type-label mt-4 w-full text-center text-muted underline-offset-4 hover:text-foreground hover:underline"
            >
              Continua lo shopping
            </button>
          </>
        )}
      </div>
    </div>
  );
}
