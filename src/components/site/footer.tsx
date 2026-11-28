import { BRAND } from "@/config/brand";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { legalNav, mainNav, site } from "@/content/site";
import { NewsletterForm } from "./newsletter-form";

const useful = [
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Espace adhérent", href: "/connexion" },
  { label: "Créer un compte", href: "/inscription" },
];

export function Footer() {
  return (
    <footer className="bg-night text-white/70">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 font-display text-lg font-semibold text-white">{site.slogan}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed">{site.tagline}</p>
          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-white">Newsletter</p>
            <NewsletterForm />
          </div>
        </div>

        <nav aria-label="Navigation du pied de page" className="lg:col-span-2">
          <p className="mb-4 text-sm font-semibold text-white">Navigation</p>
          <ul className="space-y-2.5 text-sm">
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <p className="mb-4 text-sm font-semibold text-white">Liens utiles</p>
          <ul className="space-y-2.5 text-sm">
            {useful.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <p className="mb-4 text-sm font-semibold text-white">Contact</p>
          <Link href="/contact" className="inline-flex items-center gap-2 text-sm hover:text-gold">
            <Mail className="size-4 text-gold" /> {site.contact.email ?? "Écrire via le formulaire de contact"}
          </Link>
          {site.socials.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-3 text-sm">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-3 py-1.5 hover:border-gold hover:text-gold">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-white/55">{site.disclaimer}</p>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {site.name}. Tous droits réservés. {BRAND.name} n&apos;est ni une banque ni un établissement financier agréé.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
