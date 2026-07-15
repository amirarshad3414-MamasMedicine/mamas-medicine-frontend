"use client";
import React from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/SignupForm.module.css";
import "../app/styles.css";
import { request } from "./env"
import { trackPixelEvent } from "../lib/metaPixel";

export function SignupForm({
  as: _Component = _Builtin.Block,
  email = "",
  text1 = "Welcome",
  text2 = "Here you'll find all your personalised parenting insights in one place.",

  link = {
    href: "/signin",
  },

  text3 = "Sign In",
  image = "https://cdn.prod.website-files.com/692ea98b8849e347f04bc413/69677bed6a46cda22d043cac_sign-img-removebg1.png",
  text4 = "Create Account",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "padding-global", "padding-section-medium")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "container-large")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "signup_wrap")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "signup_img-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "sign_heading-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "sign_heading")}
                tag="div"
              >
                {text1}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom", "margin-custom4")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "sign_subtitle",
                  "text-align-center"
                )}
                tag="div"
              >
                {text2}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Link
              className={_utils.cx(_styles, "signin_link")}
              button={false}
              block="inline"
              options={link}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "sign_bnt")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "sign_bnt-text")}
                  tag="div"
                >
                  {text3}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Link>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "signup_content")}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "sign_img")}
              width="auto"
              height="auto"
              loading="lazy"
              alt=""
              src={image}
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "sign_heading")}
              tag="div"
            >
              {text4}
            </_Builtin.Block>
            <_Builtin.FormWrapper
              className={_utils.cx(_styles, "signup_form-block")}
            >
              <_Builtin.FormForm
                className={_utils.cx(_styles, "signup_form")}
                name="email-form"
                data-name="Email Form"
                method="get"
                data-ms-form="signup"
                id="email-form"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "signup_input-wrap", "email")}
                  tag="div"
                >
                  <_Builtin.FormBlockLabel
                    className={_utils.cx(_styles, "signup_field-label")}
                    htmlFor="Email"
                  >
                    {"Email"}
                  </_Builtin.FormBlockLabel>
                  <_Builtin.FormTextInput
                    className={_utils.cx(_styles, "signup_input")}
                    name="Email"
                    maxLength={256}
                    data-name="Email"
                    placeholder="Enter your email"
                    disabled={false}
                    type="email"
                    required={true}
                    autoFocus={false}
                    data-ms-member="email"
                    id="Email"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "signup_input-wrap")}
                  tag="div"
                >
                  <_Builtin.FormBlockLabel
                    className={_utils.cx(_styles, "signup_field-label")}
                    htmlFor="full-name"
                  >
                    {"Your Name"}
                  </_Builtin.FormBlockLabel>
                  <_Builtin.FormTextInput
                    className={_utils.cx(_styles, "signup_input")}
                    name="name"
                    maxLength={256}
                    data-name="Name"
                    placeholder="Enter your name"
                    disabled={false}
                    type="text"
                    required={true}
                    autoFocus={false}
                    data-ms-member="full-name"
                    id="full-name"
                  />
                </_Builtin.Block>                

                <_Builtin.Block
                  className={_utils.cx(_styles, "login_passwords-wrap")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "signup_input-wrap", "pass")}
                    tag="div"
                  >
                    <_Builtin.FormBlockLabel
                      className={_utils.cx(_styles, "signup_field-label")}
                      htmlFor="psw"
                    >
                      {"Password"}
                    </_Builtin.FormBlockLabel>
                    <_Builtin.FormTextInput
                      className={_utils.cx(_styles, "signup_input")}
                      name="Password"
                      maxLength={256}
                      data-name="Password"
                      placeholder="Create a password"
                      disabled={false}
                      type="password"
                      required={true}
                      autoFocus={false}
                      data-ms-member="password"
                      data-show-1="true"
                    //   pattern="(?=.*[0-9](?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                      autoComplete="new-password"
                      id="psw"
                    />
                    <_Builtin.TabsWrapper
                      className={_utils.cx(_styles, "show-password-tabs")}
                      current="Tab 1"
                      easing="ease"
                      fadeIn={300}
                      fadeOut={100}
                    >
                      <_Builtin.TabsMenu
                        className={_utils.cx(_styles, "show-password-button")}
                        tag="div"
                        data-transform-1="true"
                      >
                        <_Builtin.TabsLink
                          className={_utils.cx(_styles, "tab-link-tab-1")}
                          data-w-tab="Tab 1"
                          block="inline"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "code-embed")}
                            content=""
                            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20enable-background%3D%22new%200%200%2024%2024%22%20height%3D%2220px%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2220px%22%20fill%3D%22currentColor%22%3E%0A%3Crect%20fill%3D%22none%22%20height%3D%2216%22%20width%3D%2216%22%2F%3E%0A%3Cpath%20d%3D%22M0%200h24v24H0V0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M12%204.5C7%204.5%202.73%207.61%201%2012c1.73%204.39%206%207.5%2011%207.5s9.27-3.11%2011-7.5c-1.73-4.39-6-7.5-11-7.5zM12%2017c-2.76%200-5-2.24-5-5s2.24-5%205-5%205%202.24%205%205-2.24%205-5%205zm0-8c-1.66%200-3%201.34-3%203s1.34%203%203%203%203-1.34%203-3-1.34-3-3-3z%22%2F%3E%3C%2Fsvg%3E"
                          />
                        </_Builtin.TabsLink>
                        <_Builtin.TabsLink
                          className={_utils.cx(_styles, "tab-link-tab-1")}
                          data-w-tab="Tab 2"
                          block="inline"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "code-embed")}
                            content=""
                            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20enable-background%3D%22new%200%200%2024%2024%22%20height%3D%2220px%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2220px%22%20fill%3D%22currentColor%22%3E%0A%3Crect%20fill%3D%22none%22%20height%3D%2224%22%20width%3D%2224%22%2F%3E%0A%0A%3Cpath%20d%3D%22M12%206.5c2.76%200%205%202.24%205%205%200%20.51-.1%201-.24%201.46l3.06%203.06c1.39-1.23%202.49-2.77%203.18-4.53C21.27%207.11%2017%204%2012%204c-1.27%200-2.49.2-3.64.57l2.17%202.17c.47-.14.96-.24%201.47-.24zM2.71%203.16c-.39.39-.39%201.02%200%201.41l1.97%201.97C3.06%207.83%201.77%209.53%201%2011.5%202.73%2015.89%207%2019%2012%2019c1.52%200%202.97-.3%204.31-.82l2.72%202.72c.39.39%201.02.39%201.41%200%20.39-.39.39-1.02%200-1.41L4.13%203.16c-.39-.39-1.03-.39-1.42%200zM12%2016.5c-2.76%200-5-2.24-5-5%200-.77.18-1.5.49-2.14l1.57%201.57c-.03.18-.06.37-.06.57%200%201.66%201.34%203%203%203%20.2%200%20.38-.03.57-.07L14.14%2016c-.65.32-1.37.5-2.14.5zm2.97-5.33c-.15-1.4-1.25-2.49-2.64-2.64l2.64%202.64z%22%2F%3E%3C%2Fsvg%3E"
                          />
                        </_Builtin.TabsLink>
                      </_Builtin.TabsMenu>
                      <_Builtin.TabsContent
                        className={_utils.cx(_styles, "hide")}
                        tag="div"
                      >
                        <_Builtin.TabsPane tag="div" data-w-tab="Tab 1" />
                        <_Builtin.TabsPane tag="div" data-w-tab="Tab 2" />
                      </_Builtin.TabsContent>
                    </_Builtin.TabsWrapper>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "signup_input-wrap",
                      "confirm"
                    )}
                    tag="div"
                  >
                    <_Builtin.FormBlockLabel
                      className={_utils.cx(_styles, "signup_field-label")}
                      htmlFor="confirm-passowrd"
                    >
                      {"Confirm password"}
                    </_Builtin.FormBlockLabel>
                    <_Builtin.FormTextInput
                      className={_utils.cx(_styles, "signup_input")}
                      name="confirm-passowrd"
                      maxLength={256}
                      data-name="Confirm Passowrd"
                      placeholder="Confirm your password"
                      disabled={false}
                      type="password"
                      required={true}
                      autoFocus={false}
                      data-show-2="true"
                      data-ms-member="password"
                      ms-code-password="confirm"
                      id="confirm-passowrd"
                    />
                    <_Builtin.TabsWrapper
                      className={_utils.cx(_styles, "show-password-tabs")}
                      current="Tab 1"
                      easing="ease"
                      fadeIn={300}
                      fadeOut={100}
                    >
                      <_Builtin.TabsMenu
                        className={_utils.cx(_styles, "show-password-button")}
                        tag="div"
                        data-transform-2="true"
                      >
                        <_Builtin.TabsLink
                          className={_utils.cx(_styles, "tab-link-tab-1")}
                          data-w-tab="Tab 1"
                          block="inline"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "code-embed")}
                            content=""
                            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20enable-background%3D%22new%200%200%2024%2024%22%20height%3D%2220px%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2220px%22%20fill%3D%22currentColor%22%3E%0A%3Crect%20fill%3D%22none%22%20height%3D%2216%22%20width%3D%2216%22%2F%3E%0A%3Cpath%20d%3D%22M0%200h24v24H0V0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M12%204.5C7%204.5%202.73%207.61%201%2012c1.73%204.39%206%207.5%2011%207.5s9.27-3.11%2011-7.5c-1.73-4.39-6-7.5-11-7.5zM12%2017c-2.76%200-5-2.24-5-5s2.24-5%205-5%205%202.24%205%205-2.24%205-5%205zm0-8c-1.66%200-3%201.34-3%203s1.34%203%203%203%203-1.34%203-3-1.34-3-3-3z%22%2F%3E%3C%2Fsvg%3E"
                          />
                        </_Builtin.TabsLink>
                        <_Builtin.TabsLink
                          className={_utils.cx(_styles, "tab-link-tab-1")}
                          data-w-tab="Tab 2"
                          block="inline"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "code-embed")}
                            content=""
                            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20enable-background%3D%22new%200%200%2024%2024%22%20height%3D%2220px%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2220px%22%20fill%3D%22currentColor%22%3E%0A%3Crect%20fill%3D%22none%22%20height%3D%2224%22%20width%3D%2224%22%2F%3E%0A%0A%3Cpath%20d%3D%22M12%206.5c2.76%200%205%202.24%205%205%200%20.51-.1%201-.24%201.46l3.06%203.06c1.39-1.23%202.49-2.77%203.18-4.53C21.27%207.11%2017%204%2012%204c-1.27%200-2.49.2-3.64.57l2.17%202.17c.47-.14.96-.24%201.47-.24zM2.71%203.16c-.39.39-.39%201.02%200%201.41l1.97%201.97C3.06%207.83%201.77%209.53%201%2011.5%202.73%2015.89%207%2019%2012%2019c1.52%200%202.97-.3%204.31-.82l2.72%202.72c.39.39%201.02.39%201.41%200%20.39-.39.39-1.02%200-1.41L4.13%203.16c-.39-.39-1.03-.39-1.42%200zM12%2016.5c-2.76%200-5-2.24-5-5%200-.77.18-1.5.49-2.14l1.57%201.57c-.03.18-.06.37-.06.57%200%201.66%201.34%203%203%203%20.2%200%20.38-.03.57-.07L14.14%2016c-.65.32-1.37.5-2.14.5zm2.97-5.33c-.15-1.4-1.25-2.49-2.64-2.64l2.64%202.64z%22%2F%3E%3C%2Fsvg%3E"
                          />
                        </_Builtin.TabsLink>
                      </_Builtin.TabsMenu>
                      <_Builtin.TabsContent
                        className={_utils.cx(_styles, "hide")}
                        tag="div"
                      >
                        <_Builtin.TabsPane tag="div" data-w-tab="Tab 1" />
                        <_Builtin.TabsPane tag="div" data-w-tab="Tab 2" />
                      </_Builtin.TabsContent>
                    </_Builtin.TabsWrapper>
                  </_Builtin.Block>
                </_Builtin.Block>
                <button id='submit-btn' type="submit" style={{ display: 'none' }} onClick={async ev => {
                    ev.preventDefault()
                    const email = document.querySelector('[data-ms-member=email]').value
                    const fullName = document.querySelector('[data-ms-member=full-name]').value
                    const password = document.querySelector('[data-ms-member=password]').value
                    const confirmPassword = document.querySelector('[data-name="Confirm Passowrd"]').value
                                     
                    if(!email) return swal({
                      title: "Error",
                      text: "Email is required",
                      icon: "error",
                    })
                    if(!fullName) return swal({
                      title: "Error",
                      text: "Full name is required",
                      icon: "error",
                    })
                    
                    if(!password) return swal({
                      title: "Error",
                      text: "Password is required",
                      icon: "error",
                    })
                    if(!confirmPassword) return swal({
                      title: "Error",
                      text: "Confirm password is required",
                      icon: "error",
                    })
                    if(password !== confirmPassword) return swal({
                      title: "Error",
                      text: "Passwords do not match",
                      icon: "error",
                    })

                    try {
                            const { authToken } = await request({
                                method: "POST",
                                endpoint: "auth/signup",
                                body: {
                                    email,
                                    name: fullName,
                                    password,                                    
                                }
                            })
                            const token = authToken
                            localStorage.setItem("authToken", authToken)
                            const data = await request({
                                method: "GET",
                                endpoint: "auth/me",
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                }
                            })
                            localStorage.setItem("user", JSON.stringify(data))

                            // Track Meta Pixel CompleteRegistration event
                            trackPixelEvent('CompleteRegistration');

                            window.location.href = "/dashboard"
                        } catch(e) {
                            const err = e
                            swal({
                                title: "Error",
                                text: err?.message,
                                icon: "error",
                            })
                        }
                }}></button>
                <div
                  className="form-button"
                  type="submit"
                  onClick={() => {
                    document.getElementById('submit-btn').click()
                  }}
                >
                    <div>Sign Up</div>
                </div>
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
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
