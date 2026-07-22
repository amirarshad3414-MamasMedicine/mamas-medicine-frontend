"use client";
import React from "react";
import { SlideShell, PrimaryButton } from "../components/SlideShell";
import { MarketingSlide } from "../components/MarketingSlide";
import { SF } from "../sf-styles";

const INCLUDES = [
  "Understand why this relationship feels the way it does",
  "Discover the strengths hidden inside it",
  "Learn what's really driving the challenges",
  "Grow a stronger connection together",
  
];

// Slide 18 — Buy now -> Stripe checkout.
export function BuySlide({ onBuy, checkingOut, onBack }) {
  return (
    <SlideShell onBack={onBack}>
      <MarketingSlide
        eyebrow="Your full insights are ready and waiting."
        heading="You've uncovered one layer."
        paragraphs={["Now discover everything else your relationship has been trying to show you."]}
      >
        {/* Extra top CTA so users ready to buy don't have to scroll past the
            full benefits list first. `w-full` makes this wrapper span the row so
            the button reaches its full `max-w-[32rem]` width — matching the
            bottom Buy now button exactly (client: both buttons same longer size). */}
        <div className="w-full flex justify-center py-6">
          <PrimaryButton onClick={onBuy} disabled={checkingOut} full>
            {checkingOut ? "Redirecting…" : "Buy now"}
          </PrimaryButton>
        </div>
        <ul className={SF.bullets} style={{ marginBottom: "2rem" }}>
          {INCLUDES.map((b) => (
            <li key={b} className={SF.bullet}>
              ✓ {b}
            </li>
          ))}
        </ul>
        <p className={SF.ctaNote}>
          Instant access • Saved to your private dashboard + sent to your email
        </p>
        <PrimaryButton onClick={onBuy} disabled={checkingOut} full>
          {checkingOut ? "Redirecting…" : "Buy now"}
        </PrimaryButton>
      </MarketingSlide>
    </SlideShell>
  );
}
