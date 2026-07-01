"use client";
import React from "react";
import { SlideShell } from "../components/SlideShell";
import { OnboardingPersonal } from "../../../devlinkModified/OnboardingPersonal";

// Reuses the devlink OnboardingPersonal component — a free-text message that is
// scraped as `raw_user_message` and sent to submit_onboarding for richer insight.
export function PersonalSlide({ slideRef, formData, isParent, onBack, onNext }) {
  return (
    <SlideShell onBack={onBack} onNext={onNext}>
      <div ref={slideRef}>
        <OnboardingPersonal formData={formData} isParent={isParent} />
      </div>
    </SlideShell>
  );
}
