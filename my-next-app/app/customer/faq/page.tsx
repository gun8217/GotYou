"use client";

import { PageTitle, SectionTitle } from "@/components/common/Heading";
import { Badge, Box, Button, Flex } from "@/components/common/LayoutElements";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    category: "서비스 이용",
    question: "집행나침반은 어떤 서비스인가요?",
    answer:
      "집행나침반은 복잡한 법적 강제집행 절차를 일반인도 쉽게 이해하고 스스로 진행할 수 있도록 돕는 가이드 서비스입니다.<br />서식 제공부터 단계별 절차 안내까지 지원합니다.",
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
      "자료실에서 제공하는 모든 서식은 개인의 비영리적 사용을 목적으로 합니다.<br />상업적 재배포나 판매는 금지되어 있습니다.",
  },
  {
    id: 4,
    category: "기타",
    question: "전문적인 법률 상담이 필요한 경우는요?",
    answer:
      "집행나침반은 절차적 안내를 제공하는 서비스입니다.<br />구체적인 법적 분쟁이나 전략이 필요한 경우 법률 전문가(변호사, 법무사)와 상담하시는 것을 권장드립니다.",
  },
];

export default function FAQPage() {
  const router = useRouter();
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <Flex
        direction="col"
        justify="center"
        gap={4}
        className="text-center mb-16"
      >
        <PageTitle>자주 묻는 질문</PageTitle>
        <p className="text-lg text-slate-500">
          궁금하신 점을 키워드별로 확인해 보세요.
        </p>
      </Flex>

      {/* FAQ 리스트 */}
      <div className="space-y-4">
        {faqData.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className={`group border rounded overflow-hidden transition-all duration-300 ${
                isOpen
                  ? "border-brand-blue-700 ring-1 ring-brand-blue-700 shadow-md"
                  : "border-slate-200 bg-white"
              }`}
            >
              <button
                onClick={() => toggleFAQ(item.id)}
                className="w-full text-left transition-colors"
              >
                <Box
                  padding="none"
                  className="border-none shadow-none bg-transparent p-4"
                >
                  <Flex justify="between" align="center">
                    <Flex direction="col" align="start" gap={2}>
                      <Badge variant={isOpen ? "blue" : "slate"}>
                        {item.category}
                      </Badge>
                      <SectionTitle
                        className={isOpen ? "text-slate-700" : "text-slate-500"}
                      >
                        {item.question}
                      </SectionTitle>
                    </Flex>

                    <div
                      className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-brand-blue-700" : "text-slate-400"}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </Flex>
                </Box>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="px-4 pb-4 pt-2 bg-slate-50/50">
                  <div className="h-px bg-slate-100 mb-4" />
                  <p
                    className="text-md text-slate-600 leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  ></p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 하단 CTA 섹션: SectionTitle 적용 */}
      <Box className="mt-15 p-6 bg-slate-900 border-none rounded relative overflow-hidden">
        <Flex
          direction="col"
          align="center"
          gap={6}
          className="relative z-10 text-center"
        >
          <div className="space-y-2">
            <SectionTitle className="text-white text-2xl">
              찾으시는 답변이 없으신가요?
            </SectionTitle>
            <p className="text-slate-400">
              고객센터 1:1 문의를 통해 상세한 안내를 도와드리겠습니다.
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            className="rounded px-10 hover:bg-white hover:text-slate-900 transition-colors"
            onClick={() => router.push("/customer/contact")}
          >
            1:1 문의하기
          </Button>
        </Flex>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-blue-700/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-blue-700/10 rounded-full blur-3xl" />
      </Box>
    </div>
  );
}
