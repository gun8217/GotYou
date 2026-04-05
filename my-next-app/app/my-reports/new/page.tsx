"use client";

import { supabase } from "@/lib/supabaseClient";
import { clsx, type ClassValue } from "clsx";
import {
  Baby,
  Calendar,
  ChevronRight,
  Hash,
  Loader2,
  MapPin,
  UserCircle2,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FormData {
  caseNumber: string;
  amount: string;
  location: string;
  period: string;
  status: string;
  age: string;
}

const OPTIONS = {
  amount: [
    "100만원 이하",
    "100~300만원",
    "300~500만원",
    "500~1,000만원",
    "1,000만원 이상",
  ],
  period: [
    "1년 이하",
    "1~2년",
    "2~3년",
    "3~4년",
    "4~5년",
    "5~7년",
    "7~8년",
    "8~9년",
    "9~10년",
    "10년 이상",
  ],
  status: [
    "개인",
    "개인사업자 (운영 중)",
    "개인사업자 (폐업)",
    "법인 (운영 중)",
    "법인 (폐업/휴업)",
    "모름",
  ],
  age: ["20대", "30대", "40대", "50대", "60대", "70대 이상", "모름"],
};

export default function NewCasePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    caseNumber: "",
    amount: "",
    location: "",
    period: "",
    status: "",
    age: "",
  });

  const isComplete = Object.values(formData).every((val) => val.trim() !== "");

  const handleSubmit = async () => {
    if (!isComplete || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        alert("로그인이 필요합니다.");
        router.push("/member/login");
        return;
      }

      // 'data' 변수가 사용되지 않아 구조 분해 할당에서 제외하고 error만 받습니다.
      const { error } = await supabase
        .from("analysis_reports")
        .insert([
          {
            user_id: session.user.id,
            case_number: formData.caseNumber,
            amount_bucket: formData.amount,
            region_code: formData.location,
            period_range: formData.period,
            debtor_type: formData.status,
            debtor_age_range: formData.age,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      router.push("/my-reports");
    } catch (error: unknown) {
      console.error("전체 에러 객체:", error);

      let detailedError = "알 수 없는 에러가 발생했습니다.";

      // any 대신 unknown 에러 타입을 안전하게 처리
      if (error instanceof Error) {
        detailedError = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        detailedError = String((error as { message: string }).message);
      }

      alert(`등록 실패 상세: ${detailedError}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-8 bg-white min-h-screen pb-32">
      <div className="text-center pt-4">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          새 사건 등록
        </h1>
      </div>

      <div className="space-y-8">
        {/* 사건번호 입력 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-800">
            <Hash className="w-5 h-5 text-brand-blue-700" /> 사건 번호
          </div>
          <input
            type="text"
            placeholder="예: 2023가소123456"
            className="w-full h-12 px-4 rounded border border-slate-200 outline-none focus:border-brand-blue-700 font-bold"
            value={formData.caseNumber}
            onChange={(e) =>
              setFormData({ ...formData, caseNumber: e.target.value })
            }
          />
        </section>

        {/* 나머지 선택형 섹션들 */}
        {Object.entries(OPTIONS).map(([key, opts]) => (
          <section key={key} className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-800">
              {key === "amount" && (
                <Wallet className="w-5 h-5 text-brand-blue-700" />
              )}
              {key === "period" && (
                <Calendar className="w-5 h-5 text-brand-blue-700" />
              )}
              {key === "status" && (
                <UserCircle2 className="w-5 h-5 text-brand-blue-700" />
              )}
              {key === "age" && (
                <Baby className="w-5 h-5 text-brand-blue-700" />
              )}
              {key === "amount"
                ? "채권 금액"
                : key === "period"
                  ? "경과 기간"
                  : key === "status"
                    ? "채무자 상태"
                    : "채무자 연령대"}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {opts.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFormData({ ...formData, [key]: opt })}
                  className={cn(
                    "h-12 px-2 text-sm font-bold rounded border transition-all",
                    formData[key as keyof FormData] === opt
                      ? "bg-brand-blue-50 border-brand-blue-700 text-brand-blue-700 shadow-sm ring-1 ring-brand-blue-700"
                      : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50",
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </section>
        ))}

        {/* 지역 입력 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-800">
            <MapPin className="w-5 h-5 text-brand-blue-700" /> 지역 (시/군/구)
          </div>
          <input
            type="text"
            placeholder="예: 경기 부천시 오정구"
            className="w-full h-12 px-4 rounded border border-slate-200 outline-none focus:border-brand-blue-700"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </section>
      </div>

      {/* 플로팅 버튼 */}
      <div className="p-4 bg-white/90 backdrop-blur-md border-t">
        <div className="max-w-3xl mx-auto">
          <button
            type="button"
            disabled={!isComplete || isSubmitting}
            onClick={handleSubmit}
            className={cn(
              "w-full h-14 text-lg font-black rounded shadow-lg flex items-center justify-center gap-2 transition-all",
              isComplete && !isSubmitting
                ? "bg-brand-blue-700 text-white"
                : "bg-slate-200 text-slate-400",
            )}
          >
            {isSubmitting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                등록하기 <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
