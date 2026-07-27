import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Carrello",
  description: "Il tuo carrello Sadwell.",
};

export default function CartPage() {
  return <CartView />;
}
