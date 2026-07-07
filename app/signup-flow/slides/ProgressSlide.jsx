"use client";
import React, { useEffect, useRef, useState } from "react";
import { SF } from "../sf-styles";
import {
  PROGRESS_STEPS,
  PROGRESS_STEP_DURATIONS,
  PROGRESS_FAST_FORWARD_MS,
  PROGRESS_TESTIMONIALS,
} from "../lib";

const TICK = 50; // ms between animation frames

// Animated build-up shown while submit_onboarding runs. Each step's bar fills
// 0 -> 100 in sequence and the next step only appears once the previous bar
// completes. The final bar fills to 80% then HOLDS until `ready` (the API
// response) is true, after which it completes to 100% and calls onComplete.
//
// Animation state lives in refs (not state) so the interval never restarts and
// reads the latest `ready`/`onComplete` without re-subscribing; a tick counter
// triggers re-render for paint.
export function ProgressSlide({ ready, onComplete }) {
  const [, forceRender] = useState(0);
  const fillsRef = useRef(PROGRESS_STEPS.map(() => 0));
  const activeRef = useRef(0);
  const readyRef = useRef(ready);
  const onCompleteRef = useRef(onComplete);
  const doneRef = useRef(false);

  useEffect(() => {
    readyRef.current = ready;
  }, [ready]);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const lastIndex = PROGRESS_STEPS.length - 1;
    const id = setInterval(() => {
      const active = activeRef.current;
      if (active > lastIndex) return;

      const isLast = active === lastIndex;
      // The last bar caps at 80% until the API response unlocks 100%.
      const cap = isLast ? (readyRef.current ? 100 : 80) : 100;
      // Once ready, fast-forward every remaining bar instead of waiting out the
      // slow durations.
      const duration = readyRef.current
        ? PROGRESS_FAST_FORWARD_MS
        : PROGRESS_STEP_DURATIONS[active] || 1500;
      const increment = (100 / duration) * TICK;

      fillsRef.current[active] = Math.min(cap, fillsRef.current[active] + increment);

      if (fillsRef.current[active] >= 100) {
        activeRef.current = active + 1;
        if (activeRef.current > lastIndex && !doneRef.current) {
          doneRef.current = true;
          clearInterval(id);
          onCompleteRef.current?.();
        }
      }
      forceRender((n) => n + 1);
    }, TICK);
    return () => clearInterval(id);
  }, []);

  const active = activeRef.current;
  const lastIndex = PROGRESS_STEPS.length - 1;
  // One testimonial per bar; hold the last one for the final bar.
  const testimonialIndex = Math.min(active, PROGRESS_TESTIMONIALS.length - 1);
  const testimonial = PROGRESS_TESTIMONIALS[testimonialIndex];

  return (
    <div className={SF.section}>
      <div className={SF.container}>
        <div className={SF.loading}>
          <div className={SF.headingWrap}>
            <h2 className={SF.heading}>Preparing your insight…</h2>
          </div>
          <div className={SF.paragraphWrap}>
            <p className={SF.paragraph}>
              You're moments away from discovering just how powerful parenting
              astrology can be.
            </p>
          </div>
          <ul className={SF.progressList}>
            {PROGRESS_STEPS.map((label, i) => {
              if (i > active) return null; // upcoming steps stay hidden
              const pct = Math.round(fillsRef.current[i] || 0);
              const done = pct >= 100;
              // Last bar, still waiting on the API -> shimmer so it keeps moving.
              const waiting = i === lastIndex && !ready;
              return (
                <li key={label} className={SF.progressItem}>
                  <span className={SF.progressLabel}>
                    {done ? "✓" : "…"} {label}
                  </span>
                  <span className={SF.progressTrack}>
                    <span
                      className={`${SF.progressFillAnimated}${
                        waiting ? " sf-progress-pulse" : ""
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                </li>
              );
            })}
          </ul>

          {testimonial && (
            <div className={SF.progressTestimonialWrap}>
              {/* key changes with the active bar -> re-triggers the fade/slide-in */}
              <blockquote
                key={testimonialIndex}
                className={`${SF.progressTestimonial} sf-testi-in`}
              >
                <div className={SF.progressTestimonialName}>{testimonial.name}</div>
                <div className={SF.progressTestimonialRole}>{testimonial.role}</div>
                <p className={SF.progressTestimonialQuote}>“{testimonial.quote}”</p>
              </blockquote>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
