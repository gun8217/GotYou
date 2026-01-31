import React from "react";
import styles from "./Text.module.scss";

type TextProps = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  weight?: "normal" | "bold" | "light";
  color?: "default" | "primary" | "secondary" | "danger";
  as?: "p" | "span" | "div";
};

export default function Text({
  children,
  size = "md",
  weight = "normal",
  color = "default",
  as = "p",
}: TextProps) {
  const Tag: React.ElementType = as; // React.ElementType로 선언

  return (
    <Tag
      className={`${styles.text} ${styles[size]} ${styles[weight]} ${styles[color]}`}
    >
      {children}
    </Tag>
  );
}
