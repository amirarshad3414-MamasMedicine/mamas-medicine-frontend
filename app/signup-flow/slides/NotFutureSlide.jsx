"use client";
import React from "react";
import { SlideShell } from "../components/SlideShell";
import { MarketingSlide } from "../components/MarketingSlide";
import { SF } from "../sf-styles";

// Page 4 — "This isn't about predicting the future" + Bri testimonial.
export function NotFutureSlide({ onBack, onNext }) {
  return (
    <SlideShell onBack={onBack} onNext={onNext}>
      <MarketingSlide
        heading="This isn't about predicting the future"
        paragraphs={[
          "It's about helping you understand the connection that's already unfolding between you.",
          "Many parents tell us they feel greater clarity about things they've felt for years and more compassionate toward themselves and their parent or child after reading their insight.",
        ]}
      >
        <div className={SF.reviewCard}>
          <div className={SF.reviewHead}>
            <div>
              <div className={SF.reviewName}>Bri</div>
              <div className={SF.reviewRole}>Mum and Step Mum</div>
            </div>
            <div className={SF.reviewStars}>★★★★★</div>
          </div>
          <p className={SF.reviewQuote}>
            It was spot on, but in a very gentle, accepting way. It explained our
            energy in a way that I truly feel.
          </p>
        </div>
      </MarketingSlide>
    </SlideShell>
  );
}
