"use client";
import styles from "./Toast.module.scss";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
};

export default function Toast({ message, type = "info" }: ToastProps) {
  return <div className={`${styles.toast} ${styles[type]}`}>{message}</div>;
}
