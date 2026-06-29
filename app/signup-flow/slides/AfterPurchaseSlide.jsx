"use client";
import React from "react";
import { PrimaryButton } from "../components/SlideShell";
import { MarketingSlide } from "../components/MarketingSlide";
import { SF } from "../sf-styles";

// Slide 19 — set a password, then continue to the dashboard where the full
// reading (deep + summary) opens automatically.
export function AfterPurchaseSlide({ password, setPassword, onSubmit, settingPassword }) {
  return (
    <MarketingSlide
      eyebrow="Almost there"
      heading="Create your password"
      paragraphs={[
        "Set a password so your deep insight and summary can be accessed anytime in your dashboard.",
      ]}
    >
      <div className={SF.fieldWrap}>
        <input
          type="password"
          className={SF.input}
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !settingPassword && onSubmit()}
          autoFocus
        />
        <PrimaryButton onClick={onSubmit} disabled={settingPassword} full>
          {settingPassword ? "Saving…" : "Save & view my reading"}
        </PrimaryButton>
      </div>
    </MarketingSlide>
  );
}
