"use client";
import React, { useState } from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/DashboardJourneys.module.css";
import ReactMarkdown from "react-markdown";
import "../app/modal.css";
import { request } from "./env";
import SoulReading from "../app/SoulReading";

export default function InsightModal({ onClose, insight }) {
  const isOpen = !!insight;
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <h2>Insight</h2>
          <button onClick={onClose} className="close-btn">
            ✕
          </button>
        </div>

        {/* Summary (non-scrollable) */}
        {/* <div className="summary">
          <ReactMarkdown>{insight?.summary_text}</ReactMarkdown>
          <SoulReading text={insight?.summary_text} />
        </div> */}

        {/* Divider */}
        <div className="divider" />

        {/* Deep Analysis (scrollable) */}
        <div className="deep">
          <SoulReading
            childName={insight?.child_name}
            summary={insight?.summary_text}
            deep={insight?.deep_text}
          />
          {/* <ReactMarkdown>{insight?.deep_text}</ReactMarkdown> */}
        </div>
      </div>
    </div>
  );
}

export function DashboardJourneys({
  as: _Component = _Builtin.Block,

  item = null,
  nOfChildren = 0,
  setLoading,

  link1 = {
    href: "#",
  },

  text1 = "BEGIN",
  text2 = "Your Parenting Dynamic",

  link2 = {
    href: "https://soul-sighted.com/your-emotions",
  },

  text3 = "EXPLORE",
  text4 = "Your Emotions",

  link3 = {
    href: "https://soul-sighted.com/your-core",
  },

  text5 = "EXPLORE",
  text6 = "Your Core",

  link4 = {
    href: "https://soul-sighted.com/ask-me-anything",
  },

  text7 = "EXPLORE",
  text8 = "Ask Me Anything!",
}) {
  if (!item) return null;
  const [insightModal, setInsightModal] = useState(null);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { url } = await request({
        method: "POST",
        endpoint: "create_checkout_session",
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: {
          client_reference_id: `${item.child?.id}`,
          success_url: `${window.location.origin}/onboardingMain?child_id=${item.child?.id}&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}?payment_failed`,
          line_items: [
            {
              // price: "price_1TJpsTBpexBWLlCZSca5AXtq",
              price: "price_1TJk4pBpexBWLlCZ4U9PiHMZ",
              quantity: 1,
            },
          ],
        },
      });
      window.location.href = url;
    } catch (e) {
      setLoading(false);
      swal({
        title: "Error",
        text: e?.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <>
      {insightModal && (
        <InsightModal
          insight={insightModal}
          onClose={() => setInsightModal(null)}
        />
      )}
      <_Component
        className={_utils.cx(
          _styles,
          "padding-global-4",
          "padding-section-medium"
        )}
        tag="div"
        id="journeys-cards-section"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "container-large-6")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "journeys_first")}
            tag="div"
          >
            <_Builtin.Grid
              className={_utils.cx(_styles, "journey_first-grid")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "journey_card",
                  "is-view",
                  "w-node-cecd6210-f0e5-2e8c-c5a8-69ddd7aa66ba-d7aa66b6"
                )}
                id={_utils.cx(_styles, "your-parenting-dynamics")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "journey_card-content")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "journey_card-img",
                      "is-parenting"
                    )}
                    tag="div"
                  >
                    <div
                      className={_utils.cx(_styles, "journey_btn", "is-begin")}
                      // button={false}
                      block="inline"
                      options={link1}
                      style={{
                        background:
                          item?.insights?.length || !item?.purchases?.length
                            ? "white"
                            : undefined,
                      }}
                      onClick={async () => {
                        console.log(item);
                        if (item?.insights?.length) {
                          if (item?.insights?.[0]?.status == "ready")
                            setInsightModal({
                              childName: console.log(item),
                              child_name: item.child?.name || "Your Child",
                              ...(item?.insights?.[0] ?? {}),
                            });
                        } else if (!item?.purchases?.length) {
                          await handleCheckout();
                        } else {
                          window.location.href = `/onboardingMain?child_id=${item.child?.id}`;
                        }
                      }}
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "journey_btn-text")}
                        tag="div"
                      >
                        {item?.insights?.length
                          ? item?.insights?.[0]?.status == "ready"
                            ? "VIEW"
                            : "..."
                          : item?.purchases?.length
                          ? "BEGIN"
                          : "PURCHASE"}
                      </_Builtin.Block>
                    </div>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "img_overlay")}
                      tag="div"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "journey_card-text")}
                    tag="div"
                  >
                    {text2}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "journey_card",
                  "is-view",
                  "w-node-cecd6210-f0e5-2e8c-c5a8-69ddd7aa66c3-d7aa66b6"
                )}
                id={_utils.cx(_styles, "your-emotional-flavor")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "journey_card-content")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "journey_card-img",
                      "is-emotional"
                    )}
                    tag="div"
                  >
                    <_Builtin.Link
                      className={_utils.cx(_styles, "link-block", "small")}
                      // button={false}
                      block="inline"
                      options={link2}
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "journey_bnt-text",
                          "small"
                        )}
                        tag="div"
                      >
                        {text3}
                      </_Builtin.Block>
                    </_Builtin.Link>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "img_overlay")}
                      tag="div"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "journey_card-text")}
                    tag="div"
                  >
                    {text4}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "journey_card",
                  "is-explore",
                  "w-node-cecd6210-f0e5-2e8c-c5a8-69ddd7aa66cc-d7aa66b6"
                )}
                id={_utils.cx(_styles, "your-core-ingredients")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "journey_card-content")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "journey_card-img",
                      "is-ingredients"
                    )}
                    tag="div"
                  >
                    <_Builtin.Link
                      className={_utils.cx(_styles, "link-block-2", "small")}
                      // button={false}
                      block="inline"
                      options={link3}
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "journey_bnt-text",
                          "small"
                        )}
                        tag="div"
                      >
                        {text5}
                      </_Builtin.Block>
                    </_Builtin.Link>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "img_overlay")}
                      tag="div"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "journey_card-text")}
                    tag="div"
                  >
                    {text6}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "journey_card",
                  "is-begin",
                  "w-node-cecd6210-f0e5-2e8c-c5a8-69ddd7aa66d5-d7aa66b6"
                )}
                id={_utils.cx(_styles, "ask-me-anything")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "journey_card-content")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "journey_card-img", "is-ask")}
                    tag="div"
                  >
                    <_Builtin.Link
                      className={_utils.cx(_styles, "link-block-2", "small")}
                      // button={false}
                      block="inline"
                      options={link4}
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "journey_bnt-text",
                          "small"
                        )}
                        tag="div"
                      >
                        {text7}
                      </_Builtin.Block>
                    </_Builtin.Link>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "img_overlay")}
                      tag="div"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "journey_card-text")}
                    tag="div"
                  >
                    {text8}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Grid>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Component>
    </>
  );
}
