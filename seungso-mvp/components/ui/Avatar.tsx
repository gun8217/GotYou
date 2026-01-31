"use client";
import Image from "next/image";
import styles from "./Avatar.module.scss";

type AvatarProps = {
  src: string;
  alt?: string;
  size?: number;
};

export default function Avatar({
  src,
  alt = "avatar",
  size = 40,
}: AvatarProps) {
  return (
    <div className={styles.avatarWrapper} style={{ width: size, height: size }}>
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={styles.avatar}
      />
    </div>
  );
}
