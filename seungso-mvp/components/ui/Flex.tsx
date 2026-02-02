"use client";
import { ReactNode } from "react";
import styles from "./Flex.module.scss";

type FlexProps = {
  children: ReactNode;
  direction?: "row" | "column";
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  gap?: number;
  className?: string;
};

export default function Flex({
  children,
  direction = "row",
  justify = "flex-start",
  align = "stretch",
  gap = 0,
  className = "",
}: FlexProps) {
  return (
    <div
      className={`${styles.flex} ${className}`}
      style={{
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        gap: `${gap}px`,
      }}
    >
      {children}
    </div>
  );
}
