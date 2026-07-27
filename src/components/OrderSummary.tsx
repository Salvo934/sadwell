import { formatPrice } from "@/data/products";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";

type OrderSummaryProps = {
  subtotal: number;
  shipping: number;
  total: number;
  showShippingNote?: boolean;
};

export function OrderSummary({
  subtotal,
  shipping,
  total,
  showShippingNote = true,
}: OrderSummaryProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between font-sans text-sm">
        <span className="text-muted">Subtotale</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="flex items-center justify-between font-sans text-sm">
        <span className="text-muted">Spedizione</span>
        <span>{shipping === 0 ? "Gratuita" : formatPrice(shipping)}</span>
      </div>
      {showShippingNote && shipping > 0 && (
        <p className="type-body text-xs text-muted">
          Spedizione gratuita sopra {formatPrice(FREE_SHIPPING_THRESHOLD)}
        </p>
      )}
      <div className="flex items-center justify-between border-t border-border pt-3">
        <span className="type-label text-muted">Totale</span>
        <span className="type-headline text-2xl">{formatPrice(total)}</span>
      </div>
    </div>
  );
}
