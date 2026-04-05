"use client";

import { supabase } from "@/lib/supabaseClient";
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Coins,
  Gavel,
  Save,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { PageTitle, SectionTitle } from "@/components/common/Heading";
import { Badge, Box, Button, Flex } from "@/components/common/LayoutElements";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CaseDetail {
  id: string;
  case_number: string;
  amount_bucket: string;
  region_code: string;
  result_status: string;
  debtor_type: string;
  debtor_age_range: string;
  period_range: string;
  created_at: string;
  closure_reason?: string;
  closure_steps?: string[];
  alert_interval?: string;
  recovered_amount?: string;
}

export default function CaseDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [caseData, setCaseData] = useState<CaseDetail | null>(null);
  const [status, setStatus] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  // 피드백 데이터 상태
  const [closureReason, setClosureReason] = useState("");
  const [selectedSteps, setSelectedSteps] = useState<string[]>([]);
  const [alertInterval, setAlertInterval] = useState("");
  const [recoveredAmount, setRecoveredAmount] = useState("");

  // 상태별 프리셋 데이터
  const actionPresets = {
    START: ["내용증명 발송", "채무자 소재 파악", "증거 검토", "수임 계약"],
    ONGOING: [
      "재산명시 신청",
      "은행 예금 압류",
      "부동산 가압류",
      "급여 압류",
      "채무자 협상",
    ],
    PARTIAL: [
      "압류 후 일부변제",
      "분할 납부 합의",
      "제3자 변제",
      "채권 일부양도",
    ],
    COMPLETED: ["전액 입금 완료", "압류 해제", "사건 종결", "성공보수 정산"],
    FAILED_RETRY: [
      "재산 없음",
      "거소 불명",
      "파산/회생",
      "실익 부족",
      "시효 도과",
    ],
  };

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      const { data, error } = await supabase
        .from("analysis_reports")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        router.push("/my-reports");
        return;
      }
      setCaseData(data);
      setStatus(data.result_status);
      setClosureReason(data.closure_reason || "");
      setSelectedSteps(data.closure_steps || []);
      setAlertInterval(data.alert_interval || "");
      setRecoveredAmount(data.recovered_amount || "");
    };
    fetchDetail();
  }, [id, router]);

  const handleSaveStatus = async () => {
    if (!id) return;
    setIsSaving(true);

    const { error } = await supabase
      .from("analysis_reports")
      .update({
        result_status: status,
        closure_reason: closureReason,
        closure_steps: selectedSteps,
        alert_interval: status === "FAILED_RETRY" ? alertInterval : null,
        recovered_amount: status === "PARTIAL" ? recoveredAmount : null,
        updated_at: new Date().toISOString(),
        finalized_at: status === "COMPLETED" ? new Date().toISOString() : null,
      })
      .eq("id", id);

    if (error) {
      alert("저장 실패: " + error.message);
      setIsSaving(false);
    } else {
      alert("성공적으로 업데이트되었습니다.");
      router.push("/my-reports");
    }
  };

  if (!caseData)
    return (
      <div className="p-20 text-center text-slate-400">
        데이터를 불러오는 중...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      <Flex justify="between" align="center">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> 목록으로
        </Button>
        <Badge variant="slate">ID: {id.slice(0, 8)}</Badge>
      </Flex>

      <Box className="bg-white border-b-4 border-brand-blue-600 shadow-sm p-4">
        <div className="space-y-2">
          <p className="text-sm font-bold text-brand-blue-600 flex items-center">
            <Gavel className="w-4 h-4 mr-1" /> {caseData.region_code} 분석 결과
          </p>
          <PageTitle>{caseData.case_number || "사건번호 미등록"}</PageTitle>
          <p className="text-slate-500 font-medium">
            청구 금액: {caseData.amount_bucket}
          </p>
        </div>
      </Box>

      <SectionTitle>사건 상태 업데이트</SectionTitle>
      <Box className="bg-slate-50 border-2 border-dashed">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            {
              id: "READY",
              label: "진행 준비",
              sub: "대기",
              color: "border-slate-300",
            },
            {
              id: "START",
              label: "진행 중",
              sub: "시작 단계",
              color: "border-orange-300",
            },
            {
              id: "ONGOING",
              label: "진행 중",
              sub: "추진 단계",
              color: "border-blue-300",
            },
            {
              id: "PARTIAL",
              label: "진행 중",
              sub: "일부 회수",
              color: "border-indigo-400",
            },
            {
              id: "FAILED_RETRY",
              label: "회수 실패",
              sub: "재도전",
              color: "border-red-400",
            },
            {
              id: "COMPLETED",
              label: "전액 회수",
              sub: "종결",
              color: "border-green-500",
            },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setStatus(item.id);
                setSelectedSteps([]); // 상태 변경 시 선택 초기화
              }}
              className={cn(
                "p-4 rounded-xl border-2 transition-all flex flex-col items-center bg-white",
                status === item.id
                  ? `${item.color} ring-4 ring-offset-2 ring-slate-100 shadow-lg scale-[1.02] text-slate-900`
                  : "border-transparent text-slate-400 opacity-60 hover:opacity-100",
              )}
            >
              <span className="text-[10px] font-black uppercase mb-1">
                {item.sub}
              </span>
              <span className="text-sm font-bold">{item.label}</span>
              {status === item.id && (
                <CheckCircle2 className="w-4 h-4 mt-2 text-current" />
              )}
            </button>
          ))}
        </div>

        {/* --- 동적 피드백 섹션 --- */}

        {/* 1. 진행 중 (START, ONGOING, PARTIAL) 공통 및 특화 UI */}
        {(status === "START" ||
          status === "ONGOING" ||
          status === "PARTIAL") && (
          <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 space-y-5 animate-in fade-in slide-in-from-top-2">
            {status === "PARTIAL" && (
              <div className="pb-4 border-b border-blue-200 space-y-3">
                <p className="text-sm font-bold text-blue-800 flex items-center">
                  <Coins className="w-4 h-4 mr-2" /> 현재까지 회수된 금액/비율
                </p>
                <input
                  type="text"
                  placeholder="예: 500만원 또는 약 30%"
                  className="w-full p-4 text-sm rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  value={recoveredAmount}
                  onChange={(e) => setRecoveredAmount(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-3">
              <p className="text-sm font-bold text-blue-800 flex items-center">
                <Activity className="w-4 h-4 mr-2" /> 현재 진행 단계 선택
              </p>
              <div className="flex flex-wrap gap-2">
                {actionPresets[status as keyof typeof actionPresets]?.map(
                  (step) => (
                    <button
                      key={step}
                      onClick={() =>
                        setSelectedSteps((prev) =>
                          prev.includes(step)
                            ? prev.filter((s) => s !== step)
                            : [...prev, step],
                        )
                      }
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-bold border transition-all",
                        selectedSteps.includes(step)
                          ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                          : "bg-white border-blue-200 text-blue-400 hover:border-blue-300",
                      )}
                    >
                      {step}
                    </button>
                  ),
                )}
              </div>
            </div>

            <textarea
              placeholder="상세 진행 상황이나 메모를 남겨주세요."
              className="w-full p-4 text-sm rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-400 min-h-[100px] bg-white"
              value={closureReason}
              onChange={(e) => setClosureReason(e.target.value)}
            />
          </div>
        )}

        {/* 2. 회수 실패 시 */}
        {status === "FAILED_RETRY" && (
          <div className="mt-8 p-6 bg-red-50 rounded-2xl border border-red-100 space-y-5 animate-in fade-in slide-in-from-top-2">
            <p className="text-sm font-bold text-red-800 flex items-center">
              <Clock className="w-4 h-4 mr-2" /> 재도전 알림 주기
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["6m", "12m", "18m", "24m"].map((v) => (
                <button
                  key={v}
                  onClick={() => setAlertInterval(v)}
                  className={cn(
                    "py-2 px-3 rounded-lg text-xs font-bold border-2 transition-all",
                    alertInterval === v
                      ? "bg-red-600 border-red-600 text-white shadow-md"
                      : "bg-white text-red-400 border-red-100",
                  )}
                >
                  {v === "6m"
                    ? "6개월"
                    : v === "12m"
                      ? "12개월"
                      : v === "18m"
                        ? "18개월"
                        : "24개월"}{" "}
                  후
                </button>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-sm font-bold text-red-800">주요 실패 사유</p>
              <div className="flex flex-wrap gap-2">
                {actionPresets.FAILED_RETRY.map((r) => (
                  <button
                    key={r}
                    onClick={() => setClosureReason(r)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-bold border transition-all",
                      closureReason === r
                        ? "bg-red-600 border-red-600 text-white"
                        : "bg-white border-red-200 text-red-400",
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. 전액 회수 시 */}
        {status === "COMPLETED" && (
          <div className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-100 space-y-4 animate-in fade-in slide-in-from-top-2">
            <p className="text-sm font-bold text-green-800 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2" /> 성공 요인 선택
            </p>
            <div className="flex flex-wrap gap-2">
              {actionPresets.COMPLETED.map((step) => (
                <button
                  key={step}
                  onClick={() =>
                    setSelectedSteps((prev) =>
                      prev.includes(step)
                        ? prev.filter((s) => s !== step)
                        : [...prev, step],
                    )
                  }
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-bold border-2 transition-all",
                    selectedSteps.includes(step)
                      ? "bg-green-600 border-green-600 text-white"
                      : "bg-white text-green-700 border-green-100",
                  )}
                >
                  {step}
                </button>
              ))}
            </div>
            <textarea
              placeholder="최종 해결 노하우를 적어주세요."
              className="w-full p-4 text-sm rounded-xl border-none outline-none focus:ring-2 focus:ring-green-400 min-h-[100px] bg-white"
              value={closureReason}
              onChange={(e) => setClosureReason(e.target.value)}
            />
          </div>
        )}

        <div className="mt-8 flex justify-center sm:justify-end">
          <Button
            variant="primary"
            className="w-full sm:w-auto px-12 py-6 text-lg shadow-xl"
            onClick={handleSaveStatus}
            disabled={isSaving}
          >
            <Save className="w-5 h-5 mr-2" />{" "}
            {isSaving ? "저장 중..." : "업데이트 완료"}
          </Button>
        </div>
      </Box>

      {/* 정보 테이블 (기존 동일) */}
      <Box
        padding="none"
        className="overflow-hidden border border-slate-200 rounded-2xl shadow-sm bg-white"
      >
        <table className="w-full text-left border-collapse">
          <tbody className="divide-y divide-slate-100">
            <DetailRow label="채무자 유형" value={caseData.debtor_type} />
            <DetailRow label="연령대" value={caseData.debtor_age_range} />
            <DetailRow label="경과 기간" value={caseData.period_range} />
          </tbody>
        </table>
      </Box>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td className="py-5 px-6 text-xs font-black text-slate-400 bg-slate-50/50 w-1/3 uppercase tracking-wider">
        {label}
      </td>
      <td className="py-5 px-6 text-sm font-bold text-slate-900">
        {value || "미지정"}
      </td>
    </tr>
  );
}
