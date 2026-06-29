"use client";
import React from "react";
import { PrimaryButton } from "../components/SlideShell";
import { MarketingSlide } from "../components/MarketingSlide";
import { SF } from "../sf-styles";
import { TESTIMONIALS } from "../lib";

// Slide 17 — renders the teaser insight + testimonials, with an upsell CTA.
export function TeaserSlide({ teaser, onUnlock }) {
  return (
    <div className={SF.section}>
      <div className={SF.container}>
        <div className={SF.headingWrap}>
          <div className={SF.eyebrow}>Your free insight</div>
          <h2 className={SF.heading}>The hidden story between you</h2>
        </div>

        <div className={SF.teaserBody}>{teaser?.teaser}</div>

        <div className={SF.testimonialGrid}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={SF.testimonial}>
              <div>“{t.quote}”</div>
              <div className={SF.testimonialAuthor}>{t.author}</div>
            </div>
          ))}
        </div>

        <MarketingSlide
          heading="Ready to go deeper?"
          paragraphs={[
            "This insight explores just one layer of your relationship. Your full Soul Sighted Reading reveals why this pattern exists, the gifts hidden inside it, the challenges you're most likely to face, and practical guidance for navigating the dynamic.",
          ]}
        >
          <PrimaryButton onClick={onUnlock} full>
            Unlock my full reading
          </PrimaryButton>
        </MarketingSlide>
      </div>
    </div>
  );
}
