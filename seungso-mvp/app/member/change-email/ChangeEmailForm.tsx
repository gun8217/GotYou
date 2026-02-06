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

import styles from "../MemberCommon.module.scss";

export default function ChangeEmailForm() {
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 현재 로그인한 유저 이메일 불러오기
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) return;

      setCurrentEmail(data.user.email || "");
    };

    fetchUser();
  }, []);

  const handleChangeEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newEmail) {
      setMessage("새 이메일을 입력해주세요.");
      return;
    }

    if (newEmail === currentEmail) {
      setMessage("현재 이메일과 동일합니다.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error) {
      setMessage("이메일 변경 실패: " + error.message);
      setLoading(false);
      return;
    }

    alert("새 이메일로 인증 메일을 보냈습니다. 메일을 확인해주세요.");
    setLoading(false);
    setNewEmail("");
  };

  return (
    <form onSubmit={handleChangeEmail} className={styles.changeEmailForm}>
      <Flex direction="column" align="center" className={styles.MemberWrap}>
        <Title level={1}>이메일 변경</Title>

        <Card className={styles.LoginCard}>
          <Icon icon="envelope-circle-check" className={styles.ico} />

          <Flex direction="column" gap={16}>
            <Flex direction="column" align="flex-start" gap={2}>
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
              type="email"
              placeholder="새 이메일"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
          </Flex>
        </Card>

        <Button
          type="submit"
          styleType="primary"
          size="lg"
          style={{ width: "420px" }}
          disabled={loading}
        >
          {loading ? "변경 중..." : "이메일 변경하기"}
        </Button>

        {message && (
          <Text color="error" size="sm">
            {message}
          </Text>
        )}
      </Flex>
    </form>
  );
}
