"use client";
import { CSSProperties, ReactNode } from "react";

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
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  className?: string;
  style?: CSSProperties;
};

export default function Flex({
  children,
  direction = "row",
  justify,
  align,
  gap = 0,
  className = "",
  style = {},
}: FlexProps) {
  return (
    <div
      className={`${styles.flex} ${className}`}
      style={{
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        gap: `${gap}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
