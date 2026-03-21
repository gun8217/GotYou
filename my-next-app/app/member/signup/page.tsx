"use client";

import { supabase } from "@/lib/supabaseClient";
import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// 부품 컴포넌트
import BaseModal from "@/components/common/BaseModal";
import { Box, Button, Flex } from "@/components/common/LayoutElements";
import AgreementItem from "./AgreementItem";
import SignupForm from "./SignupForm";

// 약관 컨텐츠 (실제 경로에 맞춰 import 확인 필요)
import { PrivacyContent } from "../privacy/page";
// TermsContent가 없다면 임시로 PrivacyContent를 재사용하거나 빈 컴포넌트 생성

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [modalType, setModalType] = useState<"terms" | "privacy" | null>(null);

  const agreedAll = agreedTerms && agreedPrivacy;

  const handleModalConfirm = () => {
    if (modalType === "terms") setAgreedTerms(true);
    if (modalType === "privacy") setAgreedPrivacy(true);
    setModalType(null);
  };

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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <Box className="w-full max-w-md bg-white border-slate-200 shadow-xl rounded-none py-7 px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            계정 만들기
          </h2>
          <p className="text-xs text-slate-400 mt-2 font-medium uppercase tracking-widest">
            Join GotYouNom
          </p>
        </div>

        <SignupForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleSignUp}
          loading={loading}
          disabled={!agreedAll}
        />

        <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
          <button
            onClick={() => {
              setAgreedTerms(!agreedAll);
              setAgreedPrivacy(!agreedAll);
            }}
            className="flex items-center gap-3 p-2 w-full hover:bg-slate-50 transition-colors group"
          >
            <div
              className={`w-5 h-5 flex items-center justify-center border-2 transition-all ${agreedAll ? "bg-blue-600 border-blue-600" : "border-slate-300"}`}
            >
              {agreedAll && (
                <Check className="h-3 w-3 text-white stroke-[4px]" />
              )}
            </div>
            <span className="text-sm font-bold text-slate-900">
              필수 약관에 모두 동의합니다.
            </span>
          </button>

          <div className="space-y-1">
            <AgreementItem
              label="이용약관 동의 (필수)"
              checked={agreedTerms}
              onToggle={() => setModalType("terms")}
            />
            <AgreementItem
              label="개인정보 수집 및 이용 동의 (필수)"
              checked={agreedPrivacy}
              onToggle={() => setModalType("privacy")}
            />
          </div>
        </div>

        {message && (
          <div
            className={`mt-6 p-4 text-xs font-bold text-center border ${error ? "bg-red-50 text-red-600 border-red-100" : "bg-blue-50 text-blue-600 border-blue-100"}`}
          >
            {message}
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            이미 계정이 있나요?{" "}
            <Link
              href="/member/login"
              className="text-blue-600 ml-2 hover:underline"
            >
              로그인하기
            </Link>
          </p>
        </div>
      </Box>

      <BaseModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        title={modalType === "terms" ? "서비스 이용약관" : "개인정보 처리방침"}
        footer={
          <Flex gap={2} justify="end" className="w-full">
            <Button variant="outline" onClick={() => setModalType(null)}>
              닫기
            </Button>
            <Button variant="primary" onClick={handleModalConfirm}>
              확인 및 동의
            </Button>
          </Flex>
        }
      >
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          {modalType === "privacy" ? (
            <PrivacyContent />
          ) : (
            <p className="text-sm text-slate-500 p-4">
              이용약관 내용을 준비 중입니다...
            </p>
          )}
        </div>
      </BaseModal>
    </div>
  );
}
