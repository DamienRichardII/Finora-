# Roadmap

Légende : ✅ terminé · 🔜 prochaine étape · ⏳ à faire · 🔒 nécessite un accès ou une validation externe

## Phase 1 — Analyse ✅
Maquette analysée (FinEdu → FINORA Academy), règles DamCompany intégrées, périmètre contractuel/recommandé/optionnel défini (`PROJECT_BRIEF.md`).

## Phase 2 — Branding ✅ (validation client 🔒)
Logo et 19 déclinaisons SVG/PNG, favicon, image Open Graph, charte PDF, design system en code.

## Phase 3 — Site public ✅
Landing 12 sections + 16 pages (formations ×8 modules, packs, ateliers, parrainage, FAQ, contact, connexion, inscription, 4 pages légales), SEO technique, responsive, accessibilité de base.

## Phase 4 — Infrastructure 🔜 🔒 (compte Supabase)
Schéma + migrations + RLS, Supabase Auth (e-mail vérifié, mot de passe oublié), rôles, `proxy.ts`, contenus migrés de `src/content` vers la base.

## Phase 5 — Espace adhérent ⏳
Dashboard, mes formations, lecteur vidéo (reprise, progression, validation), ressources, profil, paramètres, mode sombre, navigation mobile type application. 🔒 Choix du fournisseur vidéo (comparatif Mux / Bunny Stream / Cloudflare Stream à présenter avant souscription).

## Phase 6 — Monétisation ⏳ 🔒 (Stripe test)
Récapitulatif de commande, codes promo/parrainage, CGV, Stripe Checkout, webhooks, activation des droits, échecs/annulations/remboursements, portail client, e-mail de bienvenue, parrainage (codes, liens, historique, récompenses après paiement).

## Phase 7 — Gestion ⏳
Back-office : adhérents (recherche, export CSV), modules/vidéos/ressources, packs et tarifs, ateliers et réservations, commandes, promotions, avis, FAQ, textes du site ; dashboard business (Recharts, filtres de dates) ; messagerie adhérent ↔ admin ; notifications.

## Phase 8 — Tests et livraison ⏳
Parcours, paiements test, droits d'accès et RLS, sécurité, responsive, Lighthouse > 90, rapport de tests, guide client finalisé, transmission des accès.

## Hors budget initial (à chiffrer)
Quiz, exercices, attestations, PWA, pièces jointes messagerie, intégration Zoom/Meet, anti-fraude avancé, multi-langue.
