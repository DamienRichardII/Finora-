# Plenty — instructions agent

Nom officiel : **Plenty** (jamais « Plenty Academy »). Nom, accroches et concept de logo : `src/config/brand.ts` uniquement. Ne pas renommer les identifiants techniques historiques (`finora-consent-v1`, nom du paquet, URLs, dépôt).

Lis `Damcompany-code-guardrails.md` et `AGENTS.md` avant toute intervention.
Respecte strictement : modification chirurgicale, zéro régression, aucune refonte non demandée, réponses économes en tokens.

- Next.js 16 (App Router, Cache Components activés) : consulter `node_modules/next/dist/docs/` avant d'utiliser une API.
- Pas de `new Date()` sans argument dans un composant serveur (Cache Components) ; utiliser un composant client ou `connection()`.
- Contenus éditables : `src/content/*` (remplacés par Supabase en phase 4+). Ne jamais inventer de diplômes, avis, chiffres ou coordonnées.
- Tarifs = hypothèses de démonstration (voir `src/content/plans.ts`).
- Couleurs et typos : tokens dans `src/app/globals.css`, règles dans `BRAND_GUIDELINES.md`.
- Logo : régénérer avec `npm run brand` (`scripts/build-plenty-brand.mjs`, ne pas éditer les SVG à la main).
- Vérifier : `npm run lint && npm run build`, rendu mobile 390 px et desktop 1440 px.
