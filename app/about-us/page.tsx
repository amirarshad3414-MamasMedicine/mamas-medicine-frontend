"use client";
import React from "react";
import { NavbarOnboarding } from "../../devlinkModified/NavbarOnboarding";
import { DashboardFooter } from "../../devlinkModified/DashboardFooter";
import "../footer-pages/footerPages.css";

export default function AboutUsPage() {
  return (
    <div className="footer-page">
      <NavbarOnboarding />
      <main className="footer-page-shell">
        <section className="footer-section">
          <span className="footer-eyebrow">About Us</span>
          <h1 className="footer-title">We help parents respond with clarity and calm.</h1>
          <p className="footer-subtitle">
            Soul Sighted turns emotional overwhelm into practical guidance for everyday parenting moments.
          </p>
        </section>

        <section className="footer-section">
          <h2>What we focus on</h2>
          <ul className="footer-bullets">
            <li>Clear relationship insights you can apply immediately.</li>
            <li>Compassionate language that supports both parent and child.</li>
            <li>Simple steps that fit real life, not perfect life.</li>
          </ul>
        </section>

        <section className="footer-section footer-grid-2">
          <div>
            <h2>How we work</h2>
            <p>We blend reflective prompts with practical interpretation to give you focused, useful insight.</p>
            <div className="footer-actions">
              <a className="footer-button-primary" href="/get-personalized-insights">Start your journey</a>
            </div>
          </div>
          <div className="footer-image-balance" aria-hidden="true" />
        </section>
      </main>
      <DashboardFooter />
    </div>
  );
}
