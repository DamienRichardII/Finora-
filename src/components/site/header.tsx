"use client";
import { BRAND } from "@/config/brand";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { mainNav } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloque le scroll de la page quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open ? "border-white/10 bg-navy/95 backdrop-blur-md" : "border-transparent bg-navy",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link href="/" aria-label={`${BRAND.name}, retour à l'accueil`} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive(item.href) ? "text-gold" : "text-white/75 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href="/connexion" variant="outline-light" size="sm">
            Se connecter
          </ButtonLink>
          <ButtonLink href="/packs" size="sm">
            Nous rejoindre
          </ButtonLink>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-white lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      <div id="menu-mobile" hidden={!open} className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-navy lg:hidden">
        <Container className="flex flex-col gap-1 py-6">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-xl px-4 py-3.5 font-display text-lg font-semibold",
                isActive(item.href) ? "bg-white/5 text-gold" : "text-white/85",
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-6 grid gap-3">
            <ButtonLink href="/packs" size="lg" onClick={() => setOpen(false)}>
              Nous rejoindre
            </ButtonLink>
            <ButtonLink href="/connexion" variant="outline-light" size="lg" onClick={() => setOpen(false)}>
              Se connecter
            </ButtonLink>
          </div>
        </Container>
      </div>
    </header>
  );
}
