export type ProductImage = {
  src: string;
  fit?: "cover" | "contain";
  position?: string;
  /** Zoom immagine — default 1.2 su mobile */
  scale?: number;
  /** Sfondo dietro l'immagine (utile per flat-lay) */
  bg?: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  /** Placeholder colore — usato quando non c'è immagine */
  color: string;
  /** Immagine singola (legacy) */
  image?: string;
  /** Galleria prodotto — prima flat, poi modello */
  images?: ProductImage[];
  tag?: string;
  tone?: "light" | "dark";
};

export const products: Product[] = [
  {
    id: "tee-01",
    name: "Essential Tee",
    description: "Cotone pesante 240gsm, taglio oversize. Nero, logo tono su tono.",
    price: 45,
    color: "#e8e4df",
    images: [
      {
        src: "/products/essential-tee-flat.png",
        fit: "cover",
        position: "center 42%",
        scale: 1.08,
        bg: "#e8e8e8",
      },
      {
        src: "/products/essential-tee-model.png",
        fit: "cover",
        position: "center 22%",
        scale: 1,
      },
    ],
    tag: "Novità",
    tone: "light",
  },
  {
    id: "tee-02",
    name: "Essential Tee Bianco",
    description: "Cotone pesante 240gsm, taglio oversize. Bianco gesso, logo nero.",
    price: 45,
    color: "#f4f2ee",
    images: [
      {
        src: "/products/essential-tee-white-flat.png",
        fit: "cover",
        position: "center 42%",
        scale: 1.08,
        bg: "#e8e8e8",
      },
      {
        src: "/products/essential-tee-white-model.png",
        fit: "cover",
        position: "center 22%",
        scale: 1,
      },
    ],
    tone: "light",
  },
];

export function getProductImages(product: Product): ProductImage[] {
  if (product.images?.length) return product.images;
  if (product.image) return [{ src: product.image, fit: "cover", position: "center 22%" }];
  return [];
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}
