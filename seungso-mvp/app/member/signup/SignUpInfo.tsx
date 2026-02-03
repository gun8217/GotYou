"use client";
import Button from "@/components/ui/Button";
import Flex from "@/components/ui/Flex";
import Tabs from "@/components/ui/Tabs";
import Text from "@/components/ui/Text";
import { useState } from "react";
import SignUpForm from "./SignUpForm";

import styles from "../MemberCommon.module.scss";

export default function SignUpSteps() {
  const [step, setStep] = useState(0);

  const tabs = [
    {
      label: "1단계 안내",
      content: (
        <>
          <Flex direction="column" gap={16} className={styles.form}>
            <Text>⚠</Text>
            <Text>승소환전소는 이메일 주소가 아이디입니다.</Text>
            <Text>
              가입한 이메일을 잊어버리면 저희가 대신 찾아드릴 수 없습니다.
            </Text>
            <Text>꼭 본인이 기억할 수 있는 이메일을 입력해 주세요.</Text>
          </Flex>

          <Button onClick={() => setStep(1)}>
            내용을 이해했고 가입하겠습니다.
          </Button>
        </>
      ),
    },
    {
      label: "2단계 가입",
      content: <SignUpForm />,
    },
  ];

  return <Tabs tabs={tabs} initialIndex={step} disableClick />;
}
