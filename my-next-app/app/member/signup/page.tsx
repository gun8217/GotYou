"use client";

import { supabase } from "@/lib/supabaseClient";
import { Check } from "lucide-react";
import { useState } from "react";

import BaseModal from "@/components/common/BaseModal";
import { PageTitle } from "@/components/common/Heading";
import { Box, Button, Flex } from "@/components/common/LayoutElements";

import AgreementItem from "./AgreementItem";
import SignupForm from "./SignupForm";

import { DisclaimerContent } from "../disclaimer/page";
import { PrivacyContent } from "../privacy/page";
import { TermsContent } from "../terms/page";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [agreedDisclaimer, setAgreedDisclaimer] = useState(false);

  const [modalType, setModalType] = useState<
    "terms" | "privacy" | "disclaimer" | null
  >(null);

  const agreedAll = agreedTerms && agreedPrivacy && agreedDisclaimer;

  const handleModalConfirm = () => {
    if (modalType === "terms") setAgreedTerms(true);
    if (modalType === "privacy") setAgreedPrivacy(true);
    if (modalType === "disclaimer") setAgreedDisclaimer(true);
    setModalType(null);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedAll) return;

    try {
      setLoading(true);
      setMessage("");
      setError(false);

      // 1️⃣ 회원가입
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      const user = data.user;

      if (!user) {
        throw new Error("사용자 생성 실패");
      }

      // 2️⃣ 약관 동의 저장 (🔥 핵심)
      const { error: termsError } = await supabase.from("user_terms").insert([
        { user_id: user.id, terms_id: "tos_v1" },
        { user_id: user.id, terms_id: "privacy_v1" },
        { user_id: user.id, terms_id: "disclaimer_v1" },
      ]);

      if (termsError) {
        console.error("약관 저장 실패:", termsError);
        throw new Error("약관 저장 실패");
      }

      // 3️⃣ 성공 메시지
      setMessage("인증 메일이 발송되었습니다! 메일함을 확인해주세요.");
    } catch (err: unknown) {
      console.error(err);

      let errorMessage = "회원가입 중 오류가 발생했습니다.";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(true);
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <Box className="w-full max-w-md bg-white border border-slate-100 shadow-sm rounded-[32px] p-8">
        <div className="text-center mb-10 space-y-2">
          <PageTitle className="text-2xl">계정 만들기</PageTitle>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Join GotYou
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-8">
          <SignupForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />

          <div className="pt-4 border-t border-slate-100 space-y-4">
            {/* 전체 동의 */}
            <button
              type="button"
              onClick={() => {
                const next = !agreedAll;
                setAgreedTerms(next);
                setAgreedPrivacy(next);
                setAgreedDisclaimer(next);
              }}
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-50"
            >
              <div
                className={`w-5 h-5 flex items-center justify-center rounded-md border ${
                  agreedAll ? "bg-blue-600 border-blue-600" : "border-slate-300"
                }`}
              >
                {agreedAll && (
                  <Check className="h-3 w-3 text-white stroke-[3px]" />
                )}
              </div>

              <span className="text-sm font-black text-slate-900">
                필수 약관에 모두 동의합니다
              </span>
            </button>

            {/* 개별 약관 */}
            <div className="space-y-2">
              <AgreementItem
                label="이용약관 동의 (필수)"
                checked={agreedTerms}
                onCheck={setAgreedTerms}
                onView={() => setModalType("terms")}
              />

              <AgreementItem
                label="개인정보 수집 및 이용 동의 (필수)"
                checked={agreedPrivacy}
                onCheck={setAgreedPrivacy}
                onView={() => setModalType("privacy")}
              />

              <AgreementItem
                label="면책고지 동의 (필수)"
                checked={agreedDisclaimer}
                onCheck={setAgreedDisclaimer}
                onView={() => setModalType("disclaimer")}
              />
            </div>
          </div>

          {/* 메시지 */}
          {message && (
            <div
              className={`p-4 text-sm font-bold text-center rounded-xl ${
                error ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
              }`}
            >
              {message}
            </div>
          )}

          {/* 버튼 */}
          <Button
            type="submit"
            className="w-full"
            disabled={!agreedAll || loading}
          >
            {loading ? "가입 중..." : "회원가입"}
          </Button>
        </form>
      </Box>

      {/* 약관 모달 */}
      <BaseModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        title={
          modalType === "terms"
            ? "서비스 이용약관"
            : modalType === "privacy"
              ? "개인정보 처리방침"
              : modalType === "disclaimer"
                ? "면책고지"
                : ""
        }
        footer={
          <Flex gap={2} justify="end" className="w-full">
            <Button variant="ghost" onClick={() => setModalType(null)}>
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
          ) : modalType === "terms" ? (
            <TermsContent />
          ) : modalType === "disclaimer" ? (
            <DisclaimerContent />
          ) : null}
        </div>
      </BaseModal>
    </div>
  );
}
