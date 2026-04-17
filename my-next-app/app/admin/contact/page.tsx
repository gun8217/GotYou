"use client";

import { PageTitle, SectionTitle } from "@/components/common/Heading";
import {
  Badge,
  Box,
  Button,
  Flex,
  Table,
  TBody,
  TD,
  TH,
  THead,
  TR,
} from "@/components/common/LayoutElements";
import { supabase } from "@/lib/supabaseClient";
import { CheckCircle2, ChevronDown, MessageSquare } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Contact {
  id: string | number;
  user_email: string;
  category: string;
  title: string;
  content: string;
  status: string;
  answer?: string; // 답변 필드
  created_at: string;
}

export default function AdminContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [openId, setOpenId] = useState<string | number | null>(null);
  const [answerText, setAnswerText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 1. 문의 데이터 불러오기
  const fetchContacts = async () => {
    const { data } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    setContacts((data as Contact[]) || []);
  };

  useEffect(() => {
    const init = async () => {
      await fetchContacts();
    };

    init();
  }, []);

  // 2. 답변 등록 함수
  const handleAnswerSubmit = async (id: string | number) => {
    if (!answerText.trim()) return;
    setSubmitting(true);

    const { error } = await supabase
      .from("contacts")
      .update({
        answer: answerText,
        status: "답변완료",
        answered_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      alert("답변 등록 중 오류가 발생했습니다.");
    } else {
      alert("답변이 등록되었습니다.");
      setAnswerText("");
      setOpenId(null);
      fetchContacts(); // 목록 새로고침
    }
    setSubmitting(false);
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <Flex direction="col" gap={2} className="mb-10">
        <PageTitle>고객 문의 관리</PageTitle>
        <p className="text-slate-500">
          사용자들이 남긴 1:1 문의를 확인하고 답변을 등록합니다.
        </p>
      </Flex>

      <Table>
        <THead className="bg-slate-50">
          <TR>
            <TH className="w-28 text-center">상태</TH>
            <TH className="w-48 text-center">작성자(이메일)</TH>
            <TH>문의 제목</TH>
            <TH className="w-32 text-right">등록일</TH>
            <TH className="w-12"></TH>
          </TR>
        </THead>
        <TBody>
          {contacts.map((item) => {
            const isOpen = openId === item.id;
            const isDone = item.status === "답변완료";

            return (
              <React.Fragment key={item.id}>
                <TR
                  onClick={() => {
                    setOpenId(isOpen ? null : item.id);
                    setAnswerText(item.answer || ""); // 기존 답변이 있으면 로드
                  }}
                  className={isOpen ? "bg-brand-blue/5" : ""}
                >
                  <TD className="text-center">
                    <Badge variant={isDone ? "green" : "orange"}>
                      {item.status}
                    </Badge>
                  </TD>
                  <TD className="text-center text-xs text-slate-500 font-medium">
                    {item.user_email}
                  </TD>
                  <TD className="font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">
                        {item.category}
                      </span>
                      {item.title}
                    </div>
                  </TD>
                  <TD className="text-right text-slate-400 text-xs">
                    {new Date(item.created_at).toLocaleDateString()}
                  </TD>
                  <TD className="text-center">
                    <ChevronDown
                      className={`w-4 h-4 transition-all ${isOpen ? "rotate-180 text-brand-blue" : "text-slate-300"}`}
                    />
                  </TD>
                </TR>

                {/* 상세 내용 및 답변 영역 */}
                {isOpen && (
                  <tr className="bg-slate-50/50">
                    <td colSpan={5} className="p-6">
                      <Flex direction="col" gap={6}>
                        {/* 1. 사용자의 문의 내용 */}
                        <Box className="bg-white p-4 border-slate-200 w-full">
                          <SectionTitle className="text-sm mb-3 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-brand-blue" />
                            문의 내용
                          </SectionTitle>
                          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                            {item.content}
                          </p>
                        </Box>

                        {/* 2. 관리자 답변 작성/수정 영역 */}
                        <Box
                          className={`p-4 border-1 ${isDone ? "border-brand-green/20" : "border-brand-blue/20"} bg-white w-full`}
                        >
                          <SectionTitle className="text-sm mb-3 flex items-center gap-2">
                            <CheckCircle2
                              className={`w-4 h-4 ${isDone ? "text-brand-green" : "text-brand-blue"}`}
                            />
                            {isDone ? "등록된 답변" : "답변 작성"}
                          </SectionTitle>

                          <textarea
                            rows={5}
                            placeholder="답변 내용을 입력하세요..."
                            value={answerText}
                            onChange={(e) => setAnswerText(e.target.value)}
                            className="w-full p-4 text-sm border border-slate-200 rounded-xs focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                          />

                          <Flex justify="end" className="mt-4">
                            <Button
                              onClick={() => handleAnswerSubmit(item.id)}
                              loading={submitting}
                              variant={isDone ? "secondary" : "darkBlue"}
                              size="sm"
                              className="px-8 rounded"
                            >
                              {isDone ? "답변 수정하기" : "답변 등록 완료"}
                            </Button>
                          </Flex>
                        </Box>
                      </Flex>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </TBody>
      </Table>
    </div>
  );
}
