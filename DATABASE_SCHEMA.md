# Schéma de base de données (cible, phase 4)

PostgreSQL via Supabase. Toutes les tables ont `id uuid pk default gen_random_uuid()`, `created_at`, `updated_at` (trigger) sauf mention. RLS activée sur **toutes** les tables. Migrations versionnées dans `supabase/migrations/`, données de démonstration dans `supabase/seed.demo.sql` (jamais exécuté en production).

## Identité et rôles
| Table | Colonnes clés | Notes |
|---|---|---|
| `auth.users` | (Supabase) | e-mail vérifié obligatoire |
| `profiles` | `id = auth.users.id`, first_name, last_name, avatar_url, theme, marketing_consent | créé par trigger à l'inscription |
| `roles` | `key` (`member`, `admin`, `owner`) | |
| `user_roles` | user_id → profiles, role_key → roles | PK (user_id, role_key). Fonction `is_admin()` SECURITY DEFINER utilisée par les policies |

## Offres et commerce
| Table | Colonnes clés |
|---|---|
| `plans` | slug unique, name, description, price_cents, currency, interval (`one_time`/`month`/`year`), stripe_price_id, is_active, sort_order, is_highlighted |
| `plan_entitlements` | plan_id, entitlement (`course:all`, `workshops`, `replays`, `support`…) — unique (plan_id, entitlement) |
| `subscriptions` | user_id, plan_id, stripe_subscription_id unique, status, current_period_end, cancel_at_period_end |
| `orders` | user_id, plan_id, amount_cents, promo_code_id, referral_id, status (`pending`/`paid`/`failed`/`canceled`/`refunded`), stripe_checkout_session_id unique |
| `payments` | order_id, stripe_payment_intent_id unique, amount_cents, status, refunded_cents |
| `invoices` | user_id, stripe_invoice_id unique, number, amount_cents, pdf_url, issued_at |
| `promo_codes` | code unique (citext), percent_off / amount_off_cents, valid_from, valid_until, max_redemptions, redemptions, is_active, stripe_coupon_id |

## Formation (LMS)
| Table | Colonnes clés |
|---|---|
| `courses` | slug, title, description, is_published |
| `modules` | course_id, number, slug, title, summary, thumbnail_path, position, is_published |
| `lessons` | module_id, title, position, duration_seconds, is_free_preview |
| `videos` | lesson_id unique, provider, provider_asset_id, playback_policy (`signed`) |
| `resources` | module_id ou lesson_id, title, storage_path (bucket privé), required_entitlement |
| `user_progress` | user_id, lesson_id, position_seconds, completed_at, notes — PK (user_id, lesson_id) |
Extensions prévues : `quizzes`, `quiz_attempts`, `certificates`.

## Ateliers
| Table | Colonnes clés |
|---|---|
| `workshops` | slug, title, theme, starts_at timestamptz, duration_minutes, format, location, meeting_url (visible aux inscrits), seats_total, price_cents, required_entitlement, replay_video_id, status |
| `workshop_bookings` | workshop_id, user_id, status (`confirmed`/`canceled`/`waitlist`), order_id — unique (workshop_id, user_id). Places contrôlées par fonction transactionnelle `book_workshop()` |

## Parrainage
| Table | Colonnes clés |
|---|---|
| `referral_codes` | user_id unique, code unique |
| `referrals` | referrer_id, referee_id unique, code_id, status (`pending`/`qualified`/`rejected`), qualifying_order_id, ip_hash |
| `referral_rewards` | referral_id, beneficiary (`referrer`/`referee`), reward_type, value, status (`pending`/`granted`/`revoked`), granted_at |
Règles : un seul niveau ; auto-parrainage interdit (check referrer ≠ referee + même moyen de paiement) ; récompense créée uniquement par le webhook Stripe après paiement éligible ; paramètres dans `site_settings.referral`.

## Messagerie et notifications
| Table | Colonnes clés |
|---|---|
| `conversations` | member_id, subject, last_message_at, status |
| `messages` | conversation_id, sender_id, body (texte, échappé à l'affichage), read_at |
| `notifications` | user_id, type, title, body, link, read_at |

## Contenus et traçabilité
| Table | Colonnes clés |
|---|---|
| `reviews` | author_display_name, body, rating, is_published, consent_at, user_id |
| `site_settings` | key unique, value jsonb (textes du site, FAQ, conditions parrainage, coordonnées) |
| `audit_logs` | actor_id, action, entity, entity_id, metadata jsonb, ip_hash — insert seul, lecture admin |

## Index principaux
Clés étrangères indexées ; `subscriptions(user_id, status)`, `orders(user_id, created_at desc)`, `user_progress(user_id)`, `workshops(starts_at)`, `messages(conversation_id, created_at)`, `notifications(user_id) where read_at is null`.

## Politiques RLS (principe)
- Un adhérent lit/écrit **uniquement** ses lignes (`user_id = auth.uid()`) : profiles, user_progress, workshop_bookings, conversations/messages, notifications, referral_*.
- `orders`, `payments`, `subscriptions`, `invoices` : lecture propre, **écriture uniquement par le service role** (webhook Stripe).
- Contenus publiés (`plans`, `modules`, `workshops`, `reviews` publiés, `site_settings` publics) : lecture anonyme.
- `videos`, `resources` : aucune lecture directe ; accès via fonction serveur qui vérifie l'entitlement puis signe une URL temporaire.
- Admin (`is_admin()`) : lecture/écriture complète, chaque mutation journalisée dans `audit_logs`.
