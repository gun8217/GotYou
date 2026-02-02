"use client";
import React from "react";
import styles from "./Input.module.scss";

type InputProps = {
  label?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "time"
    | "range"
    | "file"
    | "textarea";
  value?: string;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
};

export default function Input({
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  disabled = false,
  required = false,
  error,
  rows = 4,
  min,
  max,
  step,
}: InputProps) {
  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          required={required}
          rows={rows}
          className={`${styles.textarea} ${error ? styles.error : ""}`}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          required={required}
          min={min}
          max={max}
          step={step}
          className={`${styles.input} ${error ? styles.error : ""}`}
        />
      )}

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
