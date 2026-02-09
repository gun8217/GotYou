"use client";

import React from "react";
import styles from "./Text.module.scss";

type BaseProps = {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  weight?: "normal" | "bold" | "light";
  color?: "default" | "primary" | "secondary" | "info" | "error";
  align?: "left" | "center" | "right";
  as?: "div" | "p" | "span" | "b" | "strong" | "button";
};

type TextProps = BaseProps &
  React.HTMLAttributes<HTMLElement> & {
    type?: "button" | "submit" | "reset";
  };

export default function Text({
  children,
  size = "md",
  weight = "normal",
  color = "default",
  align,
  as = "p",
  className = "",
  ...rest
}: TextProps) {
  const Tag = as as React.ElementType;

  const alignClass = align ? styles[align] : "";

  return (
    <Tag
      className={`${styles.text} ${styles[size]} ${styles[weight]} ${styles[color]} ${alignClass} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
