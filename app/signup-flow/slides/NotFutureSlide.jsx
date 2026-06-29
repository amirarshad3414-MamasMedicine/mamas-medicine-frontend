"use client";
import React from "react";
import { SlideShell } from "../components/SlideShell";
import { MarketingSlide } from "../components/MarketingSlide";

export function NotFutureSlide({ onBack, onNext }) {
  return (
    <SlideShell onBack={onBack} onNext={onNext}>
      <MarketingSlide
        heading="This isn't about predicting the future"
        paragraphs={[
          "It's about helping you understand the connection that's already unfolding between you.",
          "Many parents tell us they feel seen, understood and more compassionate toward themselves and their child after reading their insight.",
        ]}
      />
    </SlideShell>
  );
}
