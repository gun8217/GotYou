"use client";

import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  Filter,
  Receipt,
  Search,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
// 1. 작성하신 ResultModal 컴포넌트를 import 하세요 (경로 주의)
import ResultModal from "./components/ResultModal";

export default function MyReportsPage() {
  // 모달 제어를 위한 상태 추가
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState({ title: "", expense: 0 });

  // 가상의 리포트 목록 데이터
  const [reports] = useState([
    {
      id: "report-001",
      caseNumber: "2024가소123456",
      title: "대여금 반환 청구 (홍길동)",
      score: 82,
      status: "in_progress",
      resultStatus: "pending",
      createdAt: "2024.03.10",
      expenseCount: 3,
      totalExpense: 157200, // 비용 합산 데이터 추가 (예시)
    },
    {
      id: "report-002",
      caseNumber: "2023나987654",
      title: "물품대금 지급 (주식회사 대박)",
      score: 45,
      status: "completed",
      resultStatus: "success_full",
      createdAt: "2024.01.15",
      expenseCount: 5,
      totalExpense: 420000,
    },
    {
      id: "report-003",
      caseNumber: "2024가단112233",
      title: "손해배상 (이철수)",
      score: 68,
      status: "in_progress",
      resultStatus: "pending",
      createdAt: "2024.03.05",
      expenseCount: 0,
      totalExpense: 0,
    },
  ]);

  // 결과 입력 버튼 클릭 시 호출 함수
  const handleOpenResult = (title: string, expense: number) => {
    setSelectedCase({ title, expense });
    setIsResultModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-8">
      <div className="max-w-5xl mx-auto">
        {/* 상단 헤더 */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              나의 분석 리포트
            </h1>
            <p className="text-slate-500 mt-1">
              분석된 판결문의 실익 점수와 집행 현황을 관리합니다.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="사건번호 검색"
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <Filter className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </header>

        {/* 리포트 카드 목록 */}
        <div className="grid gap-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden group"
            >
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* 왼쪽 정보 영역 */}
                <div className="flex gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${report.score >= 70 ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-400"}`}
                  >
                    <FileText className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-400">
                        {report.caseNumber}
                      </span>
                      <span className="text-[10px] text-slate-300">|</span>
                      <span className="text-xs font-medium text-slate-400">
                        {report.createdAt}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {report.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-3">
                      {report.resultStatus === "pending" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 text-orange-600 text-[11px] font-bold border border-orange-100">
                          <Clock className="w-3 h-3" /> 결과 입력 대기
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-green-50 text-green-600 text-[11px] font-bold border border-green-100">
                          <CheckCircle2 className="w-3 h-3" /> 회수 완료
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 text-[11px] font-bold border border-slate-100">
                        <Receipt className="w-3 h-3" /> 영수증{" "}
                        {report.expenseCount}건
                      </span>
                    </div>
                  </div>
                </div>

                {/* 오른쪽 액션 영역 */}
                <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      실익 점수
                    </p>
                    <div className="flex items-center gap-1">
                      <TrendingUp
                        className={`w-4 h-4 ${report.score >= 70 ? "text-blue-500" : "text-slate-400"}`}
                      />
                      <span
                        className={`text-2xl font-black ${report.score >= 70 ? "text-blue-600" : "text-slate-400"}`}
                      >
                        {report.score}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/my-reports/${report.id}`}
                      className="px-5 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors"
                    >
                      리포트 보기
                    </Link>
                    <Link
                      href={`/expenses/${report.id}`}
                      className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"
                      title="비용 관리"
                    >
                      <Receipt className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* 하단 알림 바: 결과 입력하기 버튼 클릭 이벤트 연결 */}
              {report.resultStatus === "pending" && (
                <div className="bg-orange-50/50 px-6 py-2 border-t border-orange-100 flex items-center justify-between">
                  <p className="text-[11px] text-orange-700 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> 집행 결과가 나왔나요?
                    결과를 입력하면 분석 정확도가 올라갑니다.
                  </p>
                  <button
                    onClick={() =>
                      handleOpenResult(report.title, report.totalExpense)
                    }
                    className="text-[11px] font-bold text-orange-600 underline underline-offset-2 hover:text-orange-800 transition-colors"
                  >
                    결과 입력하기
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 2. 결과 입력 모달 컴포넌트 배치 */}
        <ResultModal
          isOpen={isResultModalOpen}
          onClose={() => setIsResultModalOpen(false)}
          caseTitle={selectedCase.title}
          totalExpense={selectedCase.expense}
        />

        {/* 빈 화면 안내 (기존과 동일) */}
        {reports.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
            {/* ... 생략 ... */}
          </div>
        )}
      </div>
    </div>
  );
}
