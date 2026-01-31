"use client";
import { ReactNode } from "react";
import styles from "./Card.module.scss";

type CardProps = { children: ReactNode };

export default function Card({ children }: CardProps) {
  return <div className={styles.card}>{children}</div>;
}
