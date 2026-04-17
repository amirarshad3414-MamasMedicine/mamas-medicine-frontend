"use client";
import React, { useEffect, useMemo, useState } from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/SignupForm.module.css";
import "../app/styles.css";
import { request } from "./env";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: email || "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFeedback, setFormFeedback] = useState(null);
  const [serverFieldErrors, setServerFieldErrors] = useState({});

  useEffect(() => {
    if (!email) return;
    setFormValues((prev) => ({ ...prev, email }));
  }, [email]);

  const validateEmail = (value) => /^\S+@\S+\.\S+$/.test(value);
  const validateName = (value) => /^[A-Za-z\s'-]+$/.test(value);
  const validatePassword = (value) => /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value);

  const validateField = (field, values) => {
    const value = values[field] || "";

    if (field === "email") {
      if (!value.trim()) return "Email is required";
      if (!validateEmail(value.trim())) return "Enter a valid email address";
      return "";
    }

    if (field === "fullName") {
      if (!value.trim()) return "Name is required";
      if (value.trim().length < 2) return "Name must be at least 2 characters";
      if (!validateName(value.trim()))
        return "Name can contain letters, spaces, apostrophes, and hyphens only";
      return "";
    }

    if (field === "password") {
      if (!value) return "Password is required";
      if (!validatePassword(value))
        return "Use at least 8 characters with at least 1 letter and 1 number";
      return "";
    }

    if (field === "confirmPassword") {
      if (!value) return "Confirm password is required";
      if (value !== values.password) return "Passwords do not match";
      return "";
    }

    return "";
  };

  const allErrors = useMemo(() => {
    return {
      email: validateField("email", formValues),
      fullName: validateField("fullName", formValues),
      password: validateField("password", formValues),
      confirmPassword: validateField("confirmPassword", formValues),
    };
  }, [formValues]);

  const visibleErrors = {
    email:
      touched.email || submitAttempted
        ? serverFieldErrors.email || allErrors.email
        : "",
    fullName:
      touched.fullName || submitAttempted
        ? serverFieldErrors.fullName || allErrors.fullName
        : "",
    password:
      touched.password || submitAttempted
        ? serverFieldErrors.password || allErrors.password
        : "",
    confirmPassword:
      touched.confirmPassword || submitAttempted
        ? serverFieldErrors.confirmPassword || allErrors.confirmPassword
        : "",
  };

  const isFormValid = !allErrors.email && !allErrors.fullName && !allErrors.password && !allErrors.confirmPassword;

  const handleFieldInput = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    setServerFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setFormFeedback(null);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSubmitAttempted(true);
    setTouched({
      email: true,
      fullName: true,
      password: true,
      confirmPassword: true,
    });

    if (!isFormValid || isSubmitting) {
      if (allErrors.email) {
        document.querySelector('[data-ms-member="email"]')?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setServerFieldErrors({});
    setFormFeedback(null);

    try {
      const { authToken } = await request({
        method: "POST",
        endpoint: "auth/signup",
        body: {
          email: formValues.email.trim(),
          name: formValues.fullName.trim(),
          password: formValues.password,
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

      setFormFeedback({ type: "success", message: "Account created successfully. Redirecting..." });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 700);
    } catch (e) {
      const err = e;
      const message = err?.message || "Unable to sign up. Please try again.";

      if (message.toLowerCase().includes("email")) {
        setTouched((prev) => ({ ...prev, email: true }));
        setServerFieldErrors({ email: message });
        setFormFeedback({ type: "error", message });
        document.querySelector('[data-ms-member="email"]')?.focus();
      } else {
        setFormFeedback({ type: "error", message });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
                onSubmit={handleSubmit}
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
                    value={formValues.email}
                    style={visibleErrors.email ? { borderColor: "#dc2626" } : undefined}
                    onInput={(event) => handleFieldInput("email", event.target.value)}
                  />
                  {visibleErrors.email ? (
                    <_Builtin.Block className={_utils.cx(_styles, "field_error")} tag="div">
                      {visibleErrors.email}
                    </_Builtin.Block>
                  ) : null}
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
                    value={formValues.fullName}
                    style={visibleErrors.fullName ? { borderColor: "#dc2626" } : undefined}
                    onInput={(event) => handleFieldInput("fullName", event.target.value)}
                  />
                  {visibleErrors.fullName ? (
                    <_Builtin.Block className={_utils.cx(_styles, "field_error")} tag="div">
                      {visibleErrors.fullName}
                    </_Builtin.Block>
                  ) : null}
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
                      htmlFor="signup-password"
                    >
                      {"Password"}
                    </_Builtin.FormBlockLabel>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "password_input_wrap")}
                      tag="div"
                    >
                      <_Builtin.FormTextInput
                        className={_utils.cx(_styles, "signup_input")}
                        name="Password"
                        maxLength={256}
                        data-name="Password"
                        placeholder="Create a password"
                        disabled={false}
                        type={showPassword ? "text" : "password"}
                        required={true}
                        autoFocus={false}
                        data-ms-member="password"
                        data-show-1="true"
                      //   pattern="(?=.*[0-9](?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                        autoComplete="new-password"
                        id="signup-password"
                        value={formValues.password}
                        style={visibleErrors.password ? { borderColor: "#dc2626" } : undefined}
                        onInput={(event) => handleFieldInput("password", event.target.value)}
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
                    {visibleErrors.password ? (
                      <_Builtin.Block className={_utils.cx(_styles, "field_error")} tag="div">
                        {visibleErrors.password}
                      </_Builtin.Block>
                    ) : null}
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
                      htmlFor="signup-confirm-password"
                    >
                      {"Confirm password"}
                    </_Builtin.FormBlockLabel>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "password_input_wrap")}
                      tag="div"
                    >
                      <_Builtin.FormTextInput
                        className={_utils.cx(_styles, "signup_input")}
                        name="confirm-passowrd"
                        maxLength={256}
                        data-name="Confirm Passowrd"
                        placeholder="Confirm your password"
                        disabled={false}
                        type={showConfirmPassword ? "text" : "password"}
                        required={true}
                        autoFocus={false}
                        data-show-2="true"
                        data-ms-member="confirm-password"
                        ms-code-password="confirm"
                        id="signup-confirm-password"
                        value={formValues.confirmPassword}
                        style={visibleErrors.confirmPassword ? { borderColor: "#dc2626" } : undefined}
                        onInput={(event) => handleFieldInput("confirmPassword", event.target.value)}
                      />
                      <button
                        type="button"
                        className={_utils.cx(_styles, "password_toggle")}
                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? (
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
                    {visibleErrors.confirmPassword ? (
                      <_Builtin.Block className={_utils.cx(_styles, "field_error")} tag="div">
                        {visibleErrors.confirmPassword}
                      </_Builtin.Block>
                    ) : null}
                  </_Builtin.Block>
                </_Builtin.Block>
                <button
                  type="button"
                  className={`form-button ${(!isFormValid || isSubmitting) ? "is-disabled" : ""}`}
                  disabled={!isFormValid || isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <span className="form-button-content">
                      <span className="button-loader" aria-hidden="true" />
                      Creating account...
                    </span>
                  ) : (
                    <span className="form-button-content">Sign Up</span>
                  )}
                </button>
                {formFeedback ? (
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      formFeedback.type === "error" ? "field_error" : "field_success",
                      "form_error"
                    )}
                    tag="div"
                  >
                    {formFeedback.message}
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
