"use client";

import { supabase } from "@/lib/supabaseClient";
import { clsx, type ClassValue } from "clsx";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Download,
  ExternalLink,
  FileQuestion,
  Gavel,
  Plus,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Input } from "@/components/common/FormElements";
import { PageTitle, SectionTitle } from "@/components/common/Heading";
import {
  Badge,
  Box,
  Button,
  Flex,
  Table,
  TBody,
  TD,
  TH,
  THead,
  TR,
} from "@/components/common/LayoutElements";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MyCase {
  id: string;
  case_number: string;
  amount_bucket: string;
  region_code: string;
  result_status: string;
  created_at: string;
}

export default function MyReportsPage() {
  const router = useRouter();
  const [cases, setCases] = useState<MyCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          router.push("/login");
          return;
        }

        const { data, error } = await supabase
          .from("analysis_reports")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setCases(data || []);
      } catch (error) {
        console.error("Error fetching cases:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCases();
  }, [router]);

  // UI 텍스트 업데이트: % 삭제 및 진행 중 통일
  const getStatusUI = (status: string) => {
    switch (status) {
      case "READY":
        return {
          label: "진행 준비",
          variant: "slate" as const,
          sub: "대기 중",
        };
      case "START":
        return {
          label: "진행 중",
          variant: "orange" as const,
          sub: "시작 단계",
        };
      case "ONGOING":
        return {
          label: "진행 중",
          variant: "blue" as const,
          sub: "추진 단계",
        };
      case "PARTIAL":
        return {
          label: "진행 중",
          variant: "blue" as const, // "indigo" 대신 "blue" 사용
          sub: "일부 회수",
        };
      case "FAILED_RETRY":
        return {
          label: "회수 실패",
          variant: "red" as const,
          sub: "재도전 대기",
        };
      case "COMPLETED":
        return {
          label: "전액 회수",
          variant: "green" as const,
          sub: "사건 종결",
        };
      default:
        return {
          label: "분석 완료",
          variant: "slate" as const,
          sub: "상태 확인",
        };
    }
  };

  if (isLoading)
    return (
      <div className="p-20 text-center text-slate-400 font-bold animate-pulse">
        데이터를 불러오는 중...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* 헤더 섹션 */}
      <Flex justify="between" align="end" className="flex-wrap gap-4">
        <div className="space-y-1">
          <Badge variant="blue" className="mb-1">
            Legal Tracker
          </Badge>
          <PageTitle>나의 사건 관리</PageTitle>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            실시간 집행 상태를 기록하고 회수 데이터를 관리합니다.
          </p>
        </div>
        <Flex gap={2} className="w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Download className="w-4 h-4 mr-2" /> 엑셀 저장
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex-1 sm:flex-none shadow-lg shadow-brand-blue-100"
            onClick={() => router.push("/my-reports/new")}
          >
            <Plus className="w-4 h-4 mr-2" /> 새 사건 등록
          </Button>
        </Flex>
      </Flex>

      {/* 검색 바 */}
      <Box padding="sm" className="bg-slate-50/50 border-dashed border-2">
        <Flex gap={3} align="end" className="w-full flex-wrap sm:flex-nowrap">
          <Input
            label="사건 검색"
            placeholder="사건번호 입력..."
            containerClassName="flex-[3]"
            className="bg-white"
          />
          <Button variant="secondary" className="px-6">
            <Search className="w-4 h-4 mr-2" /> 조회
          </Button>
          <Button
            variant="outline"
            className="bg-white border-slate-200"
            onClick={() =>
              window.open(
                "https://www.scourt.go.kr/portal/information/events/search/search.jsp",
                "_blank",
              )
            }
          >
            <Gavel className="w-4 h-4 mr-2 text-slate-400" /> 나의 사건검색 확인
          </Button>
        </Flex>
      </Box>

      {/* 테이블 섹션 */}
      <div className="space-y-4">
        <SectionTitle className="flex items-center">
          <Activity className="w-4 h-4 mr-2 text-brand-blue-500" />
          전체 사건 리스트 ({cases.length})
        </SectionTitle>

        {cases.length === 0 ? (
          <Box className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-slate-50/30 rounded-3xl">
            <FileQuestion className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium mb-4">
              등록된 사건이 없습니다.
            </p>
            <Button
              variant="primary"
              onClick={() => router.push("/my-reports/new")}
            >
              첫 사건 등록하기
            </Button>
          </Box>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Table>
              <THead className="bg-slate-50/50">
                <TR>
                  <TH className="w-[180px]">사건번호</TH>
                  <TH>지역 / 금액</TH>
                  <TH className="w-[150px]">관리 상태</TH>
                  <TH className="w-[120px]">세부 단계</TH>
                  <TH className="w-[120px]">등록일</TH>
                  <TH className="w-[80px] text-center">관리</TH>
                </TR>
              </THead>
              <TBody>
                {cases.map((item) => {
                  const statusInfo = getStatusUI(item.result_status);
                  const isDone = item.result_status === "COMPLETED";
                  const isOngoing = ["START", "ONGOING", "PARTIAL"].includes(
                    item.result_status,
                  );

                  return (
                    <TR
                      key={item.id}
                      className={cn(
                        isDone
                          ? "bg-slate-50/30"
                          : "hover:bg-slate-50/80 transition-colors cursor-pointer",
                      )}
                      onClick={() =>
                        router.push(`/my-reports/result/${item.id}`)
                      }
                    >
                      <TD>
                        <span
                          className={cn(
                            "font-bold tracking-tight",
                            isDone ? "text-slate-400" : "text-slate-900",
                          )}
                        >
                          {item.case_number || "번호 미등록"}
                        </span>
                      </TD>
                      <TD>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700">
                            {item.region_code}
                          </span>
                          <span className="text-[10px] text-slate-400 font-black uppercase">
                            {item.amount_bucket}
                          </span>
                        </div>
                      </TD>
                      <TD>
                        <Badge
                          variant={statusInfo.variant}
                          className="px-3 py-1 font-bold shadow-sm"
                        >
                          {isDone && (
                            <CheckCircle2 className="w-3 h-3 mr-1 inline" />
                          )}
                          {item.result_status === "FAILED_RETRY" && (
                            <AlertCircle className="w-3 h-3 mr-1 inline" />
                          )}
                          {isOngoing && (
                            <Activity className="w-3 h-3 mr-1 inline animate-pulse" />
                          )}
                          {statusInfo.label}
                        </Badge>
                      </TD>
                      <TD>
                        <span
                          className={cn(
                            "text-xs font-black",
                            item.result_status === "FAILED_RETRY"
                              ? "text-red-500"
                              : isOngoing
                                ? "text-brand-blue-600"
                                : "text-slate-400",
                          )}
                        >
                          {statusInfo.sub}
                        </span>
                      </TD>
                      <TD className="text-[11px] text-slate-500 font-bold">
                        {new Date(item.created_at).toLocaleDateString()}
                      </TD>
                      <TD>
                        <Flex justify="center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 rounded-full text-brand-blue-600 hover:bg-brand-blue-50"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </Flex>
                      </TD>
                    </TR>
                  );
                })}
              </TBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
