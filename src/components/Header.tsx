"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CartButton } from "@/components/CartButton";
import { MobileMenu } from "@/components/MobileMenu";
import { ShippingBanner } from "@/components/ShippingBanner";
import { Wordmark } from "@/components/Wordmark";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/negozio", label: "Negozio" },
];

type HeaderBarProps = {
  pathname: string;
  open: boolean;
  onOpenMenu: () => void;
  isLightUI: boolean;
  textClass: string;
  mutedClass: string;
};

function HeaderBar({
  pathname,
  open,
  onOpenMenu,
  isLightUI,
  textClass,
  mutedClass,
}: HeaderBarProps) {
  return (
    <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 md:px-10">
      <Wordmark variant={isLightUI ? "light" : "dark"} />

      <div className="flex items-center gap-1 md:gap-2">
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

        <CartButton variant={isLightUI ? "light" : "dark"} />

        <button
          type="button"
          className={`flex h-10 w-10 flex-col items-center justify-center gap-1.25 rounded-full transition-all duration-300 md:hidden ${
            open ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          aria-label="Apri menu"
          aria-expanded={open}
          onClick={onOpenMenu}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block h-px w-4.5 ${isLightUI ? "bg-white" : "bg-foreground"}`}
            />
          ))}
        </button>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isNegozio = pathname === "/negozio";
  const showBanner = isHome || isNegozio;
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

  const isFloating = (isHome || isNegozio) && !scrolled && !open;
  const isSolidShell = (isHome || isNegozio) && scrolled && !open;
  const isDarkNav = isNegozio || (isHome && !isFloating);
  const isLightUI = isDarkNav || isFloating;

  const headerClass =
    isFloating || isSolidShell
      ? "border-transparent bg-transparent"
      : isDarkNav
        ? "border-b border-white/10 bg-charcoal"
        : "border-b border-border bg-surface";

  const textClass = isLightUI ? "text-white/90" : "text-foreground";
  const mutedClass = isLightUI
    ? "text-white/55 hover:text-white"
    : "text-muted hover:text-foreground";

  const headerBar = (
    <HeaderBar
      pathname={pathname}
      open={open}
      onOpenMenu={() => setOpen(true)}
      isLightUI={isLightUI}
      textClass={textClass}
      mutedClass={mutedClass}
    />
  );

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <div
          className={
            isSolidShell
              ? "border-b border-white/10 bg-charcoal"
              : undefined
          }
        >
          {showBanner && <ShippingBanner integrated={isHome || isNegozio} />}
          <header className={`transition-all duration-500 ${headerClass}`}>
            {headerBar}
          </header>
        </div>
      </div>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        isDark={isNegozio || isHome}
        pathname={pathname}
      />
    </>
  );
}
