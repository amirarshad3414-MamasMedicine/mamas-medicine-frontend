# Xano → FastAPI Migration Plan (v4.1)

**Target stack:** FastAPI · PostgreSQL 16 (Docker for dev) · SQLModel/SQLAlchemy · asyncpg · Alembic · PyJWT + pwdlib/bcrypt

**Scope of this version:** build and verify the FastAPI backend to full parity with Xano. **Data migration (table export/import, file/asset transfer, cutover-day data sync) is deliberately out of scope** and will be planned separately once the backend is proven. Consequence: the Phase 9 runbook is a skeleton, and Phase 8's diff is limited in a specific way — see 8.2.

**Status — 2026-08-25.** Phases 0, 1, 3, 4, 5 and 6 are **done**. All **21** live
endpoints of the `scripters` group are ported with **138 passing tests**, in a
separate repo at `~/Documents/soul-sighted-backend` — read its `STATE.md` first.
Four endpoints are deliberately **not ported** (see Phase 2). Phase 8's scripts
are **written and tested**, but no capture has run — that still needs approval,
so the diff has no corpus. Phase 9 remains blocked on the data-migration plan.

**Cutover model (unchanged):** big-bang, single maintenance window, no routing map. Blast radius is every user at once, so **the parity diff is the only safety net.**

**Auth decision (PROVISIONAL — gated on empirical test #1):** the current assumption is that password hashes are not verifiable → **forced password reset** for password users at cutover. This assumption has never been tested. Test #1 in 1.7 settles it, and a positive result removes the reset, the reset wave, and the email risk in Phase 6 entirely. Do not build around the reset until test #1 has failed.

**Auth parity rule (decided):** every endpoint keeps exactly the authentication it
has in Xano. Nothing gains a lock, nothing loses one. Only 5 of the 25 live endpoints
require `auth = "user"` (`add_children`, `auth/me`, `get_child_by_id`, `get_children`,
`submit_onboarding`); the rest are open and stay open. Security hardening — including
Stripe webhook signature verification on `checkout` — is separate work after cutover,
not folded into the port, so the parity diff stays meaningful.

**Source-of-truth rules:**
- **Logic** = XanoScript dumps (`include_xanoscript=true`), all 14 object types. Never prose or screenshots (raw Metadata JSON on demand only, when XanoScript is ambiguous).
- **Wire format** = **real table rows**, profiled directly (Appendix A). Column-level serialization is not knowable from XanoScript and not reliably stated by the spec.
- **Non-table response shapes and all error bodies** = captured real calls (1.4). Only these require going and asking Xano.
- **Extraction** = Metadata API directly over HTTP. The workspace MCP server has four read-only data tools and no request history — not the extraction path.

---

## Phase 0 — Prerequisites & Setup

1. Metadata API access token, **read-only scopes** (Instance Workspace: Read **and** Workspace Database: Read — without the second, table schema/index calls 403 while endpoint dumps succeed, producing a partial inventory that looks complete).
2. Repo skeleton:

```
backend/
├── docker-compose.yml
├── .env                      # DB creds, JWT secret, Stripe/insights/email keys — NEVER COMMIT
├── .gitignore                # must cover .env and xano-export/responses/
├── requirements.txt
├── alembic/
├── xano-export/              # committed EXCEPT responses/
│   ├── xanoscript/<type>/<name>.xs
│   ├── schemas/              # incl. per-field access/hidden flags
│   ├── formats.md            # Appendix A — the wire-format contract
│   ├── specs/                # OpenAPI, cross-check only
│   ├── responses/            # GITIGNORED — may contain real user data
│   └── inventory.csv
├── app/
│   ├── main.py
│   ├── config.py
│   ├── database.py
│   ├── models/
│   ├── schemas/
│   ├── routers/
│   ├── services/
│   ├── tasks/                # background jobs (APScheduler/ARQ)
│   ├── webhooks/             # Stripe + insights receivers, idempotent
│   └── core/
│       ├── security.py       # PyJWT, pwdlib/bcrypt
│       └── deps.py
├── scripts/
│   ├── dump_xano.py          # existing dump script, extended to all 14 types
│   ├── profile_tables.py     # derives Appendix A from live table rows
│   ├── capture_responses.py  # the ~24 targeted calls in 1.4
│   ├── diff_responses.py     # the safety net
│   └── cleanup_test_data.py
└── tests/
```

3. **requirements.txt:** `fastapi`, `uvicorn[standard]`, `sqlmodel`, `asyncpg`, `alembic`, `pydantic-settings`, `pyjwt`, `pwdlib[bcrypt]`, `httpx`, `apscheduler`, `slowapi`, `pytest`, `pytest-asyncio`.
   *Not used:* `python-jose`, `passlib` (unmaintained; jose has had CVEs).

---

## Phase 1 — Extraction & Open Questions

Everything lands in `xano-export/` before code is written. Phase 1 has **exit criteria** — the migration does not proceed on unanswered questions. Nothing here runs on calendar time; Phase 1 is a week of work, not a waiting period.

### 1.1 XanoScript — all 14 object types

Dump every type: api endpoints, functions, **tasks**, triggers, table triggers, **middleware**, addons, tools, agents, mcp_server, realtime channels, workflow tests (+ tables and API groups for schema/metadata). `include_xanoscript=true` works on the **list** endpoints, so this is one call per collection, not one per object.

The two silent killers:
- **Middleware** runs on every request and appears in no endpoint's source. If it isn't extracted here, Phase 6 recreates it from memory.
- **Background tasks** — exit criterion: **identify what moves Insights rows `processing → ready`.** Live evidence points to a polling task: the three `failed` rows carry `"Attempt N failed: …"` messages, i.e. numbered retries. Confirm against `xanoscript/task/`.

### 1.2 Table schemas — including hidden-field flags

Full schema per table **plus per-field access/hidden flags**. `add_children` sets `enforce_hidden_fields = false`, so hidden fields are behaviorally live — they affect what is written and what appears in responses. A schema export without these flags is subtly wrong. Note UUID-PK vs integer-PK tables (relevant when the data-migration plan is written).

### 1.3 OpenAPI specs

Per group, filed as cross-check for paths and parameters only.

### 1.4 Response contract — profile first, then a short call list

Wire format is **derived from real table rows**, not collected by waiting. `profile_tables.py` reads each table and records, per column: JSON type, null-vs-empty convention, and format. This already produced Appendix A and required no traffic.

Traffic capture was previously scoped as "several days of real usage." Measured rate is **~0.7 new children/day** (5 in the last 7 days; 38 in the last 30), and the `/signup-flow` funnel has 9 users total. Several days of waiting yields a handful of signup-path calls and zero coverage of dashboard, reset, OTP, purchase or any error path. **Passive capture is dropped as the primary method.**

What actually needs a real call — roughly two dozen, one sitting:

- **Non-table-shaped responses** (the row profile can't cover these): `auth/login`, `auth/signup`, `register_passwordless`, `update_password`, `otp/store`, `verify_otp`, `submit_onboarding`, `create_checkout_session`, `onboarding_visit_stats`, `places_autocomplete`, `track_onboarding_visit`, `deliver_email`.
- **One failing call per endpoint** — the error envelope is in no table and in no XanoScript. `add_children` declares `error = "Record already exists"` but not the body shape; [devlinkModified/env.js](devlinkModified/env.js) reads `data?.message`, so if the key differs every UI error becomes "Request failed".
- **Table-shaped endpoints** (`get_children`, `get_child_by_id`, `add_children`, `auth/me`, `get_pending_emails`) need only a spot-check against Appendix A, plus `add_children` with and without `place_of_birth_id` to pin the conditional `place_id` graft.

Classify every pair **read or write** — this drives replay safety in 8.1. Run the write calls under dedicated test accounts. `responses/` is **gitignored**: real calls under real accounts capture mothers' emails and children's names, birth dates and birthplaces.

### 1.5 Auth inventory

- Count password-based vs passwordless/OTP users. **The base is ~211 distinct users** (from `children`), not 400+ — that figure was `Purchases` rows, and rows are not users. Confirm against the users table.
- Inventory all auth flows as separate tracker rows: password login, passwordless registration, OTP issue/verify, forgot/reset password.
- **Confirm whether a passwordless user has any login path that does not go through email.** `register_passwordless` is called only at signup ([app/signup-flow/page.jsx:187](app/signup-flow/page.jsx#L187)); no passwordless *login* endpoint exists in the frontend. If the only route back is forgot-password → OTP, then passwordless users depend on email exactly as much as password users do, and Phase 7's "unaffected" claim is wrong.
- Locate the email/SMS provider used for reset + OTP delivery; credentials → `.env`.

### 1.6 External surface inventory

- **Webhooks pointing at Xano:** Stripe (writes Purchases) and the insights provider (calls back with `request_id`). Record registered URLs and handler behavior — a named cutover step; forgetting it means payments keep succeeding while Purchases silently stop recording.
- **Six hardcoded Xano URLs** to change at cutover: `devlinkModified/env.js:1`, `app/api/env.js:1`, `app/api/cron/route.js:3`, `forgot-password/route.js:4`, `reset-password/route.js:33`, `verify-otp/route.js:6`.
- Env vars/secrets used by stacks → `.env`.

### 1.7 Empirical tests (each is minutes of work, and each gates real work)

1. **Password-hash exportability — do this first.** Does `GET /workspace/1/table/{users_id}/content` return the password column? If yes and it's bcrypt, `pwdlib` verifies it directly: **no forced reset, no reset wave, no email-transport crisis.** This single check governs the auth decision in the header and the whole of Phase 6 item 2. (If the instance is on Essential/Pro, the Direct Database Connector reaches raw Postgres and answers it definitively.)
2. **`==?` operator — ANSWERED from production data.** All 16 duplicate-children groups have `date_of_birth = null`. If `==?` were null-safe, the exists-check would have matched and blocked them; it did not. So `==?` behaves like standard SQL `=` — **NULL never matches NULL**, and the duplicate check silently passes whenever dob is absent. The FastAPI port must use plain `==`, **not** `IS NOT DISTINCT FROM`, or it will reject inserts Xano accepts and the diff will fail.
3. **`relationship_focus`** — declared required, frontend omits it in one call site. Does it actually 400 today? Note 384 of 505 existing rows hold `""`, so it is not being enforced as a non-empty value.
4. **Branch isolation** — do NOT assume a Xano branch is a data sandbox; branching is a logic construct and the DB is instance-wide. Verify before using a branch in 8.1.

**Phase 1 exit criteria:** all 14 types dumped · Insights mover identified · Appendix A complete for every table · the ~24 targeted calls captured and classified · auth split counted and the passwordless login question answered · webhooks inventoried · all four empirical tests answered.

---

## Phase 2 — Triage

Every inventory row gets a decision: **port as-is / fix during port / drop**.

| Item | Finding | Decide |
|---|---|---|
| `pronouns` vs `pronoun` | frontend sends `pronouns`, endpoint declares `pronoun` — silently dropped today | fix field name on one side |
| `relationship_focus` | required but omitted by one caller; 384/505 rows are `""` | fix or relax |
| `data?.child_id` vs `id` | frontend reads a key the response doesn't return — likely always undefined | fix frontend or mirror in response |
| `place_of_birth` | accepted, never stored | store it or stop accepting it |
| `session` table | 0 rows vs 400+ Purchases — checkout isn't writing where `create_checkout_session` implies | fix flow or drop table |
| `?payment_failed` cancel URL | nothing handles it | fix or drop |
| **7 stuck Insights** | `processing` forever, empty `last_error` — six from 2026-04-29 (117d), one from 2026-08-05 (19d). The retry logic marks `failed` with a message; these never reached it. Real users with no insight. | fix the mover with a timeout/dead-letter, and decide what happens to the 7 |
| **Dead columns** | `user_01_id` and `time_of_birth` are null in all 505 children rows; no XanoScript writes them | port or drop |
| **Email cron ownership** | [app/api/cron/route.js](app/api/cron/route.js) runs on a Vercel schedule in the *frontend* repo and drains the email queue — it is the transport for any reset wave | stays in Next, or moves to `app/tasks/` |
| **52 duplicate children** | The unique index is on `(user_01_id, name, date_of_birth)`, but `user_01_id` is NULL in all 505 rows and Postgres treats NULLs as distinct — so it never fires. `add_children` checks `user_id` instead, unbacked by any index. 16 duplicate groups exist; one child is recorded 22 times. | move the index to `user_id`, and decide what to do with the 52 rows |
| **47 template endpoints** | Groups 1-3 are Xano's starter template (zero traffic); group 5 is the Stripe template writing the empty `session` table | drop all 47 |
| **`update_password` has no proof of identity** | Takes `email` + `newPassword` only. No auth, no OTP check, nothing tying it to `verify_otp`. Account takeover from an email address alone. | fix with a signed reset token — a deliberate behaviour change, so it needs its own commit and its own diff exception |
| **`otp/store` is open** | Anyone can set an OTP and expiry on any known address | same family as above |
| Dead objects from the dump | unreferenced functions, disabled endpoints | mark dropped |

### Decided — not ported

Four endpoints in the live group are **not being ported**, all Memberstack-era:

| Endpoint | Why |
|---|---|
| `validate_user` | Decodes Memberstack JWTs against `MEMBERSTACK_JWK` |
| `sync_user` | Writes the legacy `User_01` table |
| `sync_purchase` | Records purchases for a Memberstack member |
| `dashboard_state` | Cannot succeed today regardless: it authenticates through the Memberstack validator, requires `child.user_01_id` to match (null in all 505 rows), and queries `Insights.user_id`, a column that does not exist |

`User_01` holds 33 rows, all created 2026-02-23..2026-03-19 and none since; the
`children` table begins 2026-03-20, the day after. No Memberstack reference
survives in the frontend.

**The `User_01` table and its data are kept, not dropped** — Amir's decision.
Confirm those 33 people were carried into the `user` table before anyone
reconsiders that.

Exit criterion: no undecided rows.

---

## Phase 3 — Postgres in Docker + Data Layer

### 3.1 Docker

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: app_password
      POSTGRES_DB: app_db
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d app_db"]
      interval: 5s
      retries: 5
volumes:
  pgdata:
```

`postgresql+asyncpg://app:app_password@localhost:5432/app_db`. Alembic wired from day one. Production later = same migrations against managed Postgres.

### 3.2 Models — must satisfy Appendix A

Types map nearly 1:1 (both sides are Postgres). Beyond that, three rules the real data imposes:

1. **No strict enums on Xano text columns.** Every one can hold `""`. `status` is documented `processing|ready|failed` but one row holds `""`; `relationship_focus` is documented `child|parent` but 384 rows hold `""`. A strict enum rejects rows that exist today.
2. **Null-vs-empty is per column, not per project.** `children` uses `null` for `pronoun`, `date_of_birth`, `time_of_birth`, `user_01_id`. `Insights` uses `null` in no column at all — every empty value there is `""`. Encode each column as observed, per Appendix A.
3. **Never drop null keys from responses.** Xano emits every key on every row. FastAPI's `exclude_none`/`exclude_unset` would silently change the shape of every response — leave them off.

Recreate relationships and indexes explicitly against the schema export; encode hidden-field knowledge from 1.2 into response models (a hidden field must not leak into a response even though it exists in the table).

### 3.3 Seed/test data

With data migration out of scope, development runs on **seed data**: a small fixture set per table, values drawn from Appendix A's real shapes rather than lorem ipsum, loaded via `tests/fixtures`.

---

## Phase 4 — Response Schemas

Pydantic models come from three sources in priority order:
1. **Appendix A** for every column-level format — this is a hard contract, not a suggestion.
2. **XanoScript** for shape and composition, including **conditional keys** (`place_id` present only when `place_of_birth_id` was non-null → `place_id: str | None`, condition documented in the model docstring).
3. **Captured calls** (1.4) for non-table-shaped responses and every error body.

`datamodel-codegen` on the OpenAPI spec is permitted only as a scaffold for trivial endpoints, always corrected against the above. Where the spec disagrees with observed reality, **reality wins**; log the discrepancy in the tracker.

---

## Phase 5 — Route Scaffolding

One `APIRouter` per API group; exact paths, methods, params; every handler stubbed `501` so the full contract renders in `/docs` immediately. Diff `/docs` against Xano's Swagger per group before writing logic. Match envelopes exactly as captured — no assumed pagination wrappers (none observed).

---

## Phase 6 — Business Logic

Port per the triage list, translating from XanoScript nearly line-by-line:
- Query All Records → `select()`; filters → `where()`; addons → joins/`selectinload`; External API Request → `httpx.AsyncClient`; each shared custom function ported **once** into `services/`.
- **`add_children` duplicate rule** per empirical test #2. Reproduce the silent Google failure path deliberately (a `REQUEST_DENIED` leaves lat/lon null and the record still saves) — behaviour changes belong in their own commit, post-cutover.
- **Middleware** → FastAPI middleware/dependencies on the same scopes Xano applied.
- **Background tasks** → `app/tasks/`, including the Insights mover, **with the timeout/dead-letter the current one lacks** (see the 7 stuck rows).
- **Triggers/table triggers** → service calls or PG triggers, per triage.
- Error behavior replicated via `HTTPException`, verified against captured error pairs.
- Per endpoint: happy-path + auth/validation test → mark ported.

**Order:**
1. Smallest group end-to-end — proves the template.
2. **If and only if test #1 fails (hashes not exportable): replace the email transport before building the reset flow.** Today, [app/api/auth/forgot-password/route.js:7-14](app/api/auth/forgot-password/route.js#L7-L14) sends OTP mail through a personal Gmail account with credentials inline and no env fallback, and the queue cron sends serially through the same account. A reset wave of ~200 users hits Gmail's daily cap, has no SPF/DKIM alignment with the brand domain so it lands in spam, and the cron's `isRunning` guard is module-level state that does not reliably persist across serverless invocations — so overlapping runs can double-send. Under a forced reset, mail in spam means locked out. Move to a transactional provider (Resend/Postmark/SES) on a verified sending domain, then port the reset flow.
3. Remaining auth: password login, `register_passwordless`, OTP issue/verify.
4. **Webhook receivers** (Stripe, insights) — idempotent from the start: dedupe on Stripe event ID / provider `request_id`.
5. Everything else by frontend importance.

---

## Phase 7 — Auth Implementation

1. PyJWT issue/verify; `get_current_user` dependency.
2. pwdlib/bcrypt. **If test #1 passed:** import the hashes, no reset, users log in unchanged. **If it failed:** forced reset for password users, with a `must_reset` flag on the users model; login for flagged accounts returns a response the frontend turns into a reset redirect. (How existing users arrive with the flag set is a data-migration concern — deferred.)
3. **Passwordless/OTP users are not automatically safe.** All sessions die at cutover (new JWT secret), and if 1.5 confirms their only way back is forgot-password → OTP, they depend on email delivery exactly as password users do. Size the wave and the announcement to include them until proven otherwise.
4. CORS mirroring Xano's origins; `slowapi` rate limits at minimum on login, OTP and reset endpoints.

---

## Phase 8 — Parity Verification (the only safety net)

> **Gate: do not start this phase without explicit approval.** Everything in it
> sends traffic to the live Xano API, and the write replays create real rows on
> real users. Building and testing locally needs no approval; replaying does.

### 8.1 Replay safety (writes mutate production)

Replaying `POST /add_children` against live Xano creates a real child on a real user; `create_checkout_session` hits Stripe.
- **Reads:** replay freely against both backends.
- **Writes:** dedicated **test accounts** only, with `cleanup_test_data.py` removing created rows after each run.
- **Stripe in test mode** for any checkout replay.
- Use a Xano branch as sandbox **only if** empirical test #4 proved data isolation; otherwise treat live Xano as production at all times.

### 8.2 What the diff can and cannot prove while data migration is deferred

Xano holds real data; FastAPI holds seed data. Replaying the same request against both therefore produces different **values** by construction — a captured `get_children` call returns that user's real children from Xano and nothing from FastAPI, and that difference says nothing about correctness.

So under this scope the diff runs in **two modes**, and the plan is honest that only the first is available now:

- **Shape diff (available now, required for M8):** status code, key set, key order-independence, JSON type per key, null-vs-empty per key, and error bodies. This is exactly what Appendix A and the captured error pairs make checkable, and it catches the whole class of frontend-breaking bugs (a date as string instead of int, a dropped null key, a changed error key).
- **Value diff (deferred with the data plan):** identical bodies for identical requests. Requires FastAPI to hold the same rows, which is data migration.

**M8 therefore means "shape-diff clean", not "full parity".** The header's claim that the diff is the only safety net still holds — but under this scope that net has a known hole, and cutover cannot happen until the value diff runs.

### 8.3 Coverage gate

`diff_responses.py` must report **endpoints in inventory vs endpoints with ≥1 pair**, and fail below 100%. Without this, an endpoint nobody captured passes silently and "diff clean" means "diff ran on 12 of 17."

### 8.4 Load & monitoring

- Load-test hot endpoints (`locust`/`k6`) — plus the reset endpoint at wave volume, if a reset is happening.
- Sentry (or similar) wired and alerting **before** cutover day.

---

## Phase 9 — Cutover (skeleton — blocked on the data-migration plan)

The backend can be built and shape-verified without it, but **cutover cannot happen until data migration is planned and rehearsed**, because production Postgres must hold the real users, children, Purchases and Insights before the frontend switches.

1. T-7: announcement email + in-app banner (session sign-out; reset notice if applicable; window time).
2. Maintenance mode. **Note that this stops browsers, not Stripe** — see step 6.
3. **[DATA MIGRATION — separate plan: export/import, file transfer, verification, `must_reset` flagging]**
4. Deploy FastAPI to production; smoke-test directly.
5. **Re-register both webhooks** (Stripe dashboard, insights provider) → send a test Stripe event and a test insights callback → confirm both land and dedupe. **This precedes the frontend deploy:** if the frontend moves first, checkout runs on FastAPI while Stripe still notifies Xano, and those Purchases rows land in a frozen database.
6. **Reconcile the window:** query the Stripe API for events between the export and the webhook switch, and replay them into FastAPI. Stripe retains events, so this is recoverable — but only as a named step.
7. Deploy frontend with the six URLs updated.
8. Lift maintenance; watch intensively (Sentry, error rates, reset completion if applicable, first real Stripe event, first real insights callback, Insights `processing → ready` under the ported mover).

**Rollback (honest bound):** revert = frontend URLs back to Xano + webhooks re-registered back. Clean **only before users write to Postgres** — and note the counterintuitive part: **a user who successfully resets their password has set it in Postgres, and Xano does not know it.** The better the reset wave goes, the less recoverable rollback becomes. Cut over in the lowest-traffic window, decide within the first hours, then fix forward.

---

## Phase 10 — Post-Cutover

1. First 72h: monitor webhook deliveries, background task runs, and the reset wave if there is one.
2. Week 1–2: fix forward; keep Xano frozen and untouched.
3. When quiet: final Xano backup → archive with `xano-export/` (the permanent spec of the old system) → downgrade/cancel Xano.

---

## Milestones

- [x] **M0** Repo + Docker Postgres + Alembic — Postgres runs on **5433**; 5432 is taken by a native install
- [x] **M1** Extraction — 96 XanoScript objects, 13 table schemas, Insights mover identified, empirical tests 1–3 answered
  - [ ] response corpus (needs approval), auth user split, branch-isolation test
- [ ] **M2** Triage — rows still undecided: duplicate-children index, the 7 stuck insights, birth times, `update_password`, Stripe signature verification
- [x] **M3** Models + migration applied; nullability, per-type defaults and indexes reproduced from the Xano schema
- [x] **M4** Response schemas — Appendix A enforced in the models
- [x] **M5** Template group ported (`get_children` first), tests green
- [ ] **M6** **Mandatory** — empirical test #1 came back negative, so the forced reset is confirmed. Email transport not yet replaced.
- [x] **M7** All auth flows ported — webhook receivers **partially** idempotent: `checkout` dedupes by `child_id`, the no-account branch does not
- [ ] **M8** All 21 endpoints ported with 138 tests ✅ and the parity tooling written ✅ — but no capture has run (it needs approval), so the shape-diff has no corpus yet; load tests and Sentry outstanding
- [ ] **M9** *(deferred)* Data-migration plan — still the real gate on cutover

**Not started:** deployment, the six hardcoded Xano URLs in the frontend, and
the capture run itself.

**Phase 8 tooling — written 2026-08-25, no traffic sent.** `scripts/` now holds
`capture_responses.py`, `diff_responses.py`, `cleanup_test_data.py` and the
shared `parity_lib.py`, with 33 tests over the diff logic. `--list` prints the
call plan and its coverage without sending anything; capture refuses to run
without `--i-have-approval`, and writes need `--allow-writes` as well. The
planned calls cover all 21 PORT endpoints, so the 8.3 gate can pass. Appendix A
below is executable in `parity_lib.CONTRACT` — change both together.

---

## Appendix A — Wire-format contract

Derived from live rows (505 `children`, 332 `Insights`). FastAPI responses must match these exactly; a mismatch breaks the frontend regardless of whether the logic is correct.

| Kind | Format on the wire | Notes |
|---|---|---|
| `created_at` | **integer, epoch milliseconds** — `1787561676634` | Not ISO. Written by Xano, appears in no XanoScript. |
| `date_of_birth` | **string `YYYY-MM-DD`** — `"2026-08-05"` | A different format from `created_at` in the same table. |
| uuid PKs (`id`, `child_id`, `journey_id`, `request_id`) | **string** | |
| `user_id`, `real_user_id` | **integer** | Mixed PK conventions across tables. |
| `lat`, `lon` | JSON number — float in 357 rows, plain integer in 148 | Model as float; do not assume a decimal point is always present. |
| JSON columns (`insights_api_payload`) | **object**, keys `p1Lat, p1Lon, p2Lat, p2Lon, person_1, person_2` | JSONB. |
| booleans (`default_child`) | **`false`** | Not `0`, not `""`. |
| Missing keys | **never** — every row carries every key | Do not enable `exclude_none` / `exclude_unset`. |
| Empty values, `children` | `null` for `pronoun`, `date_of_birth`, `time_of_birth`, `user_01_id`; `""` for `name`, `relationship_focus` | Per column. |
| Empty values, `Insights` | `""` everywhere — **no column uses null** | Opposite convention from `children`. |

Regenerate with `scripts/profile_tables.py` after any schema change, and extend it to the remaining tables (users, Purchases, Email, onboarding_visit, session) during Phase 1.
