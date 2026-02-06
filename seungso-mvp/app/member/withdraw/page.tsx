import Flex from "@/components/ui/Flex";
import Title from "@/components/ui/Title";
import styles from "../MemberCommon.module.scss";
import WithdrawForm from "./WithdrawForm";

export const pageName = "회원탈퇴";
export const pageOrder = 3;
export const requiresAuth = true;

export const metadata = {
  title: "회원탈퇴",
  description: "승소환전소 회원탈퇴 페이지입니다.",
};

export default function WithdrawPage() {
  return (
    <Flex direction="column" className={styles.MemberWrap}>
      <Title level={1}>회원탈퇴</Title>
      <WithdrawForm />
    </Flex>
  );
}
