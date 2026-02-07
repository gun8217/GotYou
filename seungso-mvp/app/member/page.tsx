"use client";

export const pageName = "마이페이지";
export const requiresAuth = true;

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Flex from "@/components/ui/Flex";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";

export default function MyPageCardV2() {
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  const handleWithdraw = async () => {
    const ok = confirm(
      "정말 탈퇴하시겠습니까? 모든 정보는 복구할 수 없습니다.",
    );
    if (!ok) return;

    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) return;

    await supabase
      .from("profiles")
      .update({ is_active: false })
      .eq("user_id", authData.user.id);

    await supabase.auth.signOut();
    alert("탈퇴 처리되었습니다.");
    router.replace("/");
  };

  if (loading) return <Text>로딩 중...</Text>;

  return (
    <Flex direction="column" align="center" gap={32} style={{ padding: 40 }}>
      <Title level={1}>마이페이지</Title>

      <Card style={{ width: 460 }}>
        <Flex direction="column" gap={20}>
          <Flex align="center" gap={12}>
            <Icon icon="user-circle" size="xl" />
            <Flex direction="column">
              <Text weight="bold">내 계정</Text>
              <Text size="sm" color="secondary">
                가입일: {createdAt}
              </Text>
            </Flex>
          </Flex>

          <Flex direction="column" gap={8}>
            <Text size="sm" color="secondary">
              이메일
            </Text>
            <Input value={email} disabled onChange={() => {}} />
          </Flex>
        </Flex>
      </Card>

      <Card style={{ width: 460 }}>
        <Flex direction="column" gap={16}>
          <Text weight="bold">계정 관리</Text>

          <Button
            styleType="secondary"
            onClick={() => router.push("/member/change-password")}
          >
            비밀번호 변경
          </Button>

          <Button styleType="secondary" onClick={handleLogout}>
            로그아웃
          </Button>

          <Button styleType="error" onClick={handleWithdraw}>
            회원탈퇴
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
}
