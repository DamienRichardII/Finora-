"use server";

import { headers } from "next/headers";
import { sendEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export type FormState = { status: "idle" | "success" | "error"; message?: string; fieldErrors?: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NOT_CONFIGURED =
  "L'envoi de messages n'est pas encore activé sur cette version de démonstration. Il le sera dès que l'adresse e-mail professionnelle de FINORA Academy sera configurée.";

async function clientKey(scope: string) {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "local";
  return `${scope}:${ip}`;
}

const field = (fd: FormData, name: string, max: number) => String(fd.get(name) ?? "").trim().slice(0, max);

export async function submitContact(_: FormState, fd: FormData): Promise<FormState> {
  // Champ piège anti-robot : rempli uniquement par les bots.
  if (field(fd, "website", 200)) return { status: "success", message: "Merci, votre message a bien été envoyé." };

  const name = field(fd, "name", 120);
  const email = field(fd, "email", 200);
  const subject = field(fd, "subject", 160);
  const message = field(fd, "message", 5000);
  const consent = fd.get("consent") === "on";

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2) fieldErrors.name = "Indiquez votre nom.";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Adresse e-mail invalide.";
  if (message.length < 10) fieldErrors.message = "Votre message est trop court.";
  if (!consent) fieldErrors.consent = "Votre accord est nécessaire pour traiter votre demande.";
  if (Object.keys(fieldErrors).length) return { status: "error", message: "Merci de corriger les champs indiqués.", fieldErrors };

  if (!rateLimit(await clientKey("contact"))) return { status: "error", message: "Trop de messages envoyés. Réessayez dans quelques minutes." };

  const res = await sendEmail({
    subject: `[Contact FINORA] ${subject || "Nouveau message"}`,
    text: `Nom : ${name}\nE-mail : ${email}\nSujet : ${subject}\n\n${message}`,
    replyTo: email,
  });
  if (!res.ok) return { status: "error", message: res.reason === "not_configured" ? NOT_CONFIGURED : "L'envoi a échoué. Merci de réessayer plus tard." };
  return { status: "success", message: "Merci, votre message a bien été envoyé. Nous vous répondrons rapidement." };
}

export async function subscribeNewsletter(_: FormState, fd: FormData): Promise<FormState> {
  if (field(fd, "website", 200)) return { status: "success", message: "Merci pour votre inscription." };
  const email = field(fd, "email", 200);
  if (!EMAIL_RE.test(email)) return { status: "error", message: "Adresse e-mail invalide." };
  if (!rateLimit(await clientKey("newsletter"), 3)) return { status: "error", message: "Trop de tentatives. Réessayez plus tard." };

  // Phase 7 : enregistrement en base (double opt-in). En attendant, notification à l'équipe si l'e-mail est configuré.
  const res = await sendEmail({ subject: "[FINORA] Nouvelle inscription newsletter", text: `Adresse : ${email}` });
  if (!res.ok)
    return {
      status: "error",
      message: res.reason === "not_configured" ? "La newsletter sera ouverte au lancement de FINORA Academy." : "L'inscription a échoué. Réessayez plus tard.",
    };
  return { status: "success", message: "Merci, votre inscription est enregistrée." };
}
