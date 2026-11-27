# Sécurité

## En place (phase 3)
- Aucun secret dans le dépôt : `.env*` ignorés (sauf `.env.example`), clés serveur jamais préfixées `NEXT_PUBLIC_`.
- Modules serveur protégés par `server-only` (`lib/email.ts`, `lib/rate-limit.ts`).
- Formulaires (Server Actions) : validation et troncature côté serveur, champ piège anti-robot, limitation de débit par IP (5 messages / 10 min, 3 inscriptions newsletter).
- Rendu React (échappement XSS par défaut) ; JSON-LD sérialisé avec échappement de `<`.
- Aucun traceur tiers ni police distante ; consentement cookies enregistré avant tout futur outil d'analyse.
- Espaces privés exclus de l'indexation (`robots.ts`, `noindex` sur connexion/inscription).

## Prévu (phases 4 à 7)
| Mesure | Mise en œuvre |
|---|---|
| Authentification | Supabase Auth, e-mail vérifié, réinitialisation du mot de passe, sessions en cookies httpOnly |
| Routes privées | `proxy.ts` (redirection) **et** vérification serveur dans chaque page/action (`getUser()` + rôle) |
| Cloisonnement | RLS sur toutes les tables (voir `DATABASE_SCHEMA.md`) ; tests automatisés « un adhérent ne lit pas les données d'un autre » |
| Back-office | Rôle `admin` vérifié côté serveur, actions sensibles journalisées dans `audit_logs` |
| Paiement | Stripe Checkout (aucune donnée de carte chez nous) ; droits activés **uniquement** par le webhook signé (`stripe.webhooks.constructEvent`), idempotence par `event.id` |
| Vidéos | Lecture signée à durée limitée (Mux/Bunny/Cloudflare), aucune URL publique permanente |
| Ressources PDF | Bucket Supabase privé, URL signées après vérification des droits |
| Limitation | Passer à un stockage partagé (Upstash Redis) si plusieurs instances |
| En-têtes | CSP, `X-Frame-Options`, `Referrer-Policy`, HSTS via `next.config.ts` |
| Sauvegardes | Sauvegardes quotidiennes Supabase (plan Pro) ou export `pg_dump` planifié ; procédure de restauration testée |

## Signaler une faille
Contacter DamCompany. Ne pas ouvrir d'issue publique.
