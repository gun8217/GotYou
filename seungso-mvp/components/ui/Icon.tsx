"use client";
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./Icon.module.scss";

type IconProps = {
  icon: IconProp;
  size?: SizeProp;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export default function Icon({
  icon,
  size,
  color,
  className,
  style,
  onClick,
}: IconProps) {
  const customClass = className ? styles[className] || className : "";
  const combinedClass = [styles.iconBase, customClass]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={combinedClass}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color,
        ...style,
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} size={size} />
    </span>
  );
}
