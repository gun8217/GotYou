"use client";

import { supabase } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Flex from "@/components/ui/Flex";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";
import { useToast } from "@/components/ui/ToastProvider";

interface ExpenseItem {
  id: string;
  amount: number;
  memo?: string;
  spent_at: string;
}

interface CaseItem {
  id: string;
  title: string;
}

export default function ExpenseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const toast = useToast();
  const caseId = params.id as string;

  const [caseItem, setCaseItem] = useState<CaseItem | null>(null);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [editAmount, setEditAmount] = useState("");
  const [editMemo, setEditMemo] = useState("");
  const [editSpentAt, setEditSpentAt] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: caseData } = await supabase
        .from("cases")
        .select("id, title")
        .eq("id", caseId)
        .single();

      if (caseData) setCaseItem(caseData);

      const { data: expenseData } = await supabase
        .from("expenses")
        .select("*")
        .eq("case_id", caseId)
        .order("spent_at", { ascending: false });

      if (expenseData) setExpenses(expenseData);
    };

    fetchData();
  }, [caseId]);

  const startEdit = (e: ExpenseItem) => {
    setEditingId(e.id);
    setEditAmount(String(e.amount));
    setEditMemo(e.memo || "");
    setEditSpentAt(e.spent_at.slice(0, 10));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditAmount("");
    setEditMemo("");
    setEditSpentAt("");
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    const { error } = await supabase
      .from("expenses")
      .update({
        amount: Number(editAmount),
        memo: editMemo || null,
        spent_at: editSpentAt,
      })
      .eq("id", editingId);

    if (error) {
      toast.addToast("수정 실패: " + error.message, "error");
      return;
    }

    setExpenses((prev) =>
      prev.map((e) =>
        e.id === editingId
          ? {
              ...e,
              amount: Number(editAmount),
              memo: editMemo,
              spent_at: editSpentAt,
            }
          : e,
      ),
    );

    toast.addToast("수정되었습니다.", "success");
    cancelEdit();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("삭제하시겠습니까?")) return;

    await supabase.from("expenses").delete().eq("id", id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  if (!caseItem) return null;

  return (
    <div className="contentsPage">
      <Flex direction="column" gap={20}>
        <Flex justify="space-between" align="center">
          <Title level={1}>{caseItem.title} 경비 내역</Title>
          <Button
            styleType="secondary"
            onClick={() => router.push("/service/expenses")}
          >
            목록으로 가기
          </Button>
        </Flex>

        <Text weight="bold">총합: {total.toLocaleString()} 원</Text>

        <Button
          styleType="primary"
          onClick={() =>
            router.push(`/service/expenses/new?caseId=${caseItem.id}`)
          }
        >
          + 경비 등록
        </Button>

        {expenses.map((e) => (
          <Card key={e.id}>
            {editingId === e.id ? (
              <Flex direction="column" gap={8}>
                <Input
                  value={editAmount}
                  onChange={(ev) => {
                    const v = ev.target.value;
                    if (/^\d*$/.test(v)) setEditAmount(v);
                  }}
                />
                <Input
                  type="date"
                  value={editSpentAt}
                  onChange={(ev) => setEditSpentAt(ev.target.value)}
                />
                <Input
                  value={editMemo}
                  onChange={(ev) => setEditMemo(ev.target.value)}
                />

                <Flex gap={8}>
                  <Button styleType="primary" onClick={handleUpdate}>
                    저장
                  </Button>
                  <Button styleType="secondary" onClick={cancelEdit}>
                    취소
                  </Button>
                </Flex>
              </Flex>
            ) : (
              <Flex justify="space-between" align="center">
                <div>
                  <Text>{e.amount.toLocaleString()} 원</Text>
                  <Text size="sm">{e.spent_at.slice(0, 10)}</Text>
                  <Text size="sm">{e.memo}</Text>
                </div>
                <Flex gap={8}>
                  <Button styleType="secondary" onClick={() => startEdit(e)}>
                    수정
                  </Button>
                  <Button styleType="error" onClick={() => handleDelete(e.id)}>
                    삭제
                  </Button>
                </Flex>
              </Flex>
            )}
          </Card>
        ))}
      </Flex>
    </div>
  );
}
