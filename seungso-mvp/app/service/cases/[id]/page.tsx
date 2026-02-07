"use client";

import { supabase } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ErrorPage from "@/components/common/ErrorPage";
import Loading from "@/components/common/Loading";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Flex from "@/components/ui/Flex";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";

// cases 테이블 타입 정의
type Case = {
  id: number;
  user_id: string;
  title: string;
  debtor_age_group: string | null;
  debtor_job: string | null;
  judgment_file_path: string;
};

export default function CaseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // 수정용 state
  const [title, setTitle] = useState("");
  const [debtorAgeGroup, setDebtorAgeGroup] = useState("");
  const [debtorJob, setDebtorJob] = useState("");

  useEffect(() => {
    const fetchCase = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("cases")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setCaseData(data as Case);
        setTitle(data.title);
        setDebtorAgeGroup(data.debtor_age_group || "");
        setDebtorJob(data.debtor_job || "");
      }
      setLoading(false);
    };
    fetchCase();
  }, [id]);

  const handleDownload = async () => {
    if (!caseData?.judgment_file_path) return;
    const { data, error } = await supabase.storage
      .from("judgments")
      .download(caseData.judgment_file_path);

    if (error) {
      alert("다운로드 실패: " + error.message);
      return;
    }

    const url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = "판결문.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("cases")
      .update({
        title,
        debtor_age_group: debtorAgeGroup || null,
        debtor_job: debtorJob || null,
      })
      .eq("id", id);

    if (error) {
      alert("수정 실패: " + error.message);
    } else {
      alert("사건 정보가 수정되었습니다.");
      if (caseData) {
        setCaseData({
          ...caseData,
          title,
          debtor_age_group: debtorAgeGroup,
          debtor_job: debtorJob,
        });
      }
      setEditMode(false);
    }
  };

  if (loading) return <Loading />;
  if (!caseData)
    return (
      <ErrorPage
        message="사건 정보를 찾을 수 없습니다."
        linkText="목록으로 이동"
        linkHref="/service/cases"
      />
    );

  return (
    <div className="contentsPage">
      <Flex direction="column" gap={30}>
        <Title level={1}>사건 상세</Title>
        <Card onlyCon>
          <Flex direction="column" gap={20}>
            {editMode ? (
              <>
                <Text weight="bold">사건 제목</Text>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <Text weight="bold">채무자 연령대</Text>
                <Input
                  value={debtorAgeGroup}
                  onChange={(e) => setDebtorAgeGroup(e.target.value)}
                />

                <Text weight="bold">채무자 직업</Text>
                <Input
                  value={debtorJob}
                  onChange={(e) => setDebtorJob(e.target.value)}
                />

                <Text size="sm" color="secondary">
                  ※ 판결문은 교체할 수 없습니다. 다른 판결문을 사용하려면 새
                  사건을 등록하세요.
                </Text>

                <Flex gap={10}>
                  <Button styleType="primary" onClick={handleUpdate}>
                    저장
                  </Button>
                  <Button
                    styleType="secondary"
                    onClick={() => setEditMode(false)}
                  >
                    취소
                  </Button>
                </Flex>
              </>
            ) : (
              <>
                <Text size="lg" weight="bold">
                  {caseData.title}
                </Text>
                <Text>
                  채무자 연령대: {caseData.debtor_age_group || "미입력"}
                </Text>
                <Text>채무자 직업: {caseData.debtor_job || "미입력"}</Text>

                <Button styleType="primary" onClick={handleDownload}>
                  판결문 PDF 다운로드
                </Button>

                <Flex gap={10}>
                  <Button
                    styleType="secondary"
                    onClick={() => setEditMode(true)}
                  >
                    수정하기
                  </Button>
                  <Button
                    styleType="secondary"
                    onClick={() => router.push("/service/cases")}
                  >
                    목록으로 가기
                  </Button>
                </Flex>
              </>
            )}
          </Flex>
        </Card>
      </Flex>
    </div>
  );
}
