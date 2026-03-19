"use client";

import BaseModal from "@/components/common/BaseModal";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Flex } from "@/components/common/Flex";
import {
  Checkbox,
  FileInput,
  Input,
  Radio,
  Select,
} from "@/components/common/FormElements";
import { SectionTitle } from "@/components/common/Heading";
import { Table, TBody, TD, TH, THead, TR } from "@/components/common/Table";
import { useState } from "react";

export default function StyleGuidePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 p-10 pb-40 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="border-b border-slate-200 pb-6">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            UI Style Guide
          </h1>
          <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-xs">
            GotYou Design System v1.0
          </p>
        </header>

        {/* 1. Text Inputs */}
        <section className="space-y-6">
          <h2 className="text-xl font-black text-slate-800 border-l-4 border-blue-600 pl-4">
            Inputs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <Input label="Text Input" placeholder="이름을 입력하세요" />
            <Input label="Password" type="password" placeholder="비밀번호" />
            <Input label="Number" type="number" placeholder="0" />
            <Input label="Date" type="date" />
          </div>
        </section>

        {/* 2. Selection Elements */}
        <section className="space-y-6">
          <h2 className="text-xl font-black text-slate-800 border-l-4 border-blue-600 pl-4">
            Selections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <Select
              label="Select Box"
              options={[
                { value: "1", label: "옵션 1" },
                { value: "2", label: "옵션 2" },
              ]}
            />
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase ml-1">
                Checkboxes
              </label>
              <div className="flex gap-4">
                <Checkbox label="사과" defaultChecked />
                <Checkbox label="바나나" />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase ml-1">
                Radios
              </label>
              <div className="flex gap-4">
                <Radio label="남성" name="gender" defaultChecked />
                <Radio label="여성" name="gender" />
              </div>
            </div>
            <FileInput label="File Upload" />
          </div>
        </section>

        {/* 3. Modals & Feedback */}
        <section className="space-y-6">
          <h2 className="text-xl font-black text-slate-800 border-l-4 border-blue-600 pl-4">
            Modals
          </h2>
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg hover:bg-blue-700 transition-all active:scale-95"
            >
              모달 테스트 열기
            </button>
          </div>
        </section>

        <Card padding="md" className="max-w-2xl mx-auto mt-10">
          <Flex justify="between" align="center" className="mb-8">
            <div className="space-y-1">
              <SectionTitle>최근 사건 목록</SectionTitle>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Recent Case Management
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-slate-200"
            >
              전체 보기
            </Button>
          </Flex>

          <Table>
            <THead>
              <TR>
                <TH>사건번호</TH>
                <TH>의뢰인</TH>
                <TH>상태</TH>
              </TR>
            </THead>
            <TBody>
              <TR onClick={() => alert("상세보기")}>
                <TD className="text-blue-600">2024-가합-001</TD>
                <TD>홍길동</TD>
                <TD>
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs">
                    진행중
                  </span>
                </TD>
              </TR>
              <TR>
                <TD>2023-형제-112</TD>
                <TD>김철수</TD>
                <TD>
                  <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs">
                    종결
                  </span>
                </TD>
              </TR>
            </TBody>
          </Table>

          <Flex justify="end" gap={2} className="mt-6">
            <Button variant="ghost">취소</Button>
            <Button variant="primary">새 사건 등록</Button>
          </Flex>
        </Card>
      </div>

      <BaseModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="스타일 가이드 모달"
        footer={
          <button
            onClick={() => setModalOpen(false)}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black"
          >
            닫기
          </button>
        }
      >
        <p className="text-center font-medium py-10">
          공통 모달 컴포넌트가 정상적으로 작동합니다.
        </p>
      </BaseModal>
    </div>
  );
}
