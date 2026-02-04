import React from "react";
import styles from "./Text.module.scss";

type BaseProps = {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  weight?: "normal" | "bold" | "light";
  color?: "default" | "primary" | "secondary" | "info" | "error";
  as?: "p" | "span" | "div" | "button";
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
  as = "p",
  ...rest
}: TextProps) {
  const Tag = as as React.ElementType;

  return (
    <Tag
      className={`${styles.text} ${styles[size]} ${styles[weight]} ${styles[color]}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
