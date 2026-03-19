"use client";

import { ArrowLeft, Cpu, FileText, Info } from "lucide-react";
import Link from "next/link";

interface TermsPageProps {
  showHeader?: boolean;
}

export default function TermsPage({ showHeader = true }: TermsPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
        {/* 상단 헤더 영역 */}
        {showHeader && (
          <div className="bg-slate-900 p-8 md:p-12 text-white">
            <div className="flex items-center gap-3 mb-4 opacity-80">
              <FileText className="w-5 h-5 text-blue-400" />
              <span className="text-xs font-bold tracking-widest uppercase">
                Terms of Service
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              서비스 이용약관
            </h1>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              집행나침반 서비스를 이용하시기 전, 플랫폼과 이용자 간의 권리 및
              책임 사항을 반드시 확인해 주시기 바랍니다.
            </p>
          </div>
        )}

        {/* 본문 콘텐츠 영역 */}
        <div className="p-8 md:p-12 space-y-12">
          {/* 제1조 & 제2조: 목적 및 성격 */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-slate-900">제1조 (목적)</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              본 약관은 **집행나침반**(이하 &ldquo;플랫폼&rdquo;)이 제공하는
              서비스의 이용과 관련하여 플랫폼과 이용자 간의 권리, 의무 및
              책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section className="space-y-4 bg-blue-50/50 p-6 rounded-[24px] border border-blue-100">
            <h2 className="text-xl font-black text-blue-900 flex items-center gap-2">
              <Info className="w-5 h-5" /> 제2조 (서비스의 성격)
            </h2>
            <p className="text-sm text-blue-800 leading-relaxed font-medium">
              본 서비스는 판결 이후 집행 과정의 절차와 선택지에 대한 정보를
              구조화하여 제공하는 **정보 제공 및 판단 보조 서비스**입니다.
              <span className="block mt-2 font-black underline decoration-blue-300 underline-offset-4">
                플랫폼은 직접적인 법률 판단을 내리거나 강제집행 업무를 수행하지
                않습니다.
              </span>
            </p>
          </section>

          {/* 제3조: 회원가입 */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-slate-900">
              제3조 (회원가입)
            </h2>
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                이용자는 이메일 및 비밀번호를 입력하고 본 약관에 동의함으로써
                가입을 신청합니다.
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 italic">
                &ldquo;가입 시 사용한 이메일 주소를 분실하거나 기억하지 못하는
                경우, 플랫폼은 이를 별도로 안내하거나 확인해 줄 의무를 지지
                않습니다.&rdquo;
              </div>
            </div>
          </section>

          {/* 제5조 & 제6조: 외부 전문가 및 성공 정의 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="p-6 bg-white border border-slate-100 rounded-[24px] shadow-sm">
              <h3 className="font-bold text-slate-900 mb-3 text-base">
                제5조 외부 전문가 관계
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                전문가 연계는 선택적 서비스이며, 플랫폼은 특정 전문가 수임을
                강제하지 않습니다. 계약은 이용자와 전문가 간 직접 체결됩니다.
              </p>
            </section>
            <section className="p-6 bg-white border border-slate-100 rounded-[24px] shadow-sm">
              <h3 className="font-bold text-slate-900 mb-3 text-base">
                제6조 성공 여부의 정의
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                플랫폼은 실제 금전이 이용자 계좌로 입금된 사실이 증빙된 경우에만
                내부적으로 &lsquo;회수 발생&rsquo;으로 기록합니다.
              </p>
            </section>
          </div>

          {/* 제10조: AI 기술 고지 */}
          <section className="space-y-4 pt-8 border-t border-slate-100">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-500" /> 제10조 (콘텐츠 및 기술
              고지)
            </h2>
            <div className="text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>
                1. 모든 콘텐츠의 저작권은 &ldquo;플랫폼&rdquo;에 귀속됩니다.
              </p>
              <p className="p-4 bg-purple-50 rounded-xl text-purple-900 text-xs font-medium">
                2. 본 서비스 내 사용된 일부 이미지 및 디자인 리소스는 **생성형
                AI(Generative AI)** 기술을 활용하여 제작되었습니다. 이는 특정
                인물의 초상권을 침해하지 않으며 플랫폼의 시각적 정체성을 위해
                사용됩니다.
              </p>
            </div>
          </section>

          {/* 부칙 및 하단 버튼 */}
          <div className="pt-10 flex flex-col items-center border-t border-slate-100">
            <p className="text-xs text-slate-400 mb-8 font-bold tracking-widest uppercase italic">
              부칙: 본 약관은 2026년 2월 1일부터 시행합니다.
            </p>
            <Link
              href="/"
              className="px-10 py-4 bg-slate-900 text-white rounded-[20px] font-black text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center gap-2 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" /> 동의하고 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
