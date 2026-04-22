"use client";

import React from "react";
import "./dataConfirmation.css";

const displayValue = (value) => {
  if (value === undefined || value === null || value === "") {
    return "Not provided";
  }

  return value;
};

const DataRow = ({ label, value }) => (
  <div className="dc-row">
    <span className="dc-label">{label}</span>
    <span className="dc-value">{displayValue(value)}</span>
  </div>
);

const DataSection = ({ title, onEdit, children }) => (
  <section className="dc-section">
    <div className="dc-section-header">
      <h3 className="dc-section-title">{title}</h3>
      <button type="button" className="dc-edit-btn" onClick={onEdit}>
        Update
      </button>
    </div>
    <div className="dc-section-body">{children}</div>
  </section>
);

export function DataConfirmationStep({
  values,
  onContinue,
  onBack,
  onEditParent,
  onEditChild,
}) {
  return (
    <div className="dc-wrap">
      <div className="dc-card">
        <h2 className="dc-title">Before we continue, let’s double-check…</h2>
        <p className="dc-supporting">
          Small details help us create a more accurate reading. Take a moment to
          make sure everything looks right.
        </p>

        <div className="dc-grid">
          <DataSection title="Parent Information" onEdit={onEditParent}>
            <DataRow label="Name" value={values["parent-name"]} />
            <DataRow label="Date of Birth" value={values.parent_birth_date} />
            <DataRow label="Time of Birth" value={values.parent_birth_time} />
            <DataRow label="Place of Birth" value={values.parent} />
          </DataSection>

          <DataSection title="Child Information" onEdit={onEditChild}>
            <DataRow label="Name" value={values["child-name"]} />
            <DataRow label="Date of Birth" value={values.child_birth_date} />
            <DataRow label="Time of Birth" value={values.child_birth_time} />
            <DataRow label="Place of Birth" value={values.child} />
          </DataSection>
        </div>

        <div className="dc-nav">
          <div className="dc-back-nav-item" onClick={onBack}>
            <div className="dc-back-icon-circle">
              <img
                src="https://cdn.prod.website-files.com/692ea98b8849e347f04bc413/6968ac26a420d9f418e3cfa1_left_16025619.png"
                alt="Back"
                className="dc-back-icon-img"
              />
            </div>
            <span className="dc-back-nav-text">Back</span>
          </div>

          <button
            type="button"
            className="dc-continue-btn-new"
            onClick={onContinue}
          >
            Continue your journey
          </button>
        </div>
      </div>
    </div>
  );
}
