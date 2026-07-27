import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Checkout annullato",
  robots: { index: false },
};

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 py-32 text-center">
      <p className="type-label text-muted">Checkout</p>
      <h1 className="type-headline mt-4 text-[clamp(2.5rem,8vw,3.5rem)] leading-none">
        Pagamento annullato
      </h1>
      <p className="type-body mt-5 text-muted">
        Nessun addebito. Puoi riprovare quando vuoi.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button href="/carrello">Riprova</Button>
        <Button href="/carrello" variant="ghost">
          Carrello
        </Button>
      </div>
    </div>
  );
}
