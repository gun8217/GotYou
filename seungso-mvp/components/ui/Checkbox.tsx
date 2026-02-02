import React from "react";
import styles from "./Checkbox.module.scss";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
};

export default function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
  readOnly = false,
}: CheckboxProps) {
  return (
    <label className={styles.wrapper}>
      <input
        type="checkbox"
        checked={checked}
        onChange={readOnly ? undefined : onChange}
        disabled={disabled}
        readOnly={readOnly}
        className={styles.checkbox}
      />
      <span className={styles.label}>{label}</span>
    </label>
  );
}
