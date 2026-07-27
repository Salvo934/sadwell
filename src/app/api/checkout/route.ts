import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getProductById } from "@/data/products";
import { getCartTotals, type CartItem } from "@/lib/cart";
import { isStripeConfigured } from "@/lib/stripe-config";
import { getStripe } from "@/lib/stripe";

type CheckoutItem = Pick<CartItem, "productId" | "size" | "quantity">;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { items?: CheckoutItem[] };
    const { items } = body;

    if (!items?.length) {
      return NextResponse.json({ error: "Carrello vuoto" }, { status: 400 });
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const item of items) {
      const product = getProductById(item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Prodotto non trovato: ${item.productId}` },
          { status: 404 },
        );
      }

      lineItems.push({
        quantity: item.quantity,
        price_data: {
          currency: "eur",
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.name,
            description: `${product.colorName} · Taglia ${item.size}`,
          },
        },
      });
    }

    const getPrice = (productId: string) => getProductById(productId)?.price;
    const { shipping } = getCartTotals(items, getPrice);

    if (shipping > 0) {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: Math.round(shipping * 100),
          product_data: {
            name: "Spedizione",
            description: "Spedizione in Italia",
          },
        },
      });
    }

    if (!isStripeConfigured()) {
      return NextResponse.json({ preview: true });
    }

    const origin =
      request.headers.get("origin") ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      "http://localhost:3000";

    const stripe = getStripe();

    const sessionParams = {
      mode: "payment",
      ui_mode: "embedded",
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ["IT"],
      },
      phone_number_collection: { enabled: true },
      metadata: {
        cart: JSON.stringify(items),
      },
      return_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    } as unknown as Stripe.Checkout.SessionCreateParams;

    const session = await stripe.checkout.sessions.create(sessionParams);

    if (!session.client_secret) {
      return NextResponse.json(
        { error: "Impossibile creare la sessione di pagamento" },
        { status: 500 },
      );
    }

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error("[checkout]", error);
    const message =
      error instanceof Error ? error.message : "Errore durante il checkout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
