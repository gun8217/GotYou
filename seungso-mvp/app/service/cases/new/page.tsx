"use client";

import { useToast } from "@/components/ui/ToastProvider";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Flex from "@/components/ui/Flex";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";

export default function NewCasePage() {
  const router = useRouter();
  const { addToast } = useToast();

  const [title, setTitle] = useState("");
  const [debtorAgeGroup, setDebtorAgeGroup] = useState("");
  const [debtorJob, setDebtorJob] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setPdfFile(e.target.files[0]);
  };

  const handleCreateCase = async () => {
    if (!title) {
      addToast("사건 제목을 입력해주세요.", "error");
      return;
    }
    if (!pdfFile) {
      addToast("판결문 PDF를 업로드해주세요.", "error");
      return;
    }
    if (pdfFile.type !== "application/pdf") {
      addToast("PDF 파일만 업로드 가능합니다.", "error");
      return;
    }
    if (pdfFile.size > 5 * 1024 * 1024) {
      addToast("파일 크기는 5MB 이하만 가능합니다.", "error");
      return;
    }

    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) {
      addToast("로그인이 필요합니다.", "error");
      router.replace("/member/login");
      return;
    }

    setLoading(true);

    try {
      const safeFileName = `${crypto.randomUUID()}.pdf`;
      const filePath = `public/cases/judgment/${authData.user.id}_${safeFileName}`;

      const { error: uploadError } = await supabase.storage
        .from("judgments")
        .upload(filePath, pdfFile, {
          metadata: { owner_id: authData.user.id },
        });

      if (uploadError) throw uploadError;

      const { data, error } = await supabase
        .from("cases")
        .insert({
          user_id: authData.user.id,
          title,
          debtor_age_group: debtorAgeGroup || null,
          debtor_job: debtorJob || null,
          judgment_file_path: filePath,
        })
        .select()
        .single();

      if (error) throw error;

      addToast("사건이 성공적으로 등록되었습니다.", "success");
      router.push(`/service/cases/${data.id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("사건 등록 에러:", err.message);
        addToast("사건 등록 실패: " + err.message, "error");
      } else {
        console.error("사건 등록 에러:", err);
        addToast("사건 등록 실패", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contentsPage">
      <Flex direction="column" gap={30}>
        <Title level={1}>사건 등록</Title>

        <Flex direction="column" gap={6}>
          <Card onlyCon>
            <Flex direction="column" gap={50}>
              {/* 필수 항목 */}
              <Flex direction="column" gap={16}>
                <Flex align="flex-end" gap={6} className="titLine">
                  <Title level={2}>필수 항목</Title>
                  <Text size="xs" color="secondary">
                    1건의 판결문만 등록 가능합니다.
                  </Text>
                </Flex>
                <Flex direction="column" gap={4}>
                  <Text size="sm" weight="bold" color="secondary">
                    사건 제목
                  </Text>
                  <Input
                    placeholder="예: OOO 대여금"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Flex>

                <Flex direction="column" gap={4}>
                  <Text size="sm" weight="bold" color="secondary">
                    판결문 PDF 업로드
                  </Text>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
                </Flex>
              </Flex>

              {/* 선택 항목 */}
              <Flex direction="column" gap={16} className="topLine">
                <Flex align="flex-end" gap={6} className="titLine">
                  <Title level={2}>선택 항목</Title>
                  <Text size="xs" color="secondary">
                    입력하면 정보 검색이 더 쉬워집니다.
                  </Text>
                </Flex>

                <Flex direction="column" gap={4}>
                  <Text size="sm" weight="bold" color="secondary">
                    채무자 연령대
                  </Text>
                  <Input
                    placeholder="예: 40대"
                    value={debtorAgeGroup}
                    onChange={(e) => setDebtorAgeGroup(e.target.value)}
                  />
                </Flex>
                <Flex direction="column" gap={4}>
                  <Text size="sm" weight="bold" color="secondary">
                    채무자 직업
                  </Text>
                  <Input
                    placeholder="예: 급여소득자 / 자영업자 / 법인대표 / 무직 / 모름"
                    value={debtorJob}
                    onChange={(e) => setDebtorJob(e.target.value)}
                  />
                </Flex>
              </Flex>

              <Button
                styleType="primary"
                size="lg"
                onClick={handleCreateCase}
                disabled={loading}
              >
                {loading ? "등록 중..." : "사건 등록"}
              </Button>
            </Flex>
          </Card>

          <Text size="xs" color="secondary">
            ※ 입력하신 선택 정보는 사건 분석 참고 자료로만 활용되며 판단의
            근거가 되는 유일한 정보는 아닙니다.
          </Text>
        </Flex>
      </Flex>
    </div>
  );
}
