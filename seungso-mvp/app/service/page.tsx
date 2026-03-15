export const pageName = "사건등록";

export const metadata = {
  title: "사건 등록",
  description: "집행나침반의 사건 등록 페이지입니다.",
};

import CasesPage from "./CasesPage";

export default function CasesPageWrap() {
  return <CasesPage />;
}
