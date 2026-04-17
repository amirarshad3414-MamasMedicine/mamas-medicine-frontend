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
    const f = async () => {
      try {
        const { children, insights, purchases } = await request({
          method: "GET",
          endpoint: "/get_children",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
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
        setLoading(false);
      } catch (err: any) {
        if (
          err?.status === 401 ||
          err?.message?.toLowerCase().includes("expired")
        ) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          window.location.href = "/signin";
        } else {
          console.error("Dashboard failed to load children:", err);
          setLoading(false);
        }
      }
    };
    f();

    // const i = setInterval(f, 5_000)
    // return () => clearInterval(i)
  }, [refresh]);

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
