"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "./Accordion.module.scss";

type AccordionItem = { title: string; content: React.ReactNode };
type AccordionProps = { items: AccordionItem[] };

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.accordion}>
      {items.map((item, i) => (
        <div key={i} className={styles.item}>
          <button
            className={styles.button}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <FontAwesomeIcon
              icon="chevron-right"
              className={`${styles.arrow} ${openIndex === i ? styles.open : ""}`}
            />
            {item.title}
          </button>

          {openIndex === i && (
            <div className={styles.content}>{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}
