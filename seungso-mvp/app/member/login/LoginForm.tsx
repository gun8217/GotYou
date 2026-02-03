"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Flex from "@/components/ui/Flex";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";

import styles from "../MemberCommon.module.scss";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    /* 정석 코드
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        alert("로그인 실패: " + error.message);
        return;
    }

    // 정석: 성공 시 data에 들어있는 유저 정보를 활용함
    console.log("환영합니다!", data.user.email); 
    // 이후 메인 화면으로 이동
    router.push("/cases");*/

    setLoading(false);

    if (error) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    router.push("/cases");
  };

  return (
    <form onSubmit={handleLogin} className={styles.loginForm}>
      <Title level={2}>로그인</Title>

      {reason === "idle" && (
        <Text size="sm">
          10분 동안 활동이 없어 보안을 위해 자동 로그아웃되었습니다.
        </Text>
      )}

      <Flex direction="column" gap={12}>
        <Input
          type="email"
          placeholder="이메일 (회원가입 시 사용한 이메일)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <Text color="error" size="sm">
            {error}
          </Text>
        )}

        {info && <Text size="sm">{info}</Text>}

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
      </Flex>
    </form>
  );
}
