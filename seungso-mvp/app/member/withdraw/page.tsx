import WithdrawForm from "./WithdrawForm";

export const pageName = "회원탈퇴";
export const pageOrder = 3;
export const requiresAuth = true;

export const metadata = {
  title: "회원탈퇴",
  description: "집행나침반 회원탈퇴 페이지입니다.",
};

export default function WithdrawPage() {
  return <WithdrawForm />;
}
