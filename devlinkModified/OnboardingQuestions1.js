"use client";
import React from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/OnboardingQuestions1.module.css";

export function OnboardingQuestions1({
  as: _Component = _Builtin.Block,
  title = "A few gentle questions to help me tune in...",
  text1 = (
    <>
      {"Astrology shows the themes and patterns of a relationship."}
      <br />
      <br />
      {"But every pattern can express in different ways."}
      <br />
      {" There’s a softer way it can show up, and a more challenging way."}
      <br />
      <br />
      {"Only you know how it actually feels day to day."}
    </>
  ),
  text2 = "These questions help me understand how this energy is being lived between you, right now. So what you receive feels grounded, relevant, and true to your real life.",
  text3 = "There are no right or wrong answers - relationships shift, especially as children grow.",

  link1 = {
    href: "#",
  },

  image = "/back-arrow.png",
  text4 = "Back",

  link2 = {
    href: "#",
  },

  text5 = "Next",
}) {
  return (
    <_Component
      className={`${_utils.cx(
        _styles,
        "padding-global",
        "padding-section7"
      )} sf-q1`}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "container-large-5")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "onboarding_reflection_1-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={`${_utils.cx(
              _styles,
              "margin-bottom",
              "margin-custom5"
            )} sf-title-margin`}
            tag="div"
          >
            <_Builtin.Heading
              className={_utils.cx(_styles, "onbording_heading", "italic")}
              tag="h2"
            >
              {title}
            </_Builtin.Heading>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "onbording_content", "reflection1")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom", )}
              tag="div"
            >
              <_Builtin.Paragraph
                className={_utils.cx(
                  _styles,
                  "paragraph",
                  "big",
                  "text-color-primary",
                  "bold",
                  "text-align-center"
                )}
                style={{ textAlign: "left" }} // Override to left-align the text from center
              >
                {text1}
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom")}
              tag="div"
            >
              <_Builtin.Paragraph
                className={_utils.cx(
                  _styles,
                  "paragraph",
                  "big",
                  "text-color-primary",
                  "text-align-center"
                )}
                style={{ textAlign: "left"}} // Override to left-align the text from center
              >
                {text2}
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Paragraph
              className={_utils.cx(
                _styles,
                "paragraph",
                "text-color-primary",
                "bold"
              )}
            >
              {text3}
            </_Builtin.Paragraph>
            <_Builtin.Block
              className={_utils.cx(_styles, "reflection1_gradient")}
              tag="div"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "onbording_names-navigation")}
            tag="div"
          >
            <_Builtin.Link
              className={_utils.cx(_styles, "back_bnt")}
              button={false}
              id="onboarding_reflection_1_back_btn"
              block="inline"
              options={link1}
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
                {text4}
              </_Builtin.Block>
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(_styles, "btn-onboarding", "onbord")}
              button={true}
              id="onboarding_reflection_1_btn"
              block=""
              options={link2}
            >
              {text5}
            </_Builtin.Link>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
