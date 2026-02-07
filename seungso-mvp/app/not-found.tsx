"use client";
import ErrorPage from "@/components/common/ErrorPage";

export default function NotFound() {
  return (
    <ErrorPage
      title="404"
      message="접근할 수 있는 화면이 없습니다."
      linkText="홈으로 이동"
      linkHref="/"
    />
  );
}
