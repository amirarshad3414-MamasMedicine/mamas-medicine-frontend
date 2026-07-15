"use client";
import React from "react";
import { NavbarOnboarding } from "../../devlinkModified/NavbarOnboarding";
import { DashboardFooter } from "../../devlinkModified/DashboardFooter";
import "../footer-pages/footerPages.css";

export default function WallOfLovePage() {
  return (
    <div className="footer-page">
      <NavbarOnboarding />
      <main className="footer-page-shell">
        <section className="footer-section">
          <span className="footer-eyebrow">Wall of Love</span>
          <h1 className="footer-title">What parents are saying.</h1>
          <p className="footer-subtitle">Real feedback from families using Soul Sighted insights.</p>
          <div className="footer-actions">
            <a
              className="footer-button-primary"
              href="https://app.storyprompt.com/wall/editor/93Ze0sfEW4pTwjAAWmHR"
              target="_blank"
              rel="noreferrer"
            >
              Open full wall
            </a>
          </div>
        </section>

        <section className="footer-grid-3">
          <article className="footer-card">"It helped me understand my child in a calmer way."</article>
          <article className="footer-card footer-card-muted">"Clear, kind, and actually practical in daily moments."</article>
          <article className="footer-card footer-card-blue">"The insight gave me language I did not have before."</article>
        </section>
      </main>
      <DashboardFooter />
    </div>
  );
}
