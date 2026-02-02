"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Tabs.module.scss";

type Tab = { label: string; content: React.ReactNode };
type TabsProps = { tabs: Tab[] };

export default function Tabs({ tabs }: TabsProps) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const currentTab = tabRefs.current[active];
    if (currentTab) {
      setIndicatorStyle({
        left: currentTab.offsetLeft,
        width: currentTab.offsetWidth,
      });
    }
  }, [active]);

  return (
    <div className={styles.tabWrap}>
      <div className={styles.tabList}>
        <div>
          {tabs.map((tab, i) => (
            <button
              key={i}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              className={`${styles.tab} ${active === i ? styles.active : ""}`}
              onClick={() => setActive(i)}
            >
              {tab.label}
            </button>
          ))}
          <span
            className={styles.indicator}
            style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          />
        </div>
      </div>
      <div className={styles.tabContent}>{tabs[active].content}</div>
    </div>
  );
}
