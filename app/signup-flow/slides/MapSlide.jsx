"use client";
import React from "react";
import { SlideShell } from "../components/SlideShell";
import { SF } from "../sf-styles";

// Page 3 — "We'll map the energy of the relationship itself" with the
// you-your-child image.
export function MapSlide({ onBack, onNext }) {
  return (
    <SlideShell onBack={onBack} onNext={onNext}>
      <div className={SF.section}>
        <div className={SF.container}>
          <div className={SF.wrapper}>
            <div className={SF.headingWrap}>
              <h2 className={SF.heading}>
                Your relationship has energy
              </h2>
            </div>
            <img
              src="/you-your-child-image.png"
              alt="You plus your child equals your relationship"
              className={SF.mapImage}
            />
            <div className={SF.content}>
              <div className={SF.paragraphWrap}>
                <p className={SF.paragraph}>We'll create a relationship chart using both birth details.</p>
              </div>
              <div className={SF.paragraphWrap}>
                <p className={SF.paragraph}>
                  We're not analysing either of you individually.
                </p>
              </div>
              <div className={SF.paragraphWrap}>
                <p className={SF.paragraph}>
                  We're mapping the energy that exists between you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
