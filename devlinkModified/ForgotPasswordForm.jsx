"use client";
import React, { useState, useRef, useEffect } from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/ForgotPasswordForm.module.css";
import { sendOtp, verifyOtp } from "@/app/api/forgotPassword";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

export function ForgotPasswordForm({
  as: _Component = _Builtin.Block,
  text1 = "Forgot Password?",
  text2 = "Enter your email and we'll send you a code to reset your password.",
  link = {
    href: "/signin",
  },
  text3 = "Sign In",
  image = "https://cdn.prod.website-files.com/692ea98b8849e347f04bc413/69677bed6a46cda22d043cac_sign-img-removebg1.png",
  text4 = "Reset",
  text5 = "Your",
  text6 = (
    <>
      {"Password"}
      <br />
    </>
  ),
}) {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const router = useRouter();
  const otpRefs = useRef([]);

  useEffect(() => {
    // Prefill the email when we arrive from the sign-in "reset required" redirect
    // (?email=…), or from a stored value. The input is uncontrolled, so set its
    // DOM value directly in addition to state.
    const fromQuery = new URLSearchParams(window.location.search).get("email");
    const prefill = fromQuery || localStorage.getItem("resetEmail");
    if (prefill) {
      setEmail(prefill);
      const input = document.querySelector('[data-ms-member="reset-email"]');
      if (input) input.value = prefill;
    }
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleEmailSubmit = async () => {
    const emailValue = document.querySelector(
      '[data-ms-member="reset-email"]'
    )?.value;

    if (!emailValue) {
      return swal({
        title: "Error",
        text: "Email is required",
        icon: "error",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      return swal({
        title: "Error",
        text: "Please enter a valid email address",
        icon: "error",
      });
    }

    setIsLoading(true);

    try {
      await sendOtp(emailValue);
      setEmail(emailValue);
      localStorage.setItem("resetEmail", emailValue);
      setStep("otp");
      setResendCooldown(60);
    } catch (e) {
      swal({
        title: "Error",
        text: e?.message || "Failed to send OTP. Please try again.",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    if (pasted.length === 4) {
      const newOtp = pasted.split("");
      setOtp(newOtp);
      otpRefs.current[3]?.focus();
    }
  };

  const handleOtpSubmit = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 4) {
      return swal({
        title: "Error",
        text: "Please enter the complete 4-digit code",
        icon: "error",
      });
    }

    setIsLoading(true);

    try {
      const result = await verifyOtp(email, otpValue);
      
      // Store the session token returned by the server
      if (result && result.token) {
        localStorage.setItem("resetSessionToken", result.token);
      }

      setStep("success");
      setTimeout(() => {
        router.push("/reset-password");
      }, 2000);
    } catch (e) {
      swal({
        title: "Error",
        text: e?.message || "Invalid OTP. Please try again.",
        icon: "error",
      });
      setOtp(["", "", "", ""]);
      otpRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;

    setIsLoading(true);

    try {
      await sendOtp(email);
      setResendCooldown(60);
      setOtp(["", "", "", ""]);
      otpRefs.current[0]?.focus();
      swal({
        title: "Success",
        text: "A new OTP has been sent to your email.",
        icon: "success",
        buttons: false,
        timer: 2000,
      });
    } catch (e) {
      swal({
        title: "Error",
        text: e?.message || "Failed to resend OTP. Please try again.",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setOtp(["", "", "", ""]);
    setResendCooldown(0);
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
        <_Builtin.Block className={_utils.cx(_styles, "forgot_wrap")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "forgot_img-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "margin-bottom", "margin-huge")}
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
                {step === "email" && text2}
                {step === "otp" &&
                  `We've sent a 4-digit code to ${email}. Enter it below to verify your identity.`}
                {step === "success" &&
                  "Verification successful! Redirecting to reset your password..."}
              </_Builtin.Block>
            </_Builtin.Block>

          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "forgot_content")}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "sign_img", "login")}
              width="auto"
              height="auto"
              loading="lazy"
              alt=""
              src={image}
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "sign_heading-wrapper", "login")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "sign_heading")}
                tag="div"
              >
                {text4}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "toyour_text")}
                tag="div"
              >
                {text5}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "sign_name", "text-align-center")}
                tag="div"
              >
                {text6}
              </_Builtin.Block>
            </_Builtin.Block>
            {step === "email" && (
              <_Builtin.FormWrapper
                className={_utils.cx(_styles, "forgot_form-block")}
              >
                <_Builtin.FormForm
                  className={_utils.cx(_styles, "forgot_form")}
                  name="forgot-password-form"
                  data-name="Email Form"
                  method="get"
                  data-ms-form="forgot-password"
                  id="forgot-password-form"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "forgot_input-wrap", "email")}
                    tag="div"
                  >
                    <_Builtin.FormBlockLabel
                      className={_utils.cx(_styles, "forgot_field-label")}
                      htmlFor="Reset-Email"
                    >
                      {"Email"}
                    </_Builtin.FormBlockLabel>
                    <_Builtin.FormTextInput
                      className={_utils.cx(_styles, "forgot_input")}
                      name="Reset-Email"
                      maxLength={256}
                      data-name="Reset Email"
                      placeholder="Enter your email address"
                      disabled={isLoading}
                      type="email"
                      required={true}
                      autoFocus={false}
                      data-ms-member="reset-email"
                      id="Reset-Email"
                    />
                  </_Builtin.Block>
                  <button
                    id="forgot-submit-btn"
                    type="submit"
                    style={{ display: "none" }}
                    onClick={(ev) => {
                      ev.preventDefault();
                      handleEmailSubmit();
                    }}
                  ></button>
                  <div
                    className={_utils.cx(_styles, "forgot_button")}
                    style={{
                      opacity: isLoading ? 0.7 : 1,
                      cursor: isLoading ? "not-allowed" : "pointer",
                    }}
                    onClick={() => {
                      if (!isLoading) {
                        document.getElementById("forgot-submit-btn").click();
                      }
                    }}
                  >
                    <div>{isLoading ? "Sending..." : "Send Reset Code"}</div>
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
            )}
            {step === "otp" && (
              <_Builtin.FormWrapper
                className={_utils.cx(_styles, "forgot_form-block")}
              >
                <_Builtin.FormForm
                  className={_utils.cx(_styles, "forgot_form")}
                  name="otp-form"
                  data-name="OTP Form"
                  method="get"
                  id="otp-form"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "otp-input-container")}
                    tag="div"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                      margin: "20px 0",
                    }}
                  >
                    {otp.map((digit, index) => (
                      <_Builtin.FormTextInput
                        key={index}
                        className={_utils.cx(_styles, "otp-input")}
                        name={`otp-${index}`}
                        maxLength={1}
                        placeholder="-"
                        disabled={isLoading}
                        type="text"
                        inputMode="numeric"
                        autoFocus={index === 0}
                        ref={(el) => (otpRefs.current[index] = el)}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={index === 0 ? handleOtpPaste : undefined}
                        style={{
                          width: "50px",
                          height: "60px",
                          textAlign: "center",
                          fontSize: "24px",
                          fontWeight: "700",
                          borderRadius: "8px",
                          border: "2px solid #D8DFFF",
                        }}
                      />
                    ))}
                  </_Builtin.Block>
                  <_Builtin.Block
                    tag="div"
                    style={{ textAlign: "center", marginBottom: "20px" }}
                  >
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={resendCooldown > 0 || isLoading}
                      style={{
                        background: "none",
                        border: "none",
                        color: resendCooldown > 0 ? "#888" : "#FABD96",
                        cursor: resendCooldown > 0 ? "not-allowed" : "pointer",
                        fontSize: "14px",
                        textDecoration: "underline",
                      }}
                    >
                      {resendCooldown > 0
                        ? `Resend code in ${resendCooldown}s`
                        : "Resend code"}
                    </button>
                  </_Builtin.Block>
                  <button
                    id="otp-submit-btn"
                    type="submit"
                    style={{ display: "none" }}
                    onClick={(ev) => {
                      ev.preventDefault();
                      handleOtpSubmit();
                    }}
                  ></button>
                  <div
                    className={_utils.cx(_styles, "forgot_button")}
                    style={{
                      opacity: isLoading ? 0.7 : 1,
                      cursor: isLoading ? "not-allowed" : "pointer",
                    }}
                    onClick={() => {
                      if (!isLoading) {
                        document.getElementById("otp-submit-btn").click();
                      }
                    }}
                  >
                    <div>{isLoading ? "Verifying..." : "Verify Code"}</div>
                  </div>
                  <_Builtin.Block
                    tag="div"
                    style={{ textAlign: "center", marginTop: "12px" }}
                  >
                    <button
                      type="button"
                      onClick={handleBackToEmail}
                      disabled={isLoading}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#888",
                        cursor: isLoading ? "not-allowed" : "pointer",
                        fontSize: "14px",
                        textDecoration: "underline",
                      }}
                    >
                      Use a different email
                    </button>
                  </_Builtin.Block>
                </_Builtin.FormForm>
              </_Builtin.FormWrapper>
            )}
            {step === "success" && (
              <_Builtin.Block
                className={_utils.cx(_styles, "forgot_success-message")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "forgot_success-icon")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    content=""
                    value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22currentColor%22%3E%3Cpath%20d%3D%22M12%202C6.48%202%202%206.48%202%2012s4.48%2010%2010%2010%2010-4.48%2010-10S17.52%202%2012%202zm-2%2015l-5-5%201.41-1.41L10%2014.17l7.59-7.59L19%208l-9%209z%22%2F%3E%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "forgot_success-title")}
                  tag="div"
                >
                  {"Code Verified!"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "forgot_success-text")}
                  tag="div"
                >
                  {
                    "Your identity has been verified. Redirecting to set a new password..."
                  }
                </_Builtin.Block>
              </_Builtin.Block>
            )}

          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
