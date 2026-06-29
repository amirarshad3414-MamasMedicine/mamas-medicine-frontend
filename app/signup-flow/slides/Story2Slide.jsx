"use client";
import React from "react";
import { SlideShell } from "../components/SlideShell";
import { MarketingSlide } from "../components/MarketingSlide";

export function Story2Slide({ onBack, onNext }) {
  return (
    <SlideShell onBack={onBack} onNext={onNext}>
      <MarketingSlide
        heading="Every relationship has a story"
        paragraphs={[
          "Some feel easy. Some feel intense. Some seem to repeat the same challenges again and again.",
          "The Hidden Story Between You reveals the deeper patterns shaping your connection — helping you see what may have been there all along.",
        ]}
      />
    </SlideShell>
  );
}
