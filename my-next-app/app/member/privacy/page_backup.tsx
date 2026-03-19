"use client";

import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface PrivacyPageProps {
  showHeader?: boolean;
}

export default function PrivacyPage({ showHeader = true }: PrivacyPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
        {/* 상단 헤더 영역 */}
        {showHeader && (
          <div className="bg-slate-900 p-8 md:p-12 text-white">
            <div className="flex items-center gap-3 mb-4 opacity-80">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <span className="text-xs font-bold tracking-widest uppercase">
                Privacy Policy
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              개인정보 수집 및 이용 안내
            </h1>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              집행나침반은 이용자의 소중한 개인정보와 사건 데이터를 안전하게
              보호하기 위해 최선을 다하고 있습니다.
            </p>
          </div>
        )}

        {/* 본문 콘텐츠 영역 */}
        <div className="p-8 md:p-12 space-y-10">
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-slate-500 text-xs font-black">
                1
              </span>
              수집하는 개인정보 항목
            </h2>
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <ul className="space-y-2 text-sm text-slate-600 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span> 이메일 주소
                  (계정 식별 및 로그인)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span> 비밀번호
                  (암호화되어 안전하게 저장)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span> 서비스 이용
                  과정에서 생성되는 사건 정보 (판결문 데이터 포함)
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-slate-500 text-xs font-black">
                2
              </span>
              개인정보 수집 목적
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              수집된 개인정보는 다음 목적에 한하여 이용됩니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "회원 식별 및 인증",
                "로그인 아이디로서의 계정 관리",
                "사건 정보 관리 및 서비스 제공",
                "서비스 개선 및 운영 관리",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-700 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-xl bg-orange-50 border border-orange-100">
              <p className="text-xs text-orange-800 leading-relaxed font-medium">
                ⚠️ 이메일 주소는 본인 식별을 위한 고유 아이디입니다. 가입한
                이메일을 분실할 경우 플랫폼에서 별도로 안내해 드리지 않으니
                관리에 유의해 주세요.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-slate-500 text-xs font-black">
                3
              </span>
              개인정보 보관 기간
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              이용자의 개인정보는
              <strong className="text-slate-900 underline decoration-blue-200 decoration-4">
                회원 탈퇴 시까지 보관
              </strong>
              하며, 관계 법령에 따라 보존할 필요가 있는 경우 해당 기간 동안
              안전하게 보관합니다.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-slate-500 text-xs font-black">
                4
              </span>
              개인정보의 제3자 제공
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              플랫폼은 이용자의 동의 없이 개인정보를 제3자에게 제공하지
              않습니다. 다만, 이용자가 외부 전문가(법무사 등)와의 연결을 선택한
              경우에 한해 최소한의 정보만 전달됩니다.
            </p>
          </section>

          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-lg font-bold text-slate-900">
              7. 회원 탈퇴 및 데이터 활용
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              탈퇴 시 계정은 즉시 비활성화됩니다. 다만, 서비스 이용 과정에서
              생성된 사건 정보는 AI 모델 학습 및 통계 분석을 위해
              <strong className="text-slate-900">
                익명화 또는 가명화 처리 후
              </strong>
              내부 목적으로 활용될 수 있습니다.
            </p>
          </section>

          <div className="pt-8 flex flex-col items-center border-t border-slate-100">
            <p className="text-xs text-slate-400 mb-6">
              부칙: 본 안내는 2026년 2월 1일부터 적용됩니다.
            </p>
            <Link
              href="/"
              className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> 메인으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
