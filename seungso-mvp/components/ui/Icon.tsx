"use client";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type IconProps = {
  icon: IconProp;
  size?: "xs" | "sm" | "lg" | "1x" | "2x" | "3x";
  color?: string;
};

export default function Icon({ icon, size = "1x", color }: IconProps) {
  return <FontAwesomeIcon icon={icon} size={size} color={color} />;
}
