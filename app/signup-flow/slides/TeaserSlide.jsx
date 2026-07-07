"use client";
import React from "react";
import { PrimaryButton } from "../components/SlideShell";
import { SF } from "../sf-styles";

// Teaser insight + upsell CTA (testimonials removed per client).
export function TeaserSlide({ teaser, onUnlock }) {
  return (
    <div className={SF.section}>
      <div className={SF.container}>
        <div className={SF.headingWrap}>
          <div className={SF.eyebrow}>Your free insight</div>
          <h2 className={SF.heading}>The hidden story between you</h2>
        </div>

        <div className={SF.teaserBody}>{teaser?.teaser}</div>

        <div className="flex justify-center mt-10">
          <PrimaryButton onClick={onUnlock} full>
            Ready to go deeper?
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
