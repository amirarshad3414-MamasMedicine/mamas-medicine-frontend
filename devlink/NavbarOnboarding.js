"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./NavbarOnboarding.module.css";

export function NavbarOnboarding({ as: _Component = _Builtin.NavbarWrapper }) {
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
        collapse: "tiny",
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
              aria-label="Mama’s Medicine — home page"
              options={{
                href: "/",
                preload: "none",
              }}
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "image-12")}
                width="auto"
                height="auto"
                loading="eager"
                alt="Mama’s Medicine logo"
                src="https://cdn.prod.website-files.com/695a4a423b1b9862c9aea287/695a4a423b1b9862c9aea28c_Logo-compress.webp"
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
                  href: "/about",
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
                    {"Your Vibes"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "#",
                    }}
                  >
                    {"Your Emotions"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "#",
                    }}
                  >
                    {"Your Core"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "#",
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
                      href: "#",
                    }}
                  >
                    {"What is Parenting Insights?"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "#",
                    }}
                  >
                    {"Your Vibes"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "#",
                    }}
                  >
                    {"Your Emotions"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "#",
                    }}
                  >
                    {"Your Core"}
                  </_Builtin.DropdownLink>
                  <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "soul_link")}
                    options={{
                      href: "#",
                    }}
                  >
                    {"Ask Me Anything!"}
                  </_Builtin.DropdownLink>
                </_Builtin.DropdownList>
              </_Builtin.DropdownWrapper>
              <_Builtin.NavbarLink
                className={_utils.cx(_styles, "nav-link-6")}
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
