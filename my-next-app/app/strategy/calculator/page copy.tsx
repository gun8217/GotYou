"use client";

import { AlertCircle, ArrowRight, Calculator, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function EfficiencyCalculator() {
  const [debtAmount, setDebtAmount] = useState(5000000); // 채권 금액 (500만)
  const [upfrontFee, setUpfrontFee] = useState(500000); // 착수금 (50만)
  const [searchCount, setSearchCount] = useState(3); // 조회 계좌 수
  const [successRate, setSuccessRate] = useState(30); // 예상 성공률 (%)

  // 계산 로직
  const totalExpense = upfrontFee + searchCount * 100000; // 총 집행 비용
  const expectedValue = debtAmount * (successRate / 100) - totalExpense;
  const roi = ((debtAmount - totalExpense) / totalExpense) * 100;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="text-center py-4">
          <div className="w-16 h-16 bg-blue-600 text-white rounded-[24px] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-100">
            <Calculator className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            집행 가성비 계산기
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            업체에 맡기기 전, 현실적인 기대 수익을 확인하세요.
          </p>
        </header>

        {/* 입력 섹션 */}
        <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm space-y-6">
          <div>
            <label className="text-xs font-black text-slate-400 uppercase mb-2 block">
              채권 금액 (받을 돈)
            </label>
            <input
              type="number"
              value={debtAmount}
              onChange={(e) => setDebtAmount(Number(e.target.value))}
              className="w-full text-2xl font-black text-blue-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">
                업체 착수금
              </label>
              <input
                type="number"
                value={upfrontFee}
                onChange={(e) => setUpfrontFee(Number(e.target.value))}
                className="w-full font-bold border-b border-slate-100 pb-1 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">
                조회 계좌 수 (개당 10만)
              </label>
              <input
                type="number"
                value={searchCount}
                onChange={(e) => setSearchCount(Number(e.target.value))}
                className="w-full font-bold border-b border-slate-100 pb-1 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-black text-slate-400 uppercase mb-2 block">
              예상 성공 확률 ({successRate}%)
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={successRate}
              onChange={(e) => setSuccessRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-2">
              <span>냉정한 현실 (30%)</span>
              <span>희망 회수 (70%+)</span>
            </div>
          </div>
        </div>

        {/* 결과 섹션 */}
        <div
          className={`rounded-[32px] p-8 text-white shadow-xl transition-colors ${expectedValue > 0 ? "bg-slate-900" : "bg-red-600"}`}
        >
          <div className="flex justify-between items-start mb-6">
            <span className="text-sm font-bold opacity-80 uppercase">
              수학적 기대 가치
            </span>
            {expectedValue > 0 ? <ShieldCheck /> : <AlertCircle />}
          </div>

          <div className="mb-8">
            <h2 className="text-4xl font-black mb-1">
              {Math.floor(expectedValue).toLocaleString()}원
            </h2>
            <p className="text-xs opacity-70">
              {expectedValue > 0
                ? "비용 대비 시도해 볼 만한 가치가 있습니다."
                : "통계적으로 돈을 버릴 확률이 더 높습니다."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
            <div>
              <p className="text-[10px] opacity-60 font-bold uppercase mb-1">
                총 매몰 비용
              </p>
              <p className="font-bold">{totalExpense.toLocaleString()}원</p>
            </div>
            <div>
              <p className="text-[10px] opacity-60 font-bold uppercase mb-1">
                성공 시 수익률
              </p>
              <p className="font-bold">{roi.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <button className="w-full py-5 bg-white border-2 border-slate-200 rounded-2xl font-black text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
          상세 리포트 저장하기 <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
