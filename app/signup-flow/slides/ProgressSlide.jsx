"use client";
import React from "react";
import { LoadingView } from "../components/LoadingView";

// Slides 14 & 15 — animated build-up screens (also reused for the in-flight
// submit spinner via the `spinner` prop).
export function ProgressSlide({ heading, subtitle, spinner }) {
  return <LoadingView heading={heading} subtitle={subtitle} spinner={spinner} />;
}
