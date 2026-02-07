"use client";

import { ReactNode } from "react";
import styles from "./Card.module.scss";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: ReactNode;
  children: ReactNode;
  onlyCon?: boolean;
};

export default function Card({
  title,
  children,
  className = "",
  onlyCon = false,
  ...props
}: CardProps) {
  return (
    <div
      className={`${styles.card} ${onlyCon ? styles.onlyCon : ""} ${className}`}
      {...props}
    >
      {title && <div className={styles.header}>{title}</div>}
      <div className={styles.body}>{children}</div>
    </div>
  );
}
