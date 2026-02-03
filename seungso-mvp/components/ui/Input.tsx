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
  autoComplete?: string;
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
  autoComplete,
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
          autoComplete={autoComplete}
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
          autoComplete={autoComplete}
          className={`${styles.input} ${error ? styles.error : ""}`}
        />
      )}

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
