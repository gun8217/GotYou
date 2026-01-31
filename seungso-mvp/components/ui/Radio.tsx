import React from "react";
import styles from "./Radio.module.scss";

type RadioProps = {
  label: string;
  name: string; // 같은 그룹에 속하는 라디오 버튼은 동일한 name
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export default function Radio({
  label,
  name,
  value,
  checked,
  onChange,
  disabled = false,
}: RadioProps) {
  return (
    <label className={styles.wrapper}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={styles.radio}
      />
      <span className={styles.label}>{label}</span>
    </label>
  );
}
