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
          setLoading(false);
        }
      }
    };
    f();

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
        <DashboardWelcome nOfChildren={nOfChildren} />

        {nOfChildren > 0 && (
          <>
            <DashboardYourFamily />
            <DashboardChildListing
              family={children}
              setLoading={setLoading}
              refreshData={refreshData}
              selectedChild={selectedChild}
              setSelectedChild={setSelectedChild}
            />
            <DashboardChildJourney
              setLoading={setLoading}
              child={children[selectedChild]?.child}
            />
          </>
        )}

        {nOfChildren == 0 && <DashboardDefaultJourneys />}
        <DashboardJourneys
          setLoading={setLoading}
          item={children?.[selectedChild]}
          nOfChildren={nOfChildren}
        />
        <DashboardFooter />
      </div>
    </>
  );
};

export default App;
