"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Loading from "@/components/common/Loading";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Flex from "@/components/ui/Flex";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";

interface CaseItem {
  id: string;
  title: string;
}

export default function ExpensesPage() {
  const router = useRouter();
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) {
        router.replace("/member/login");
        return;
      }

      const { data } = await supabase
        .from("cases")
        .select("id, title")
        .eq("user_id", authData.user.id)
        .order("created_at", { ascending: false });

      if (data) setCases(data);
      setLoading(false);
    };

    fetchCases();
  }, [router]);

  if (loading) return <Loading />;

  return (
    <div className="contentsPage">
      <Flex direction="column" gap={20}>
        <Title level={1}>사건별 경비 관리</Title>

        {cases.length === 0 ? (
          <Text color="secondary">등록된 사건이 없습니다.</Text>
        ) : (
          cases.map((c) => (
            <Card key={c.id}>
              <Flex justify="space-between" align="center">
                <Text weight="bold">{c.title}</Text>
                <Flex gap={8}>
                  <Button
                    onClick={() =>
                      router.push(`/service/expenses/new?caseId=${c.id}`)
                    }
                  >
                    경비 등록
                  </Button>
                  <Button
                    styleType="secondary"
                    onClick={() => router.push(`/service/expenses/${c.id}`)}
                  >
                    경비 내역
                  </Button>
                </Flex>
              </Flex>
            </Card>
          ))
        )}
      </Flex>
    </div>
  );
}
