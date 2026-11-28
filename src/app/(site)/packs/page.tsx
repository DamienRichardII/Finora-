import { BRAND } from "@/config/brand";
import type { Metadata } from "next";
import { CreditCard, RefreshCcw, ShieldCheck, Tag } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FaqList } from "@/components/sections/faq-list";
import { Pricing } from "@/components/sections/pricing";

export const metadata: Metadata = {
  title: "Packs et tarifs",
  description: `Comparez les packs ${BRAND.name} : Découverte, Essentiel et Premium. Formations vidéo, ateliers collectifs et accompagnement pédagogique.`,
  alternates: { canonical: "/packs" },
};

const guarantees = [
  { icon: ShieldCheck, title: "Paiement sécurisé", text: `Paiement prévu via Stripe. Vos données bancaires ne sont jamais stockées par ${BRAND.name}.` },
  { icon: CreditCard, title: "Carte, Apple Pay, Google Pay", text: "Selon la compatibilité de votre appareil." },
  { icon: Tag, title: "Codes promo et parrainage", text: "Saisissez votre code lors du récapitulatif de commande." },
  { icon: RefreshCcw, title: "Résiliation encadrée", text: "Conditions de résiliation et droit de rétractation détaillés dans les CGV." },
];

export default function PacksPage() {
  return (
    <>
      <Pricing headingAs="h1" />
      <section className="py-20">
        <Container className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-card border border-navy/[0.06] bg-white p-6">
              <Icon className="size-6 text-gold-ink" />
              <p className="mt-4 font-display font-bold text-navy">{title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">{text}</p>
            </div>
          ))}
        </Container>
      </section>
      <div className="bg-white">
        <FaqList />
      </div>
    </>
  );
}
