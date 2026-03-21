"use client";

import { SectionTitle } from "@/components/common/Heading";
import {
  Badge,
  Box,
  Button,
  Flex,
  Progress,
  Table,
  TBody,
  TD,
  TH,
  THead,
  TR,
} from "@/components/common/LayoutElements";
import {
  ArrowUpRight,
  Compass,
  Database,
  Plus,
  Search,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";
import React from "react";

// 1. StatCard용 인터페이스 정의
interface StatCardProps {
  title: string;
  value: string;
  desc: string;
  icon: React.ReactNode;
}

export default function MainDashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <main className="container mx-auto px-4 pt-10 space-y-6">
        {/* 상단 헤더 영역 */}
        <Flex justify="between" align="end" className="mb-2">
          <div>
            <Badge variant="blue" className="mb-2">
              MVP Engine v1.0
            </Badge>
            <SectionTitle className="text-2xl block">
              집행 실익 분석 대시보드
            </SectionTitle>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              채무자 데이터 기반의 V-P-C 알고리즘 분석 결과입니다.
            </p>
          </div>
          <Button variant="primary" size="md" className="gap-2 shadow-none">
            <Plus size={16} /> 신규 사건 분석
          </Button>
        </Flex>

        {/* 핵심 지표 카드 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="추정 자산 가치 (V)"
            value="₩428,500,000"
            desc="분석된 채무자 총 자산 규모"
            icon={<Database size={20} className="text-blue-600" />}
          />
          <StatCard
            title="평균 회수성 (P)"
            value="34.2%"
            desc="최근 30일 집행 성공 권고율"
            icon={<TrendingUp size={20} className="text-green-600" />}
          />
          <StatCard
            title="집행 가성비 (S)"
            value="B+ Grade"
            desc="비용(C) 대비 기대 실익 지수"
            icon={<Compass size={20} className="text-orange-600" />}
          />
        </div>

        {/* 분석 리스트 영역 */}
        <Box
          padding="none"
          className="rounded-lg overflow-hidden border-slate-200"
        >
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
            <Flex gap={2}>
              <Search size={18} className="text-slate-400" />
              <span className="font-bold text-slate-800">최근 분석 리포트</span>
            </Flex>
            <Button variant="ghost" size="sm" className="text-xs">
              전체보기
            </Button>
          </div>

          <Table className="border-none rounded-none">
            <THead>
              <TR>
                <TH>대상자/사건번호</TH>
                <TH>자산가치(V)</TH>
                <TH>회수가능성(P)</TH>
                <TH>실익 스코어</TH>
                <TH className="text-right">액션</TH>
              </TR>
            </THead>
            <TBody>
              <TR className="group">
                <TD>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      김철수 (개인채무자)
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      2024-타채-10293
                    </span>
                  </div>
                </TD>
                <TD className="text-slate-700 font-semibold">1,250만원</TD>
                <TD>
                  <Badge variant="blue">78% (상)</Badge>
                </TD>
                <TD className="w-48">
                  <Progress value={82} color="blue" />
                </TD>
                <TD className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2 text-[11px]"
                  >
                    리포트 보기
                  </Button>
                </TD>
              </TR>
            </TBody>
          </Table>
        </Box>

        {/* MVP 안내 배너 */}
        <Box className="bg-slate-900 border-none p-5 rounded-lg shadow-md">
          <Flex gap={4} align="center">
            <div className="bg-white/10 p-3 rounded">
              <ShieldAlert className="text-blue-400" size={24} />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-sm">
                실제 데이터 연동 준비 중
              </h4>
              <p className="text-slate-400 text-xs mt-1">
                현재는 가상 시나리오 엔진 PoC 단계입니다.
              </p>
            </div>
          </Flex>
        </Box>
      </main>
    </div>
  );
}

// 2. StatCard 내부 컴포넌트 타입 적용
function StatCard({ title, value, desc, icon }: StatCardProps) {
  return (
    <Box className="rounded-lg p-5 border-slate-200">
      <Flex direction="col" align="start" gap={3}>
        <div className="p-2 bg-slate-50 rounded-none border border-slate-100">
          {icon}
        </div>
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {value}
            </span>
            <ArrowUpRight size={14} className="text-slate-300" />
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-medium">{desc}</p>
        </div>
      </Flex>
    </Box>
  );
}
