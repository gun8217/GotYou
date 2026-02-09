"use client";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
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

  // 모달 열기 전에 비밀번호 확인
  const handleOpenConfirm = async () => {
    if (!password) {
      addToast("비밀번호를 입력해주세요.", "error");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      addToast("로그인 정보가 없습니다.", "error");
      return;
    }

    // 비밀번호 확인
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email!,
      password,
    });

    if (signInError) {
      addToast("비밀번호가 올바르지 않습니다.", "error");
      setLoading(false);
      return;
    }

    setLoading(false);
    setOpenConfirm(true);
  };

  // 실제 탈퇴 처리
  const handleWithdraw = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      addToast("사용자 정보를 불러올 수 없습니다.", "error");
      return;
    }

    try {
      // 1️⃣ RPC 호출로 profiles 상태 업데이트
      const { error: rpcError } = await supabase.rpc("handle_user_withdraw", {
        user_uuid: user.id,
      });

      if (rpcError) {
        addToast(`탈퇴 처리 실패: ${rpcError.message}`, "error");
        setLoading(false);
        return;
      }

      // 2️⃣ 세션 종료
      await supabase.auth.signOut();

      // 3️⃣ 탈퇴 완료 안내
      addToast(
        "회원탈퇴가 완료되었습니다. 탈퇴된 계정은 재로그인할 수 없습니다.",
        "success",
      );
      router.replace("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        addToast(`탈퇴 처리 중 오류가 발생했습니다: ${err.message}`, "error");
      } else {
        addToast("탈퇴 처리 중 알 수 없는 오류가 발생했습니다.", "error");
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Flex direction="column" align="center" className={styles.MemberWrap}>
        <Title level={1}>회원 탈퇴</Title>

        <Flex direction="column" gap={40} className={styles.inner}>
          <Card variant="noHeader" className={styles.LoginCard}>
            <Icon icon="trash-arrow-up" className="ico md spaceMd" />

            <Text
              color="error"
              weight="bold"
              size="sm"
              className={styles.topMsg}
            >
              탈퇴 시 계정은 즉시 비활성화되며,
              <br />
              관련 데이터는 익명/가명 처리 후 5년간 보관됩니다.
            </Text>

            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Card>

          <Button
            styleType="error"
            size="lg"
            onClick={handleOpenConfirm}
            disabled={loading}
          >
            회원탈퇴
          </Button>
        </Flex>
      </Flex>

      {/* 최종 확인 모달 */}
      <Modal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        header={<Title level={4}>회원탈퇴 최종 확인</Title>}
        footer={
          <Button styleType="error" onClick={handleWithdraw} disabled={loading}>
            탈퇴 진행
          </Button>
        }
      >
        <Flex direction="column" align="flex-start" gap={8}>
          <Text size="sm" color="secondary">
            1. 탈퇴 후에는
            <span
              style={{ marginLeft: "6px", color: "#dc2626", fontWeight: 500 }}
            >
              계정 복구가 불가능
            </span>
            합니다.
          </Text>
          <Text size="sm" color="secondary">
            2. 동일 이메일로는
            <span
              style={{ marginLeft: "6px", color: "#dc2626", fontWeight: 500 }}
            >
              5년간 재가입이 불가능
            </span>
            합니다.
          </Text>
          <Text
            size="sm"
            color="secondary"
            align="center"
            style={{
              width: "100%",
              marginTop: "16px",
              padding: "16px 0",
              border: "#ddd 1px solid",
              borderRadius: "4px",
            }}
          >
            저장된 사건 데이터는
            <b
              style={{
                marginLeft: "6px",
                color: "#075985",
                fontWeight: 500,
              }}
            >
              익명/가명 처리
            </b>
            되어
            <br />
            <b style={{ color: "#075985", fontWeight: 500 }}>
              서비스 개선 및 학습 목적
            </b>
            으로만 보관됩니다.
          </Text>
        </Flex>
      </Modal>
    </>
  );
}
