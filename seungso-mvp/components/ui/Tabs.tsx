"use client";
import React, { useState } from "react";
import styles from "./Tabs.module.scss";

type Tab = { label: string; content: React.ReactNode };

type TabsProps = { tabs: Tab[] };

export default function Tabs({ tabs }: TabsProps) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className={styles.tabList}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`${styles.tab} ${active === i ? styles.active : ""}`}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>{tabs[active].content}</div>
    </div>
  );
}
