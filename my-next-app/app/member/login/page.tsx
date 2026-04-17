"use client";

import Link from "next/link";
import { useState } from "react";
import { login } from "./actions";

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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const result = await login(formData);

    // 실패 처리
    if (!result.success) {
      setErrorMessage(result.error);
      setLoading(false);
      return;
    }

    // 성공 처리
    if (rememberMe) {
      localStorage.setItem("savedEmail", email);
    } else {
      localStorage.removeItem("savedEmail");
    }

    setLoading(false);

    // 로그인 후 이동
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-[32px] bg-white p-8 shadow-sm border border-slate-100">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-black text-slate-900">로그인</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            GotYou Service Access
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <Input
              label="이메일"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="비밀번호"
              name="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Checkbox
              label="아이디 기억하기"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          </div>

          {errorMessage && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl text-center font-bold">
              {errorMessage}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </Button>
        </form>

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
