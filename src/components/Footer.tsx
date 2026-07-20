import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/negozio", label: "Negozio" },
];

const contactLinks = [
  { href: "mailto:info@sadwell.it", label: "info@sadwell.it", external: false },
  {
    href: "https://instagram.com",
    label: "Instagram",
    external: true,
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal text-white grain">
      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-16 md:px-10 md:pb-12 md:pt-24">
        {/* Top */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <LogoMark size="xl" className="mx-auto bg-white md:mx-0" />

          <Link
            href="/"
            className="type-headline mt-8 text-[clamp(2.5rem,8vw,4rem)] text-white transition-opacity hover:opacity-80"
          >
            sadwell
          </Link>

          <p className="type-body mx-auto mt-5 max-w-md text-sm text-white/55 md:mx-0 md:text-base">
            Pezzi essenziali per chi preferisce il silenzio al rumore.
            Made in Italy, pensati per durare.
          </p>

          <Link
            href="/negozio"
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-white transition-all hover:border-white/40 hover:bg-white/10"
          >
            Scopri il negozio
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Links */}
        <div className="mt-16 grid grid-cols-2 gap-10 border-t border-white/10 pt-12 text-center sm:grid-cols-3 md:mt-20 md:text-left">
          <div>
            <p className="type-label text-white/35">Naviga</p>
            <ul className="mt-5 space-y-3 font-sans text-sm">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="footer-link text-white/70 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="type-label text-white/35">Contatti</p>
            <ul className="mt-5 space-y-3 font-sans text-sm">
              {contactLinks.map(({ href, label, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="footer-link text-white/70 transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <p className="type-label text-white/35">Newsletter</p>
            <p className="type-body mx-auto mt-5 max-w-xs text-sm text-white/45 md:mx-0">
              Prossimamente — resta aggiornato sulle nuove uscite.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center gap-5 border-t border-white/10 pt-8 text-center md:mt-16 md:flex-row md:items-end md:justify-between md:text-left">
          <p className="font-sans text-xs text-white/35">
            © {new Date().getFullYear()} sadwell. Tutti i diritti riservati.
          </p>
          <p className="type-headline text-lg text-white/80 md:text-xl">
            Indossare il silenzio
          </p>
        </div>
      </div>

      {/* Watermark */}
      <p
        aria-hidden
        className="type-headline pointer-events-none absolute bottom-[-0.12em] left-1/2 w-full -translate-x-1/2 select-none text-center text-[clamp(4rem,18vw,11rem)] leading-none text-white/3"
      >
        sadwell
      </p>
    </footer>
  );
}
