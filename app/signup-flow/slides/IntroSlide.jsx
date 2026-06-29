"use client";
import React from "react";
import { SlideShell } from "../components/SlideShell";
import { MarketingSlide } from "../components/MarketingSlide";

export function IntroSlide({ onNext }) {
  return (
    <SlideShell onNext={onNext} nextLabel="Begin">
      <MarketingSlide
        eyebrow="The Hidden Story Between You"
        heading="Discover the hidden story between you"
        paragraphs={[
          "Every relationship carries a story — patterns of connection, tension and love that play out again and again.",
          "In just a few minutes, we'll map the unique dynamic between you and someone you love, and reveal a free personalised insight into what's really going on beneath the surface.",
          "No cost to begin. Just a few gentle questions.",
        ]}
      />
    </SlideShell>
  );
}
