"use client";

export const pageName = "마이페이지";
export const requiresAuth = true;

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Loading from "@/components/common/Loading";
import Card from "@/components/ui/Card";
import Flex from "@/components/ui/Flex";
import Icon from "@/components/ui/Icon";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";
import Link from "next/link";

import styles from "./MemberCommon.module.scss";

export default function MyPageCard() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser();

      if (!authData.user) {
        router.replace("/member/login");
        return;
      }

      setEmail(authData.user.email || "");
      setCreatedAt(new Date(authData.user.created_at).toLocaleDateString());

      setLoading(false);
    };

    fetchUser();
  }, [router]);

  if (loading) return <Loading />;

  return (
    <Flex direction="column" className={styles.MemberWrap}>
      <Title level={1}>마이페이지</Title>

      <Flex direction="column" gap={40} className={styles.inner}>
        <Card title="가입 정보">
          <Flex align="center" gap={12}>
            <Icon icon="user-circle" className="ico sm" />

            <Flex direction="column" align="flex-start" gap={12}>
              <Flex direction="column" gap={4}>
                <Flex gap={6}>
                  <Text size="sm" weight="bold">
                    이메일
                  </Text>
                  <Text size="sm" color="secondary">
                    {email}
                  </Text>
                </Flex>

                <Flex gap={6}>
                  <Text size="sm" weight="bold">
                    가입일
                  </Text>
                  <Text size="sm" color="secondary">
                    {createdAt}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Card>

        <Card title="계정 관리">
          <Flex direction="column" align="flex-start" className="linkList">
            <Link href="/member/change-email">
              <Icon icon="caret-down" />
              이메일 변경
            </Link>
            <Link href="/member/change-password">
              <Icon icon="caret-down" />
              비밀번호 변경
            </Link>
            <Link href="/member/withdraw">
              <Icon icon="caret-down" />
              회원탈퇴
            </Link>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
}
