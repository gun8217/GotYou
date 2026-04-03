"use client";

import { Check } from "lucide-react";

interface AgreementItemProps {
  label: string;
  checked: boolean;
  onCheck: (value: boolean) => void;
  onView: () => void;
}

export default function AgreementItem({
  label,
  checked,
  onCheck,
  onView,
}: AgreementItemProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50">
      <button
        type="button"
        onClick={() => onCheck(!checked)}
        className="flex items-center gap-3"
      >
        <div
          className={`w-5 h-5 flex items-center justify-center rounded-md border ${
            checked ? "bg-blue-600 border-blue-600" : "border-slate-300"
          }`}
        >
          {checked && <Check className="h-3 w-3 text-white stroke-[3px]" />}
        </div>

        <span className="text-sm font-medium text-slate-900">{label}</span>
      </button>

      <button
        type="button"
        onClick={onView}
        className="text-xs font-bold text-blue-600"
      >
        보기
      </button>
    </div>
  );
}
