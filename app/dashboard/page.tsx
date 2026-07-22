"use client";
import React, { useState, useEffect } from "react";
import { NavbarOnboarding } from "../../devlinkModified/NavbarOnboarding";
import { DashboardWelcome } from "../../devlinkModified/DashboardWelcome";
import { DashboardChildListing } from "../../devlinkModified/DashboardChildListing";
import { DashboardJourneys } from "../../devlinkModified/DashboardJourneys";
import { DashboardDefaultJourneys } from "../../devlinkModified/DashboardDefaultJourneys";
import { DashboardChildJourney } from "../../devlinkModified/DashboardChildJourney";
import { DashboardYourFamily } from "../../devlinkModified/DashboardYourFamily";
import { DashboardFooter } from "../../devlinkModified/DashboardFooter";
import { request } from "../../devlinkModified/env";

import "../swal.css";
import "../loader.css";
import "./dashboard.css";

const App = () => {
  const [children, setChildren] = useState<Record<string, { child: any; insights: any[] }>>({});
  const [selectedChild, setSelectedChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const nOfChildren = Object.entries(children).filter(
    ([_, x]) => !x?.child?.default_child
  ).length;

  const selectedChildData = selectedChild ? children[selectedChild] : null;

  const readyInsightsCount = Object.values(children).reduce((count, entry) => {
    const readyForChild = (entry?.insights || []).filter(
      (insight) => insight?.status === "ready"
    ).length;
    return count + readyForChild;
  }, 0);

  const pendingInsightsCount = Object.values(children).reduce((count, entry) => {
    const pendingForChild = (entry?.insights || []).filter(
      (insight) => insight?.status && insight?.status !== "ready"
    ).length;
    return count + pendingForChild;
  }, 0);

  const summaryText =
    nOfChildren === 0
      ? ""
      : `${readyInsightsCount} insight${readyInsightsCount === 1 ? "" : "s"} ready, ${pendingInsightsCount} in progress across ${nOfChildren} child${nOfChildren === 1 ? "" : "ren"}.`;

  const refreshData = () => setRefresh(!refresh);

  useEffect(() => {
    let settled = false;
    // Safety net: if /get_children ever hangs (backend busy generating the
    // insight right after purchase, flaky network, etc.) never leave the user
    // stuck on the spinner — drop into the dashboard shell after 12s.
    const failSafe = setTimeout(() => {
      if (!settled) setLoading(false);
    }, 12000);

    const fetchChildren = async () => {
      try {
        const res: any = await request({
          method: "GET",
          endpoint: "/get_children",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        const {
          children = [],
          insights = [],
          purchases = [],
        } = res || {};

        const childrenObj: Record<
          string,
          { child: any; insights: any[]; purchases: any[] }
        > = {};

        for (const child of children) {
          childrenObj[child?.id] = { child, insights: [], purchases: [] };
        }

        for (const insight of insights) {
          childrenObj[insight?.child_id]?.insights?.push?.(insight);
        }

        for (const purchase of purchases) {
          childrenObj[purchase?.child_id]?.purchases?.push?.(purchase);
        }

        const selectedChildId = localStorage.getItem("selectedChild");
        const firstChild = selectedChildId
          ? childrenObj[selectedChildId] ||
          childrenObj[Object.keys(childrenObj)[0]]
          : childrenObj[Object.keys(childrenObj)[0]];

        if (firstChild && selectedChild === null) {
          setSelectedChild(firstChild?.child?.id);
        }

        setChildren(childrenObj);
      } catch (err: any) {
        if (
          err?.status === 401 ||
          err?.status === 403 ||
          err?.message?.toLowerCase().includes("token") ||
          err?.message?.toLowerCase().includes("expired") ||
          err?.message?.toLowerCase().includes("unauthorized")
        ) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          window.location.href = "/signin";
          return;
        }
        // Any other failure: surface it but still show the dashboard shell.
        console.error("Dashboard get_children failed:", err);
      } finally {
        settled = true;
        clearTimeout(failSafe);
        setLoading(false);
      }
    };

    fetchChildren();

    return () => clearTimeout(failSafe);
  }, [refresh]);

  // A checkout button sets loading=true then redirects to Stripe. If the user
  // presses Back, the browser can restore this page from its back/forward cache
  // with loading still true — a stuck spinner. Reload on bfcache restore so the
  // dashboard reflects the latest (post-checkout) state.
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) window.location.reload();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  if (loading) {
    return (
      <>
        <NavbarOnboarding />
        <div className="loader-container">
          <div className="loader" />
        </div>
        <DashboardFooter />
      </>
    );
  }

  return (
    <>
      <NavbarOnboarding />

      {/* ✅ FULL WIDTH WRAPPER FIX */}
      <div
        className="dashboard-shell"
        style={{
          width: "100%",
          maxWidth: "100%",
          margin: "0",
          padding: "0",
          boxSizing: "border-box",
        }}
      >
        <DashboardWelcome
          nOfChildren={nOfChildren}
          text2="I'm excited to share this work with you."
          text4="Here is a quick look at your family insights."
          summaryTitle="Quick Summary"
          summaryText={summaryText}
        />

        <div style={{ textAlign: "center", margin: "50px 0 40px" }}>
          <h2
            style={{
              display: "inline-block",
              padding: "18px 48px",
              fontSize: "2.8rem",
              fontWeight: "600",
              fontFamily: "'Pacifico', cursive",
              color: "#2d2d2d",
              background: "#e8a97c",
              borderRadius: "18px",
              border: "1.5px solid #2d2d2d",
              boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
              letterSpacing: "0.5px",
              lineHeight: "1.2",
            }}
          >
            Your Journeys:
          </h2>
        </div>

        {nOfChildren > 0 && (
          <>
            <DashboardYourFamily text="Your Family" />

            <DashboardChildListing
              family={children}
              setLoading={setLoading}
              refreshData={refreshData}
              selectedChild={selectedChild}
              setSelectedChild={setSelectedChild}
              text3="+ Add Another Child"
            />

            <DashboardChildJourney
              setLoading={setLoading}
              text="Journey for"
              child={selectedChildData?.child}
            />
          </>
        )}

        <DashboardJourneys
          setLoading={setLoading}
          item={selectedChildData}
          nOfChildren={nOfChildren}
          text3="BEGIN"
          text5="EXPLORE"
          text7="EXPLORE"
        />
      </div>

      <DashboardFooter />
    </>
  );
};

export default App;