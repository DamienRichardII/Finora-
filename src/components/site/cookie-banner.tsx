"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export const CONSENT_KEY = "finora-consent-v1";
export type Consent = { analytics: boolean; date: string };

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export function saveConsent(analytics: boolean) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics, date: new Date().toISOString() }));
  } catch {
    /* stockage indisponible : le bandeau réapparaîtra */
  }
  window.dispatchEvent(new Event("finora-consent"));
}

/**
 * Bandeau de consentement. Le site ne dépose aujourd'hui aucun traceur non
 * essentiel ; le choix est enregistré pour conditionner un futur outil d'analyse.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sync = () => setVisible(readConsent() === null);
    sync();
    window.addEventListener("finora-consent", sync);
    return () => window.removeEventListener("finora-consent", sync);
  }, []);

  if (!visible) return null;

  return (
    <div role="dialog" aria-live="polite" aria-label="Gestion des cookies" className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl border border-navy/10 bg-white p-5 shadow-lift sm:bottom-5">
      <p className="text-sm leading-relaxed text-slate">
        Nous utilisons uniquement des cookies nécessaires au fonctionnement du site. Avec votre accord, nous pourrons mesurer l&apos;audience de façon anonyme pour améliorer FINORA Academy.{" "}
        <Link href="/cookies" className="font-medium text-navy underline underline-offset-2">
          En savoir plus
        </Link>
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button variant="outline-dark" size="sm" onClick={() => saveConsent(false)}>
          Refuser
        </Button>
        <Button size="sm" onClick={() => saveConsent(true)}>
          Accepter
        </Button>
      </div>
    </div>
  );
}
