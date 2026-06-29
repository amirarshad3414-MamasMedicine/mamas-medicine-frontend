"use client";
import React from "react";
import { SlideShell } from "../components/SlideShell";

// Slides 10-13 — one connection question per slide. `Component` is one of the
// devlink OnboardingQuestion2-5 components, each rendered on its own slide.
export function QuestionSlide({ Component, slideRef, formData, isParent, onBack, onNext }) {
  return (
    <SlideShell onBack={onBack} onNext={onNext}>
      <div ref={slideRef}>
        <Component formData={formData} isParent={isParent} />
      </div>
    </SlideShell>
  );
}
