"use client";

import { useRef, useState } from "react";
import styles from "./UiSelect.module.scss";

type Option = { label: string; value: string };

type UiSelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export default function UiSelect({ options, value, onChange }: UiSelectProps) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selected = options.find((opt) => opt.value === value);

  const handleToggle = () => {
    if (!open) {
      // 열릴 때만 위치 계산
      requestAnimationFrame(() => {
        if (!wrapperRef.current) return;

        const rect = wrapperRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        setDropUp(spaceBelow < 150 && spaceAbove > spaceBelow);
      });
    }

    setOpen((prev) => !prev);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button type="button" className={styles.trigger} onClick={handleToggle}>
        {selected?.label ?? "선택하세요"}
      </button>

      {open && (
        <ul className={`${styles.dropdown} ${dropUp ? styles.dropUp : ""}`}>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={styles.option}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
