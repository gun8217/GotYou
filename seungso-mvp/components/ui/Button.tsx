"use client";
import React, { CSSProperties } from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  styleType?:
    | "default"
    | "primary"
    | "secondary"
    | "animate"
    | "error"
    | "icon";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
};

export default function Button({
  children,
  onClick,
  styleType = "default",
  size = "md",
  type = "button",
  fullWidth = false,
  disabled = false,
  className = "",
  style = {},
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${styles.button} 
        ${styles[styleType]} 
        ${styles[size]} 
        ${fullWidth ? styles.fullWidth : ""} 
        ${className}
      `.trim()}
      style={style}
    >
      {children}
    </button>
  );
}
