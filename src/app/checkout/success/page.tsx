import type { Metadata } from "next";
import { ClearCartOnSuccess } from "@/components/ClearCartOnSuccess";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Ordine confermato",
  robots: { index: false },
};

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 py-32 text-center">
      <ClearCartOnSuccess />
      <p className="type-label text-muted">Grazie</p>
      <h1 className="type-headline mt-4 text-[clamp(2.5rem,8vw,3.5rem)] leading-none">
        Ordine confermato
      </h1>
      <p className="type-body mt-5 text-muted">
        Riceverai un&apos;email di conferma con i dettagli della spedizione.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button href="/negozio">Continua lo shopping</Button>
        <Button href="/" variant="ghost">
          Home
        </Button>
      </div>
    </div>
  );
}
