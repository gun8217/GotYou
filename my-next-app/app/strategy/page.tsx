"use client";

import { Ghost, SearchX, Skull } from "lucide-react";

export default function RealisticStrategy() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <main className="container mx-auto max-w-2xl px-6 py-10">
        {/* 경고 문구 */}
        <div className="bg-red-50 border border-red-100 rounded-3xl p-6 mb-10">
          <div className="flex items-center gap-2 mb-2 text-red-600">
            <Skull className="w-5 h-5" />
            <h2 className="font-extrabold tracking-tight">
              현혹 금지: 집행의 민낯
            </h2>
          </div>
          <p className="text-sm text-red-800 leading-relaxed font-medium">
            추심 업체나 법무사가 돈을 찾아준다고 장담하나요? <br />
            실제로는
            <span className="underline decoration-red-300 decoration-2">
              &lsquo;착수금만 받고 결과는 나 몰라라&rsquo;
            </span>
            하는 경우가 허다합니다.
          </p>
        </div>

        {/* 현실적인 선택지 비교 */}
        <div className="space-y-6">
          {/* 추심업체 - 팩트체크 */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 text-[10px] font-black uppercase">
              High Risk
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
              추심업체
              <span className="text-sm font-normal text-slate-400">
                &lsquo;성공 보수 중심&rsquo;
              </span>
            </h3>
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border-l-4 border-orange-500">
                <p className="text-xs font-bold text-orange-600 mb-1">
                  그럴싸한 말
                </p>
                <p className="text-sm text-slate-700">
                  &lsquo;자체 데이터망으로 채무자의 숨은 계좌를 다
                  찾아냅니다.&rsquo;
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-2xl border-l-4 border-red-500">
                <p className="text-xs font-bold text-red-600 mb-1">
                  불편한 진실
                </p>
                <p className="text-sm text-red-800">
                  신용조회 비용은 별도이며, 깡통 계좌일 경우 책임지지 않습니다.
                  <br />
                  <span className="font-bold">
                    착수금 50만원은 일단 소멸성 비용
                  </span>
                  이라고 봐야 합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 법무사 - 팩트체크 */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-slate-400 text-white px-4 py-1 text-[10px] font-black uppercase">
              Moderate
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
              법무사
              <span className="text-sm font-normal text-slate-400">
                &lsquo;서류 대행 중심&rsquo;
              </span>
            </h3>
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border-l-4 border-slate-400">
                <p className="text-xs font-bold text-slate-500 mb-1">
                  그럴싸한 말
                </p>
                <p className="text-sm text-slate-700">
                  &lsquo;법리 검토를 통해 실익 있는 은행을 압류합니다.&rsquo;
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-2xl border-l-4 border-red-500">
                <p className="text-xs font-bold text-red-600 mb-1">
                  불편한 진실
                </p>
                <p className="text-sm text-red-800">
                  보통 5대 시중은행에 &lsquo;찍기식&rsquo;으로 거는 경우가
                  많습니다. <br />
                  <span className="font-bold">
                    채무자가 제2금융권(카뱅/토스/새마을금고)을 쓰면 헛스윙
                  </span>
                  입니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 결론: 어떻게 해야 할까? */}
        <section className="mt-12">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <SearchX className="w-5 h-5 text-blue-600" /> 그래서 결론은?
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex gap-4 items-start p-4 bg-white rounded-2xl border border-slate-100">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex-shrink-0 flex items-center justify-center">
                1
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900">
                  직접 신용조회 먼저 해보기
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  남한테 50만원 주느니, 직접 온라인으로 채무자 신용 상태만 먼저
                  조회해서 &lsquo;신용불량&rsquo;인지부터 확인하세요.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-4 bg-white rounded-2xl border border-slate-100">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex-shrink-0 flex items-center justify-center">
                2
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900">
                  소액이면 전자소송으로 &lsquo;셀프 압류&rsquo;
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  송달료와 수수료 몇 만 원만 쓰고, 제1금융권 3곳 정도만 직접
                  압류해 보는 게 가장 가성비 좋습니다.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 최종 조언 바 */}
      <div className="fixed bottom-6 left-6 right-6 max-w-2xl mx-auto">
        <div className="bg-slate-900 text-white p-5 rounded-[28px] shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Ghost className="w-6 h-6 text-slate-400" />
            <p className="text-xs font-medium leading-tight">
              돈 버리는 집행이 되지 않도록 <br />
              <span className="text-blue-400 font-bold">집행 가성비 점수</span>
              를 확인하세요.
            </p>
          </div>
          <button className="bg-blue-600 px-5 py-3 rounded-2xl font-black text-sm active:scale-95 transition-all">
            가성비 계산기
          </button>
        </div>
      </div>
    </div>
  );
}
