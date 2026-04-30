"use client";
import React from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/OnboardingBegin.module.css";

export function OnboardingBegin({
  as: _Component = _Builtin.Block,
  title = "I’m so excited to begin this with you.",
  text1 = "Let's start with a few details, so your insight can be prepared with care",
  text2 = "Take your time - I’m ready when you are.",
  text3 = "Let’s do it",

  link = {
    href: "#",
  },

  text5 = "Let's do it",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "padding-global", "padding-section-medium")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "container-large-5")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "onboarding_intro-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "margin-bottom",
              "margin-huge",
              "text-align-center"
            )}
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
            className={_utils.cx(_styles, "onbording_content")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom", "margin-custom3")}
              tag="div"
            >
              <_Builtin.Paragraph
                className={_utils.cx(
                  _styles,
                  "paragraph",
                  "big",
                  "text-color-primary",
                  "onbord"
                )}
              >
                {text1}
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom", "margin-custom3")}
              tag="div"
            >
              <_Builtin.Paragraph
                className={_utils.cx(
                  _styles,
                  "paragraph",
                  "big",
                  "text-color-primary",
                  "onbord"
                )}
              >
                {text2}
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom", "margin-xhuge")}
              tag="div"
            >
              <_Builtin.Paragraph
                className={_utils.cx(
                  _styles,
                  "paragraph",
                  "big",
                  "text-color-primary",
                  "onbord"
                )}
              ></_Builtin.Paragraph>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Link
            className={_utils.cx(_styles, "btn-onboarding")}
            button={true}
            id="onboarding_intro_btn"
            block=""
            options={link}
          >
            {text5}
          </_Builtin.Link>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
