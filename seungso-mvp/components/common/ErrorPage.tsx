"use client";

import Flex from "@/components/ui/Flex";
import Icon from "@/components/ui/Icon";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";
import Link from "next/link";

interface ErrorPageProps {
  title?: string;
  message: string;
  linkText?: string;
  linkHref?: string;
}

export default function ErrorPage({
  title,
  message,
  linkText,
  linkHref,
}: ErrorPageProps) {
  return (
    <Flex
      direction="column"
      gap={32}
      justify="center"
      align="center"
      style={{ minHeight: "100vh" }}
    >
      <Icon icon="ban" className="ico lg" />
      <Flex direction="column" align="center" gap={16}>
        {title && (
          <Title level={1} style={{ fontSize: "5rem", color: "#0c4a6e" }}>
            {title}
          </Title>
        )}
        <Text>{message}</Text>
        {linkText && linkHref && (
          <Link href={linkHref} style={{ marginTop: "1rem", color: "#0c4a6e" }}>
            {linkText}
          </Link>
        )}
      </Flex>
    </Flex>
  );
}
