// Shared logic, constants and helpers for the /signup-flow marketing funnel.
// Kept separate from the slide components and styling so each concern is editable
// on its own.
import swal from "sweetalert";

/* Same journey id used by the production onboarding flow (OnboardingMain). */
export const JOURNEY_ID = "fff90478-924f-4ec7-95a1-68b5549a0ec9";

/* Stripe price used by the dashboard purchase flow (DashboardJourneys). The old
   price_1TJpsTBpexBWLlCZSca5AXtq was a test-mode price and failed against the
   live Stripe key; this is the live price the dashboard checkout uses. */
export const STRIPE_PRICE_ID = "price_1TJk4pBpexBWLlCZ4U9PiHMZ";

export const BACK_ICON =
  "/back-arrow.png";

/* Ordered slide keys. Navigation works on this list, so splitting or
   reordering slides is just an edit here. */
export const STEPS = [
  "relationship", // 1  Which relationship (My child / My parent)
  "story2", // 2  Every relationship tells a story
  "map", // 3  We'll map the energy of the relationship (image)
  "notFuture", // 4  This isn't about predicting the future (+ testimonial)
  "names", // 5  Names (OnboardingNames)
  "birthdays", // 6  Birth details (OnboardingBirthdays)
  "confirm", // 7  Detail confirmation (DataConfirmationStep)
  "personal", // 8  Free-text message (OnboardingPersonal -> raw_user_message)
  "gentleQuestions", // 9  A few gentle questions intro
  "q2", // 10 Connection question 1 (climate / Step1)
  "q3", // 11 Connection question 2 (activation / Step2)
  "q4", // 12 Connection question 3 (closeness / Step3)
  "q5", // 13 Connection question 4 (posture / Step4)
  "email", // 14 Enter email -> kicks off register/create/submit chain
  "progress", // 15 Animated progress bars while submit_onboarding runs
  "teaser", // 16 Teaser analysis
  "buy", // 17 Buy now -> Stripe
  "afterPurchase", // 18 After purchase
];
export const idx = (key) => STEPS.indexOf(key);
export const SCRAPE_STEPS = new Set([
  "relationship",
  "names",
  "birthdays",
  "personal",
  "q2",
  "q3",
  "q4",
  "q5",
]);

export const PROGRESS_STEPS = [
  "Retrieving birth chart data",
  "Mapping your unique relationship dynamic",
  "Identifying the strongest relationship patterns",
  "Exploring the growth and gifts hidden in the connection",
  "Creating your personalised insight",
];

/* Time (ms) for each progress bar to fill 0 -> 100, index-aligned with
   PROGRESS_STEPS. Bars 1-2 are quick; bars 3-4 are deliberately slow (~2 min
   combined) to cover submit_onboarding's generation time. The final bar fills
   to 80% over its duration, then holds until the API response arrives and
   completes to 100%. Tune these freely. */
export const PROGRESS_STEP_DURATIONS = [6000, 10000, 12000, 15000, 15000];

/* Once the API response arrives (ready), every remaining bar fills 0 -> 100 at
   this speed so the user isn't held on the slow durations above. */
export const PROGRESS_FAST_FORWARD_MS = 700;

/* Testimonials shown as a slider on the progress slide — one per progress bar,
   switching as each new bar begins (index-aligned with the active bar, clamped
   to the last one for the final bar). */
export const PROGRESS_TESTIMONIALS = [
  {
    quote:
      "It's so good and accurate and helpful! I was holding back tears on the train!!",
    name: "Laylah",
    role: "Mum of 5 & 8 yr old",
  },
  {
    quote:
      "That is incredible! I can't believe how good it is - including suggestions and ways to help the relationship.",
    name: "Amanda",
    role: "Mum of 4 adult children",
  },
  {
    quote:
      "Wow… Wow. We just read this together and both of us couldn't agree more with every aspect of this reading ❤️",
    name: "Jacqui",
    role: "Mum of 2 teenagers",
  },
  {
    quote:
      "It described the power struggle between us so specifically — and it was spot on, but in a very gentle, accepting way.",
    name: "Bri",
    role: "Mum + Step Mum",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "I finally understood why we keep having the same argument. It was like someone held up a mirror with so much compassion.",
    author: "— Sarah, mum of two",
  },
  {
    quote:
      "I felt seen. The insight put words to things I'd felt for years but could never explain.",
    author: "— Daniel, dad",
  },
  {
    quote: "Reading this changed how I show up for my daughter. Worth every cent.",
    author: "— Priya, mum",
  },
];

/* --------------------------------------------------------------------------
   Payload mapping — mirrors mapToOnboardingPayload / convertStep in
   app/onboardingMain/page.jsx so we hit submit_onboarding the same way.
   -------------------------------------------------------------------------- */

// Normalise curly vs straight apostrophes so radio values reliably match the map.
const norm = (s) => (s || "").replace(/[‘’]/g, "'").trim();

const STEP_MAP = {
  climate: {
    "Mostly easy and enjoyable": "mostly_easy_and_enjoyable",
    "A mix of easy moments and hard moments": "mix_easy_and_hard",
    "Often intense or emotionally heavy": "intense_or_emotionally_heavy",
    "Quiet, gentle, and steady": "quiet_gentle_steady",
    "It changes a lot depending on what's going on": "changes_a_lot",
    "Distant or hard to connect": "distant_or_hard_to_connect",
  },
  activation: {
    "Yes - they know how to push my buttons": "pushes_my_buttons",
    "Sometimes, in specific situations": "sometimes",
    "Rarely - our bond feels steady": "rarely_steady",
    "It changes over time": "changes_over_time",
  },
  closeness: {
    "Very close and connected": "very_close_connected",
    "Close, with healthy space": "close_healthy_space",
    "Close, but I'd love more depth": "close_want_more_depth",
    "Close but it's charged!": "close_but_charged",
    "We're re-building closeness as we grow": "rebuilding_closeness",
  },
  posture: {
    "Their safe place": "safe_place",
    "Their guide": "guide",
    "Their emotional support": "emotional_support",
    "Their quiet cheerleader": "quiet_cheerleader",
    "Their boundary-setter": "boundary_setter",
    "It changes all the time": "changes_all_the_time",
  },
};

export const convertStep = (step, key) => {
  if (!key) return null;
  const normalisedKey = norm(key);
  const map = STEP_MAP[step];
  for (const k in map) {
    if (norm(k) === normalisedKey) return map[k];
  }
  return null;
};

export function mapToOnboardingPayload(data) {
  return {
    username: data["parent-name"] || "",
    childname: data["child-name"] || "",

    user_dob: data["parent_birth_date"] || null,
    user_time_of_birth: data["parent_birth_time"] || null,
    user_birth_place_id: data["parent_place_id"] || "",

    child_dob: data["child_birth_date"] || null,
    child_time_of_birth: data["child_birth_time"] || null,
    child_birth_place_id: data["child_place_id"] || "",

    raw_user_message: data["raw_user_message"] || "",

    climate: convertStep("climate", data["Step1"]),
    activation: convertStep("activation", data["Step2"]),
    closeness: convertStep("closeness", data["Step3"]),
    posture: convertStep("posture", data["Step4"]),

    summary: "",
    emotionTags: "",
    keyThemes: "",

    parentPronouns: data["Parent-s-Pronouns"] || "",
    childPronouns: data["Child-s-Pronoun"] || "",
  };
}

/* --------------------------------------------------------------------------
   DOM scraping — the reused devlink form components write to named inputs.
   We collect those values scoped to the active slide, the same way
   OnboardingMain does.
   -------------------------------------------------------------------------- */
export function scrapeInputs(root) {
  if (!root) return {};
  const inputs = Object.fromEntries(
    [...root.querySelectorAll("input")]
      .filter((x) => x.type !== "radio" && x.type !== "checkbox")
      .map((x) => [x.name, x.value])
  );
  const radios = Object.fromEntries(
    [...root.querySelectorAll('input[type="radio"]:checked')].map((x) => [
      x.name,
      x.value,
    ])
  );
  const selects = Object.fromEntries(
    [...root.querySelectorAll("select")].map((x) => [x.name, x.value])
  );
  const areas = Object.fromEntries(
    [...root.querySelectorAll("textarea")].map((x) => [x.name, x.value])
  );
  return { ...areas, ...inputs, ...selects, ...radios };
}

function validateNames(data, isParent) {
  if (!data["parent-name"]) return "Your name is required";
  if (!data["Parent-s-Pronouns"]) return "Your pronouns are required";
  if (!data["child-name"])
    return isParent ? "Your child's name is required" : "Your parent's name is required";
  if (!data["Child-s-Pronoun"])
    return isParent
      ? "Your child's pronouns are required"
      : "Your parent's pronouns are required";
  return null;
}

function validateBirthdays(data, isParent) {
  if (!data["parent_birth_date"]) return "Your date of birth is required";
  if (!data["parent_place_id"]) return "Your birthplace is required";
  if (!data["child_birth_date"])
    return isParent
      ? "Your child's date of birth is required"
      : "Your parent's date of birth is required";
  if (!data["child_place_id"])
    return isParent
      ? "Your child's birthplace is required"
      : "Your parent's birthplace is required";
  return null;
}

export function validateForStep(key, merged, isParent) {
  switch (key) {
    case "relationship":
      return merged.relationship_focus
        ? null
        : "Please choose whose relationship you'd like to explore";
    case "names":
      return validateNames(merged, isParent);
    case "birthdays":
      return validateBirthdays(merged, isParent);
    case "q2":
      return merged.Step1 ? null : "Please choose an answer to continue";
    case "q3":
      return merged.Step2 ? null : "Please choose an answer to continue";
    case "q4":
      return merged.Step3 ? null : "Please choose an answer to continue";
    case "q5":
      return merged.Step4 ? null : "Please choose an answer to continue";
    default:
      return null;
  }
}

export const errorSwal = (text) =>
  swal({
    title: "Error",
    text: text || "Something went wrong. Please try again.",
    icon: "error",
    className: "custom-swal-error",
  });
