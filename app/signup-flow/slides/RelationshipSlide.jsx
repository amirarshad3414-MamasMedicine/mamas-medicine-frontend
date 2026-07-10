"use client";
import React from "react";
import { SlideShell } from "../components/SlideShell";
import { MarketingSlide } from "../components/MarketingSlide";
import { SF, cn } from "../sf-styles";

const OPTIONS = [
  { value: "child", label: "My child" },
  { value: "parent", label: "My parent" },
];

// Slide 2 — captures relationship_focus ("child" | "parent").
export function RelationshipSlide({ results, setResults, slideRef, onBack, onNext }) {
  return (
    <SlideShell onBack={onBack} onNext={onNext}>
      <div ref={slideRef}>
        <MarketingSlide
          eyebrow={
            <>
              1 Minute
              <br />
              Free Personalised Insight
            </>
          }
          heading="Which relationship would you like to explore?"
          
        >
          <div className={SF.choiceGroup}>
            {OPTIONS.map((opt) => {
              const selected = results.relationship_focus === opt.value;
              return (
                <label
                  key={opt.value}
                  className={cn(SF.choice, selected && SF.choiceSelected)}
                >
                  <input
                    type="radio"
                    name="relationship_focus"
                    value={opt.value}
                    checked={selected}
                    onChange={() =>
                      setResults((r) => ({ ...r, relationship_focus: opt.value }))
                    }
                    className={SF.choiceRadio}
                  />
                  <span className={SF.choiceLabel}>{opt.label}</span>
                </label>
              );
            })}
          </div>
        </MarketingSlide>
      </div>
    </SlideShell>
  );
}
