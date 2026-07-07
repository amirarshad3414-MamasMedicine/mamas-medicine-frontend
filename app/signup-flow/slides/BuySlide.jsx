"use client";
import React from "react";
import { SlideShell, PrimaryButton } from "../components/SlideShell";
import { MarketingSlide } from "../components/MarketingSlide";
import { SF } from "../sf-styles";

const INCLUDES = [
  "Why this pattern exists",
  "The gifts hidden inside it",
  "The challenges you're most likely to face",
  "What this relationship is teaching both of you",
  "Practical guidance for navigating the dynamic",
];

// Slide 18 — Buy now -> Stripe checkout.
export function BuySlide({ onBuy, checkingOut, onBack }) {
  return (
    <SlideShell onBack={onBack}>
      <MarketingSlide
        eyebrow="Your full insights"
        heading="You've uncovered one layer."
        paragraphs={["Now discover the whole story."]}
      >
        <ul className={SF.bullets} style={{ marginBottom: "2rem" }}>
          {INCLUDES.map((b) => (
            <li key={b} className={SF.bullet}>
              ✓ {b}
            </li>
          ))}
        </ul>
        <PrimaryButton onClick={onBuy} disabled={checkingOut} full>
          {checkingOut ? "Redirecting…" : "Buy now"}
        </PrimaryButton>
      </MarketingSlide>
    </SlideShell>
  );
}
