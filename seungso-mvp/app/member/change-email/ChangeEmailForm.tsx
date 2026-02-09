"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Flex from "@/components/ui/Flex";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";

import { useToast } from "@/components/ui/ToastProvider";

import styles from "../MemberCommon.module.scss";

export default function ChangeEmailForm() {
  const { addToast } = useToast();

  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) return;

      setCurrentEmail(data.user.email || "");
    };

    fetchUser();
  }, []);

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

  const handleChangeEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newEmail) {
      addToast("새 이메일을 입력해주세요.", "error");
      return;
    }

    if (!isValidEmail(newEmail)) {
      addToast("유효한 이메일 형식을 입력해주세요.", "error");
      return;
    }

    if (newEmail === currentEmail) {
      addToast("현재 이메일과 동일합니다.", "error");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    setLoading(false);

    if (error) {
      console.error("change email error:", error);

      if (error.message.toLowerCase().includes("rate limit")) {
        addToast("요청이 너무 많습니다. 잠시 후 다시 시도해주세요.", "error");
        return;
      }

      addToast("이메일 변경에 실패했습니다.", "error");
      return;
    }

    addToast(
      "새 이메일로 인증 메일을 보냈습니다. 메일을 확인해주세요.",
      "success",
    );
    setNewEmail("");
  };

  return (
    <form
      onSubmit={handleChangeEmail}
      className={styles.changeEmailForm}
      noValidate
    >
      <Flex direction="column" align="center" className={styles.MemberWrap}>
        <Title level={1}>이메일 변경</Title>

        <Flex direction="column" gap={40} className={styles.inner}>
          <Card variant="noHeader" className={styles.LoginCard}>
            <Icon icon="file-pen" className="ico md spaceMd" />

            <Flex direction="column" gap={16}>
              <Flex direction="column" align="flex-start" gap={4}>
                <Input
                  type="email"
                  value={currentEmail}
                  placeholder="현재 이메일"
                  disabled
                  onChange={() => {}}
                  style={{ width: "100%" }}
                />
                <Text size="xs" weight="bold" color="primary">
                  이메일 변경 시, 기존 이메일과 새 이메일로 확인 메일이
                  전송됩니다.
                </Text>
              </Flex>

              <Input
                type="text"
                inputMode="email"
                autoComplete="email"
                placeholder="새 이메일"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                disabled={loading}
              />
            </Flex>
          </Card>

          <Button
            type="submit"
            styleType="primary"
            size="lg"
            disabled={loading}
          >
            {loading ? "변경 중..." : "이메일 변경하기"}
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
