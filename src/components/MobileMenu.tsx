"use client";

import Link from "next/link";
import { useEffect } from "react";
import { LogoMark } from "@/components/LogoMark";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  isDark: boolean;
  pathname: string;
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/negozio", label: "Negozio" },
];

export function MobileMenu({
  open,
  onClose,
  isDark,
  pathname,
}: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const dark = isDark;

  return (
    <div
      className={`fixed inset-0 z-55 md:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* Sfondo opaco — copre completamente la hero */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        } ${dark ? "bg-[#0a0a0a]" : "bg-[#f4f2ee]"}`}
      />

      <div
        className={`absolute inset-0 backdrop-blur-2xl transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        } ${dark ? "bg-black/40" : "bg-white/50"}`}
      />

      <div
        className={`absolute left-5 top-5 z-20 transition-all duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <LogoMark
          size="lg"
          onClick={onClose}
          className={dark ? "bg-white" : "bg-foreground"}
        />
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Chiudi menu"
        className={`absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${
          dark
            ? "border border-white/15 bg-white/10 text-white hover:bg-white/20"
            : "border border-foreground/10 bg-foreground/5 text-foreground hover:bg-foreground/10"
        } ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden
          className="shrink-0"
        >
          <path
            d="M4 4L14 14M14 4L4 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <nav
        className={`relative z-10 flex h-full flex-col items-center justify-center px-8 transition-all duration-500 ease-out ${
          open ? "scale-100 opacity-100" : "scale-[0.98] opacity-0"
        }`}
        aria-label="Navigazione mobile"
      >
        <ul className="flex w-full max-w-sm flex-col gap-2">
          {navLinks.map(({ href, label }, i) => {
            const active = pathname === href;
            return (
              <li
                key={href}
                className="mobile-menu-item overflow-hidden"
                style={{ animationDelay: `${i * 90 + 120}ms` }}
                data-open={open}
              >
                <Link
                  href={href}
                  onClick={onClose}
                  className={`group relative flex items-center gap-5 py-4 transition-all duration-500 ${
                    active
                      ? dark
                        ? "text-white"
                        : "text-foreground"
                      : dark
                        ? "text-white/55 hover:text-white/85"
                        : "text-foreground/45 hover:text-foreground/75"
                  }`}
                >
                  <span
                    className={`type-label shrink-0 transition-colors duration-500 ${
                      active
                        ? dark
                          ? "text-white/60"
                          : "text-muted"
                        : dark
                          ? "text-white/35"
                          : "text-foreground/30"
                    }`}
                  >
                    0{i + 1}
                  </span>

                  <span className="type-headline text-[clamp(2.75rem,12vw,3.75rem)] leading-none">
                    {label}
                  </span>

                  <span
                    aria-hidden
                    className={`ml-auto text-lg transition-all duration-500 ${
                      active
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                    }`}
                  >
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <p
          className={`type-label mobile-menu-item mt-16 tracking-[0.35em] ${
            dark ? "text-white/35" : "text-muted/70"
          }`}
          style={{ animationDelay: "320ms" }}
          data-open={open}
        >
          Indossare il silenzio
        </p>
      </nav>

      <p
        aria-hidden
        className={`type-headline pointer-events-none absolute bottom-0 left-1/2 z-0 w-full -translate-x-1/2 translate-y-[28%] select-none text-center text-[clamp(5rem,28vw,9rem)] leading-none transition-opacity duration-500 ${
          open ? "opacity-[0.05]" : "opacity-0"
        } ${dark ? "text-white" : "text-foreground"}`}
      >
        sadwell
      </p>
    </div>
  );
}
