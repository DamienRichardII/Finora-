"use client";

import { useActionState } from "react";
import { ArrowRight } from "lucide-react";
import { subscribeNewsletter, type FormState } from "@/app/actions/forms";

export function NewsletterForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(subscribeNewsletter, { status: "idle" });
  return (
    <form action={action} className="w-full">
      <label htmlFor="newsletter-email" className="sr-only">
        Votre adresse e-mail
      </label>
      <div className="flex rounded-full border border-white/15 bg-white/5 p-1 focus-within:border-gold">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Votre e-mail"
          className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
        />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <button
          type="submit"
          disabled={pending}
          aria-label="S'inscrire à la newsletter"
          className="inline-flex size-10 items-center justify-center rounded-full bg-gold text-navy transition hover:bg-gold-light disabled:opacity-60"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
      <p aria-live="polite" className={state.status === "error" ? "mt-2 text-xs text-gold-light" : "mt-2 text-xs text-white/60"}>
        {state.message ?? "Conseils pédagogiques et nouveautés. Désinscription en un clic."}
      </p>
    </form>
  );
}
