"use client";
import React from "react";
import { SlideShell } from "../components/SlideShell";
import { MarketingSlide } from "../components/MarketingSlide";

export function ChartSlide({ onBack, onNext }) {
  return (
    <SlideShell onBack={onBack} onNext={onNext}>
      <MarketingSlide
        heading="A unique map of your connection"
        paragraphs={[
          "At the moment you were born, the sky created a unique map.",
          "When two people come together, those maps create a third pattern — the relationship itself. We call this a Relationship Chart.",
          "It can reveal why certain strengths, challenges and growth opportunities naturally arise between you.",
        ]}
      />
    </SlideShell>
  );
}
