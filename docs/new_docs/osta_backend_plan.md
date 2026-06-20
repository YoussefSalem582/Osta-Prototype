# Osta (أسطى) — Backend Plan (Laravel + Filament)

> Backend-only plan for the Osta marketplace. The two client apps (B2C, B2B) stay
> in **Flutter** and consume this backend over a JSON API. Operations (admin) is a
> **Filament web panel** — no separate Admin app. Derived from `Osta_SRS_AR_v2.1`.

## 1. Stack

| Layer | Choice |
|---|---|
| Framework | Laravel 11 (PHP 8.3) |
| Database | PostgreSQL 16 + **PostGIS** |
| Auth (API) | Laravel **Sanctum** (token); OTP via SMS provider |
| RBAC | `spatie/laravel-permission` (customer / shop_owner / mechanic / admin) |
| Geospatial | `clickbar/laravel-magellan` (PostGIS) |
| Payments | Laravel **Cashier** (Stripe) |
| Realtime | Laravel **Reverb** (WebSockets) + Redis; Flutter via `pusher_channels_flutter` |
| Queues/Jobs | Redis queue + Laravel Scheduler |
| Storage | S3-compatible (private + public buckets), signed URLs |
| Push | FCM via Laravel Notifications channel |
| Admin/Ops | **Filament 3** (web) |
| Hosting | Laravel Forge/Cloud or Vapor; managed Postgres (Neon/RDS) |
| CI/CD | GitHub Actions (test → build → deploy) |

## 2. High-level architecture

```
Flutter B2C ─┐
Flutter B2B ─┼─ HTTPS/REST(JSON) ─▶ Laravel API ─▶ PostgreSQL + PostGIS
Filament ops ┘ (web)                   │  Redis (queue + Reverb scaling)
                                       ├─ Reverb (WSS)  → realtime channels
                                       ├─ Queue workers → jobs (hold, payouts…)
                                       ├─ Scheduler     → SLA, reminders, retention
                                       └─ Stripe · FCM · Maps · SMS
```

## 3. Project structure (modular, mirrors SRS Clean-Arch intent §7.2)

```
app/
  Domain/{Auth,Vehicle,Center,Booking,Payment,Review,Maintenance,Notification}/
    Models/  Actions/  DTOs/  Events/  Jobs/  Policies/
  Http/Controllers/Api/{B2C, B2B}/      # thin controllers → Actions
  Http/Requests/  Http/Resources/
  Filament/Resources/                    # ops console
  Support/Geo/                           # PostGIS helpers
routes/api.php  routes/channels.php  routes/console.php
database/migrations/  database/seeders/  database/factories/
```

## 4. Data model (12 entities, §6)

`User · ServiceCenter · Service · Booking · Vehicle · MaintenanceRecord · Review ·
Payment · Invoice · Notification · Promotion · Expense`

Key fields/notes:
- `service_centers.location GEOGRAPHY(POINT)` + **GiST index**; `working_hours JSONB`;
  `center_type/subscription_tier/commission_rate`; `is_verified`.
- `bookings.status` ENUM `pending→confirmed→in_progress→completed→cancelled→invoiced`;
  `hold_expires_at` (10-min hold).
- Soft deletes on `vehicles`, `services`. UUID PKs throughout.

## 5. API routes (`routes/api.php`, prefix `/api`, Sanctum-guarded except auth)

### Auth & profile (FR-1.x)
```
POST   /auth/register                 # email or phone
POST   /auth/otp/request              # send OTP (phone)
POST   /auth/otp/verify
POST   /auth/login
POST   /auth/logout
POST   /auth/refresh
POST   /auth/password/forgot
POST   /auth/password/reset
GET    /me                            # profile
PUT    /me                            # edit profile, language_preference
POST   /me/avatar
GET    /me/addresses   POST /me/addresses   PUT /me/addresses/{id}   DELETE /me/addresses/{id}
```

### Vehicles — B2C (FR-5.x)
```
GET    /vehicles
POST   /vehicles
GET    /vehicles/{id}
PUT    /vehicles/{id}
DELETE /vehicles/{id}                 # soft delete
POST   /vehicles/{id}/primary
```

### Discovery / map — B2C (FR-2.x, FR-3.x)
```
GET    /centers/nearby                # ?lat&lng&radius&service&price&rating&open_now&verified  (PostGIS)
GET    /centers/search                # ?q=&type=
GET    /centers/{id}                  # profile
GET    /centers/{id}/services
GET    /centers/{id}/reviews
GET    /centers/{id}/availability     # ?date=  → open slots
```

### Bookings — B2C (FR-4.x)
```
POST   /bookings                      # create + 10-min hold (Edge-equivalent job)
POST   /bookings/{id}/confirm
GET    /bookings                      # ?status=upcoming|past
GET    /bookings/{id}
PATCH  /bookings/{id}/reschedule
POST   /bookings/{id}/cancel
POST   /bookings/{id}/review          # post-service rating (FR-3.3)
```

### Payments & invoices (FR-4.3, FR-14.x)
```
POST   /payments/intent               # Stripe PaymentIntent
POST   /payments/{booking}/confirm
GET    /invoices/{id}                 # PDF link
POST   /webhooks/stripe               # public, signature-verified
```

### Maintenance tracker — B2C (FR-6.x)
```
GET    /vehicles/{id}/maintenance
POST   /vehicles/{id}/maintenance     # manual entry + receipt upload
GET    /vehicles/{id}/maintenance/export   # PDF (Phase 2 share)
```

### Notifications & devices (FR-19.x)
```
GET    /notifications
POST   /notifications/{id}/read
POST   /devices                       # register FCM token
DELETE /devices/{token}
```

### B2B — onboarding (FR-9.x), prefix `/business`
```
POST   /business/register
POST   /business/documents            # upload to private bucket
PUT    /business/profile
PUT    /business/capacity             # slots, breaks, holidays
GET    /business/verification-status
```

### B2B — operations (FR-4.6/4.7, FR-10.x, FR-11.x)
```
GET    /business/bookings             # today/calendar feed
PATCH  /business/bookings/{id}/accept
PATCH  /business/bookings/{id}/reject # with reason
PATCH  /business/bookings/{id}/status
PATCH  /business/bookings/{id}/assign-mechanic
GET    /business/dashboard            # live counters, revenue
GET    /business/calendar             # ?from&to
GET    /business/kpis
GET    /business/analytics
GET    /business/services   POST /business/services   PUT /business/services/{id}   DELETE /business/services/{id}
POST   /business/promotions  PUT /business/promotions/{id}  DELETE /business/promotions/{id}
POST   /business/reviews/{id}/reply
POST   /business/reviews/{id}/report
```

> **Phase 2+** (stub later): CRM, expenses/fuel tracker, smart reminders,
> commission payouts, subscription tiers, emergency/roadside tracking.

## 6. Realtime channels (`routes/channels.php`, Reverb)
```
private  centers.{centerId}     # new booking → B2B dashboard (FR-4.6, FR-10.1)
private  bookings.{bookingId}   # status changes → customer (FR-4.7)
private  users.{userId}         # personal notifications
private  tracking.{bookingId}   # live ETA / GPS stream (Phase 4, UC8)
```
Events: `BookingCreated`, `BookingStatusUpdated`, `DriverLocationUpdated`.

## 7. Filament ops console (web, `/admin`)
- **Verification Queue** — review docs (zoom/download), approve/reject/request-info, 24–48h SLA (FR-16).
- **Disputes** — investigate, refund (partial/full), warn/suspend center (FR-17).
- **Payouts** — compute (revenue − commission − refunds), batch process (FR-18, Phase 2).
- **Moderation** — reviews/photos reports (FR §"مراجعة المحتوى").
- **Read/manage:** Users, Service Centers, Bookings.

## 8. Background jobs & scheduler
| Job | Trigger | Purpose |
|---|---|---|
| `ReleaseExpiredBookingHold` | dispatched +10 min | free slot if unconfirmed (FR-4.1) |
| `VerificationSlaReminder` | scheduled hourly | flag overdue >48h (FR-9.5/16.3) |
| `SendMaintenanceReminders` | scheduled daily | km/time reminders (FR-7, Phase 2) |
| `ProcessPayoutCycle` | scheduled weekly | B2B payouts (FR-18, Phase 2) |
| `EnforceDataRetention` | scheduled daily | GDPR retention rules (§6.4) |

## 9. Security (§5.2)
- Sanctum tokens (short-lived) + refresh; `flutter_secure_storage` on client.
- RBAC via Spatie; per-record authorization via **Policies/Gates** (app-layer RLS).
- TLS 1.3; bcrypt; Stripe tokenization (no card data stored); 3D Secure.
- Form Request validation on every endpoint; parameterized queries; signed URLs
  for private files; Stripe webhook signature verification; idempotency keys on payments.

## 10. Environments & deploy (§13)
- Envs: `dev` / `staging` / `prod` (separate DB + Reverb + buckets).
- GitHub Actions: `composer install` → `php artisan test` (Pest) → static analysis
  (PHPStan/Larastan) → deploy (Forge/Vapor). Migrations gated on deploy.
- Queue workers + Reverb daemon under Supervisor/systemd (or Vapor equivalents).

## 11. To-do list

### Sprint 0 — setup
- [ ] Laravel 11 project, PostgreSQL + PostGIS, Redis, S3 buckets (public/private).
- [ ] Install Sanctum, spatie/permission, laravel-magellan, Cashier, Reverb, Filament.
- [ ] CI pipeline (test + PHPStan); `.env` per environment; seeders/factories.
- [ ] Base modular structure + roles seeded.

### Milestone 1 — Auth & users (FR-1)
- [ ] Register (email/phone), OTP request/verify, login/logout/refresh.
- [ ] Password reset; profile + avatar + addresses + language.
- [ ] RBAC roles + middleware; channel auth scaffolding.

### Milestone 2 — Discovery core (FR-2, FR-3) ← highest risk, do early
- [ ] `service_centers` migration with `GEOGRAPHY(POINT)` + GiST index.
- [ ] `GET /centers/nearby` PostGIS query + filters; assert p95 < 200ms (seed 50–500).
- [ ] Center profile, services, reviews, availability endpoints.

### Milestone 3 — Booking + payments (FR-4, FR-14) ← highest risk
- [ ] `bookings` schema + state machine; `POST /bookings` with 10-min hold + `ReleaseExpiredBookingHold` job; concurrency/race test.
- [ ] Confirm/reschedule/cancel with policy + refund rules.
- [ ] Stripe via Cashier: intent, confirm, webhook, invoice PDF, commission calc.
- [ ] B2B accept/reject/status/assign-mechanic.

### Milestone 4 — Realtime (FR-4.6, FR-10)
- [ ] Reverb up; channels + auth; broadcast `BookingCreated` / `BookingStatusUpdated`.
- [ ] B2B live dashboard feed; measure latency.

### Milestone 5 — B2B onboarding + catalog (FR-9, FR-11) & Vehicles/Maintenance (FR-5, FR-6)
- [ ] Business register, document upload, capacity, verification-status.
- [ ] Services/promotions CRUD; catalog reflects to B2C.
- [ ] Vehicles CRUD (soft delete, primary); maintenance auto + manual + PDF export.

### Milestone 6 — Filament ops console (FR-16/17/18, moderation)
- [ ] Verification Queue (approve/reject/request-info + email notifications).
- [ ] Disputes, Payouts (Phase 2), Moderation; read views for users/centers/bookings.

### Milestone 7 — Notifications & hardening (FR-19, §5)
- [ ] FCM device registration + Notification channel; in-app inbox; email templates (bilingual).
- [ ] Data-retention scheduler; backups; rate limiting; audit logging; load test (100+ concurrent, p95 < 500ms).

### Phase 2+ (backlog)
- [ ] CRM, expenses/fuel tracker, smart reminders, subscription tiers + automated payouts, emergency/roadside live tracking (`tracking.{bookingId}` + `DriverLocationUpdated`).

## 12. Validation (definition of done per milestone)
- Feature tests (Pest) green; PHPStan clean.
- M2: nearby p95 < 200ms. M3: no double-book under concurrency; Stripe webhook idempotent.
- M4: Reverb event delivered to subscribed B2B client. M6: Filament approve → center appears via `nearby`.
