"use client";
import { ReactNode } from "react";
import styles from "./Tooltip.module.scss";

type TooltipProps = {
  text: string;
  children: ReactNode;
};

export default function Tooltip({ text, children }: TooltipProps) {
  return (
    <div className={styles.tooltipWrap}>
      {children}
      <span className={styles.tooltip}>{text}</span>
    </div>
  );
}
