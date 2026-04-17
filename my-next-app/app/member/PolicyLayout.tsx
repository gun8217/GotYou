"use client";

import { clsx, type ClassValue } from "clsx";
import { ChevronDown } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 이력 데이터 타입 정의
interface PolicyHistory {
  date: string;
  label: string;
  href: string;
}

interface PolicyLayoutProps {
  title: string;
  children: React.ReactNode;
  effectiveDate?: string;
  history?: PolicyHistory[]; // 이력 목록 추가
  className?: string;
  style?: React.CSSProperties;
}

export default function PolicyLayout({
  title,
  children,
  effectiveDate,
  history,
  className,
  style,
}: PolicyLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 font-sans">
      <div
        className={cn(
          "container max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden text-slate-700",
          className,
        )}
        style={style}
      >
        {/* 헤더 섹션 */}
        <div className="bg-slate-900 p-8 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight">{title}</h1>
            {effectiveDate && (
              <p className="text-xs text-slate-400 mt-2 font-medium">
                시행일자: {effectiveDate}
              </p>
            )}
          </div>

          {/* 이력 선택 드롭다운 (역사가 있을 때만 노출) */}
          {history && history.length > 0 && (
            <div className="relative inline-block">
              <select
                className="appearance-none bg-slate-800 text-[11px] font-bold py-1.5 pl-3 pr-8 rounded border border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                onChange={(e) => (window.location.href = e.target.value)}
              >
                <option value="">이전 약관 보기</option>
                {history.map((item) => (
                  <option key={item.date} value={item.href}>
                    {item.label} ({item.date})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          )}
        </div>

        <main>{children}</main>

        <footer className="pb-12 pt-8 border-t border-slate-100 text-center">
          {effectiveDate && (
            <p className="text-xs text-slate-400 mb-6 font-bold">
              부칙: 본 안내는 {effectiveDate}부터 적용됩니다.
            </p>
          )}
        </footer>
      </div>
    </div>
  );
}
