"use client";

import { SectionTitle } from "@/components/common/Heading";
import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import PolicyLayout from "../PolicyLayout";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 약관 섹션 컴포넌트
 */
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="space-y-3">
    <SectionTitle className="text-lg">{title}</SectionTitle>
    <div className="text-slate-600">{children}</div>
  </section>
);

export function PrivacyContent({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "p-8 md:p-12 space-y-10 text-sm leading-relaxed",
        className,
      )}
      style={style}
    >
      <Section title="1. 수집하는 개인정보 항목">
        <p>
          플랫폼은 회원가입 및 서비스 제공을 위해 다음의 개인정보를 수집합니다.
        </p>
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>이메일 주소</li>
          <li>비밀번호 (암호화 저장)</li>
          <li>서비스 이용 과정에서 생성되는 사건 정보</li>
        </ul>
      </Section>

      <Section title="2. 개인정보 수집 목적">
        <p>수집된 개인정보는 다음 목적에 한하여 이용됩니다.</p>
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>회원 식별 및 인증 / 계정 관리</li>
          <li>사건 정보 관리 및 서비스 제공</li>
          <li>서비스 개선 및 운영 관리</li>
        </ul>
        {/* 라운딩 규칙: 크게(8px) 적용 -> rounded-lg */}
        <p className="mt-3 font-bold text-orange-600 bg-orange-50 p-3 rounded-lg border border-orange-100">
          ※ 이메일 주소는 본인 식별 및 로그인을 위한 아이디로 사용되며, 이를
          분실할 경우 플랫폼은 별도로 안내해 드리지 않습니다.
        </p>
      </Section>

      <Section title="3. 개인정보 보관 기간">
        <p>
          이용자의 개인정보는 회원 탈퇴 시까지 보관하며, 관계 법령에 따라 보존할
          필요가 있는 경우 해당 기간 동안 보관합니다.
        </p>
      </Section>

      <Section title="4. 개인정보의 제3자 제공">
        <p>
          플랫폼은 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
          다만, 이용자가 외부 전문가와의 연결을 선택한 경우 필요한 최소한의
          정보만 전달될 수 있습니다.
        </p>
      </Section>

      <Section title="5. 이용자의 권리">
        <p>
          이용자는 언제든지 본인의 개인정보를 조회, 수정, 삭제할 수 있으며, 회원
          탈퇴를 통해 개인정보 이용을 중단할 수 있습니다.
        </p>
      </Section>

      <Section title="6. 개인정보 보호를 위한 조치">
        <p>
          플랫폼은 Supabase 인증 시스템과 데이터 접근 제어(RLS)를 활용하여
          데이터를 본인만 접근 가능하도록 안전하게 관리합니다.
        </p>
      </Section>

      <Section title="7. 회원 탈퇴 및 데이터 활용">
        <p>
          탈퇴 시 계정은 즉시 비활성화됩니다. 다만, 생성된 사건 정보 및 기록은
          AI 모델 학습 및 서비스 개선을 위해 익명화 또는 가명화하여 내부
          목적으로 계속 활용될 수 있습니다.
        </p>
      </Section>
    </div>
  );
}

export default function PrivacyPage() {
  // 이전 버전 파일(예: ./v1/page.tsx)
  const historyData = [
    { date: "2025.01.01", label: "제1차 개정", href: "/member/privacy/v1" },
    { date: "2024.06.01", label: "최초 제정", href: "/member/privacy/v0" },
  ];

  return (
    <PolicyLayout
      title="개인정보 수집 및 이용 안내"
      effectiveDate="2026년 2월 1일"
      history={historyData} // 이력 데이터를 넘겨줌
    >
      <PrivacyContent />
    </PolicyLayout>
  );
}
