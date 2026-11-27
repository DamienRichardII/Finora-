import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/field";
import { AuthShell } from "@/components/site/auth-shell";

export const metadata: Metadata = { title: "Connexion", robots: { index: false }, alternates: { canonical: "/connexion" } };

export default function LoginPage() {
  return (
    <AuthShell
      title="Se connecter"
      description="Accédez à votre espace adhérent FINORA Academy."
      footer={
        <>
          Pas encore de compte ?{" "}
          <Link href="/packs" className="font-semibold text-navy underline underline-offset-2">
            Choisir un pack
          </Link>
        </>
      }
    >
      <fieldset disabled className="grid gap-4">
        <Field label="E-mail" htmlFor="email">
          <input id="email" type="email" autoComplete="email" className={inputClass} />
        </Field>
        <Field label="Mot de passe" htmlFor="password">
          <input id="password" type="password" autoComplete="current-password" className={inputClass} />
        </Field>
        <Button type="submit" size="lg" className="mt-2 w-full">
          Se connecter
        </Button>
      </fieldset>
    </AuthShell>
  );
}
