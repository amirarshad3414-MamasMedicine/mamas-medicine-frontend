// Counts how many users enter each onboarding in /signup-flow — the "my child"
// flow vs the "my parent" flow — via the Xano `track_onboarding_visit` endpoint.
import { request } from "../../devlinkModified/env";

const SESSION_KEY = "onboarding_session_id";

/* One id per browser, reused across reloads, so the same person is identifiable
   across visits and repeat rows can be collapsed when the counts are read. */
function sessionId() {
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    // Private mode / storage disabled: still record the visit, just without a
    // stable identity for it.
    return "no-storage";
  }
}

export function trackOnboardingChoice(flow) {
  if (typeof window === "undefined" || !flow) return;

  // Always sends, so the call is visible in the network tab every time.
  // Fire-and-forget: analytics must never block or break the funnel.
  request({
    method: "POST",
    endpoint: "track_onboarding_visit",
    body: {
      session_id: sessionId(),
      flow,
      step: "relationship",
      step_index: 0,
    },
  }).catch(() => {});
}
