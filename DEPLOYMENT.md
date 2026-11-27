# Déploiement

> Aucune mise en production, souscription payante ou transaction réelle sans accord écrit de Chris.

## Prérequis (comptes au nom de Chris, propriétaire)
1. **GitHub** : dépôt privé (DamCompany invité en collaborateur).
2. **Vercel** : projet relié au dépôt. Le plan Hobby est réservé à l'usage non commercial : prévoir le plan Pro pour un site qui vend.
3. **Nom de domaine** (à acheter par Chris), relié à Vercel.
4. **Resend** : domaine d'envoi vérifié (SPF, DKIM).
5. Phase 4+ : **Supabase** (région UE), **Stripe** (compte vérifié par Chris), fournisseur vidéo.

## Variables d'environnement
Voir `.env.example`. À saisir dans Vercel → Settings → Environment Variables (Production et Preview séparés ; clés Stripe **test** en Preview).
En production : `NEXT_PUBLIC_DEMO_MODE=false`, `NEXT_PUBLIC_SITE_URL=https://domaine-final`.

## Étapes
```bash
npm ci
npm run lint && npm run typecheck && npm run build
```
1. Pousser sur la branche principale → déploiement Vercel automatique.
2. Vérifier `/sitemap.xml`, `/robots.txt`, l'image de partage (`/og.png`) et le formulaire de contact.
3. Phase 6 : créer le webhook Stripe vers `https://domaine/api/stripe/webhook` et renseigner `STRIPE_WEBHOOK_SECRET`.

## Avant ouverture commerciale
- [ ] Documents juridiques complétés et validés par un professionnel
- [ ] Nom FINORA Academy vérifié (INPI) 
- [ ] Tarifs et packs validés par Chris
- [ ] Bandeau démo désactivé, aucun contenu fictif restant
- [ ] Paiement testé de bout en bout en mode test, puis un paiement réel de faible montant remboursé

## Transmission des accès
Tous les comptes sont créés avec l'e-mail professionnel de Chris (propriétaire). DamCompany y est invité avec un rôle de collaborateur, retiré en fin de maintenance. Aucun mot de passe n'est transmis par e-mail en clair.
