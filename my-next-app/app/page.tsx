"use client";

import {
  ArrowRight,
  BarChart3,
  Calculator,
  ChevronRight,
  Coins,
  FileText,
  ShieldAlert,
  ShieldCheck,
  Upload,
} from "lucide-react";
import Link from "next/link";

const JiphaengCompassMVP = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-8 py-20 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-black text-blue-700 bg-blue-50 rounded-full border border-blue-100 animate-bounce">
          소액 채권자(500만원 미만) 필독 가이드 포함
        </div>
        <h1 className="text-4xl md:text-6xl font-black leading-[1.15] mb-8 tracking-tight">
          승소는 끝이 아니라 <span className="text-red-500">시작</span>입니다.{" "}
          <br />
          <span className="text-blue-600">데이터로 1분 만에</span> 실익을
          따지세요.
        </h1>
        <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
          무의미한 강제집행에 돈 쓰지 마세요. 판결문 분석 알고리즘이
          <br className="hidden md:block" />
          회수 가능성부터 집행 가성비까지 냉정하게 진단해 드립니다.
        </p>

        {/* Main Analysis Input (Primary CTA) */}
        <div className="max-w-3xl mx-auto bg-white p-2 rounded-[40px] shadow-2xl shadow-blue-100 border border-slate-100 overflow-hidden">
          <div className="flex flex-col md:flex-row p-4 gap-4">
            <div className="flex-1 border-3 border-dashed border-slate-100 rounded-[32px] p-10 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group relative">
              <Upload className="w-12 h-12 text-slate-300 mx-auto mb-4 group-hover:text-blue-500 transition-colors" />
              <p className="text-base font-bold text-slate-600">
                판결문 PDF 업로드
              </p>
              <p className="text-xs text-slate-400 mt-2">
                개인정보는 자동으로 비식별화 처리됩니다.
              </p>
            </div>
            <div className="flex flex-col gap-3 justify-center px-4">
              <button className="bg-blue-600 text-white px-10 py-5 rounded-[24px] font-black text-xl hover:bg-blue-700 shadow-xl shadow-blue-200 flex items-center justify-center gap-2 transform active:scale-95 transition-all">
                실익 스코어 확인 <ArrowRight className="w-6 h-6" />
              </button>
              <div className="flex items-center justify-center gap-4 mt-2">
                <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                  <ShieldCheck className="w-3 h-3" /> 보안 서버 준수
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                  <Coins className="w-3 h-3" /> 분석 비용 0원
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 팩트 폭격 섹션 (신규 추가) */}
      <section className="max-w-5xl mx-auto px-8 py-10">
        <div className="bg-slate-900 rounded-[40px] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-md">
            <div className="flex items-center gap-2 text-orange-400 mb-4 font-black text-sm uppercase tracking-widest">
              <ShieldAlert className="w-5 h-5" /> Important Notice
            </div>
            <h2 className="text-3xl font-black mb-4 leading-tight">
              민사 집행 실패율 70%, <br />왜 내 돈은 돌아오지 않을까?
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm">
              채무자의 재산 상태를 모르고 진행하는 집행은 &ldquo;밑 빠진 독에 물
              붓기&rdquo;입니다. 집행나침반은 업체들의 그럴싸한 홍보 대신 냉정한
              성공 확률 데이터를 먼저 보여드립니다.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 w-full md:w-auto">
            <Link
              href="/strategy"
              className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-5 rounded-2xl transition-all border border-white/5 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-500/20 text-orange-400 rounded-xl flex items-center justify-center font-bold">
                  !
                </div>
                <span className="font-bold text-sm">
                  집행 전 주의사항 확인하기
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white" />
            </Link>
            <Link
              href="/strategy/calculator"
              className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-5 rounded-2xl transition-all border border-white/5 group"
            >
              <div className="flex items-center gap-4">
                <Calculator className="w-6 h-6 text-blue-400" />
                <span className="font-bold text-sm">
                  집행 가성비 시뮬레이션
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">
              소액 채권자를 위한 3가지 핵심 도구
            </h2>
            <p className="text-slate-500">
              법률 전문가가 아니어도 스스로 권리를 보호할 수 있습니다.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[24px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">실익 스코어링</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">
                공공데이터와 실제 회수 사례를 분석하여 채무자의 재산 유무와 집행
                실익을 점수화합니다.
              </p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-[24px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">나홀로 집행 가이드</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">
                업체 비용 50만원을 아끼는 셀프 집행법. 복잡한 서류 작성부터
                신청까지 단계별로 안내합니다.
              </p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-[24px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">비용 정산 & 영수증</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">
                집행 과정에서 발생하는 모든 지출을 기록하고, 최종 회수액 대비
                순수익을 자동으로 계산합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-slate-950 text-white py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12 pb-12 border-b border-white/10">
            <div>
              <div className="text-2xl font-black mb-4 tracking-tighter text-blue-500">
                GOT YOU.
              </div>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                집행나침반은 소액 채권자의 정당한 권리를 포기하지 않도록 돕는
                기술을 만듭니다. 분노가 아닌 데이터로 해결하세요.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <h4 className="font-bold text-sm mb-4">서비스</h4>
                <ul className="space-y-2 text-sm text-slate-500 font-medium">
                  <li className="hover:text-white cursor-pointer transition-colors">
                    실익 분석
                  </li>
                  <li className="hover:text-white cursor-pointer transition-colors">
                    집행 가이드
                  </li>
                  <li className="hover:text-white cursor-pointer transition-colors">
                    가성비 계산기
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-4">고객지원</h4>
                <ul className="space-y-2 text-sm text-slate-500 font-medium">
                  <li className="hover:text-white cursor-pointer transition-colors">
                    공지사항
                  </li>
                  <li className="hover:text-white cursor-pointer transition-colors">
                    법률 서식함
                  </li>
                  <li className="hover:text-white cursor-pointer transition-colors">
                    FAQ
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold text-slate-600 uppercase tracking-widest">
            <div>© 2026 잡았다요놈 Corp. All rights reserved.</div>
            <div className="flex gap-6">
              <span className="hover:text-slate-400 cursor-pointer transition-colors">
                이용약관
              </span>
              <span className="hover:text-slate-400 cursor-pointer transition-colors text-slate-400">
                개인정보처리방침
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JiphaengCompassMVP;
