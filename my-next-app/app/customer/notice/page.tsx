// app/customer/notice/page.tsx

import { PageTitle } from "@/components/common/Heading";
import {
  Badge,
  Button,
  Flex,
  Table,
  TBody,
  TD,
  TH,
  THead,
  TR,
} from "@/components/common/LayoutElements";
import { createServerClient } from "@supabase/ssr";
import { Megaphone, PenLine } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

// 🌟 [추가] 이 페이지가 캐싱되지 않도록 강제합니다.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NoticePage() {
  console.log(
    "SERVER_URL_CHECK:",
    process.env.NEXT_PUBLIC_SUPABASE_URL ? "OK" : "FAIL",
  );
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );

  // 1. 유저 정보를 가져옵니다.
  // .getUser()는 서버에서 매번 세션을 확인하므로 보안상 가장 정확합니다.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 🌟 [디버깅] 서버 터미널(VS Code 하단)에 이메일이 찍히는지 확인해보세요.
  console.log("현재 접속한 유저:", user?.email);

  const isAdmin = user?.email === "bato3117@daum.net";

  // 2. 공지사항 가져오기
  const { data: notices, error } = await supabase
    .from("notices")
    .select("*")
    .order("is_fixed", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-20 text-center text-slate-500">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        {/* 헤더 영역 */}
        <Flex justify="between" align="end" className="mb-10">
          <Flex direction="col" align="start" gap={2}>
            <PageTitle className="flex items-center gap-2">
              <Megaphone className="w-7 h-7 text-brand-blue" />
              공지사항
            </PageTitle>
            <p className="text-slate-500 text-sm">
              집행나침반의 새로운 소식과 안내를 확인하세요.
            </p>
          </Flex>

          {/* 관리자에게만 보이는 글쓰기 버튼 */}
          {isAdmin && (
            <Link href="/admin/notice/write">
              <Button
                variant="primary"
                size="sm"
                className="rounded-lg shadow-md px-5"
              >
                <PenLine className="w-4 h-4 mr-2" /> 공지 등록
              </Button>
            </Link>
          )}
        </Flex>

        {/* 공지사항 리스트 테이블 */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <Table>
            <THead className="bg-slate-50/50">
              <TR>
                <TH className="w-20 text-center">번호</TH>
                <TH>제목</TH>
                <TH className="w-32 text-center">등록일</TH>
              </TR>
            </THead>
            <TBody>
              {notices && notices.length > 0 ? (
                notices.map((notice, index) => (
                  <TR
                    key={notice.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <TD className="text-center">
                      {notice.is_fixed ? (
                        <Badge variant="blue" className="font-bold">
                          중요
                        </Badge>
                      ) : (
                        <span className="text-slate-400 text-sm">
                          {notices.length - index}
                        </span>
                      )}
                    </TD>
                    <TD>
                      <Link
                        href={`/customer/notice/${notice.id}`}
                        className="block py-1 text-slate-800 font-semibold hover:text-brand-blue transition-colors"
                      >
                        {notice.title}
                      </Link>
                    </TD>
                    <TD className="text-center text-slate-400 text-xs">
                      {new Date(notice.created_at).toLocaleDateString("ko-KR")}
                    </TD>
                  </TR>
                ))
              ) : (
                <TR>
                  <TD colSpan={3} className="py-24 text-center text-slate-400">
                    등록된 공지사항이 없습니다.
                  </TD>
                </TR>
              )}
            </TBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
