"use client";

import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// ✅ 공통 컴포넌트 import
import { Checkbox, Input } from "@/components/common/FormElements";
import { Button } from "@/components/common/LayoutElements";

export default function Login() {
  const [email, setEmail] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("savedEmail") || "";
    }
    return "";
  });

  const [rememberMe, setRememberMe] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("savedEmail");
    }
    return false;
  });

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
      setLoading(false);
    } else {
      if (rememberMe) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-[32px] bg-white p-8 shadow-sm border border-slate-100">
        {/* 헤더 */}
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-black text-slate-900">로그인</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            GotYou Service Access
          </p>
        </div>

        {/* 폼 */}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <Input
              label="이메일"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="비밀번호"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Checkbox
              label="아이디 기억하기"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          </div>

          {/* 에러 */}
          {errorMessage && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl text-center font-bold">
              {errorMessage}
            </div>
          )}

          {/* 버튼 */}
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </Button>
        </form>

        {/* 하단 */}
        <div className="flex items-center justify-between text-sm">
          <div className="text-slate-400 font-medium">계정이 없으신가요?</div>
          <Link
            href="/member/signup"
            className="font-bold text-blue-600 hover:text-blue-700"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
