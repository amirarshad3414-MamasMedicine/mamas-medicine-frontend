"use client";
import React from "react";
import { SlideShell } from "../components/SlideShell";
import { OnboardingQuestions1 } from "../../../devlinkModified/OnboardingQuestions1";

// Page 9 — reuses the devlink OnboardingQuestions1 component (gentle intro with
// its native lavender gradient panel). The component's own Back/Next links are
// hidden in the funnel via [id$="_btn"], so SlideShell provides navigation.
export function GentleQuestionsSlide({ onBack, onNext }) {
  return (
    <SlideShell onBack={onBack} onNext={onNext}>
      <OnboardingQuestions1 />
    </SlideShell>
  );
}
