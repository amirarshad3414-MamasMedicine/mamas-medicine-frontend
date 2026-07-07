"use client";
import React from "react";
import { SlideShell } from "../components/SlideShell";
import { SF } from "../sf-styles";

// Page 2 — "Every relationship tells a story" (left aligned).
export function Story2Slide({ onBack, onNext }) {
  return (
    <SlideShell onBack={onBack} onNext={onNext}>
      <div className={SF.section}>
        <div className={SF.container}>
          <div className={SF.proseWrap}>
            <h2 className={SF.headingLeft}>Every relationship tells a story.</h2>
            <p className={SF.bodyLeft}>
              Some stories are easy and beautiful. Some feel intense. Others
              quietly play out through the same arguments, misunderstandings or
              worries, that seem to repeat again and again.
            </p>
            <p className={SF.bodyLeftBold}>
              What if those moments weren't random?
            </p>
            <p className={SF.bodyLeft}>
              What if they were part of a deeper pattern? One that could help you
              understand each other with more compassion, less blame, and a
              little more peace?
            </p>
            <p className={SF.bodyLeft}>
              <strong>The Hidden Story Between You</strong> shows the emotional
              patterns shaping your relationship.
            </p>
            <p className={SF.bodyLeft}>
              It helps you see the growth opportunities that would strengthen your
              bond or sometimes… find purpose in the pain.
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
