"use client";

import {
  BarChart3,
  Coins,
  Info,
  Navigation,
  PieChart,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";

export default function AnalysisResult() {
  // 가상의 분석 데이터 (사업계획서 MVP 모델 기준)
  const report = {
    caseNumber: "2024가소123456",
    score: 82,
    grade: "A (매우 높음)",
    recoveryProbability: 85,
    estimatedCost: 385200,
    expectedDuration: "4~6개월",
    indicators: [
      { label: "자산 포착률", value: 92, status: "excellent" },
      { label: "경매 낙찰률", value: 74, status: "good" },
      { label: "집행 효율성", value: 88, status: "excellent" },
      { label: "회수 가능성", value: 85, status: "excellent" },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* 상단 요약 헤더 */}
      <div className="bg-slate-900 text-white pt-12 pb-20 rounded-b-[40px] px-6">
        <div className="container mx-auto max-w-lg">
          <div className="flex justify-between items-start mb-6">
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-white/70">
              사건번호 {report.caseNumber}
            </span>
            <button className="text-white/60">
              <Info className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-lg font-medium text-white/70 mb-2">
              종합 집행 실익 점수
            </h1>
            <div className="relative inline-block">
              <span className="text-7xl font-black text-blue-400 leading-none">
                {report.score}
              </span>
              <span className="text-2xl font-bold ml-1 text-blue-400/50">
                / 100
              </span>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 bg-blue-600 px-4 py-1.5 rounded-full font-bold text-sm">
              집행 실익 {report.grade}
            </div>
          </div>
        </div>
      </div>

      {/* 메인 리포트 카드 */}
      <main className="container mx-auto px-4 -mt-12 max-w-lg space-y-4">
        {/* 핵심 지표: 집행 확률 & 비용 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-400 mb-1">
              예상 회수 확률
            </p>
            <p className="text-2xl font-black text-slate-900">
              {report.recoveryProbability}%
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-3">
              <Coins className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-400 mb-1">
              예상 집행 비용
            </p>
            <p className="text-2xl font-black text-slate-900">38.5만</p>
          </div>
        </div>

        {/* AI 가이드라인 (사업계획서 핵심 로직) */}
        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-blue-900">집행 전문가 가이드</h3>
          </div>
          <p className="text-sm text-blue-800 leading-relaxed font-medium">
            {/* &ldquo; 와 &rdquo; 를 사용하여 실제 인용구 느낌을 줌 */}
            &ldquo;채무자가 현재{" "}
            <span className="underline decoration-blue-300">직장인</span>으로
            파악되어
            <span className="font-bold text-blue-600 ml-1">급여 압류</span> 시
            실익이 매우 높습니다. 부동산 경매보다는 적은 비용으로 빠른 회수가
            가능한 예금 압류를 1순위로 권장합니다.&rdquo;
          </p>
        </div>

        {/* 세부 분석 지표 (MVP 항목 반영) */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-slate-400" />
            데이터 세부 지표
          </h3>
          <div className="space-y-5">
            {report.indicators.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-slate-600">
                    {item.label}
                  </span>
                  <span className="text-sm font-black text-blue-600">
                    {item.value}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 예상 소요 비용 리스트 */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-slate-400" />
            예상 비용 상세
          </h3>
          <div className="space-y-3">
            {[
              { label: "인지대/송달료", price: "약 85,000원" },
              { label: "집행관 수수료", price: "약 150,000원" },
              { label: "자산 조회 비용", price: "약 150,200원" },
            ].map((cost, idx) => (
              <div
                key={idx}
                className="flex justify-between py-2 border-b border-slate-50 last:border-0"
              >
                <span className="text-sm text-slate-500">{cost.label}</span>
                <span className="text-sm font-bold text-slate-700">
                  {cost.price}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-slate-50 p-4 rounded-2xl flex justify-between items-center">
            <span className="text-sm font-bold text-slate-900">합계</span>
            <span className="text-lg font-black text-blue-600">385,200원</span>
          </div>
        </div>

        {/* 행동 촉구 버튼 */}
        <div className="flex flex-col gap-3 pt-4">
          <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
            전문가에게 집행 위임하기
            <Navigation className="w-4 h-4 fill-current" />
          </button>
          <button className="w-full py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold flex items-center justify-center gap-2">
            셀프 집행 가이드 다운로드
          </button>
        </div>

        <p className="text-[11px] text-center text-slate-400 leading-relaxed">
          본 분석 결과는 공공 데이터와 실제 사례를 기반으로 한 예측치이며,
          <br />
          실제 집행 결과와는 차이가 있을 수 있습니다.
        </p>
      </main>
    </div>
  );
}
