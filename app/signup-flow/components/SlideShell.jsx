"use client";
import React from "react";
import { SF, cn } from "../sf-styles";
import { BACK_ICON } from "../lib";

// Back / Next navigation — replicates the OnboardingNames nav (circular back
// button + peach pill), styled entirely from signup-flow's own SF classes.
export function SlideNav({ onBack, onNext, nextLabel = "Next" }) {
  return (
    <div className={SF.nav}>
      {onBack && (
        <button
          type="button"
          className={SF.backBtn}
          onClick={onBack}
          aria-label="Back"
        >
          <img className={SF.backImg} src={BACK_ICON} alt="Back" />
        </button>
      )}
      {onNext && (
        <button type="button" className={cn(SF.btn, SF.btnNav)} onClick={onNext}>
          {nextLabel}
        </button>
      )}
    </div>
  );
}

// Primary action button (peach pill) for in-slide actions (email, buy, etc.).
export function PrimaryButton({ onClick, disabled, full, children }) {
  return (
    <button
      type="button"
      className={cn(SF.btn, full && SF.btnFull, disabled && SF.btnDisabled)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function SlideShell({ children, onBack, onNext, nextLabel }) {
  return (
    <>
      <div>{children}</div>
      <SlideNav onBack={onBack} onNext={onNext} nextLabel={nextLabel} />
    </>
  );
}
