"use client";
import React, {useState, useEffect} from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/DashboardWelcome.module.css";

export function DashboardWelcome({
  as: _Component = _Builtin.Block,
  user: initialUser = { name: "" },
  nOfChildren = 0,
  text1 = "Hi",
  text2 = "Your dashboard is ready.",
  text3 = "Welcome back",
  text4 = "Here is your latest progress.",
  summaryTitle = "Quick Summary",
  summaryText = "",
}) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setUserName(userObj.name || "");
      } catch (e) {
        setUserName(storedUser);
      }
    }
  }, []);

  const greeting = nOfChildren > 0 ? text3 : text1;
  const message = nOfChildren > 0 ? text4 : text2;

  return (
    <_Component
      className={_utils.cx(
        _styles,
        "padding-global-4",
        "padding-section-small"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "container-large-6")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "welcome_container-returning")}
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
                "text-color-primary"
              )}
              id="welcome-parent-name"
            >
              {greeting}, {userName || initialUser.name}
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
                "small",
                "text-color-primary",
                "text-align-center",
                "welcome_subline"
              )}
            >
              {message}
            </_Builtin.Paragraph>
          </_Builtin.Block>

          {summaryText ? (
            <_Builtin.Block className={_utils.cx(_styles, "welcome_summary")} tag="div">
              <_Builtin.Block
                className={_utils.cx(_styles, "welcome_summary-title")}
                tag="div"
              >
                {summaryTitle}
              </_Builtin.Block>
              <_Builtin.Paragraph
                className={_utils.cx(
                  _styles,
                  "paragraph",
                  "small",
                  "text-color-primary",
                  "welcome_summary-text"
                )}
              >
                {summaryText}
              </_Builtin.Paragraph>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
