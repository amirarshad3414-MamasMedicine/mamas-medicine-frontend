"use client";
import React from "react";
import { SlideShell } from "../components/SlideShell";
import { OnboardingBirthdays } from "../../../devlinkModified/OnboardingBirthdays";

// Slide 9 — reuses the devlink OnboardingBirthdays component (it has its own heading).
export function BirthdaysSlide({ slideRef, formData, isParent, onBack, onNext }) {
  return (
    <SlideShell onBack={onBack} onNext={onNext}>
      <div ref={slideRef}>
        <OnboardingBirthdays formData={formData} isParent={isParent} />
      </div>
    </SlideShell>
  );
}
