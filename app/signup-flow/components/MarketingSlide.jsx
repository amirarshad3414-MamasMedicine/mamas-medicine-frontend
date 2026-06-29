"use client";
import React from "react";
import { SF } from "../sf-styles";

// Themed marketing slide: eyebrow + heading + paragraphs + optional content.
// Replicates the OnboardingBegin layout/spacing using signup-flow's SF classes.
export function MarketingSlide({ eyebrow, heading, paragraphs = [], children }) {
  return (
    <div className={SF.section}>
      <div className={SF.container}>
        <div className={SF.wrapper}>
          <div className={SF.headingWrap}>
            {eyebrow && <div className={SF.eyebrow}>{eyebrow}</div>}
            <h2 className={SF.heading}>{heading}</h2>
          </div>
          <div className={SF.content}>
            {paragraphs.map((p, i) => (
              <div className={SF.paragraphWrap} key={i}>
                <p className={SF.paragraph}>{p}</p>
              </div>
            ))}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact themed heading placed above a reused devlink component (names slide).
export function SectionHeading({ eyebrow, heading }) {
  return (
    <div className={SF.sectionHeading}>
      <div className={SF.container}>
        <div className="text-center">
          {eyebrow && <div className={SF.eyebrow}>{eyebrow}</div>}
          <h2 className={SF.heading}>{heading}</h2>
        </div>
      </div>
    </div>
  );
}
