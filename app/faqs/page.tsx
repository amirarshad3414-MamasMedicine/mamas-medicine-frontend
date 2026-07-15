"use client";
import React from "react";
import { NavbarOnboarding } from "../../devlinkModified/NavbarOnboarding";
import { DashboardFooter } from "../../devlinkModified/DashboardFooter";
import "../footer-pages/footerPages.css";

export default function FaqsPage() {
  return (
    <div className="footer-page">
      <NavbarOnboarding />
      <main className="footer-page-shell">
        <section className="footer-section">
          <span className="footer-eyebrow">FAQ's</span>
          <h1 className="footer-title">Quick answers to common questions.</h1>
        </section>

        <section className="footer-section">
          <h3>How long does it take?</h3>
          <ul className="footer-bullets">
            <li>Most parents complete setup in under 10 minutes.</li>
            <li>Your insight arrives shortly after submission.</li>
          </ul>
        </section>

        <section className="footer-section">
          <h3>Is this private?</h3>
          <ul className="footer-bullets">
            <li>Your responses are used only for your insight.</li>
            <li>We do not publish your personal details.</li>
          </ul>
        </section>

        <section className="footer-section">
          <h3>Can I add more than one child?</h3>
          <ul className="footer-bullets">
            <li>Yes, you can add multiple children from your dashboard.</li>
            <li>Each child can have their own journey.</li>
          </ul>
        </section>
      </main>
      <DashboardFooter />
    </div>
  );
}
