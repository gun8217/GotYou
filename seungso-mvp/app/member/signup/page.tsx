import Flex from "@/components/ui/Flex";

export const pageName = "회원가입";

import styles from "../MemberCommon.module.scss";

import SignUpInfo from "./SignUpInfo";

export const metadata = {
  title: "회원가입",
  description: "승소환전소의 회원가입 페이지입니다.",
};

export default function SignUpPage() {
  return (
    <Flex direction="column" className={styles.MemberWrap}>
      <SignUpInfo />
    </Flex>
  );
}
