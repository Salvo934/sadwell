export const FREE_SHIPPING_THRESHOLD = 39.99;
export const SHIPPING_COST = 5.99;

export function getShippingCost(subtotal: number): number {
  return subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

export function formatShipping(subtotal: number): string {
  return getShippingCost(subtotal) === 0 ? "Gratuita" : "€ 5,99";
}

export function getOrderTotal(subtotal: number): number {
  return subtotal + getShippingCost(subtotal);
}
