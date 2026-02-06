import ResetPasswordForm from "./ResetPasswordForm";

export const pageName = "비밀번호 변경";
export const pageTitle = "계정관리";
export const pageOrder = 2;
export const requiresAuth = true;

export const metadata = {
  title: "비밀번호 변경",
  description: "승소환전소의 비밀번호 변경 페이지입니다.",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
