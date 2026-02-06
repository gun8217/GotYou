"use client";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Flex from "@/components/ui/Flex";
import Icon from "@/components/ui/Icon";
import Tabs from "@/components/ui/Tabs";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";

import styles from "../MemberCommon.module.scss";

import SignUpForm from "./SignUpForm";

export default function SignUpSteps() {
  const [step, setStep] = useState(0);

  const tabs = [
    {
      label: "가입 전 안내",
      content: (
        <>
          <Flex direction="column" gap={8} className={styles.SignUpInfo}>
            <Icon icon="triangle-exclamation" className={styles.ico} />

            <Text color="info">이메일 주소가 곧 아이디가 됩니다.</Text>
            <Text color="info">
              보안상 가입 이메일은 별도로 안내되지 않습니다.
            </Text>
            <Text color="primary" weight="bold" size="xl">
              반드시 기억하기 쉬운 이메일로 가입해 주세요.
            </Text>
            <Text color="info">
              회원님의 소중한 정보는 안전하게 보호됩니다.
            </Text>
          </Flex>

          <Button
            styleType="primary"
            size="lg"
            className={styles.SignUpBtn}
            onClick={() => setStep(1)}
          >
            확인 후 다음단계
            <Icon icon="chevron-right" />
          </Button>
        </>
      ),
    },
    {
      label: "정보 입력",
      content: <SignUpForm />,
    },
  ];

  return (
    <>
      <Title level={1}>회원가입</Title>
      <Tabs tabs={tabs} initialIndex={step} disableClick className="alignC" />
    </>
  );
}
