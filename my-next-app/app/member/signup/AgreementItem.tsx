"use client";

import { Flex } from "@/components/common/LayoutElements";
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
      className="flex items-center justify-between group p-2 cursor-pointer transition-colors hover:bg-slate-50 border border-transparent hover:border-slate-100"
    >
      <Flex gap={3} className="pointer-events-none">
        <div
          className={`w-4 h-4 flex items-center justify-center border transition-all ${checked ? "bg-blue-600 border-blue-600" : "border-slate-300 bg-white"}`}
        >
          {checked && <Check className="h-2.5 w-2.5 text-white stroke-[4px]" />}
        </div>
        <span
          className={`text-[13px] font-medium transition-colors ${checked ? "text-slate-900" : "text-slate-400"}`}
        >
          {label}
        </span>
      </Flex>
      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-300 group-hover:text-blue-500 transition-colors uppercase tracking-tighter">
        View <ChevronRight className="h-3 w-3" />
      </div>
    </div>
  );
}
