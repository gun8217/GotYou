"use client";

import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Coins,
  Trophy,
  X,
} from "lucide-react";
import { useState } from "react";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseTitle: string;
  totalExpense: number; // 그동안 쓴 총 비용
}

export default function ResultModal({
  isOpen,
  onClose,
  caseTitle,
  totalExpense,
}: ResultModalProps) {
  const [step, setStep] = useState(1); // 1: 결과 선택, 2: 상세 입력
  const [resultType, setResultType] = useState<
    "success" | "partial" | "fail" | null
  >(null);
  const [recoveredAmount, setRecoveredAmount] = useState("");

  if (!isOpen) return null;

  const handleNext = (type: "success" | "partial" | "fail") => {
    setResultType(type);
    setStep(2);
  };

  const netProfit = parseInt(recoveredAmount || "0") - totalExpense;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
        {/* 헤더 */}
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <div>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-0.5">
              Final Result
            </p>
            <h3 className="text-lg font-bold text-slate-900 truncate max-w-[250px]">
              {caseTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:bg-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8">
          {step === 1 ? (
            /* 1단계: 결과 유형 선택 */
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-slate-900">
                  집행 결과가 나왔나요?
                </h4>
                <p className="text-sm text-slate-500 mt-1">
                  최종 회수 상태를 선택해주세요.
                </p>
              </div>

              <button
                onClick={() => handleNext("success")}
                className="w-full p-4 rounded-2xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50/50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center font-bold">
                    전액
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">전액 회수 성공</p>
                    <p className="text-xs text-slate-500">
                      판결 금액 모두를 돌려받았습니다.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
              </button>

              <button
                onClick={() => handleNext("partial")}
                className="w-full p-4 rounded-2xl border-2 border-slate-100 hover:border-orange-500 hover:bg-orange-50/50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center font-bold">
                    일부
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">일부 회수</p>
                    <p className="text-xs text-slate-500">
                      금액의 일부만 회수되었습니다.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-orange-500" />
              </button>

              <button
                onClick={() => handleNext("fail")}
                className="w-full p-4 rounded-2xl border-2 border-slate-100 hover:border-red-500 hover:bg-red-50/50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center font-bold">
                    실패
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">회수 실패 (종결)</p>
                    <p className="text-xs text-slate-500">
                      채무자 자산 부족 등으로 종결되었습니다.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-red-500" />
              </button>
            </div>
          ) : (
            /* 2단계: 실제 회수 금액 및 정산 */
            <div className="space-y-6 animate-in slide-in-from-right-5">
              {/* 추가된 부분: resultType에 따른 상태 배지 표시 */}
              <div className="flex justify-center">
                {resultType === "success" && (
                  <div className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 전액 회수 성공
                  </div>
                )}
                {resultType === "partial" && (
                  <div className="bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" /> 일부 회수 진행
                  </div>
                )}
                {resultType === "fail" && (
                  <div className="bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5">
                    <X className="w-3.5 h-3.5" /> 회수 실패/종결
                  </div>
                )}
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mb-3 ml-1 uppercase tracking-wider">
                  <Coins className="w-3.5 h-3.5" /> 실제 회수 금액
                </label>
                <div className="relative">
                  <input
                    type="number"
                    autoFocus
                    placeholder="0"
                    value={recoveredAmount}
                    onChange={(e) => setRecoveredAmount(e.target.value)}
                    className="w-full px-6 py-5 bg-slate-50 border-none rounded-[24px] text-2xl font-black text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                    원
                  </span>
                </div>
              </div>

              {/* 실익 계산기 영역 */}
              <div className="bg-slate-900 rounded-[28px] p-6 text-white">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-800">
                  <span className="text-sm text-slate-400 font-medium">
                    누적 집행 비용
                  </span>
                  <span className="font-bold text-red-400">
                    -{totalExpense.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400 font-medium">
                    최종 순이익
                  </span>
                  <div className="text-right">
                    <p
                      className={`text-xl font-black ${netProfit > 0 ? "text-green-400" : "text-slate-400"}`}
                    >
                      {netProfit.toLocaleString()}원
                    </p>
                    <p className="text-[10px] text-slate-500">
                      비용 대비 회수 성과
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold active:scale-95 transition-all"
                >
                  이전으로
                </button>
                <button
                  onClick={() => {
                    alert("결과가 성공적으로 기록되었습니다!");
                    onClose();
                  }}
                  className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" /> 기록 완료
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
