"use client";
import React from "react";
import * as _Builtin from "../devlink/_Builtin";

import * as _utils from "../devlink/utils";
import _styles from "../devlink/OnboardingFinal.module.css";
import _styles_other from "../devlink/OnboardingBegin.module.css";

export function OnboardingFinal({
  as: _Component = _Builtin.Block,
  title = "You’re all set",
  text1 = "Thank you for sharing.",
  text2 = "Your insight will be prepared with care, using the details you’ve provided.",
  link2 = {
    href: "#",
  },
  image = "https://cdn.prod.website-files.com/692ea98b8849e347f04bc413/6968ac26a420d9f418e3cfa1_left_16025619.png",
  text3 = "Back",
  text4 = "Finish",
  hideBack = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "padding-global", "padding-section-large")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "container-large-5")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "onboarding_confirmation-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={`${_utils.cx(
              _styles,
              "margin-bottom",
              "margin-custom3"
            )} sf-title-margin`}
            tag="div"
          >
            <_Builtin.Heading
              className={_utils.cx(_styles, "onbording_heading")}
              tag="h2"
            >
              {title}
            </_Builtin.Heading>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "onbording_content", "confirm")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom", "margin-custom2")}
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
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Paragraph
              className={_utils.cx(
                _styles,
                "paragraph",
                "big",
                "text-color-primary",
                "text-align-center"
              )}
            >
              {text2}
            </_Builtin.Paragraph>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "onbording_navigation", "confirm")}
            tag="div"
          >
            {!hideBack ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "back_bnt")}
                tag="div"
                id="onboarding_confirmtion_back_btn"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "back_bnt-icon")}
                  tag="div"
                >
                  <_Builtin.Image
                    className={_utils.cx(_styles, "icon_img")}
                    width="auto"
                    height="auto"
                    loading="lazy"
                    alt=""
                    src={image}
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "back_text")}
                  tag="div"
                >
                  {text3}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
            <_Builtin.Link
              className={_utils.cx(_styles_other, "btn-onboarding", "onbord")}
              button={true}
              id="onboarding_final_btn"
              block=""
              options={link2}
            >
              {text4}
            </_Builtin.Link>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
