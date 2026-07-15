"use client";
import React from "react";
import { SlideShell } from "../components/SlideShell";
import { SF } from "../sf-styles";

// Page 2 — "Every relationship tells a story" (left aligned).
export function Story2Slide({ onBack, onNext }) {
  return (
    <SlideShell onBack={onBack} onNext={onNext} nextLabel="Let's find yours…">
      <div className={SF.section}>
        <div className={SF.container}>
          <div className={SF.proseWrap}>
            <h2 className={SF.headingLeft}>Every relationship tells a story.</h2>
            <p className={SF.bodyLeft}>
              Some feel easy.<br/>
              Some leave us repeating the same
              arguments, worries or misunderstandings.
            </p>
            <p className={SF.bodyLeftBold}>
              What if those moments weren't random?
            </p>
            <p className={SF.bodyLeft}>
              Soul Sighted maps the hidden emotional
              patterns shaping your relationship.
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
