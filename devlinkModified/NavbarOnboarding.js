"use client";
import React, { useEffect, useState } from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/NavbarOnboarding.module.css";

export function NavbarOnboarding({ as: _Component = _Builtin.NavbarWrapper }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setUser(JSON.parse(user));
  }, []);

  return (
    <_Component
      className={_utils.cx(_styles, "navbar")}
      tag="div"
      data-nav="1"
      config={{
        easing: "ease",
        easing2: "ease",
        duration: 400,
        docHeight: false,
        noScroll: false,
        animation: "default",
        collapse: "medium",
      }}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "padding-global")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "container-large-5")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "nav_container-2")}
            tag="div"
          >
            <_Builtin.NavbarBrand
              className={_utils.cx(_styles, "brand")}
              aria-label="Parenting Insights — home page"
              options={{
                href: "https://soul-sighted.com/",
                preload: "none",
              }}
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "image-12")}
                width="auto"
                height="auto"
                loading="eager"
                alt="Parenting Insights logo"
                src="https://cdn.prod.website-files.com/692ea98b8849e347f04bc413/69c3574a5d3c4ba5242f542b_Soul%20Sighted%20Web%20Logo%20(2).png"
              />
            </_Builtin.NavbarBrand>
            <_Builtin.NavbarMenu
              className={_utils.cx(_styles, "nav-menu-2")}
              tag="nav"
              role="navigation"
            >
              <_Builtin.NavbarLink
                className={_utils.cx(_styles, "nav-link-7")}
                options={{
                  href: "https://soul-sighted.com/about",
                }}
              >
                {"About"}
              </_Builtin.NavbarLink>
              <_Builtin.DropdownWrapper
                className={_utils.cx(_styles, "soul_drop")}
                tag="div"
                delay={0}
                hover={true}
              >
                <_Builtin.DropdownToggle
                  className={_utils.cx(_styles, "dropdown-toggle-2")}
                  tag="div"
                >
                  <_Builtin.Icon
                    className={_utils.cx(_styles, "icon")}
                    widget={{
                      type: "icon",
                      icon: "dropdown-toggle",
                    }}
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-block-2")}
                    tag="div"
                  >
                    {"Parenting Insights"}
                  </_Builtin.Block>
                </_Builtin.DropdownToggle>
                <_Builtin.DropdownList
                  className={_utils.cx(_styles, "soul_drop-list")}
                  tag="nav"
                >
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "https://soul-sighted.com/parent-child-dynamic",
                    }}
                  >
                    {"Your Parenting Dynamic"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "https://soul-sighted.com/your-emotions",
                    }}
                  >
                    {"Your Emotions"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "https://soul-sighted.com/your-core",
                    }}
                  >
                    {"Your Core"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "https://soul-sighted.com/ask-me-anything",
                    }}
                  >
                    {"Ask Me Anything!"}
                  </_Builtin.DropdownLink>
                </_Builtin.DropdownList>
              </_Builtin.DropdownWrapper>
              <_Builtin.DropdownWrapper
                className={_utils.cx(_styles, "soul_drop", "mob")}
                tag="div"
                delay={0}
                hover={false}
              >
                <_Builtin.DropdownToggle
                  className={_utils.cx(_styles, "dropdown-toggle-2")}
                  tag="div"
                >
                  <_Builtin.Icon
                    className={_utils.cx(_styles, "icon")}
                    widget={{
                      type: "icon",
                      icon: "dropdown-toggle",
                    }}
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-block-2")}
                    tag="div"
                  >
                    {"Parenting Insights"}
                  </_Builtin.Block>
                </_Builtin.DropdownToggle>
                <_Builtin.DropdownList
                  className={_utils.cx(_styles, "soul_drop-list")}
                  tag="nav"
                >
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "https://soul-sighted.com/parent-child-dynamic",
                    }}
                  >
                    {"Your Parenting Dynamic"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "https://soul-sighted.com/your-emotions",
                    }}
                  >
                    {"Your Emotions"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "https://soul-sighted.com/your-core",
                    }}
                  >
                    {"Your Core"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "https://soul-sighted.com/ask-me-anything",
                    }}
                  >
                    {"Ask Me Anything!"}
                  </_Builtin.DropdownLink>
                </_Builtin.DropdownList>
              </_Builtin.DropdownWrapper>
              <_Builtin.NavbarLink
                className={_utils.cx(_styles, "nav-link-6")}
                options={{
                  href: "https://soul-sighted.com/faqs",
                }}
              >
                {"FAQ's"}
              </_Builtin.NavbarLink>
              <_Builtin.Block
                className={_utils.cx(_styles, "nav-divider")}
                tag="div"
              />
              <_Builtin.Link
                className={_utils.cx(
                  _styles,
                  "menu_bnt",
                  "background-color-secondary"
                )}
                button={true}
                block=""
                options={{
                  href: user ? "/dashboard" : "/signin",
                }}
              >
                {user ? "Dashboard" : "Log In"}
              </_Builtin.Link>
              {user && (
                <button
                  type="button"
                  className={_utils.cx(_styles, "nav-link-6", "logout_button")}
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/signin";
                  }}
                >
                  {"Logout"}
                </button>
              )}
            </_Builtin.NavbarMenu>
            <_Builtin.NavbarButton
              className={_utils.cx(_styles, "nav_menu-bnt-2")}
              tag="div"
            >
              <_Builtin.Icon
                className={_utils.cx(_styles, "icon-5")}
                widget={{
                  type: "icon",
                  icon: "nav-menu",
                }}
              />
            </_Builtin.NavbarButton>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
