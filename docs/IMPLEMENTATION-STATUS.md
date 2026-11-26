# GrowMeOnline implementation status

**Updated:** 26 November 2026  
**Target:** v2.6 connected supplier/client account and business-profile scope  
**Status vocabulary:** `NOT_STARTED`, `IN_PROGRESS`, `BLOCKED`, `IN_REVIEW`, `DONE`

This is a repository snapshot, not a claim of production readiness. See [`IMPLEMENTATION-PLAN.md`](./IMPLEMENTATION-PLAN.md) for the ordered work and acceptance criteria.

## Workstream status

| Workstream | Status | Current evidence / remaining work |
|---|---|---|
| A. Foundation and audit | IN_PROGRESS | Phase 0 audit and platform ADR exist; current package scripts and stack are known. `docs/TECH-STACK.md` and the complete v2.6 test baseline remain to be added. |
| B. Identity and authentication | IN_PROGRESS | Better Auth supports signup, sign-in/out, email verification and password reset. Homepage auth actions are present. Account profile management, account-flow security tests and complete rate-limit coverage remain. |
| C. Supplier registration | NOT_STARTED | Admins can create/review suppliers and link an existing account. Supplier self-service draft, submission, resubmission and owner-scoped editing are absent. |
| D. Client registration/account | NOT_STARTED | Generic user signup exists, but there is no `Client` model, client profile, account-scoped enquiry history, or verified guest-linking flow. |
| E. Supplier business page | IN_PROGRESS | Public `/b/[slug]` pages and directory use approved/verified supplier data. Complete field visibility, offerings, media, indexability controls, JSON-LD and slug redirect history remain. |
| F. Supplier profile data/media | NOT_STARTED | No `SupplierOffering` or `MediaAsset` model/storage integration. Storage provider and media/privacy policy are not selected. |
| G. Admin supplier operations | IN_PROGRESS | Supplier register, review, audit, readiness, enquiries and follow-ups exist. Supplier-submission review UI, category/location CRUD, private media moderation and separate indexability control remain. |
| H. SEO and discovery | IN_PROGRESS | Public supplier metadata, sitemap and robots routes exist. Structured data, richer category/location discovery, profile indexability, image SEO and slug-change redirects remain. |
| I. Account-linked enquiries | IN_PROGRESS | Guest guided and supplier-targeted enquiries share a canonical model/service. `Enquiry.clientId`, authenticated-client association, client history and verified guest linking are absent. |
| J. Subscription/entitlement | BLOCKED | Five-assignment quota ledger exists. Paid subscription/payment models and checkout are absent; provider and billing terms require owner approval. Do not activate payments. |
| Quality and release gates | IN_PROGRESS | Fourteen unit tests, lint, and production build pass. Database integration and Playwright acceptance suites, privacy/legal review, backup/restore, and production smoke tests remain. |

## Current safeguards and constraints

- Public enquiry intake is closed by default and also requires five eligible suppliers per category/city.
- The last recorded coverage report (26 November 2026) found `0/6` combinations ready. Simulation suppliers are excluded; refresh with `npm run db:pilot-readiness` before any launch decision.
- Supplier-specific requests are restricted to the selected supplier unless customer approval for an alternative is obtained.
- Dispatch writes quota, audit, and outbox records transactionally; outbox events do not send provider messages.
- Public visibility requires an approved, verified, active, non-deleted supplier.
- Development remains local. The authorized Neon database is for testing only, not live customer/supplier records; production deployment and destructive resets require separate approval.
- Do not enable live intake, payment collection, uploads, or automated messaging until the relevant owner decisions and launch gates are complete.

## Verification evidence

| Check | Latest recorded result |
|---|---|
| `npm test` | Pass: 14 unit tests covering routing, quota boundary, status transitions, and phone normalization. |
| `npm run lint` | Pass. |
| `npm run build` | Pass, including Prisma generation and TypeScript. |
| `npm run db:pilot-supply-test` | Pass: five-supplier gate verified in a transaction; test supplier rows rolled back. |
| `npm run db:pilot-simulate` | Pass: 3 simulated suppliers, availability responses, dispatches, quota entries, history transitions, and outbox events verified. Simulation rows persist and are marked; no messages were sent. |
| `npm run db:pilot-readiness` | Last recorded: `0/6` combinations ready. Re-run before relying on coverage. |
| Database integration / Playwright | Not yet established for the v2.6 account/profile journeys. |

## Next actions

1. Add `docs/TECH-STACK.md` and review repository/environment boundaries.
2. Review canonical schema additions and create a migration design for `Client`, supplier offerings/media metadata, profile visibility, and enquiry ownership.
3. Implement client account/profile/history and ownership-scoped access.
4. Implement supplier onboarding and owner-scoped editing, then connect it to admin review.
5. Resolve media provider and supplier verification/privacy decisions before enabling dependent public behavior.
6. Complete public profile/SEO and account-linked enquiry acceptance criteria.
7. Keep billing disabled until payment provider and terms are approved.
8. Add isolated integration and browser tests; run them against approved synthetic/test data before any live-data validation.
