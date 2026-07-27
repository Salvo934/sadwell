import { formatPrice } from "@/data/products";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";

export const bannerMessages = [
  {
    id: "shipping",
    label: `Spedizione gratuita sopra ${formatPrice(FREE_SHIPPING_THRESHOLD)} · Italia`,
  },
  {
    id: "returns",
    label: "Reso entro 14 giorni",
  },
  {
    id: "payments",
    label: "Apple Pay · Google Pay · Klarna",
  },
  {
    id: "guest-checkout",
    label: "Compri senza registrarti",
  },
] as const;

export const paymentMethods = [
  { id: "stripe", label: "Stripe" },
  { id: "visa", label: "Visa" },
  { id: "mastercard", label: "Mastercard" },
  { id: "amex", label: "Amex" },
  { id: "apple-pay", label: "Apple Pay" },
  { id: "google-pay", label: "Google Pay" },
  { id: "klarna", label: "Klarna" },
] as const;

export type Review = {
  id: string;
  quote: string;
  author: string;
  location: string;
  date: string;
  rating: number;
};

export const reviews: Review[] = [
  {
    id: "review-01",
    quote:
      "Cotone pesante sul serio, non solo sulla descrizione. Taglio oversize come lo immaginavo. La metto continuamente.",
    author: "Marco R.",
    location: "Milano",
    date: "2026-07-18",
    rating: 5,
  },
  {
    id: "review-02",
    quote:
      "Arrivata in 3 giorni a Roma. Scatola semplice ma fatta bene. La bianca è identica alle foto, niente tono grigio strano.",
    author: "Giulia M.",
    location: "Roma",
    date: "2026-07-03",
    rating: 5,
  },
  {
    id: "review-03",
    quote:
      "Minimal e comoda. Dopo un mese di lavaggi a 30° tiene ancora la forma. Finalmente niente effetto maglietta da 10 euro.",
    author: "Luca B.",
    location: "Torino",
    date: "2026-06-21",
    rating: 5,
  },
  {
    id: "review-04",
    quote:
      "Ho preso la nera e non la tolgo più. Tessuto spesso, cuciture pulite, zero sorprese in lavatrice.",
    author: "Elena V.",
    location: "Firenze",
    date: "2026-06-08",
    rating: 5,
  },
  {
    id: "review-05",
    quote:
      "Taglia L oversize vera. Sopra una felpa leggera ci sta benissimo, non tira e non accartoccia.",
    author: "Andrea P.",
    location: "Bologna",
    date: "2026-05-24",
    rating: 5,
  },
  {
    id: "review-06",
    quote:
      "Spedizione velocissima. Pacco curato, niente riempitivo inutile. Si capisce che ci tengono.",
    author: "Sara C.",
    location: "Napoli",
    date: "2026-05-11",
    rating: 5,
  },
  {
    id: "review-07",
    quote:
      "Ho preso nero e bianco. Il bianco regge bene, nessun ingiallimento per ora (sono a 5-6 lavaggi).",
    author: "Matteo F.",
    location: "Padova",
    date: "2026-04-27",
    rating: 5,
  },
  {
    id: "review-08",
    quote:
      "Al tatto si sente subito che non è fast fashion. Spessore giusto, collo che non si deforma.",
    author: "Chiara D.",
    location: "Verona",
    date: "2026-04-14",
    rating: 5,
  },
  {
    id: "review-09",
    quote:
      "Oversize vero, non quella cosa finta. Spalle cadenti e lunghezza ok anche per me che sono 1,88.",
    author: "Davide L.",
    location: "Bari",
    date: "2026-03-29",
    rating: 5,
  },
  {
    id: "review-10",
    quote:
      "Regalo per mio fratello, gli è piaciuta tantissimo. Ha detto che è la maglietta più consistente che ha.",
    author: "Francesca N.",
    location: "Palermo",
    date: "2026-03-12",
    rating: 5,
  },
  {
    id: "review-11",
    quote:
      "Checkout veloce, niente giri strani. Con due tee ho avuto la spedizione gratis senza pensarci.",
    author: "Roberto S.",
    location: "Genova",
    date: "2026-02-26",
    rating: 5,
  },
  {
    id: "review-12",
    quote:
      "Dal vivo il nero è ancora più bello che online. Colore uniforme, niente alone sulle cuciture.",
    author: "Valentina G.",
    location: "Trieste",
    date: "2026-02-09",
    rating: 5,
  },
  {
    id: "review-13",
    quote:
      "Terza maglietta Sadwell per me. Stessa qualità della prima, nessuna delusione.",
    author: "Simone T.",
    location: "Parma",
    date: "2026-01-22",
    rating: 5,
  },
  {
    id: "review-14",
    quote:
      "Portata tutto il giorno sotto il sole a Catania. Non appiccica e non sembra carta sottile.",
    author: "Ilaria Z.",
    location: "Catania",
    date: "2025-12-18",
    rating: 5,
  },
  {
    id: "review-15",
    quote:
      "Collo robusto e maniche lunghe come piacciono a me. Brand poco urlato ma fatto bene.",
    author: "Federico A.",
    location: "Modena",
    date: "2025-11-30",
    rating: 5,
  },
  {
    id: "review-16",
    quote:
      "Arrivata in 2 giorni. La M veste ampia ma non enorme. Forse avrei preso S se la volevo meno oversize, però va bene.",
    author: "Martina H.",
    location: "Bergamo",
    date: "2025-11-07",
    rating: 4,
  },
  {
    id: "review-17",
    quote:
      "Basic che non sembra cheap. Jeans, cargo, tutto ci sta. La uso praticamente ogni settimana.",
    author: "Alessio K.",
    location: "Perugia",
    date: "2025-10-19",
    rating: 5,
  },
  {
    id: "review-18",
    quote:
      "Packaging essenziale, zero plastica inutile. Per me conta parecchio e qui hanno fatto centro.",
    author: "Beatrice O.",
    location: "Brescia",
    date: "2025-09-28",
    rating: 5,
  },
  {
    id: "review-19",
    quote:
      "Il bianco ha un tono caldo, non stuccato. Perfetta sotto giacca leggera.",
    author: "Nicola U.",
    location: "Rimini",
    date: "2025-08-14",
    rating: 5,
  },
  {
    id: "review-20",
    quote:
      "Avevo dubbi sulla taglia ma è andata bene al primo colpo. Reso semplice da gestire, anche se non l'ho usato.",
    author: "Paola W.",
    location: "Lecce",
    date: "2025-07-02",
    rating: 5,
  },
  {
    id: "review-21",
    quote:
      "Cuciture dritte, tessuto che non si allarga dopo due lavaggi. Si capisce che dura, non è usa e getta.",
    author: "Tommaso Y.",
    location: "Pisa",
    date: "2025-05-16",
    rating: 5,
  },
  {
    id: "review-22",
    quote:
      "Prezzo ok per la qualità che ricevi. Non è la più economica, però si vede il perché. Comunque consigliata.",
    author: "Giorgia Q.",
    location: "Venezia",
    date: "2025-03-08",
    rating: 4,
  },
];
