"use client";

import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

// 내부용 cn 함수
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// --- 1. Flex 컴포넌트 ---
interface FlexProps extends BaseProps {
  direction?: "row" | "col";
  justify?: "start" | "center" | "between" | "end";
  align?: "start" | "center" | "end" | "stretch";
  gap?: 0 | 1 | 2 | 3 | 4 | 6 | 8 | 10;
}

export function Flex({
  children,
  direction = "row",
  justify = "start",
  align = "center",
  gap = 4,
  className = "",
  style,
}: FlexProps) {
  const justifyStyles: Record<string, string> = {
    start: "justify-start",
    center: "justify-center",
    between: "justify-between",
    end: "justify-end",
  };

  const alignStyles: Record<string, string> = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  const gapStyles: Record<number, string> = {
    0: "gap-0",
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
  };

  return (
    <div
      style={style}
      className={cn(
        "flex",
        direction === "col" ? "flex-col" : "flex-row",
        justifyStyles[justify],
        alignStyles[align],
        gapStyles[gap],
        className,
      )}
    >
      {children}
    </div>
  );
}

// --- 2. Box 컴포넌트 ---
interface BoxProps extends BaseProps {
  padding?: "none" | "sm" | "md" | "lg";
}

export function Box({
  children,
  className = "",
  padding = "md",
  style,
}: BoxProps) {
  const paddings: Record<string, string> = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-10",
  };

  return (
    <div
      style={style}
      className={cn(
        "bg-white rounded border border-slate-200 shadow-sm",
        paddings[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}

// --- 3. Button 컴포넌트 ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  loading,
  children,
  className = "",
  style,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold transition-all active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none rounded whitespace-nowrap";

  const variants: Record<string, string> = {
    primary: "bg-brand-blue-700 text-white shadow-sm hover:bg-brand-blue-900",
    secondary: "bg-slate-800 text-white shadow-sm hover:bg-slate-900",
    outline:
      "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50",
    danger: "bg-red-500 text-white shadow-sm hover:bg-red-600",
    ghost: "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
  };

  const sizes: Record<string, string> = {
    sm: "px-3 h-8 sm:h-9 text-xs",
    md: "px-4 h-10 sm:h-11 text-sm",
    lg: "px-6 h-12 text-base",
  };

  return (
    <button
      style={style}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={loading}
      {...props}
    >
      {loading && (
        <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      {children}
    </button>
  );
}

// --- 4. Badge 컴포넌트 ---
interface BadgeProps extends BaseProps {
  variant?: "blue" | "red" | "green" | "slate" | "orange";
}

export function Badge({
  children,
  variant = "slate",
  className = "",
  style,
}: BadgeProps) {
  const styles: Record<string, string> = {
    blue: "bg-brand-blue-50 text-brand-blue-700 border-brand-blue-100",
    red: "bg-red-50 text-red-700 border-red-100",
    green: "bg-green-50 text-green-700 border-green-100",
    slate: "bg-slate-100 text-slate-600 border-slate-200",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
  };

  return (
    <span
      style={style}
      className={cn(
        "px-2 py-0.5 rounded-none text-[10px] font-bold border uppercase tracking-tight inline-flex items-center",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

// --- 5. Progress 컴포넌트 ---
interface ProgressProps extends BaseProps {
  value: number;
  color?: "blue" | "red" | "slate";
}

export function Progress({
  value,
  color = "blue",
  className = "",
  style,
}: ProgressProps) {
  const barColors: Record<string, string> = {
    blue: "bg-brand-blue-700",
    red: "bg-red-500",
    slate: "bg-slate-300",
  };

  const textColors: Record<string, string> = {
    blue: "text-brand-blue-700",
    red: "text-red-500",
    slate: "text-slate-400",
  };

  return (
    <div
      style={style}
      className={cn("flex items-center gap-3 w-full", className)}
    >
      <div className="flex-1 bg-slate-100 h-1.5 overflow-hidden">
        <div
          className={cn(
            barColors[color],
            "h-full transition-all duration-1000",
          )}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className={cn("text-xs font-bold min-w-[30px]", textColors[color])}>
        {value}%
      </span>
    </div>
  );
}

// --- 6. Table 컴포넌트 세트 ---
export function Table({ children, className = "", style }: BaseProps) {
  return (
    <div
      style={style}
      className={cn(
        "w-full overflow-hidden rounded-lg border border-slate-200",
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse min-w-[700px]">
          {children}
        </table>
      </div>
    </div>
  );
}

export function THead({ children, className = "", style }: BaseProps) {
  return (
    <thead
      style={style}
      className={cn(
        "bg-slate-50 text-xs font-bold uppercase text-slate-500 border-b border-slate-200",
        className,
      )}
    >
      {children}
    </thead>
  );
}

export function TBody({ children, className = "", style }: BaseProps) {
  return (
    <tbody
      style={style}
      className={cn("divide-y divide-slate-100 bg-white", className)}
    >
      {children}
    </tbody>
  );
}

export function TR({
  children,
  onClick,
  className = "",
  style,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <tr
      onClick={onClick}
      style={style}
      className={cn(
        onClick ? "cursor-pointer hover:bg-slate-50/50" : "",
        "transition-colors",
        className,
      )}
    >
      {children}
    </tr>
  );
}

export function TH({ children, className = "", style }: BaseProps) {
  return (
    <th style={style} className={cn("px-4 py-3 font-bold", className)}>
      {children}
    </th>
  );
}

export function TD({ children, className = "", style }: BaseProps) {
  return (
    <td
      style={style}
      className={cn("px-4 py-3 font-medium text-slate-600", className)}
    >
      {children}
    </td>
  );
}
