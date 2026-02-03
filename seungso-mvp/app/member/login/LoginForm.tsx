"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import Flex from "@/components/ui/Flex";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";
import { useToast } from "@/components/ui/ToastProvider";

import Card from "@/components/ui/Card";
import styles from "../MemberCommon.module.scss";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const reason = searchParams.get("reason");
  const emailParam = searchParams.get("email");

  const [email, setEmail] = useState(emailParam || "");
  const [password, setPassword] = useState("");

  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);

  // 보안 강화: URL에 노출된 이메일 파라미터를 초기화 후 즉시 제거
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
    setLoading(true);
    setShowResend(false);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setLoading(false);
        toast.addToast("이메일 또는 비밀번호가 올바르지 않습니다.", "error");
        return;
      }

      if (!data.user?.email_confirmed_at) {
        setLoading(false);
        toast.addToast("이메일 인증이 완료되지 않았습니다.", "info");
        setShowResend(true);
        return;
      }

      setLoading(false);
      toast.addToast("로그인 성공! 환영합니다.", "success");
      router.push("/cases");
    } catch {
      setLoading(false);
      toast.addToast("알 수 없는 오류가 발생했습니다.", "error");
    }
  };

  const handleResendVerification = () => {
    if (!email) {
      toast.addToast("이메일을 입력해야 안내를 확인할 수 있습니다.", "error");
      return;
    }
    toast.addToast("메일함을 확인해주세요.", "info");
  };

  return (
    <form onSubmit={handleLogin}>
      <Flex direction="column" className={styles.MemberWrap}>
        <Title level={1}>로그인</Title>

        <Card>
          <Flex direction="column" gap={8}>
            {reason === "idle" && (
              <Text size="sm" color="error">
                10분 동안 활동이 없어 보안을 위해 자동 로그아웃되었습니다.
              </Text>
            )}

            {emailParam && !reason && (
              <Text size="sm" color="info">
                확인된 계정 정보가 입력되었습니다. 비밀번호를 입력해 주세요.
              </Text>
            )}
          </Flex>

          <Flex direction="column" gap={16}>
            <Input
              type="email"
              autoComplete="new-password"
              placeholder="이메일"
              value={email}
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
              ) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              autoComplete="new-password"
              placeholder="비밀번호"
              value={password}
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
              ) => setPassword(e.target.value)}
              required
            />
          </Flex>

          <Flex>
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? "로그인 중..." : "로그인"}
            </Button>

            <Button
              type="button"
              styleType="secondary"
              onClick={() => router.push("/member/forgot-password")}
            >
              비밀번호를 잊으셨나요?
            </Button>

            {showResend && (
              <Button
                type="button"
                styleType="secondary"
                onClick={handleResendVerification}
              >
                인증 메일 안내
              </Button>
            )}
          </Flex>
        </Card>
      </Flex>
    </form>
  );
}
