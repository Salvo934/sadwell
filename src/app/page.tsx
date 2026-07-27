import { Hero } from "@/components/Hero";
import { HomeProductCarousel } from "@/components/HomeProductCarousel";
import { HomeTrust } from "@/components/HomeTrust";
import { ShopCheckoutBar } from "@/components/ShopCheckoutBar";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeProductCarousel />
      <HomeTrust />
      <ShopCheckoutBar />
    </>
  );
}
