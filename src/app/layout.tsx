import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cooperBlack = localFont({
  src: "../../public/fonts/cooper-black.woff2",
  variable: "--font-cooper-black",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "sadwell",
    template: "%s | sadwell",
  },
  description: "Indossa ciò che senti. Sadwell.",
  openGraph: {
    title: "sadwell",
    description: "Indossa ciò che senti.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${dmSans.variable} ${cooperBlack.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
