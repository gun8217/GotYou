"use client";

import { useToast } from "@/components/ui/ToastProvider";
import { supabase } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Checkbox from "@/components/ui/Checkbox";
import Flex from "@/components/ui/Flex";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";
import Link from "next/link";

import styles from "../MemberCommon.module.scss";

const REMEMBER_EMAIL_KEY = "remembered_email";

const isValidEmail = (val: string) => {
  const email = val.trim();
  const allowedDomains = [
    "naver.com",
    "daum.net",
    "gmail.com",
    "hanmail.net",
    "nate.com",
    "hotmail.com",
    "outlook.com",
    "kakao.com",
  ];
  const match = email.match(/^[^\s@]+@([^\s@]+)$/);
  if (!match) return false;
  return allowedDomains.includes(match[1].toLowerCase());
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  const reason = searchParams.get("reason");
  const emailParam = searchParams.get("email");
  const redirect = searchParams.get("redirect");

  const initialEmail =
    typeof window === "undefined"
      ? ""
      : emailParam || localStorage.getItem(REMEMBER_EMAIL_KEY) || "";

  const [email, setEmail] = useState(initialEmail);
  const [rememberEmail, setRememberEmail] = useState(!!initialEmail);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);

  useEffect(() => {
    if (emailParam) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("email");
      const newPath = newParams.toString()
        ? `/member/login?${newParams.toString()}`
        : "/member/login";
      window.history.replaceState(null, "", newPath);
    }
    sessionStorage.removeItem("is_verifying");
  }, [emailParam, searchParams]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setShowResend(false);

    if (!email) return toast.addToast("이메일을 입력해주세요.", "error");
    if (!isValidEmail(email))
      return toast.addToast("정확한 이메일 형식을 확인하세요.", "error");
    if (!password) return toast.addToast("비밀번호를 입력해주세요.", "error");

    setLoading(true);
    sessionStorage.setItem("is_verifying", "true");

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({ email, password });

      if (loginError) {
        sessionStorage.removeItem("is_verifying");
        setLoading(false);
        if (loginError.message.toLowerCase().includes("email not confirmed")) {
          toast.addToast(
            "이메일 인증이 필요합니다. 메일함을 확인해주세요.",
            "error",
          );
          setShowResend(true);
        } else {
          toast.addToast("정확한 비밀번호를 확인해주세요.", "error");
        }
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("status, is_active")
        .eq("user_id", data.user.id)
        .maybeSingle();

      if (profileError) {
        await supabase.auth.signOut();
        sessionStorage.removeItem("is_verifying");
        setLoading(false);
        toast.addToast("사용자 정보를 불러오지 못했습니다.", "error");
        return;
      }

      if (
        !profile ||
        profile.status === "deleted" ||
        profile.is_active === false
      ) {
        await supabase.auth.signOut();
        sessionStorage.removeItem("is_verifying");
        setLoading(false);
        toast.addToast("이미 탈퇴 처리된 계정입니다.", "error");
        return;
      }

      if (rememberEmail) {
        localStorage.setItem(REMEMBER_EMAIL_KEY, email);
      } else {
        localStorage.removeItem(REMEMBER_EMAIL_KEY);
      }

      toast.addToast("로그인 성공! 환영합니다.", "success");

      sessionStorage.removeItem("is_verifying");
      router.push(redirect && redirect.startsWith("/") ? redirect : "/about");
    } catch {
      sessionStorage.removeItem("is_verifying");
      setLoading(false);
      toast.addToast("알 수 없는 오류가 발생했습니다.", "error");
    }
  };

  const handleResendVerification = async () => {
    if (!email) return toast.addToast("이메일을 입력해야 합니다.", "error");
    const { error } = await supabase.auth.resend({ type: "signup", email });
    if (error) {
      toast.addToast("인증 메일 재전송에 실패했습니다.", "error");
    } else {
      toast.addToast(
        "인증 메일을 다시 보냈습니다. 메일함을 확인해주세요.",
        "success",
      );
    }
  };

  return (
    <form onSubmit={handleLogin} noValidate>
      <Flex direction="column" align="center" className={styles.MemberWrap}>
        <Title level={1}>로그인</Title>
        <Flex direction="column" gap={40} className={styles.inner}>
          <Card variant="noHeader" className={styles.LoginCard}>
            <Icon icon="user-check" className="ico md spaceMd" />

            {reason === "idle" && (
              <Text size="sm" color="error" className={styles.topMsg}>
                10분 동안 활동이 없어 보안을 위해 자동 로그아웃되었습니다.
              </Text>
            )}
            {emailParam && !reason && (
              <Text size="sm" color="primary" className={styles.topMsg}>
                확인된 계정 정보가 입력되었습니다. 비밀번호를 입력해 주세요.
              </Text>
            )}

            <Flex direction="column" gap={16}>
              <Input
                type="email"
                name="username"
                autoComplete="username"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                name="current-password"
                autoComplete="current-password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Flex justify="space-between">
                <Checkbox
                  label="이메일 기억하기"
                  checked={rememberEmail}
                  onChange={(e) => setRememberEmail(e.target.checked)}
                />
                <Link href="/member/forgot-password">
                  비밀번호를 잊으셨나요?
                </Link>
              </Flex>
            </Flex>
          </Card>

          <Button
            type={showResend ? "button" : "submit"}
            styleType="primary"
            size="lg"
            style={{ width: "420px" }}
            disabled={loading}
            onClick={showResend ? handleResendVerification : undefined}
          >
            {showResend
              ? "인증 메일 재전송"
              : loading
                ? "로그인 중..."
                : "로그인"}
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
