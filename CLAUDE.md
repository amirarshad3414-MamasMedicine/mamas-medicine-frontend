@AGENTS.md

# Backend: FastAPI on Neon — **the cutover happened (2026-08-31)**

Xano is **retired**. It is a frozen historical archive, not a source of truth and
not in any live path. Do not point anything at it, and do not "fix" something by
sending it back to Xano.

**Live backend:** `https://soulsighted.bytescripterz.com` — a FastAPI port of the
Xano `scripters` group, on a DigitalOcean droplet, backed by **Neon Postgres 18**.
Source of truth on this Mac: `../soul-sighted-backend` — **read its `STATE.md`
first.**

Everything now runs through it, verified end to end with real traffic:

| Path | Points at |
|---|---|
| This frontend (live site + `.env.local`) | `soulsighted.bytescripterz.com` |
| Stripe `checkout.session.completed` webhook | `soulsighted.bytescripterz.com/checkout` |
| Analytics dashboard (`../soul-sighted-analytics`) | `soulsighted.bytescripterz.com/onboarding_visit_stats` |

## ⚠️ Never run the backend test suite

The droplet and this Mac **share one Neon database**, and `pytest` TRUNCATEs it.
Running the suite wipes live customer data. There is no separate test DB yet.

## Server access

```
ssh droplet                       # alias → root@134.209.38.11, key ~/.ssh/amirdevops-droplet
systemctl status soul-sighted     # gunicorn + 2 uvicorn workers on 127.0.0.1:8000
journalctl -u soul-sighted -f     # request log — this is how the send_email bug was found
```
Code `/opt/soul-sighted-backend`, env `/opt/soul-sighted-backend/.env` (chmod 600,
LIVE Stripe key), nginx :443 + Let's Encrypt. Redeploy = rsync + chown + restart;
the exact command is in the backend's `STATE.md`. Gotchas that already bit us:
do **not** add `EnvironmentFile=` to the systemd unit (systemd keeps inline `#`
comments, the app refuses to boot); `server_name` is the domain, so the bare IP
404s; the server's `.env` has `DEBUG=false` and `CORS_ORIGINS`, this Mac's does not.

## Reading Xano's behaviour (still the specification)

When behaviour is in question, the dumped XanoScript in
`../soul-sighted-backend/xano-export/xanoscript/` is **the spec** — read the `.xs`
file rather than guessing. That is what settled the `send_email` bug below.
Xano's Metadata API still works for structure reads, but there is no reason to
touch it now that the migration is done.

# The bug class that survived 153 tests

**Xano parses strings; Python truthiness does not.** Stripe stores metadata as
strings, so the checkout webhook receives `send_email` as the *word* `"false"`.
Xano did `|to_bool` (correct); the port did `bool()`, and any non-empty string is
`True` — so **every** purchase fired the insight email. On a dashboard purchase
that happened at payment time, *before* `submit_onboarding` had generated
anything, so the customer got a **blank reading** and then the real one two
minutes later. Fixed in `4692a2b`, deployed.

Every other coercion filter in Xano's live endpoints (`to_bool`, `to_decimal`,
`first_notempty`, `set_ifnotempty`, `to_text`) has since been audited against the
port — all match. But keep the lesson: **the webhook is the only endpoint taking
raw unvalidated input**, tests fed it real booleans, and reality sends strings.

# Email architecture — who triggers, who sends

Four different emails, three different senders. Worth knowing before debugging
"the email didn't arrive".

| Email | Triggered by | Sent by | To |
|---|---|---|---|
| **Reading** ("living energy" / "snap shot") | backend | Klaviyo | customer |
| **Teaser** ("hidden story") | the browser, after `submit_onboarding` | Gmail via `/api/send-teaser` | customer |
| **Purchase alert** | backend webhook | Gmail via `/api/send-purchase-email` | **hi@soul-sighted.com** (internal, not the customer) |
| **Password OTP** | the browser | Gmail | customer |

**The reading is a two-hop round trip.** Backend → `…/api/send-insight` → Klaviyo
event `Insight Ready` → a Klaviyo *flow* → which calls **back** into this repo at
[app/send-email/route.js](app/send-email/route.js) with a `deep` flag:
- `deep: false` → subject *"The snap shot of …"*, renders **`summary_text` only**
- `deep: true` → subject *"The Living energy between …"*, renders **`deep_text` only**

So every buyer gets **two** reading emails by design, staggered by the Klaviyo flow.

**Which backend call sends the reading depends on the flow** — this is the part
that confuses:
- **Dashboard** add-a-child: `submit_onboarding` sends it (`has_purchase` is true
  by then). The webhook does **not** — that flow sets `send_email: false`.
- **Signup funnel**: the **checkout webhook** sends it (`send_email: true`).
  `submit_onboarding` runs *before* payment there, so it only sends the teaser.

**Deliverability is a real pre-launch problem.** The teaser, OTP and purchase
alert all go out from a personal Gmail (`ramshamzamop@gmail.com`, hardcoded app
password) with no domain authentication — they **land in spam** on strict
receivers (proven against a university mailbox). Only the Klaviyo reading arrives
reliably. Fix = send from the domain.

# Onboarding funnel analytics

`/signup-flow` records which stage each visitor reaches, split by relationship
flow, into the `onboarding_visit` table — see
[app/signup-flow/track.js](app/signup-flow/track.js). Stages are recorded on
**arrival**, not on the Next click, so the stage someone abandoned is captured.
(The table now lives in **Neon**, reached through the new backend.)

**When counting users, count distinct `(session_id, flow)` — never rows.** One
person produces up to 17 rows.

The dashboard that reads this is a **separate Next.js project** at
`../soul-sighted-analytics`, not part of this repo. It runs on port 3001 and now
reads from the deployed backend.

# Where everything is written down

Read these rather than re-deriving:

| Document | What it is |
|---|---|
| `../soul-sighted-backend/STATE.md` | **Read first.** What is done, settled, and next |
| `../soul-sighted-backend/xano-export/xanoscript/` | Dumped source of every Xano endpoint. **The specification** |
| [xano-to-fastapi-migration-plan.md](xano-to-fastapi-migration-plan.md) | The plan (v4.1) — phases, milestones, triage decisions |
| `../soul-sighted-backend/xano-export/formats.md` | Wire-format contract — epoch-ms timestamps, null-vs-empty per column |
| `../soul-sighted-backend/xano-export/inventory.csv` | All 72 endpoints across 5 groups, each with a triage decision |

Only API group 4 (`scripters`) was ever real. Groups 1–3 are Xano's starter
template and group 5 is the Stripe template; none carried traffic.

# Standing rules

1. **Auth parity** — every ported endpoint keeps exactly the auth Xano gave it.
   Nothing gains a lock, nothing loses one. The one agreed exception is the
   login → password-reset redirect (Xano hashes are peppered and unverifiable, so
   migrated users must reset once). Hardening is separate work.
2. **Destructive DB actions need explicit approval.** The wipe-and-reimport
   script empties every table. Always `scripts/backup_neon.py` first.

# Session memory

Longer-lived context — the funnel's 17 stages, the analytics dashboard's design
decisions, and outstanding follow-ups (including credentials that need rotating)
— is in this project's memory directory, indexed by `MEMORY.md`. Read it before
picking up analytics or backend work.
