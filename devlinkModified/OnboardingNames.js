"use client";
import React from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/OnboardingNames.module.css";
import { useFormDataFill } from "./useFormDataFill";

export function OnboardingNames({
  as: _Component = _Builtin.Block,
  text1 = "We use names to personalise your insight - nothing more.",

  link1 = {
    href: "#",
  },

  image = "/back-arrow.png",
  text2 = "Back",

  link2 = {
    href: "#",
  },

  text3 = "Next",
  formData = {},
  isParent, // User Relationsship type to render appropriate pronouns/ labels options
}) {
  console.log(`isParent: ${isParent}`);
  useFormDataFill(formData);
  return (
    <_Component
      className={_utils.cx(_styles, "padding-global", "padding-section-small")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "container-large-5")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "onboarding_names-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "onbording_content", "names")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "names_form-wrapper")}
              tag="div"
            >
              <_Builtin.FormWrapper
                className={_utils.cx(_styles, "form-block")}
              >
                <_Builtin.FormForm
                  className={_utils.cx(_styles, "names_form")}
                  name="wf-form-parent-child-names"
                  data-name="parent child names"
                  redirect="/"
                  data-redirect="/"
                  method="get"
                  id="wf-form-parent-child-names"
                >
                  {/* <_Builtin.FormBlockLabel
                    className={_utils.cx(_styles, "names_child-heading")}
                    htmlFor="parent-name"
                  >                    
                    {"Your Name"}
                  </_Builtin.FormBlockLabel> */}
                  <_Builtin.Block
                    className={_utils.cx(_styles, "names_form-subtitle")}
                    tag="div"
                  >
                    {"Pre-filled if possible"}
                  </_Builtin.Block>
                  <_Builtin.FormTextInput
                    className={_utils.cx(_styles, "first_mame-fild")}
                    name="parent-name"
                    maxLength={256}
                    data-name="parent name"
                    placeholder={"Your name"}
                    disabled={false}
                    type="text"
                    required={true}
                    autoFocus={false}
                    id="parent_name"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "pronoun_group")}
                    tag="div"
                    role="radiogroup"
                    aria-label="Parent pronouns"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "pronoun_option")}
                      tag="div"
                    >
                      <input
                        className={_utils.cx(_styles, "pronoun_radio")}
                        type="radio"
                        name="Parent-s-Pronouns"
                        value="he/him"
                        id="parent_pronoun_he"
                      />
                      <label
                        className={_utils.cx(_styles, "pronoun_label")}
                        htmlFor="parent_pronoun_he"
                      >
                        {"he"}
                      </label>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "pronoun_option")}
                      tag="div"
                    >
                      <input
                        className={_utils.cx(_styles, "pronoun_radio")}
                        type="radio"
                        name="Parent-s-Pronouns"
                        value="she/her"
                        id="parent_pronoun_she"
                      />
                      <label
                        className={_utils.cx(_styles, "pronoun_label")}
                        htmlFor="parent_pronoun_she"
                      >
                        {"she"}
                      </label>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "pronoun_option")}
                      tag="div"
                    >
                      <input
                        className={_utils.cx(_styles, "pronoun_radio")}
                        type="radio"
                        name="Parent-s-Pronouns"
                        value="they/them"
                        id="parent_pronoun_they"
                      />
                      <label
                        className={_utils.cx(_styles, "pronoun_label")}
                        htmlFor="parent_pronoun_they"
                      >
                        {"they"}
                      </label>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  {/* <_Builtin.FormBlockLabel
                    className={_utils.cx(_styles, "names_child-heading")}
                    htmlFor="child-name"
                  >                    
                    {`2.Your ${isParent ? "child’s name" : "parent's name"}`}
                  </_Builtin.FormBlockLabel> */}
                  <_Builtin.FormTextInput
                    className={_utils.cx(_styles, "text-field-2")}
                    name="child-name"
                    maxLength={256}
                    data-name="child name"
                    placeholder={`Your ${isParent ? "child’s name" : "parent's name"}`}
                    disabled={false}
                    type="text"
                    required={true}
                    autoFocus={false}
                    id="child_name"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "pronoun_group")}
                    tag="div"
                    role="radiogroup"
                    aria-label="Child pronouns"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "pronoun_option")}
                      tag="div"
                    >
                      <input
                        className={_utils.cx(_styles, "pronoun_radio")}
                        type="radio"
                        name="Child-s-Pronoun"
                        value="he/him"
                        id="child_pronoun_he"
                      />
                      <label
                        className={_utils.cx(_styles, "pronoun_label")}
                        htmlFor="child_pronoun_he"
                      >
                        {"he"}
                      </label>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "pronoun_option")}
                      tag="div"
                    >
                      <input
                        className={_utils.cx(_styles, "pronoun_radio")}
                        type="radio"
                        name="Child-s-Pronoun"
                        value="she/her"
                        id="child_pronoun_she"
                      />
                      <label
                        className={_utils.cx(_styles, "pronoun_label")}
                        htmlFor="child_pronoun_she"
                      >
                        {"she"}
                      </label>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "pronoun_option")}
                      tag="div"
                    >
                      <input
                        className={_utils.cx(_styles, "pronoun_radio")}
                        type="radio"
                        name="Child-s-Pronoun"
                        value="they/them"
                        id="child_pronoun_they"
                      />
                      <label
                        className={_utils.cx(_styles, "pronoun_label")}
                        htmlFor="child_pronoun_they"
                      >
                        {"they"}
                      </label>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.FormButton
                    className={_utils.cx(_styles, "submit-button")}
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
              className={_utils.cx(_styles, "margin-bottom", "margin-custom1")}
              tag="div"
            >
              <_Builtin.Paragraph
                className={_utils.cx(
                  _styles,
                  "paragraph",
                  "text-color-primary",
                  "max-width-10"
                )}
              >
                {text1}
              </_Builtin.Paragraph>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "onbording_names-navigation")}
            tag="div"
          >
            <_Builtin.Link
              className={_utils.cx(_styles, "back_bnt")}
              button={false}
              id="onboarding_names_back_btn"
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
                {text2}
              </_Builtin.Block>
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(_styles, "btn-onboarding", "onbord")}
              button={true}
              id="onboarding_names_btn"
              block=""
              options={link2}
            >
              {text3}
            </_Builtin.Link>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
