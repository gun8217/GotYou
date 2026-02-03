"use client";

import { supabase } from "@/lib/supabase/client";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Flex from "@/components/ui/Flex";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";

import styles from "../MemberCommon.module.scss";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const handleSendResetMail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/member/reset-password`,
    });

    setLoading(false);

    if (error) {
      setError("비밀번호 재설정 메일을 보내지 못했습니다.");
      return;
    }

    setInfo("입력하신 이메일로 비밀번호 재설정 안내 메일을 보냈습니다.");
  };

  return (
    <form onSubmit={handleSendResetMail} className={styles.forgotPasswordForm}>
      <Title level={2}>비밀번호 찾기</Title>

      <Flex direction="column" gap={12}>
        <Input
          type="email"
          placeholder="회원가입 시 사용한 이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && (
          <Text color="error" size="sm">
            {error}
          </Text>
        )}

        {info && <Text size="sm">{info}</Text>}

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "전송 중..." : "비밀번호 재설정 메일 보내기"}
        </Button>
      </Flex>
    </form>
  );
}
