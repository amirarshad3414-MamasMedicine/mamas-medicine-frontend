"use client";
import React from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/DashboardFooter.module.css";

export function DashboardFooter({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "footer")} tag="footer">
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "padding-global",
          "padding-section-medium"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "container-large")}
          tag="div"
        >
          <_Builtin.Grid
            className={_utils.cx(
              _styles,
              "footer_grid",
              "margin-bottom",
              "margin-xxlarge"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "footer_grin-item")}
              id={_utils.cx(
                _styles,
                "w-node-f4381481-c2dc-cc56-026c-505ba65c258e-a65c258a"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "margin-bottom",
                  "margin-custom2"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "footer_text",
                    "text-color-secondary",
                    "max-width-footer"
                  )}
                  tag="div"
                >
                  {
                    "Parenting Insights helps parents understand their child’s inner world - so they can respond with more clarity, compassion, and trust."
                  }
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Link
                className={_utils.cx(_styles, "bnt", "footer")}
                button={false}
                block="inline"
                options={{
                  href: "https://storyprompt.com/reply/iRasvtZzSmWjOGBKEzUW",
                  target: "_blank",
                }}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "bnt_text")}
                  tag="div"
                >
                  {"Let us know your thoughts"}
                </_Builtin.Block>
              </_Builtin.Link>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "footer_grin-item", "link")}
              id={_utils.cx(
                _styles,
                "w-node-f4381481-c2dc-cc56-026c-505ba65c2597-a65c258a"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "footer_heading")}
                tag="div"
              >
                {"Quick Links"}
              </_Builtin.Block>
              <_Builtin.Link
                className={_utils.cx(_styles, "footer_link")}
                button={false}
                block=""
                options={{
                  href: "https://soul-sighted.com/contact",
                }}
              >
                {"Contact Us"}
              </_Builtin.Link>
              <_Builtin.Link
                className={_utils.cx(_styles, "footer_link")}
                button={false}
                block=""
                options={{
                  href: "/signin", // Keeps it a real link
                }}
                onClick={(e) => {
                  e.preventDefault(); // Stop the immediate redirect
                  localStorage.clear();
                  window.location.href = "/signin"; // Redirect manually
                }}
              >
                {"Log Out"}
              </_Builtin.Link>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "footer_grin-item", "link")}
              id={_utils.cx(
                _styles,
                "w-node-f4381481-c2dc-cc56-026c-505ba65c259e-a65c258a"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "footer_heading")}
                tag="div"
              >
                {"Site Information"}
              </_Builtin.Block>
              <_Builtin.Link
                className={_utils.cx(_styles, "footer_link")}
                button={false}
                block=""
                options={{
                  href: "https://soul-sighted.com/about",
                }}
              >
                {"About us"}
              </_Builtin.Link>
              <_Builtin.Link
                className={_utils.cx(_styles, "footer_link")}
                button={false}
                block=""
                options={{
                  href: "https://soul-sighted.com/wall-of-love",
                }}
              >
                {"Wall of Love"}
              </_Builtin.Link>
              <_Builtin.Link
                className={_utils.cx(_styles, "footer_link")}
                button={false}
                block=""
                options={{
                  href: "https://soul-sighted.com/faqs",
                }}
              >
                {"FAQ's"}
              </_Builtin.Link>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "footer_grin-item", "link")}
              id={_utils.cx(
                _styles,
                "w-node-f4381481-c2dc-cc56-026c-505ba65c25a7-a65c258a"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "footer_heading")}
                tag="div"
              >
                {"Follow"}
              </_Builtin.Block>
              <_Builtin.Link
                className={_utils.cx(_styles, "footer_link")}
                button={false}
                block=""
                options={{
                  href: "https://www.facebook.com/soulsighted.mama/",
                  target: "_blank",
                  preload: "none",
                }}
              >
                {"Facebook"}
              </_Builtin.Link>
              <_Builtin.Link
                className={_utils.cx(_styles, "footer_link")}
                button={false}
                block=""
                options={{
                  href: "https://www.youtube.com/@soulsighted",
                  target: "_blank",
                }}
              >
                {"YouTube"}
              </_Builtin.Link>
              <_Builtin.Link
                className={_utils.cx(_styles, "footer_link")}
                button={false}
                block=""
                options={{
                  href: "https://www.instagram.com/soulsighted.mama/",
                }}
              >
                {"Instagram"}
              </_Builtin.Link>
            </_Builtin.Block>
          </_Builtin.Grid>
          <_Builtin.Block className={_utils.cx(_styles, "div-block")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "footer_text", "bottom")}
              tag="div"
            >
              {"Powered by Webflow"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "footer_text", "bottom", "last")}
              tag="div"
            >
              {"Copyright Soul Sighted 2026"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
