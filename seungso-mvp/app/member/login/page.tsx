import LoginForm from "./LoginForm";

// export const pageName = "로그인";
// export const pageTitle = "계정관리";
// export const pageOrder = 1;
// export const requiresAuth = false;

export const metadata = {
  title: "로그인",
  description: "승소환전소의 로그인 페이지입니다.",
};

export default function JoinPage() {
  return <LoginForm />;
}
