"use client";
import React from "react";
import { SlideShell } from "../components/SlideShell";
import { MarketingSlide } from "../components/MarketingSlide";

export function Story1Slide({ onBack, onNext }) {
  return (
    <SlideShell onBack={onBack} onNext={onNext}>
      <MarketingSlide
        heading="Understand the hidden story between you"
        paragraphs={[
          "Every meaningful relationship carries a story. Some parts are obvious.",
          "Some play out through the same arguments, misunderstandings, tensions and moments of connection again and again.",
          "The Hidden Story Between You reveals the deeper patterns shaping your relationship — helping you see what may have been there all along.",
        ]}
      />
    </SlideShell>
  );
}
