"use client";
import React, { useEffect, useState } from "react";
import { NavbarOnboarding } from "../../devlinkModified/NavbarOnboarding";
import { DashboardFooter } from "../../devlinkModified/DashboardFooter";
import { SignupForm } from "../../devlink/SignupForm";
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
import swal from "sweetalert";

const convertStep = (step, key) => {
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

  return map[step][key];
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

    raw_parent_message: data["raw_parent_message"] || null,

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

const validate = (step, values) => {
  const data = mapToOnboardingPayload(values);
  if (step == 1) {
    if (!data?.username) return "Your name is required";
    if (!data?.parentPronouns) return "Your pronouns are required";
    if (!data?.childname) return "Your child's name is required";
    if (!data?.childPronouns) return "Your child's pronouns are required";
  }
  if (step == 2) {
    if (!data?.user_dob) return "Your date of birth are required";
    if (!data?.child_birth_place_id) return "Your birthplace are required";

    if (!data?.child_dob) return "Your child's date of birth are required";
    if (!data?.child_birth_place_id)
      return "Your child's birthplace are required";
  }
};

const App = () => {
  const [step, setStep] = useState(0);
  const [results, setResults] = useState({});

  const sendInsightAndEmail = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const mapped = mapToOnboardingPayload(results);
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
      };

      const response = await request({
        method: "POST",
        endpoint: "submit_onboarding",
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      });

      // ✅ Extract both status AND the actual insight from the response
      const { status, insight, summary } = response;

      if (status == "ready") {
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

        swal({
          title: "Success",
          text: "Your insight is ready and has been sent to your email!",
          icon: "success",
          className: "custom-swal-success", // This "wraps" the modal in your class
        }).then(() => (window.location.href = "/dashboard"));
      }
    } catch (e) {
      swal({
        title: "Error",
        text: e?.message,
        icon: "error",
        className: "custom-swal-error", // This "wraps" the modal in your class
      });
    }
  };

  useEffect(() => {
    if (step !== 11) return;

    sendInsightAndEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, results]);

  // f()
  // sendInsightAndEmail();

  useEffect(() => {
    setTimeout(() => {
      console.log(document.querySelector(".onboarding-patch a"));
      document.querySelectorAll(".onboarding-patch a").forEach((el) => {
        // console.log(el, el.childElementCount)
        if (el.childElementCount === 0) {
          el.onclick = (e) => {
            e.preventDefault();
            const inputs = Object.fromEntries(
              [...document.getElementsByTagName("input")].map((x) => [
                x?.name,
                x?.type == "radio" && x?.parentElement?.nodeName == "LABEL"
                  ? x?.parentElement?.querySelector("span")?.innerText
                  : x?.value,
              ])
            );
            const radios = Object.fromEntries(
              [...document.querySelectorAll('input[type="radio"]:checked')]
                .filter(
                  (x) =>
                    x.parentElement.querySelector("div > div")?.style
                      ?.opacity == "1"
                )
                .map((x) => [
                  x?.name,
                  x?.type == "radio" && x?.parentElement?.nodeName == "LABEL"
                    ? x?.parentElement?.querySelector("span")?.innerText
                    : x?.value,
                ])
            );
            const selects = Object.fromEntries(
              [...document.getElementsByTagName("select")].map((x) => [
                x?.name,
                x?.value,
              ])
            );
            const areas = Object.fromEntries(
              [...document.getElementsByTagName("textarea")].map((x) => [
                x?.name,
                x?.value,
              ])
            );
            const newResults = {
              ...results,
              ...areas,
              ...inputs,
              ...selects,
              ...radios,
            };
            const error = validate(step, newResults);
            if (error) {
              swal({
                title: "Error",
                text: error,
                icon: "error",
                className: "custom-swal-error", // This "wraps" the modal in your class
              });
              return;
            }
            setResults(newResults);
            console.log(newResults);
            setStep((prev) => (prev == 11 ? prev : prev + 1));
            document.firstElementChild.scrollIntoView();
          };
        } else {
          el.onclick = (e) => {
            e.preventDefault();
            setStep((prev) => (prev == 0 ? prev : prev - 1));
            document.firstElementChild.scrollIntoView();
          };
        }
      });
    }, 100);
  }, [step]);
  console.log(step);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <OnboardingBegin />;
      case 1:
        return <OnboardingNames formData={results} />;
      case 2:
        return <OnboardingBirthdays formData={results} />;
      case 3:
        return <OnboardingPersonal formData={results} />;
      case 4:
        return (
          <DataConfirmationStep
            values={results}
            onBack={() => setStep(3)}
            onContinue={() => setStep(5)}
            onEditParent={() => setStep(1)}
            onEditChild={() => setStep(2)}
          />
        );
      case 5:
        return <OnboardingQuestion1 formData={results} />;
      case 6:
        return <OnboardingQuestion2 formData={results} />;
      case 7:
        return <OnboardingQuestion3 formData={results} />;
      case 8:
        return <OnboardingQuestion4 formData={results} />;
      case 9:
        return <OnboardingQuestion5 formData={results} />;
      case 10:
        return (
          <OnboardingFinal
            onBack={() => setStep(9)}
            onNext={() => setStep(11)}
          />
        );
      case 11:
        return <OnboardingComplete />;
      default:
        return <OnboardingBegin />;
    }
  };

  return (
    <>
      <NavbarOnboarding />
      <div className="onboarding-patch">{renderStep()}</div>
      <DashboardFooter />
    </>
  );
};

export default App;
