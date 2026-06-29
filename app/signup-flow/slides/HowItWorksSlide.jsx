"use client";
import React from "react";
import { SlideShell } from "../components/SlideShell";
import { MarketingSlide } from "../components/MarketingSlide";
import { SF } from "../sf-styles";

const BULLETS = [
  "🌍 We map your relationship",
  "🌱 We identify the strongest growth themes",
  "💡 We translate them into practical insight",
];

export function HowItWorksSlide({ onBack, onNext }) {
  return (
    <SlideShell onBack={onBack} onNext={onNext}>
      <MarketingSlide heading="How it works">
        <ul className={SF.bullets}>
          {BULLETS.map((b) => (
            <li key={b} className={SF.bullet}>
              {b}
            </li>
          ))}
        </ul>
      </MarketingSlide>
    </SlideShell>
  );
}
