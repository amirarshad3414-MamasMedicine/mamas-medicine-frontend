"use client";
import React from "react";
import { SF } from "../sf-styles";
import { PROGRESS_STEPS } from "../lib";

function ProgressList() {
  return (
    <ul className={SF.progressList}>
      {PROGRESS_STEPS.map((label) => (
        <li key={label} className={SF.progressItem}>
          <span className={SF.progressLabel}>✓ {label}</span>
          <span className={SF.progressTrack}>
            <span className={SF.progressFill} />
          </span>
        </li>
      ))}
    </ul>
  );
}

// Loading screen used by the progress slides and the in-flight submit state.
export function LoadingView({ heading, subtitle, spinner }) {
  return (
    <div className={SF.section}>
      <div className={SF.container}>
        <div className={SF.loading}>
          <div className={SF.headingWrap}>
            <h2 className={SF.heading}>{heading}</h2>
          </div>
          {subtitle && (
            <div className={SF.paragraphWrap}>
              <p className={SF.paragraph}>{subtitle}</p>
            </div>
          )}
          {spinner ? <div className={SF.spinner} /> : <ProgressList />}
        </div>
      </div>
    </div>
  );
}
