"use client";
import React, { useEffect } from "react";
import { PrimaryButton } from "../components/SlideShell";
import { SF, cn } from "../sf-styles";
import { trackPixelEvent } from "../../../lib/metaPixel";
import DeepReading from "../../components/DeepReading";
// Reuse the PAID insight's styling so the free teaser gets the same coloured
// borders, bold headings, typography and spacing (client request).
import "../../soulReading.css";

// Teaser insight + upsell CTA (testimonials removed per client).
export function TeaserSlide({ teaser, onUnlock }) {
  // The teaser is the user's free insight. Fire ViewContent once when it is
  // shown. `source: "free"` distinguishes this from the dashboard journey; the
  // sessionStorage dedupe in trackPixelEvent keeps it to a single fire even if
  // the slide re-mounts (e.g. the user navigates back and forward to it).
  useEffect(() => {
    trackPixelEvent("ViewContent", {
      source: "free",
      content_name: "free_insight_teaser",
    });
  }, []);

  return (
    // Trim horizontal padding on mobile so more words fit per line (client).
    <div className={cn(SF.section, "max-sm:!px-3")}>
      <div className={SF.container}>
        <div className={SF.headingWrap}>
          <div className={SF.eyebrow}>Your free insight</div>
          <h2 className={SF.heading}>The hidden story between you</h2>
        </div>

        {/* Render the teaser through the SAME renderer + stylesheet as the paid
            insight: bold section headings, coloured key-tip borders, matching
            typography and spacing. `reading-card` tightens its own horizontal
            padding on mobile. */}
        <div className="w-full max-w-[52rem] mx-auto">
          <div className="reading-card reading-deep max-sm:!px-4">
            <DeepReading text={teaser?.teaser} />
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <PrimaryButton onClick={onUnlock} full>
            Ready to go deeper?
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
