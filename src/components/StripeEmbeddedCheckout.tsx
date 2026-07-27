"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { getStripeClient } from "@/lib/stripe-client";

type StripeEmbeddedCheckoutProps = {
  clientSecret: string;
};

export function StripeEmbeddedCheckout({
  clientSecret,
}: StripeEmbeddedCheckoutProps) {
  return (
    <EmbeddedCheckoutProvider
      stripe={getStripeClient()}
      options={{ clientSecret }}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}
