"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { submitContact, type FormState } from "@/app/actions/forms";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const params = useSearchParams();
  const [state, action, pending] = useActionState<FormState, FormData>(submitContact, { status: "idle" });
  const err = state.fieldErrors ?? {};

  if (state.status === "success")
    return (
      <div role="status" className="flex flex-col items-center justify-center rounded-card bg-white p-10 text-center shadow-card">
        <CheckCircle2 className="size-12 text-gold-ink" />
        <p className="mt-4 font-display text-xl font-bold text-navy">{state.message}</p>
      </div>
    );

  return (
    <form action={action} noValidate className="grid gap-5 rounded-card bg-white p-6 shadow-card sm:grid-cols-2 sm:p-8">
      <Field label="Nom" htmlFor="name" error={err.name}>
        <input id="name" name="name" required autoComplete="name" className={inputClass} aria-invalid={!!err.name} />
      </Field>
      <Field label="E-mail" htmlFor="email" error={err.email}>
        <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} aria-invalid={!!err.email} />
      </Field>
      <Field label="Sujet" htmlFor="subject" className="sm:col-span-2">
        <input id="subject" name="subject" defaultValue={params.get("sujet") ?? ""} maxLength={160} className={inputClass} />
      </Field>
      <Field label="Message" htmlFor="message" error={err.message} className="sm:col-span-2">
        <textarea id="message" name="message" required rows={6} maxLength={5000} className={cn(inputClass, "h-auto py-3")} aria-invalid={!!err.message} />
      </Field>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm text-slate">
          <input type="checkbox" name="consent" className="mt-0.5 size-4 accent-[#101F2C]" />
          <span>
            J&apos;accepte que mes données soient utilisées pour répondre à ma demande, conformément à la{" "}
            <Link href="/confidentialite" className="font-medium text-navy underline underline-offset-2">
              politique de confidentialité
            </Link>
            .
          </span>
        </label>
        {err.consent && <p className="mt-1.5 text-xs text-red-700">{err.consent}</p>}
      </div>
      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl bg-ivory p-3 text-sm text-navy sm:col-span-2">
          {state.message}
        </p>
      )}
      <Button type="submit" size="lg" disabled={pending} className="sm:col-span-2 sm:justify-self-start">
        {pending ? "Envoi en cours…" : "Envoyer le message"}
      </Button>
    </form>
  );
}
