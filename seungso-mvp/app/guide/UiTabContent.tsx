"use client";

import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Flex from "@/components/ui/Flex";
import Modal from "@/components/ui/Modal";
import Tabs from "@/components/ui/Tabs";
import Title from "@/components/ui/Title";
import { useToast } from "@/components/ui/ToastProvider";
import Tooltip from "@/components/ui/Tooltip";
import { useState } from "react";

export default function Guide() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { addToast } = useToast();

  return (
    <Flex direction="column" gap={32}>
      <Flex direction="column" align="flex-start" gap={8}>
        <Title text="Tooltip" />
        <Tooltip text="툴팁 메시지">마우스를 올려보세요</Tooltip>
      </Flex>

      <Flex justify="space-between">
        <Flex direction="column" gap={8}>
          <Title text="Modal" />
          <Button styleType="secondary" onClick={handleOpen}>
            모달 열기
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            header="타이틀"
            footer={
              <>
                <Button size="sm" onClick={handleClose}>
                  취소
                </Button>
                <Button
                  styleType="primary"
                  size="sm"
                  onClick={() => alert("확인!")}
                >
                  확인
                </Button>
              </>
            }
          >
            <p>내용 출력</p>
          </Modal>
        </Flex>

        <Flex direction="column" gap={8} style={{ width: "50%" }}>
          <Title text="Toast" />
          <Flex gap={8}>
            <Button onClick={() => addToast("저장 완료!", "success")}>
              success
            </Button>
            <Button onClick={() => addToast("에러 발생!", "error")}>
              error
            </Button>
            <Button onClick={() => addToast("정보 알림!", "info")}>info</Button>
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap={8}>
        <Title text="Tabs" />
        <Tabs
          tabs={[
            { label: "탭 1", content: <p>첫 번째 탭 내용</p> },
            { label: "탭 2", content: <p>두 번째 탭 내용</p> },
            { label: "탭 3", content: <p>세 번째 탭 내용</p> },
          ]}
        />
      </Flex>

      <Flex direction="column" gap={8}>
        <Title text="Accordion" />
        <Accordion
          items={[
            { title: "아코디언 1", content: <p>내용 1</p> },
            { title: "아코디언 2", content: <p>내용 2</p> },
            { title: "아코디언 3", content: <p>내용 3</p> },
          ]}
        />
      </Flex>

      <Flex direction="column" gap={8}>
        <Title text="Card" />
        <Card title="카드 타이틀">카드 본문 내용입니다.</Card>
        <Card variant="noHeader">타이틀 없는 카드 본문 내용입니다.</Card>
      </Flex>
    </Flex>
  );
}
