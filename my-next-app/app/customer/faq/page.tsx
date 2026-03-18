"use client";

import { useState } from "react";

// FAQ 아이템 타입 정의
interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

// 💡 나중에 이 데이터를 DB에서 가져오게 수정할 수 있습니다.
const faqData: FAQItem[] = [
  {
    id: 1,
    category: "서비스 이용",
    question: "집행나침반은 어떤 서비스인가요?",
    answer:
      "집행나침반은 복잡한 법적 강제집행 절차를 일반인도 쉽게 이해하고 스스로 진행할 수 있도록 돕는 가이드 서비스입니다. 서식 제공부터 단계별 절차 안내까지 지원합니다.",
  },
  {
    id: 2,
    category: "계정/로그인",
    question: "비밀번호를 잊어버렸을 때는 어떻게 하나요?",
    answer:
      '로그인 페이지의 "비밀번호 재설정" 링크를 통해 가입하신 이메일로 재설정 안내를 받으실 수 있습니다.',
  },
  {
    id: 3,
    category: "자료실",
    question: "자료실의 서식을 상업적으로 이용해도 되나요?",
    answer:
      "자료실에서 제공하는 모든 서식은 개인의 비영리적 사용을 목적으로 합니다. 상업적 재배포나 판매는 금지되어 있습니다.",
  },
  {
    id: 4,
    category: "기타",
    question: "전문적인 법률 상담이 필요한 경우는요?",
    answer:
      "집행나침반은 절차적 안내를 제공하는 서비스입니다. 구체적인 법적 분쟁이나 전략이 필요한 경우 법률 전문가(변호사, 법무사)와 상담하시는 것을 권장드립니다.",
  },
];

export default function FAQPage() {
  // 현재 열려있는 아코디언의 ID를 추적 (null이면 모두 닫힘)
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          자주 묻는 질문
        </h1>
        <p className="text-lg text-gray-500">
          궁금하신 점을 키워드별로 확인해 보세요.
        </p>
      </div>

      <div className="space-y-4">
        {faqData.map((item) => (
          <div
            key={item.id}
            className={`group border rounded-2xl overflow-hidden transition-all duration-300 ${
              openId === item.id
                ? "border-indigo-600 ring-1 ring-indigo-600 shadow-md"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            {/* 질문 버튼 영역 */}
            <button
              onClick={() => toggleFAQ(item.id)}
              className="w-full flex items-center justify-between p-6 text-left transition-colors"
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={`text-xs font-bold uppercase tracking-widest ${
                    openId === item.id ? "text-indigo-600" : "text-gray-400"
                  }`}
                >
                  {item.category}
                </span>
                <span
                  className={`text-lg font-bold ${
                    openId === item.id ? "text-gray-900" : "text-gray-700"
                  }`}
                >
                  {item.question}
                </span>
              </div>
              <div
                className={`flex-shrink-0 ml-4 p-1 rounded-full bg-gray-50 group-hover:bg-indigo-50 transition-all duration-300 ${
                  openId === item.id
                    ? "rotate-180 bg-indigo-100 text-indigo-600"
                    : "text-gray-400"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </button>

            {/* 답변 영역 (애니메이션 포함) */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openId === item.id
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-6 pt-2 bg-gray-50/50">
                <div className="h-px bg-gray-100 mb-4" />
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 하단 콜 투 액션 (CTA) */}
      <div className="mt-20 p-10 bg-gray-900 rounded-[2.5rem] text-center text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-3">
            찾으시는 답변이 없으신가요?
          </h2>
          <p className="text-gray-400 mb-8">
            고객센터 1:1 문의를 통해 상세한 안내를 도와드리겠습니다.
          </p>
          <button className="bg-white text-gray-900 px-8 py-3.5 rounded-2xl font-bold hover:bg-indigo-50 transition-all active:scale-95">
            1:1 문의하기
          </button>
        </div>
        {/* 장식용 배경 원 */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
