"use client";
import styles from "./Badge.module.scss";

type BadgeColor = "default" | "success" | "error";

type BadgeProps = {
  text: string;
  color?: BadgeColor;
} & React.ComponentPropsWithoutRef<"span">;

export default function Badge({
  text,
  color = "default",
  className,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={`${styles.badge} ${styles[color]} ${className ?? ""}`}
      {...rest}
    >
      {text}
    </span>
  );
}
