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
  debtor_age_group: string | null;
  debtor_job: string | null;
  created_at: string;
}

export default function CasesPage() {
  const router = useRouter();
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const fetchCases = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) {
        router.replace("/member/login");
        return;
      }

      const { data, error } = await supabase
        .from("cases")
        .select("id, title, debtor_age_group, debtor_job, created_at")
        .order("created_at", { ascending: sortOrder === "asc" });

      if (error) {
        console.error("Cases fetch error:", error);
      }

      if (data) setCases(data as CaseItem[]);
      setLoading(false);
    };

    fetchCases();
  }, [router, sortOrder]);

  if (loading) return <Loading />;

  return (
    <div className="contentsPage">
      <Flex direction="column" gap={24}>
        <Flex justify="space-between" align="center">
          <Title level={1}>사건 관리</Title>
          <Flex gap={12} align="center">
            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value === "asc" ? "asc" : "desc")
              }
            >
              <option value="desc">최신순</option>
              <option value="asc">오래된순</option>
            </select>
            <Button
              styleType="primary"
              onClick={() => router.push("/service/cases/new")}
            >
              + 사건 등록
            </Button>
          </Flex>
        </Flex>

        {cases.length === 0 ? (
          <Flex direction="column" gap={12}>
            <Text color="secondary">등록된 사건이 없습니다.</Text>
            <Button onClick={() => router.push("/service/cases/new")}>
              첫 사건 등록하기
            </Button>
          </Flex>
        ) : (
          <Flex direction="column" gap={12}>
            {cases.map((item) => (
              <Card
                key={item.id}
                onClick={() => router.push(`/service/cases/${item.id}`)}
                style={{ cursor: "pointer" }}
              >
                <Flex direction="column" gap={6}>
                  <Text weight="bold">{item.title}</Text>
                  <Text size="sm" color="secondary">
                    채무자: {item.debtor_age_group || "-"} /{" "}
                    {item.debtor_job || "-"}
                  </Text>
                  <Text size="xs" color="info">
                    등록일: {new Date(item.created_at).toLocaleString()}
                  </Text>
                </Flex>
              </Card>
            ))}
          </Flex>
        )}
      </Flex>
    </div>
  );
}
