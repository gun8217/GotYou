"use client";
import { useToast } from "@/components/ui/ToastProvider";
import { supabase } from "@/lib/supabase/client";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Flex from "@/components/ui/Flex";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";

import styles from "../MemberCommon.module.scss";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { addToast } = useToast();

  // 이메일 도메인 제한
  const isValidEmail = (val: string) => {
    return /^[^\s@]+@(naver\.com|daum\.net|gmail\.com|hanmail\.net|nate\.com|hotmail\.com|outlook\.com|kakao\.com)$/i.test(
      val,
    );
  };

  const handleSendResetMail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) return addToast("이메일을 입력해주세요.", "error");
    if (!isValidEmail(email))
      return addToast("사용할 수 없는 이메일 도메인입니다.", "error");

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/member/reset-password`,
    });
    setLoading(false);

    if (error) return addToast("이메일 형식이 올바르지 않습니다.", "error");

    addToast("입력한 이메일로 재설정 메일을 보냈습니다.", "success");
    setSent(true);
  };

  return (
    <form
      onSubmit={handleSendResetMail}
      className={styles.forgotPasswordForm}
      noValidate
    >
      <Flex direction="column" align="center" className={styles.MemberWrap}>
        <Title level={1}>비밀번호 찾기</Title>

        <Card className={styles.LoginCard}>
          <Icon
            icon={sent ? "envelope-circle-check" : "key"}
            className={styles.ico}
          />
          <Input
            type="email"
            placeholder="회원가입 시 사용한 이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </Card>

        <Button
          type="submit"
          styleType="primary"
          size="lg"
          style={{ width: "420px" }}
          disabled={loading}
        >
          {loading
            ? "전송 중..."
            : sent
              ? "재설정 메일 다시 보내기"
              : "재설정 메일 보내기"}
        </Button>

        <Flex
          direction="column"
          align="flex-start"
          gap={4}
          className={styles.forgotInfo}
        >
          <Text size="sm" color="secondary" weight="bold" as="b">
            메일이 도착하지 않았다면 다음을 확인해주세요.
          </Text>
          <Flex direction="column" align="flex-start" gap={2}>
            <Text size="xs" color="info">
              · 이메일 주소를 정확히 입력했는지 확인하세요.
            </Text>
            <Text size="xs" color="info">
              · 해당 이메일로 가입한 적이 없을 수 있습니다.
            </Text>
            <Text size="xs" color="info">
              · 스팸함(광고메일함)을 확인하세요.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
}
