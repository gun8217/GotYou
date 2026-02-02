"use client";
import React from "react";
import styles from "./Title.module.scss";

type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6;
type TitleType = "default" | "primary" | "secondary" | "highlight";

type TitleProps = {
  text?: string;
  level?: TitleLevel;
  type?: TitleType;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"h1">;

export default function Title({
  text,
  level = 1,
  type = "default",
  children,
  className,
  ...rest
}: TitleProps) {
  const Tag = `h${level}` as const;

  return (
    <Tag
      className={`${styles.title} ${styles[type]} ${className ?? ""}`}
      {...rest}
    >
      {children ?? text}
    </Tag>
  );
}
