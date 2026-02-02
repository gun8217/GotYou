"use client";
import { useEffect, useState } from "react";
import styles from "./Toast.module.scss";

export type ToastItem = {
  id: number;
  message: string;
  type: "success" | "error" | "info";
};

type ToastProps = ToastItem & {
  duration?: number;
  onClose?: (id: number) => void;
};

export default function Toast({
  id,
  message,
  type = "info",
  duration = 3000,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onClose?.(id);
      }, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div
      className={`${styles.toast} ${styles[type]} ${
        visible ? styles.show : styles.hide
      }`}
    >
      {message}
    </div>
  );
}
