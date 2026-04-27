"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Navbar.module.css";

export function Navbar({ as: _Component = _Builtin.NavbarWrapper }) {
  return (
    <_Component
      className={_utils.cx(_styles, "nav_onbording")}
      tag="div"
      data-nav="1"
      config={{
        animation: "default",
        collapse: "tiny",
        docHeight: false,
        duration: 400,
        easing: "ease",
        easing2: "ease",
        noScroll: false,
      }}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "padding-global")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "container-large")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "promo_bar-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "promo_bar")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "promo_bar-text")}
                tag="div"
              >
                {"LAUNCH WEEK ✨ Stop guessing. Start understanding."}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "nav_container")}
            tag="div"
          >
            <_Builtin.NavbarBrand
              className={_utils.cx(_styles, "brand")}
              aria-label="Mama’s Medicine — home page"
              options={{
                href: "/",
                preload: "none",
              }}
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "image")}
                loading="eager"
                width="auto"
                height="auto"
                alt="Mama’s Medicine logo"
                src="https://cdn.prod.website-files.com/692ea98b8849e347f04bc413/692eb28e31e344195bec3e58_Logo-compress.webp"
              />
            </_Builtin.NavbarBrand>
            <_Builtin.NavbarMenu
              className={_utils.cx(_styles, "nav-menu")}
              tag="nav"
              role="navigation"
            >
              <_Builtin.NavbarLink
                className={_utils.cx(_styles, "nav-link")}
                options={{
                  href: "/about",
                }}
              >
                {"About"}
              </_Builtin.NavbarLink>
              <_Builtin.DropdownWrapper
                className={_utils.cx(_styles, "soul_drop")}
                tag="div"
                delay={150}
                hover={true}
              >
                <_Builtin.DropdownToggle
                  className={_utils.cx(_styles, "dropdown-toggle")}
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
                      href: "/soul-sighted",
                    }}
                  >
                    {"What is Parenting Insights?"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "/parent-child-relationship",
                    }}
                  >
                    {"Your Parenting Dynamic"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "/your-emotions",
                    }}
                  >
                    {"Your Emotions"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "/your-core",
                    }}
                  >
                    {"Your Core"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "/ask-me-anything",
                    }}
                  >
                    {"Ask Me Anything!"}
                  </_Builtin.DropdownLink>
                </_Builtin.DropdownList>
              </_Builtin.DropdownWrapper>
              <_Builtin.NavbarLink
                className={_utils.cx(_styles, "nav-link-2")}
                options={{
                  href: "/faqs",
                }}
              >
                {"FAQ's"}
              </_Builtin.NavbarLink>
              <_Builtin.Link
                className={_utils.cx(
                  _styles,
                  "menu_bnt",
                  "background-color-secondary"
                )}
                button={true}
                block=""
                options={{
                  href: "/signin",
                }}
              >
                {"Log In"}
              </_Builtin.Link>
            </_Builtin.NavbarMenu>
            <_Builtin.NavbarButton
              className={_utils.cx(_styles, "nav_menu-bnt")}
              tag="div"
            >
              <_Builtin.Icon
                className={_utils.cx(_styles, "icon-2")}
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
