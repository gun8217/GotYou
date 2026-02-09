"use client";

import { ReactNode } from "react";
import styles from "./Card.module.scss";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: ReactNode;
  children: ReactNode;
  variant?: "default" | "bodySm" | "noHeader";
};

export default function Card({
  title,
  children,
  className = "",
  variant = "default",
  ...props
}: CardProps) {
  return (
    <div
      className={`${styles.card} ${styles[variant]} ${className}`}
      {...props}
    >
      {variant !== "noHeader" && title && (
        <div className={styles.header}>{title}</div>
      )}
      <div className={styles.body}>{children}</div>
    </div>
  );
}
