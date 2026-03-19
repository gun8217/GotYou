"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

// 1. 모달이 받아야 할 Props 정의 (이게 없어서 에러가 났던 거예요!)
interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode; // 모달 안의 내용물 (약관 등)
  footer?: React.ReactNode; // 하단 버튼 영역 (선택사항)
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
      {/* 배경 레이어 (검은 투명 배경) */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* 모달 본체 */}
      <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
        {/* 상단 헤더 영역 (ModalHeader를 따로 안 만들었으므로 여기에 직접 작성) */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white">
          <h3 className="text-lg font-black text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 본문 내용 (스크롤 가능) */}
        <div className="p-8 max-h-[60vh] overflow-y-auto text-slate-600 leading-relaxed">
          {children}
        </div>

        {/* 하단 버튼 영역 */}
        {footer && (
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
