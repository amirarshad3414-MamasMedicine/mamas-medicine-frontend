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
  const [children, setChildren] = useState<
    Record<string, { child: any; insights: any[] }>
  >({});
  const nOfChildren = Object.entries(children).filter(
    ([_, x]) => !x?.child?.default_child
  ).length;

  const [selectedChild, setSelectedChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

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
      ? "No children added yet. Start your first journey below."
      : `${readyInsightsCount} insight${
          readyInsightsCount === 1 ? "" : "s"
        } ready, ${pendingInsightsCount} in progress across ${nOfChildren} child${
          nOfChildren === 1 ? "" : "ren"
        }.`;

  const refreshData = () => setRefresh(!refresh);

  useEffect(() => {
    // No auth token (e.g. it was cleared during the Stripe round-trip) — go
    // straight to sign in instead of spinning on the loader forever.
    if (typeof window !== "undefined" && !localStorage.getItem("authToken")) {
      window.location.href = "/signin";
      return;
    }

    let settled = false;
    // Safety net: if /get_children ever hangs (backend busy generating the
    // insight right after purchase, flaky network, etc.) never leave the user
    // stuck on the spinner — drop into the dashboard shell after 12s.
    const failSafe = setTimeout(() => {
      if (!settled) setLoading(false);
    }, 12000);

    const f = async () => {
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
        for (const child of children)
          childrenObj[child?.id] = { child, insights: [], purchases: [] };
        for (const insight of insights)
          childrenObj[insight?.child_id]?.insights?.push?.(insight);
        for (const purchase of purchases)
          childrenObj[purchase?.child_id]?.purchases?.push?.(purchase);

        const selectedChildId = localStorage.getItem("selectedChild");
        const firstChild = selectedChildId
          ? childrenObj[selectedChildId] ||
          childrenObj[Object.keys(childrenObj)[0]]
          : childrenObj[Object.keys(childrenObj)[0]];
        // @ts-ignore
        if (firstChild && selectedChild === null)
          setSelectedChild(firstChild?.child?.id);

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
    f();

    return () => clearTimeout(failSafe);
    // const i = setInterval(f, 5_000)
    // return () => clearInterval(i)
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

  if (loading)
    return (
      <>
        <NavbarOnboarding />
        <div className="loader-container">
          <div className="loader" />
        </div>
        <DashboardFooter />
      </>
    );

  return (
    <>
      <div>
        <NavbarOnboarding />
        <div className="dashboard-shell">
          <DashboardWelcome
            nOfChildren={nOfChildren}
            text2="Your dashboard is ready. Let us begin."
            text4="Here is a quick look at your family insights."
            summaryTitle="Quick Summary"
            summaryText={summaryText}
          />

          <section className="dashboard-main-action" aria-labelledby="main-action">
            <h2 id="main-action" className="dashboard-main-action-title">
              What to do first
            </h2>
            <p className="dashboard-main-action-text">
              {nOfChildren === 0
                ? "Start by opening Your Parenting Dynamic below."
                : readyInsightsCount > 0
                ? "Open your latest insight from Your Parenting Dynamic."
                : "Continue your next journey from the highlighted card below."}
            </p>
            <a className="dashboard-main-action-btn" href="#journeys-cards-section">
              Go to journeys
            </a>
          </section>

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

          {nOfChildren == 0 && <DashboardDefaultJourneys text="Your Journeys" />}
          <DashboardJourneys
            setLoading={setLoading}
            item={selectedChildData}
            nOfChildren={nOfChildren}
            text3="OPEN"
            text5="OPEN"
            text7="OPEN"
          />
        </div>
        <DashboardFooter />
      </div>
    </>
  );
};

export default App;
