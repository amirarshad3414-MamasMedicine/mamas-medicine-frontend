"use client";
import React from "react";
import { NavbarOnboarding } from "../../devlinkModified/NavbarOnboarding";
import { DashboardFooter } from "../../devlinkModified/DashboardFooter";
import "../footer-pages/footerPages.css";

export default function GetPersonalizedInsightsPage() {
  return (
    <div className="footer-page">
      <NavbarOnboarding />
      <main className="footer-page-shell">
        <section className="footer-section footer-hero" id="hero">
          <div>
            <span className="footer-eyebrow">Get Your Personalized Insights</span>
            <h1 className="footer-title">Understand your child in 10 minutes.</h1>
            <p className="footer-subtitle">
              A clear, practical relationship insight built around your real parenting dynamic.
            </p>
            <div className="footer-actions">
              <a className="footer-button-primary" href="/signup">Start your insight</a>
              <span className="footer-highlight">Quick and easy</span>
            </div>
          </div>
          <div className="footer-hero-card">
            <h3>Why parents choose this</h3>
            <p>Get emotional clarity, practical guidance, and language that actually helps in daily life.</p>
          </div>
        </section>

        <section className="footer-section" id="intro-cta">
          <span className="footer-eyebrow">Intro</span>
          <p>
            Share a few details about you and your child.<br />
            We turn it into a grounded insight you can use right away.
          </p>
          <div className="footer-actions">
            <a className="footer-button-primary" href="/signup">Get started now</a>
            <strong className="footer-highlight">Under 10 minutes</strong>
          </div>
          <p className="footer-small-urgency">Most parents finish faster than they expect.</p>
        </section>

        <section className="footer-section" id="why-it-matters">
          <span className="footer-eyebrow">Why It Matters</span>
          <div className="footer-grid-2">
            <div>
              <h2>Parenting feels easier when you see the pattern.</h2>
              <p>
                Instead of guessing, you get a focused view of what drives tension and what brings connection.
              </p>
              <div className="footer-actions">
                <a className="footer-button-secondary" href="/signup">See your pattern</a>
              </div>
            </div>
            <div className="footer-image-balance" aria-hidden="true" />
          </div>
        </section>

        <section className="footer-section" id="who-for-it">
          <span className="footer-eyebrow">Who It Is For</span>
          <div className="footer-grid-2">
            <div className="footer-card footer-card-muted">
              <p>Parents who want calmer mornings and easier conversations.</p>
              <p>Parents who feel stuck and want clear next steps.</p>
            </div>
            <div className="footer-image-balance" aria-hidden="true" />
          </div>
        </section>

        <section className="footer-section" id="how-it-works">
          <span className="footer-eyebrow">How It Works</span>
          <div className="footer-grid-3">
            <article className="footer-card footer-card-blue">
              <div className="footer-icon">1</div>
              <h3>Tell us a little</h3>
              <p>Answer a few short prompts about your child and your relationship.</p>
            </article>
            <article className="footer-card footer-card-muted">
              <div className="footer-icon">2</div>
              <h3>We build your insight</h3>
              <p>We map your responses into a practical and compassionate reading.</p>
            </article>
            <article className="footer-card">
              <div className="footer-icon">3</div>
              <h3>Apply it today</h3>
              <p>Use the guidance immediately in the moments that matter most.</p>
            </article>
          </div>
        </section>

        <section className="footer-section" id="final-cta">
          <span className="footer-eyebrow">Final Step</span>
          <div className="footer-grid-2">
            <div>
              <h2>Ready to start your child insight?</h2>
              <p>Begin now and get your personalized guidance in minutes.</p>
              <div className="footer-actions">
                <a className="footer-button-primary" href="/signup">Start now</a>
                <a className="footer-button-secondary" href="/contact-us">Ask a question</a>
              </div>
              <p className="footer-small-urgency">Start today and build momentum this week.</p>
            </div>
            <div className="footer-image-balance" aria-hidden="true" />
          </div>
        </section>
      </main>
      <DashboardFooter />
    </div>
  );
}
