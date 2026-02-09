"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Flex from "@/components/ui/Flex";
import Input from "@/components/ui/Input";
import Title from "@/components/ui/Title";
import { useToast } from "@/components/ui/ToastProvider";

export default function ExpenseNewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const caseId = searchParams.get("caseId");

  const [caseTitle, setCaseTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [spentAt, setSpentAt] = useState("");

  useEffect(() => {
    if (!caseId) return;

    const fetchCase = async () => {
      const { data } = await supabase
        .from("cases")
        .select("title")
        .eq("id", caseId)
        .single();

      if (data) setCaseTitle(data.title);
    };

    fetchCase();
  }, [caseId]);

  const handleAdd = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.addToast("금액을 입력하세요.", "info");
      return;
    }

    const { error } = await supabase.from("expenses").insert({
      amount: Number(amount),
      memo: memo || null,
      spent_at: spentAt || new Date().toISOString(),
      case_id: caseId,
      user_id: (await supabase.auth.getUser()).data.user!.id,
    });

    if (error) {
      toast.addToast("등록 실패: " + error.message, "error");
      return;
    }

    toast.addToast("등록되었습니다.", "success");
    router.push(`/service/expenses/${caseId}`);
  };

  return (
    <div className="contentsPage">
      <Flex direction="column" gap={20}>
        <Flex justify="space-between" align="center">
          <Title level={1}>{caseTitle} 경비 등록</Title>
          <Button
            styleType="secondary"
            onClick={() => router.push("/service/expenses")}
          >
            목록으로 가기
          </Button>
        </Flex>

        <Card variant="bodySm">
          <Flex direction="column" gap={10}>
            <Input
              placeholder="금액"
              value={amount}
              onChange={(e) => {
                const v = e.target.value;
                if (/^\d*$/.test(v)) setAmount(v);
              }}
            />
            <Input
              type="date"
              value={spentAt}
              onChange={(e) => setSpentAt(e.target.value)}
            />
            <Input
              placeholder="메모"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />

            <Flex gap={8}>
              <Button styleType="primary" onClick={handleAdd}>
                등록
              </Button>
              <Button
                styleType="secondary"
                onClick={() => router.push(`/service/expenses/${caseId}`)}
              >
                취소
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </div>
  );
}
