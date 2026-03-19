"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function PrivacyContent() {
  return (
    <div className="p-8 md:p-12 space-y-8 text-sm leading-relaxed">
      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-3 text-base">
          1. 수집하는 개인정보 항목
        </h2>
        <p>
          플랫폼은 회원가입 및 서비스 제공을 위해 다음의 개인정보를 수집합니다.
        </p>
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>이메일 주소</li>
          <li>비밀번호 (암호화 저장)</li>
          <li>서비스 이용 과정에서 생성되는 사건 정보</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-3 text-base">
          2. 개인정보 수집 목적
        </h2>
        <p>수집된 개인정보는 다음 목적에 한하여 이용됩니다.</p>
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>회원 식별 및 인증</li>
          <li>로그인 아이디로서의 계정 관리</li>
          <li>사건 정보 관리 및 서비스 제공</li>
          <li>서비스 개선 및 운영 관리</li>
        </ul>
        <p className="mt-3 font-bold text-orange-600">
          ※ 이메일 주소는 본인 식별 및 로그인을 위한 아이디로 사용되며, 이를
          분실할 경우 플랫폼은 별도로 안내해 드리지 않습니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-3 text-base">
          3. 개인정보 보관 기간
        </h2>
        <p>
          이용자의 개인정보는 회원 탈퇴 시까지 보관하며, 관계 법령에 따라 보존할
          필요가 있는 경우 해당 기간 동안 보관합니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-3 text-base">
          4. 개인정보의 제3자 제공
        </h2>
        <p>
          플랫폼은 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
          다만, 이용자가 외부 전문가(법무사 등)와의 연결을 선택한 경우, 해당
          업무 수행을 위해 필요한 최소한의 정보만 전달될 수 있습니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-3 text-base">
          5. 이용자의 권리
        </h2>
        <p>
          이용자는 언제든지 본인의 개인정보를 조회, 수정, 삭제할 수 있으며, 회원
          탈퇴를 통해 개인정보 이용을 중단할 수 있습니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-3 text-base">
          6. 개인정보 보호를 위한 조치
        </h2>
        <p>
          플랫폼은 Supabase 인증 시스템과 데이터 접근 제어(RLS)를 활용하여
          이용자의 개인정보와 사건 데이터를 본인만 접근 가능하도록 관리합니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-3 text-base">
          7. 회원 탈퇴 및 데이터 활용
        </h2>
        <p>
          회원 탈퇴 시 계정은 즉시 비활성화되며 로그인할 수 없게 됩니다. 다만,
          서비스 이용 과정에서 생성된 사건 정보 및 이용 기록은 AI 모델 학습,
          통계 분석, 서비스 개선 등 내부 목적으로 계속 활용될 수 있습니다. 이
          데이터는 탈퇴 후에도 익명화 또는 가명화하여 관리됩니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-3 text-base">
          8. 고지 의무
        </h2>
        <p>
          본 개인정보 수집 및 이용 안내 내용이 변경될 경우, 플랫폼은 서비스
          화면을 통해 사전에 고지합니다.
        </p>
      </section>

      <div className="pt-8 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-400 mb-6 font-bold">
          부칙: 본 안내는 2026년 2월 1일부터 적용됩니다.
        </p>
      </div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden text-slate-700">
        <div className="bg-slate-900 p-8 text-white">
          <h1 className="text-2xl font-black">개인정보 수집 및 이용 안내</h1>
        </div>

        <PrivacyContent />

        <div className="pt-8 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 mb-6 font-bold">
            부칙: 본 안내는 2026년 2월 1일부터 적용됩니다.
          </p>
          <Link
            href="/member/signup"
            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> 가입 화면으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
