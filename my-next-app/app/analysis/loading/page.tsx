"use client";

import {
  ArrowRight,
  Car,
  CheckCircle2,
  Circle,
  Home,
  Loader2,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AnalysisLoadingPage() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);

  // 1단계: 집행 시도 선택
  const [selectedExecutions, setSelectedExecutions] = useState<string[]>([]);
  // 2단계: 채무자 상태
  const [debtorStatus, setDebtorStatus] = useState("");
  // 3단계: 채무자 경제활동
  const [debtorJob, setDebtorJob] = useState("");

  // 가짜 진행바 로직
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 95 ? prev + 1 : prev));
    }, 200);
    return () => clearInterval(timer);
  }, []);

  const executionOptions = [
    { id: "bank", label: "통장 압류", icon: <Wallet className="w-4 h-4" /> },
    {
      id: "salary",
      label: "급여 압류",
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
    { id: "car", label: "차량 압류", icon: <Car className="w-4 h-4" /> },
    { id: "house", label: "부동산 경매", icon: <Home className="w-4 h-4" /> },
    { id: "none", label: "아직 안 함", icon: <Circle className="w-4 h-4" /> },
  ];

  const handleToggleExecution = (id: string) => {
    if (id === "none") {
      setSelectedExecutions(["none"]);
      return;
    }
    const filtered = selectedExecutions.filter((item) => item !== "none");
    if (filtered.includes(id)) {
      setSelectedExecutions(filtered.filter((item) => item !== id));
    } else {
      setSelectedExecutions([...filtered, id]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 상단 프로그레스 바 */}
      <div className="fixed top-16 left-0 w-full h-1.5 bg-slate-200 z-30">
        <div
          className="h-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="container mx-auto px-4 pt-12 max-w-lg">
        {/* 분석 중 메시지 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white mb-4 shadow-lg shadow-blue-200 animate-pulse">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            판결문을 분석하고 있습니다
          </h1>
          <p className="text-slate-500 leading-relaxed">
            데이터를 정교화하는 동안
            <br />몇 가지만 더 확인해 주시겠어요?
          </p>
        </div>

        {/* 질문 카드 영역 */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div>
                <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">
                  Step 1
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  어떤 집행을 시도하셨나요?
                </h2>
                <p className="text-sm text-slate-400 mt-1">(복수 선택 가능)</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {executionOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleToggleExecution(opt.id)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                      selectedExecutions.includes(opt.id)
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-100 bg-white text-slate-600 hover:border-slate-200"
                    }`}
                  >
                    {opt.icon}
                    <span className="font-bold text-sm">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div>
                <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">
                  Step 2
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  현재 채무자의 상태는?
                </h2>
              </div>
              <div className="space-y-3">
                {["진행 중", "일부 회수", "전혀 회수 못함", "포기함"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => setDebtorStatus(status)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                        debtorStatus === status
                          ? "border-blue-600 bg-blue-50 text-blue-700 font-bold"
                          : "border-slate-100 bg-white text-slate-600 hover:border-slate-200 font-medium"
                      }`}
                    >
                      {status}
                      {debtorStatus === status && (
                        <CheckCircle2 className="w-5 h-5" />
                      )}
                    </button>
                  ),
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div>
                <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">
                  Step 3
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  채무자의 주요 경제활동은?
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "직장인",
                  "자영업자",
                  "법인대표",
                  "프리랜서",
                  "무직",
                  "모름",
                ].map((job) => (
                  <button
                    key={job}
                    onClick={() => setDebtorJob(job)}
                    className={`p-4 rounded-2xl border-2 transition-all text-sm font-bold ${
                      debtorJob === job
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-100 bg-white text-slate-600 hover:border-slate-200"
                    }`}
                  >
                    {job}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 다음 버튼 */}
          <button
            disabled={
              (step === 1 && selectedExecutions.length === 0) ||
              (step === 2 && !debtorStatus) ||
              (step === 3 && !debtorJob)
            }
            onClick={() =>
              step < 3 ? setStep(step + 1) : alert("분석 완료 페이지로 이동")
            }
            className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            {step === 3 ? "분석 결과 보기" : "다음 단계"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* 보안 안내 */}
        <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 text-xs font-medium">
          <ShieldCheck className="w-4 h-4" />
          입력하신 정보는 비식별화되어 안전하게 보호됩니다
        </div>
      </main>
    </div>
  );
}
