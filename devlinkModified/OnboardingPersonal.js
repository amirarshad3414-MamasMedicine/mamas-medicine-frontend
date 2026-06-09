"use client";
import React from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/OnboardingPersonal.module.css";

export function OnboardingPersonal({
  as: _Component = _Builtin.Block,
  title = "Let’s make this personal…",

  link1 = {
    href: "#",
  },

  image = "https://cdn.prod.website-files.com/692ea98b8849e347f04bc413/6968ac26a420d9f418e3cfa1_left_16025619.png",

  link2 = {
    href: "#",
  },
  isParent,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "container-large-5", "personal")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "margin-bottom",
          "margin-custom2",
          "personal"
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
        className={_utils.cx(_styles, "personal_content-wrapper")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "first_part")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "padding-global", "padding-custom1")}
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
                  "text-color-primary",
                  "personal"
                )}
              >
                {"This part is optional."}
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom", "margin-custom2")}
              tag="div"
            >
              <_Builtin.Paragraph
                className={_utils.cx(
                  _styles,
                  "paragraph",
                  "big",
                  "text-color-primary",
                  "personal",
                  "bold"
                )}
              >
                {
                  `Some ${isParent ? 'parents' : 'children'} like to share what’s alive right now – others prefer to skip it.`
                }
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom", "margin-custom2")}
              tag="div"
            >
              <_Builtin.Paragraph
                className={_utils.cx(
                  _styles,
                  "paragraph",
                  "big",
                  "text-color-primary",
                  "personal",
                  "bold"
                )}
              >
                {"Both are completely fine."}
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom", "margin-custom2")}
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
                  "If you do choose to share, it helps shape insights that are more practical, grounded, and deeply relevant to your real life."
                }
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom", "margin-custom1")}
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
                  "Just as if we were sitting together and talking things through, this space allows a little real-life context to come through."
                }
              </_Builtin.Paragraph>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {/* <_Builtin.Block className={_utils.cx(_styles, "second_part")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "padding-global", "padding-custom1")}
            tag="div"
            style={{ paddingLeft: 0 }}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom", "margin-custom2")}
              tag="div"
              style={{ paddingLeft: 0 }}
            >
              <_Builtin.Paragraph
                className={_utils.cx(
                  _styles,
                  "paragraph",
                  "big",
                  "text-color-primary",
                  "personal",
                  "bold"
                )}
              >
                {"You might like to share:"}
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "birth_item-wrapper", "personal")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "birth_item-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "birth_item-text", "personal")}
                tag="div"
              >
                {"what’s been feeling challenging (or easy)"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "birth_item-wrapper", "personal")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "birth_item-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "birth_item-text", "personal")}
                tag="div"
              >
                {"patterns or triggers you’ve noticed"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "birth_item-wrapper",
                "personal",
                "last"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "birth_item-dot")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "birth_item-text", "personal")}
                tag="div"
              >
                {"or what you’re hoping to understand more deeply"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block> */}
        <_Builtin.Block className={_utils.cx(_styles, "third_part")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "padding-global", "padding-custom1")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom", "margin-custom1")}
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
                {"There’s no need to filter or polish your words."}
                <br />
                {"The good, the hard, the messy – it’s all welcome here."}
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom", "margin-custom2")}
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
                  "This is a safe and private space. Nothing you share is stored or shared beyond your insight."
                }
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "margin-bottom",
                "margin-custom2",
                "last"
              )}
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
                {"There’s no right or wrong – only what’s true for you."}
              </_Builtin.Paragraph>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
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
                name="raw_parent_message"
                maxLength="1800"
                data-name="raw_parent_message"
                placeholder={`${isParent ? 'What it feels like to parent this child…' : 'What it feels like growing up with this parent…'}`}
                required={false}
                autoFocus={false}
                id="raw_parent_message"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "_500ch_max", "text-align-right")}
                tag="div"
              >
                {"300 words max."}
              </_Builtin.Block>
            </_Builtin.Block>
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
