"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Flex from "@/components/ui/Flex";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";

import styles from "../MemberCommon.module.scss";

export default function ResetPasswordForm() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("비밀번호가 서로 일치하지 않습니다.");
      return;
    }

    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setError("비밀번호 변경에 실패했습니다: " + error.message);
      return;
    }

    alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
    router.push("/member/login");
  };

  return (
    <form onSubmit={handleReset} className={styles.resetPasswordForm}>
      <Title level={2}>비밀번호 재설정</Title>

      <Text size="sm">새로 사용할 비밀번호를 입력해주세요.</Text>

      <Flex direction="column" gap={12}>
        <Input
          type="password"
          placeholder="새 비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="새 비밀번호 확인"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        {error && (
          <Text color="error" size="sm">
            {error}
          </Text>
        )}

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "변경 중..." : "비밀번호 변경"}
        </Button>
      </Flex>
    </form>
  );
}
