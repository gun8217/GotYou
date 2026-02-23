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
  className?: string | keyof typeof styles;
  style?: CSSProperties;
};

export default function Flex({
  children,
  direction = "row",
  justify,
  align,
  gap = 0,
  wrap = "nowrap",
  className,
  style = {},
}: FlexProps) {
  const resolvedClass =
    className && className in styles
      ? styles[className as keyof typeof styles]
      : className;

  return (
    <div
      className={`${styles.flex} ${resolvedClass ?? ""}`}
      style={{
        display: "flex",
        flexDirection: direction,
        justifyContent: justify,
        ...(align ? { alignItems: align } : {}),
        gap: `${gap}px`,
        flexWrap: wrap,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
