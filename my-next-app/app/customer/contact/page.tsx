"use client";

import { createContact } from "@/app/member/login/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

// 공통 컴포넌트 임포트
import { Input, Select } from "@/components/common/FormElements";
import { PageTitle } from "@/components/common/Heading";
import { Box, Button, Flex } from "@/components/common/LayoutElements";

export default function ContactPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("일반문의");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 셀렉트 옵션 데이터
  const categoryOptions = [
    { value: "일반문의", label: "일반문의" },
    { value: "이용방법", label: "이용방법" },
    { value: "오류제보", label: "오류제보" },
    { value: "기타", label: "기타" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해 주세요.");
      return;
    }

    setLoading(true);

    // 🌟 서버 액션 호출
    const result = await createContact({ title, category, content });

    if (result?.error) {
      alert(result.error);
      if (result.error.includes("로그인")) {
        router.push("/member/login");
      }
    } else {
      alert("문의가 정상적으로 접수되었습니다.");
      // 리스트 페이지로 이동하며 데이터 갱신
      router.push("/customer/contact/list");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        {/* 헤더 섹션 */}
        <Flex
          direction="col"
          align="center"
          gap={4}
          className="mb-12 text-center"
        >
          <PageTitle>1:1 문의하기</PageTitle>
          <p className="text-slate-500">
            궁금하신 점을 남겨주시면 정성껏 답변해 드리겠습니다.
          </p>
        </Flex>

        {/* 문의 폼 섹션 */}
        <Box className="rounded shadow-md border-slate-100 bg-white p-8">
          <form onSubmit={handleSubmit}>
            <Flex direction="col" gap={6}>
              {/* 문의 유형 선택 */}
              <Select
                label="문의 유형"
                options={categoryOptions}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />

              {/* 제목 입력 */}
              <Input
                label="제목"
                required
                placeholder="제목을 입력해 주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              {/* 문의 내용 입력 */}
              <div className="flex flex-col w-full">
                <label className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-0.5 mb-1.5">
                  문의 내용
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="내용을 상세히 입력해 주세요"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="block w-full rounded border border-slate-200 bg-white p-4 text-sm text-slate-900 placeholder:text-slate-300 focus:border-blue-600 focus:outline-none transition-all shadow-sm disabled:bg-slate-50"
                />
              </div>

              {/* 제출 버튼 */}
              <Button
                type="submit"
                variant="darkBlue"
                size="xl"
                className="w-full rounded mt-2"
                disabled={loading}
              >
                {loading ? "접수 중..." : "문의 등록하기"}
              </Button>
            </Flex>
          </form>
        </Box>
      </div>
    </div>
  );
}
