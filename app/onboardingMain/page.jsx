"use client";
import React, { useEffect, useState } from "react";
import { NavbarOnboarding } from "../../devlinkModified/NavbarOnboarding";
import { DashboardFooter } from "../../devlinkModified/DashboardFooter";
import "../styles.css";
import "../swal.css";

import { OnboardingBegin } from "../../devlinkModified/OnboardingBegin";
import { OnboardingNames } from "../../devlinkModified/OnboardingNames";
import { OnboardingBirthdays } from "../../devlinkModified/OnboardingBirthdays";
import { OnboardingPersonal } from "../../devlinkModified/OnboardingPersonal";
import { OnboardingQuestions1 as OnboardingQuestion1 } from "../../devlinkModified/OnboardingQuestions1";
import { OnboardingQuestion2 } from "../../devlinkModified/OnboardingQuestion2";
import { OnboardingQuestion3 } from "../../devlinkModified/OnboardingQuestion3";
import { OnboardingQuestion4 } from "../../devlinkModified/OnboardingQuestion4";
import { OnboardingQuestion5 } from "../../devlinkModified/OnboardingQuestion5";
import { OnboardingFinal } from "../../devlinkModified/OnboardingFinal";
import { OnboardingComplete } from "../../devlinkModified/OnboardingComplete";
import { DataConfirmationStep } from "./DataConfirmationStep";

import { request } from "../../devlinkModified/env";
import { trackPixelEvent } from "../../lib/metaPixel";

const STEP_KEYS = {
  5: "Step1",
  6: "Step2",
  7: "Step3",
  8: "Step4",
};

const normalizeValue = (value) =>
  typeof value === "string" ? value.replace(/\u2019/g, "'").trim() : value;

const convertStep = (step, key) => {
  const normalizedKey = normalizeValue(key);
  const map = {
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

  return map?.[step]?.[normalizedKey] || null;
};

function mapToOnboardingPayload(data) {
  console.log(data["Step3"]);
  return {
    username: data["parent-name"] || "",
    childname: data["child-name"] || "",

    user_dob: data["parent_birth_date"] || null,
    user_time_of_birth: data["parent_birth_time"] || null,
    user_birth_place_id: data["parent_place_id"] || "", 

    child_dob: data["child_birth_date"] || null,
    child_time_of_birth: data["child_birth_time"] || null,
    child_birth_place_id: data["child_place_id"] || "", 

    raw_user_message: data["raw_user_message"] || null,

    // Steps mapping (based on your form)
    climate: convertStep("climate", data["Step1"] || null),
    activation: convertStep("activation", data["Step2"] || null),
    closeness: convertStep("closeness", data["Step3"] || null),
    posture: convertStep("posture", data["Step4"] || null),

    // Optional fields (not in your current data)
    summary: null,
    emotionTags: null,
    keyThemes: null,

    parentPronouns: data["Parent-s-Pronouns"] || null,
    childPronouns: data["Child-s-Pronoun"] || null,
  };
}

const validate = (step, values, isParent) => {
  const data = mapToOnboardingPayload(values);
  if (step === 1) {
    if (!data?.username) return "Your name is required";
    if (!data?.parentPronouns) return "Your pronouns are required";
    if (!data?.childname) return isParent ? "Your child's name is required" : "Your parent's name is required";
    if (!data?.childPronouns) return isParent ? "Your child's pronouns are required" : "Your parent's pronouns are required";
  }
  if (step === 2) {
    if (!data?.user_dob) return "Your date of birth is required";
    if (!data?.user_birth_place_id) return "Your birthplace is required";

    if (!data?.child_dob) return "Your child's date of birth is required";
    if (!data?.child_birth_place_id)
      return "Your child's birthplace is required";
  }
  if (step >= 5 && step <= 8) {
    const stepKey = STEP_KEYS[step];
    if (!values?.[stepKey]) {
      return "Please choose one option to continue";
    }
  }

  return "";
};

const collectCurrentFormValues = () => {
  const inputValues = Object.fromEntries(
    Array.from(document.querySelectorAll("input")).map((input) => {
      if (input.type === "radio") {
        return [input.name, input.checked ? input.value : ""];
      }
      if (input.type === "checkbox") {
        return [input.name, input.checked ? "true" : "false"];
      }
      return [input.name, input.value];
    })
  );

  const selectedRadios = Object.fromEntries(
    Array.from(document.querySelectorAll('input[type="radio"]:checked')).map(
      (input) => [input.name, input.value]
    )
  );

  const selects = Object.fromEntries(
    Array.from(document.querySelectorAll("select")).map((select) => [
      select.name,
      select.value,
    ])
  );

  const textareas = Object.fromEntries(
    Array.from(document.querySelectorAll("textarea")).map((area) => [
      area.name,
      area.value,
    ])
  );

  return {
    ...inputValues,
    ...selectedRadios,
    ...selects,
    ...textareas,
  };
};

const App = () => {
  const [step, setStep] = useState(0);
  const [results, setResults] = useState({});
  const [inlineError, setInlineError] = useState("");
  const [submitState, setSubmitState] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [childData, setChildData] = useState(null);

  // This dashboard flow explores an existing child record. Derive whether it is
  // a Child Reading (relationship_focus "child" => the user is the parent) or a
  // Parent Reading from that record so every step renders the right wording.
  const childRelation = childData?.relationship_focus || "child";
  const isParent = childRelation === "child";

  // Fetch the selected child record once and derive role info from it.
  useEffect(() => {
    const loadChildData = async () => {
      const childId = new URLSearchParams(window.location.search).get(
        "child_id"
      );
      if (!childId) {
        setChildData(null);
        return;
      }
      try {
        const token = localStorage.getItem("authToken");
        const response = await request({
          method: "GET",
          endpoint: `/get_child_by_id?child_id=${encodeURIComponent(childId)}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        const foundChild =
          response?.child ||
          response?.data ||
          response?.record ||
          response ||
          null;
        setChildData(foundChild);
      } catch (error) {
        console.error("Failed to load selected child:", error);
        setChildData(null);
      }
    };
    loadChildData();
  }, []);

  // Dashboard journey lands here after a successful Stripe payment. The
  // checkout success_url carries a real session_id (Stripe swaps in the
  // {CHECKOUT_SESSION_ID} placeholder); the non-payment re-entry path into this
  // page has no session_id, so gating on it prevents a false Purchase. The
  // sessionStorage dedupe in trackPixelEvent keeps it to a single fire.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (!sessionId || sessionId === "{CHECKOUT_SESSION_ID}") return;
    trackPixelEvent("Purchase", {
      value: 21.0,
      currency: "AUD",
      source: "dashboard",
      session_id: sessionId,
    });
  }, []);

  const sendInsightAndEmail = async () => {
    try {
      setSubmitState("submitting");
      setSubmitMessage("Preparing your insight. This usually takes less than a minute.");

      const token = localStorage.getItem("authToken");
      const mapped = mapToOnboardingPayload(results);
      const userRelation = childRelation === "child" ? "parent" : "child";
      let child_id = new URLSearchParams(window.location.search).get(
        "child_id"
      );

      if (!child_id) {
        const data = await request({
          method: "POST",
          endpoint: "add_children",
          headers: { Authorization: `Bearer ${token}` },
          body: {
            name: mapped.childname,
            dob: mapped.child_dob,
            place_of_birth: results["child"],
            place_of_birth_id: mapped.child_birth_place_id,
            pronouns: mapped.childPronouns,
          },
        });
        child_id = data?.child_id;
      }

      const payload = {
        child_id,
        journey_id: "fff90478-924f-4ec7-95a1-68b5549a0ec9",
        onboarding_payload: mapped,
        user_relation : userRelation,
      };

      const response = await request({
        method: "POST",
        endpoint: "submit_onboarding",
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      });

      // ✅ Extract both status AND the actual insight from the response
      const { status } = response;

      if (status === "ready") {
        try {
          const userStr = localStorage.getItem("user");
          let email = localStorage.getItem("email");

          if (!email && userStr) {
            const user = JSON.parse(userStr);
            email = user?.email || "";
          }

          if (email) {
          }
        } catch (emailErr) {
          console.error("Failed to send first email:", emailErr);
        }

        setSubmitState("success");
        setSubmitMessage(
          "Success. Your insight is on its way to your inbox."
        );
        return;
      }

      throw new Error("We could not finish generating your insight. Please try again.");
    } catch (e) {
      setSubmitState("error");
      setSubmitMessage(e?.message || "Something went wrong while submitting.");
    }
  };

  useEffect(() => {
    if (step !== 11 || submitState !== "idle") {
      return;
    }

    sendInsightAndEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, results, submitState]);

  // f()
  // sendInsightAndEmail();

  useEffect(() => {
    let detachListeners = null;
    const timer = setTimeout(() => {
      const root = document.querySelector(".onboarding-patch");
      if (!root) return;

      const links = Array.from(root.querySelectorAll("a"));
      // Real navigation links (e.g. the "Go to dashboard" CTA, href="/dashboard")
      // must be left alone — only the step "#" buttons are wired for next/back.
      const isStepButton = (el) => {
        const href = el.getAttribute("href") || "";
        return href === "" || href === "#" || href.endsWith("#");
      };
      const nextLinks = links.filter(
        (el) => el.childElementCount === 0 && isStepButton(el)
      );
      const backLinks = links.filter(
        (el) => el.childElementCount > 0 && isStepButton(el)
      );

      const getMergedValues = () => ({
        ...results,
        ...collectCurrentFormValues(),
      });

      const updateNextButtons = () => {
        const error = validate(step, getMergedValues(), isParent);
        const disabled = Boolean(error);

        nextLinks.forEach((link) => {
          link.classList.toggle("is-disabled", disabled);
          link.setAttribute("aria-disabled", disabled ? "true" : "false");
        });

        if (!disabled && inlineError) {
          setInlineError("");
        }
      };

      const handleNext = (event) => {
        event.preventDefault();
        const newResults = getMergedValues();
        const error = validate(step, newResults, isParent);

        if (error) {
          setInlineError(error);
          updateNextButtons();
          return;
        }

        setInlineError("");
        setResults(newResults);
        setStep((prev) => (prev === 11 ? prev : prev + 1));
        document.firstElementChild?.scrollIntoView({ behavior: "smooth" });
      };

      const handleBack = (event) => {
        event.preventDefault();
        setInlineError("");
        setStep((prev) => (prev === 0 ? prev : prev - 1));
        document.firstElementChild?.scrollIntoView({ behavior: "smooth" });
      };

      const formControls = Array.from(
        root.querySelectorAll("input, select, textarea")
      );

      nextLinks.forEach((link) => link.addEventListener("click", handleNext));
      backLinks.forEach((link) => link.addEventListener("click", handleBack));
      formControls.forEach((field) => {
        field.addEventListener("input", updateNextButtons);
        field.addEventListener("change", updateNextButtons);
      });

      updateNextButtons();

      detachListeners = () => {
        nextLinks.forEach((link) =>
          link.removeEventListener("click", handleNext)
        );
        backLinks.forEach((link) =>
          link.removeEventListener("click", handleBack)
        );
        formControls.forEach((field) => {
          field.removeEventListener("input", updateNextButtons);
          field.removeEventListener("change", updateNextButtons);
        });
      };
    }, 0);

    return () => {
      clearTimeout(timer);
      if (detachListeners) {
        detachListeners();
      }
    };
  }, [step, results, inlineError, isParent]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <OnboardingBegin />;
      case 1:
        return <OnboardingNames text3="Continue" isParent={isParent} />;
      case 2:
        return <OnboardingBirthdays formData={results} isParent={isParent} />;
      case 3:
        return (
          <DataConfirmationStep
            values={results}
            onBack={() => setStep(2)}
            onContinue={() => setStep(4)}
            onEditParent={() => setStep(1)}
            onEditChild={() => setStep(2)}
            isParent={isParent}
          />
        );
      // Context box (OnboardingPersonal) now comes AFTER the Q1-4 questions,
      // matching the signup-flow order: gentle intro -> Q1-4 -> personal.
      case 4:
        return (
          <OnboardingQuestion1
            title="A quick check-in before the final questions"
            text1="These next answers help shape your insight around your real day-to-day dynamic."
            text2="Choose what feels most true right now, not what feels perfect."
            text3="No right answers. Just honest ones."
            text5="Continue"
          />
        );
      case 5:
        return <OnboardingQuestion2 text4="Continue" isParent={isParent} />;
      case 6:
        return <OnboardingQuestion3 text4="Continue" isParent={isParent} />;
      case 7:
        return <OnboardingQuestion4 text4="Continue" isParent={isParent} />;
      case 8:
        return <OnboardingQuestion5 text4="Continue" isParent={isParent} />;
      // Context page (free-text raw_user_message) sits AFTER the questions and
      // BEFORE results — matching the Free Insight (signup-flow) order:
      // q2-q5 -> personal -> results.
      case 9:
        return <OnboardingPersonal formData={results} isParent={isParent} />;
      case 10:
        return (
          <OnboardingFinal
            title="Ready to generate your insight?"
            text1="Everything looks good."
            text2="Tap finish and we will prepare your relationship insight now."
            text4="Finish"
            hideBack={true}
          />
        );
      case 11:
        return (
          <OnboardingComplete
            title="Your insight is being prepared"
            text1="Thank you for completing onboarding."
            text2="You can open your dashboard now while we send your insight to your inbox."
            text3={submitState === "submitting" ? "Preparing your insight..." : submitMessage}
            ctaText="Go to dashboard"
            ctaHref="/dashboard"
          />
        );
      default:
        return <OnboardingBegin />;
    }
  };

  return (
    <>
      <NavbarOnboarding />
      <div className="onboarding-patch">{renderStep()}</div>
      {inlineError ? (
        <div className="onboarding-inline-message" role="alert">
          {inlineError}
        </div>
      ) : null}
      <DashboardFooter />
    </>
  );
};

export default App;
