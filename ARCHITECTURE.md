# Architecture

## Choix techniques
| Besoin | Choix | Raison |
|---|---|---|
| Framework | Next.js 16 App Router, Cache Components | SEO (pages statiques pré-rendues), Server Actions, déploiement Vercel |
| Style | Tailwind CSS 4 + composants maison style shadcn (`cva`) | Pas de dépendance Radix tant qu'aucun composant complexe n'en a besoin |
| Animations | IntersectionObserver + CSS (`Reveal`) | ~25 lignes au lieu de Framer Motion (~40 Ko) ; Framer Motion pourra être ajouté pour l'espace adhérent si utile |
| Polices | `@fontsource-variable` | Auto-hébergement, aucune requête tierce |
| Données | `src/content/*.ts` typés | Source unique en attendant Supabase ; même forme que les futures tables |
| E-mails | Resend via `fetch` (sans SDK) | Une seule route d'envoi, désactivée proprement sans clé |

## Arborescence
```
src/
  app/
    layout.tsx               racine (polices, métadonnées, lang="fr")
    (site)/                  site public : header, footer, bandeau démo, cookies
      page.tsx               landing (12 sections)
      a-propos, formations, formations/[slug], packs, ateliers, parrainage,
      faq, contact, connexion, inscription,
      mentions-legales, confidentialite, cgv, cookies
    actions/forms.ts         Server Actions : contact, newsletter (validation, anti-robot, limitation)
    sitemap.ts, robots.ts, icon.svg, apple-icon.png, not-found.tsx
  components/
    brand/                   logo et monogramme
    ui/                      primitives (bouton, conteneur, champ, badge, reveal)
    site/                    header, footer, bannières, gabarits auth et légal, JSON-LD
    sections/                sections réutilisées entre landing et pages internes
  content/                   site, modules, packs, ateliers, FAQ
  lib/                       utilitaires, e-mail, limitation de débit
scripts/build-brand.mjs      génération des logos (opentype.js + sharp)
brand/charte.html            source de la charte PDF
```

## Rendu
Toutes les pages publiques sont pré-rendues statiquement (`○` au build). Les modules `/formations/[slug]` sont générés via `generateStaticParams`. Les seuls éléments dynamiques côté client sont le menu mobile, le bandeau cookies, la lecture du paramètre `?pack=` / `?sujet=` (sous `Suspense`) et les formulaires.

## Évolution prévue (phases 4 à 7)
```
app/
  (auth)/connexion, inscription, mot-de-passe   Supabase Auth (e-mail vérifié)
  (espace)/espace/...                          adhérent, protégé par proxy.ts + vérification serveur
  (admin)/admin/...                            back-office, rôle admin vérifié côté serveur + RLS
  paiement/, paiement/confirmation             Stripe Checkout
  api/stripe/webhook/route.ts                  seule source de vérité pour activer les droits
lib/supabase/{server,client}.ts
lib/entitlements.ts                            droits par pack (plan_entitlements)
```
`src/content/*` sera remplacé par des lectures Supabase mises en cache (`"use cache"` + `cacheTag`, invalidées depuis l'admin).
