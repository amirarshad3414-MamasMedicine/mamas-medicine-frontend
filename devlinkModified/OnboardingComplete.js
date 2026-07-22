"use client";
import React from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/OnboardingComplete.module.css";

import "../app/styles.css";

export default function Section({ children }) {
  return (
    <div className="section" style={{ overflow: "hidden" }}>
      <div className="lottie-bg">
        {/* <Lottie animationData={animationData} loop autoplay /> */}
        <img src="/wave.gif" alt="Wave animation" className="bg-video-img" />
      </div>

      <div className="content" style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

export function OnboardingComplete({
  as: _Component = _Builtin.Block,
  title = "We’ll take it from here.",
  image1 = "https://cdn.prod.website-files.com/692ea98b8849e347f04bc413/6968ac26a420d9f418e3cfa6_Ball-best.png",
  text1 = (
    <>
      {" Go and grab yourself a cuppa."}
      <br />
    </>
  ),
  text2 = "Your insights will arrive in your inbox in less than 10 minutes.",
  text3 = "",
  ctaText = "Go to dashboard",
  ctaHref = "/dashboard",
  image2 =
  "https://cdn.prod.website-files.com/692ea98b8849e347f04bc413/6968ac26a420d9f418e3cfa9_Swatch-best.png",
}) {
  return (
    <_Component
      id="onboarding-complete-parent"
      className={_utils.cx(_styles, "padding-global", "padding-section-medium")}
      tag="div"
    >
      <Section>
        <_Builtin.Block
          className={_utils.cx(_styles, "container-large-5")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "onboarding_processing-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom", "margin-xhuge")}
              tag="div"
            >
              <_Builtin.Heading
                className={_utils.cx(_styles, "onbording_heading")}
                tag="h2"
              >
                {title}
              </_Builtin.Heading>
            </_Builtin.Block>
            <_Builtin.Image
              className={_utils.cx(_styles, "processing_img1")}
              width="auto"
              height="auto"
              loading="lazy"
              alt=""
              src={image1}
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "onbording_content", "processing")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "margin-bottom",
                  "margin-custom3"
                )}
                tag="div"
              >
                <_Builtin.Paragraph
                  className={_utils.cx(
                    _styles,
                    "paragraph",
                    "big",
                    "text-color-primary"
                  )}
                >
                  {text1}
                  {text2}
                </_Builtin.Paragraph>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "margin-bottom",
                  "margin-custom3"
                )}
                tag="div"
              >
                <_Builtin.Paragraph
                  className={_utils.cx(
                    _styles,
                    "paragraph",
                    "big",
                    "text-color-primary"
                  )}
                  style={{ fontWeight: "bold" }}
                >
                  {"Keep an eye on your email - that's where it begins."}
                </_Builtin.Paragraph>
              </_Builtin.Block>
              {text3 ? (
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "margin-bottom",
                    "margin-custom3"
                  )}
                  tag="div"
                >
                  <_Builtin.Paragraph
                    className={_utils.cx(
                      _styles,
                      "paragraph",
                      "big",
                      "text-color-primary"
                    )}
                  >
                    {text3}
                  </_Builtin.Paragraph>
                </_Builtin.Block>
              ) : null}
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "margin-bottom",
                  "margin-custom3"
                )}
                tag="div"
              >
                <_Builtin.Link
                  className="form-button"
                  button={true}
                  block=""
                  options={{ href: ctaHref }}
                >
                  {ctaText}
                </_Builtin.Link>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "margin-bottom")}
                tag="div"
              />
            </_Builtin.Block>
            <_Builtin.Image
              className={_utils.cx(_styles, "processing_img2")}
              width="auto"
              height="auto"
              loading="lazy"
              alt=""
              src={image2}
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </Section>
    </_Component>
  );
}
