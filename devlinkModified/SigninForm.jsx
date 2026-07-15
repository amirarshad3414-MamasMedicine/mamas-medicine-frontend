"use client";
import React, { useState } from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/LoginFormContent.module.css";
import { request } from "./env";
import swal from "sweetalert";

export function LoginFormContent({
  as: _Component = _Builtin.Block,
  text1 = "New Here?",
  text2 = "Join us for personalized parenting insights and guidance",
  link = {
    href: "/signup",
  },
  text3 = "Sign Up",
  image = "https://cdn.prod.website-files.com/692ea98b8849e347f04bc413/69677bed6a46cda22d043cac_sign-img-removebg1.png",
  text4 = "Welcome Back to Your Parenting Insights",
  text5 = "",
  text6 = "",
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const clearError = (field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);

  return (
    <_Component
      className={_utils.cx(_styles, "padding-global", "padding-section-medium")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "container-large")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "login_wrap")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "login_img-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom", "margin-huge")}
              style={{ margin: "0 0 1rem 0" }}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "sign_heading")}
                style={{ whiteSpace: "nowrap" }}
                tag="div"
              >
                {text1}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom", "margin-huge")}
              style={{ marginTop: 0, marginBottom: "2rem" }}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "sign_subtitle",
                  "text-align-center",
                  "max-width-medium"
                )}
                tag="div"
              >
                {text2}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Link
              className={_utils.cx(_styles, "signup_link")}
              button={false}
              block="inline"
              options={link}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "sign_bnt")}
                tag="div"
                style={{ borderRadius: "8px" }}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "sign_bnt-text")}
                  tag="div"
                >
                  {text3}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(_styles, "signup_link")}
              button={false}
              block="inline"
              style={{ marginTop: "1rem" }}
              options={{
                href: "/signup-flow",
              }}
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
            className={_utils.cx(_styles, "login_content")}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "sign_img", "login")}
              width="auto"
              height="auto"
              loading="lazy"
              alt="Soul Sighted Logo"
              src={image}
              style={{ margin: "0 auto" }}
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "sign_heading-wrapper", "login")}
              tag="div"
              style={{ gap: "0", marginBottom: "2rem" }}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "sign_heading")}
                tag="div"
                style={{ 
                  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                  fontWeight: "700",
                  lineHeight: "1.3",
                  textAlign: "center",
                  color: "#2c1810"
                }}
              >
                {text4}
              </_Builtin.Block>
              {text5 && (
                <_Builtin.Block
                  className={_utils.cx(_styles, "toyour_text")}
                  tag="div"
                  style={{ display: "none" }}
                >
                  {text5}
                </_Builtin.Block>
              )}
              {text6 && (
                <_Builtin.Block
                  className={_utils.cx(_styles, "sign_name", "text-align-center")}
                  tag="div"
                  style={{ display: "none" }}
                >
                  {text6}
                </_Builtin.Block>
              )}
            </_Builtin.Block>
            <_Builtin.FormWrapper
              className={_utils.cx(_styles, "login_form-block")}
            >
              <_Builtin.FormForm
                className={_utils.cx(_styles, "login_form")}
                name="email-form"
                data-name="Email Form"
                method="get"
                data-ms-form="login"
                id="email-form"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "login_input-wrap")}
                  tag="div"
                >
                  <_Builtin.FormBlockLabel
                    className={_utils.cx(_styles, "login_field-label")}
                    htmlFor="Email"
                  >
                    {"Email"}
                  </_Builtin.FormBlockLabel>
                  <_Builtin.FormTextInput
                    className={_utils.cx(_styles, "login_input")}
                    name="Email"
                    maxLength={256}
                    data-name="Email"
                    placeholder="Enter Your email"
                    disabled={false}
                    type="email"
                    required={true}
                    autoFocus={false}
                    data-ms-member="email"
                    id="Email"
                    style={errors.email ? { borderColor: "#dc2626" } : undefined}
                    onInput={() => clearError("email")}
                  />
                  {errors.email ? (
                    <_Builtin.Block className={_utils.cx(_styles, "field_error")} tag="div">
                      {errors.email}
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "login_input-wrap", "password")}
                  tag="div"
                >
                  <_Builtin.FormBlockLabel
                    className={_utils.cx(_styles, "login_field-label")}
                    htmlFor="Password"
                  >
                    {"Password"}
                  </_Builtin.FormBlockLabel>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "login_password-wrap")}
                    tag="div"
                  >
                    <_Builtin.FormTextInput
                      className={_utils.cx(_styles, "login_input", "password")}
                      name="Password"
                      maxLength={256}
                      data-name="Password"
                      placeholder="Enter your password "
                      disabled={false}
                      type={showPassword ? "text" : "password"}
                      required={true}
                      autoFocus={false}
                      data-ms-member="password"
                      autoComplete="current-password"
                      id="signin-password"
                      style={errors.password ? { borderColor: "#dc2626" } : undefined}
                      onInput={() => clearError("password")}
                    />
                    <button
                      type="button"
                      className={_utils.cx(_styles, "password_toggle")}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                          <path
                            fill="currentColor"
                            d="M12 6.5c2.76 0 5 2.24 5 5 0 .51-.1 1-.24 1.46l3.06 3.06c1.39-1.23 2.49-2.77 3.18-4.52C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l2.17 2.17c.47-.15.96-.24 1.47-.24zm-9.29-3.34a.996.996 0 0 0 0 1.41l1.97 1.97C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.97-.3 4.31-.82l2.72 2.72a.996.996 0 1 0 1.41-1.41L4.13 3.16a.996.996 0 0 0-1.42 0zM12 16.5c-2.76 0-5-2.24-5-5 0-.77.18-1.5.49-2.14l1.57 1.57a2.94 2.94 0 0 0-.06.57c0 1.66 1.34 3 3 3 .2 0 .38-.03.57-.07L14.14 16c-.65.32-1.37.5-2.14.5z"
                          />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                          <path
                            fill="currentColor"
                            d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
                          />
                        </svg>
                      )}
                    </button>
                  </_Builtin.Block>
                  {errors.password ? (
                    <_Builtin.Block className={_utils.cx(_styles, "field_error")} tag="div">
                      {errors.password}
                    </_Builtin.Block>
                  ) : null}
                  <_Builtin.Block
                    className={_utils.cx(_styles, "login_link-wrap")}
                    tag="div"
                  >
                    <_Builtin.Link
                      className={_utils.cx(_styles, "login_forgot-link")}
                      button={false}
                      block=""
                      options={{
                        href: "/forgot-password",
                      }}
                    >
                      {"Forgot Password?"}
                    </_Builtin.Link>
                  </_Builtin.Block>
                </_Builtin.Block>
                <button
                  id="submit-btn"
                  type="submit"
                  style={{ display: "none" }}
                  onClick={async (ev) => {
                    ev.preventDefault();
                    const emailInput = document.querySelector('[data-ms-member="email"]');
                    const passwordInput = document.querySelector('[data-ms-member="password"]');
                    const email = emailInput?.value?.trim() || "";
                    const password = passwordInput?.value || "";

                    const nextErrors = {};
                    if (!email) nextErrors.email = "Email is required";
                    else if (!validateEmail(email)) nextErrors.email = "Enter a valid email address";
                    if (!password) nextErrors.password = "Password is required";

                    if (Object.keys(nextErrors).length > 0) {
                      setErrors(nextErrors);
                      return;
                    }

                    setErrors({});

                    try {
                      const { authToken } = await request({
                        method: "POST",
                        endpoint: "auth/login",
                        body: {
                          email,
                          password,
                        },
                      });
                      const token = authToken;
                      localStorage.setItem("authToken", authToken);
                      const data = await request({
                        method: "GET",
                        endpoint: "auth/me",
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      });
                      localStorage.setItem("user", JSON.stringify(data));
                      window.dispatchEvent(new Event("auth:user-changed"));

                      window.location.href = "/dashboard";
                    } catch (e) {
                      const err = e;
                      const message = err?.message || "Unable to sign in. Please try again.";
                      if (message.toLowerCase().includes("email")) {
                        setErrors({ email: message });
                        emailInput?.focus();
                      } else {
                        setErrors({ form: message });
                      }
                      return swal({
                        title: "Error",
                        text: message,
                        icon: "error",
                      });
                    }
                  }}
                ></button>
                <div
                  className="form-button"
                  type="submit"
                  onClick={() => {
                    document.getElementById("submit-btn").click();
                  }}
                >
                  <div>Sign In</div>
                </div>
                {errors.form ? (
                  <_Builtin.Block className={_utils.cx(_styles, "field_error", "form_error")} tag="div">
                    {errors.form}
                  </_Builtin.Block>
                ) : null}
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