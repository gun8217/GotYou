"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
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

  // ✅ indicator 위치 갱신 함수 (useCallback으로 고정)
  const updateIndicator = useCallback(() => {
    const currentTab = tabRefs.current[active];
    if (currentTab) {
      setIndicatorStyle({
        left: currentTab.offsetLeft,
        width: currentTab.offsetWidth,
      });
    }
  }, [active]);

  // initialIndex 바뀌면 active도 동기화
  useEffect(() => {
    setActive(initialIndex);
  }, [initialIndex]);

  // active 바뀌면 indicator 이동
  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  // resize 이벤트에도 반응
  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  const combinedClassName = `${styles.tabWrap} ${
    disableClick ? styles.isStepMode : ""
  } ${styles[className] || className}`;

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
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
          />
        </div>
      </div>
      <div className={styles.tabContent}>{tabs[active].content}</div>
    </div>
  );
}
