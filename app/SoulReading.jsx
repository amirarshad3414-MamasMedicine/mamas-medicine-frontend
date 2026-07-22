import React from "react";
import "./soulReading.css"
import Markdown from "react-markdown";
import DeepReading from "./components/DeepReading";

export default function SoulReading({ summary, deep, childName = "Child" }) {
  // --- Prepare summary items ---
  const summaryItems = summary
    ? summary
      .split("\n")
      .map((line) => line.replace(/^[-•]\s*/, "").trim())
      .filter(Boolean)
    : [];

  return (
    <div className="reading-page">
      {/* --- SUMMARY CARD --- */}
      {summaryItems.length > 0 && (
        <div className="reading-summary-card">
          <h2 className="reading-summary-title">
            🌟 Soul Snapshot — You + {childName}
          </h2>

          <ul className="summary-list">
            {summaryItems.map((item, i) => (
              <li key={i}>
                <span className="bullet-point">{[...item][0]}</span>
                <span className="bullet-value">
                  <Markdown>
                    {[...item].slice(1).join('')}
                  </Markdown>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* --- DEEP READING --- */}
      <div className="reading-card reading-deep">
        <DeepReading text={deep} />
      </div>
    </div>
  );
}