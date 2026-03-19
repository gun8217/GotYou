"use client";

import { supabase } from "@/lib/supabaseClient";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// 같은 폴더 내 부품들
import AgreementItem from "./AgreementItem";
import SignupForm from "./SignupForm";

// 공통 부품 (경로 확인 필요)
import BaseModal from "@/components/common/BaseModal";

// 약관 컨텐츠 (이전 단계에서 분리한 내용)
import { PrivacyContent } from "../privacy/page";
import { TermsContent } from "../terms/page";

export default function SignUpPage() {
  // 1. 입력값 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  // 2. 약관 동의 상태
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);

  // 3. 모달 제어 상태
  const [modalType, setModalType] = useState<"terms" | "privacy" | null>(null);

  const agreedAll = agreedTerms && agreedPrivacy;

  // 약관 토글 로직
  const handleToggle = (type: "terms" | "privacy") => {
    const isAgreed = type === "terms" ? agreedTerms : agreedPrivacy;
    if (isAgreed) {
      type === "terms" ? setAgreedTerms(false) : setAgreedPrivacy(false);
    } else {
      setModalType(type);
    }
  };

  // 모달 동의 버튼 클릭 시
  const handleModalConfirm = () => {
    if (modalType === "terms") setAgreedTerms(true);
    if (modalType === "privacy") setAgreedPrivacy(true);
    setModalType(null);
  };

  // 회원가입 실행
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedAll) return;

    setLoading(true);
    setMessage("");
    setError(false);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    if (signUpError) {
      setError(true);
      setMessage(signUpError.message);
    } else {
      setMessage("인증 메일이 발송되었습니다! 메일함을 확인해주세요.");
    }
    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 font-sans">
      <div className="w-full max-w-md space-y-8 rounded-[32px] bg-white p-10 shadow-xl shadow-slate-200 border border-slate-100">
        {/* 상단 로고 및 제목 */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900">
            계정 만들기
          </h2>
        </div>

        {/* 1. 회원가입 입력 폼 부품 */}
        <SignupForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleSignUp}
          loading={loading}
          disabled={!agreedAll}
        />

        {/* 2. 약관 동의 섹션 */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2">
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all ${agreedAll ? "bg-blue-600 border-blue-600 shadow-sm" : "border-slate-300"}`}
            >
              {agreedAll && (
                <Check className="h-3 w-3 text-white stroke-[4px]" />
              )}
            </div>
            <span className="text-sm font-black text-slate-900">
              필수 약관에 모두 동의합니다.
            </span>
          </div>

          <div className="space-y-1">
            <AgreementItem
              label="이용약관 동의 (필수)"
              checked={agreedTerms}
              onToggle={() => handleToggle("terms")}
            />
            <AgreementItem
              label="개인정보 수집 및 이용 동의 (필수)"
              checked={agreedPrivacy}
              onToggle={() => handleToggle("privacy")}
            />
          </div>
        </div>

        {/* 결과 메시지 */}
        {message && (
          <div
            className={`p-4 rounded-2xl text-xs font-bold text-center animate-in fade-in ${error ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}
          >
            {message}
          </div>
        )}

        <div className="text-center text-xs font-bold">
          <span className="text-slate-400 uppercase tracking-widest font-medium">
            이미 계정이 있나요?{" "}
          </span>
          <Link
            href="/member/login"
            className="ml-2 text-blue-600 hover:underline"
          >
            로그인하기
          </Link>
        </div>
      </div>

      {/* 3. 공통 모달 부품 (약관용) */}
      {/* ✅ BaseModal을 사용하세요 */}
      <BaseModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        title={modalType === "terms" ? "서비스 이용약관" : "개인정보 처리방침"}
        footer={
          <>
            <button onClick={() => setModalType(null)} className="...">
              닫기
            </button>
            <button onClick={handleModalConfirm} className="...">
              확인 및 동의
            </button>
          </>
        }
      >
        {/* 이 영역이 children입니다 */}
        {modalType === "terms" ? <TermsContent /> : <PrivacyContent />}
      </BaseModal>
    </div>
  );
}

// 아이콘을 위해 추가 (없으면 에러날 수 있음)
function Check({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
