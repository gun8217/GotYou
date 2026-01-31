"use client";
import styles from "./Badge.module.scss";

type BadgeProps = {
  text: string;
  color?: "default" | "success" | "error";
};

export default function Badge({ text, color = "default" }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[color]}`}>{text}</span>;
}
