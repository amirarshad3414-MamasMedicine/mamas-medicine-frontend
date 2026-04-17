import React from "react";
import "./soulReading.css"
import Markdown from "react-markdown";

export default function SoulReading({ summary, deep, childName = "Child" }) {
  // --- Preprocess text for deep reading ---
  function preprocess(text) {
    return text
      .replace(/^#{1,6}\s*/gm, "")
      .replace(/^\s*[-*]\s+/gm, "• ")
      .replace(/^\s*\d+\.\s+/gm, "• ")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/`+/g, "")
      .trim();
  }

  const cleanedDeep = preprocess(deep);

  const deepBlocks = cleanedDeep
    .split("\n\n")
    .map((b) => b.trim())
    .filter(Boolean);

  // --- Detect block types ---
  const isSectionHeader = (b) => /^[🌿🌞💫🌱]/.test(b);
  const isClusterHeader = (b) => /^[0-9️⃣]/.test(b);
  const isKeyTip = (b) => b.startsWith("💡 Key Tip");
  const isList = (b) => b.startsWith("•");

  // --- Renderers ---
  const renderList = (block, idx) => (
    <ul key={idx} className="reading-list">
      {block
        .split("\n")
        .map((line) => line.replace(/^•\s*/, "").trim())
        .filter(Boolean)
        .map((item, i) => (
          <li key={i}>{item}</li>
        ))}
    </ul>
  );

  const renderKeyTip = (block, idx) => {
    const content = block.replace("💡 Key Tip", "").trim();
    return (
      <div key={idx} className="key-tip-box">
        <span className="key-tip-label">💡 Key Tip</span>
        <p className="key-tip-text">{content}</p>
      </div>
    );
  };

  const renderBlock = (block, idx) => {
    if (isKeyTip(block)) return renderKeyTip(block, idx);

    if (isSectionHeader(block)) {
      const lines = block.split("\n");
      const headerLine = lines[0];
      const rest = lines.slice(1).filter(Boolean).join("\n");
      if (rest) {
        return (
          <React.Fragment key={idx}>
            <h2 className="reading-section-title">{headerLine}</h2>
            {isList(rest) ? renderList(rest, `${idx}_list`) : <p className="reading-p">{rest}</p>}
          </React.Fragment>
        );
      }
      return <h2 key={idx} className="reading-section-title">{headerLine}</h2>;
    }

    if (isClusterHeader(block)) {
      const lines = block.split("\n");
      const headerLine = lines[0];
      const rest = lines.slice(1).filter(Boolean).join("\n");
      if (rest) {
        return (
          <React.Fragment key={idx}>
            <h3 className="reading-cluster-title">{headerLine}</h3>
            {isList(rest) ? renderList(rest, `${idx}_list`) : <p className="reading-p">{rest}</p>}
          </React.Fragment>
        );
      }
      return <h3 key={idx} className="reading-cluster-title">{headerLine}</h3>;
    }

    if (isList(block)) return renderList(block, idx);
    return (
      <p key={idx} className="reading-p">
        {block}
      </p>
    );
  };
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
        {deepBlocks.map((block, idx) => renderBlock(block, idx))}
      </div>
    </div>
  );
}