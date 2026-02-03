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
            <Text className={styles.ico}>⚠</Text>
            <Text color="info">이메일 주소가 곧 아이디가 됩니다.</Text>
            <Text color="info">
              보안상 가입된 이메일을 별도로 안내해 드릴 수 없으니,
            </Text>
            <Text color="primary" weight="bold" size="lg">
              반드시 직접 확인 가능한 이메일을 사용해 주시기 바랍니다.
            </Text>
          </Flex>

          <Button
            styleType="animate"
            className={styles.SignUpBtn}
            onClick={() => setStep(1)}
          >
            확인 후 다음단계
            <Icon className="rightBtn" icon="chevron-right" />
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
