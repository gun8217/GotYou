import React from "react";
import styles from "./Title.module.scss";

type TitleProps = {
  text: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  type?: "default" | "primary" | "secondary" | "highlight";
};

export default function Title({
  text,
  level = 1,
  type = "default",
}: TitleProps) {
  const Tag: React.ElementType = `h${level}`;

  return <Tag className={`${styles.title} ${styles[type]}`}>{text}</Tag>;
}
