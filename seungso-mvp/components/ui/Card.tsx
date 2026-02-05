"use client";
import { ReactNode } from "react";
import styles from "./Card.module.scss";

type CardProps = {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function Card({
  title,
  children,
  className = "",
  style,
}: CardProps) {
  return (
    <div className={`${styles.card} ${className}`} style={style}>
      {title && <div className={styles.header}>{title}</div>}
      <div className={styles.body}>{children}</div>
    </div>
  );
}
