import Link from "next/link";
import { Info } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Monogram } from "@/components/brand/logo";

/**
 * Gabarit des pages de connexion / inscription.
 * L'authentification (Supabase Auth) est branchée en phase 4 : d'ici là les
 * champs sont désactivés et un message l'indique clairement.
 */
export function AuthShell({ title, description, children, footer }: { title: string; description: string; children: React.ReactNode; footer: React.ReactNode }) {
  return (
    <section className="py-12 sm:py-20">
      <Container className="grid max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-lift lg:grid-cols-2">
        <div className="bg-navy-grain relative hidden flex-col justify-between p-10 text-white lg:flex">
          <Monogram className="size-12" />
          <div>
            <p className="font-display text-3xl font-extrabold leading-tight">Comprendre. Maîtriser. Construire.</p>
            <p className="mt-4 text-white/65">Retrouvez vos formations, votre progression, vos ateliers et votre messagerie dans votre espace adhérent.</p>
          </div>
        </div>
        <div className="p-6 sm:p-10">
          <h1 className="text-3xl font-extrabold text-navy">{title}</h1>
          <p className="mt-2 text-slate">{description}</p>
          <p role="note" className="mt-6 flex gap-3 rounded-xl border border-gold/40 bg-gold/10 p-4 text-sm text-navy">
            <Info className="mt-0.5 size-4 shrink-0 text-gold-ink" />
            <span>
              L&apos;espace adhérent ouvre très prochainement. Une question ?{" "}
              <Link href="/contact" className="font-semibold underline underline-offset-2">
                Contactez-nous
              </Link>
              .
            </span>
          </p>
          <div className="mt-6">{children}</div>
          <div className="mt-6 text-sm text-slate">{footer}</div>
        </div>
      </Container>
    </section>
  );
}
