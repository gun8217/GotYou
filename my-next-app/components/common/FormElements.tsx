"use client";

import { clsx, type ClassValue } from "clsx";
import { Check, ChevronDown, Upload } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

// 클래스 병합 유틸리티 함수
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** * 타입 정의 (Props) */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  containerClassName?: string;
}

interface SelectionProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

// 공통 라벨 스타일
const Label = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <label
    className={cn(
      "text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-0.5 mb-1.5 block",
      className,
    )}
  >
    {children}
  </label>
);

/**
 * 1. 기본 Input
 */
export function Input({
  label,
  className,
  style,
  containerClassName,
  ...props
}: InputProps) {
  return (
    <div className={cn("flex flex-col w-full", containerClassName)}>
      {label && <Label>{label}</Label>}
      <input
        {...props}
        style={style}
        className={cn(
          "block w-full rounded border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-300 focus:border-blue-600 focus:outline-none transition-all sm:text-sm shadow-sm",
          className,
        )}
      />
    </div>
  );
}

/**
 * 2. Select
 */
export function Select({
  label,
  options,
  className,
  style,
  containerClassName,
  ...props
}: SelectProps) {
  return (
    <div className={cn("flex flex-col w-full relative", containerClassName)}>
      {label && <Label>{label}</Label>}
      <div className="relative">
        <select
          {...props}
          style={style}
          className={cn(
            "block w-full rounded border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-600 focus:outline-none transition-all sm:text-sm appearance-none cursor-pointer shadow-sm",
            className,
          )}
        >
          {options.map((opt: SelectOption) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}

/**
 * 3. Checkbox
 */
export function Checkbox({
  label,
  className,
  style,
  ...props
}: SelectionProps) {
  return (
    <label
      className={cn(
        "flex items-center gap-3 cursor-pointer group py-1",
        className,
      )}
      style={style}
    >
      <div className="relative flex items-center justify-center">
        <input {...props} type="checkbox" className="peer sr-only" />
        <div className="h-5 w-5 rounded border border-slate-300 bg-white transition-all peer-checked:bg-blue-600 peer-checked:border-blue-600 shadow-sm" />
        <Check className="absolute w-3 h-3 text-white hidden peer-checked:block stroke-[3px]" />
      </div>
      <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
        {label}
      </span>
    </label>
  );
}

/**
 * 4. Radio
 */
export function Radio({ label, className, style, ...props }: SelectionProps) {
  return (
    <label
      className={cn(
        "flex items-center gap-3 cursor-pointer group py-1",
        className,
      )}
      style={style}
    >
      <div className="relative flex items-center justify-center">
        <input {...props} type="radio" className="peer sr-only" />
        <div className="h-5 w-5 rounded-full border border-slate-300 bg-white transition-all peer-checked:border-blue-600 shadow-sm" />
        <div className="absolute w-2 h-2 bg-blue-600 rounded-full hidden peer-checked:block" />
      </div>
      <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
        {label}
      </span>
    </label>
  );
}

/**
 * 5. File Input
 */
export function FileInput({
  label,
  className,
  style,
  containerClassName,
  ...props
}: InputProps) {
  return (
    <div className={cn("flex flex-col w-full", containerClassName)}>
      {label && <Label>{label}</Label>}
      <label
        className={cn(
          "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded bg-slate-50 hover:bg-white hover:border-blue-400 transition-all cursor-pointer group",
          className,
        )}
        style={style}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-6 h-6 text-slate-300 group-hover:text-blue-500 mb-2 transition-colors" />
          <p className="text-sm text-slate-500 font-bold group-hover:text-blue-600 text-center px-4">
            파일을 선택하거나 여기에 끌어다 놓으세요
          </p>
          <p className="text-[11px] text-slate-400 mt-1 uppercase font-semibold">
            PDF, JPG, PNG (Max 10MB)
          </p>
        </div>
        <input {...props} type="file" className="hidden" />
      </label>
    </div>
  );
}
