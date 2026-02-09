"use client";
import { useToast } from "@/components/ui/ToastProvider";
import { supabase } from "@/lib/supabase/client";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Flex from "@/components/ui/Flex";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";

import styles from "../MemberCommon.module.scss";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const [openRateLimitModal, setOpenRateLimitModal] = useState(false);
  const [openVerifyModal, setOpenVerifyModal] = useState(false);

  const { addToast } = useToast();

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

  const handleSendResetMail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) return addToast("이메일을 입력해주세요.", "error");
    if (!isValidEmail(email))
      return addToast("정확한 이메일 형식을 확인하세요.", "error");

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${location.origin}/member/reset-password`,
      });

      if (error) {
        console.error("reset password error:", error);
        const msg = error.message.toLowerCase();

        if (msg.includes("rate limit")) {
          setOpenRateLimitModal(true);
          return;
        }

        if (
          msg.includes("invalid") ||
          msg.includes("email") ||
          msg.includes("not found")
        ) {
          setOpenVerifyModal(true);
          return;
        }

        addToast("비밀번호 재설정 메일 전송에 실패했습니다.", "error");
        return;
      }

      addToast("입력한 이메일로 재설정 메일을 보냈습니다.", "success");
      setSent(true);
    } catch (err: unknown) {
      console.error("reset password exception:", err);

      const message = err instanceof Error ? err.message.toLowerCase() : "";

      if (message.includes("rate limit")) {
        setOpenRateLimitModal(true);
        return;
      }

      addToast("메일 전송 중 오류가 발생했습니다.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSendResetMail}
        className={styles.forgotPasswordForm}
        noValidate
      >
        <Flex direction="column" align="center" className={styles.MemberWrap}>
          <Title level={1}>재설정 메일 보내기</Title>

          <Flex direction="column" gap={40}>
            <Card className={`${styles.LoginCard} ${styles.inner}`}>
              <Icon
                icon={sent ? "envelope-circle-check" : "key"}
                className="ico md spaceMd"
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
          </Flex>

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

      {/* rate limit 모달 */}
      <Modal
        open={openRateLimitModal}
        onClose={() => setOpenRateLimitModal(false)}
        header={<Title level={4}>메일 전송 제한</Title>}
        footer={
          <Button onClick={() => setOpenRateLimitModal(false)}>확인</Button>
        }
      >
        <Flex direction="column" gap={16}>
          <Text size="sm">
            짧은 시간 동안 메일 전송 요청이 많아 제한되었습니다.
          </Text>
          <Text size="sm">약 10분 후 다시 시도해주세요.</Text>
        </Flex>
      </Modal>

      {/* 이메일 인증 안내 모달 */}
      <Modal
        open={openVerifyModal}
        onClose={() => setOpenVerifyModal(false)}
        header={<Title level={4}>안내</Title>}
        footer={<Button onClick={() => setOpenVerifyModal(false)}>확인</Button>}
      >
        <Flex direction="column" gap={12}>
          <Text size="sm">입력하신 이메일로 가입된 계정이 없거나,</Text>
          <Text size="sm">이메일 인증이 완료되지 않은 계정일 수 있습니다.</Text>
          <Text size="sm" color="secondary">
            회원가입 시 인증 메일을 확인한 후 다시 시도해주세요.
          </Text>
        </Flex>
      </Modal>
    </>
  );
}
