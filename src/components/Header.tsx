"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileMenu } from "@/components/MobileMenu";
import { Wordmark } from "@/components/Wordmark";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/negozio", label: "Negozio" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTransparent = isHome && !scrolled && !open;

  const headerClass = isTransparent
    ? "border-transparent bg-transparent"
    : isHome
      ? "border-b border-white/10 bg-charcoal/95 backdrop-blur-xl"
      : "border-b border-border bg-surface/85 backdrop-blur-xl";

  const textClass = isHome ? "text-white/90" : "text-foreground";
  const mutedClass = isHome
    ? "text-white/55 hover:text-white"
    : "text-muted hover:text-foreground";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerClass}`}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 md:px-10">
          <Wordmark variant={isHome ? "light" : "dark"} />

          <nav
            className="hidden items-center gap-10 md:flex"
            aria-label="Navigazione principale"
          >
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  data-active={active}
                  className={`nav-link font-sans text-[13px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                    active ? `${textClass} font-medium` : mutedClass
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/negozio"
            className={`hidden rounded-full px-5 py-2 font-sans text-[13px] font-medium tracking-wide transition-all duration-300 md:inline-flex ${
              isHome
                ? "border border-white/20 text-white hover:bg-white hover:text-foreground"
                : "bg-foreground text-surface hover:bg-foreground/90"
            }`}
          >
            Acquista
          </Link>

          <button
            type="button"
            className={`flex h-10 w-10 flex-col items-center justify-center gap-1.25 rounded-full transition-all duration-300 md:hidden ${
              open ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
            aria-label="Apri menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block h-px w-4.5 ${
                  isHome ? "bg-white" : "bg-foreground"
                }`}
              />
            ))}
          </button>
        </div>
      </header>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        isHome={isHome}
        pathname={pathname}
      />
    </>
  );
}
