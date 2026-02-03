"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Flex from "@/components/ui/Flex";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Title from "@/components/ui/Title";

import PrivacyPage from "@/app/member/terms/PrivacyPage";
import TermsPage from "@/app/member/terms/TermsPage";

import { useToast } from "@/components/ui/ToastProvider";

import styles from "../MemberCommon.module.scss";

export default function SignUpForm() {
  const router = useRouter();
  const { addToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<"terms" | "privacy">(
    "terms",
  );

  const handleConfirmModal = () => {
    if (modalContent === "terms") setAgreeTerms(true);
    if (modalContent === "privacy") setAgreePrivacy(true);
    setOpenModal(false);
  };

  const openTermsModal = (type: "terms" | "privacy") => {
    setModalContent(type);
    setOpenModal(true);
  };

  const isValidEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.(com|net|kr|co\.kr|ac\.kr|go\.kr|or\.kr)$/i.test(
      val,
    );
  };

  // 타입 안정성을 위해 핸들러 공통 타입 적용
  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
    };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      addToast("유효한 이메일을 입력해주세요.", "error");
      return;
    }

    if (password !== confirmPassword) {
      addToast("비밀번호가 일치하지 않습니다.", "error");
      return;
    }

    if (!agreeTerms || !agreePrivacy) {
      addToast("약관과 개인정보 수집 동의가 필요합니다.", "error");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) {
      addToast("회원가입 실패: " + error.message, "error");
      return;
    }

    addToast("회원가입 완료! 이메일 인증 후 로그인해주세요.", "success");
    router.push(`/member/login?email=${encodeURIComponent(email)}`);
  };

  return (
    <>
      <form onSubmit={handleSignUp} autoComplete="off">
        <Flex direction="column" gap={16} className={styles.SignUpForm}>
          <Input
            type="email"
            autoComplete="new-password"
            placeholder="이메일"
            value={email}
            onChange={handleInputChange(setEmail)}
            required
          />

          <div className={styles.passwordField}>
            <Input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="비밀번호"
              value={password}
              onChange={handleInputChange(setPassword)}
              required
            />
            <span
              onClick={() => setShowPassword((p) => !p)}
              className={styles.eyeIcon}
            >
              <Icon icon={showPassword ? "eye-slash" : "eye"} />
            </span>
          </div>

          <div className={styles.passwordField}>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={handleInputChange(setConfirmPassword)}
              required
            />
            <span
              onClick={() => setShowConfirmPassword((p) => !p)}
              className={styles.eyeIcon}
            >
              <Icon icon={showConfirmPassword ? "eye-slash" : "eye"} />
            </span>
          </div>

          <Flex
            direction="column"
            align="flex-end"
            className={styles.checkboxBox}
            gap={4}
          >
            <div
              onClick={() => openTermsModal("terms")}
              className={styles.clickableLabel}
            >
              <Checkbox
                label="서비스 약관에 동의합니다."
                checked={agreeTerms}
                onChange={() => {}}
                readOnly
              />
            </div>

            <div
              onClick={() => openTermsModal("privacy")}
              className={styles.clickableLabel}
            >
              <Checkbox
                label="개인정보 수집 및 이용에 동의합니다."
                checked={agreePrivacy}
                onChange={() => {}}
                readOnly
              />
            </div>
          </Flex>

          <Button
            type="submit"
            styleType="primary"
            size="lg"
            className={styles.SignUpBtn}
            disabled={loading}
          >
            {loading ? "가입 중..." : "가입하기"}
          </Button>
        </Flex>
      </form>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        header={<Title level={4}>약관 안내</Title>}
        footer={
          <Button fullWidth onClick={handleConfirmModal}>
            확인 및 동의하기
          </Button>
        }
      >
        <div className={styles.modalScrollContent}>
          {modalContent === "terms" && <TermsPage />}
          {modalContent === "privacy" && <PrivacyPage />}
        </div>
      </Modal>
    </>
  );
}
