"use client";
import Flex from "@/components/ui/Flex";
import Icon from "@/components/ui/Icon";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";
import Link from "next/link";

export default function NotFound() {
  return (
    <Flex
      direction="column"
      gap={32}
      style={{
        position: "absolute",
        top: "calc(50% - 5rem)",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Icon icon="ban" className="ico lg" />
      <Flex direction="column" align="center" gap={16}>
        <Title level={1} style={{ fontSize: "5rem", color: "#0c4a6e" }}>
          404
        </Title>
        <Text>접근할 수 있는 화면이 없습니다.</Text>
        <Link href="/">메인으로 돌아가기</Link>
      </Flex>
    </Flex>
  );
}
