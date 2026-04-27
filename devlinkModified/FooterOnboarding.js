"use client";
import React from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/FooterOnboarding.module.css";

export function FooterOnboarding({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "onbording_footer")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "padding-global", "padding-section5")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "container-large-5")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "onbording_content-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "footer_content")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "onbording_footer-content")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "footer_text",
                    "text-color-secondary"
                  )}
                  tag="div"
                >
                  {"Account settings"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "onbording_footer-content")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "footer_text",
                    "text-color-secondary"
                  )}
                  tag="div"
                >
                  {"Log out"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "onbording_footer-content")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "footer_text",
                    "text-color-secondary"
                  )}
                  tag="div"
                >
                  {"Support / Contact"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "footer_img-2")}
              tag="div"
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "image-13")}
                width="auto"
                height="auto"
                loading="lazy"
                alt=""
                src="https://cdn.prod.website-files.com/692ea98b8849e347f04bc413/6968ac26a420d9f418e3cfac_Icon-removebg.png"
              />
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "img_text",
                  "text-color-secondary"
                )}
                tag="div"
              >
                {"Parenting Insights"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
