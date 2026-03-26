"use client";

import { Box, Button, Flex } from "@/components/common/LayoutElements";
import { AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function EfficiencyCalculator() {
  const [debtAmount, setDebtAmount] = useState(5000000); // 채권 금액 (500만)
  const [upfrontFee, setUpfrontFee] = useState(500000); // 착수금 (50만)
  const [searchCount, setSearchCount] = useState(3); // 조회 계좌 수
  const [successRate, setSuccessRate] = useState(5); // 예상 성공률 (%)

  // 계산 로직
  const totalExpense = upfrontFee + searchCount * 100000; // 총 집행 비용
  const expectedValue = debtAmount * (successRate / 100) - totalExpense;
  const roi = ((debtAmount - totalExpense) / totalExpense) * 100;

  return (
    <div className="bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 헤더 섹션 */}
        <header className="text-center py-6">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            집행 가성비 계산기
          </h1>
          <p className="text-slate-600 mt-2">
            집행 절차 전 현실적인 기대 수익을 수치로 확인하세요.
          </p>
        </header>

        {/* 메인 콘텐츠: PC에서는 가로(Row), 모바일에서는 세로(Col) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* 1. 입력 섹션 (왼쪽) */}
          <Box className="border-none shadow-md flex flex-col justify-between">
            <div className="space-y-16">
              <div>
                <label className="text-md text-slate-400 uppercase mb-3 block">
                  채권 금액 (받을 돈)
                </label>
                <Flex gap={0} className="w-full">
                  <input
                    type="number"
                    value={debtAmount}
                    onChange={(e) => setDebtAmount(Number(e.target.value))}
                    className="w-full text-3xl font-black text-blue-600 focus:outline-none bg-transparent"
                  />
                  <span className="text-slate-400 font-semibold">원</span>
                </Flex>
              </div>

              <Flex gap={4} className="w-full">
                <div className="flex-1">
                  <label className="text-sm text-slate-500 uppercase mb-2 block">
                    업체 착수금
                  </label>
                  <input
                    type="number"
                    value={upfrontFee}
                    onChange={(e) => setUpfrontFee(Number(e.target.value))}
                    className="w-full font-bold border-b-2 border-slate-100 pb-2 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-slate-500 uppercase mb-2 block">
                    조회 계좌 수 (개당 10만)
                  </label>
                  <input
                    type="number"
                    value={searchCount}
                    onChange={(e) => setSearchCount(Number(e.target.value))}
                    className="w-full font-bold border-b-2 border-slate-100 pb-2 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </Flex>

              <div>
                <Flex justify="between" align="center" className="mb-3">
                  <label className="text-sm text-slate-500 uppercase">
                    예상 성공 확률
                  </label>
                  <span className="text-blue-600 font-black">
                    {successRate}%
                  </span>
                </Flex>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={successRate}
                  onChange={(e) => setSuccessRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <Flex justify="between" className="text-xs text-slate-400 mt-2">
                  <span>냉정한 현실 (5% 미만)</span>
                  <span>희망 회수 (70%+)</span>
                </Flex>
              </div>
            </div>
          </Box>

          {/* 2. 결과 섹션 (오른쪽) */}
          <Box
            className={`p-8 text-white border-none shadow-xl transition-all duration-500 flex flex-col justify-between ${expectedValue > 0 ? "bg-slate-900" : "bg-red-600"}`}
          >
            <div>
              <Flex justify="between" align="start" className="mb-8">
                <div className="space-y-1">
                  <span className="font-semibold opacity-80 uppercase tracking-wider">
                    수학적 기대 가치
                  </span>
                  <p className="text-xs opacity-50">
                    Mathematical Expected Value
                  </p>
                </div>
                {expectedValue > 0 ? (
                  <ShieldCheck className="w-8 h-8 text-blue-400" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-white" />
                )}
              </Flex>

              <div className="mb-10">
                <h2 className="text-5xl font-bold mb-2">
                  <Flex gap={1} align="end">
                    {Math.floor(expectedValue).toLocaleString()}
                    <span className="text-3xl font-normal">원</span>
                  </Flex>
                </h2>
                <p className="text-xs font-normal leading-relaxed">
                  {expectedValue > 0
                    ? "시도해 볼 만한 가치가 있는 채권입니다. 비용 대비 회수 기대액이 높습니다."
                    : "주의! 통계적으로 집행 비용이 회수액보다 클 확률이 매우 높습니다."}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
                <div>
                  <p className="text-sm opacity-60 uppercase mb-1">
                    총 매몰 비용
                  </p>
                  <p className="text-xl font-semibold">
                    {totalExpense.toLocaleString()}원
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-60 uppercase mb-1">
                    성공 시 수익률
                  </p>
                  <p className="text-xl font-semibold">{roi.toFixed(1)}%</p>
                </div>
              </div>

              <Button
                variant="ghost"
                className="w-full py-4 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border-none flex items-center justify-center gap-2 transition-all"
              >
                상세 데이터 리포트 보기 <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Box>
        </div>

        {/* 하단 저장 버튼 */}
        <Button
          variant="outline"
          className="w-full py-4 bg-white hover:bg-slate-100 border-slate-300 text-md font-semibold text-slate-500 hover:text-slate-700 transition-all flex items-center justify-center gap-2 shadow-xs"
        >
          계산 결과 PDF 저장하기 <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
