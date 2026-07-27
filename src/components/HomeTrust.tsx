import { HomePayments } from "@/components/HomePayments";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";

export function HomeTrust() {
  return (
    <>
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <ReviewsCarousel />
        </div>
      </section>

      <HomePayments />
    </>
  );
}
