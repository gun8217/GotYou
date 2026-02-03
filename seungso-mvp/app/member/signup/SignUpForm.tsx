"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Flex from "@/components/ui/Flex";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";

import PrivacyPage from "@/app/member/terms/PrivacyPage";
import TermsPage from "@/app/member/terms/TermsPage";

import styles from "../MemberCommon.module.scss";

export default function SignUpForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
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

  // 모달을 여는 함수
  const openTermsModal = (type: "terms" | "privacy") => {
    setModalContent(type);
    setOpenModal(true);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!agreeTerms || !agreePrivacy) {
      setMessage("약관과 개인정보 수집 동의가 필요합니다.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage("회원가입 실패: " + error.message);
      setLoading(false);
      return;
    }

    alert("회원가입 완료!");
    router.push("/member/login");
  };

  return (
    <>
      <form onSubmit={handleSignUp} className={styles.signupForm}>
        <Title level={2}>회원가입</Title>

        <Flex direction="column">
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className={styles.passwordField}>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowConfirmPassword((p) => !p)}
              className={styles.eyeIcon}
            >
              <Icon icon={showConfirmPassword ? "eye-slash" : "eye"} />
            </span>
          </div>

          {/* 약관 영역: 라벨 클릭 시 모달 오픈 */}
          <Flex direction="column" className={styles.checkboxBox} gap={12}>
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

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "가입 중..." : "가입하기"}
          </Button>

          {message && (
            <Text color="error" size="sm">
              {message}
            </Text>
          )}
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
