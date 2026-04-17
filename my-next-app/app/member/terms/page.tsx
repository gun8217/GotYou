"use client";

import { SectionTitle } from "@/components/common/Heading";
import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import PolicyLayout from "../PolicyLayout"; // 경로가 다르면 수정하세요

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 약관 조항 섹션 컴포넌트
 */
const TermSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="space-y-2.5">
    <SectionTitle className="text-lg">{title}</SectionTitle>
    <div className="text-slate-600 leading-relaxed">{children}</div>
  </section>
);

export function TermsContent({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn("p-8 md:p-12 space-y-10 text-sm", className)}
      style={style}
    >
      <TermSection title="제1조 (목적)">
        <p>
          본 약관은 집행나침반(이하 “플랫폼”)이 제공하는 서비스의 이용과
          관련하여 플랫폼과 이용자 간의 권리, 의무 및 책임사항을 규정함을
          목적으로 합니다.
        </p>
      </TermSection>

      <TermSection title="제2조 (서비스의 성격)">
        <p>
          본 서비스는 판결 이후 권리 실현(집행) 과정에서 발생하는 절차, 단계,
          선택지에 대한 정보를 구조화하여 제공하는 정보 제공 및 판단 보조
          서비스입니다.
          <br />
          <span className="font-bold text-slate-900">
            플랫폼은 법률 판단을 하거나 강제집행을 직접 수행하지 않습니다.
          </span>
        </p>
      </TermSection>

      <TermSection title="제3조 (회원가입)">
        <p>
          이용자는 플랫폼이 정한 가입 양식에 따라 이메일 및 비밀번호를 입력하고
          본 약관과 개인정보 수집·이용에 동의함으로써 회원가입을 신청합니다.
          <br />
          플랫폼은 입력한 이메일 주소를 로그인 아이디로 사용하며, 분실 시
          플랫폼은 이를 별도로 확인해 줄 의무를 지지 않습니다.
        </p>
      </TermSection>

      <TermSection title="제4조 (이용자의 책임)">
        <p>
          이용자는 본인의 판단과 책임 하에 서비스를 이용해야 하며, 집행 여부의
          결정 및 집행 실행에 대한 책임은 전적으로 이용자 본인에게 있습니다.
        </p>
      </TermSection>

      <TermSection title="제5조 (외부 전문가와의 관계)">
        <p>
          플랫폼은 외부 전문가와 협력 구조를 가질 수 있으나, 이는 선택적 연계에
          불과하며 플랫폼이 수임을 강제하지 않습니다.
          <br />
          개별 사건에 대한 계약은 이용자와 해당 전문가 간에 직접 체결됩니다.
        </p>
      </TermSection>

      <TermSection title="제6조 (성공 여부의 정의)">
        <p>
          플랫폼은 집행 결과의 성공 또는 실패를 판단하지 않으며, 외부 절차를
          통해 실제 금전이 이용자 계좌로 입금되었고 그 사실이 증빙된 경우에만
          내부적으로 ‘회수 발생 상태’로 기록합니다.
        </p>
      </TermSection>

      <TermSection title="제7조 (회원 탈퇴 및 데이터 활용)">
        <p>
          회원 탈퇴 시 계정은 즉시 비활성화됩니다.
          <br />
          다만, 서비스 이용 과정에서 생성된 사건 정보는 AI 모델 학습 및 통계
          분석을 위해 익명화 또는 가명화하여 계속 활용될 수 있습니다.
        </p>
      </TermSection>

      <TermSection title="제8조 (면책조항)">
        <p>
          플랫폼은 이용자가 제공한 정보의 정확성, 외부 집행 결과, 제3자의 행위로
          발생한 손해에 대하여 책임을 지지 않습니다.
        </p>
      </TermSection>

      <TermSection title="제9조 (서비스 이용 제한)">
        <p>
          플랫폼은 이용자가 본 약관을 위반하거나 관련 법령에 위반되는 행위를 한
          경우 서비스 이용을 제한할 수 있습니다.
        </p>
      </TermSection>

      <TermSection title="제10조 (콘텐츠 저작권 및 기술 고지)">
        <ul className="space-y-2">
          <li>1. 모든 콘텐츠의 저작권은 플랫폼에 귀속됩니다.</li>
          <li>
            2. 본 서비스 내 사용된 일부 이미지 및 디자인 리소스는 생성형
            AI(Generative AI) 기술을 활용하여 제작되었습니다.
            <br />
            이는 특정 인물의 초상권을 침해하지 않도록 생성되었습니다.
          </li>
        </ul>
      </TermSection>
    </div>
  );
}

export default function TermsPage() {
  return (
    <PolicyLayout title="서비스 이용약관" effectiveDate="2026년 3월 15일">
      <TermsContent />
    </PolicyLayout>
  );
}
