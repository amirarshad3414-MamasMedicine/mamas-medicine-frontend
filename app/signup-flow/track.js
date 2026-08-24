// Records which stages of the /signup-flow funnel a visitor reaches, split by
// relationship flow ("child" | "parent"), via the Xano `track_onboarding_visit`
// endpoint. Xano keeps one row per session per flow per stage, so these counts
// are users-who-reached-stage-N rather than page views.
import { request } from "../../devlinkModified/env";

const SESSION_KEY = "onboarding_session_id";

/* One id per browser, reused across reloads, so a visitor who refreshes or
   navigates back through the funnel stays a single person in the counts. */
function sessionId() {
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "no-storage";
  }
}

/* Records the purchase. Returning from Stripe is a full page load, so React
   state — and with it the chosen flow — is gone. `flow` is instead carried
   through Stripe in the return URL and handed back here; only a valid value is
   forwarded, so a tampered or truncated query string falls through to Xano's
   inference rather than writing a bogus flow. */
export function trackPurchase(step, stepIndex, flow) {
  if (typeof window === "undefined") return;

  const body = { session_id: sessionId(), step, step_index: stepIndex };
  if (flow === "child" || flow === "parent") body.flow = flow;

  request({
    method: "POST",
    endpoint: "track_onboarding_visit",
    body,
  }).catch(() => {});
}

export function trackOnboardingStage(flow, step, stepIndex) {
  if (typeof window === "undefined" || !flow || !step) return;

  // Always sends — the request stays visible in the network tab, and Xano is
  // what decides whether the row is new. Fire-and-forget: analytics must never
  // block or break the funnel.
  request({
    method: "POST",
    endpoint: "track_onboarding_visit",
    body: {
      session_id: sessionId(),
      flow,
      step,
      step_index: stepIndex,
    },
  }).catch(() => {});
}
