import Flex from "@/components/ui/Flex";
import styles from "../MemberCommon.module.scss";
import SignUpCheck from "./SignUpCheck";
import SignUpInfo from "./SignUpInfo";

export const metadata = {
  title: "회원가입",
  description: "승소환전소의 회원가입 페이지입니다.",
};

export default function SignUpPage() {
  return (
    <SignUpCheck>
      <Flex direction="column" className={styles.MemberWrap}>
        <SignUpInfo />
      </Flex>
    </SignUpCheck>
  );
}
