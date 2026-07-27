import type { Size } from "@/data/products";
import { getShippingCost, getOrderTotal } from "@/lib/shipping";

export type CartItem = {
  productId: string;
  size: Size;
  quantity: number;
};

export function cartItemKey(productId: string, size: Size): string {
  return `${productId}:${size}`;
}

export function getCartSubtotal(
  items: CartItem[],
  getPrice: (productId: string) => number | undefined,
): number {
  return items.reduce((sum, item) => {
    const price = getPrice(item.productId);
    if (price === undefined) return sum;
    return sum + price * item.quantity;
  }, 0);
}

export function getCartTotals(
  items: CartItem[],
  getPrice: (productId: string) => number | undefined,
) {
  const subtotal = getCartSubtotal(items, getPrice);
  const shipping = getShippingCost(subtotal);
  const total = getOrderTotal(subtotal);

  return { subtotal, shipping, total };
}
