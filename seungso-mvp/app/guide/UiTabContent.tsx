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
    <Flex direction="column" align="flex-start" gap={4}>
      <Title text="Tooltip" level={5} />
      <Tooltip text="툴팁 메시지">마우스를 올려보세요</Tooltip>

      <Title text="Modal" level={5} />
      <Button label="모달 열기" type="secondary" onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        header="타이틀"
        footer={
          <>
            <button onClick={handleClose}>취소</button>
            <button onClick={() => alert("확인!")}>확인</button>
          </>
        }
      >
        <p>내용 출력</p>
      </Modal>

      <Title text="Toast" level={5} />
      <Flex gap={8}>
        <Button
          label="Toast success"
          onClick={() => addToast("저장 완료!", "success")}
        />
        <Button
          label="Toast error"
          onClick={() => addToast("에러 발생!", "error")}
        />
        <Button
          label="Toast info"
          onClick={() => addToast("정보 알림!", "info")}
        />
      </Flex>

      <Title text="Tabs" level={5} />
      <Tabs
        tabs={[
          { label: "탭 1", content: <p>첫 번째 탭 내용</p> },
          { label: "탭 2", content: <p>두 번째 탭 내용</p> },
          { label: "탭 3", content: <p>세 번째 탭 내용</p> },
        ]}
      />

      <Title text="Accordion" level={5} />
      <Accordion
        items={[
          { title: "아코디언 1", content: <p>내용 1</p> },
          { title: "아코디언 2", content: <p>내용 2</p> },
          { title: "아코디언 3", content: <p>내용 3</p> },
        ]}
      />

      <Title text="Card" level={5} />
      <Card title="카드 타이틀">카드 본문 내용입니다.</Card>
    </Flex>
  );
}
