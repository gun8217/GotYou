"use client";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Flex from "@/components/ui/Flex";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";
import { useToast } from "@/components/ui/ToastProvider";
import styles from "../MemberCommon.module.scss";

export default function WithdrawForm() {
  const router = useRouter();
  const { addToast } = useToast();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleWithdraw = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // 비밀번호 재확인
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email!,
      password,
    });

    if (signInError) {
      addToast("비밀번호가 올바르지 않습니다.", "error");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/member/withdraw", {
      method: "POST",
      body: JSON.stringify({ userId: user.id }),
    });

    if (!res.ok) {
      addToast("탈퇴 처리 실패", "error");
      setLoading(false);
      return;
    }

    await supabase.auth.signOut();
    addToast("회원탈퇴가 완료되었습니다.", "success");
    router.replace("/");
  };

  return (
    <>
      <Flex direction="column" gap={16} className={styles.SignUpForm}>
        <Icon icon="triangle-exclamation" className={styles.ico} />

        <Text color="error" weight="bold">
          탈퇴 시 계정은 즉시 비활성화되며 법령에 따라 5년간 보관 후 삭제됩니다.
        </Text>

        <Input
          type="password"
          placeholder="비밀번호 확인"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          styleType="error"
          size="lg"
          onClick={() => setOpenConfirm(true)}
          disabled={loading}
        >
          회원탈퇴
        </Button>
      </Flex>

      {/* 최종 확인 모달 */}
      <Modal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        header={<Title level={4}>회원탈퇴 확인</Title>}
        footer={
          <Button styleType="error" onClick={handleWithdraw}>
            탈퇴 진행
          </Button>
        }
      >
        <Text>
          정말 탈퇴하시겠습니까?
          <br />
          탈퇴 후에는 다시 로그인할 수 없습니다.
        </Text>
      </Modal>
    </>
  );
}
