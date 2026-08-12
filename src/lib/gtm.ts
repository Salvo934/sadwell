import type { Product, Size } from "@/data/products";

export type DataLayerEvent = Record<string, unknown>;

export type Ga4EcommerceItem = {
  item_id: string;
  item_name: string;
  item_variant: string;
  price: number;
  quantity: number;
};

export function pushToDataLayer(event: DataLayerEvent) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push(event);
}

function buildGa4EcommerceItem(
  product: Product,
  size: Size,
  quantity: number,
): Ga4EcommerceItem {
  return {
    item_id: product.id,
    item_name: product.name,
    item_variant: size,
    price: product.price,
    quantity,
  };
}

export function pushAddToCartEvent(
  product: Product,
  size: Size,
  quantity: number,
) {
  pushToDataLayer({
    event: "add_to_cart",
    ecommerce: {
      currency: "EUR",
      value: product.price * quantity,
      items: [buildGa4EcommerceItem(product, size, quantity)],
    },
  });
}

export function pushRemoveFromCartEvent(
  product: Product,
  size: Size,
  quantity: number,
) {
  pushToDataLayer({
    event: "remove_from_cart",
    ecommerce: {
      currency: "EUR",
      value: product.price * quantity,
      items: [buildGa4EcommerceItem(product, size, quantity)],
    },
  });
}
