"use client";

import {
  AlertTriangle,
  ArrowRight,
  Search,
  ShieldAlert,
  Target,
} from "lucide-react";
import Link from "next/link";

export default function ExecutionStrategyPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 헤더 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto max-w-2xl px-6 h-16 flex items-center gap-4">
          <Link href="/my-reports" className="text-slate-400">
            <ArrowRight className="w-5 h-5 rotate-180" />
          </Link>
          <h1 className="text-lg font-bold text-slate-900">맞춤형 집행 전략</h1>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-6 py-8">
        {/* 1. 현실적인 성공률 고지 */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <h2 className="font-bold text-slate-900">민사 집행의 현실</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                일반 민사 실패율
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-red-500">70%</span>
                <span className="text-xs font-bold text-slate-400">이상</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-red-500 h-full w-[70%]" />
              </div>
            </div>
            <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                소상공인 실패율
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-orange-500">30%</span>
                <span className="text-xs font-bold text-slate-400">내외</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-orange-500 h-full w-[30%]" />
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 px-1 leading-relaxed">
            * 채무자의 재산 은닉 및 주소 불명 등의 사유로 실제 회수율은 생각보다
            낮을 수 있습니다.
          </p>
        </section>

        {/* 2. 재산 조회 절차 및 한계 비교 */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-slate-900">재산 조회 방식 비교</h2>
          </div>

          <div className="space-y-4">
            {/* 법원: 재산명시/조회 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg">
                  법원 절차
                </span>
                <span className="text-xs font-bold text-slate-400">
                  비용: 저렴 (송달료 위주)
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">
                재산명시 및 재산조회신청
              </h3>
              <ul className="space-y-2">
                <li className="flex gap-2 text-sm text-slate-600">
                  <AlertTriangle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>
                    채무자가 명시 명령을 피하면(폐문부재 등) 제재가 어려움
                  </span>
                </li>
                <li className="flex gap-2 text-sm text-slate-600">
                  <AlertTriangle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>재산조회는 계좌당 약 10만원의 높은 추가 비용 발생</span>
                </li>
              </ul>
            </div>

            {/* 신용평가사/추심업체 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black rounded-lg">
                  추심/법무사
                </span>
                <span className="text-xs font-bold text-slate-400">
                  착수금: 50만원~
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">외부 기관 의뢰</h3>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-slate-50 p-3 rounded-2xl">
                  <p className="text-[11px] font-bold text-slate-500 mb-1">
                    추심업체
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    데이터 기반으로 회수 확률이 높은 곳 타겟팅
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl">
                  <p className="text-[11px] font-bold text-slate-500 mb-1">
                    법무사
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    전문적 법리 검토 후 주요 은행 선별 집행
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 채권 금액별 권장 가이드 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-purple-600" />
            <h2 className="font-bold text-slate-900">채권 규모별 권장 경로</h2>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-3 pl-6 space-y-8 py-2">
            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-100" />
              <h4 className="font-bold text-slate-900">
                소액 채권 (300만원 미만)
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                집행 비용이 채권액의 큰 비중을 차지하므로, 직접 법원 전자소송을
                통한 계좌 압류 시도 권장
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-slate-300" />
              <h4 className="font-bold text-slate-900">
                중액 채권 (300~1000만원)
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                추심업체의 신용조회 서비스를 통해 실익을 파악한 뒤 타겟팅 집행
                고려
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-slate-300" />
              <h4 className="font-bold text-slate-900">
                고액 채권 (1000만원 이상)
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                부동산 압류 및 경매 검토 가능 범위. 법무사 또는 변호사 상담을
                통한 강력한 법적 조치 권장
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 하단 고정 플로팅 바 */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent">
        <div className="container mx-auto max-w-2xl">
          <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-100 flex items-center justify-center gap-2 hover:bg-blue-700 transition-all">
            내 사례에 맞는 최적 전략 시뮬레이션{" "}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
