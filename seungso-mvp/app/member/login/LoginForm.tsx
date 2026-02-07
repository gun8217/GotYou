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

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const reason = searchParams.get("reason");
  const emailParam = searchParams.get("email");
  const redirect = searchParams.get("redirect"); // ✅ 추가

  const initialEmail =
    typeof window === "undefined"
      ? ""
      : emailParam || localStorage.getItem(REMEMBER_EMAIL_KEY) || "";

  const [email, setEmail] = useState(initialEmail);
  const [rememberEmail, setRememberEmail] = useState(!!initialEmail);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (emailParam) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("email");

      const newPath = newParams.toString()
        ? `/member/login?${newParams.toString()}`
        : "/member/login";

      window.history.replaceState(null, "", newPath);
    }
  }, [emailParam, searchParams]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setShowResend(false);

    if (!email) {
      toast.addToast("이메일을 입력해주세요.", "error");
      return;
    }

    if (!password) {
      toast.addToast("비밀번호를 입력해주세요.", "error");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setLoading(false);
        if (error.message.toLowerCase().includes("email not confirmed")) {
          toast.addToast(
            "이메일 인증이 필요합니다. 인증 메일을 확인해주세요.",
            "error",
          );
          setShowResend(true);
        } else {
          toast.addToast(
            "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.",
            "error",
          );
          setShowResend(false);
        }
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("is_active")
        .eq("user_id", data.user.id)
        .single();

      if (profileError) {
        setLoading(false);
        toast.addToast("사용자 정보를 불러오지 못했습니다.", "error");
        return;
      }

      if (profile.is_active === false) {
        await supabase.auth.signOut();
        setLoading(false);
        toast.addToast("이미 탈퇴 처리된 계정입니다.", "error");
        router.replace("/");
        return;
      }

      if (rememberEmail) {
        localStorage.setItem(REMEMBER_EMAIL_KEY, email);
      } else {
        localStorage.removeItem(REMEMBER_EMAIL_KEY);
      }

      setLoading(false);
      toast.addToast("로그인 성공! 환영합니다.", "success");

      // ✅ redirect 처리
      if (redirect && redirect.startsWith("/")) {
        router.push(redirect);
      } else {
        router.push("/about");
      }
    } catch {
      setLoading(false);
      toast.addToast("알 수 없는 오류가 발생했습니다.", "error");
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      toast.addToast("이메일을 입력해야 합니다.", "error");
      return;
    }

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });

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

        <Card className={styles.LoginCard}>
          <Icon icon="user-check" className={styles.ico} />

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
              <Link href="/member/forgot-password">비밀번호를 잊으셨나요?</Link>
            </Flex>
          </Flex>
        </Card>

        {!showResend ? (
          <Button
            type="submit"
            styleType="primary"
            size="lg"
            style={{ width: "420px" }}
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </Button>
        ) : (
          <Button
            type="button"
            styleType="primary"
            size="lg"
            style={{ width: "420px" }}
            onClick={handleResendVerification}
          >
            인증 메일 재전송
          </Button>
        )}
      </Flex>
    </form>
  );
}
