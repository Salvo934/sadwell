export type CampaignSlide = {
  src: string;
  position?: string;
};

export type Campaign = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaHref: string;
  /** Immagine desktop */
  image?: string;
  /** Carosello hero mobile — loop automatico */
  carousel?: CampaignSlide[];
  /** Colore overlay per leggibilità del testo */
  overlay?: "light" | "dark";
};

/** Campagna attiva in hero — cambia `activeCampaignId` per ruotare le presentazioni */
export const activeCampaignId = "launch";

export const campaigns: Record<string, Campaign> = {
  launch: {
    id: "launch",
    title: "Indossare il silenzio",
    subtitle:
      "Sadwell nasce dall'incontro tra minimalismo e materia. Pezzi essenziali, pensati per durare.",
    cta: "Scopri il negozio",
    ctaHref: "/negozio",
    carousel: [
      {
        src: "/campaigns/launch-mobile.png",
        position: "center 20%",
      },
      {
        src: "/campaigns/hero-carousel-white.png",
        position: "center 20%",
      },
      {
        src: "/campaigns/hero-carousel-black.png",
        position: "center 18%",
      },
    ],
    overlay: "dark",
  },
};

export function getActiveCampaign(): Campaign {
  return campaigns[activeCampaignId] ?? campaigns.launch;
}
