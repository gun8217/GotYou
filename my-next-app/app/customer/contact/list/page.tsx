import { Contact } from "@/type/contact";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";

// 공통 컴포넌트 임포트
import { PageTitle } from "@/components/common/Heading";
import { Button, Flex } from "@/components/common/LayoutElements";

import ContactListClient from "./ContactListClient";

export default async function ContactListPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );

  // 서버사이드 데이터 페칭
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("데이터 로드 에러:", error.message);
  }

  const contacts: Contact[] = (data as Contact[]) || [];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <Flex justify="between" align="end" className="mb-8">
          <Flex direction="col" align="start" gap={2}>
            <PageTitle>나의 문의 내역</PageTitle>
            <p className="text-slate-500 text-sm">
              목록을 클릭하여 내용을 확인하세요.
            </p>
          </Flex>
          <Link href="/customer/contact">
            <Button variant="outline" size="sm" className="rounded px-5">
              + 새 문의하기
            </Button>
          </Link>
        </Flex>

        {contacts.length > 0 ? (
          <ContactListClient initialContacts={contacts} />
        ) : (
          <Flex
            justify="center"
            align="center"
            className="py-24 bg-white rounded border border-dashed border-slate-200"
          >
            <p className="text-slate-400">문의 내역이 없습니다.</p>
          </Flex>
        )}
      </div>
    </div>
  );
}
