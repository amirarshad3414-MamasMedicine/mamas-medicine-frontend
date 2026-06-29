"use client";
import React from "react";
import { SlideShell } from "../components/SlideShell";
import { SectionHeading } from "../components/MarketingSlide";
import { OnboardingNames } from "../../../devlinkModified/OnboardingNames";

// Slide 8 — reuses the devlink OnboardingNames component (names + pronouns).
export function NamesSlide({ slideRef, formData, isParent, onBack, onNext }) {
  return (
    <SlideShell onBack={onBack} onNext={onNext}>
      <div ref={slideRef}>
        <SectionHeading
          eyebrow="Birth details"
          heading="First, what should we call you both?"
        />
        <OnboardingNames formData={formData} isParent={isParent} />
      </div>
    </SlideShell>
  );
}
