# Plenty

Plateforme d'éducation financière de Chris, conçue et développée par **DamCompany** (devis n°107 du 16/11/2026).

> **Comprendre. Maîtriser. Construire.** — Maîtrisez votre argent, construisez votre avenir.

## État actuel

| Phase | Statut |
|---|---|
| 1. Analyse et plan | ✅ Terminée — voir `ROADMAP.md` |
| 2. Branding (logo, déclinaisons, charte, design system) | ✅ Terminée — proposition à valider par Chris |
| 3. Site public multipage | ✅ Terminée — 17 pages, contenus provisoires identifiés |
| 4. Infrastructure (Supabase, auth, rôles, RLS) | ⏳ Nécessite la création des comptes Supabase |
| 5 à 8 | ⏳ Voir `ROADMAP.md` |

Ce qui fonctionne réellement aujourd'hui et ce qui reste simulé ou à brancher est détaillé dans `CHANGELOG.md`.

## Démarrer

```bash
npm install
cp .env.example .env.local   # compléter si besoin, le site fonctionne sans
npm run dev                  # http://localhost:3000
```

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` / `npm start` | Build et serveur de production |
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript |
| `npm run brand` | Régénère logos SVG/PNG, favicons et image Open Graph |

## Stack

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 · Lucide · polices auto-hébergées (Manrope, Inter).
Prévu : Supabase (PostgreSQL, Auth, Storage, RLS) · Stripe (Checkout, Billing, webhooks) · Resend · Recharts · Vercel.

## Documentation

- `PROJECT_BRIEF.md` : besoin client et périmètre contractuel
- `BRAND_GUIDELINES.md` : charte graphique Plenty (fichiers : `public/branding/plenty/`, configuration : `src/config/brand.ts`)
- `docs/REBRANDING_PLENTY.md` : rapport du rebranding, tests et procédure de renommage externe
- `ARCHITECTURE.md` : organisation du code et choix techniques
- `DATABASE_SCHEMA.md` : modèle de données cible
- `SECURITY.md` : mesures de sécurité
- `DEPLOYMENT.md` : mise en ligne et transmission des accès
- `CLIENT_GUIDE.md` : guide pour Chris et checklist des informations à fournir
- `ROADMAP.md` / `CHANGELOG.md`
- `Damcompany-code-guardrails.md` + `CLAUDE.md` : règles pour les agents IA
