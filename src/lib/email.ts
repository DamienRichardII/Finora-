import "server-only";

/**
 * Envoi d'e-mails transactionnels via l'API Resend.
 * Tant que RESEND_API_KEY et CONTACT_TO_EMAIL ne sont pas configurés, aucun
 * e-mail n'est envoyé et l'appelant reçoit `not_configured` (jamais de faux succès).
 */
export async function sendEmail(opts: { subject: string; text: string; replyTo?: string; to?: string }) {
  const key = process.env.RESEND_API_KEY;
  const to = opts.to ?? process.env.CONTACT_TO_EMAIL;
  const from = process.env.EMAIL_FROM;
  if (!key || !to || !from) return { ok: false as const, reason: "not_configured" as const };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject: opts.subject, text: opts.text, reply_to: opts.replyTo }),
  });
  return res.ok ? { ok: true as const } : { ok: false as const, reason: "provider_error" as const };
}
