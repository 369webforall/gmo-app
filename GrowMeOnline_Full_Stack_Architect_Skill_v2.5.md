# GrowMeOnline Full-Stack Architect Skill v2.5

> **Status:** Master engineering specification  
> **Version:** 2.5  
> **Updated:** 24 November 2026  
> **Product:** GrowMeOnline (GMO)  
> **Primary market:** South Africa  
> **Architecture:** Modular monolith, Next.js App Router, TypeScript, PostgreSQL and Prisma  
> **Purpose:** Guide all AI-assisted and human development of GrowMeOnline. This version makes a lean, human-operated, MVP-first launch the default delivery strategy, incorporates Kandua and Snupit customer-journey lessons plus Bark marketplace benchmarks, and preserves GMO's approved commercial, technical and operational rules.

---

## v2.2 change summary — 24 November 2026

This release adds an MVP-first delivery and validation layer based on the latest GrowMeOnline website-development brief and a review of the public customer/supplier journeys of Kandua and Snupit.

Key decisions:

- Launch a simple, mobile-first customer journey before building a complete self-service marketplace.
- First audit the existing website and repository; extend the current platform if it is sound, and rebuild only when a documented technical/product case supports doing so.
- Prioritize category/location discovery, a short adaptive enquiry flow, secure admin operations, PostgreSQL-backed enquiry records, deterministic supplier matching and human-confirmed dispatch.
- Keep PostgreSQL and the application as the production source of truth. Google Sheets or Airtable may be used for temporary research, exports or analysis, but not as a parallel production database.
- Defer customer accounts, supplier self-service dashboards, online payments and advanced AI matching until the pilot demonstrates demand and operational readiness.
- Keep secure admin authentication and authorization in the MVP. Deferring supplier/customer account experiences does not mean deferring admin security.
- Treat Kandua as the primary customer-experience reference, Snupit as an operational lead-flow reference and Bark as an additional marketplace benchmark. Do not copy competitor pricing, guarantees, vetting claims or commercial terms.
- Preserve the approved GMO commercial baseline: five free qualified lead assignments, then either ZAR 200/month or ZAR 1,200/year, with no commission and no per-lead charge. Payment collection can be deferred during the pilot only under an explicitly approved pilot entitlement policy; do not silently bypass quota rules.
- Add explicit customer contact verification, channel-specific consent, supplier availability confirmation per enquiry, Facebook/social acquisition experiments and measurable pilot exit criteria.

The v2.1 requirements remain in force unless this version explicitly prioritizes or qualifies their implementation timing. This is a prioritization update, not permission to discard security, privacy, data integrity or business invariants.

---

### v2.4 change summary — 25 November 2026

This release evolves GMO's strategic positioning from a lead-generation directory toward a customer acquisition and conversion service for South African small businesses. It uses the user's supplied business plan and a public review of RemodelBoom as a strategic benchmark, while preserving the MVP-first delivery approach and existing safety/business invariants.

Key decisions:
- Position GMO around the outcome: **“We find customers. We follow up. We help you grow.”** Explain this in plain language to small businesses; do not sell a website or software as the primary outcome.
- Keep the supplier directory, local SEO, category/location discovery and guided enquiry flow as customer-acquisition channels and the foundation of the MVP.
- Make follow-up and conversion measurement part of the operating process from the pilot: record contact attempts, supplier response, appointment/quote progression and reported won/lost outcomes. Start with human-operated follow-up.
- Treat reactivation of a supplier's existing/dormant lead database as a later, separately consented service line inspired by RemodelBoom. It is not an MVP feature and must not be launched until data rights, POPIA roles, lawful contact basis, channel permissions, suppression/opt-out, attribution and revenue-share terms are approved.
- Do not copy RemodelBoom's US revenue-share promise, claims, sales guarantees or commercial terms. GMO must prove its own South African economics and delivery capacity.
- Approved supplier subscription choices: R1,200 per year or R200 month-to-month. The monthly option is a lower-commitment way for a supplier to try GMO before choosing the annual plan. Both follow the five-free-qualified-assignment baseline, subject to the approved entitlement policy, and neither introduces commission or per-lead fees. Monthly and annual billing terms, cancellation, tax and renewal rules must be explicit before checkout.
- Do not implement a pure pay-on-sale/revenue-share model in the MVP. It requires reliable sale attribution, customer/supplier reporting, dispute rules, auditability and legal/commercial agreements.
- Corrected document metadata: this file is v2.4. The previous v2.3 file had an inherited front-matter version mismatch; v2.4 resolves it.

### v2.3 change summary — 24 November 2026

This release records the GrowMeOnline visual identity observed in the user-provided screenshot of the live homepage on 24 November 2026. The palette below is sampled/estimated from the screenshot, not extracted from the site's source CSS. Treat it as the current implementation reference and verify against the official logo/source assets and computed browser styles during the Phase 0 website audit.

- Primary brand teal: `#135858` (RGB 19, 88, 88), sampled from the main CTA and teal headline text.
- Deep navy text: `#020618` (RGB 2, 6, 24), sampled from the main dark headline text.
- Muted blue-grey text: `#62748E` (RGB 98, 116, 142), sampled from body/supporting text.
- Logo lime: `#ABC945` (RGB 171, 201, 69), sampled from the logo's lime accent.
- Main background: `#FFFFFF`, visually white in the screenshot.
- Suggested subtle border/surface neutral: `#E8EEF0` / `#F7F9FA`; these are design recommendations, not confirmed sampled brand colors.
- Green success/check states: use an accessible semantic green; do not treat the WhatsApp floating-action icon's green as a core GMO brand color.

The screenshot shows a clean white layout, dark navy typography, teal headings and primary buttons, blue-grey supporting text, and a lime accent in the logo. Preserve this visual direction. Do not revert to the older generic `#0F172A` / `#0D9488` / `#10B981` palette as the canonical brand palette.

## How to use this skill

Use this document whenever designing or implementing GrowMeOnline features, including:

- Product and architecture decisions.
- Database models, migrations and seed data.
- Next.js pages, layouts, Server Actions, Route Handlers and API integrations.
- Authentication, authorization and account management.
- Supplier onboarding, directory search and business pages.
- Enquiries, qualification, matching, dispatch and lead tracking.
- Subscriptions, payment processing and quota management.
- Admin workflows, analytics, notifications and automation.
- Testing, deployment, monitoring and maintenance.

Treat this document as the canonical product and engineering reference. If a request conflicts with a business invariant in this document, explain the conflict before implementing it. Do not silently bypass a business rule for convenience.

### Source-of-truth and change control

1. The business model and operational rules in this document are the product requirements.
2. The checked-in database schema, migrations and application code must agree with this document.
3. When implementation reveals a necessary change, propose the change and its impact before altering a canonical rule.
4. Record accepted changes in this skill and in the relevant architecture decision record (ADR).
5. Do not invent missing commercial, legal or operational policy. Mark it as an open decision and ask the product owner.
6. Do not assume a third-party provider supports a payment method, recurring billing feature, WhatsApp template or webhook behavior until verified for the actual GMO merchant account and environment.

---

# 1. Product and business context

GrowMeOnline is a two-sided South African lead-generation marketplace and digital business directory. It connects:

- **Clients:** people or organizations looking for products or services.
- **Suppliers:** small businesses that provide relevant products or services.
- **GMO operations team:** staff who verify suppliers, review enquiries, qualify leads and oversee distribution.

GMO does not perform the supplier's work and does not act as the contractor. It helps suppliers become discoverable and connects them with potential customers through qualified enquiries.

## 1.1 Strategic positioning

GrowMeOnline is evolving toward a **customer acquisition and conversion service for South African small businesses**, supported by a local supplier directory and enquiry marketplace.

Customer-facing promise:
- **“Find trusted local service providers.”**

Supplier-facing promise:
- **“We find customers. We follow up. We help you grow.”**

The supplier-facing promise describes the longer-term service direction. During the MVP, GMO must describe only the services it can actually deliver: business discovery/listing, enquiry capture, human review, suitable supplier introductions and recorded follow-up. Do not imply guaranteed customers, sales, appointments or revenue.

The directory is an acquisition channel and trust/discovery layer, not the entire long-term product. The wider operating service may include enquiry qualification, supplier/customer follow-up, conversion tracking and, later, managed reactivation of a supplier's existing lead database.

## 1.1 GMO creates value by

1. Building a relevant supplier network.
2. Attracting genuine customer demand.
3. Capturing and reviewing enquiries.
4. Qualifying enquiries and matching them with suitable suppliers.
5. Distributing leads through the platform and approved communication channels.
6. Helping suppliers respond, win work and convert from free access to paid subscriptions.

## 1.2 Six continuous business stages

These stages must be reflected in the product, admin workflows, analytics and automation.

### Stage 1 — Supplier identification and acquisition

Find potential businesses by service and location, organize and verify publicly available business information, prioritize prospects, conduct compliant outreach and invite suitable businesses to register.

### Stage 2 — Supplier registration, onboarding and conversion

Account creation → business profile wizard → submission → administrative review → approval and verification → public listing and promotional business page → first five free qualified lead assignments → annual paid subscription.

### Stage 3 — Client needs and acquisition

Understand local demand, attract clients through useful content, search engine optimization, social media and advertising, and guide them to submit genuine enquiries.

### Stage 4 — Marketing and client attraction

Publish useful content and location/category landing pages, support supplier sharing and QR promotion, measure visits and conversions, and improve the journey from discovery to enquiry.

### Stage 5 — Enquiry processing and lead distribution

Capture → validate → detect spam and duplicates → admin review → qualify or reject → match → admin-confirmed dispatch → notify suppliers → track supplier response and outcome.

### Stage 6 — Business model

The current business model is supplier subscription revenue:

- First **5 qualified lead assignments** are free for an eligible supplier, under the approved free-quota policy.
- After the free allowance, suppliers may choose either **R1,200 per year** or **R200 per month**.
- The monthly plan is intended as a lower-commitment entry option for suppliers who are not ready to commit to the annual plan. They can try GMO month-to-month and later choose the annual plan.
- The annual plan costs the equivalent of R100/month when paid for the year; compared with twelve monthly payments (R2,400), the annual plan represents a 50% lower nominal annual cost. State this comparison transparently and do not imply that the plans have identical cancellation or refund terms unless approved.
- No commission on supplier work.
- No per-lead fee in the current model.
- A supplier that has used the free quota and does not have an active paid entitlement cannot receive additional lead assignments.

The price, currency, tax treatment, free quota, billing interval, renewal, cancellation, refund and grace-period terms must be stored/configured centrally rather than hard-coded across the application. The approved headline prices are ZAR 200/month and ZAR 1,200/year; exact billing terms remain subject to the open decisions in this specification.

---

# 2. Non-negotiable business invariants

These rules must be enforced in server-side business services and covered by automated tests.

1. A supplier's public profile and `/b/[slug]` page are visible only when `status = APPROVED` **and** `isVerified = true`.
2. A draft, pending, changes-requested or suspended supplier must not appear in public directory results, public sitemaps, public APIs or public business pages.
3. A supplier may preview their own unpublished page when authenticated and authorized. Admins may preview for review. Preview responses must not be publicly cacheable or indexable.
4. Enquiries never go directly to suppliers. Every enquiry must pass through GMO's review process.
5. A new enquiry begins in `PENDING_REVIEW`.
6. Only an authorized admin/operations user can qualify, reject or dispatch an enquiry.
7. A lead assignment must be created only for an eligible, approved and verified supplier.
8. Supplier matching must use confirmed category and service-area records. Never infer service coverage from a business address, a broad marketing claim or an AI guess.
9. Only qualified and committed lead assignments consume free quota.
10. Spam, rejected enquiries, duplicate submissions rejected before dispatch and unassigned enquiries do not consume free quota.
11. A free quota unit is consumed once when the lead assignment transaction commits. Repeated email/WhatsApp delivery attempts do not consume additional quota.
12. A transport failure does not automatically reverse a valid lead assignment or restore quota. A quota reversal requires an explicit, audited administrative correction under a documented policy.
13. When `freeLeadsUsed >= freeLeadsLimit` and the supplier has no active paid entitlement, no new assignment may be created.
14. Historical assignments remain visible to the supplier according to access and retention policy, even after quota exhaustion or subscription expiry.
15. A personal business page enquiry with `targetSupplierId` set is still reviewed by GMO. It does not bypass spam checks, qualification, supplier eligibility or admin dispatch.
16. An enquiry intended for one supplier must not silently be distributed to other suppliers. Any fallback distribution must be an explicit admin action.
17. A subscription is active only when supported by verified payment/provider state and the entitlement rules. Never trust a client-side payment-success redirect.
18. Payment webhooks must be authenticated, idempotent and reconciled with provider records.
19. Supplier and client personal information must be accessible only to authorized roles and only for a legitimate operational purpose.
20. Never expose private customer contact details to suppliers before a lead has been legitimately assigned to them.
21. All consequential admin actions must be auditable.
22. External notification delivery must not block the database transaction that qualifies or dispatches a lead.
23. No AI or automation workflow may approve suppliers, qualify/reject enquiries, dispatch leads, change subscriptions or disclose client data without the authorization and human-review policy defined for that workflow.

---

# 3. Technology stack and version policy

## 3.1 Preferred stack

| Layer | Standard |
|---|---|
| Framework | Next.js 16, App Router |
| Language | TypeScript, strict mode |
| UI | React version compatible with selected Next.js release |
| Styling | Tailwind CSS 4 |
| Component system | shadcn/ui and Radix-based accessible components |
| Database | PostgreSQL |
| ORM | Prisma ORM 7 |
| Validation | Zod |
| Forms | React Hook Form where client-side form state is useful |
| Authentication | Better Auth, with its official Prisma integration |
| Object storage | Cloudflare R2; S3-compatible alternative if needed |
| Payments | Payment-provider adapter; Paystack subject to South African merchant and recurring-payment verification |
| Email | Resend or another approved transactional email provider |
| Automation | Self-hosted/managed n8n |
| Messaging | WhatsApp Business Platform / Cloud API through an approved provider |
| Unit/integration tests | Vitest |
| Browser end-to-end tests | Playwright |
| Code quality | ESLint, TypeScript checks and consistent formatting |
| Deployment | Managed Next.js-compatible hosting and managed PostgreSQL initially |

## 3.2 Version policy

Do not hard-code stale minor or patch versions in this skill.

At project initialization:

1. Select the latest stable, non-canary Next.js 16 release.
2. Install the React version required by that Next.js release.
3. Select the latest stable Prisma 7 release and compatible adapter.
4. Select mutually compatible stable versions of Better Auth, Zod, Tailwind, shadcn/ui and other dependencies.
5. Pin dependencies through the package manager lockfile.
6. Record the exact versions in the repository's README or `docs/TECH-STACK.md`.
7. Upgrade intentionally, in a branch, with tests and migration review.

Do not use canary, experimental or prerelease dependencies in production unless explicitly approved and documented.

## 3.3 Prisma 7 rules

Prisma 7 is the standard. Do not copy Prisma 6 configuration examples into this project.

- Use the `prisma-client` generator with an explicit output path.
- Keep database connection configuration in `prisma.config.ts`.
- Keep the schema datasource provider as PostgreSQL; do not put legacy connection URL configuration in the schema.
- Use the official PostgreSQL driver adapter, such as `@prisma/adapter-pg`, with the compatible `pg` driver.
- Keep runtime pooled connection configuration separate from direct migration connection configuration where the hosting/database provider requires it.
- Use the Prisma CLI and migration workflow documented for the installed Prisma 7 release.
- Never run destructive schema operations against production as a shortcut.
- Commit migration files and review generated SQL before deployment.

Illustrative configuration shape (verify exact imports and APIs against the installed Prisma 7 patch):

`prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

`prisma.config.ts`

```typescript
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DIRECT_URL"),
  },
});
```

The application runtime should instantiate Prisma Client using the PostgreSQL driver adapter and the runtime database URL. Keep this initialization in one server-only module and reuse the client in development to avoid unnecessary connections.

The exact adapter construction must follow the installed Prisma 7 documentation. Do not copy code written for an older Prisma Client constructor.

## 3.4 Authentication decision

Use **Better Auth** as the selected authentication foundation unless a documented technical blocker is found. Keep the integration in the architecture and codebase plan, but implement account experiences according to launch phase:

- MVP: secure admin authentication, session management and role-based authorization are mandatory.
- MVP: customers may submit enquiries without creating an account, subject to validation, contact verification and abuse controls.
- MVP: supplier onboarding and verification may be operated manually by GMO staff. Do not require a supplier dashboard or full self-service account journey to validate customer demand.
- Later phase: enable supplier self-service accounts and dashboards when the pilot shows that operational volume justifies them.
- Later/optional: customer accounts and enquiry history should be added only when there is a demonstrated customer need.

- Use the official Prisma adapter and schema generation instructions.
- Integrate the Better Auth user identity with the GMO user profile and role model.
- Do not create two competing user tables or duplicate authentication credentials.
- Keep authentication/session tables and application profile data conceptually separate where the integration requires it.
- Support email/password and Google sign-in if enabled.
- Require email verification for supplier account activation and sensitive account changes.
- Implement password reset, session revocation and secure cookie settings.
- Authorization must be enforced server-side; authentication alone is not authorization.

If Better Auth's schema changes, update it using its documented migration/generation procedure and review the result before applying it.

---

# 4. Application architecture

## 4.1 Architecture style

Use a **modular monolith**.

Keep one deployable Next.js application and one primary PostgreSQL database, with clear feature boundaries and server-side services. Do not introduce microservices, Kubernetes, Kafka or complex distributed infrastructure for the MVP.

The application must be structured so that background workers and integrations can be separated later if real traffic or operational requirements justify it.

## 4.2 Recommended feature-sliced structure

```text
src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── how-it-works/
│   │   ├── pricing/
│   │   └── contact/
│   ├── (directory)/
│   │   ├── suppliers/
│   │   ├── b/[slug]/
│   │   └── request-quote/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── reset-password/
│   ├── dashboard/
│   │   ├── supplier/
│   │   └── customer/
│   ├── admin/
│   └── api/
│       ├── uploads/
│       ├── webhooks/
│       ├── internal/
│       └── cron/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── directory/
│   ├── business-page/
│   ├── forms/
│   └── shared/
├── features/
│   ├── auth/
│   ├── suppliers/
│   ├── categories/
│   ├── service-areas/
│   ├── enquiries/
│   ├── matching/
│   ├── lead-assignments/
│   ├── subscriptions/
│   ├── payments/
│   ├── notifications/
│   ├── media/
│   ├── analytics/
│   └── admin/
├── server/
│   ├── db/
│   ├── auth/
│   ├── services/
│   ├── repositories/
│   ├── policies/
│   ├── integrations/
│   └── jobs/
├── lib/
│   ├── validations/
│   ├── constants/
│   ├── utils/
│   └── env/
└── generated/
    └── prisma/

prisma/
├── schema.prisma
├── migrations/
└── seed.ts

docs/
├── TECH-STACK.md
├── ARCHITECTURE.md
├── DATA-MODEL.md
├── SECURITY.md
├── ADR/
└── RUNBOOKS/
```

Adapt this structure to the starter repository without duplicating equivalent folders or creating unnecessary abstraction layers.

## 4.3 Server/client boundaries

- Default to React Server Components.
- Add `"use client"` only when browser interaction or client-side state is required.
- Keep database access, secrets, payment logic and privileged integrations in server-only modules.
- Never import server modules into client components.
- Use Server Actions for suitable authenticated application mutations.
- Use Route Handlers for webhooks, external integrations and public HTTP endpoints.
- Validate every untrusted input at the server boundary with Zod.
- Do not treat hidden UI controls as access control.

---

# 5. Authentication, roles and authorization

## 5.1 Application roles

Initial application roles:

- `USER`: ordinary registered account; may act as a client.
- `SUPPLIER`: account associated with a supplier profile.
- `ADMIN`: trusted GMO staff with administrative permissions.

Do not assume every client must register. Anonymous enquiry submission is allowed where the form and anti-abuse controls permit it.

A user may have a supplier profile and may also submit enquiries as a client. Avoid forcing the product into mutually exclusive customer/supplier identities if the business needs both.

## 5.2 Authorization policy

Create centralized server-side policy functions, for example:

- `requireAuthenticatedUser()`
- `requireAdmin()`
- `requireSupplierOwner(supplierId)`
- `canViewLeadAssignment(userId, assignmentId)`
- `canViewEnquiryContact(userId, enquiryId)`
- `canEditSupplierProfile(userId, supplierId)`

Every privileged read and write must check the actor, role, ownership and resource state.

Do not rely only on middleware, route layout checks or client-side role values. Verify authorization in the service/data-access operation itself.

## 5.3 Admin roles

The initial `ADMIN` role can be extended to granular permissions when staffing requires it, such as:

- Supplier reviewer.
- Enquiry reviewer.
- Finance/billing operator.
- Support operator.
- Super administrator.

Do not grant broad admin access to ordinary staff by default. All permission changes must be audited.

---

# 6. Canonical data model

The Prisma schema is the single source of truth for persisted data. Extend the canonical model deliberately; do not create parallel models for the same business concept.

This section specifies the required entities and relationships. Exact field names and optionality should be finalized in the migration-ready schema before the first production migration.

## 6.1 Identity and account entities

The canonical data model may define future customer and supplier accounts even when the MVP does not expose self-service account journeys. Do not build UI, onboarding friction or account dependencies merely because an entity exists in the schema. MVP admin users must authenticate; customer enquiries can be anonymous with appropriate controls; suppliers can initially be managed by GMO operations staff.

### User

Application identity/profile associated with Better Auth.

Required concepts:

- Unique normalized email.
- Name and optional profile image.
- Application role.
- Email verification state as integrated with Better Auth.
- Created/updated timestamps.
- Optional supplier relation.
- Admin review relations.
- Audit actor relation.

Do not duplicate Better Auth's credential, account, session or verification storage.

### Client

Optional client profile linked to a registered `User`.

- A client may have multiple enquiries.
- An enquiry may be submitted anonymously.
- Store customer contact details only as required.
- Normalize and validate phone numbers and email addresses.
- Do not require a user account to request a quote.

### Supplier

A supplier is a business profile linked to one owner `User`.

Core concepts:

- Business name and unique slug.
- Tagline and description.
- Business type: `SERVICE_PROVIDER`, `PRODUCT_SELLER` or `HYBRID`.
- Primary category for display and SEO.
- Contact details and approved public contact fields.
- Website and validated social links.
- Operating hours.
- Promotional headline/details/expiry.
- Approval status and verification state.
- Verification timestamps and review history.
- Free lead limit and usage count or an equivalent quota ledger.
- Subscription/entitlement relation.
- Acquisition source/campaign.
- Created/updated and optional soft-deletion timestamps.

Keep sensitive internal review notes separate from public supplier content.

## 6.2 Categories and service coverage

The original one-category-per-supplier and one-city-per-supplier design is too restrictive. A business may provide multiple services and serve multiple towns.

Required entities:

### Category

- Name, unique slug and description.
- Optional icon.
- Active/inactive state.
- Sort order and SEO metadata as needed.
- Parent category if a hierarchy is approved.

### SupplierCategory

Many-to-many relation between suppliers and categories.

- Supplier.
- Category.
- Optional primary flag.
- Optional admin-confirmed status.
- Unique supplier/category pair.

A supplier's primary category is used as its main directory classification. Additional categories are used for relevant discovery and matching only when confirmed.

### Province

South African province reference data with unique name/code.

### City

City/town reference data belonging to a province. Enforce unique city slug within its province.

### Suburb

Optional normalized suburb reference data belonging to a city. If a full suburb directory is not practical initially, use carefully normalized suburb text in service-area records and plan a later migration.

### SupplierServiceArea

A supplier may have multiple service areas.

Required concepts:

- Supplier.
- Province.
- Optional city.
- Optional suburb or normalized suburb identifier.
- Coverage type/level, if needed.
- Confirmed/active state.
- Created/updated timestamps.

A province-wide service area can be represented without inventing a city. A city-level area must belong to the selected province. A suburb-level area must belong to the selected city and province.

### SupplierOffering

Optional supplier-specific service/product offerings:

- Supplier.
- Title.
- Short description.
- Optional price label.
- Display order.
- Active state.

Do not treat an offering title as a verified category unless it is explicitly mapped to a confirmed category.

## 6.3 Enquiry and lead entities

### Enquiry

An enquiry represents a customer's request.

Required concepts:

- Unique, non-guessable public reference code.
- Optional `clientId` for registered customers.
- Client name, email and phone as needed for anonymous submissions.
- Requested category.
- Requested province and optional city/suburb.
- Description and optional structured answers.
- Optional `targetSupplierId` for a personal business page request.
- Status and review metadata.
- Rejection reason/category.
- Entry channel and UTM attribution.
- Spam/duplicate assessment metadata.
- Created/updated timestamps.
- Optional retention/deletion state.

Protect client contact data. Do not return full enquiry objects to public endpoints.

### EnquiryStatus

Use explicit states such as:

- `PENDING_REVIEW`
- `QUALIFIED`
- `REJECTED_SPAM`
- `DISPATCHED`
- `CLOSED`

If the business needs a distinct rejected/non-spam or duplicate state, add it explicitly rather than overloading `REJECTED_SPAM`.

### LeadAssignment

A lead assignment represents the relationship between one qualified enquiry and one supplier.

Required concepts:

- Enquiry and supplier foreign keys.
- Unique `(enquiryId, supplierId)` constraint.
- Assignment status and timestamps.
- Whether it consumed a free quota unit.
- Quota ledger/reference information.
- Delivery state kept separate from supplier outcome state.
- Supplier response and outcome notes.
- Created/updated timestamps.

Suggested assignment lifecycle:

- `ASSIGNED`
- `VIEWED`
- `CONTACTED`
- `QUOTED`
- `WON`
- `LOST`
- `WITHDRAWN`

Suggested notification/delivery lifecycle is separate:

- `PENDING`
- `PROCESSING`
- `DELIVERED`
- `FAILED`

Do not combine delivery failure with assignment eligibility or supplier outcome. A WhatsApp failure does not mean the lead assignment never existed.

### DispatchOperation

Record each admin-confirmed dispatch operation.

- Unique idempotency key.
- Enquiry.
- Admin actor.
- Requested supplier set or normalized operation details.
- Result and timestamps.
- Failure information where appropriate.

### QuotaLedger

Prefer a ledger for quota consumption and corrections instead of relying only on a mutable counter.

Required concepts:

- Supplier.
- Related lead assignment.
- Entry type such as `FREE_LEAD_CONSUMED` or `ADMIN_ADJUSTMENT`.
- Quantity/delta.
- Reason and actor for manual corrections.
- Unique idempotency reference.
- Created timestamp.

A cached `freeLeadsUsed` counter may remain for efficient reads, but it must be kept consistent with the ledger in the same database transaction. Never update it from unrelated code paths.

### LeadActivity and follow-up tracking

GMO must be able to reconstruct what happened after an enquiry was received and after a supplier was introduced. Reuse existing `Enquiry`, `LeadAssignment`, `Notification`, `DeliveryAttempt`, `AuditLog` and `OutboxEvent` records where they already represent the event. Add a dedicated `LeadActivity` (or an equivalent clearly defined activity entity) only for operational interactions that are not already captured.

Suggested activity fields:
- Enquiry ID and optional LeadAssignment ID.
- Activity type: internal review, customer contact attempt, supplier contact attempt, customer reached, supplier responded, appointment proposed/booked, quote requested/received, job reported won/lost, follow-up scheduled, follow-up completed, customer/supplier feedback.
- Direction and channel (internal, phone, email, WhatsApp, SMS, in-person, other).
- Actor (staff user or system process).
- Occurred-at timestamp and optional scheduled follow-up timestamp.
- Outcome/status and a short operational summary.
- Related campaign/source and attribution reference where relevant.
- Consent/communication-purpose reference where an outbound communication is involved.
- Created-at timestamp.

Do not store full message bodies or unnecessary customer personal information in activity summaries. Store provider message identifiers and delivery metadata in the notification/delivery entities. A lead activity record is not proof that a sale occurred; distinguish supplier-reported outcomes from independently verified outcomes.

For any later supplier lead-reactivation service, add campaign-level authorization, source/provenance, permitted channel, suppression/opt-out status, processing purpose, retention deadline and attribution rules before importing or contacting records. Do not mix a supplier's private historic CRM contacts into the public GMO directory or general enquiry pool.

## 6.4 Subscription and payment entities

### Subscription

Required concepts:

- Supplier.
- Plan and plan version.
- Provider.
- Provider customer/subscription identifiers where applicable.
- Amount in integer minor units.
- Currency (ZAR for the current plan).
- Start/end dates.
- Current status.
- Next payment date where supported.
- Cancellation request/effective dates.
- Provider reference.
- Created/updated timestamps.

### Payment

Record every payment attempt and confirmed transaction.

- Supplier and subscription.
- Provider and unique provider reference.
- Amount in minor units and currency.
- Payment status.
- Paid/failed/refunded timestamps.
- Failure code/message where safe.
- Provider metadata with secrets and unnecessary personal data removed.

### PaymentWebhookEvent

- Provider event identifier, unique where supplied.
- Event type.
- Signature verification result.
- Processing status.
- Received/processed timestamps.
- Safe payload reference or redacted payload.
- Error/retry details.

### SubscriptionEvent

Record activation, renewal, expiry, cancellation, past-due transitions and manual corrections.

### Billing rules

- Use integer minor currency units, never floating-point amounts.
- Keep price and plan configuration centralized and versioned.
- Do not activate a subscription from a browser redirect.
- Verify provider webhook signatures and, where needed, query the provider API to confirm transaction state.
- Make webhook processing idempotent.
- Reconcile local subscription state with provider state.
- Define grace-period and failed-payment policy before enabling automated recurring billing.
- Preserve historical payment and subscription records.
- Keep a `BillingProvider` abstraction so the provider can be changed without rewriting entitlement logic.

**Paystack decision:** Paystack is a candidate, not an unconditional assumption. Before production, verify that the actual South African GMO merchant account supports the required ZAR payment flow and recurring subscription features. If recurring billing is unavailable or unsuitable, use an approved one-time annual payment and a controlled renewal process until a verified recurring solution is selected. Do not promise recurring billing based only on generic documentation.

## 6.5 Privacy, audit, media and integration entities

Add the following entities as appropriate:

- `ConsentRecord`: person, purpose, channel, consent status, notice/policy version, timestamp and source.
- `AuditLog`: actor, action, entity type/id, timestamp, request/correlation ID and safe before/after metadata.
- `MediaAsset`: owner, storage key, purpose, MIME type, byte size, dimensions, attachment state and timestamps.
- `EnquiryAttachment`: enquiry and media relation, subject to file policy.
- `OutboxEvent`: durable event awaiting asynchronous processing.
- `Notification`: recipient, channel, template/type, status and related entity.
- `DeliveryAttempt`: provider response, attempt count, safe error and timestamps.
- `WebhookEvent`: generic external webhook record where a provider-specific table is not more appropriate.
- `ProfileAnalyticsEvent`: supplier page view, QR scan, share, social click and enquiry CTA events.
- `FunnelEvent`: structured acquisition and conversion events where analytics needs exceed profile events.
- `SupplierReviewEvent`: approval, request-changes, suspension and verification history.
- `EnquiryReviewEvent`: qualification, rejection, dispatch and administrative review history.

Avoid storing duplicate copies of the same event in multiple tables without a clear reason.

## 6.6 Data integrity and deletion

- Use foreign keys and unique constraints for business invariants.
- Add indexes based on actual query patterns and verify them with query plans.
- Use restrictive deletion for financial, audit, enquiry and assignment history.
- Prefer deactivation/soft deletion or anonymization over cascading deletion of business records.
- Do not cascade-delete historical lead assignments when a supplier account is removed.
- Define a retention schedule for enquiries, client contact data, media and logs.
- Use database transactions for related multi-record changes.
- Use database constraints in addition to application validation where possible.

---

# 7. Supplier onboarding and verification

## 7.1 Supplier onboarding lifecycle

1. User creates an account.
2. User verifies email.
3. User starts supplier profile.
4. User enters business identity, categories, service areas, contact details and promotional content.
5. User uploads approved media.
6. User reviews and submits the profile.
7. Supplier enters `PENDING_APPROVAL`.
8. Admin reviews profile and verification evidence.
9. Admin approves, requests changes or rejects/suspends under the defined policy.
10. Public listing is enabled only after both approval and verification are true.

## 7.2 Supplier status

Initial statuses:

- `DRAFT`
- `PENDING_APPROVAL`
- `CHANGES_REQUESTED`
- `APPROVED`
- `SUSPENDED`

If permanent rejection is required, add an explicit `REJECTED` state with a reason and resubmission policy.

## 7.3 Verification

The verification process must define acceptable evidence and staff procedures. Do not claim a supplier is independently verified if GMO has only checked that a phone number or email address works.

Store:

- Verification method.
- Verification status.
- Verified by.
- Verified at.
- Evidence reference, if retained lawfully.
- Review notes and next review date where applicable.

Public badges must accurately describe the level of verification performed.

## 7.4 Profile completeness

Provide a profile-completeness indicator for suppliers and admin reviewers. Completeness must not be confused with verification or approval.

---

# 8. Directory, search and matching

## 8.1 Public directory eligibility

A supplier can appear publicly only if:

```typescript
supplier.status === "APPROVED" && supplier.isVerified === true
```

Also require the supplier to be active and not soft-deleted.

Apply this condition in the repository/service query, not just in the page component.

## 8.2 Search filters

Support relevant filters:

- Category and additional confirmed categories.
- Province.
- City/town.
- Suburb where reliable reference data exists.
- Supplier status/verification (publicly, only eligible results).
- Optional text search over approved public fields.

Use pagination and stable ordering. Avoid returning every supplier in one request.

## 8.3 Matching eligibility

A supplier is eligible for an enquiry only when all applicable conditions are true:

1. Supplier is active, not deleted and not suspended.
2. `status = APPROVED`.
3. `isVerified = true`.
4. Supplier has the requested confirmed category.
5. Supplier has a confirmed service area that covers the enquiry's location.
6. Supplier has available free quota or an active paid entitlement.
7. Supplier is not blocked from receiving leads for a documented reason.
8. Supplier is not already assigned to the same enquiry.

A direct-target enquiry must match the target supplier's confirmed category and service area, unless a clearly documented product policy explicitly allows an exception. It must never bypass approval, verification or admin review.

### Availability confirmation

A supplier's saved profile or general availability preference is not proof that the supplier can accept a particular job now. During the MVP, GMO staff should contact shortlisted suppliers and record a per-enquiry availability response (available, unavailable, no response, or needs clarification) before confirming a dispatch wherever practical. A supplier must not be represented to the customer as available until that status is confirmed. Store the response actor, timestamp and relevant enquiry/assignment reference. Later automation may request this confirmation, but must not silently treat stale profile data as live availability.

## 8.4 Matching priority

Suggested deterministic order:

1. Exact confirmed category + suburb coverage.
2. Exact confirmed category + city coverage.
3. Exact confirmed category + province coverage.
4. Additional approved relevance ranking within the same coverage tier.

Do not rank using hidden assumptions or unverified data. The admin interface must show why a supplier matched.

Optional ranking signals may include profile completeness, recent responsiveness and fair distribution, but they must be transparent, measurable and approved. Do not let paid status silently override category/location suitability.

## 8.5 Admin matching interface

Show:

- Suggested eligible suppliers.
- Matched category/categories.
- Matched service area and coverage tier.
- Free quota remaining.
- Subscription entitlement and expiry.
- Supplier approval/verification state.
- Previous assignment to the same enquiry.
- Supplier response metrics where available.
- Whether the enquiry originated from that supplier's business page.
- Any exclusion reason for suppliers that did not qualify.

Never auto-dispatch leads in the MVP. Human confirmation is mandatory.

---

# 9. Enquiry review and atomic lead dispatch

## 9.1 Enquiry lifecycle

```text
PENDING_REVIEW
   ├── REJECTED_SPAM
   └── QUALIFIED
          └── DISPATCHED
                 └── CLOSED
```

The admin must explicitly qualify an enquiry before dispatch. The service must reject invalid state transitions.

## 9.2 Enquiry validation and abuse prevention

- Validate all fields with Zod on the server.
- Normalize email and phone inputs.
- Apply rate limits by IP, contact identifier and other proportionate signals.
- Include a honeypot and timing checks where useful.
- Detect likely duplicate enquiries without automatically rejecting legitimate repeat requests.
- Use CAPTCHA or equivalent only when risk warrants it.
- Do not log full customer contact details in application logs.
- Record spam decisions and reasons for review.
- Make privacy notice acceptance clear; do not bundle optional marketing consent with quote submission.

## 9.3 Atomic dispatch transaction

All lead assignment creation and quota consumption must occur in one database transaction.

The dispatch service must:

1. Authenticate the actor and require the correct admin permission.
2. Validate that the enquiry is in `QUALIFIED` state.
3. Validate that the selected supplier IDs are unique and allowed.
4. Lock or conditionally update the relevant supplier quota/entitlement rows to prevent concurrent overspending.
5. Re-check each supplier's approval, verification, category, service area and entitlement inside the transaction.
6. Check for an existing `(enquiryId, supplierId)` assignment.
7. Create the assignment and quota-ledger entry.
8. Update any cached quota counter in the same transaction.
9. Create outbox events for downstream notifications in the same transaction.
10. Record the dispatch operation and admin audit event.
11. Update the enquiry to `DISPATCHED` only after all selected assignments have been committed successfully.
12. Return a safe result for the admin UI.

If any required operation fails, roll back the complete transaction. Do not partially consume quota.

### Concurrency protection

A transaction alone is not sufficient if concurrent dispatches can read the same quota value.

Use a safe strategy such as:

- Atomic conditional database updates (`UPDATE ... WHERE freeLeadsUsed < freeLeadsLimit`).
- Row-level locking where appropriate.
- Serializable isolation with bounded retry where justified.

The chosen implementation must be tested with concurrent dispatch requests.

### Idempotency

- Require a unique dispatch operation key for each admin submission.
- Repeated submissions with the same key must return the original result rather than create duplicate assignments.
- Enforce unique `(enquiryId, supplierId)` at database level.
- Make webhook and notification consumers idempotent too.

### Quota definition

- One free quota unit is consumed once per supplier/enquiry assignment when the dispatch transaction commits.
- Notification retries never consume another unit.
- Paid suppliers do not consume free quota while the paid entitlement is valid.
- An invalid assignment correction may reverse quota only through an audited admin operation.
- Quota counters must reconcile with the quota ledger.

Do not decrement quota just because a message provider reports a temporary delivery failure.

---

# 10. Supplier entitlement and subscription rules

## 10.1 Entitlement calculation

Create one server-side entitlement service. Do not scatter slightly different subscription checks across pages and actions.

A supplier can receive an assignment if:

- The supplier is eligible and has at least one free quota unit remaining; or
- The supplier has a verified active paid entitlement at the time of dispatch.

The service must check subscription status and the effective end date. A stale `ACTIVE` flag must not grant access after expiry.

## 10.2 Current plan

Current business baseline:

- Five free lead assignments.
- Annual supplier subscription: ZAR 1,200.
- No commission.
- No per-lead fee.

Store amounts as integer minor units (for ZAR cents, 20000 represents R200.00 and 120000 represents R1,200.00). Store currency and billing interval (MONTHLY or ANNUAL) explicitly. Keep plan price/version history so later price changes do not rewrite existing subscription records.

## 10.3 Subscription states

Initial states may include:

- `FREE_TIER`
- `ACTIVE`
- `PAST_DUE`
- `CANCELLED`
- `EXPIRED`

Define state transitions and grace-period rules before implementation. Do not assume that `CANCELLED` always means access stops immediately; distinguish cancellation requested, cancel-at-period-end and entitlement end date.

## 10.4 Billing provider boundary

Define a provider-neutral interface for:

- Creating a checkout/payment request.
- Verifying a payment.
- Handling webhook events.
- Retrieving subscription/payment state.
- Cancelling a subscription where supported.
- Reconciling provider state.

Keep Paystack-specific code in an integration module. Do not place provider-specific fields throughout unrelated business services.

---

# 11. Personal business pages

Route: `/b/[slug]`

## 11.1 Public visibility

Only show a supplier page publicly when:

```typescript
supplier.status === "APPROVED" &&
supplier.isVerified === true &&
supplier.deletedAt === null
```

Adapt the final predicate to the actual soft-delete model.

Owners and authorized admins can preview unpublished pages through authenticated, non-indexable and non-cacheable preview routes.

## 11.2 Page content

Where available and approved:

- Cover banner.
- Logo.
- Accurate verification badge.
- Business name and tagline.
- Description.
- Primary and additional categories.
- Active promotional offer and expiry.
- Offerings/services.
- Gallery.
- Confirmed service areas.
- Operating hours.
- Approved contact methods.
- Website/social links.
- Share controls.
- QR code.
- Prominent enquiry CTA.

Do not expose internal review notes, private documents, owner-only contact details or draft media.

## 11.3 Enquiry attribution

An enquiry from a business page must record:

- `entryChannel = PERSONAL_BUSINESS_PAGE`.
- Target supplier ID.
- Relevant UTM parameters.
- Referrer/attribution data where lawful and available.

The enquiry still enters `PENDING_REVIEW`.

## 11.4 SEO and social sharing

- Generate canonical URLs and accurate metadata.
- Provide dynamic Open Graph images using approved public media only.
- Generate QR codes for the canonical public page.
- Do not expose draft/unverified profile information in metadata or social preview endpoints.

---

# 12. Media and image upload architecture

Never store image binaries in PostgreSQL or the Next.js application filesystem.

## 12.1 Upload flow

1. Authenticated client requests an upload authorization.
2. Server checks ownership, role, allowed purpose and quota/size limits.
3. Server issues a short-lived presigned upload URL for a random storage key.
4. Browser uploads directly to Cloudflare R2/S3.
5. Server verifies the uploaded object's metadata and ownership.
6. The application attaches the media asset to the supplier profile only when the profile is saved.
7. Unattached expired assets are cleaned up by a scheduled job.

## 12.2 File validation

Allowed image formats initially:

- WebP.
- JPEG.
- PNG.

Block SVG unless a separately reviewed sanitization process is implemented.

Also enforce:

- Maximum file size by purpose.
- Maximum dimensions/pixel count.
- Actual file signature/content validation, not MIME type alone.
- Random, non-user-controlled storage keys.
- Ownership checks on attach, detach, replace and delete.
- Rate limits on upload authorization.
- Safe image decoding/re-encoding where practical.
- No executable or active content.
- Private access for draft/private media; public access only for approved public assets.

For documents/attachments, define a separate allowlist, size limit and malware-scanning policy before enabling uploads.

## 12.3 Media metadata

Store storage key, MIME type, byte size, dimensions, owner, purpose, attachment state and timestamps. Do not trust a client-provided public URL as proof of ownership.

---

# 13. POPIA, privacy and data governance

GMO operates in South Africa and must design for the Protection of Personal Information Act (POPIA). This skill is an engineering specification, not legal advice. GMO should obtain appropriate legal review of notices, consent wording, retention periods, operator agreements and cross-border processing.

## 13.1 Data minimization

- Collect only information needed to provide and operate the service.
- Explain why client contact information is requested.
- Restrict client contact details to authorized operations staff and suppliers who receive the relevant assignment.
- Avoid copying personal information into n8n execution logs, analytics, error trackers or AI prompts unnecessarily.
- Redact sensitive values in logs and monitoring.

## 13.2 Consent and communication

- Keep quote/enquiry processing separate from optional marketing consent.
- Capture the customer's preferred contact channel (for example, phone, WhatsApp or email) and the permission/notice basis for using that channel for this specific enquiry.
- Explain before submission that relevant enquiry details and contact information may be shared with selected suppliers for the purpose of responding to the request.
- Record the notice version, consent/acknowledgement wording, timestamp, source, purpose and selected channel.
- Where operationally proportionate, verify the contact channel (for example, email verification or a one-time code) before dispatching contact details. Do not claim a contact is verified unless the verification event succeeded.
- Optional marketing consent must be separate, optional, specific and not preselected. A customer submitting a service request must not be enrolled in unrelated marketing.
- Record consent purpose, channel, status, notice version, source and timestamp.
- Provide unsubscribe/opt-out handling for marketing communications.
- Respect channel-specific rules and applicable direct-marketing requirements.
- Do not treat a supplier's public business contact details as automatic consent to every marketing channel.
- Do not treat a customer's request for a quote as consent to unrelated promotional campaigns.

## 13.3 Data subject rights and retention

Create documented workflows for:

- Access requests.
- Correction requests.
- Deletion or de-identification where applicable.
- Marketing opt-out.
- Complaints and incident escalation.

Define retention periods by data type. Do not keep personal information indefinitely by default. Preserve financial, fraud-prevention and audit records only as permitted and required, with restricted access.

## 13.4 Supplier disclosure

When client information is shared with a supplier, record which supplier received which enquiry and when. The client-facing privacy notice must explain the lead-sharing purpose and process.

---

# 14. Admin operations center

Admin operations are core product functionality, not a later optional add-on.

## 14.1 Supplier review queue

Must support:

- Pending supplier list and filters.
- Side-by-side profile inspection.
- Category and service-area review.
- Media and contact detail inspection.
- Verification evidence review.
- Approve, request changes, reject (if enabled) and suspend.
- Reason capture.
- Review history and audit trail.

## 14.2 Enquiry triage queue

Must support:

- New enquiry queue.
- Spam/duplicate indicators.
- Enquiry details with privacy-aware access.
- Category and service-area information.
- Suggested eligible suppliers and matching reasons.
- Free quota and paid entitlement visibility.
- Qualification/rejection actions.
- Admin-confirmed supplier selection and dispatch.
- Dispatch history and notification status.

## 14.3 Performance dashboard

Report at least:

- Enquiries received.
- Enquiries qualified and rejected.
- Leads assigned/dispatched.
- Supplier response rate.
- Quote rate and reported won/lost outcomes.
- Free versus paid suppliers.
- Subscription revenue and renewals.
- Top categories and locations.
- Supplier acquisition and onboarding conversion.

Define each metric precisely. For example, response rate should state the numerator, denominator and time window.

## 14.4 Supplier health view

Show:

- Profile completeness.
- Verification and approval state.
- Active categories and service areas.
- Free quota remaining.
- Subscription entitlement and expiry.
- Assigned leads and response metrics.
- Recent activity.
- Support/review flags.

## 14.5 Audit requirements

Audit all consequential operations, including:

- Supplier approval, rejection, changes requested and suspension.
- Verification changes.
- Enquiry qualification/rejection.
- Lead dispatch and quota correction.
- Subscription/payment manual corrections.
- Admin permission changes.
- Access to sensitive client data where operationally appropriate.

Audit records must be append-only from normal application workflows and inaccessible for editing by suppliers.

---

# 15. n8n, WhatsApp, email and external integrations

## 15.1 Integration principle

The Next.js application and PostgreSQL database remain the source of truth for GMO business state.

n8n orchestrates approved workflows; it must not become a second source of truth for supplier status, quota, payments or lead assignments.

## 15.2 Transactional outbox

Use a transactional outbox for important events.

Example:

```text
Admin confirms lead dispatch
        |
        v
Database transaction
  - Create LeadAssignment
  - Consume quota if applicable
  - Record AuditLog
  - Create OutboxEvent
        |
        v
Transaction commits
        |
        v
Worker / n8n processes event
        |
        +---- WhatsApp notification
        +---- Email notification
        +---- Dashboard notification
        +---- CRM update (if configured)
```

The outbox event must be committed in the same transaction as the business action. A worker or scheduled process claims pending events and retries safely.

## 15.3 Integration safeguards

- Use authenticated, signed or otherwise strongly protected internal endpoints.
- Never expose database credentials to n8n.
- Use separate credentials with least privilege.
- Validate incoming webhook signatures.
- Verify webhook timestamps/replay protections where supported.
- Use idempotency keys and unique event IDs.
- Implement bounded retries with backoff.
- Store provider message IDs and delivery status.
- Separate provider delivery status from lead assignment status.
- Avoid logging client contact details or message bodies unnecessarily.
- Provide dead-letter/manual retry handling.
- Keep integration failures visible to admins.

## 15.4 WhatsApp rules

- Use the official WhatsApp Business Platform or an approved provider.
- Respect opt-in, template and conversation-window rules applicable to the message.
- Do not send unsolicited promotional WhatsApp messages.
- Store delivery status and provider message identifiers.
- A WhatsApp failure must not roll back a valid lead assignment.
- Provide email/dashboard fallback where appropriate and consent/policy permits.

## 15.5 Email rules

Use transactional templates for account verification, password reset, supplier status, enquiry receipt, lead assignment and billing events. Separate transactional communication from marketing campaigns.

---

# 16. Marketing, SEO and analytics

## 16.1 Programmatic SEO

Potential directory routes:

```text
/suppliers
/suppliers/[category]
/suppliers/[category]/[province]
/suppliers/[category]/[province]/[city]
/b/[slug]
```

Only index pages that have sufficient real supplier coverage and useful unique content. Do not generate thousands of thin or empty pages merely because a category/location combination exists.

Use:

- Canonical URLs.
- XML sitemap with eligible public pages only.
- Robots rules.
- Structured data only when accurate and compliant.
- Unique titles/descriptions.
- Pagination metadata where appropriate.
- Revalidation after approved supplier/profile changes.
- 404 or noindex behavior for invalid/empty combinations according to SEO policy.

## 16.2 Funnel events

Track relevant events such as:

- `supplier_registered`
- `supplier_profile_submitted`
- `supplier_approved`
- `supplier_profile_viewed`
- `qr_scanned`
- `profile_shared`
- `enquiry_form_opened`
- `enquiry_submitted`
- `enquiry_qualified`
- `enquiry_rejected`
- `lead_dispatched`
- `supplier_lead_viewed`
- `supplier_contacted`
- `quote_submitted`
- `job_won`
- `subscription_checkout_started`
- `subscription_purchased`
- `subscription_cancelled`

Use a consistent event schema with timestamp, event ID, actor/entity references, source/UTM attribution and only the minimum necessary metadata.

Do not send personal information to third-party analytics unless there is an approved lawful basis and appropriate configuration.

### Customer acquisition experiments — social media and Facebook

- Treat Facebook and other social channels as measurable acquisition channels, not as prerequisites to building a large follower count.
- Test category/location-specific posts, useful local advice, supplier spotlights with permission, before/after project content with permission, and clear links to relevant GMO landing pages.
- Use consistent tracking parameters or campaign identifiers so visits and enquiries can be attributed to a channel/campaign.
- Measure qualified enquiries and supplier outcomes, not likes or follower count alone.
- Do not publish customer personal information, private job details, supplier claims or project photos without the required permission.
- Start with a small number of repeatable experiments; expand spend or posting effort only when the channel produces relevant enquiries at an acceptable cost.
- Social messages that request a service should be directed into the same canonical GMO enquiry process rather than managed in an untracked parallel spreadsheet or inbox.

## 16.3 Supplier promotion

Provide:

- Shareable public business page.
- QR code and downloadable poster.
- Approved promotional offers with expiry.
- Social share metadata.
- Analytics for profile views, QR scans, shares and enquiry conversions.

---

# 17. Security requirements

Security must be implemented at every trust boundary.

## 17.1 Authentication and sessions

- Secure session cookies.
- Email verification.
- Secure password hashing through the chosen auth provider.
- Password reset with short-lived tokens.
- Session revocation and logout.
- Rate limiting on login, registration and reset flows.
- MFA for admins where supported and operationally feasible.

## 17.2 Authorization

- Server-side role and ownership checks for every privileged operation.
- Resource-level access checks for enquiries and lead assignments.
- No reliance on client-supplied role, supplier ID or ownership claims.
- Least-privilege access for admins and integrations.
- Protect admin pages, APIs, Server Actions and data services independently.

## 17.3 Application and API security

- Validate all untrusted input with Zod.
- Use parameterized ORM queries; do not concatenate untrusted SQL.
- Protect against CSRF where relevant to the chosen auth/session pattern.
- Apply rate limits to public enquiry, auth, upload and webhook endpoints.
- Restrict CORS to known origins where needed.
- Use secure headers and a considered Content Security Policy.
- Prevent open redirects and unsafe URL handling.
- Validate outbound URLs and avoid server-side request forgery in URL-fetching features.
- Keep secrets server-only and never prefix them with `NEXT_PUBLIC_`.
- Avoid returning stack traces or internal errors to clients.

## 17.4 Payment and webhook security

- Verify provider signatures using the raw request body as required by the provider.
- Reject invalid signatures.
- Enforce event idempotency.
- Reconcile payment status with the provider.
- Never trust the browser success page.
- Store secrets in a secure environment/secret manager.
- Rotate credentials when exposed.

## 17.5 Database and infrastructure

- Use separate development, staging and production databases.
- Use least-privilege database credentials.
- Use pooled connections for application runtime when required.
- Use a direct connection for migrations where the provider requires it.
- Enable automated backups and test restoration.
- Restrict database network access where possible.
- Keep dependencies patched.
- Monitor errors, latency, failed jobs and database capacity.

## 17.6 AI security

If AI features are added:

- Treat supplier descriptions, uploaded files, enquiries and retrieved documents as untrusted input.
- Defend against prompt injection and data exfiltration.
- Do not expose secrets or other customers' data to model prompts.
- Use tool allowlists and server-side authorization for every tool call.
- Require human approval for consequential business actions.
- Record AI-assisted decisions and confidence/rationale where appropriate.
- Do not let an LLM invent supplier verification, coverage or customer consent.

---

# 18. Testing and quality standards

No critical business feature is complete without tests.

## 18.1 Unit tests

Test pure business logic:

- Supplier eligibility.
- Category/service-area matching.
- Subscription entitlement.
- Free quota calculations.
- Enquiry state transitions.
- Consent and communication preferences.
- Slug validation/reservation.
- Pricing calculations.

## 18.2 Integration tests

Test database-backed behavior:

- Supplier approval and public visibility.
- Enquiry creation and review.
- Concurrent dispatch and quota protection.
- Duplicate assignment prevention.
- Payment webhook idempotency.
- Outbox creation and retry behavior.
- Ownership and role restrictions.
- Subscription expiry and renewal.

## 18.3 End-to-end tests

Use Playwright for key journeys:

1. Supplier registers and verifies email.
2. Supplier completes and submits profile.
3. Admin reviews and approves supplier.
4. Approved supplier appears in public directory.
5. Unapproved supplier remains hidden.
6. Client submits an enquiry.
7. Admin reviews and qualifies it.
8. Admin selects matching suppliers and dispatches.
9. Correct suppliers see their assigned leads.
10. Free quota is consumed exactly once.
11. Supplier with exhausted quota cannot receive another free assignment.
12. Valid paid supplier can receive an assignment.
13. Notification failure does not undo assignment.
14. Unauthorized user cannot access another supplier's leads.
15. Payment webhook replay does not duplicate payment or subscription effects.

## 18.4 Quality gates

Before merging:

- Formatting passes.
- ESLint passes.
- TypeScript typecheck passes.
- Unit and integration tests pass.
- Relevant Playwright tests pass.
- Prisma schema validates.
- Migration SQL is reviewed.
- No secrets or sensitive test data are committed.

---

# 19. Performance, scalability and operations

Start simple, measure and scale based on evidence.

## 19.1 Database

- Use appropriate indexes for directory search, admin queues and supplier dashboards.
- Review query plans for slow/high-volume queries.
- Avoid N+1 queries.
- Paginate large lists.
- Select only required fields.
- Use connection pooling for serverless/managed deployment where needed.
- Keep migrations controlled and reversible where possible.
- Test backup restoration.

## 19.2 Caching and revalidation

- Cache only public, approved supplier content.
- Never cache private dashboards, customer details or unpublished profiles publicly.
- Revalidate directory and business pages after relevant approved changes.
- Ensure a supplier suspension or verification revocation removes the profile from public visibility promptly.
- Do not let stale caches expose suspended/unverified suppliers.

## 19.3 Background jobs

Use the outbox and a worker/scheduler for:

- Notifications.
- Abandoned media cleanup.
- Subscription reconciliation.
- Reminder messages where consent/policy permits.
- Analytics aggregation.
- CRM synchronization.
- Periodic supplier health checks.

Jobs must be idempotent, observable and retry-safe.

## 19.4 Monitoring

Monitor:

- Application errors and response latency.
- Database connection usage and slow queries.
- Failed outbox events.
- WhatsApp/email delivery failures.
- Payment webhook failures.
- Failed scheduled jobs.
- Unusual enquiry/spam volumes.
- Authentication abuse.
- Storage usage and upload errors.

Create an operational runbook for restoring service, replaying safe events, handling payment mismatches and responding to privacy/security incidents.

---

# 20. UI and design system

## 20.1 Current GMO visual direction

Use the user-provided GrowMeOnline homepage screenshot (24 November 2026) as the current visual reference. The visible design direction is:

- White page background and clean, spacious layouts.
- Deep navy for high-emphasis headings and primary text.
- Teal for highlighted headline words, primary buttons and brand emphasis.
- Muted blue-grey for paragraph text and secondary navigation.
- Lime as a restrained logo/brand accent.
- Subtle cool-grey borders, soft shadows and rounded cards.
- Green checkmarks/success states for positive status feedback.

The following values were sampled from screenshot pixels. They are a practical visual reference, not a substitute for extracting the production CSS variables or official brand guidelines during the existing-site audit.

| Token | Value | Usage | Confidence |
|---|---|---|---|
| `--gmo-teal` | `#135858` | Primary brand, primary CTA, highlighted heading text | High; sampled from CTA and headline |
| `--gmo-navy` | `#020618` | Main headings and high-emphasis text | High; sampled from headline |
| `--gmo-muted` | `#62748E` | Paragraphs, secondary text and navigation | High; sampled from body text |
| `--gmo-lime` | `#ABC945` | Small logo/brand accent only | Medium; sampled from logo |
| `--gmo-white` | `#FFFFFF` | Main page background | High; visually white |
| `--gmo-border` | `#E8EEF0` | Suggested subtle borders | Provisional design recommendation |
| `--gmo-surface` | `#F7F9FA` | Suggested subtle card/section surface | Provisional design recommendation |

Do not use lime as a large background or body-text color. Do not treat the green WhatsApp floating-action button as the primary GMO brand color. Keep success, warning and destructive colors as separate semantic status tokens; brand teal and lime are not substitutes for accessible status colors.

## 20.2 Semantic theme tokens

Implement the palette through semantic CSS variables and map shadcn/ui tokens to them. Components should consume semantic tokens (`primary`, `foreground`, `muted`, `border`, `success`) rather than hard-coded hex values.

Illustrative light-theme starting point:

```css
:root {
  /* GMO brand */
  --gmo-teal: #135858;
  --gmo-navy: #020618;
  --gmo-muted: #62748E;
  --gmo-lime: #ABC945;

  /* Surfaces */
  --background: #FFFFFF;
  --foreground: var(--gmo-navy);
  --card: #FFFFFF;
  --card-foreground: var(--gmo-navy);
  --muted: #F7F9FA;
  --muted-foreground: var(--gmo-muted);
  --border: #E8EEF0;
  --input: #E8EEF0;

  /* Actions */
  --primary: var(--gmo-teal);
  --primary-foreground: #FFFFFF;
  --ring: var(--gmo-teal);

  /* Semantic status colors: validate contrast before production */
  --success: #15803D;
  --warning: #B45309;
  --destructive: #B91C1C;
}
```

This is a light-theme starting point, not a claim that the screenshot exposes the website's actual CSS variables. Verify contrast, especially for muted text, lime accents, hover states and focus indicators. Do not assume a dark theme is required; the current reference is a light interface.

## 20.3 UI component rules

- Primary buttons use GMO teal with white text; hover/focus states must remain accessible and visibly distinct.
- Secondary buttons use white or a subtle surface with a cool-grey border and navy text.
- Use navy for page titles and teal selectively for highlighted words or important actions.
- Use muted blue-grey for supporting copy, breadcrumbs and secondary navigation.
- Use lime sparingly for small brand accents, not long text or essential controls.
- Use consistent spacing, readable line lengths, clear hierarchy and restrained shadows.
- Supplier profiles must remain mobile-first and emphasize business identity, services, service areas, trust evidence and enquiry actions.
- Admin dashboards may use denser layouts but must share the same semantic tokens and brand identity.
- Maintain accessible color contrast, keyboard navigation, visible focus states, proper form labels/error messages, responsive layouts, and loading/empty/success/error states.
- Use consistent confirmation for destructive or consequential admin actions.
- Supplier dashboard quota indicators must be clear and must not be confused with verification status.
- Do not display a verification badge or subscription badge unless the underlying state supports it.
- Do not hard-code raw brand hex values in individual components; update the central theme tokens instead.


Requirements:

- Accessible color contrast.
- Keyboard navigation.
- Visible focus states.
- Proper form labels and error messages.
- Responsive layouts.
- Loading, empty, success and error states.
- Consistent confirmation for destructive or consequential admin actions.
- Supplier dashboard quota indicator.
- Clear distinction between verified, pending and unverified states.

Do not display a verification badge or subscription badge unless the underlying state supports it.

---

# 21. Slugs, routing and public data

- Normalize slugs consistently.
- Enforce unique slugs at database level.
- Reserve system routes and sensitive words such as `admin`, `dashboard`, `api`, `login`, `register`, `suppliers`, `pricing` and `request-quote`.
- Do not allow supplier-controlled slugs to shadow system routes.
- Use stable canonical URLs.
- Avoid exposing sequential database IDs in public URLs when a public reference/slug is more suitable.
- Return 404 for unpublished supplier pages to unauthenticated users.
- Ensure preview URLs are authenticated, short-lived where appropriate and `noindex`.

---

# 22. Environment and deployment conventions

Maintain separate environments:

- Local development.
- Preview/staging.
- Production.

Example environment variable categories:

```text
DATABASE_URL=
DIRECT_URL=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_BASE_URL=

PAYMENT_PROVIDER=
PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=
PAYSTACK_WEBHOOK_SECRET=

RESEND_API_KEY=

WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_VERIFY_TOKEN=

N8N_BASE_URL=
N8N_WEBHOOK_SECRET=

APP_URL=
```

This is an illustrative list. Use only variables required by enabled features. Never commit real values.

Deployment requirements:

1. Run typecheck and tests in CI.
2. Build the production application.
3. Apply reviewed database migrations through the deployment process.
4. Verify health checks.
5. Verify webhook endpoints and secrets.
6. Verify storage permissions.
7. Verify backups and monitoring.
8. Keep a rollback/incident plan.

Do not run development seed scripts against production. Production seed operations must be explicit, reviewed and safe to repeat.

---

# 23. MVP implementation order — default launch roadmap

The default delivery strategy is to validate customer demand and the lead-operation workflow before investing in a complete self-service marketplace. Deliver a small, reliable system that GMO staff can operate manually. Do not interpret this lean scope as permission to weaken security, privacy, auditability or data integrity.

## Phase 0 — Audit, product decisions and launch readiness

- Audit the current repository and public GrowMeOnline website as product/market reference. This project is a greenfield implementation; do not extend, migrate or integrate with the public site's code, database or media.
- Confirm the initial service categories and geographic pilot area. Do not launch broad national coverage before supplier coverage is real.
- Confirm the customer promise, service boundaries, enquiry handling hours and response expectations.
- Confirm the pilot supplier cohort, manual operating capacity and the pilot lead-entitlement policy.
- Confirm privacy notice, enquiry disclosure, consent wording, retention rules and contact-verification approach with appropriate review.
- Keep development, test data and the database local. Migrations, seeds and destructive resets are allowed against an isolated local test database. Never run them against a production or hosted database unless it has been explicitly designated as disposable test infrastructure.
- Do not deploy the application or provision production services before development is complete. Decide hosting, production secrets, backups and deployment with the product owner afterward.

**Exit criteria:** Greenfield decision and pilot defaults are recorded; local development environment is safe and isolated; customer journey and operating workflows are scoped; remaining legal, verification and commercial decisions are listed for review.

### Phase 0 pilot defaults — 25 November 2026

The product owner directed the engineering agent to select and record practical defaults for the greenfield pilot. These are provisional pilot settings, not permanent changes to the commercial model or a claim that local demand has already been proven.

- Build GrowMeOnline from scratch in this repository; treat the public GrowMeOnline website as product/market reference only. Do not copy its implementation, database, media or credentials.
- Keep all application development, test data and databases local. Migrations, seeds and resets are permitted against an isolated local test database. Do not deploy the app or provision production services until development is complete; decide deployment with the product owner afterward. Do not use the current hosted Neon URL for destructive tests unless it is explicitly confirmed as disposable.
- Start in Gauteng, initially Johannesburg and Pretoria.
- Test non-emergency home repairs and maintenance, with plumbing, electrical and handyman subcategories. Validate demand and supplier capacity before public launch.
- Require at least five approved, verified suppliers with confirmed service-area coverage for each subcategory/city before listing it publicly; recruit toward ten before increasing paid acquisition.
- Staff the pilot Monday-Friday, 08:00-17:00 SAST, excluding South African public holidays. Tell customers that enquiries are reviewed during staffed hours and normally within one business day; do not promise emergency, same-hour or job outcomes.
- Request supplier availability for each enquiry; allow four staffed business hours, make one manual follow-up and mark no response by the next business day.
- For a general enquiry, dispatch to no more than three confirmed-available suppliers after admin approval. For a supplier-specific enquiry, contact only that supplier; if unavailable or ineligible, ask the customer before offering alternatives.
- Manually verify the customer's selected contact channel before sharing details with suppliers and record the result. Keep marketing consent separate from service communications. Defer OTP, WhatsApp automation and marketing campaigns until justified and reviewed.
- Apply the five-free-qualified-assignment allowance once per verified business for its lifetime. A committed assignment consumes quota once in the dispatch transaction. After the fifth assignment, stop new dispatch until an active paid entitlement is confirmed; do not create an undocumented unlimited-free pilot exception.
- Run a six-week pilot with weekly operational reviews. Measure funnel conversion and staff time, then set expansion thresholds from observed baseline data rather than inventing performance targets in advance.
- Begin acquisition with direct supplier recruitment, organic/local SEO, referrals and social experiments. Defer paid campaigns until supplier coverage and a baseline are established.
- Obtain appropriate South African privacy/legal review of notices, consent, retention, contact verification and operating roles before processing live customer enquiries. Confirm Information Officer obligations and complete an appropriate privacy impact assessment.

## Phase 1 — Customer-facing website and enquiry capture

- Build a mobile-first homepage with a clear proposition such as “Find trusted local service providers”.
- Let customers select a service category and location, then clearly continue to find providers or request help.
- Provide category/location directory pages where there are enough approved suppliers to serve the area.
- Implement two customer routes: (A) browse a supplier profile and submit an enquiry to that supplier; (B) describe the job through a guided request form.
- Both routes must create the same canonical enquiry record and follow the same GMO review process.
- Use short, progressive, category-specific forms. Ask only questions that improve qualification or matching.
- Capture service, location, job description, urgency, optional photos, contact details, preferred contact channel and the required enquiry/privacy acknowledgement.
- For relevant categories, ask useful clarifying questions. Example for plumbing: repair/installation type, geyser/bathroom/shower context, urgency and whether the customer or supplier is expected to provide materials. These are examples, not a fixed universal form.
- Store the form-template version and structured answers so question changes remain auditable.
- Support anonymous customer enquiries; do not require customer registration for the MVP.
- Apply server-side validation, spam/rate limiting, duplicate detection and contact verification appropriate to the channel.
- Provide a clear submission confirmation and realistic response expectations. Do not promise instant matching or emergency response unless GMO can reliably deliver it.

**Exit criteria:** A mobile customer can discover relevant categories/locations, submit either enquiry route, receive confirmation and have the request safely persisted with a unique reference.

## Phase 2 — Central data, admin operations and human matching

- PostgreSQL is the production source of truth for customers/enquiries, suppliers, service categories, service areas, verification, assignments, consent, audit events and workflow status.
- Create unique enquiry references and idempotent submission handling.
- Build a secure admin login and role-protected operations area before exposing customer contact data.
- Provide an enquiry triage queue: new, needs information, qualified, rejected/spam, matching, dispatched, closed.
- Provide a supplier register containing business contact details, services, coverage, credentials/evidence, verification state, operational notes and availability response history.
- During the pilot, GMO staff may create and maintain supplier records manually; self-service supplier onboarding is not a launch blocker.
- Use deterministic matching filters for category/service, geographic coverage, supplier approval/verification and any explicit eligibility rules.
- Show admin why each supplier matched or was excluded. AI may assist with categorization or missing-information suggestions later, but must not make unreviewed dispatch decisions.
- Staff contact shortlisted suppliers to confirm availability and willingness to receive the specific enquiry.
- Staff confirms the assignment/dispatch. Customer contact details are shared only with the supplier(s) selected under the approved workflow.
- Track supplier response, customer introduction, quote/job outcome and follow-up.
- Maintain a human-operated follow-up queue with due dates, assigned staff member, channel, last attempt, next action and outcome. Record contact attempts without exposing unnecessary customer data.
- Follow up with the customer, where permitted and operationally appropriate, to confirm whether contact was made and whether an appointment or quote followed.
- Use transactional outbox patterns for reliable notifications. Start with email or manual phone/WhatsApp handling where appropriate; do not make n8n a source of truth.
- Google Sheets/Airtable may support temporary prospect research, controlled exports or analysis. They must not become a second production database or the canonical lead store.

**Exit criteria:** GMO staff can securely review an enquiry, find eligible suppliers, confirm availability, dispatch deliberately, record outcomes and audit who did what.

## Phase 3 — Controlled pilot and validation

- Start with a limited set of categories, geographic areas and manually onboarded suppliers.
- Test with simulated enquiries before accepting live traffic.
- Run a controlled pilot through the website and selected acquisition channels.
- Handle supplier contact and customer follow-up manually where that is safer or faster than automation.
- Review no-match cases, incomplete forms, spam, supplier non-response and customer drop-off weekly.
- Record every operational exception and update the process before automating it.
- Run a simple follow-up cadence manually; measure time-to-first-response, contact success, appointment/quote progression and outcome-reporting completeness.
- Define numeric success thresholds after an initial baseline is available; do not invent targets without traffic and conversion evidence.

**Pilot metrics:**
- Website visits by source, category and location.
- Homepage-to-enquiry conversion.
- Form start, completion and abandonment rates.
- Qualified enquiry rate and duplicate/spam rate.
- Match rate and no-suitable-supplier rate.
- Time to first human review and time to supplier response.
- Supplier acceptance/decline/no-response rates.
- Customer contact success, quote rate and reported job-win rate.
- Customer feedback and supplier satisfaction.
- Supplier willingness to continue and willingness to pay under the approved commercial model.
- Cost and staff time per qualified enquiry.

**Exit criteria:** The team can show whether demand exists, which categories/areas work, whether suppliers respond, whether customers get useful introductions and whether the operating model is commercially plausible.

## Phase 4 — Supplier self-service and operational automation

Build only after pilot evidence justifies the additional complexity:

- Supplier account activation and self-service onboarding.
- Supplier profile editing, media/portfolio management and service-area preferences.
- Supplier dashboard, lead inbox, assignment status and outcome reporting.
- Supplier notification preferences and response-time tracking.
- Admin-configured supplier availability and lead preferences.
- n8n workflows for notifications, reminders, follow-ups and internal task routing.
- WhatsApp Business integration after template, consent, provider and cost requirements are verified.
- Review invitations and moderation with clear eligibility rules.
- Supplier profile analytics and admin quality reporting.

**Exit criteria:** Self-service and automation reduce measurable operational effort without reducing lead quality, consent quality or dispatch control.

## Phase 5 — Commercial features and AI-assisted improvements

Only after the marketplace has proven demand and operational repeatability:

- Supplier subscription checkout and payment-provider integration.
- Subscription lifecycle, renewals, receipts, reconciliation and billing support.
- Supplier/customer accounts beyond the minimum operational needs.
- Advanced analytics and campaign attribution.
- AI-assisted job classification, missing-information prompts and match explanations with human approval.
- Managed supplier follow-up assistance and appointment coordination, only after customer/supplier consent, staffing capacity and service boundaries are defined.
- A separately approved supplier-owned dormant-lead reactivation pilot, only after POPIA/data-role review, source and permission checks, channel-specific rules, opt-out/suppression handling, attribution and dispute terms are complete.
- Automated supplier availability requests and customer follow-up.
- Quote, appointment, messaging or job-tracking features only where customer/supplier research demonstrates demand.
- Additional pricing experiments only through explicit product-owner approval and documented commercial tests.

**Commercial invariant:** Preserve five free qualified lead assignments, then offer either ZAR 200/month or ZAR 1,200/year, with no commission and no per-lead fee. Both plans must have explicit entitlements and billing terms. Deferring payment collection during a pilot does not automatically grant unlimited free assignments. Define and approve the pilot entitlement treatment before live dispatch.

## MVP scope boundaries

**Must have:** mobile-first customer website; category/location discovery; guided enquiry form; optional supplier-specific enquiry; PostgreSQL persistence; unique enquiry reference; secure admin authentication; admin triage; supplier register; deterministic matching; per-enquiry availability confirmation; human-confirmed dispatch; contact/consent records; a human-operated follow-up queue; recording of supplier response, customer contact, quote/appointment progression and reported outcomes; email or controlled manual notifications; audit trail; basic acquisition/conversion metrics; backups and production monitoring.

**Defer:** customer accounts, supplier dashboard/self-service, automated payments, advanced AI matching, in-platform chat, complex CRM, calendar booking, supplier availability calendars, map drawing and multi-tier monetization.

**Never defer:** server-side authorization, privacy and consent controls, secure handling of customer contact information, input validation, spam protection, idempotency, auditability, backup/restore and critical end-to-end tests.

---

# 24. Common implementation pitfalls

Never:

- Publish a supplier before approval **and** verification.
- Expose draft supplier content through metadata, sitemap, API or cache.
- Send an enquiry directly to a supplier without GMO review.
- Count spam/rejected enquiries against free quota.
- Increment free quota outside the dispatch transaction.
- Assume a database transaction alone prevents concurrent quota overspending.
- Create duplicate assignments on double-click or webhook retry.
- Mark a lead as delivered just because a notification was queued.
- Roll back a valid lead assignment because WhatsApp is temporarily unavailable.
- Allow an expired or unverified subscription to grant lead access.
- Trust a payment success redirect.
- Assume Paystack recurring billing works for the GMO merchant account without testing it.
- Match suppliers using unconfirmed categories or service areas.
- Use one category or one city as the permanent limit for a supplier.
- Allow direct-target business-page enquiries to bypass review.
- Store image files in PostgreSQL or local application storage.
- Trust a browser-provided file MIME type, public URL or supplier ID.
- Cascade-delete financial, audit or lead history.
- Store unnecessary personal data in n8n, AI prompts, analytics or logs.
- Use optional marketing consent as a condition for submitting a quote request.
- Give AI agents unrestricted access to customer data or business actions.
- Treat middleware as the only authorization layer.
- Generate thin programmatic SEO pages.
- Add microservices or infrastructure complexity without a measured need.

---

# 25. Open product decisions — do not invent answers

The following items need explicit owner decisions before the corresponding feature is finalized:

1. **Subscription terms:** Are the R200/month and R1,200/year prices inclusive of VAT, and what are the exact renewal, cancellation, refund, failed-payment and grace-period rules? How will a supplier switch from monthly to annual, and when does the new billing interval take effect?
2. **Free quota:** Is the five-free-lead allowance lifetime per supplier, per account, per business or resettable under any circumstances?
3. **Lead distribution:** How many suppliers may receive a general enquiry, and is there a maximum per enquiry?
4. **Direct enquiries:** If a customer contacts a specific supplier but that supplier is ineligible, should GMO hold the enquiry, ask the customer to choose another supplier or offer an explicit alternative?
5. **Supplier verification:** What evidence and checks qualify a business for the public Verified badge?
6. **Supplier changes:** Which profile changes require re-approval or re-verification?
7. **Payments:** Which South African payment provider and payment methods are approved after merchant-account testing?
8. **Messaging:** Which WhatsApp provider, opt-in process and approved templates will be used?
9. **Retention:** What retention periods apply to enquiries, customer contact data, payment records, audit logs and media?
10. **Admin permissions:** Which staff members can approve suppliers, qualify enquiries, dispatch leads and correct quota?
11. **Lead outcomes:** How will supplier response, quote, won and lost states be defined and measured?
12. **Geographic coverage:** Which province/city/suburb reference dataset will be maintained and who can edit it?

Do not block unrelated development while these are open. Implement the parts that are fully specified and keep uncertain behavior behind explicit configuration or disabled features.

---

# 26. AI coding-agent instructions

## MVP-first implementation rule (v2.2)

When asked to build or plan a feature, first classify it as MVP-critical, pilot-supporting or post-pilot. Default to the smallest safe implementation that validates customer demand and supports admin-operated matching. Do not build supplier/customer account experiences, payment checkout, advanced AI matching or complex automation ahead of the six-phase roadmap in Section 23 unless the product owner explicitly changes priorities.

Before modifying the existing website, inspect the repository and current implementation. Do not assume a rebuild is required. Keep PostgreSQL/application services as the production source of truth; do not create a parallel Sheets/Airtable production workflow. Keep secure admin access, consent, audit logs, data validation, idempotency and server-side authorization in scope even when deferring customer/supplier dashboards.

For all enquiry paths, preserve the canonical workflow: capture → validate → review → qualify → deterministic match → per-enquiry supplier availability confirmation → admin-confirmed dispatch → human follow-up → outcome tracking. AI may assist staff but must not silently replace required human review. Treat follow-up as an operational workflow with consent, ownership, due dates and auditable outcomes.

When acting as a GrowMeOnline engineering agent:

1. Read this skill before proposing or generating code.
2. Inspect the actual repository, package manager, installed versions and existing conventions before changing files.
3. Do not assume the repository matches a starter template or an earlier conversation.
4. Do not replace Prisma with Drizzle or introduce a second ORM.
5. Do not invent models that duplicate canonical concepts.
6. Before a schema change, explain the affected entities, relations, migration impact and backfill needs.
7. Generate complete, maintainable code; do not leave fake implementations or TODOs in critical business paths.
8. Put business rules in server-side services, not only in UI components.
9. Validate all untrusted input at the server boundary.
10. Enforce authorization at the resource/service level.
11. Add tests for business invariants and failure cases.
12. For payment, quota, dispatch, privacy and security changes, include concurrency, retry and abuse cases in the review.
13. Never claim a command, migration, test, deployment or integration succeeded unless it was actually run and its result was checked.
14. If an external provider capability is uncertain, consult current official documentation and test credentials/sandbox behavior before implementing production assumptions.
15. Keep changes focused. Do not refactor unrelated code without explaining why.
16. Update this skill, architecture docs and ADRs when an approved decision changes a canonical rule.

## Required response format for significant implementation tasks

Before implementation, provide:

- Objective.
- Existing repository facts discovered.
- Relevant business invariants.
- Files/modules expected to change.
- Database/API impact.
- Security and privacy implications.
- Tests to add or update.
- Any unresolved decision that blocks safe implementation.

After implementation, report:

- Files changed.
- Migration details.
- Commands actually run and their results.
- Tests passed/failed/not run.
- Known limitations.
- Next recommended task.

---



---

# 27. Marketplace benchmark: Bark.com and GrowMeOnline product direction

## 27.1 Benchmark scope and source note

Bark.com (the UK site at `https://www.bark.com/en/gb/`) is used as a product benchmark, not as a source of GMO business policy. Its public pages describe a services marketplace with two discovery paths:

1. Customers describe a job, answer service-specific questions and receive matches.
2. Customers browse professional profiles, compare providers and contact a selected provider.

Bark's published professional model also includes paid lead access through credits. Its exact prices, eligibility, guarantees, ranking and product availability may vary by market and change over time. Do not copy UK-specific commercial terms into South Africa.

Useful public references reviewed on 22 November 2026:

- Customer journey: https://www.bark.com/en/gb/how-it-works/
- Professional journey: https://www.bark.com/en/gb/how-it-works/sellers/
- Professional pricing: https://www.bark.com/en/gb/sellers/pricing/
- Marketplace explanation: https://support.bark.com/hc/en-gb/articles/22073457279772-What-is-the-Bark-Marketplace-and-How-does-Bark-Marketplace-work
- Profile improvement: https://support.bark.com/hc/en-gb/articles/21983350323612-How-can-I-update-and-improve-my-profile
- Lead preferences: https://help.bark.com/hc/en-gb/articles/27564209951388-How-to-set-your-lead-preferences
- Lead screening: https://help.bark.com/hc/en-gb/articles/26980550854940-How-Bark-screens-your-leads
- Bark Verified: https://support.bark.com/hc/en-gb/articles/22583172866332-What-is-Bark-Verified-and-how-does-it-work
- Terms and ranking: https://www.bark.com/en/gb/terms/

This benchmark is a point-in-time review of public information. Recheck official provider pages before relying on any Bark feature or policy.

## 27.1A Kandua and Snupit benchmark — customer and operational journeys

Kandua is the primary reference for a clear, guided customer experience. Snupit is a useful reference for the two-sided lead workflow and the option to browse providers or request quotes. These are public-product observations, not guarantees about their internal systems or a specification to copy.

### Kandua — customer-experience reference

Useful public journey patterns:

- Let customers describe the problem in plain language and guide them with relevant follow-up questions.
- Keep the first step simple: customers should understand how to find help without learning the marketplace's internal process.
- Offer clear routes to either find/book a provider or get help describing the job.
- Present supplier profiles and trust information in a way that supports an informed decision.
- Treat quotes, approvals, secure payments and job tracking as later-stage marketplace capabilities, not MVP prerequisites.
- Kandua's public materials describe vetting and AI-assisted help. GMO must make only claims supported by its own checks and actual service capability.

### Snupit — operational lead-flow reference

Useful public journey patterns:

- Customers can search providers directly or submit a request to receive relevant quotes.
- Service type, location and provider availability are important matching dimensions.
- Supplier notifications and the ability to respond to a lead are central operational steps.
- Customer follow-up can help identify requests that remain unresolved.
- Snupit's credit-based paid-lead model is competitor-specific. It is not approved for GMO and must not be copied into product logic or marketing.

### What GMO should adopt

- A simple, mobile-first customer entry point.
- Browse-and-contact and guided-request journeys, both feeding one canonical enquiry/review workflow.
- Progressive, category-specific clarification questions.
- Supplier profiles with accurate services, service areas, evidence and reviews when eligible.
- Explicit supplier response and customer outcome tracking.
- Follow-up processes that are consent-aware and operationally realistic.

### What GMO must not copy

- Competitor pricing, lead-credit systems, subscription terms or commission structures.
- Claims such as “100% vetted”, guaranteed outcomes, response-time promises or quality ratings unless GMO can substantiate them.
- Automated direct dispatch that bypasses GMO's required review and confirmation process.
- Any competitor-specific provider limit or matching rule as a default GMO rule.

### Public references reviewed

- Kandua, How it works: https://kandua.com/how-it-works
- Kandua, About: https://kandua.com/about
- Kandua, Join as a Pro: https://kandua.com/join-as-a-pro
- Kandua, Privacy Policy: https://kandua.com/privacy-policy
- Snupit, How it works: https://www.snupit.co.za/how-it-works.aspx
- Snupit, Customer FAQ: https://www.snupit.co.za/faq.aspx
- Snupit, Pro FAQ: https://www.snupit.co.za/faq-pro.aspx

These pages can change. Re-check current terms and product behavior before making implementation or commercial decisions.

## 27.2 Product lessons worth adopting

| Bark pattern | GrowMeOnline opportunity | GMO decision |
|---|---|---|
| Guided customer request | Service-specific quote request wizard | Adopt |
| Search and browse professionals | Category/location directory with filters | Adopt and improve |
| Compare professional profiles | Consistent supplier cards and detailed profiles | Adopt |
| Reviews and work photos | Review collection and project portfolio | Adopt with moderation |
| Service/location lead preferences | Supplier categories and service-area settings | Adopt; confirmed data only |
| Lead screening | Contact, intent, completeness, duplicate and location checks | Adopt; admin retains decision |
| Professional lead dashboard | Lead inbox, status, response and outcomes | Adopt |
| Credit-based paid lead unlock | Optional future commercial experiment | Do not replace current plan without approval |
| Paid visibility/subscription tiers | Potential future supplier plans | Requires commercial decision |
| Enquiries/calls and CRM integrations | Future direct contact and workflow integrations | Phase later |

## 27.3 Preserve GMO's existing business model

**Do not silently replace the current GMO subscription model with Bark's pay-per-lead credit model.**

The current GMO commercial baseline remains:

- Five free qualified lead assignments for an eligible supplier.
- Subscription choices: ZAR 200/month or ZAR 1,200/year after the five-free-qualified-assignment allowance.
- No commission on supplier work.
- No per-lead fee in the current model.
- Admin-reviewed and admin-confirmed lead dispatch.

Bark's UK pricing page describes buying credits and paying to contact selected customers. This is a different commercial model. It is useful as a future option to research, but it is not an approved GMO change.

If a future pay-per-lead or hybrid model is considered, create a separate ADR and commercial test. Define lead quality, refund/dispute rules, supplier fairness, pricing by category/location, VAT/tax treatment, credit expiry, payment-provider support and POPIA disclosures before implementation.

---


## 27.4 Additional benchmark: RemodelBoom — lead reactivation and revenue conversion

Reference: https://remodelboom.com/

Research note (25 November 2026): RemodelBoom publicly positions itself as a performance-oriented growth partner for home-improvement companies. Its website emphasizes booked appointments, re-engaging prospects and performance-linked compensation; its About page describes a shared-success approach. Public company/job descriptions also describe human-operated text follow-up and working older/dormant lead pipelines. These are RemodelBoom's claims and operating descriptions, not independently verified GMO outcomes.

### What GMO should learn

1. **Do not stop at lead delivery.** A lead is an intermediate event. Track whether the business responds, contacts the customer, quotes, books an appointment and reports a won/lost outcome.
2. **Follow-up is a service.** Many small businesses may need help responding consistently, not just more enquiries. Begin with staff-operated follow-up and simple reminders.
3. **Reactivation can create value from existing demand.** A supplier may already have old enquiries or uncontacted prospects. Re-engaging those contacts could become a later service line, separate from new customer acquisition.
4. **Measure business outcomes.** Where suppliers voluntarily report them, record appointments, quotes, jobs won/lost and attributed revenue using clear definitions and evidence levels.
5. **Sell outcomes in plain language.** Small businesses generally understand more customers, faster follow-up and more opportunities better than technical features such as dashboards, AI or SEO tools.

### What GMO must not copy blindly

- Do not claim “only pay when you win” or “zero risk” until GMO can measure attributable sales, control delivery quality and fund the operating costs.
- Do not assume a South African small business has a large historic lead database or the same lead volume as RemodelBoom's US target clients.
- Do not assume WhatsApp/SMS/email outreach is lawful merely because a supplier uploads a contact list.
- Do not reuse supplier/customer contact data for a new campaign without documented authority, a valid lawful basis, channel-specific permissions where required, transparent notices, suppression handling and a defined retention policy.
- Do not adopt revenue share, commission, pay-per-sale or a new monthly price without a separate approved commercial decision and written terms.

### GMO product decision

- MVP: acquire new demand, capture and qualify enquiries, match/introduce suitable suppliers, perform human follow-up and record outcomes.
- Post-pilot: offer structured follow-up assistance and reminders where the customer and supplier communication basis is clear.
- Later experiment: supplier-authorized reactivation of existing leads, with a separate campaign record, data provenance, permitted contact channels, opt-out/suppression checks, attribution and dispute process.
- Do not create a second CRM or duplicate supplier/enquiry database. Extend the canonical enquiry, assignment, activity and consent model.


# 28. Dual customer discovery experience

GrowMeOnline should support two complementary ways for a customer to find a supplier. They must share the same canonical supplier data and enquiry review services.

## 28.1 Path A — Browse and contact a supplier

Customer journey:

```text
Homepage
   |
   v
Choose category or search service
   |
   v
Select province / city / suburb
   |
   v
Browse eligible supplier results
   |
   v
Compare profiles, services, reviews and photos
   |
   v
Open supplier business page
   |
   v
Submit an enquiry to that supplier
   |
   v
GMO review and qualification
   |
   v
Admin-confirmed dispatch
```

Requirements:

- Search only active, approved and verified suppliers.
- Provide category, province, city and suburb filters where reference data is reliable.
- Provide keyword search over approved public fields.
- Display service coverage, profile content, approved contact options and review summaries.
- Allow a customer to compare shortlisted suppliers.
- Provide a clear request-quote/contact CTA.
- Record the selected supplier as `targetSupplierId` for a supplier-specific enquiry.
- Preserve the rule that a personal business page enquiry enters `PENDING_REVIEW`.
- Do not reveal customer contact details to a supplier before a valid assignment.
- If the selected supplier cannot receive the enquiry, do not silently send it to competitors. Follow the approved direct-enquiry policy.

## 28.2 Path B — Tell GMO what work is needed

Customer journey:

```text
Choose a service
   |
   v
Answer category-specific questions
   |
   v
Describe the work and urgency
   |
   v
Provide service location
   |
   v
Provide contact details and privacy acknowledgement
   |
   v
Verify contact details / anti-abuse checks
   |
   v
Submit enquiry
   |
   v
GMO review and qualification
   |
   v
Show eligible supplier suggestions to admin
   |
   v
Admin confirms selected suppliers
   |
   v
Notify suppliers and track responses
```

Requirements:

- Create a guided multi-step form rather than one large generic form.
- Ask only questions relevant to the selected category.
- Make questions configurable by administrators.
- Support optional budget range, project type, urgency, preferred contact method and availability where relevant.
- Do not make budget mandatory unless the product owner approves it for that category.
- Capture province, city and optional suburb as structured data.
- Explain why contact information is requested and how it may be shared.
- Keep optional marketing consent separate from quote submission.
- Save progress only if the privacy and retention design supports it.
- Validate all steps on the server, not only in the browser.

## 28.3 Category-specific question framework

Create configurable enquiry question templates.

Example for a plumber:

- What plumbing service do you need?
- Is this an emergency?
- Is the work at a home or business?
- What is the issue?
- Where is the property?
- When would you like the work done?
- Optional estimated budget.

Example for a solar installer:

- Is this residential or commercial?
- Is this a new installation, repair or upgrade?
- Do you need solar panels, battery storage or both?
- What is the approximate monthly electricity usage or bill range?
- Where is the property?
- When do you want the installation?

These are illustrative questions, not mandatory requirements. Admins should be able to add, edit, reorder, deactivate and mark questions as required by category.

### Suggested entities

- `EnquiryTemplate`: category, name, version, active state and timestamps.
- `EnquiryQuestion`: template, stable key, label, help text, input type, required flag, order and validation configuration.
- `EnquiryOption`: question, label, stored value and order for select/radio options.
- `EnquiryAnswer`: enquiry, question key/version and validated answer.

Store a template/version reference with each enquiry so historic submissions remain interpretable after questions change. Avoid storing unnecessary sensitive information in free-text answers.

## 28.4 Customer-facing supplier comparison

Supplier cards should make comparison useful without overwhelming the customer.

Show where available:

- Business name and logo.
- Primary service/category.
- Service locations.
- Short description.
- Verified status with precise meaning.
- Average review score and review count, only when based on valid reviews.
- Selected work photos.
- Indicative pricing only when supplied and approved.
- Profile completeness must not be presented as a quality score.
- Clear profile and enquiry actions.

Never fabricate ratings, reviews, response times, availability or prices. Do not rank suppliers using paid status as a hidden substitute for suitability.

---

# 29. Supplier experience inspired by Bark

## 29.1 Supplier onboarding and profile quality

Add a guided profile-completion experience to the existing supplier onboarding flow.

Suggested profile sections:

1. Business identity and description.
2. Logo and profile image.
3. Services and confirmed categories.
4. Pricing or quote guidance, if the supplier chooses to publish it.
5. Province, city, suburb and service coverage.
6. Operating hours and availability.
7. Project photos and portfolio.
8. Qualifications, licences and accreditations.
9. Customer reviews and responses.
10. Website and social links.
11. Frequently asked questions.
12. Contact preferences.

Show a completion checklist and progress indicator. It should help suppliers understand missing information.

A completeness score is not verification, approval, service quality or a guarantee of getting hired. Do not copy Bark's advertised conversion statistics or imply the same outcome for GMO.

## 29.2 Lead preferences

Allow suppliers to manage the types of work and locations they want to receive.

Preferences may include:

- Confirmed service categories.
- Specific services offered.
- Provinces, cities and suburbs covered.
- Optional travel radius or service coverage polygon in a later phase.
- Job types accepted.
- Residential/commercial preference.
- Minimum/maximum project size or budget preference where appropriate.
- Temporary pause/availability state.
- Preferred contact/notification channel.

Supplier preferences are additional filters, not proof of coverage. A supplier cannot expand confirmed service coverage simply by changing a preference setting. Any change to categories or service areas that affects public claims or matching must follow the approved review process.

## 29.3 Supplier dashboard

The supplier dashboard should become a practical business workspace.

Recommended areas:

### Overview
- Profile approval and verification state.
- Profile completion checklist.
- Free lead assignments used and remaining.
- Subscription status and renewal/expiry date.
- New and active lead count.
- Recent profile views and enquiries, where analytics consent and privacy rules allow.

### Leads
- New assignments.
- Viewed leads.
- Contacted customers.
- Quotes submitted.
- Won and lost opportunities.
- Closed/withdrawn records.
- Lead detail and permitted customer contact information.
- Clear timestamps and status history.

### Business profile
- Edit approved business information.
- Manage services, locations and operating hours.
- Upload portfolio photos.
- Manage promotions and FAQs.
- Preview the public profile.
- See review and approval feedback.

### Performance
- Profile views.
- Enquiry CTA clicks.
- Enquiries received.
- Lead response rate.
- Quote rate.
- Reported won/lost outcomes.
- Time-to-first-response where reliable.

Define every metric with a clear numerator, denominator and time window. Do not present profile views as leads or leads as guaranteed revenue.

### Billing
- Current plan.
- Free quota and paid entitlement.
- Payment history.
- Invoices/receipts where supported.
- Renewal/expiry and cancellation information.
- Support route for payment disputes.

## 29.4 Lead handling and response tracking

Suppliers should be able to update the status of their own assignments.

Suggested supplier actions:

- Mark as viewed.
- Mark as contacted.
- Record quote sent.
- Record won or lost.
- Select a reason for lost/unresponsive where useful.
- Add private notes visible only to their own authorized team.

Supplier updates must not alter the canonical enquiry qualification or dispatch history. Keep supplier outcome status separate from notification delivery status and admin enquiry status.

A supplier must never be able to see another supplier's assignment or customer contact data.

## 29.5 Messaging and customer communication

A future in-platform conversation feature may reduce friction and help GMO measure response.

Before implementing:

- Decide whether customer and supplier can message before a formal assignment.
- Define how direct phone/email disclosure works.
- Provide abuse reporting and blocking.
- Store message access under strict resource-level authorization.
- Define retention and deletion rules.
- Avoid sending message bodies to analytics or automation by default.
- Support email/WhatsApp notifications without making those providers the source of truth.

For the MVP, an assignment can expose the minimum contact details required to the assigned supplier, according to the customer-facing privacy notice and approved process. In-platform chat is a later capability, not a prerequisite.

---

# 30. Reviews, trust and reputation

## 30.1 Review model

A review should be tied to a genuine customer experience, not an arbitrary public comment.

Suggested `SupplierReview` concepts:

- Supplier.
- Customer/user reference where available.
- Related lead assignment where applicable.
- Rating with a defined scale.
- Review text.
- Submission source.
- Verification state.
- Moderation status.
- Published timestamp.
- Supplier response, if enabled.
- Report/appeal metadata.
- Created/updated timestamps.

Suggested review states:

- `PENDING_MODERATION`
- `PUBLISHED`
- `REJECTED`
- `HIDDEN`
- `REMOVED`

Do not allow suppliers to create or edit customer reviews on behalf of customers. Do not allow a supplier to delete legitimate negative feedback. Provide a moderation and appeal process.

## 30.2 Review eligibility

Preferred initial policy:

- Invite a customer to review after a lead assignment reaches a meaningful outcome, such as completed work.
- Where a supplier reports a job won, a review invitation may be offered to the customer through an approved channel.
- A supplier's self-reported outcome alone must not automatically create a verified review.
- Reviews from customers without a matching assignment may be considered only under a separately approved verification policy.
- Prevent repeated reviews for the same transaction unless an explicit correction workflow exists.

The exact review eligibility, invitation timing, dispute process and moderation SLA are open product decisions.

## 30.3 Verification badges

Use precise badge labels that describe checks actually performed.

Possible future verification levels:

- Contact details checked.
- Business registration checked.
- Professional licence/qualification checked.
- Identity/owner check completed.

Do not use a broad “fully verified” claim if only an email or phone check was performed. Store method, evidence reference, reviewer, date and scope of verification. Avoid publicly exposing identity documents or sensitive verification evidence.

Bark's paid-plan verification badge is a commercial choice specific to Bark. GMO should not make trust verification dependent on payment unless the product owner approves a clearly disclosed policy and it does not mislead customers.

## 30.4 Portfolio and project evidence

Allow approved suppliers to publish:

- Project photographs.
- Before/after images.
- Short project descriptions.
- Service/category tags.
- General location (not a customer's exact private address).
- Completion period where appropriate.

Require suppliers to confirm they have rights to upload and publish the media and that identifiable people/property details are appropriately handled. Provide moderation, reporting and removal procedures.

---

# 31. Matching, lead quality and fairness

## 31.1 Matching pipeline

Keep deterministic eligibility rules separate from relevance ranking.

Recommended pipeline:

1. Validate the enquiry.
2. Confirm category and location values.
3. Apply supplier active/approval/verification eligibility.
4. Match confirmed supplier categories.
5. Match confirmed service coverage.
6. Apply supplier availability and lead preferences.
7. Apply entitlement eligibility.
8. Exclude duplicates, blocked suppliers and already-assigned suppliers.
9. Rank eligible candidates using transparent approved signals.
10. Show match reasons and exclusions to the admin.
11. Admin chooses and confirms recipients.

The existing human-confirmed dispatch rule remains mandatory for the MVP.

## 31.2 Match explanation

The admin screen should explain each suggested match, for example:

- Exact category match: Solar Installation.
- Service area match: Centurion, Gauteng.
- Supplier is approved and verified.
- Supplier is currently accepting this type of work.
- Supplier has an active entitlement or free quota remaining.
- No previous assignment exists for this enquiry.

Never display an AI-generated match explanation unless the underlying structured records support it.

## 31.3 Lead quality feedback

Add a structured feedback mechanism for suppliers to report a lead problem.

Possible reasons:

- Invalid contact details.
- Customer did not request this service.
- Duplicate request.
- Outside confirmed service area.
- Job already completed/cancelled.
- Incomplete or misleading request.
- Customer unresponsive after documented attempts.
- Other, with explanation.

A report should create a review case. It must not automatically refund quota, reverse an assignment or change the enquiry state.

Admin resolution options may include:

- Confirm lead is valid.
- Correct enquiry data.
- Mark duplicate.
- Withdraw assignment.
- Apply an audited quota adjustment if policy permits.
- Record supplier feedback for quality analytics.

Define evidence requirements and time limits before enabling automatic credit/refund behavior.

## 31.4 Fairness and ranking safeguards

- Relevance and service-area eligibility come before commercial status.
- Paid suppliers must not automatically outrank a better category/location match.
- Do not sell a supplier a lead that is outside their confirmed coverage.
- Do not send the same lead to an unlimited number of suppliers.
- Show the admin the intended recipient count before dispatch.
- Monitor concentration of assignments and supplier response outcomes.
- Do not use protected or sensitive personal characteristics for matching.
- Do not let AI make final dispatch decisions.

The maximum suppliers per general enquiry remains an open product decision.

---

# 32. Pricing and monetization decision framework

## 32.1 Current approved GMO subscription choices

After the first five free qualified lead assignments, an eligible supplier can choose:

| Plan | Price | Purpose |
|---|---:|---|
| Monthly | **R200/month** | Lower-commitment way to try GMO without paying for a full year upfront |
| Annual | **R1,200/year** | Best-value option for suppliers who are ready to commit for a year |

The monthly plan is not a free trial: it is a paid month-to-month subscription. The supplier may begin monthly and later switch to annual, subject to clear billing and plan-change rules. The annual price is equivalent to R100/month when paid annually. Twelve monthly payments total R2,400, so the annual plan is 50% lower in nominal cost over a full year.

For the initial implementation, keep the core supplier entitlement and lead eligibility rules consistent across monthly and annual plans unless a documented product decision defines a difference. Do not make monthly subscribers receive lower-quality leads or silently restrict their organic visibility. Payment interval must not influence fair matching.

No commission and no per-lead charge are part of this approved headline model.

Do not add Bark-style credits, per-lead charges, paid ranking or lead auto-purchase to production by assumption.

## 32.2 Other commercial models to evaluate separately

| Model | Description | Potential benefit | Main risk |
|---|---|---|---|
| Pay per lead | Supplier pays to unlock a qualified lead | Low upfront commitment | Lead disputes, variable costs and fairness |
| Hybrid | Subscription includes a quota; additional leads cost extra | Flexible monetization | More complex billing and support |
| Tiered subscription | Different plans offer different tools or limits | Upsell path | Can create unfair visibility incentives |
| Managed follow-up service | Supplier pays GMO to assist with follow-up and conversion | Higher-value service | Staffing, consent, service-level and attribution costs |
| Revenue share | GMO receives an agreed share of attributed sales | Aligns payment with outcomes | Attribution disputes, reporting and legal complexity |

These are options for research, not approved changes.

## 32.3 Required commercial validation

Before changing the model, gather:

- Supplier interviews across different categories and business sizes.
- Supplier willingness to pay.
- Actual cost per qualified enquiry.
- Lead-to-contact and lead-to-quote rates.
- Reported job win rate and average job value where suppliers voluntarily provide data.
- Refund/dispute rate.
- Customer demand and category/location supply.
- Payment provider capabilities for South African merchants.
- Tax, invoice and consumer disclosure requirements.
- POPIA and direct-marketing implications.

Do not promise a job, customer response, lead exclusivity or guaranteed return unless GMO can operationally substantiate the promise and has approved the terms.

---

# 33. Admin marketplace operations additions

Extend the existing Admin Operations Center with the following capabilities.

## 33.1 Enquiry form builder

- Create and version category-specific enquiry templates.
- Add and reorder questions.
- Configure input type, options, required status and validation.
- Preview the customer journey.
- Activate/deactivate templates.
- Preserve historic template versions for submitted enquiries.

## 33.2 Supplier marketplace quality

- Review supplier profile completeness.
- Review service/category and service-area claims.
- Moderate portfolio images and public business content.
- Review reported reviews and supplier responses.
- Track verification scope and expiry/recheck needs.
- Identify inactive or unresponsive suppliers.

## 33.3 Lead quality and dispute queue

- View supplier-reported lead issues.
- Inspect the original enquiry and assignment history.
- Review contact verification and duplicate indicators.
- Record resolution and reason.
- Apply quota correction only through the audited quota ledger.
- Report quality problems by category, location and acquisition source.

## 33.4 Marketplace analytics

Add these metrics to the existing dashboard:

- Search volume by category/location.
- Search-to-profile click-through rate.
- Profile-to-enquiry conversion rate.
- Enquiry form abandonment by step.
- Enquiries with no eligible supplier.
- Qualified-to-dispatched rate.
- Average eligible supplier count per enquiry.
- Supplier lead response rate.
- Quote and reported job-win rates.
- Review invitation and completion rates.
- Supplier profile completeness distribution.
- Supplier acquisition cost where campaign spend is available.

Use privacy-aware aggregation and avoid exposing individual customer activity to suppliers or unrelated staff.

---

# 34. Updated implementation roadmap — align delivery to the MVP

The six phases in Section 23 are the default delivery order. The broader marketplace capabilities described in Sections 27–33 remain valid product direction, but they must not pull the team away from the customer-demand pilot.

## Priority 0 — Audit and make the extend-versus-rebuild decision

- Inspect the existing site, repository, database, hosting, forms, analytics, SEO and content.
- Record what can be reused, what must be repaired and what is genuinely blocking.
- Prefer extending the existing platform when it is secure, maintainable and compatible with the target journey.
- Rebuild only when the audit demonstrates that extension creates greater risk/cost than a controlled rebuild.
- Preserve useful URLs, content and search visibility; create redirects for changed routes.

## Priority 1 — Customer-facing MVP

- Mobile-first homepage and clear value proposition.
- Category and location selection.
- Directory browsing for categories/areas with adequate supplier coverage.
- Guided enquiry request with progressive category-specific questions.
- Supplier-specific enquiry from public business pages where available.
- Both routes create the same canonical enquiry.
- Customer contact channel, consent/notice acknowledgement and proportionate verification.
- Confirmation page and clear, realistic response expectations.

## Priority 2 — Admin-led lead operations

- Secure admin authentication, authorization and audit trail.
- PostgreSQL as the single production source of truth.
- Supplier register and manual supplier onboarding.
- Enquiry queue, qualification, rejection and request-for-more-information status.
- Deterministic category/location matching with visible reasons.
- Per-enquiry supplier availability and willingness confirmation.
- Human-confirmed dispatch and controlled sharing of customer contact information.
- Supplier response, customer introduction and job-outcome tracking.
- Reliable email notifications or controlled manual communication.

## Priority 3 — Controlled pilot and acquisition

- Start with limited categories and geographic coverage.
- Use direct supplier recruitment and customer acquisition experiments.
- Test Facebook/social channels, local content, SEO landing pages and referrals with campaign tracking.
- Review the full funnel and operational workload weekly.
- Establish numeric thresholds from observed baseline data.
- Fix customer friction, poor-quality enquiries, supplier coverage gaps and non-response before scaling.

## Priority 4 — Supplier self-service and workflow automation

Before expanding automation, prove the manual follow-up process and its unit economics. Automate repeatable reminders and task routing only after staff workflows and consent rules are clear.

- Supplier accounts, onboarding wizard and profile management.
- Supplier dashboard and lead inbox.
- Media/portfolio uploads and profile completeness.
- Supplier lead preferences and notification settings.
- n8n orchestration for reminders, notifications and internal routing.
- WhatsApp Business after consent, provider, template and cost validation.
- Review and reputation workflows.

## Priority 5 — Monetization and advanced marketplace capabilities

Treat managed conversion assistance and supplier-owned dormant-lead reactivation as separate service-line experiments, not automatic extensions of lead dispatch. Require an approved data-processing/permission model, attribution design, operating capacity and commercial terms before implementation.

- Subscription checkout and payment-provider integration.
- Billing, renewals, receipts and reconciliation.
- AI-assisted classification, question suggestions and matching explanations with human approval.
- Messaging, appointments, quotes, job tracking, CRM integrations and advanced analytics only when justified by observed demand.

## 34.1 MVP completion criteria

The MVP is ready for a controlled pilot only when:

1. The existing-site audit and extend/rebuild decision are documented.
2. The homepage and core enquiry flow work well on mobile and desktop.
3. Customers can select a service and location.
4. Customers can submit a guided request without creating an account.
5. Customers can submit a supplier-specific enquiry when browsing a supplier page.
6. Both routes create the same canonical enquiry and do not bypass admin review.
7. Category-specific answers, contact preference, consent/notice acknowledgement and form version are stored.
8. The system validates submissions, limits abuse and assigns a unique enquiry reference.
9. Admin access is protected by authentication, authorization and audit logging.
10. Suppliers are stored with accurate categories, service areas and verification state.
11. Matching is deterministic and explainable; no supplier is selected solely by an opaque AI score.
12. Supplier availability is confirmed per enquiry before being represented as available.
13. Admin confirms dispatch and only intended suppliers receive relevant customer details.
14. Supplier response and customer outcome can be recorded.
15. Email/manual notifications and failure handling are operational.
16. Basic funnel and operational metrics are available.
17. Critical journeys, backup/restore and privacy controls are tested.

A full supplier dashboard, customer accounts, online payments and advanced AI are not MVP completion requirements.

---

# 35. Additional open product decisions

27. **Follow-up service scope:** Which customer and supplier follow-up tasks will GMO perform, what response-time commitments can it realistically meet, and who is accountable during staffed hours?
28. **Outcome evidence:** Which outcomes are supplier-reported, customer-confirmed or independently verified, and what evidence is required before using them in performance claims?
29. **Dormant-lead reactivation:** Will GMO test reactivation of supplier-owned historic leads, and what data authority, lawful basis, channel permission, suppression, retention and attribution controls are required?
30. **Commercial model evolution:** The approved headline subscription choices are R200/month and R1,200/year after the five-free-qualified-assignment allowance. Validate supplier uptake, retention, willingness to switch from monthly to annual, support costs and unit economics. Managed-service fees and revenue share remain future experiments requiring separate approval.
31. **Service boundary and liability:** What exactly does GMO promise to do after an enquiry is dispatched, and what remains the supplier's responsibility (quoting, site visit, workmanship, warranties and closing the sale)?



Add these to the existing open decisions list. Do not invent answers.

13. **Customer discovery:** Which categories and locations should have browse-first directory pages, quote-request-first journeys or both?
14. **Enquiry templates:** Who owns category question content and how often will it be reviewed?
15. **Supplier preferences:** Which supplier preferences can be self-managed and which changes require admin approval?
16. **Comparison:** Which supplier attributes may customers compare side by side?
17. **Reviews:** What makes a review eligible, verified, published, disputed or removed?
18. **Verification levels:** What checks support each public badge and when must checks be repeated?
19. **Lead disputes:** What evidence, reporting window and resolution process apply to an invalid-lead complaint?
20. **Messaging:** Will GMO provide in-platform messaging or only reveal approved contact details after assignment?
21. **Availability:** Can suppliers pause new leads, and how should this affect matching?
22. **Supplier ranking:** Which transparent, measurable quality signals may affect organic ordering?
23. **Customer accounts:** Which enquiry history and communication features are available to anonymous versus registered customers?
24. **Commercial model:** How do monthly versus annual subscriptions perform, and should a separate pay-per-lead/hybrid experiment ever be evaluated?
25. **Customer notifications:** Which status updates should customers receive, through which channels and under what consent/notice?
26. **Portfolio rights:** What supplier declarations, moderation standards and removal process are required for uploaded project media?

---

19. **Website reuse:** What specific findings from the repository/site audit would justify extending the current website versus rebuilding it?
20. **Pilot geography and categories:** Which exact service categories and locations have enough supplier coverage to launch responsibly?
21. **Pilot operations:** What are GMO's staffed operating hours, expected review times and escalation process for urgent requests?
22. **Customer verification:** Which verification method is proportionate for each contact channel, and at what point is it required?
23. **Supplier availability:** What response window and follow-up schedule should be used when a supplier is asked to accept a specific enquiry?
24. **Pilot entitlement:** How will the five-free-assignment/annual-subscription rule be handled during a pilot before payment collection is enabled? Obtain explicit product-owner approval and record the decision.
25. **Acquisition channels:** Which Facebook/social, SEO, referral or paid campaigns will be tested first, and what attribution method will be used?
26. **Pilot success thresholds:** After baseline data is collected, what minimum qualified-enquiry, match, supplier-response, customer-outcome and cost metrics justify expansion?
27. **Customer follow-up:** Which follow-up messages and timing are appropriate, and what consent/communication basis supports each channel?

# 36. Updated AI coding-agent instructions for marketplace work

In addition to Section 26, follow these rules when implementing Bark-inspired marketplace features:

1. Treat Bark as a reference, not a specification to copy.
2. Preserve GMO's approved subscription choices (R200/month or R1,200/year after five free qualified assignments), five-free-assignment baseline and admin-confirmed dispatch.
3. Reuse the canonical Supplier, Category, SupplierCategory, SupplierServiceArea, Enquiry and LeadAssignment entities.
4. Do not create a second lead, supplier, customer or subscription model to support a new UI.
5. Keep browse/contact and guided quote-request journeys connected to the same canonical enquiry service.
6. Store category-specific questions as versioned configuration and preserve the version used for each enquiry.
7. Keep supplier preferences separate from admin-confirmed category and service-area coverage.
8. Make match explanations traceable to structured data.
9. Keep reviews, verification, profile completeness and supplier ranking as distinct concepts.
10. Never fabricate ratings, reviews, qualifications, prices, availability or conversion statistics.
11. Treat supplier lead feedback as a review case, not an automatic quota refund.
12. Protect customer contact data at every API, Server Action, dashboard and notification boundary.
13. Add tests for both enquiry paths, category question versioning, supplier visibility, lead isolation, matching, quota, review moderation and dispute resolution.
14. Keep advanced marketplace features behind explicit product decisions and feature flags where appropriate.
15. Update this skill and an ADR whenever an approved product decision changes the canonical model or business rules.


---

# 37. Final engineering principles

GrowMeOnline should be built around these principles:

1. **Business correctness first:** the system must follow the six-stage business process.
2. **One source of truth:** PostgreSQL and the application services own business state.
3. **Secure by default:** authorization, privacy and validation are enforced on the server.
4. **Human oversight:** admins qualify and dispatch leads in the MVP.
5. **Reliable transactions:** quota, assignments, audit records and outbox events remain consistent.
6. **Idempotent integrations:** retries must not duplicate business effects.
7. **Modular monolith:** keep the first architecture understandable and economical.
8. **Measured scalability:** optimize using actual usage and performance evidence.
9. **Tested invariants:** critical rules are protected by automated tests.
10. **Documented decisions:** business and engineering changes are explicit and reviewable.

**This v2.5 document is the current GrowMeOnline engineering master specification.** It preserves the supplier onboarding, six-stage process, admin-led enquiry review, five-free-qualified-assignment allowance, and personal business pages; it now offers R200/month and R1,200/year subscription choices, while retaining the customer acquisition/conversion direction, privacy, security, concurrency, integration and testing controls.

The v2.1 specification preserves the v2.0 business invariants and extends the product with a Bark-inspired dual-discovery marketplace, guided quote requests, richer supplier tools, reviews, trust controls and lead-quality operations. Bark's credit-based pricing is benchmark research only; it does not replace GMO's current annual subscription model. The specification becomes the active implementation standard after the product owner confirms the open commercial and operational decisions in Sections 25 and 35.


---

## Version history
- **v2.5 — 25 November 2026:** Approved R200/month as a lower-commitment paid subscription option alongside R1,200/year after the five-free-qualified-assignment allowance; documented monthly-to-annual upgrade intent, comparative annual savings, shared core entitlement principle and remaining billing/legal decisions.
- **v2.4 — 25 November 2026:** Evolved GMO positioning toward customer acquisition and conversion; added RemodelBoom lead-reactivation/revenue-conversion benchmark; made human follow-up and outcome tracking part of pilot operations; defined dormant-lead reactivation as a later consent- and data-governance-gated experiment; corrected version metadata.
- **v2.3 — 24 November 2026:** Added screenshot-derived GrowMeOnline brand palette and semantic UI token guidance. Primary teal `#135858`, deep navy `#020618`, muted blue-grey `#62748E`, and logo lime `#ABC945`; marked provisional neutral recommendations and required CSS/contrast verification during the existing-site audit.


- **v2.2 — 24 November 2026:** Added MVP-first delivery strategy, existing-site audit gate, simplified customer and admin-operated launch scope, Kandua/Snupit benchmark, customer contact verification and consent requirements, per-enquiry supplier availability confirmation, social acquisition experiments, pilot metrics and phased deferral of supplier/customer self-service, payments and advanced AI. Preserved v2.1 architecture and approved commercial invariants.
- **v2.1 — 22 November 2026:** Added Bark-inspired marketplace benchmark, dual customer discovery, supplier experience, reviews/trust, matching fairness, admin marketplace operations and extended marketplace roadmap.
