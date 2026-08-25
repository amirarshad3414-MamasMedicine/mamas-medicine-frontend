@AGENTS.md

# Backend: Xano

The backend is Xano, not code in this repo. Two separate surfaces, and the
difference matters:

- **Structure** — tables, API endpoints, MCP tools, indexes — is only reachable
  through the **Metadata API** (`https://xnrw-fohw-scw8.a2.xano.io/api:meta/...`)
  with `Content-Type: text/x-xanoscript`. Needs a Personal Access Token.
  Workspace `1`, app API group `4` (`scripters`, canonical `uUEiFEze`).
- **Data** — the MCP tools on the `xano` MCP server. They are read-only queries
  and cannot create or alter anything.

**Never guess XanoScript.** Read a working endpoint with
`GET /api:meta/workspace/1/apigroup/4/api/{id}?include_xanoscript=true`, or use
the docs index at https://docs.xano.com/llms.txt. Known gotchas: `if` only works
inside `conditional { if (...) {...} else {...} }`; an `input {}` block is
required even when empty; `db.query` return types are exists / count / single /
list / stream only — there is no aggregate or DISTINCT, so enforce uniqueness
with a unique index.

The frontend calls Xano through `devlinkModified/env.js` (`request({method,
endpoint, body})`), base `api:uUEiFEze/`.

# Replacing Xano with FastAPI

A FastAPI port of the Xano `scripters` group lives in a **separate repo** at
`../soul-sighted-backend`. All 21 live endpoints are ported with 138 passing
tests. Nothing has switched over — this frontend still calls Xano, and the six
hardcoded Xano URLs are untouched.

**Where everything is written down.** Read these rather than re-deriving:

| Document | What it is |
|---|---|
| `../soul-sighted-backend/STATE.md` | **Read first.** What is done, what is already settled, what is next |
| [xano-to-fastapi-migration-plan.md](xano-to-fastapi-migration-plan.md) | The plan (v4.1) — phases, milestones, triage decisions |
| `../soul-sighted-backend/README.md` | How to run it (Postgres on **5433**, not 5432) |
| `../soul-sighted-backend/xano-export/xanoscript/` | The dumped source of every Xano endpoint. **The specification.** When behaviour is in question, read the `.xs` file |
| `../soul-sighted-backend/xano-export/inventory.csv` | All 72 endpoints across 5 groups, each with a triage decision |
| `../soul-sighted-backend/xano-export/formats.md` | The wire-format contract responses must satisfy — epoch-ms timestamps, nulls kept, per-column null-vs-empty |
| `../soul-sighted-backend/xano-export/parity-questions.md` | Open questions only a live Xano response can settle |
| `../soul-sighted-backend/xano-export/REDACTIONS.md` | The one credential removed from the dump before committing |

**Two standing rules**, both agreed with Amir:

1. **Auth parity** — every ported endpoint keeps exactly the auth Xano gives it.
   Nothing gains a lock, nothing loses one. Only five require a token. Security
   hardening is separate work, after cutover, so the parity diff stays honest.
2. **No live-Xano traffic without approval** — reading structure through the
   Metadata API is fine; sending requests to the app's own API is not, because
   the write replays create real rows on real accounts.

Only API group 4 (`scripters`) is real. Groups 1–3 are Xano's starter template
and group 5 is the Stripe template; none carry traffic. The live Stripe webhook
is `POST api:uUEiFEze/checkout`, **not** group 5's `webhooks`.

# Onboarding funnel analytics

`/signup-flow` records which stage each visitor reaches, split by relationship
flow, into the Xano `onboarding_visit` table — see
[app/signup-flow/track.js](app/signup-flow/track.js). Stages are recorded on
**arrival**, not on the Next click, so the stage someone abandoned is captured.

**When counting users, count distinct `(session_id, flow)` — never rows.** One
person produces up to 17 rows.

The dashboard that reads this is a **separate Next.js project** at
`../soul-sighted-analytics`, not part of this repo.

# Session memory

Longer-lived context — the funnel's 17 stages, the analytics dashboard's design
decisions, and outstanding follow-ups (including credentials that need rotating)
— is in this project's memory directory, indexed by `MEMORY.md`. Read it before
picking up analytics or Xano work.
