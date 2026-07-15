"use client";
import React from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "./Footer.module.css";

export function Footer({ as: _Component = _Builtin.Block }) {
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
                "w-node-_30e6aa6d-d570-0b01-e0d3-9139d494dd64-d494dd60"
              )}
              tag="div"
            >
              <_Builtin.Link
                className={_utils.cx(_styles, "footer_logo-link")}
                button={false}
                aria-label="Mama’s Medicine Home"
                block="inline"
                options={{
                  href: "/",
                }}
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "footer_img")}
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt="Mama’s Medicine Home"
                  src="https://cdn.prod.website-files.com/692ea98b8849e347f04bc413/692eb28e31e344195bec3e58_Logo-compress.webp"
                />
              </_Builtin.Link>
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
                    "Mama’s Medicine helps mums reconnect with their own energy and respond with more calm, clarity, and trust."
                  }
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Link
                className={_utils.cx(_styles, "bnt", "footer")}
                button={false}
                block="inline"
                options={{
                  href: "/get-personalized-insights",
                }}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "bnt_text")}
                  tag="div"
                >
                  {"Get Your Personalised Insights"}
                </_Builtin.Block>
              </_Builtin.Link>
            </_Builtin.Block>
            <div></div>
            <_Builtin.Block
              className={_utils.cx(_styles, "footer_grin-item", "link")}
              id={_utils.cx(
                _styles,
                "w-node-_30e6aa6d-d570-0b01-e0d3-9139d494dd6c-d494dd60"
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
                  href: "/contact-us",
                }}
              >
                {"Contact Us"}
              </_Builtin.Link>
              <_Builtin.Link
                className={_utils.cx(_styles, "footer_link")}
                button={false}
                block=""
                options={{
                  href: "/signin",
                }}
              >
                {"Log In"}
              </_Builtin.Link>
            </_Builtin.Block>
            <div></div>
            <_Builtin.Block
              className={_utils.cx(_styles, "footer_grin-item", "link")}
              id={_utils.cx(
                _styles,
                "w-node-_30e6aa6d-d570-0b01-e0d3-9139d494dd73-d494dd60"
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
                  href: "/about-us",
                }}
              >
                {"About us"}
              </_Builtin.Link>
              <_Builtin.Link
                className={_utils.cx(_styles, "footer_link")}
                button={false}
                block=""
                options={{
                  href: "/wall-of-love",
                }}
              >
                {"Wall of Love"}
              </_Builtin.Link>
              <_Builtin.Link
                className={_utils.cx(_styles, "footer_link")}
                button={false}
                block=""
                options={{
                  href: "/faqs",
                }}
              >
                {"FAQ's"}
              </_Builtin.Link>
            </_Builtin.Block>
            <div></div>
            <_Builtin.Block
              className={_utils.cx(_styles, "footer_grin-item", "link")}
              id={_utils.cx(
                _styles,
                "w-node-_30e6aa6d-d570-0b01-e0d3-9139d494dd7c-d494dd60"
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
                  href: "https://www.facebook.com/MamasMedicine.co",
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
                  href: "https://www.instagram.com/mamasmedicine.co/",
                }}
              >
                {"Instagram"}
              </_Builtin.Link>
            </_Builtin.Block>
          </_Builtin.Grid>
          <_Builtin.Block className={_utils.cx(_styles, "div-block")} tag="div" style={{ marginLeft: '5rem' }}>
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
              {"Copyright Mamas Medicine 2026"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
