"use client";
import React from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/OnboardingPersonal.module.css";
import { useFormDataFill } from "./useFormDataFill";

export function OnboardingPersonal({
  as: _Component = _Builtin.Block,
  title = "Let’s make this personal…",

  link1 = {
    href: "#",
  },

  image = "/back-arrow.png",

  link2 = {
    href: "#",
  },
  isParent,
  formData = {},
}) {
  // Pre-fill the textarea from prior answers so the message persists across
  // back-navigation (matches the raw_user_message input name).
  useFormDataFill(formData);

  return (
    <_Component
      className={`${_utils.cx(_styles, "container-large-5", "personal")} sf-personal-page`}
      tag="div"
    >
      {/* Title block matching your mockup top layout */}
      <_Builtin.Block
        className={`${_utils.cx(
          _styles,
          "margin-bottom",
          "margin-custom2",
          "personal"
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

      {/* Replaced copy block with the exact contents of the mockup */}
      <_Builtin.Block
        className={_utils.cx(_styles, "personal_content-wrapper")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "first_part")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "padding-global", "padding-custom1")}
            tag="div"
          >
            {/* Paragraph 1 */}
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
                  "personal"
                )}
              >
                {"Your birth details draw the picture."}
              </_Builtin.Paragraph>
            </_Builtin.Block>

            {/* Paragraph 2 */}
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
                  "personal"
                )}
              >
                {"Your words add the colour."}
              </_Builtin.Paragraph>
            </_Builtin.Block>

            {/* Paragraph 3 */}
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom", "last")}
              tag="div"
            >
              <_Builtin.Paragraph
                className={_utils.cx(
                  _styles,
                  "paragraph",
                  "big",
                  "text-color-primary",
                  "personal"
                )}
              >
                {"Together, they create a far more meaningful insight."}
              </_Builtin.Paragraph>
            </_Builtin.Block>

            {/* Paragraph 4 — extra prompt sentence */}
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom", "last")}
              tag="div"
            >
              <_Builtin.Paragraph
                className={_utils.cx(
                  _styles,
                  "paragraph",
                  "big",
                  "text-color-primary",
                  "personal"
                )}
              >
                {
                  "What’s going on between you two lately? The good, the bad, the confusing… we’ll make sense of it together."
                }
              </_Builtin.Paragraph>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>

      {/* Form / Text Area input element */}
      <_Builtin.Block
        className={_utils.cx(_styles, "personal_form-wrapper")}
        tag="div"
      >
        <_Builtin.FormWrapper className={_utils.cx(_styles, "personal_form")}>
          <_Builtin.FormForm
            className={_utils.cx(_styles, "form-2")}
            name="email-form-2"
            data-name="Email Form 2"
            method="get"
            id="email-form-2"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text_area-wrapper")}
              tag="div"
            >
              <_Builtin.FormTextarea
                className={_utils.cx(_styles, "personal_text-area")}
                name="raw_user_message"
                maxLength="1800"
                data-name="raw_user_message"
                placeholder={`${isParent ? 'What it feels like to parent this child…' : 'What it felt like growing up with this parent…'}`}
                required={false}
                autoFocus={false}
                id="raw_user_message"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "_500ch_max", "text-align-right")}
                tag="div"
              >
                {"300 words max."}
              </_Builtin.Block>
            </_Builtin.Block>
            {/* Reminder sits OUTSIDE the fixed-height text-area wrapper so it
                flows normally below the box instead of overlapping the nav. */}
            <_Builtin.Paragraph
              className={`${_utils.cx(
                _styles,
                "paragraph",
                "text-color-primary"
              )} sf-personal-reminder`}
              style={{
                marginTop: "1rem",
                marginBottom: "0",
                textAlign: "left",
                color: "#333",
              }}
            >
              {"Reminder - this is a completely safe and private space."}
            </_Builtin.Paragraph>
            <_Builtin.FormButton
              className={_utils.cx(_styles, "submit-button-2")}
              type="submit"
              value="Submit"
              data-wait="Please wait..."
            />
          </_Builtin.FormForm>
          <_Builtin.FormSuccessMessage>
            <_Builtin.Block tag="div">
              {"Thank you! Your submission has been received!"}
            </_Builtin.Block>
          </_Builtin.FormSuccessMessage>
          <_Builtin.FormErrorMessage>
            <_Builtin.Block tag="div">
              {"Oops! Something went wrong while submitting the form."}
            </_Builtin.Block>
          </_Builtin.FormErrorMessage>
        </_Builtin.FormWrapper>
      </_Builtin.Block>

      {/* Bottom Navigation */}
      <_Builtin.Block
        className={_utils.cx(_styles, "onbording_names-navigation")}
        tag="div"
      >
        <_Builtin.Link
          className={_utils.cx(_styles, "back_bnt")}
          button={false}
          id="onboarding_personal_back_btn"
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
            id="onboarding_personal_back_btn"
          >
            {"Back"}
          </_Builtin.Block>
        </_Builtin.Link>
        <_Builtin.Link
          className={_utils.cx(_styles, "btn-onboarding", "onbord")}
          button={true}
          id="onboarding_personal_btn"
          block=""
          options={link2}
        >
          {"Next"}
        </_Builtin.Link>
      </_Builtin.Block>
    </_Component>
  );
}