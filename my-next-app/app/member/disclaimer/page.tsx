"use client";

import { SectionTitle } from "@/components/common/Heading";
import { clsx, type ClassValue } from "clsx";
import { AlertTriangle, Info, LucideIcon, Scale } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";
import PolicyLayout from "../PolicyLayout";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 면책고지 전용 섹션 Props 타입 정의
 */
interface DisclaimerSectionProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  important?: boolean;
}

const DisclaimerSection = ({
  icon: Icon,
  title,
  children,
  important = false,
}: DisclaimerSectionProps) => (
  <section
    className={cn(
      "p-6 border rounded-lg transition-all",
      important
        ? "bg-orange-50 border-orange-100"
        : "bg-slate-50 border-slate-100",
    )}
  >
    <div className="flex items-center gap-3 mb-3">
      <Icon
        className={cn(
          "w-5 h-5",
          important ? "text-orange-600" : "text-slate-900",
        )}
      />

      <SectionTitle
        className={cn(
          "text-base",
          important ? "text-orange-900" : "text-slate-900",
        )}
      >
        {title}
      </SectionTitle>
    </div>

    <div className="text-sm text-slate-600 leading-relaxed ml-8">
      {children}
    </div>
  </section>
);

export function DisclaimerContent() {
  return (
    <div className="p-8 md:p-12 space-y-6">
      {/* 핵심 경고 */}
      <DisclaimerSection
        icon={AlertTriangle}
        title="법률 상담 및 대리 행위 금지"
        important
      >
        <p>
          본 플랫폼은{" "}
          <span className="font-black underline text-orange-700">
            변호사법 및 관련 법령을 준수
          </span>
          합니다.
          <br />
          제공되는 모든 정보는 데이터 기반의 가이드라인일 뿐이며, 특정 사건에
          대한 법률적 판단이나 개별 수임 행위를 수행하지 않습니다.
        </p>
      </DisclaimerSection>

      {/* 서비스 성격 */}
      <DisclaimerSection icon={Scale} title="의사결정 보조 서비스의 한계">
        <p>
          본 서비스는 판결 이후 강제집행 절차에 대한 정보를 구조화하여 제공하는
          <span className="font-black text-slate-900">
            {" "}
            &quot;판단 보조 도구&quot;{" "}
          </span>
          입니다.
          <br />
          이용자가 서비스를 통해 내린 모든 결정과 그에 따른 결과에 대한 최종
          책임은 이용자 본인에게 있습니다.
        </p>
      </DisclaimerSection>

      {/* AI 기술 고지 */}
      <DisclaimerSection icon={Info} title="데이터 및 AI 결과의 정확성">
        <p>
          분석 리포트와 예측 데이터는 과거 집행 사례와 AI 모델을 기반으로
          합니다.
          <br />
          실제 집행 과정은 법원이나 채무자의 상황에 따라 결과가 다를 수 있으며,
          성공을 보장하지 않습니다.
        </p>
      </DisclaimerSection>

      {/* 전문가 연결 관련 */}
      <DisclaimerSection icon={Info} title="외부 전문가 협업 안내">
        <p>
          플랫폼이 연결하는 외부 전문가와의 수임 계약은 이용자와 전문가 간의
          개별 계약이며, 플랫폼은 계약 과정에 개입하거나 연대 책임을 지지
          않습니다.
        </p>
      </DisclaimerSection>

      {/* 동의 안내 바 */}
      <div className="mt-8 p-4 bg-slate-900 rounded-lg text-white text-xs text-center font-medium">
        이용자는 위 내용을 충분히 숙지하였으며, 이에 동의하고 서비스를
        이용합니다.
      </div>
    </div>
  );
}

export default function DisclaimerPage() {
  return (
    <PolicyLayout
      title="법적 면책고지 (Disclaimer)"
      effectiveDate="2026년 1월 10일"
    >
      <DisclaimerContent />
    </PolicyLayout>
  );
}
