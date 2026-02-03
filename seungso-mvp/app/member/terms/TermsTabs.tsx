"use client";

import Tabs from "@/components/ui/Tabs";

import { useSearchParams } from "next/navigation";

import PrivacyPage from "./PrivacyPage";
import TermsPage from "./TermsPage";

export default function MemberTermsPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const tabs = [
    { label: "서비스 이용약관", content: <TermsPage /> },
    { label: "개인정보 처리방침", content: <PrivacyPage /> },
  ];

  const initialIndex = tab === "privacy" ? 1 : 0;

  return <Tabs tabs={tabs} initialIndex={initialIndex} />;
}
