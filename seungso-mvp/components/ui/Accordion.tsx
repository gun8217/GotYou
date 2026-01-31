"use client";
import React, { useState } from "react";
import styles from "./Accordion.module.scss";

type AccordionItem = { title: string; content: React.ReactNode };

type AccordionProps = { items: AccordionItem[] };

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className={styles.item}>
          <button onClick={() => setOpenIndex(openIndex === i ? null : i)}>
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
