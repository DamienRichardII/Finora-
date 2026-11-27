import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/field";
import { AuthShell } from "@/components/site/auth-shell";
import { SelectedPlan } from "./selected-plan";

export const metadata: Metadata = { title: "Créer un compte", robots: { index: false }, alternates: { canonical: "/inscription" } };

export default function SignupPage() {
  return (
    <AuthShell
      title="Créer mon compte"
      description="Première étape avant le récapitulatif de commande et le paiement sécurisé."
      footer={
        <>
          Déjà adhérent ?{" "}
          <Link href="/connexion" className="font-semibold text-navy underline underline-offset-2">
            Se connecter
          </Link>
        </>
      }
    >
      <Suspense fallback={null}>
        <SelectedPlan />
      </Suspense>
      <fieldset disabled className="grid gap-4 sm:grid-cols-2">
        <Field label="Prénom" htmlFor="firstName">
          <input id="firstName" autoComplete="given-name" className={inputClass} />
        </Field>
        <Field label="Nom" htmlFor="lastName">
          <input id="lastName" autoComplete="family-name" className={inputClass} />
        </Field>
        <Field label="E-mail" htmlFor="email" className="sm:col-span-2">
          <input id="email" type="email" autoComplete="email" className={inputClass} />
        </Field>
        <Field label="Mot de passe" htmlFor="password" className="sm:col-span-2">
          <input id="password" type="password" autoComplete="new-password" className={inputClass} />
        </Field>
        <Button type="submit" size="lg" className="mt-2 w-full sm:col-span-2">
          Continuer vers le récapitulatif
        </Button>
      </fieldset>
    </AuthShell>
  );
}
