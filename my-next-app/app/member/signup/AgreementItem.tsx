"use client";

import { Check, ChevronRight } from "lucide-react";

interface AgreementItemProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

export default function AgreementItem({
  label,
  checked,
  onToggle,
}: AgreementItemProps) {
  return (
    <div
      onClick={onToggle}
      className="flex items-center justify-between group p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
    >
      <div className="flex items-center gap-3 pointer-events-none">
        <div
          className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all ${
            checked
              ? "bg-blue-600 border-blue-600 shadow-sm shadow-blue-100"
              : "border-slate-300 bg-white"
          }`}
        >
          {checked && <Check className="h-3 w-3 text-white stroke-[4px]" />}
        </div>
        <span
          className={`text-xs font-bold transition-colors ${checked ? "text-slate-900" : "text-slate-500"}`}
        >
          {label}
        </span>
      </div>
      <div className="text-slate-300 group-hover:text-blue-500 transition-colors flex items-center gap-1 text-[11px] font-bold">
        보기 <ChevronRight className="h-3 w-3" />
      </div>
    </div>
  );
}
