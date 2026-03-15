"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Flex from "@/components/ui/Flex";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";

interface CaseItem {
  id: string;
  title: string;
  debtor_name: string;
  created_at: string;
  judgment_pdf_url?: string | null;
}

export default function CasesPage() {
  const router = useRouter();
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [debtorName, setDebtorName] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) {
        router.replace("/member/login");
        return;
      }

      const { data } = await supabase
        .from("cases")
        .select("id, title, debtor_name, created_at, judgment_pdf_url")
        .order("created_at", { ascending: false });

      if (data) setCases(data as CaseItem[]);
      setLoading(false);
    };

    fetchCases();
  }, [router]);

  const handleCreateCase = async () => {
    if (!title) return alert("사건 제목을 입력하세요.");

    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) return;

    let pdfUrl: string | null = null;

    // 📄 PDF 업로드
    if (pdfFile) {
      const filePath = `${authData.user.id}/${Date.now()}_${pdfFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("judgments")
        .upload(filePath, pdfFile);

      if (uploadError) {
        alert("판결문 업로드 실패");
        return;
      }

      const { data: urlData } = supabase.storage
        .from("judgments")
        .getPublicUrl(filePath);

      pdfUrl = urlData.publicUrl;
    }

    const { data } = await supabase
      .from("cases")
      .insert({
        user_id: authData.user.id,
        title,
        debtor_name: debtorName,
        judgment_pdf_url: pdfUrl,
      })
      .select()
      .single();

    if (data) {
      setCases((prev) => [data as CaseItem, ...prev]);
      setTitle("");
      setDebtorName("");
      setPdfFile(null);
      setOpenModal(false);
    }
  };

  if (loading) return <Text>로딩 중...</Text>;

  return (
    <Flex direction="column" gap={24} className="contentsPage">
      <Flex justify="space-between" align="center">
        <Title level={1}>사건 관리</Title>
        <Button styleType="primary" onClick={() => setOpenModal(true)}>
          + 사건 등록
        </Button>
      </Flex>

      {cases.length === 0 ? (
        <Text color="secondary">등록된 사건이 없습니다.</Text>
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
                  채무자: {item.debtor_name || "-"}
                </Text>
                <Text size="xs" color="info">
                  등록일: {new Date(item.created_at).toLocaleDateString()}
                </Text>
                {item.judgment_pdf_url && (
                  <Text size="xs" color="primary">
                    📄 판결문 첨부됨
                  </Text>
                )}
              </Flex>
            </Card>
          ))}
        </Flex>
      )}

      {/* 사건 등록 모달 */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        header={<Title level={4}>사건 등록</Title>}
        footer={<Button onClick={handleCreateCase}>등록</Button>}
      >
        <Flex direction="column" gap={12}>
          <Input
            placeholder="사건 제목 (예: 김OO 대여금)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="채무자 이름 (선택)"
            value={debtorName}
            onChange={(e) => setDebtorName(e.target.value)}
          />

          {/* 판결문 PDF 업로드 */}
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) =>
              setPdfFile(e.target.files ? e.target.files[0] : null)
            }
          />
        </Flex>
      </Modal>
    </Flex>
  );
}
