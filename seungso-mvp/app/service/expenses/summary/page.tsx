"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Loading from "@/components/common/Loading";
import Card from "@/components/ui/Card";
import Flex from "@/components/ui/Flex";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";

interface ExpenseItem {
  id: string;
  case_id: string;
  amount: number;
}

interface CaseItem {
  id: string;
  title: string;
}

export default function ExpensesSummaryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [cases, setCases] = useState<CaseItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) {
        router.replace("/member/login");
        return;
      }

      const userId = authData.user.id;

      // 사건 목록
      const { data: caseData, error: caseError } = await supabase
        .from("cases")
        .select("id, title")
        .eq("user_id", userId);

      if (caseError) console.error(caseError);
      if (caseData) setCases(caseData);

      // 지출 목록
      const { data: expenseData, error: expenseError } = await supabase
        .from("expenses")
        .select("id, case_id, amount")
        .eq("user_id", userId);

      if (expenseError) console.error(expenseError);
      if (expenseData) setExpenses(expenseData);

      setLoading(false);
    };

    fetchData();
  }, [router]);

  if (loading) return <Loading />;

  // 전체 합계
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  // 사건별 합계
  const caseTotals = cases.map((c) => {
    const sum = expenses
      .filter((e) => e.case_id === c.id)
      .reduce((acc, cur) => acc + cur.amount, 0);

    return {
      caseId: c.id,
      title: c.title,
      total: sum,
    };
  });

  return (
    <div className="contentsPage">
      <Flex direction="column" gap={24}>
        <Title level={1}>지출 요약</Title>

        {/* 전체 합계 */}
        <Card variant="bodySm">
          <Text size="lg" weight="bold">
            전체 지출 합계
          </Text>
          <Text size="xl" weight="bold">
            {totalAmount.toLocaleString()} 원
          </Text>
        </Card>

        {/* 사건별 합계 */}
        <Card variant="bodySm">
          <Text size="lg" weight="bold">
            사건별 지출 합계
          </Text>

          {caseTotals.length === 0 ? (
            <Text color="secondary">등록된 사건이 없습니다.</Text>
          ) : (
            <Flex direction="column" gap={12}>
              {caseTotals.map((item) => (
                <Flex key={item.caseId} justify="space-between" align="center">
                  <Text>{item.title}</Text>
                  <Text weight="bold">{item.total.toLocaleString()} 원</Text>
                </Flex>
              ))}
            </Flex>
          )}
        </Card>
      </Flex>
    </div>
  );
}
