"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function BaseModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: BaseModalProps) {
  // 모달 열릴 때 배경 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 배경 레이어 - 어두운 톤과 블러 효과 */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* 모달 본체 - Radius 8px (rounded-lg) 적용 */}
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col border border-slate-200">
        {/* 상단 헤더 */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white">
          <h3 className="text-md font-bold text-slate-900 tracking-tight">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 본문 내용 (스크롤 영역) */}
        <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto text-[14px] text-slate-600 leading-relaxed">
          {children}
        </div>

        {/* 하단 버튼 영역 */}
        {footer && (
          <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
