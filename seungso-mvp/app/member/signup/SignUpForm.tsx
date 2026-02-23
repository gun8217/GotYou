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

import Text from "@/components/ui/Text";
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

  const [openRateLimitModal, setOpenRateLimitModal] = useState(false);

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

  const isValidPassword = (val: string) => {
    const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    return regex.test(val);
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
    };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      addToast("이메일을 입력해주세요.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      addToast("유효한 이메일을 입력해주세요.", "error");
      return;
    }

    if (!password) {
      addToast("비밀번호를 입력해주세요.", "error");
      return;
    }

    if (!isValidPassword(password)) {
      addToast("비밀번호 생성 규칙을 확인해 주세요.", "error");
      return;
    }

    if (!confirmPassword) {
      addToast("비밀번호 확인을 입력해주세요.", "error");
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

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      let message = error.message;
      if (message.includes("Password should be at least 6 characters")) {
        message = "비밀번호는 최소 6자 이상이어야 합니다.";
      }
      if (message.toLowerCase().includes("rate limit")) {
        setOpenRateLimitModal(true);
        return;
      }
      addToast("회원가입 실패: " + message, "error");
      return;
    }

    addToast("회원가입 완료! 이메일 인증 후 로그인해주세요.", "success");
    router.push(`/member/login?email=${encodeURIComponent(email)}`);
  };

  return (
    <>
      <form onSubmit={handleSignUp} autoComplete="off" noValidate>
        <Flex
          direction="column"
          gap={16}
          className={`${styles.SignUpForm} ${styles.inner}`}
        >
          <Icon icon="pen-to-square" className="ico md spaceMd" />

          <Flex direction="column" gap={4}>
            <Input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="이메일"
              value={email}
              onChange={handleInputChange(setEmail)}
            />
            <Flex gap={6}>
              <Text size="xs" weight="bold" color="secondary">
                ❗사용 가능 이메일
              </Text>
              <Text size="xs" color="info">
                네이버, 구글(Gmail), 다음, 카카오, 네이트, 아웃룩
              </Text>
            </Flex>
          </Flex>

          <Flex direction="column" align="flex-start" gap={4}>
            <div className={styles.passwordField}>
              <Input
                type={showPassword ? "text" : "password"}
                name="new-password"
                autoComplete="new-password"
                placeholder="비밀번호"
                value={password}
                onChange={handleInputChange(setPassword)}
              />
              <span
                onClick={() => setShowPassword((p) => !p)}
                className={styles.eyeIcon}
              >
                <Icon icon={showPassword ? "eye-slash" : "eye"} />
              </span>
            </div>
            <Text size="xs" weight="bold" color="secondary">
              ❗특수문자 혼용해 최소 6자 이상
            </Text>
          </Flex>

          <div className={styles.passwordField}>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={handleInputChange(setConfirmPassword)}
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

      {/* 약관 / 개인정보 모달 */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        header={<Title level={4}>안내</Title>}
        footer={
          <Button styleType="primary" onClick={handleConfirmModal}>
            확인 및 동의하기
          </Button>
        }
      >
        <div className={styles.modalScrollContent}>
          {modalContent === "terms" && <TermsPage showHeader={true} />}
          {modalContent === "privacy" && <PrivacyPage showHeader={true} />}
        </div>
      </Modal>

      {/* 가입 제한 안내 모달 */}
      <Modal
        open={openRateLimitModal}
        onClose={() => setOpenRateLimitModal(false)}
        header={<Title level={4}>가입 제한 안내</Title>}
        footer={
          <Button onClick={() => setOpenRateLimitModal(false)}>확인</Button>
        }
      >
        <Flex direction="column" gap={20}>
          <Icon icon="circle-question" className="ico" />
          <Flex direction="column" gap={8}>
            <Text size="sm" color="secondary">
              잠시 동안 가입 시도가 많아 제한되었습니다.
            </Text>
            <Text size="sm" color="secondary">
              잠시 후 다시 시도하거나 다른 이메일을 사용해주세요.
            </Text>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}
