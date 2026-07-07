"use client";
import React from "react";
import { SlideShell, PrimaryButton } from "../components/SlideShell";
import { MarketingSlide } from "../components/MarketingSlide";
import { SF } from "../sf-styles";

// Slide 16 — captures email and triggers the register/create/submit chain.
export function EmailSlide({ email, setEmail, onSubmit, processing, onBack }) {
  return (
    <SlideShell onBack={onBack}>
      <MarketingSlide
        eyebrow="Almost there"
        heading="Where should we send your free insight?"
        paragraphs={[
          "We'll send your free insight directly to your inbox so you can come back to it again and again.",
        ]}
      >
        <div className={SF.fieldWrap}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSubmit();
            }}
            className={SF.input}
          />
          <PrimaryButton onClick={onSubmit} disabled={processing} full>
            Get my free insight
          </PrimaryButton>
        </div>
      </MarketingSlide>
    </SlideShell>
  );
}
