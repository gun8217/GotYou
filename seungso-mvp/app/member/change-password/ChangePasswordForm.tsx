"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Flex from "@/components/ui/Flex";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import Title from "@/components/ui/Title";

import { useToast } from "@/components/ui/ToastProvider";

import styles from "../MemberCommon.module.scss";

export default function ChangePasswordForm() {
  const router = useRouter();
  const { addToast } = useToast();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  // 눈 모양 토글 상태
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isValidPassword = (val: string) => {
    const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    return regex.test(val);
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentPassword)
      return addToast("현재 비밀번호를 입력해주세요.", "error");
    if (!newPassword) return addToast("새 비밀번호를 입력해주세요.", "error");
    if (!confirm) return addToast("새 비밀번호 확인을 입력해주세요.", "error");
    if (newPassword !== confirm)
      return addToast("새 비밀번호가 서로 일치하지 않습니다.", "error");
    if (!isValidPassword(newPassword))
      return addToast(
        "비밀번호는 특수문자를 포함해 6자 이상이어야 합니다.",
        "error",
      );

    setLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user?.email) {
        addToast(
          "사용자 정보를 불러올 수 없습니다. 다시 로그인해주세요.",
          "error",
        );
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (signInError) {
        addToast("현재 비밀번호가 올바르지 않습니다.", "error");
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        addToast("비밀번호 변경에 실패했습니다.", "error");
        return;
      }

      addToast("비밀번호가 변경되었습니다. 다시 로그인해주세요.", "success");
      await supabase.auth.signOut();
      router.push("/member/login");
    } catch (err: unknown) {
      console.error("change password error:", err);
      addToast("비밀번호 변경 중 오류가 발생했습니다.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleChangePassword} className={styles.resetPasswordForm}>
      <Flex direction="column" align="center" className={styles.MemberWrap}>
        <Title level={1}>비밀번호 변경</Title>

        <Flex
          direction="column"
          gap={40}
          className={`${styles.SignUpForm} ${styles.inner}`}
        >
          <Card variant="noHeader">
            <Icon icon="file-pen" className="ico md spaceMd" />

            <Flex direction="column" gap={16}>
              <Input
                type="password"
                placeholder="현재 비밀번호"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />

              {/* 새 비밀번호 */}
              <div className={styles.passwordField}>
                <Input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="새 비밀번호"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowNewPassword((p) => !p)}
                  className={styles.eyeIcon}
                >
                  <Icon icon={showNewPassword ? "eye-slash" : "eye"} />
                </span>
              </div>

              {/* 비밀번호 확인 */}
              <div className={styles.passwordField}>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="새 비밀번호 확인"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  className={styles.eyeIcon}
                >
                  <Icon icon={showConfirmPassword ? "eye-slash" : "eye"} />
                </span>
              </div>
            </Flex>
          </Card>

          <Button
            type="submit"
            styleType="primary"
            size="lg"
            disabled={loading}
          >
            {loading ? "변경 중..." : "비밀번호 변경"}
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
