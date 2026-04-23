"use client";
import React from "react";
import { NavbarOnboarding } from "../../devlinkModified/NavbarOnboarding";
import { DashboardFooter } from "../../devlinkModified/DashboardFooter";
import "../footer-pages/footerPages.css";

export default function ContactUsPage() {
  return (
    <div className="footer-page">
      <NavbarOnboarding />
      <main className="footer-page-shell">
        <section className="footer-section footer-grid-2">
          <div>
            <h3 className="footer-title">Need support? We are here.</h3>
            <p className="footer-subtitle">
              Reach out anytime support is just a message away.
            </p>
            <div className="footer-actions">
              <a className="footer-button-primary" href="mailto:hello@soul-sighted.com">Contact us</a>
            </div>
            <p className="footer-subtitle">
              Email: <a className="footer-link-email" href="mailto:hello@soul-sighted.com">hello@soul-sighted.com</a>
            </p>
          </div>
          <div className="footer-image-balance" aria-hidden="true" />
        </section>
      </main>
      <DashboardFooter />
    </div>
  );
}
