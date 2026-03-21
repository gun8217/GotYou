"use client";

import { SectionTitle } from "@/components/common/Heading";
import { Badge, Box, Button, Flex } from "@/components/common/LayoutElements";
import {
  ArrowUpRight,
  BarChart3,
  ChevronRight,
  Compass,
  Database,
  FileText,
  Scale,
  Search,
  ShieldCheck,
} from "lucide-react";
import React from "react";

// --- Types ---
interface StatCardProps {
  label: string;
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  iconColorClass: string;
}

// --- Mock Data ---
const RECENT_REPORTS = [
  {
    id: 1,
    caseNumber: "2024-타채-5001",
    targetName: "김*수",
    date: "2026.03.21",
    status: "실익 있음",
  },
  {
    id: 2,
    caseNumber: "2024-타채-5002",
    targetName: "이*호",
    date: "2026.03.20",
    status: "실익 낮음",
  },
  {
    id: 3,
    caseNumber: "2024-타채-5003",
    targetName: "박*자",
    date: "2026.03.19",
    status: "실익 있음",
  },
] as const;

// --- Sub Components ---

function StatCard({
  label,
  title,
  value,
  icon,
  trend,
  iconColorClass,
}: StatCardProps) {
  return (
    <Box className="hover:transition-all duration-300 group">
      <Flex direction="col" align="stretch" gap={4}>
        <Flex justify="between">
          <div
            className={`p-1.5 rounded-md border border-slate-300 bg-slate-50 group-hover:bg-white transition-colors ${iconColorClass}`}
          >
            {icon}
          </div>
          <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">
            {label}
          </span>
        </Flex>
        <div>
          <p className="text-md font-bold text-slate-400 mb-1">{title}</p>
          <Flex align="end" gap={2}>
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {value}
            </span>
            <span className="text-sm font-bold text-brand-blue-600 pb-1.5 flex items-center gap-0.5">
              {trend} <ArrowUpRight size={16} />
            </span>
          </Flex>
        </div>
      </Flex>
    </Box>
  );
}

// --- Main Component ---

export default function MainDashboard() {
  return (
    <div className="bg-[#F8FAFC] pb-20 font-sans selection:bg-brand-blue-100">
      <main className="container mx-auto px-6 pt-12 space-y-12">
        {/* 1. 브랜드 헤더 & 메인 검색 (모바일: 세로, 데스크탑: 가로) */}
        <Flex
          direction="col" // 기본은 세로(모바일)
          justify="between"
          align="stretch" // 모바일에서는 검색창이 가득 차도록 stretch
          className="lg:flex-row lg:items-end gap-10 lg:gap-20" // 태블릿/PC 이상에서 가로로 배치
        >
          {/* 왼쪽: 타이틀 영역 */}
          <div className="space-y-4 min-w-fit">
            <span className="inline-block px-3 py-1 bg-brand-blue-50 text-brand-blue-700 text-[11px] font-black rounded-full uppercase tracking-widest">
              Execution Compass
            </span>
            <SectionTitle className="text-[32px] md:text-[40px] leading-[1.2] tracking-tight">
              <Flex gap={3} align="start">
                <Compass
                  className="text-brand-blue-700 mt-1"
                  size={36}
                  strokeWidth={1.5}
                />
                <div className="flex flex-wrap items-baseline gap-x-2 font-medium text-slate-600 leading-tight">
                  <span className="whitespace-nowrap">데이터로 증명하는</span>
                  <span className="font-black text-slate-900 whitespace-nowrap">
                    <span className="text-brand-blue-700">집행 실익</span> 분석
                  </span>
                </div>
              </Flex>
            </SectionTitle>
          </div>

          {/* 오른쪽: 메인 분석 검색창 섹션 */}
          <div className="flex-1 w-full max-w-2xl">
            {" "}
            {/* 모바일에서 꽉 차게 w-full 추가 */}
            <Box padding="none" className="px-5 py-3 bg-white border-slate-200">
              <Flex gap={2}>
                <Search className="text-slate-300 shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="사건번호 입력"
                  className="flex-1 text-sm md:text-base font-bold text-slate-700 placeholder:text-slate-300 focus:outline-none bg-transparent min-w-0"
                />
                <Button
                  size="lg"
                  className="bg-slate-600 hover:bg-brand-blue-700 shrink-0"
                >
                  분석 시작
                </Button>
              </Flex>
            </Box>
            <p className="text-[11px] text-slate-400 mt-4 ml-2 flex items-center gap-1.5 font-medium">
              <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
              입력하신 정보는 256-bit AES 암호화로 보호됩니다.
            </p>
          </div>
        </Flex>

        {/* 2. 주요 지표 지수 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            label="Total Asset Value"
            title="누적 분석 자산"
            value="₩42.8억"
            icon={<Database size={20} />}
            iconColorClass="text-brand-blue-600"
            trend="전월 대비 +12%"
          />
          <StatCard
            label="Success Probability"
            title="평균 회수 성공률"
            value="38.4%"
            icon={<BarChart3 size={20} />}
            iconColorClass="text-emerald-600"
            trend="상 등급 기준"
          />
          <StatCard
            label="Cost-Benefit Index"
            title="집행 가성비 지수"
            value="8.2 / 10"
            icon={<Scale size={20} />}
            iconColorClass="text-orange-600"
            trend="High Efficiency"
          />
        </div>

        {/* 3. 리포트 및 사이드바 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 최근 리포트 테이블 영역 */}
          <Box
            padding="none"
            className="lg:col-span-8 overflow-hidden border-slate-200"
          >
            <Flex
              justify="between"
              className="px-8 py-6 bg-slate-50/50 border-b border-slate-100"
            >
              <h3 className="font-black text-slate-800 text-base">
                최근 집행 실익 리포트
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-brand-blue-700 group"
              >
                전체 보기{" "}
                <ChevronRight
                  size={16}
                  className="ml-1 group-hover:translate-x-0.5 transition-transform"
                />
              </Button>
            </Flex>

            <div className="divide-y divide-slate-50">
              {RECENT_REPORTS.map((report) => (
                <div
                  key={report.id}
                  className="px-8 py-6 hover:bg-slate-50/30 transition-all cursor-pointer group"
                >
                  <Flex justify="between">
                    <div className="space-y-1.5">
                      <Flex gap={2}>
                        <FileText
                          size={16}
                          className="text-slate-300 group-hover:text-brand-blue-500 transition-colors"
                        />
                        <p className="font-bold text-slate-900 group-hover:text-brand-blue-700 transition-colors">
                          사건번호 {report.caseNumber}
                        </p>
                      </Flex>
                      <Flex
                        gap={3}
                        className="text-xs text-slate-400 font-medium ml-6"
                      >
                        <span>대상: {report.targetName}</span>
                        <span className="text-slate-200 text-[10px]">|</span>
                        <span>분석일시: {report.date}</span>
                      </Flex>
                    </div>
                    <Badge
                      variant={report.status === "실익 있음" ? "blue" : "slate"}
                      className="rounded-lg px-4 py-1.5 font-black text-[11px]"
                    >
                      {report.status}
                    </Badge>
                  </Flex>
                </div>
              ))}
            </div>
          </Box>

          {/* 사이드 퀵 액션 */}
          <div className="lg:col-span-4 space-y-4">
            <Box className="hover:border-brand-blue-200 transition-all cursor-pointer group">
              <Flex gap={4}>
                <div className="p-3 bg-brand-blue-50 rounded-xl group-hover:bg-brand-blue-100 transition-colors text-brand-blue-600">
                  <FileText size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-900 group-hover:text-brand-blue-700 transition-colors">
                    법률 서식 자료실
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    신청서 및 최신 판례 서식 다운로드
                  </p>
                </div>
              </Flex>
            </Box>

            <Box className="border-dashed border-2 border-slate-200 bg-transparent text-center space-y-6">
              <div className="inline-flex p-4 bg-slate-100 rounded-full text-slate-400">
                <Database size={54} />
              </div>
              <div className="space-y-2">
                <p className="text-md font-black text-slate-300 uppercase tracking-widest">
                  Platform Status
                </p>
                <p className="text-md text-slate-500 font-medium leading-relaxed">
                  현재{" "}
                  <span className="text-brand-blue-700 font-bold">
                    집행나침반
                  </span>
                  은 베타 운영 중이며,
                  <br />
                  매일 자정 금융결제원 데이터를 동기화합니다.
                </p>
              </div>
            </Box>
          </div>
        </div>
      </main>
    </div>
  );
}
