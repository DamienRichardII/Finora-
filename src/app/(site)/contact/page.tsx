import { BRAND } from "@/config/brand";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, MessageSquareText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contactez ${BRAND.name} pour toute question sur les formations, les ateliers ou votre inscription.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Parlons de votre projet d'apprentissage" description="Une question sur les formations, un atelier ou votre inscription ? Envoyez-nous un message." />
      <section className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-4">
            <div className="flex gap-4 rounded-card bg-white p-6 shadow-card">
              <MessageSquareText className="size-6 shrink-0 text-gold-ink" />
              <div>
                <p className="font-display font-bold text-navy">Adhérents</p>
                <p className="mt-1 text-sm text-slate">Utilisez la messagerie de votre espace adhérent pour un suivi plus rapide.</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-card bg-white p-6 shadow-card">
              <Clock className="size-6 shrink-0 text-gold-ink" />
              <div>
                <p className="font-display font-bold text-navy">Délai de réponse</p>
                <p className="mt-1 text-sm text-slate">Nous répondons à chaque message, en général sous quelques jours ouvrés.</p>
              </div>
            </div>
          </div>
          <Suspense fallback={<div className="h-[560px] rounded-card bg-white shadow-card" />}>
            <ContactForm />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
