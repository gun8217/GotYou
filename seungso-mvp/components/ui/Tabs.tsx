"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Tabs.module.scss";

type Tab = { label: string; content: React.ReactNode };

type TabsProps = {
  tabs: Tab[];
  initialIndex?: number;
  disableClick?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export default function Tabs({
  tabs,
  initialIndex = 0,
  disableClick = false,
  className = "",
  style,
}: TabsProps) {
  const [active, setActive] = useState(initialIndex);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    setActive(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const currentTab = tabRefs.current[active];
    if (currentTab) {
      setIndicatorStyle({
        left: currentTab.offsetLeft,
        width: currentTab.offsetWidth,
      });
    }
  }, [active]);

  const combinedClassName = `${styles.tabWrap} ${disableClick ? styles.isStepMode : ""} ${styles[className] || className}`;

  return (
    <div className={combinedClassName} style={style}>
      <div className={styles.tabList}>
        <div>
          {tabs.map((tab, i) => (
            <button
              key={i}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              className={`${styles.tab} ${active === i ? styles.active : ""}`}
              onClick={() => {
                if (!disableClick) setActive(i);
              }}
              tabIndex={disableClick ? -1 : 0}
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
