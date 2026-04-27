"use client";
import React, { useEffect, useState } from "react";
import { NavbarOnboarding } from "../../devlinkModified/NavbarOnboarding";
import { SignupForm } from "../../devlinkModified/SignupForm";
import { DashboardFooter } from "../../devlinkModified/DashboardFooter";
import { trackPixelEvent } from "../../lib/metaPixel";
import "../swal.css";

const App = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    if(window.location.search.includes("?purchase_email=")) {
      const email = window.location.search.split("?purchase_email=")[1].split("&")[0]
      
      // Track Meta Pixel Purchase event
      trackPixelEvent('Purchase', {
        value: 21.00,
        currency: 'AUD',
      });

      // setEmail(emailParam);
      setTimeout(() => {
        console.log(email)
        document.querySelector('[type=email]').value = email
      }, 1000);
    }
  }, [])

  return <div style={{ background: '#eef1fa' }}>
    <div>
      <NavbarOnboarding/>
      <SignupForm email={email} />
      <DashboardFooter/>
    </div>
  </div>
};

export default App;